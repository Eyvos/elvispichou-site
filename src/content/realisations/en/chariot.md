---
title: "Chariot: a tool that optimizes the tabletop role-playing experience"
client: Chariot
url: https://chariot.tools
sector: Leisure & role-playing games
kind: produit
period: since February 2025
role: Co-founder, in charge of product and development
summary: "An application for Dungeons & Dragons: people still play around a table, and the application handles combat and keeps track of the game, live for the game master and the players."
problem: "Between fully virtual tools and pen and paper, nothing let you keep the table, the dice and the immersion while handling combat without losing time."
keyFacts:
  - { value: "1.5 years", label: "of development" }
  - { value: "2 co-founders", label: "with Hugo, product and tech shared by two" }
  - { value: "Online", label: "and continuously maintained" }
outcomes:
  - "Smoother games: combat is handled without breaking immersion"
  - "Real-time synchronization between the game master and the players"
  - "Integrated payment and virtual credits"
  - "Designed to extend to other game systems"
featured: false
order: 3
underTheHood:
  stack: [Next.js, NestJS, TypeScript, MongoDB, PostgreSQL, Redis, Socket.IO, Keycloak, Stripe, Docker, Traefik, Grafana, GitHub Actions]
  highlights:
    - "Microservices architecture made of about ten NestJS services."
    - "Real-time game sessions via Socket.IO, with fine control over the information exposed to each player."
    - "Multi-database architecture: MongoDB and PostgreSQL depending on the nature of the data."
    - "Codex, an independent API consumed by the platform."
    - "Centralized authentication with Keycloak."
    - "Full CI/CD: lint, tests, Docker images published to GHCR, automated deployment; separate integration and production environments."
---

## Why this project

Chariot was born around a Dungeons & Dragons table, among friends. Existing tools were either **entirely virtual** (Foundry, Roll20 and the like) or **entirely on paper**. The former break immersion, the latter slow the game down: combat, in particular, takes forever to manage.

We didn't find ourselves in either. Our idea: **a tool that sits in between**, keeping the table and the conversation, and handing the application whatever slows the game down.

## My role

As co-founder with Hugo, I work on both the **product** (which features, for whom, in what order) and the **development**. Technical design and implementation are done by the two of us.

## A product approach

Start from a real user need, frame it, prototype, build, then evolve with feedback: a year and a half of work, and an application that is still online and maintained. The hardest part was not the code, but **finding the product's exact added value**.

## What this shows for your project

I don't just execute: I know how to **choose what to build, for whom, and keep it evolving**. It's the same standard I apply to my clients' projects.
