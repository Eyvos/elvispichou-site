# Documentation du projet elvispichou.com

Cette documentation est la **source de vérité** du site. Elle consigne les règles de design, les décisions fonctionnelles et
toutes les décisions prises au fil des échanges avec Claude. Si le code et la doc se contredisent, on tranche explicitement
(voir `04-decisions.md`) : on ne laisse jamais une dérive silencieuse.

| Fichier | Contenu | À lire quand |
|---|---|---|
| [01-produit-et-positionnement.md](01-produit-et-positionnement.md) | Objectifs, publics, message, offres, ton, faits vérifiés utilisables dans les textes | On écrit ou modifie un texte |
| [02-design-system.md](02-design-system.md) | Palette, typographie, contrastes, composants, mouvement, accessibilité | On touche à l'apparence |
| [03-structure-et-contenu.md](03-structure-et-contenu.md) | Plan du site, ordre des sections, navigation, modèles de contenu, images | On ajoute ou déplace une section ou une page |
| [04-decisions.md](04-decisions.md) | Journal des décisions (avec dates et raisons), pistes écartées, points ouverts | Avant toute modification, et après chaque décision |
| [05-technique.md](05-technique.md) | Stack, commandes, variables d'environnement, analytics, CI | On touche au code, au déploiement ou aux outils |
| [06-experience-mobile.md](06-experience-mobile.md) | Règles fonctionnelles du téléphone et de la tablette, motifs à réutiliser, audit mobile | On ajoute ou modifie une fonctionnalité, une section ou une page |

## Règles d'usage

0. **Tout nouveau contenu est écrit en français ET en anglais** (D-110) : textes dans `src/i18n/`, jamais en dur.
0. **Toute nouvelle fonctionnalité doit être responsive sur tous les appareils** (D-114), vérifiée de 320 px à grand écran sans casser le PC.
0. **Le téléphone et la tablette sont repensés, pas rétrécis** (D-118) : règles de `06-experience-mobile.md`.
1. **Avant de modifier** : lire `04-decisions.md` et le fichier du domaine concerné.
2. **Pendant** : ne pas contredire une décision « Actif » sans l'avoir mise en discussion.
3. **Après** : lancer `npm run audit` (contrôles automatiques), corriger, puis mettre à jour la doc.
4. **Toute décision prise en conversation** est ajoutée au journal le jour même : identifiant, date, énoncé, raison, statut.
5. **Un changement d'avis** ne supprime pas l'ancienne décision : elle passe en « Remplacé par D-xx » (on garde l'historique).

## Outils

- `npm run audit` : contrôle automatique des règles mesurables (contrastes, lisibilité, curseurs, navigation, vocabulaire, doc).
- Skill `design-guardian` (`.claude/skills/design-guardian/SKILL.md`) : procédure complète de vérification, y compris la détection
  des contradictions entre une demande et les décisions déjà prises.
