---
title: "Digitizing the processes of the French National Gendarmerie"
client: French National Gendarmerie
sector: Public service
kind: outil
period: 2022 – 2026
role: Full-stack developer, then owner of several regional applications
summary: "Four years designing and evolving applications used daily by the teams, from 100 to 3,000 users depending on the project, up to a national application."
cardNote: "I replaced paper and spreadsheets with applications the teams use every day: fewer errors, considerable time saved."
problem: "Processes tracked on paper, in spreadsheets or in ageing software: too incomplete for real-time management, error-prone and time-consuming for the teams."
keyFacts:
  - { value: "4 years", label: "within the French National Gendarmerie" }
  - { value: "6", label: "projects, from regional to national scale" }
  - { value: "100 to 3,000", label: "users depending on the application" }
outcomes:
  - "Considerable time saved, reported by the departments concerned"
  - "Fewer errors, thanks to automated processes"
  - "Applications from 100 to 3,000 users depending on the project, plus a national application"
  - "A shared foundation reused for new projects"
featured: false
order: 2
confidential: true
underTheHood:
  stack: [Next.js, NestJS, PostgreSQL, Tailwind CSS, Docker, GitLab CI, Linux]
  highlights:
    - "Migration of Symfony monoliths to a frontend / REST API architecture."
    - "Reusable application boilerplate serving as a foundation for new regional projects."
    - "JWT authentication, Linux environment with strict security constraints."
    - "Containerized deployment, continuous integration on GitLab."
    - "Agile/Scrum team on the national project, unit tests and code quality."
    - "Technical training of two apprentices until they were autonomous."
---

## The context

I was an employee of the French National Gendarmerie, in a department whose mission was precisely to **digitize the teams' processes**. I worked there on six projects: equipment, case and file management, planning and booking. Most were at regional scale, one at national scale, shared with the National Police and the Ministry of the Interior.

*For confidentiality reasons, no screenshot is shown.*

## The problem, project by project

Depending on the case, we had to **replace** an entirely paper-based process, a spreadsheet-based tracking, or existing software that had become too old and no longer met technical requirements. A spreadsheet allows neither real-time management nor map visualization: a real application does.

## My approach

The work didn't start with code, but with **the users**:

- **Gather the need** directly from the teams concerned, bringing all stakeholders together.
- **Prototype** quickly to validate our understanding before developing.
- **Deliver, collect feedback, evolve**: the applications live in production for years.

Over my last two years, I was **fully responsible for several regional applications**, from talking with users to going into production.

## A concrete example: reservist recruitment

Before, everything went through a spreadsheet: slow, with every email sent by hand. I designed an application where **each department enters applications itself**, then registers candidates for recruitment sessions. When a session is full, **a single button** at regional level is enough to send every candidate an email telling them where to go. The email templates are editable. This part of the process is now **fully automated**.

## Modernizing without breaking everything

An important part of the work was **evolving applications 5 to 10 years old** without interrupting service: reducing technical debt, then migrating gradually to a modern architecture.

## Passing on knowledge

I trained **two apprentices**, about three months each, until they were operational in the team. Having been the first to join the team, I kept answering questions about older projects until I left.

## The result

**Digitized and standardized** processes, errors avoided, and considerable time saved: that is what the departments concerned reported back to us, with their thanks. The applications are still online and maintained by the team.
