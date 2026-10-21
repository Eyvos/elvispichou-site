# 02 · Design system

Source du code : `src/styles/global.css` (tokens et règles de base). Cette page doit citer les valeurs réelles : `npm run audit`
signale toute dérive (`docs-tokens`).

## Principes

- **Sobre et affirmé** : aplats, filets, grande typographie. Pas de flou décoratif, pas de dégradés, pas de rendu « IA lisse ».
- **Lisible d'abord** : le contraste et la taille du texte passent avant le style (D-14, D-15).
- **Deux couleurs, pas plus** : cobalt (accent) sur fond crème ou nuit. Le vert n'existe que pour la disponibilité et les résultats.
- **Le dé est la signature** (D-12, D-21) : une seule idée forte, pas dix.
- Pas de thème plaqué (affiche, dossier, boutique, jeu de rôle littéral) : jugés trop IA, pas assez pro ou déjà vus (voir `04-decisions.md`).

## Thème (D-09)

- **Sombre par défaut.** Le thème clair est au choix (bouton soleil/lune dans l'en-tête), mémorisé dans `localStorage`.
- Le thème est posé par un script en ligne dans `BaseLayout.astro` **avant le premier rendu** (pas de flash).
- Sombre = `:root`, clair = `:root[data-theme="light"]`. Tout est exprimé en tokens : aucune couleur en dur dans les composants.

## Palette « Cobalt et crème » (D-10)

| Token | Sombre | Clair | Usage |
|---|---|---|---|
| `--c-bg` | `#0f1016` | `#f3f0e8` | Fond de page |
| `--c-surface` | `#161821` | `#fbf9f4` | Cartes, sections en retrait |
| `--c-surface-2` | `#23242e` | `#e3ddcf` | Carte secondaire, pastilles, fonds de blocs |
| `--c-ink` | `#f3f0e8` | `#15151a` | Texte principal |
| `--c-muted` | `#adadb6` | `#45454c` | Texte secondaire |
| `--c-line` | `#2c2e3a` | `#d6d0c1` | Filets décoratifs (jamais seuls pour délimiter un champ) |
| `--c-line-strong` | `#6a6c7e` | `#8a8577` | Bordures des champs, boutons secondaires, pilules |
| `--c-accent` | `#3f54f5` | `#2b44ff` | Fonds accentués : boutons, carte 1, cercles de la méthode |
| `--c-accent-ink` | `#ffffff` | `#ffffff` | Texte sur fond accent |
| `--c-accent-fg` | `#94a1ff` | `#1c2fc4` | **Texte** accentué : labels, liens, verbe du titre |
| `--c-accent-soft` | `#1c2247` | `#dfe3ff` | Fond des badges et pastilles d'icône |
| `--c-ok` | `#4fc58a` | `#1b8a52` | Pastille verte (élément visuel « disponible ») |
| `--c-ok-fg` | `#6ddba6` | `#0d5230` | **Texte** vert |
| `--c-ok-soft` | `#123826` | `#d3ecdc` | Fond des badges verts |

Règles :

- L'accent en **fond** (`accent`) et l'accent en **texte** (`accent-fg`) sont deux tokens distincts : ne jamais écrire un texte en `text-accent`.
- Le vert en texte = `text-ok-fg`, jamais `text-ok` (contraste).
- Exception documentée (D-62) : les deux logos de substitution des clients (vert sauge et violet, `data-audit-ignore`).
- Exception documentée : la tuile de logo des clients est toujours claire (`#f3f0e8` / `#15151a`, marquée `audit-ignore`) pour que les logos sombres restent lisibles en thème sombre.

## Contraste (D-15)

Mesuré par `npm run audit` sur les deux thèmes (WCAG 2.x).

| Paire | Minimum |
|---|---|
| Texte principal et texte secondaire sur fond et sur carte | **7:1** |
| Texte secondaire sur carte secondaire, `accent-fg` sur carte / badge, `accent-ink` sur `accent`, `ok-fg` sur carte / badge | **4,5:1** |
| Petits labels en `accent-fg` et texte vert sur fond de page | **7:1** |
| Bordure de champ / de bouton, pastille verte, accent comme élément visuel | **3:1** |

**Aucun texte semi-transparent** : pas de `opacity-*` ni de `text-…/70` sur du texte. On utilise une couleur pleine ; la hiérarchie se fait
par la taille, la graisse et le token (`ink` / `muted`).

## Typographie (D-13 remplacé par D-14)

| Rôle | Police | Détail |
|---|---|---|
| Grands titres (H1, H2 de section) | **Unbounded** (variable) | Large et expressive : réservée aux titres de grande taille |
| Titres courts (H3, H4, titres de cartes) | **Space Grotesk** (variable) | Plus lisible qu'Unbounded en petite taille |
| Texte courant, boutons, navigation | **Inter** (variable) | 16 px, interligne 1,75. Jamais de monospace pour du texte courant |
| Labels en capitales | **Inter** gras | `text-xs font-bold uppercase tracking-[0.1em]` (12 px), classe `eyebrow` pour les sur-titres (D-25) |
| URL, puces de stack, glyphe de code | **Space Mono** | Usage technique uniquement : barre d'URL des captures, puces de technologies, `</>`. Aussi les chiffres du dé (canvas). **Jamais sur un label ni un paragraphe** |

Tailles minimales :

- Texte courant ≥ 14 px (`text-sm`). Texte de légende ≥ 13 px.
- **12 px minimum**. Sous 13 px, uniquement pour un label en capitales (`uppercase`).
- Tout `uppercase` est en Inter gras : **jamais `font-mono` sur un label** (D-25).
- Les **cibles des offres** (Indépendants, commerçants / TPE, PME) sont en grand : 20 px semi-gras, numéro en Unbounded 30 px (D-26).

Hiérarchie d'accueil (D-40, D-44) : sur-titre « Développeur web freelance » (Inter gras capitales, 14 → 16 px, `accent-fg`, à côté de la photo) ; phrase d'intro en Unbounded 400 (petite) ; verbe en Unbounded 600 (très grand, `accent-fg`, taille calée sur la largeur de sa colonne pour que « rendent visible » ne soit jamais coupé) ; fin de phrase en Unbounded 400 ; ligne de confiance en Inter 16 px `muted`.

## Forme (D-11)

- **Cartes et grands conteneurs : `rounded-card` (30 px)**, coins « très ronds ». Jamais `rounded-3xl`.
- Boutons, pilules, onglets, badges : `rounded-full`. Pastilles d'icône : `rounded-2xl`. Champs : `rounded-2xl`.
- Cartes **droites** (pas inclinées), **espacées** (`gap-4`), avec du contenu (titre, phrase, 3 puces, lien).

## Composants

| Composant | Règles |
|---|---|
| Bouton principal | `btn btn-primary` : fond `accent`, texte `accent-ink`, Inter 700 14 px. Un seul par zone visible |
| Bouton secondaire | `btn btn-ghost` : bordure `line-strong` |
| Bloc « profil technique » (accueil) | Carte **sans bordure** `bg-surface`, compacte : titre (H2) 18 px, phrase 15 px, bouton **secondaire** `btn-ghost` réduit : l'action principale du hero est dans les cartes (D-27 amendé par D-41, D-45) |
| Barre de navigation | Entrées à plat, **sans cercle ni pilule** ; section active : texte `ink` + trait `accent-fg` de 2 px dessous (D-28, D-75) |
| Badge | `bg-accent-soft text-accent-fg` (accent) ou `bg-ok-soft text-ok-fg` (vert) |
| Carte d'offre (accueil) | 2 cartes : carte 1 (outil sur mesure, prioritaire) `bg-accent`, carte 2 (site vitrine) `bg-surface-2` avec bordure `line-strong` (D-52). Titre = le problème du client (question). **Bouton d'action plein et compact** en pied, calé à gauche (pleine largeur sur mobile uniquement, D-51) : pastille blanche + texte `accent` sur la carte 1 (≥ 5,5:1 sur les deux thèmes), pastille `ink` sur la carte 2. Le hero remplit la hauteur de l'écran dès 1024 px ; l'espace libre est réparti entre les blocs, jamais dans les cartes (D-45, D-50). Clic sur la carte → onglet correspondant de la section détail (D-18) |
| Identité du hero | Haut à droite (≥ 1024 px) : photo 150 px `rounded-card` 4:5 à gauche ; à droite sur-titre « Développeur web freelance », « Depuis 2021 dans le web », « 4 ans pour la Gendarmerie nationale » sur sa ligne, pastille de lieu (D-49). Écran de bureau haut (≥ 960 px, variante `tall`) : texte **sous** la photo (270 px), lieu en pastille à moitié sortie sous la photo, titre agrandi et centré sur l'ensemble photo + textes (D-54, D-56). Mobile : vignette 72 px + le même texte, au-dessus du titre. Photo `src/assets/elvis.webp` (provisoire, D-52) ; monogramme « EP » sans fichier (D-40, D-44) |
| Onglets d'offre | Pastille compacte `rounded-full` (icône + nom), l'active en `bg-accent` (D-58). `role="tablist"`, flèches gauche/droite, `aria-selected`, lien direct `#offre-outil` / `#offre-site`. Ordre : Transformation digitale, puis Site vitrine (D-37) |
| Cadre de navigateur | `BrowserFrame` : capture réelle si le fichier existe, sinon maquette abstraite. Barre fine `surface-2`, trois points `line-strong`, adresse **centrée** dans une pilule avec cadenas (mono 13 px), bordure `line-strong` et ombre portée. Sur la fiche détaillée : en grand dans sa colonne ; peut contenir un contenu libre (`<slot>`) à la place d'une capture (D-123) |
| Frise méthode | 4 cercles `accent` avec icône Lucide, numéro, pointillés, pastille « ce que vous recevez » |
| Icônes | `@lucide/astro`, trait fin, `aria-hidden` (décoratives) |

## Téléphone et tablette (D-118)

Règles et motifs dans `06-experience-mobile.md`. En bref : aucun bouton flottant (D-119), onglets collants (`stick:`), contrôles
segmentés fins, carrousel `swipe` pour la réassurance, cartes distinctes sans dé sur téléphone, espacements serrés, pied de page gris
`surface` (comme les sections grises, D-120), marge latérale `--gutter` (zones sûres iOS), mouvements au survol réservés à `@media (hover: hover)`.

## Le dé (D-12, D-21)

- Icosaèdre en fil de fer dessiné sur `<canvas>` (`src/lib/die.ts`), **grand** (104 px), posé **entre les deux cartes** côte à côte ; **absent sur téléphone** (< 768 px, D-119).
- Un clic le lance ; la face qui s'arrête choisit le verbe du titre. **Un 20 donne toujours « simplifient »**.
- **Tableau d'aéroport** (D-47, D-48) : le **mot entier** roule vers le haut (600 ms), le suivant monte du bas ; un verbe toutes les 4 s, 5 tours puis arrêt ; pause au survol du titre ; **sans animation** avec `prefers-reduced-motion` (le verbe change, sans mouvement). Taille du verbe fixe, calée sur le mot le plus long. Pas de lien survol de carte ↔ verbe. Ne jamais conditionner la rotation à `document.hidden` (le navigateur intégré le renvoie à tort).
- **Défi du dé (D-130)** : un seul dé (celui entre les cartes) ; bouton « ? » dessus → wizard non modal en bas d'écran, **sans dé**, qui fait rouler ce dé. Le dé se lance aussi en direct (étiquette de résultat). Résultat : 20 = critique, 10-19 = beau jet, 2-9 = dommage, 1 = échec critique ; chacun anime le dé, les cartes (`data-die-stage`), un cadre d'écran et des triangles / anneaux en fil de fer (`accent-fg`, `ink`, `muted`), sans dégradé. Tablette et bureau seulement ; aucune animation en mouvement réduit.
- Cartes côte à côte dès 768 px : dé centré sur la jointure ; cartes empilées (téléphone) : pas de dé (D-119).
- Animation du verbe : **« rouleau »** (l'ancien sort par le haut, le nouveau monte du bas). Lancer automatique 0,9 s après le chargement.
- Vitesse indépendante de la fréquence d'écran ; animation suspendue hors écran ; **aucune animation** avec `prefers-reduced-motion`
  (le clic tire une position au hasard, le verbe change sans animation).
- Accessibilité : bouton nommé, résultat annoncé (`role="status"`), titre statique lisible tel quel par les lecteurs d'écran.

## Interactions et accessibilité (D-16)

- **Tout élément cliquable affiche `cursor: pointer`** (liens, boutons, onglets, `summary`, `select`, radios/cases). Règle globale dans
  `global.css`, car Tailwind 4 ne la pose plus. Un bouton désactivé affiche `not-allowed`.
- Focus clavier visible partout (`:focus-visible`, contour accent), lien d'évitement « Aller au contenu ».
- Tout `<button>` a un `type` et un nom accessible. Toute image a un `alt`. Tout lien `target="_blank"` a un `rel`.
- Mouvement réduit respecté (`prefers-reduced-motion`).
- Cibles tactiles ≥ 40 px.
- Lien `target="_blank"` : texte masqué « (nouvelle fenêtre) ». Champ de formulaire : message d'erreur propre relié par `aria-describedby`, jamais la couleur seule (D-98).

## Interdits (issus des retours d'Elvis)

- Fonds flous, blobs, dégradés décoratifs.
- Texte en monospace pour les paragraphes ou les labels.
- Couleurs en dur dans les composants (`bg-[#…]`) hors exception documentée.
- Texte gris pâle ou semi-transparent.
- Thèmes plaqués (jeu de rôle littéral, affiche de concert, dossier administratif, boutique).

## Mouvement (D-96)

- **Chargement** : écran avec un d20 qui roule, visible seulement si la page tarde (> 0,7 s) ; le dé s'arrête sur 20. Code : balisage et scripts dans `BaseLayout.astro`, styles `.loader*` dans `global.css`.
- **Apparitions** : attribut `data-reveal` (`up`, `title`, `left`, `right`, `zoom`, `pop`) et `data-reveal-delay` (ms). Les sections de l'accueil hors hero sont balisées automatiquement ; l'attribut est retiré après l'animation pour laisser le survol agir.
- **Survols** : classe `.lift` (carte qui se soulève), `.btn` (relief), micro-rotations des icônes. Réservés à la souris (`@media (hover: hover)` pour `.lift`).
- **Mouvement réduit** : toutes les animations et transitions sont coupées (règle globale).
