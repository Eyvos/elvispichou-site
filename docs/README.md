# Documentation du projet elvispichou.fr

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

## Règles d'usage

1. **Avant de modifier** : lire `04-decisions.md` et le fichier du domaine concerné.
2. **Pendant** : ne pas contredire une décision « Actif » sans l'avoir mise en discussion.
3. **Après** : lancer `npm run audit` (contrôles automatiques), corriger, puis mettre à jour la doc.
4. **Toute décision prise en conversation** est ajoutée au journal le jour même : identifiant, date, énoncé, raison, statut.
5. **Un changement d'avis** ne supprime pas l'ancienne décision : elle passe en « Remplacé par D-xx » (on garde l'historique).

## Outils

- `npm run audit` : contrôle automatique des règles mesurables (contrastes, lisibilité, curseurs, navigation, vocabulaire, doc).
- Skill `design-guardian` (`.claude/skills/design-guardian/SKILL.md`) : procédure complète de vérification, y compris la détection
  des contradictions entre une demande et les décisions déjà prises.
