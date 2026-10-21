// Génère les visuels de référencement dans public/ : images de partage (Open Graph, 1200×630, une par langue) et icônes.
// À relancer si l'identité change : node scripts/make-seo-assets.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

// Couleurs du thème sombre (src/styles/global.css).
const c = { bg: '#0f1016', surface: '#161821', line: '#2c2e3a', ink: '#f3f0e8', muted: '#adadb6', accent: '#3f54f5', accentFg: '#94a1ff' };
const font = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const cards = {
  fr: { role: 'Développeur web freelance', line1: 'Des outils web qui simplifient', line2: 'le travail des entreprises.', place: 'Toulouse · missions 100 % à distance' },
  en: { role: 'Freelance web developer', line1: 'Web tools that simplify', line2: 'the work of businesses.', place: 'Toulouse · 100% remote work' },
};

for (const [lang, t] of Object.entries(cards)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${c.bg}"/>
  <rect x="40" y="40" width="1120" height="550" rx="32" fill="${c.surface}" stroke="${c.line}" stroke-width="2"/>
  <rect x="104" y="186" width="96" height="8" rx="4" fill="${c.accent}"/>
  <text x="104" y="150" font-family="${font}" font-size="34" font-weight="700" fill="${c.ink}">Elvis Pichou<tspan fill="${c.accentFg}">.</tspan></text>
  <text x="104" y="330" font-family="${font}" font-size="66" font-weight="700" fill="${c.ink}">${t.line1}</text>
  <text x="104" y="420" font-family="${font}" font-size="66" font-weight="700" fill="${c.accentFg}">${t.line2}</text>
  <text x="104" y="520" font-family="${font}" font-size="34" font-weight="600" fill="${c.ink}">${t.role}</text>
  <text x="104" y="562" font-family="${font}" font-size="26" fill="${c.muted}">${t.place}</text>
  <text x="1096" y="562" text-anchor="end" font-family="${font}" font-size="26" fill="${c.muted}">elvispichou.com</text>
</svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(`public/og-${lang}.png`);
}

// Icônes : Google demande un multiple de 48 px ; iOS utilise l'icône 180 px.
const icon = readFileSync('public/favicon.svg');
await sharp(icon, { density: 600 }).resize(48, 48).png().toFile('public/favicon-48.png');
await sharp(icon, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('Visuels SEO générés dans public/');
