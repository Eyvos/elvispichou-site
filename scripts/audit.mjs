#!/usr/bin/env node
/**
 * Audit de conformité du site avec les règles de docs/.
 * Sans dépendance. Sortie : PASS / WARN / FAIL par règle, code de sortie 1 s'il y a au moins un FAIL.
 *
 *   npm run audit            audit complet
 *   npm run audit -- --json  sortie JSON (pour le skill design-guardian)
 *
 * Une ligne peut être exemptée avec `audit-ignore` (commentaire ou attribut) : la raison doit être
 * écrite à côté et l'exception listée dans docs/02-design-system.md.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const results = [];
const add = (level, rule, msg, where) => results.push({ level, rule, msg, where });

function walk(dir, exts, out = []) {
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name);
    if (statSync(join(ROOT, rel)).isDirectory()) walk(rel, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(rel);
  }
  return out;
}
const srcFiles = walk('src', ['.astro', '.ts', '.css', '.md']);
const astroFiles = srcFiles.filter((f) => f.endsWith('.astro'));
const lines = (f) => read(f).split('\n');

// ───────────────────────── 1. Contrastes des tokens (WCAG) ─────────────────────────
const css = read('src/styles/global.css');
const block = (sel) => {
  const i = css.indexOf(sel);
  if (i < 0) return '';
  const s = css.indexOf('{', i);
  return css.slice(s + 1, css.indexOf('}', s));
};
const tokens = (b) => Object.fromEntries([...b.matchAll(/--c-([\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]));
const themes = { sombre: tokens(block(':root {')), clair: tokens(block(':root[data-theme="light"]')) };

const lin = (c) => (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const lum = (h) => {
  const n = parseInt(h.slice(1), 16);
  return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// [texte/élément, fond, minimum, description]. 4.5 = AA texte ; 3 = AA éléments d'interface.
const PAIRS = [
  ['ink', 'bg', 7, 'texte principal'],
  ['ink', 'surface', 7, 'texte principal sur carte'],
  ['ink', 'surface-2', 7, 'texte principal sur carte secondaire'],
  ['muted', 'bg', 7, 'texte secondaire'],
  ['muted', 'surface', 7, 'texte secondaire sur carte'],
  ['muted', 'surface-2', 4.5, 'texte secondaire sur carte secondaire'],
  ['accent-fg', 'bg', 7, 'texte accentué (petits labels)'],
  ['accent-fg', 'surface', 4.5, 'texte accentué sur carte'],
  ['accent-fg', 'accent-soft', 4.5, 'texte des badges accentués'],
  ['accent-ink', 'accent', 4.5, 'texte sur fond accent (boutons, carte 1)'],
  ['ok-fg', 'bg', 7, 'texte vert (disponibilité, résultats)'],
  ['ok-fg', 'surface', 4.5, 'texte vert sur carte'],
  ['ok-fg', 'ok-soft', 4.5, 'texte des badges verts'],
  ['ok', 'bg', 3, 'pastille verte (élément visuel)'],
  ['line-strong', 'bg', 3, 'bordure des champs et contrôles'],
  ['accent', 'bg', 3, 'accent comme élément visuel'],
];
for (const [theme, t] of Object.entries(themes)) {
  for (const [fg, bg, min, label] of PAIRS) {
    if (!t[fg] || !t[bg]) {
      add('FAIL', 'contraste', `token manquant : --c-${!t[fg] ? fg : bg} (thème ${theme})`, 'src/styles/global.css');
      continue;
    }
    const r = ratio(t[fg], t[bg]);
    if (r < min) add('FAIL', 'contraste', `${label} (${fg} sur ${bg}, thème ${theme}) : ${r.toFixed(2)}:1, minimum ${min}:1`, 'src/styles/global.css');
  }
}
if (!results.some((r) => r.rule === 'contraste')) add('PASS', 'contraste', `${PAIRS.length * 2} paires de couleurs conformes dans les deux thèmes`);

// Les docs doivent citer les valeurs réelles des tokens (pas de dérive doc/code).
if (existsSync(join(ROOT, 'docs/02-design-system.md'))) {
  const doc = read('docs/02-design-system.md').toLowerCase();
  const drift = [...new Set(Object.values(themes).flatMap((t) => Object.values(t)))].filter((h) => !doc.includes(h.toLowerCase()));
  if (drift.length) add('WARN', 'docs-tokens', `valeurs de global.css absentes de docs/02-design-system.md : ${drift.join(', ')}`, 'docs/02-design-system.md');
  else add('PASS', 'docs-tokens', 'docs/02-design-system.md cite toutes les valeurs des tokens');
}

// ───────────────────────── 2. Règles sur le code source ─────────────────────────
const ignore = (line) => line.includes('audit-ignore');
const scanLines = (rule, level, re, msg, files = astroFiles, filter = () => true) => {
  let hits = 0;
  for (const f of files) {
    lines(f).forEach((line, i) => {
      if (ignore(line) || !re.test(line) || !filter(line)) return;
      hits++;
      add(level, rule, `${msg} → ${line.trim().slice(0, 110)}`, `${f}:${i + 1}`);
    });
  }
  return hits;
};

// Texte semi-transparent = contraste imprévisible. On utilise des couleurs pleines.
const alphaText = scanLines('texte-opaque', 'FAIL', /\bopacity-(?!0\b|100\b)\d+\b|\b(?:text|placeholder:text)-(?:muted|ink|accent-fg|accent-ink|ok|ok-fg|bg)\/\d+/, 'transparence sur du texte (utiliser une couleur pleine)', astroFiles, (l) => !l.includes('aria-hidden'));
if (!alphaText) add('PASS', 'texte-opaque', 'aucun texte semi-transparent');

// Couleurs en dur : tout passe par les tokens.
const hard = scanLines('couleurs-tokens', 'FAIL', /\[#[0-9a-fA-F]{3,8}\]|style="[^"]*#[0-9a-fA-F]{3,8}/, 'couleur en dur (utiliser un token)');
if (!hard) add('PASS', 'couleurs-tokens', 'aucune couleur en dur dans les composants');

// Tailles : 12 px minimum ; sous 13 px uniquement pour un label en capitales (décisions D-14, D-25).
const tooSmall = scanLines('taille-texte', 'FAIL', /text-\[(\d+(?:\.\d+)?)px\]/, 'texte trop petit', astroFiles, (l) => {
  const sizes = [...l.matchAll(/text-\[(\d+(?:\.\d+)?)px\]/g)].map((m) => +m[1]);
  return sizes.some((s) => s < 12 || (s < 13 && !/uppercase/.test(l)));
});
if (!tooSmall) add('PASS', 'taille-texte', 'aucun texte sous 12 px ; sous 13 px seulement pour les labels en capitales');

// Labels en capitales : Inter gras, jamais de monospace (D-25).
const labels = scanLines('labels-police', 'FAIL', /\buppercase\b/, 'label en capitales en monospace (D-25 : Inter)', astroFiles, (l) => /font-mono/.test(l));
if (!labels) add('PASS', 'labels-police', 'labels en capitales en Inter, aucun monospace');

// Space Mono : uniquement URL, puces de stack et glyphe de code (D-25).
const monoMisuse = scanLines('mono-usage', 'FAIL', /\bfont-mono\b/, 'font-mono hors URL / puces de stack / glyphe de code', astroFiles, (l) => !/\{host\}|\{t\}|\{i\}|&lt;\/&gt;/.test(l));
if (!monoMisuse) add('PASS', 'mono-usage', 'Space Mono limité aux URL, puces de stack et glyphe de code');

// Police du texte courant : jamais monospace (décision D-14, lisibilité).
const fontSans = (css.match(/--font-sans:\s*([^;]+);/) || [])[1] || '';
if (/mono/i.test(fontSans)) add('FAIL', 'police-corps', `--font-sans est une police monospace (${fontSans.trim()}) : texte courant illisible`, 'src/styles/global.css');
else add('PASS', 'police-corps', `texte courant : ${fontSans.split(',')[0].trim()}`);

// Curseur : Tailwind 4 ne met plus cursor:pointer sur les boutons.
const pointerRule = [...css.matchAll(/([^{}]+)\{[^}]*cursor:\s*pointer[^}]*\}/g)].map((m) => m[1]).join(' ');
const missingPointer = ['a[href]', 'button', '[role="tab"]', 'summary'].filter((sel) => !pointerRule.includes(sel));
if (!missingPointer.length) add('PASS', 'curseur', 'règle globale cursor:pointer présente pour liens, boutons, onglets, summary');
else add('FAIL', 'curseur', `pas de cursor:pointer global pour : ${missingPointer.join(', ')}`, 'src/styles/global.css');

// Boutons : type explicite, nom accessible.
for (const f of astroFiles) {
  const src = read(f);
  for (const m of src.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const at = src.slice(0, m.index).split('\n').length;
    if (!/\btype=/.test(m[1])) add('FAIL', 'bouton-type', '<button> sans type', `${f}:${at}`);
    const text = m[2].replace(/<[^>]*>/g, '').replace(/\{[^}]*\}/g, (x) => (/[A-Za-zÀ-ÿ]{3,}/.test(x.replace(/\w+\./g, '')) ? 'x' : '')).trim();
    const named = /aria-label=/.test(m[1]) || text.length > 0 || /<span[^>]*sr-only/.test(m[2]) || /\{[^}]+\}/.test(m[2]);
    if (!named) add('FAIL', 'bouton-nom', 'bouton sans texte ni aria-label', `${f}:${at}`);
  }
  for (const m of src.matchAll(/<(img|Image)\b[^>]*>/gs)) {
    if (!/\balt=/.test(m[0])) add('FAIL', 'image-alt', `<${m[1]}> sans attribut alt`, `${f}:${src.slice(0, m.index).split('\n').length}`);
  }
  for (const m of src.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gs)) {
    if (!/\brel=/.test(m[0])) add('FAIL', 'lien-externe', 'target="_blank" sans rel', `${f}:${src.slice(0, m.index).split('\n').length}`);
  }
}
for (const rule of ['bouton-type', 'bouton-nom', 'image-alt', 'lien-externe'])
  if (!results.some((r) => r.rule === rule)) add('PASS', rule, { 'bouton-type': 'tous les boutons ont un type', 'bouton-nom': 'tous les boutons ont un nom accessible', 'image-alt': 'toutes les images ont un alt', 'lien-externe': 'tous les liens externes ont rel' }[rule]);

// Coins : les grands conteneurs utilisent rounded-card.
const radii = scanLines('coins', 'FAIL', /\brounded-3xl\b/, 'rounded-3xl : utiliser rounded-card (coins très ronds, décision D-11)');
if (!radii) add('PASS', 'coins', 'coins cohérents (rounded-card)');

// Vocabulaire : on n'écrit pas « outil métier » (décision D-04).
const wording = scanLines('vocabulaire', 'FAIL', /outils?\s+m[ée]tiers?/i, 'expression bannie « outil métier »', [...srcFiles, ...walk('src/content', ['.md'])].filter((f, i, a) => a.indexOf(f) === i));
if (!wording) add('PASS', 'vocabulaire', 'aucune expression bannie');

// Ancres : chaque lien #x pointe vers un id existant.
const allSrc = srcFiles.map(read).join('\n');
const ids = new Set([...allSrc.matchAll(/\bid="([\w-]+)"/g)].map((m) => m[1]));
const badAnchors = new Set();
for (const f of astroFiles.concat(['src/config/site.ts', 'src/data/offers.ts'])) {
  for (const m of read(f).matchAll(/href[=:]\s*['"]\/?#([\w-]+)['"]/g)) if (!ids.has(m[1])) badAnchors.add(`#${m[1]} (${f})`);
}
if (badAnchors.size) badAnchors.forEach((a) => add('FAIL', 'ancres', `lien vers un id inexistant : ${a}`));
else add('PASS', 'ancres', 'toutes les ancres pointent vers un id existant');

// ───────────────────────── 3. Navigation ─────────────────────────
const siteTs = read('src/config/site.ts');
const navBlock = siteTs.slice(siteTs.indexOf('export const nav'));
const navIds = new Set([...navBlock.matchAll(/href:\s*'\/?#([\w-]+)'/g)].map((m) => m[1]));
// Sections de la homepage ; « accueil » (logo) et « contact » (bouton d'action) n'ont pas d'entrée de menu.
const EXEMPT = new Set(['accueil', 'contact']);
const homeSections = walk('src/components/home', ['.astro']).flatMap((f) => [...read(f).matchAll(/<section\b[^>]*\bid="([\w-]+)"/g)].map((m) => m[1]));
const missing = homeSections.filter((id) => !navIds.has(id) && !EXEMPT.has(id));
if (missing.length) add('FAIL', 'navigation', `sections absentes du menu : ${missing.join(', ')} (ajouter dans nav, src/config/site.ts)`, 'src/config/site.ts');
else add('PASS', 'navigation', `menu couvre toutes les sections (${[...navIds].join(', ')})`);
const dead = [...navIds].filter((id) => !homeSections.includes(id));
if (dead.length) add('FAIL', 'navigation', `entrées de menu sans section : ${dead.join(', ')}`, 'src/config/site.ts');
const header = read('src/components/Header.astro');
if ((header.match(/nav\.map/g) || []).length < 2) add('FAIL', 'navigation-mobile', 'le menu mobile ne réutilise pas la liste nav (moins de deux nav.map dans Header.astro)', 'src/components/Header.astro');
else add('PASS', 'navigation-mobile', 'menu mobile présent et alimenté par la même liste');

// ───────────────────────── 4. Thème et docs ─────────────────────────
const layout = read('src/layouts/BaseLayout.astro');
if (/data-theme="dark"/.test(layout) && /localStorage/.test(layout)) add('PASS', 'theme', 'sombre par défaut, choix mémorisé, posé avant le rendu');
else add('FAIL', 'theme', 'thème sombre par défaut / script anti-flash absent de BaseLayout.astro (décision D-09)', 'src/layouts/BaseLayout.astro');

for (const d of ['README.md', '01-produit-et-positionnement.md', '02-design-system.md', '03-structure-et-contenu.md', '04-decisions.md', '05-technique.md']) {
  if (!existsSync(join(ROOT, 'docs', d))) add('FAIL', 'docs', `fichier manquant : docs/${d}`, 'docs/');
}
if (!results.some((r) => r.rule === 'docs')) add('PASS', 'docs', 'documentation présente');

// ───────────────────────── 5. Traduction (D-109) ─────────────────────────
// Règle : tout texte visible passe par `src/i18n/` (fr.ts = source, en.ts typé dessus). Aucun texte en dur dans un composant.
const blank = (m) => m.replace(/[^\n]/g, ' '); // garde les sauts de ligne pour conserver les numéros de ligne
// Fichiers dont le texte est propre à une langue (prose longue) : exemptés du contrôle de texte en dur.
const I18N_PROSE = new Set(['src/components/legal/LegalFr.astro', 'src/components/legal/LegalEn.astro']);
// Noms propres et symboles qui s'affichent identiques dans toutes les langues.
const I18N_NEUTRAL = new Set(['Elvis Pichou', 'EP', 'Malt', 'LinkedIn', 'GitHub', 'Astro', 'Umami']);
let hardText = 0;
for (const f of astroFiles.filter((x) => !I18N_PROSE.has(x))) {
  let src = read(f);
  const fm = src.match(/^---\n[\s\S]*?\n---\n/);
  if (fm) src = blank(fm[0]) + src.slice(fm[0].length);
  src = src
    .replace(/<script\b[\s\S]*?<\/script>/g, blank)
    .replace(/<style\b[\s\S]*?<\/style>/g, blank)
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, blank);
  // Expressions { … } : on retire les plus internes d'abord (JSX imbriqué compris).
  for (let i = 0; i < 8; i++) src = src.replace(/\{[^{}]*\}/g, blank);
  const at = (idx) => src.slice(0, idx).split('\n').length;
  for (const m of src.matchAll(/>([^<>]+)</g)) {
    const text = m[1].replace(/&[a-z]+;/g, ' ').trim();
    if (!/[A-Za-zÀ-ÿ]{2,}/.test(text) || I18N_NEUTRAL.has(text) || ignore(lines(f)[at(m.index + 1) - 1] ?? '')) continue;
    hardText++;
    add('FAIL', 'i18n-texte', `texte en dur (le mettre dans src/i18n/) → ${text.slice(0, 80)}`, `${f}:${at(m.index + 1)}`);
  }
  // Attributs lisibles ou lus par un lecteur d'écran : texte littéral interdit.
  for (const m of src.matchAll(/\b(aria-label|alt|title|placeholder|aria-description)="([^"]*[A-Za-zÀ-ÿ]{2,}[^"]*)"/g)) {
    if (ignore(lines(f)[at(m.index) - 1] ?? '') || (m[1] === 'alt' && !m[2].trim())) continue;
    hardText++;
    add('FAIL', 'i18n-texte', `${m[1]}="${m[2].slice(0, 60)}" en dur (le mettre dans src/i18n/)`, `${f}:${at(m.index)}`);
  }
}
if (!hardText) add('PASS', 'i18n-texte', 'aucun texte visible en dur dans les composants (tout vient de src/i18n/)');

// Contenu Markdown : chaque étude de cas existe dans toutes les langues, avec les mêmes champs.
const langDirs = readdirSync(join(ROOT, 'src/content/realisations')).filter((d) => statSync(join(ROOT, 'src/content/realisations', d)).isDirectory());
const keysOf = (p) => [...read(p).split('---')[1].matchAll(/^([A-Za-z]+):/gm)].map((m) => m[1]).sort().join(',');
const ref = langDirs.includes('fr') ? 'fr' : langDirs[0];
let parityFail = 0;
for (const d of langDirs.filter((x) => x !== ref)) {
  const refFiles = readdirSync(join(ROOT, 'src/content/realisations', ref)).filter((n) => n.endsWith('.md'));
  const files = readdirSync(join(ROOT, 'src/content/realisations', d)).filter((n) => n.endsWith('.md'));
  for (const n of refFiles) {
    if (!files.includes(n)) { parityFail++; add('FAIL', 'i18n-contenu', `étude de cas sans version « ${d} » : ${n}`, `src/content/realisations/${d}/`); continue; }
    if (keysOf(`src/content/realisations/${ref}/${n}`) !== keysOf(`src/content/realisations/${d}/${n}`)) { parityFail++; add('FAIL', 'i18n-contenu', `champs différents entre « ${ref} » et « ${d} » : ${n}`, `src/content/realisations/${d}/${n}`); }
  }
  for (const n of files) if (!refFiles.includes(n)) { parityFail++; add('FAIL', 'i18n-contenu', `étude de cas « ${d} » sans version « ${ref} » : ${n}`, `src/content/realisations/${d}/`); }
}
if (!parityFail) add('PASS', 'i18n-contenu', `études de cas présentes et alignées dans toutes les langues (${langDirs.join(', ')})`);

// Pages : toute page du dossier [...lang] déclare ses chemins par langue ; la mise en page pose lang, hreflang et og:locale.
const unlocalized = walk('src/pages', ['.astro']).filter((f) => !f.includes('[...lang]') && !/pages\/404\.astro$/.test(f));
if (unlocalized.length) add('FAIL', 'i18n-pages', `pages hors de src/pages/[...lang]/ (non traduites) : ${unlocalized.join(', ')}`);
else add('PASS', 'i18n-pages', 'toutes les pages sont servies dans chaque langue');
if (/<html lang=\{lang\}/.test(layout) && /hreflang/.test(layout) && /og:locale/.test(layout)) add('PASS', 'i18n-seo', 'html lang, hreflang et og:locale dépendent de la langue');
else add('FAIL', 'i18n-seo', 'BaseLayout doit poser <html lang={lang}>, les liens hreflang et og:locale', 'src/layouts/BaseLayout.astro');

// ───────────────────────── Sortie ─────────────────────────
const order = { FAIL: 0, WARN: 1, PASS: 2 };
results.sort((a, b) => order[a.level] - order[b.level]);
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(results, null, 2));
} else {
  const icon = { FAIL: '✗', WARN: '!', PASS: '✓' };
  for (const r of results) console.log(`${icon[r.level]} ${r.level.padEnd(4)} [${r.rule}] ${r.msg}${r.where ? `  (${r.where})` : ''}`);
  const n = (l) => results.filter((r) => r.level === l).length;
  console.log(`\n${n('PASS')} conformes · ${n('WARN')} à revoir · ${n('FAIL')} non conformes`);
}
process.exit(results.some((r) => r.level === 'FAIL') ? 1 : 0);
