---
title: "The Trik3r platform"
client: Trik3r Collecte
url: https://trik3r-collecte.fr
sector: Construction & waste collection
kind: outil
period: May – November 2024
role: Sole developer, from scoping to production
summary: "I designed and built on my own the platform this waste collection company depends on entirely: customers order, book a slot and pay online, without any intervention from the founder."
problem: "The company was designed around a sales platform that schedules collections and runs the business end to end. Without it, it simply could not get started."
keyFacts:
  - { value: "6 months", label: "of audit, design and development" }
  - { value: "1 only", label: "developer: from analysis to launch" }
  - { value: "Online", label: "and used for the whole business" }
outcomes:
  - "The platform is online: the company runs on it"
  - "Online booking, purchase and payment, with no intervention from the founder"
  - "Price calculated automatically, in real time, by zone and delivery conditions"
  - "A complete back office, with roles and permissions adjustable down to the detail"
featured: true
order: 1
underTheHood:
  stack: [Next.js, React, NestJS, MongoDB, Stripe, Docker, VPS]
  highlights:
    - "Next.js frontend separated from a NestJS REST API organized by functional domains."
    - "Pricing engine: zone determined from the address entered, surcharges (floors, number of people), real-time calculation and unit tests."
    - "Stripe payment and event handling through webhooks."
    - "Configurable roles and permissions system, from SEO contributor to super administrator."
    - "Geolocation and address search integrated into the ordering flows."
    - "Unit tests, Docker containerization, deployment on a VPS."
---

## The starting point

The founder contacted me with a clear project: **to design and build together, from A to Z, the platform around which his company would run**. Scheduling collections, selling his services, managing his business: everything had to go through it. No platform, no company.

## My approach

- **Understand the trade in depth**: a detailed analysis of the need, recorded in scoping documents the founder could reread and approve.
- **Prototype** the key flows before developing, to agree on what really mattered.
- **Choose the right technologies** for a reliable platform that can host new services.
- **Develop and deliver in stages**, with an interface designed so the founder could pick up the tool without training.

## A price that calculates itself

The price depends on the delivery zone. The customer enters their address: the platform matches it to a zone, or tells them their address is not served. In a covered zone, the price is calculated **automatically and in real time**, and adjusts to the conditions: floors to climb, number of people for the delivery.

## A business that runs without intervention

Customers choose their slot, buy their service and pay online, without going through the founder. He only steps in where a human is needed: delivery and custom quotes.

## Permissions suited to each person

The back office lets you **create roles and fine-tune their permissions**: a writer who only publishes articles for SEO, a manager who follows all orders, a super administrator who controls everything.

## What this shows for your project

I know how to take a project **from zero**, understand a trade, and deliver a platform a company truly depends on, in production. The site is still online today.
