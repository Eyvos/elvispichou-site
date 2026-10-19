---
title: "La plateforme Trik3r"
client: Trik3r Collecte
url: https://trik3r-collecte.fr
sector: BTP & collecte de déchets
kind: outil
period: mai – novembre 2024
role: Seul développeur, du cadrage à la mise en production
summary: "J'ai conçu et développé seul la plateforme dont dépend toute l'activité de cette entreprise de collecte : les clients commandent, réservent un créneau et paient en ligne, sans intervention de sa part."
problem: "L'entreprise était conçue autour d'une plateforme de vente qui planifie les collectes et gère l'activité de bout en bout. Sans elle, elle ne pouvait tout simplement pas démarrer."
keyFacts:
  - { value: "6 mois", label: "d'audit, de conception et de développement" }
  - { value: "1 seul", label: "développeur : de l'analyse à la mise en ligne" }
  - { value: "En ligne", label: "et utilisée pour toute l'activité" }
outcomes:
  - "La plateforme est en ligne : l'entreprise fonctionne grâce à elle"
  - "Réservation, achat et paiement en ligne, sans intervention du fondateur"
  - "Tarif calculé automatiquement, en temps réel, selon la zone et les conditions de livraison"
  - "Un back-office complet, avec des rôles et des droits réglables au détail près"
closing: "Votre activité repose sur un outil qui n'existe pas encore ?"
featured: true
order: 1
underTheHood:
  stack: [Next.js, React, NestJS, MongoDB, Stripe, Docker, VPS]
  highlights:
    - "Frontend Next.js séparé d'une API REST NestJS organisée par domaines fonctionnels."
    - "Moteur de tarification : zone déterminée à partir de l'adresse saisie, majorations (étages, nombre de personnes), calcul en temps réel et tests unitaires."
    - "Paiement Stripe et gestion des événements par webhooks."
    - "Système de rôles et de permissions configurables, du contributeur SEO au super administrateur."
    - "Géolocalisation et recherche d'adresses intégrées aux parcours de commande."
    - "Tests unitaires, conteneurisation Docker, déploiement sur VPS."
---

## Ma démarche

Le fondateur m'a contacté avec un projet clair : **concevoir et développer ensemble, de A à Z, la plateforme autour de laquelle son entreprise allait fonctionner**. Planifier les collectes, vendre ses prestations, gérer son activité : tout devait passer par elle. Sans plateforme, pas d'entreprise.

- **Comprendre le métier en profondeur** : une analyse détaillée du besoin, consignée dans des documents de cadrage que le fondateur pouvait relire et valider.
- **Prototyper** les parcours clés avant de développer, pour s'accorder sur ce qui comptait vraiment.
- **Choisir les bonnes technologies** pour une plateforme fiable, qui peut accueillir de nouveaux services.
- **Développer et livrer par étapes**, avec une interface pensée pour que le fondateur prenne l'outil en main sans formation.

## Un calculateur de tarif 100 % automatique

Le prix dépend de la zone de livraison. Le client saisit son adresse : la plateforme l'associe à une zone, ou l'informe que son adresse n'est pas desservie. Dans une zone couverte, le tarif se calcule **automatiquement et en temps réel**, et s'ajuste selon les conditions : étages à monter, nombre de personnes pour la livraison.

## Une activité qui tourne sans intervention

Les clients choisissent leur créneau, achètent leur prestation et paient en ligne, sans passer par le fondateur. Il n'intervient que là où un humain est nécessaire : la livraison et les devis personnalisés.

## Des droits adaptés à chaque personne

Le back-office permet de **créer des rôles et d'en régler finement les permissions** : un rédacteur qui publie uniquement des articles pour le référencement, un gestionnaire qui suit toutes les commandes, un super administrateur qui a la main sur tout.

## Ce que j'apporte à votre projet

Notre collaboration pourra partir de zéro, sans aucun existant : je prends le temps de comprendre votre métier, puis je livre une plateforme dont votre activité peut **réellement dépendre**, en production. Celle de Trik3r est toujours en ligne aujourd'hui.
