@AGENTS.md

# Site elvispichou.fr : règles de travail

La documentation dans `docs/` est la source de vérité (design, structure, décisions). Point d'entrée : `docs/README.md`.

## À chaque modification de l'interface, du contenu ou de la structure

1. Lire `docs/04-decisions.md` et le fichier du domaine concerné **avant** de coder.
2. Si la demande contredit une décision active ou une phrase antérieure d'Elvis : **s'arrêter**, la lui présenter avec des solutions
   (gabarit dans le skill), ne jamais l'écraser en silence.
3. **Avant de dire que c'est terminé, exécuter le skill `design-guardian`** : `npm run audit` (0 échec), `npx astro check`, `npm run build`,
   contrôle visuel en thème sombre et clair, sur mobile et desktop.
4. Journaliser dans `docs/04-decisions.md` toute décision prise pendant l'échange.

## Rappels essentiels

- Texte et labels en Inter ; Space Mono seulement pour les URL, puces de stack et glyphe de code ; jamais de texte semi-transparent.
- Thème sombre par défaut ; couleurs uniquement via les tokens ; coins `rounded-card`.
- Jamais « outil métier » dans un texte. Aucun fait ou chiffre absent de `docs/01-produit-et-positionnement.md`.
- Toute section de l'accueil a une entrée dans `nav` (`src/config/site.ts`).
