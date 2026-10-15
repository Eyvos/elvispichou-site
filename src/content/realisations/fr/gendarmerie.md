---
title: "Digitaliser les processus de la Gendarmerie nationale"
client: Gendarmerie nationale
sector: Service public
kind: outil
period: 2022 – 2026
role: Développeur full-stack, puis responsable de plusieurs applications régionales
summary: "Quatre ans à concevoir et faire évoluer des applications utilisées au quotidien par les équipes, de 100 à 3 000 utilisateurs selon les projets, jusqu'à une application nationale."
cardNote: "J'ai remplacé le papier et les tableurs par des applications que les équipes utilisent chaque jour : moins d'erreurs, un gain de temps considérable."
problem: "Des processus suivis sur papier, sur tableur ou sur des logiciels vieillissants : trop peu complets pour une gestion en temps réel, sujets aux erreurs et coûteux en temps pour les équipes."
keyFacts:
  - { value: "4 ans", label: "au sein de la Gendarmerie nationale" }
  - { value: "6", label: "projets, de l'échelle régionale à l'échelle nationale" }
  - { value: "100 à 3 000", label: "utilisateurs selon les applications" }
outcomes:
  - "Un gain de temps considérable remonté par les services concernés"
  - "Moins d'erreurs, grâce à des processus automatisés"
  - "Des applications de 100 à 3 000 utilisateurs selon les projets, plus une application nationale"
  - "Un socle commun réutilisé pour les nouveaux projets"
featured: false
order: 2
confidential: true
underTheHood:
  stack: [Next.js, NestJS, PostgreSQL, Tailwind CSS, Docker, GitLab CI, Linux]
  highlights:
    - "Migration de monolithes Symfony vers une architecture frontend / API REST."
    - "Boilerplate applicatif réutilisable servant de socle aux nouveaux projets régionaux."
    - "Authentification JWT, environnement Linux à fortes contraintes de sécurité."
    - "Déploiement conteneurisé, intégration continue sous GitLab."
    - "Équipe Agile/Scrum sur le projet national, tests unitaires et qualité du code."
    - "Formation technique de deux alternants jusqu'à leur autonomie."
---

## Le contexte

J'étais salarié de la Gendarmerie nationale, dans un service dont la mission était précisément de **digitaliser les processus des équipes**. J'y ai travaillé sur six projets : gestion de matériel, de dossiers, planning et réservation. La plupart à l'échelle régionale, un à l'échelle nationale, partagé avec la Police nationale et le ministère de l'Intérieur.

*Pour des raisons de confidentialité, aucune capture d'écran n'est présentée.*

## Le problème, projet par projet

Selon le cas, il fallait **remplacer** un processus entièrement papier, un suivi sur tableur, ou un logiciel existant devenu trop ancien et plus conforme aux exigences techniques. Un tableur ne permet ni une gestion en temps réel ni une visualisation sur carte : une vraie application, si.

## Ma démarche

Le travail ne commençait pas par le code, mais par **les utilisateurs** :

- **Recueillir le besoin** directement auprès des équipes concernées, en réunissant toutes les parties prenantes.
- **Prototyper** rapidement pour valider la bonne compréhension avant de développer.
- **Livrer, recueillir les retours, faire évoluer** : les applications vivent en production pendant des années.

Sur mes deux dernières années, j'ai assuré **la responsabilité complète de plusieurs applications régionales**, de l'échange avec les utilisateurs à la mise en production.

## Un exemple concret : le recrutement des réservistes

Avant, tout passait par un tableur : lent, et chaque courriel envoyé à la main. J'ai conçu une application où **chaque département saisit lui-même les candidatures**, puis les inscrit à des séances de recrutement. Quand une séance est pleine, **un seul bouton** suffit au niveau régional pour envoyer à tous les candidats un courriel leur indiquant où se rendre. Les modèles de courriel sont modifiables. Cette partie du processus est désormais **entièrement automatisée**.

## Moderniser sans tout casser

Une partie importante du travail consistait à **faire évoluer des applications de 5 à 10 ans** sans interrompre le service : réduction de la dette technique, puis migration progressive vers une architecture moderne.

## Transmettre

J'ai formé **deux alternants**, en trois mois chacun environ, jusqu'à ce qu'ils soient opérationnels dans l'équipe. Arrivé le premier dans l'équipe, j'ai continué à répondre aux questions sur les projets plus anciens, jusqu'à mon départ.

## Le résultat

Des processus **digitalisés et uniformisés**, des erreurs évitées, et un gain de temps considérable : c'est ce que les services concernés nous ont remonté, avec leurs remerciements. Les applications sont toujours en ligne et maintenues par l'équipe.
