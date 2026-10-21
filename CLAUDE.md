@AGENTS.md

# Site elvispichou.com : règles de travail

La documentation dans `docs/` est la source de vérité (design, structure, décisions). Point d'entrée : `docs/README.md`.

## À chaque modification de l'interface, du contenu ou de la structure

1. Lire `docs/04-decisions.md` et le fichier du domaine concerné **avant** de coder.
2. Si la demande contredit une décision active ou une phrase antérieure d'Elvis : **s'arrêter**, la lui présenter avec des solutions
   (gabarit dans le skill), ne jamais l'écraser en silence.
3. **Avant de dire que c'est terminé, exécuter le skill `design-guardian`** : `npm run audit` (0 échec), `npx astro check`, `npm run build`,
   contrôle visuel en thème sombre et clair, sur mobile et desktop.
4. Journaliser dans `docs/04-decisions.md` toute décision prise pendant l'échange.
5. **Mentions légales** (versions française `LegalFr.astro` **et** anglaise `LegalEn.astro`) : si le changement touche à ce que la page `/mentions-legales` déclare (hébergeur, prestataires et sous-traitants,
   données collectées ou formulaire, cookies, analytics, traceurs, polices ou scripts tiers, statut ou coordonnées de l'éditeur, licence),
   mettre à jour `src/components/legal/` (et `site.legal` dans `src/config/site.ts`) **dans la même modification**, puis la
   date « Dernière mise à jour ». Phrase du formulaire de contact incluse.

6. **Traduction (D-110)** : le site est en français et en anglais. Tout nouveau contenu, texte, `aria-label`, `alt`, message d'erreur, e-mail,
   page ou étude de cas doit être **sensible à la traduction** : texte dans `src/i18n/fr.ts` **et** `en.ts` (jamais en dur dans un composant), page dans
   `src/pages/[...lang]/`, étude de cas dans `src/content/realisations/fr/` **et** `en/`. Guide : `docs/05-technique.md` § Traduction. `npm run audit`
   (règles `i18n-*`) doit passer.

7. **Responsive (D-114)** : toute nouvelle fonctionnalité, section ou page doit être irréprochable sur **tous les appareils** (320 px → grand écran,
   portrait et paysage, tactile et souris) **sans casser le rendu PC**. Concevoir mobile d'abord, puis vérifier à 320, 375, 768, 1024 et 1280 px :
   aucun défilement horizontal, rien de coupé ni de superposé, cibles tactiles ≥ 40 px, champs à 16 px en tactile.

8. **Expérience mobile (D-118)** : téléphone et tablette sont des expériences à part entière, au service de la prise de contact.
   Un élément pensé pour le bureau est **repensé** pour le toucher (jamais rétréci ni bricolé), le bureau ne change pas. Lire
   `docs/06-experience-mobile.md` (règles + motifs à réutiliser : onglets collants, contrôle segmenté, carrousel `swipe`,
   formulaire d'abord, effet sous le doigt). Pas de bouton flottant, espacements serrés sur téléphone (D-119).

## Rappels essentiels

- Texte et labels en Inter ; Space Mono seulement pour les URL, puces de stack et glyphe de code ; jamais de texte semi-transparent.
- Thème du système au premier passage, sombre à défaut (D-136) ; couleurs uniquement via les tokens ; coins `rounded-card`.
- Jamais « outil métier » dans un texte (en anglais : « custom tool »). Aucun fait ou chiffre absent de `docs/01-produit-et-positionnement.md`.
- Toute section de l'accueil a une entrée dans `nav` (`src/config/site.ts`).
