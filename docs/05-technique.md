# 05 · Technique

## Stack (D-07)

| Domaine | Choix |
|---|---|
| Framework | Astro 7 (pages statiques, JavaScript seulement où il sert), TypeScript strict |
| Style | Tailwind CSS 4, tokens CSS (`src/styles/global.css`) |
| Contenu | Content Collections (Markdown + schéma Zod) pour les études de cas |
| Icônes | `@lucide/astro` |
| Polices (auto-hébergées) | Inter, Unbounded, Space Grotesk, Space Mono (paquets `@fontsource`) |
| Hébergement | Cloudflare Workers (adaptateur `@astrojs/cloudflare`) |
| Formulaire | Route serveur `src/pages/api/contact.ts`, validation Zod, envoi via Resend |
| Analytics | Umami (sans cookie), script chargé si `PUBLIC_UMAMI_WEBSITE_ID` est défini |
| SEO | Sitemap bilingue, canonical, `hreflang`, Open Graph, JSON-LD `Person` + `ProfessionalService` |
| Traduction (D-109) | Français (défaut, sans préfixe) et anglais (`/en`) : routage Astro `src/pages/[...lang]/`, dictionnaires typés `src/i18n/` |

## Traduction (D-109, D-110)

| Élément | Où |
|---|---|
| Textes de l'interface | `src/i18n/fr.ts` (source, définit la forme) et `src/i18n/en.ts` (typé dessus : clé manquante = erreur `astro check`) |
| Utilisation | `const { lang, t } = useI18n(Astro.url);` puis `{t.section.cle}` ; liens internes : `localePath(lang, '/profil')` ; variables : `fmt(t.x, { n })` |
| Langue d'une page | Déduite de l'URL (`/en/…` = anglais, sinon français), jamais mémorisée |
| Pages | `src/pages/[...lang]/` + `getStaticPaths() { return langStaticPaths(); }` ; la 404 (`src/pages/404.astro`) est rendue à la demande pour suivre la langue de l'URL |
| Études de cas | `src/content/realisations/<fr|en>/<slug>.md`, mêmes champs dans les deux langues ; `getCases(lang)` dans `src/lib/cases.ts` |
| Prose longue | Un composant par langue : `src/components/legal/LegalFr.astro` et `LegalEn.astro` |
| Scripts côté navigateur | Textes passés par l'attribut `data-i18n` (JSON) de la section ou du formulaire, jamais écrits dans le script |
| Formulaire | Champ caché `lang` ; le serveur répond (erreurs, accusé de réception par e-mail) dans la langue du visiteur ; budgets envoyés sous forme de codes (`lt2k`, `2to5k`…). La notification reçue par Elvis reste en français |
| Données non traduites | `src/config/site.ts` (nom, URL, e-mail, liens, identifiants) : indépendantes de la langue |
| Ajouter une langue | Ajouter le code dans `locales` et `localeMeta` (`src/i18n/index.ts`), créer son dictionnaire typé sur `fr.ts`, un dossier de contenu par étude de cas, un composant légal, et la langue dans `sitemap({ i18n })` (`astro.config.mjs`) |

## Commandes

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check (types + contenus) puis build
npm run audit      # contrôle des règles de docs/ (voir ci-dessous)
```

## Variables d'environnement (`.env.example`)

`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` (formulaire) ; `PUBLIC_UMAMI_WEBSITE_ID`, `PUBLIC_UMAMI_SRC` (analytics).
Sans clé Resend, les demandes s'affichent dans la console (développement).

## Événements analytics

`cta-header`, `cta-hero-contact`, `offre-site`, `offre-outil`, `offre-tab`, `cta-offre-site`, `cta-offre-outil`, `proof-site`, `proof-outil`,
`lang-switch`, `profil-nav`, `profil-home`, `profil-footer`, `case-open`, `case-under-the-hood`, `case-visit`, `client-link`, `cta-case`, `die-roll`,
`contact-submit`, `contact-success`, `cta-mailto`, `cv-download`, `cta-calendar`.

## Contrôles automatiques (`scripts/audit.mjs`)

| Règle | Ce qui est vérifié | Décision |
|---|---|---|
| `contraste` | 32 paires de couleurs, deux thèmes, seuils WCAG de `02-design-system.md` | D-15 |
| `texte-opaque` | Pas d'`opacity-*` ni de `text-…/NN` sur du texte | D-15 |
| `couleurs-tokens` | Pas de couleur en dur dans les composants | D-10 |
| `taille-texte` | Rien sous 12 px ; sous 13 px seulement pour les labels en capitales | D-14, D-25 |
| `labels-police` | Aucun label en capitales en `font-mono` (Inter gras) | D-25 |
| `mono-usage` | `font-mono` seulement pour les URL, puces de stack et glyphe de code | D-25 |
| `police-corps` | `--font-sans` n'est pas une police monospace | D-14 |
| `curseur` | Règle globale `cursor:pointer` (liens, boutons, onglets, summary) | D-16 |
| `bouton-type`, `bouton-nom`, `image-alt`, `lien-externe` | Accessibilité de base | D-16 |
| `coins` | Pas de `rounded-3xl` (utiliser `rounded-card`) | D-11 |
| `vocabulaire` | Expression « outil métier » absente | D-04 |
| `ancres` | Chaque `#x` pointe vers un `id` existant | D-17 |
| `navigation`, `navigation-mobile` | Chaque section de l'accueil est dans le menu ; le menu mobile réutilise la même liste | D-17 |
| `theme` | Sombre par défaut, mémorisé, script anti-flash | D-09 |
| `docs`, `docs-tokens` | Docs présentes ; valeurs de `global.css` citées dans `02-design-system.md` | D-24 |
| `i18n-texte` | Aucun texte visible, `aria-label`, `alt`, `title` ou `placeholder` en dur dans un composant (hors mentions légales) | D-110 |
| `i18n-contenu` | Chaque étude de cas existe dans toutes les langues, avec les mêmes champs | D-110 |
| `i18n-pages` | Toute page est servie dans chaque langue (`src/pages/[...lang]/`) | D-110 |
| `i18n-seo` | `<html lang>`, `hreflang` et `og:locale` suivent la langue | D-109 |
| `mobile-plateforme` | `viewport-fit=cover`, variante `stick:` et marge `--gutter` définies ; aucune barre d'action flottante | D-118, D-119 |
| `mobile-survol` | Aucun mouvement (`transform`, `animation`, `translate`, `scale`, `rotate`) déclenché par `:hover` hors `@media (hover: hover)` | D-118 |

Une ligne peut être exemptée avec `audit-ignore` (attribut ou commentaire), **à condition d'écrire la raison à côté** et de lister
l'exception dans `02-design-system.md`.

## Qualité et CI (`.github/workflows/ci.yml`)

Build (avec `astro check`), Lighthouse CI sur `/`, `/profil/`, une étude de cas et leurs versions `/en/` : performance ≥ 95, accessibilité = 100,
bonnes pratiques ≥ 95, SEO = 100. Le contrôle `npm run audit` est exécuté avant.

## Limites connues

- Chrome n'est pas installé sur la machine de développement : Lighthouse ne tourne qu'en CI.
- Les fonctions s'exécutent sur le runtime Workers de Cloudflare (pas Node) ; secrets lus via `cloudflare:workers` (`.dev.vars` en local).
- Le dé est un canvas 2D : pas de WebGL, pas de dépendance.
