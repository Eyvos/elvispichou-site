# 06 · Expérience mobile et tablette

Le téléphone et la tablette ne sont pas une version réduite du bureau : ce sont des expériences à part entière, elles aussi au service
de la prise de contact (D-118). Ce fichier contient les **règles fonctionnelles** à respecter pour toute nouvelle fonctionnalité
(§ Règles), les **motifs** déjà en place à réutiliser (§ Motifs), et l'**audit** qui les a fait naître (§ Audit du 19/10/2026).

## Appareils de référence

| Appareil | Largeur | Ce qui change |
|---|---|---|
| Téléphone | < 768 px (`max-md:`) | Une colonne, aucun bouton flottant (D-119), cartes distinctes sans dé, espacements serrés, carrousels à glisser pour les blocs de réassurance |
| Tablette | 768 → 1023 px (`md:` … `max-lg:`) | Deux colonnes quand le contenu s'y prête (cartes du hero, frise de méthode, études de cas), en-tête complet avec bouton d'action, menu burger |
| Bureau | ≥ 1024 px (`lg:`) | Mise en page de référence ; **ne change jamais à cause d'une adaptation mobile** |
| Téléphone en paysage | hauteur < 500 px | Pas d'onglets collants (ils mangeraient l'écran) : l'en-tête garde le bouton d'action |

## Audit du 19/10/2026

Mesures faites dans le navigateur intégré à 375 × 812 (iPhone), 768 × 1024 (iPad) et 320 px, thème clair et sombre.

### Parcours et conversion

| # | Constat | Gravité |
|---|---|---|
| A1 | L'accueil fait **11,8 écrans** sur téléphone (9 587 px) : hero 2,2 écrans, offres 2,4, réalisations 3,2, contact 2,5 | Haute |
| A2 | **Aucune action de contact sous le pouce** : le seul bouton « Contact » est en haut à droite (zone la plus difficile à atteindre d'une main) ; les autres appels à l'action sont en fin de longs blocs | Haute |
| A3 | Chaque carte d'offre du hero dépasse **un écran entier** (≈ 650 px) : la deuxième porte d'entrée (site vitrine) n'apparaît qu'au 2ᵉ écran, les indépendants ne se reconnaissent pas en arrivant | Haute |
| A4 | Contact : le formulaire commence **un écran sous le titre** (intro, frise, bouton email avant lui). Un visiteur qui touche « Contact » atterrit sur un titre, sans champ visible | Haute |
| A5 | Étude de cas : **résultats et appel à l'action relégués tout en bas** (la colonne latérale passe sous ≈ 4 écrans de texte) | Moyenne |

### Éléments pensés pour le bureau, transposés tels quels

| # | Constat | Gravité |
|---|---|---|
| B1 | Onglets d'offre **empilés en deux grosses pilules** : ils ressemblent à deux boutons, pas à un choix ; ils disparaissent dès qu'on lit le panneau (2,4 écrans) et changer d'offre oblige à remonter | Haute |
| B2 | `/profil` : toucher une expérience allume les compétences dans la stack, **2 000 px plus bas** : l'interaction n'a aucun effet visible sur téléphone | Haute |
| B3 | Bloc « profil technique » du hero : carte + bouton pleine largeur, **le poids visuel d'une offre** alors qu'il doit rester discret (D-45) | Moyenne |
| B4 | Bandeau des clients : 4 cartes empilées (≈ 600 px) pour un simple bloc de réassurance | Moyenne |
| B5 | Le dé, posé « à droite entre les cartes » par marges négatives, chevauche le bas de la carte 1 : réserve de place codée en dur | Basse |
| B6 | Frise « Comment je travaille » : le trait qui relie les étapes est masqué sur téléphone, il reste trois blocs sans lien | Basse |
| B7 | **Tablette (768 px)** : tout reste sur une colonne (cartes du hero de 720 px de large, lignes de ≈ 95 caractères, formulaire sous la frise) : place perdue, lecture fatigante | Moyenne |

### Ergonomie tactile et plateforme

| # | Constat | Gravité |
|---|---|---|
| C1 | Cibles sous 40 px : bouton pause du titre (24 × 24), liens du pied de page (17 à 20 px de haut), liens des clients (16 px), lien « mentions légales » du formulaire (16 px), pastilles du formulaire (38 px) | Haute |
| C2 | Zones sûres d'iOS (encoche, barre d'accueil) ignorées : pas de `viewport-fit=cover` ni de marges `safe-area-inset` | Moyenne |
| C3 | Formulaire : bouton d'envoi étroit, clavier non adapté (`inputmode`, `enterkeyhint`, `autocapitalize`), message de résultat parfois hors écran après l'envoi | Moyenne |
| C4 | Écran de chargement retiré à l'événement `load` (toutes les images) : sur réseau mobile lent, il masque une page déjà lisible | Moyenne |
| C5 | Aucun défilement horizontal, textes à 16 px, champs à 16 px sur écran tactile (D-114) : **conforme** | — |

## Règles fonctionnelles (D-118, D-119)

Elles s'appliquent à **toute nouvelle fonctionnalité, section ou page**, en plus de D-114 (rien ne casse de 320 px au grand écran).

1. **Repenser, jamais rétrécir.** Un élément conçu pour le bureau (colonne latérale, survol, interaction entre deux zones éloignées,
   grille de cartes, onglets) est reconçu pour le toucher et l'écran étroit. Interdit : réduire les marges et la police jusqu'à ce que
   ça rentre, masquer un contenu utile sans alternative, compter sur le survol, superposer par marges négatives.
2. **Bureau intact.** Toute adaptation mobile s'écrit avec des variantes `max-md:`, `max-lg:`, `max-sm:`, `stick:` ou en mobile d'abord
   avec un retour à l'identique en `lg:`. Après la modification, le rendu à 1024 et 1280 px est inchangé.
3. **Pas de bouton flottant (D-119).** Aucun appel à l'action fixe en bas d'écran ni qui apparaît en cours de défilement : l'action de
   contact reste le bouton « Contact » de l'en-tête (masqué sous 360 px, où il reste dans le menu burger) et les boutons de chaque section.
4. **Le premier écran montre les deux portes d'entrée.** Rien de nouveau ne s'insère entre le titre du hero et les cartes d'offre sur
   téléphone ; une carte d'accueil ne dépasse pas ≈ 60 % de la hauteur d'un écran de 812 px.
5. **La preuve et l'action avant le récit.** Sur téléphone et tablette, ce qui fait décider (résultats, formulaire, bouton) remonte
   avant le texte long ; ce qui rassure en complément (frises, détails techniques) vient après.
6. **Une interaction a son effet sous le doigt.** Si l'effet d'un toucher apparaît ailleurs dans la page sur bureau (ex. compétences
   allumées dans la stack), il s'affiche là où l'on a touché sur téléphone et tablette.
7. **Sobre et serré (D-119).** Sur téléphone : cartes distinctes (marge entre elles, badge dans la carte, pas d'élément à cheval),
   pas d'éléments mis en pastilles quand une liste suffit, contrôles fins (sélecteurs ≈ 40 px, une seule ligne), espacements verticaux
   réduits (sections `pt-8 pb-10`, blocs `gap-8` ; les valeurs de bureau reviennent dès `sm:`), pied de page compact.
8. **Réassurance compacte.** Un bloc de logos, d'avis ou de clients se lit en carrousel à glisser (`max-sm:swipe`, la carte suivante
   dépasse) ; un contenu de vente (offres, études de cas) reste empilé et entièrement visible.
9. **Choisir sans remonter.** Un sélecteur qui pilote un long contenu (onglets) reste collé sous l'en-tête pendant la lecture
   (`stick:sticky stick:top-16`), et un changement ramène au début du contenu.
10. **Toucher.** Cibles ≥ 40 px (zone touchable étendue par un pseudo-élément si l'icône doit rester petite), champs à 16 px, clavier
   adapté (`inputmode`, `autocomplete`, `autocapitalize`, `enterkeyhint`), bouton d'envoi pleine largeur, message de résultat ramené
   à la vue. Aucun effet n'existe qu'au survol (Tailwind 4 limite `hover:` aux appareils qui survolent ; en CSS brut, `@media (hover: hover)`).
11. **Plateforme.** Zones sûres d'iOS respectées (`viewport-fit=cover`, `env(safe-area-inset-*)`, marge `--gutter`) ; paysage
    (< 500 px de haut) : pas d'élément fixe ou collant en plus de l'en-tête ; écran de chargement retiré dès que le texte est lisible.
12. **Tablette = vraie mise en page.** De 768 à 1023 px, on utilise la largeur (deux colonnes, frises horizontales) au lieu d'étirer
    la version téléphone.

## Motifs en place (à réutiliser)

| Motif | Où | Comment |
|---|---|---|
| Cartes d'offre distinctes | `Hero.astro` | Téléphone : deux cartes empilées et espacées, badge dans la carte, promesse sans encadré, atouts en liste cochée, **sans dé** ; tablette : côte à côte, dé sur la jointure |
| Photo du hero agrandie | `Hero.astro` | Téléphone : 112 px de large (128 px dès 640 px), textes à sa droite |
| Accès profil en une ligne | `Hero.astro` | Ligne fine (question + flèche sans cadre), tout le bloc touchable (`max-sm:after:absolute`) |
| Contrôle segmenté | `OfferDetail.astro` (onglets), `Contact.astro` (type de projet) | Une seule ligne à parts égales, 40 px de haut, texte 13 px, sans icône |
| Chiffres clés empilés | `CaseCard.astro` (Gendarmerie) | Encadré `surface`, un chiffre par ligne séparé par un filet ; trois colonnes dès 640 px |
| Pied de page compact | `Footer.astro` | Fond gris `surface`, celui des sections grises (toutes tailles, D-120) ; téléphone : liens en lignes, titres masqués visuellement |
| Profil : photo et liens | `profil.astro` | Téléphone et tablette : grande photo à gauche, liens en colonne à droite ; la stack ne se colore qu'au bureau |
| Onglets collants | `OfferDetail.astro` | Enveloppe `max-lg:contents`, barre `stick:sticky`, ombre `data-stuck`, retour en haut du panneau au changement |
| Frise verticale | `OfferDetail.astro` (méthode) | Pastille à gauche, trait vers l'étape suivante ; horizontale dès 768 px |
| Carrousel à glisser | `Clients.astro`, utilitaire `swipe` (`global.css`) | Déborde jusqu'aux bords, aimantation par carte, carte suivante visible à 18 % |
| Formulaire d'abord | `Contact.astro` | Ordre du DOM : intro → formulaire → frise et email ; bureau inchangé par placement de grille |
| Effet sous le doigt | `profil.astro` | Compétences ouvertes dans la carte d'expérience (`.xp-skills`, < 1024 px) |
| Preuve d'abord | `realisations/[slug].astro` | Résultats en tête du récit (< 1024 px), appel à l'action en fin |
| Variantes d'appareil | `global.css` | `stick:` (téléphone et tablette, hors paysage), `--gutter` (marge latérale avec zones sûres) |

## Contrôle avant de conclure

En plus de D-114 (320, 375, 768, 1024, 1280 px, téléphone en paysage) : aucun bouton flottant ; l'en-tête tient sur une ligne
(bouton « Contact » visible dès 360 px) ; le premier écran du téléphone montre le titre et la première carte
d'offre ; aucune interaction n'a son effet hors écran ; rendu à 1024 et 1280 px identique à avant la modification.
`npm run audit` contrôle automatiquement les règles `mobile-*` (voir `05-technique.md`).
