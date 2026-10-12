# 03 · Structure et contenu

## Plan du site (D-06)

```
/                       Accueil : one-page commerciale par ancres
/realisations/[slug]    Une étude de cas (trik3r, gendarmerie, chariot)
/profil                 Page technique pour recruteurs, ESN, agences
/mentions-legales       Mentions légales (noindex)
/404                    Page introuvable (noindex)
/api/contact            Seule route serveur : formulaire de contact
```

## Accueil : ordre des sections

| # | Section | id | Menu | Rôle |
|---|---|---|---|---|
| 1 | Hero : phrase + photo + ligne de confiance + 2 cartes (outil d'abord) + dé + bloc profil technique | `accueil` | logo | Dire en 5 s ce que je fais ; deux portes d'entrée ; accès recruteurs |
| 2 | Détail des offres (onglets) | `offre` | Offres | Expliquer pourquoi les gens paient (D-18) |
| 2b | Bandeau « Ils m'ont fait confiance » (bloc sans entrée de menu, D-61) | — | — | Gendarmerie nationale, Trik3r Collecte, Stéphanie Lortal, Ingrid Médium |
| 3 | Réalisations : Trik3r, Chariot, Gendarmerie (panneau de chiffres clés au lieu d'une capture) puis carte « Votre projet pourrait être le prochain » (D-64, D-66, D-70) | `realisations` | Réalisations | Preuves, avec URL, captures, logos |
| 4 | Qui je suis | `a-propos` | Qui je suis | Photo, chiffres, trois arguments |
| 5 | Contact | `contact` | bouton « Parler de mon projet » | Formulaire, réponse sous 24 h |

Règle (D-17) : **toute nouvelle section de l'accueil reçoit une entrée de menu** (`nav` dans `src/config/site.ts`), sauf `accueil`
(logo) et `contact` (bouton d'action). `npm run audit` échoue sinon.

## Navigation (D-17)

- Menu principal (≥ 1024 px) : Offres · Réalisations · Qui je suis, **à plat, sans cercle** (D-28) ; **la section visible est soulignée d'un trait d'accent** (`aria-current`, D-75) ; ombre sous l'en-tête dès le défilement.
- Accès discret « Profil technique » (D-05) dans le menu : texte simple à droite (≥ 1024 px, actif sur `/profil`), dans le menu mobile et en pied de page.
- Sous les deux cartes de l'accueil : **bloc visible** « Vous voulez en savoir plus sur mes compétences ? » + bouton secondaire « Voir mon profil technique » (D-27, D-36, D-41).
- **Disponibilité** : plus affichée dans la barre de navigation (D-76) ; elle reste sur `/profil`.
- Bouton d'action : « Parler de mon projet » (« Contact » en version courte). Bascule clair/sombre toujours présente.
- **Menu mobile** (< 1024 px) : bouton burger, panneau plein écran, mêmes entrées numérotées que le menu principal + Profil technique, disponibilité et bouton d'action en bas ;
  défilement de la page verrouillé, focus gardé dans le menu ; se ferme au clic sur un lien, hors du panneau et avec Échap (D-75).

## Offres : comportement (D-18)

- Les deux cartes de l'accueil **ne mènent pas au formulaire**. Un clic sélectionne l'onglet correspondant dans la section détail et fait
  défiler jusqu'à elle. L'URL devient `/#offre-site` ou `/#offre-outil` (lien direct partageable).
- Onglets : « Transformation digitale » (par défaut) puis « Site vitrine » (D-37). Sans JavaScript, les deux panneaux s'affichent l'un sous l'autre.
- Titre de section « Ce que je fais pour vous » + onglets. Contenu de chaque panneau (`src/data/offers.ts`, D-60) : badge public + titre-promesse + intro ; 4 tuiles « Ce que ça change pour vous » ; bandeau « Comment ça se passe » (3 étapes) ; « Ce que vous obtenez » + **un seul** bouton « Demander un devis » vers le formulaire pré-rempli (`/?projet=site|outil#contact`), avec la phrase de prix. Pas de preuve dans cette section.

## Études de cas (D-08)

Fichier : `src/content/realisations/<slug>.md`. Champs obligatoires validés au build (`src/content.config.ts`).

Plan de lecture : **le problème → la démarche → le résultat**, puis le bloc repliable **« Sous le capot »** (stack, points techniques) pour
les profils techniques. En-tête : cadre de navigateur avec capture et URL, lien « Voir le site ».

Règles :
- **Aucun chiffre inventé.** Seuls les faits de `01-produit-et-positionnement.md` sont utilisables.
- Gendarmerie : pas de capture ni de logo officiel (confidentialité) ; cadre « application interne · confidentiel ».
- Témoignage : champ `testimonial`, affiché seulement s'il existe.
- Trik3r = cas phare (`featured: true`).

## Images (D-19)

Convention : on dépose un fichier au bon nom, il apparaît. Sans fichier, un repère visuel discret s'affiche (jamais de texte d'attente en production).

| Fichier | Où |
|---|---|
| `src/assets/elvis.jpg` (.png/.webp) | Photo du hero **et** de « Qui je suis » (sinon monogramme EP) |
| `src/assets/realisations/<slug>.png` | Capture dans la carte et l'en-tête de l'étude de cas |
| `src/assets/logos/<id>.svg` (.png) | Logo dans « Ils m'ont fait confiance » (id : `clients` dans `src/config/site.ts`) |

URL affichées : champ `url` du frontmatter de l'étude de cas et `clients[].url` (`src/config/site.ts`).

## Qui je suis

Photo (emplacement), quatre chiffres tirés uniquement des faits vérifiés, trois arguments avec icône (comprendre le métier, un seul
interlocuteur, des outils faits pour durer). Ce bloc ne doit pas devenir un CV (D-01).

## Contact

Champs : type de projet (outil / site / autre), nom, email, entreprise, budget indicatif, message (≥ 20 caractères). Validation côté serveur,
anti-spam (champ piège + délai de 3 s), fonctionne sans JavaScript. Accusé de réception envoyé au prospect. Aucun stockage en base.

## Profil technique

`/profil` : stack groupée, expériences avec renvoi vers les études de cas, formation, section « Ce site » qui explique les choix
(Astro plutôt que Next.js, contenu typé, sobriété). Bouton CV et GitHub affichés seulement si les liens existent.

## Conventions de contenu

- Français, vouvoiement, casse de phrase (D-04 : jamais « outil métier »).
- Les liens à `null` dans `src/config/site.ts` ne s'affichent pas (LinkedIn, GitHub, CV, calendrier).
- Toute ancre `#x` doit pointer vers un `id` existant (contrôlé par l'audit).
