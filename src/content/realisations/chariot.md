---
title: "Chariot : outil d'optimisation d'expérience de jeu de rôle"
client: Chariot
url: https://chariot.tools
sector: Loisirs & jeu de rôle
kind: produit
period: depuis février 2025
role: Cofondateur, en charge du produit et du développement
summary: "Une application pour Donjons & Dragons : on joue toujours autour d'une table, et l'application prend en charge les combats et le suivi de la partie, en direct pour le maître du jeu et les joueurs."
problem: "Entre les outils 100 % virtuels et le papier, rien ne permettait de garder la table, les dés et l'immersion tout en gérant les combats sans perdre de temps."
keyFacts:
  - { value: "1 an et demi", label: "de développement" }
  - { value: "2 cofondateurs", label: "avec Hugo, produit et technique à deux" }
  - { value: "En ligne", label: "et maintenue en continu" }
outcomes:
  - "Des parties plus fluides : les combats se gèrent sans casser l'immersion"
  - "Synchronisation en temps réel entre le maître du jeu et les joueurs"
  - "Paiement et crédits virtuels intégrés"
  - "Pensé pour s'étendre à d'autres systèmes de jeu"
featured: false
order: 3
underTheHood:
  stack: [Next.js, NestJS, TypeScript, MongoDB, PostgreSQL, Redis, Socket.IO, Keycloak, Stripe, Docker, Traefik, Grafana, GitHub Actions]
  highlights:
    - "Architecture microservices d'une dizaine de services NestJS."
    - "Sessions de jeu en temps réel via Socket.IO, avec contrôle fin des informations exposées à chaque joueur."
    - "Architecture multi-bases : MongoDB et PostgreSQL selon la nature des données."
    - "Codex, une API indépendante consommée par la plateforme."
    - "Authentification centralisée avec Keycloak."
    - "CI/CD complète : lint, tests, images Docker publiées sur GHCR, déploiement automatisé ; environnements d'intégration et de production distincts."
---

## Pourquoi ce projet

Chariot est né autour d'une table de Donjons & Dragons, entre amis. Les outils existants étaient soit **entièrement virtuels** (Foundry, Roll20 et consorts), soit **entièrement en papier**. Les premiers cassent l'immersion, les seconds ralentissent la partie : les combats, en particulier, prennent un temps fou à gérer.

Nous ne nous retrouvions dans aucun des deux. Notre idée : **un outil qui fait l'entre-deux**, pour garder la table et les échanges, et confier à l'application ce qui ralentit la partie.

## Mon rôle

Cofondateur avec Hugo, j'interviens à la fois sur le **produit** (quelles fonctionnalités, pour qui, dans quel ordre) et sur le **développement**. La conception technique et la réalisation sont menées à deux.

## Une démarche de produit

Partir d'un vrai besoin d'utilisateurs, cadrer, prototyper, développer, puis faire évoluer avec les retours : un an et demi de travail, et une application toujours en ligne et maintenue. Le plus difficile n'a pas été le code, mais de **trouver précisément la valeur ajoutée** du produit.

## Ce que cela démontre pour votre projet

Je ne me contente pas d'exécuter : je sais **choisir quoi construire, pour qui, et le faire évoluer**. C'est cette même exigence que j'applique aux projets de mes clients.
