import type { Dict } from './fr';

/**
 * English texts. Typed on `fr.ts`: a missing or extra key fails `astro check`.
 * Register: professional but warm, "you" addressed directly, sentence case everywhere (same tone as the French site).
 */
export const en: Dict = {
  site: {
    role: 'Freelance web developer',
    tagline: 'I build web tools that simplify the work of businesses.',
    description:
      'Freelance web developer in Toulouse, France: custom tools for small and medium businesses, showcase websites for freelancers and shopkeepers. A single point of contact, from the first brief to launch.',
    location: 'Toulouse — 100% remote work',
    services: ['Showcase website design', 'Custom web tools and applications'],
    offerCatalog: 'Services',
    areaServed: 'France',
  },

  common: {
    skipToContent: 'Skip to content',
    newWindow: ' (opens in a new window)',
    internalApp: 'internal application',
    internalAppConfidential: 'internal application · confidential',
    caseKind: { site: 'Showcase website', outil: 'Custom tool', produit: 'SaaS product' },
    technicalProfile: 'Technical profile',
  },

  loader: {
    tagline: 'A creative working for your business',
    rule: 'Only a successful dice roll will display the site.',
  },

  header: {
    brandLabel: '{name}, home',
    navMain: 'Main navigation',
    navMobile: 'Mobile navigation',
    nav: { offre: 'Services', realisations: 'Projects' },
    ctaShort: 'Contact',
    ctaLong: 'Talk about my project',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    menuOpen: 'Open the menu',
    menuClose: 'Close the menu',
    languageMenu: 'Choose language',
  },

  footer: {
    siteTitle: 'The site',
    elsewhere: 'Elsewhere',
    offers: 'Services',
    projects: 'Projects',
    legal: 'Legal notice',
    built: 'Static site built with Astro · no cookies ·',
    howBuilt: 'how it is built',
  },

  hero: {
    photoAlt: 'Elvis Pichou, freelance web developer',
    locationPill: 'Toulouse · 100% remote',
    eyebrow: 'Freelance web developer',
    since: 'In web development since 2021',
    gendarmerie: '4 years with the French National Gendarmerie',
    titleBefore: 'I build web tools that',
    titleAfter: 'the work of businesses.',
    verbs: ['simplify', 'automate', 'showcase', 'speed up', 'organize'],
    pauseLabel: 'Pause the animation',
    resumeLabel: 'Resume the animation',
    pauseTip: 'Pause the headline animation',
    pausedTip: 'Animation paused · click to resume',
    dieLabel: 'Roll the die to change the headline verb',
    dieStatus: 'Die: {value}. The headline verb is “{verb}”.',
    cards: {
      outil: {
        target: 'Small businesses, SMEs',
        title: 'Losing time on manual processes?',
        pitch: 'Quotes, planning and customer follow-up scattered everywhere: a custom tool adapts to the way you work.',
        points: ['Built around your trade', 'Everyone sees what concerns them', 'Prototype approved before building'],
        cta: 'Automate my business',
      },
      site: {
        target: 'Freelancers, shopkeepers',
        title: 'Your customers can’t find you?',
        pitch: 'A clear, fast website, designed to be found online and make people want to call.',
        points: ['Delivered in 3 weeks', 'Mobile-friendly', 'Hosting and follow-up included'],
        cta: 'Get found online',
      },
    },
    profileTitle: 'Want to know more about my skills?',
    profileText: 'Technologies I master, experience, availability: everything is on my profile.',
    profileCta: 'See my technical profile',
  },

  offers: {
    title: 'What I do for you',
    tablistLabel: 'Choose a service',
    forExample: 'For example:',
    whyTitle: 'What it changes for you',
    howTitle: 'How I work',
    step: 'Step',
    items: {
      outil: {
        tab: 'Digital transformation',
        audience: 'Small businesses, SMEs',
        headline: 'What you redo by hand, a platform does for you.',
        intro:
          'Quotes in Word, planning by text message, follow-up in Excel: I replace these makeshift solutions with a platform built around the way you work.',
        examples: 'Automatic quotes, ordering and payment, booking and planning.',
        why: [
          { title: 'Get your time back', text: 'Re-entering data, follow-ups and calculations happen on their own, on a custom web platform you can reach from anywhere.' },
          { title: 'Fewer errors and oversights', text: 'Your rules are applied the same way every time.' },
          { title: 'Grow without weighing down', text: 'The platform evolves with you, without starting from scratch.' },
        ],
        steps: [
          { title: 'I understand your business', text: 'A conversation to pin down what you do by hand, where you lose time and what matters to you.' },
          { title: 'You approve a prototype', text: 'You see a first version before everything is built, then regular check-ins to adjust based on your feedback.' },
          { title: 'Then, your choice', text: 'You leave with the code and its documentation, or I take care of everything, turnkey: domain name, server and technical maintenance.' },
        ],
        cta: 'Automate my business',
      },
      site: {
        tab: 'Showcase website',
        audience: 'Craftspeople, shopkeepers, freelancers',
        headline: 'Your future customers look for you online first.',
        intro:
          'In a few seconds, a stranger decides whether to call you or move on to the next one. I design a clear website, fast on mobile and built around your business, so that contacting you is the obvious choice.',
        examples: 'Presentation of your business, prices, opening hours, service area, contact form.',
        why: [
          { title: 'Be found', text: 'Your website is designed to be easier to find when people search for your trade: fast, mobile-friendly, built with Google in mind.' },
          { title: 'Inspire trust', text: 'A clear website reassures people before the first conversation. It is designed for you, not a copied template.' },
          { title: 'Be contacted effortlessly', text: 'Phone, form, opening hours: visitors find everything as soon as they arrive, on mobile.' },
        ],
        steps: [
          { title: 'We talk about your business', text: 'We talk about your trade, your customers and what a visitor should be able to do on your website.' },
          { title: 'I propose a mockup', text: 'You see what your website will look like before it is built.' },
          { title: 'Launch and handover', text: 'I put the website online (domain name, hosting and legal notice included) and show you how it works.' },
        ],
        cta: 'Get found online',
      },
    },
  },

  clients: {
    title: 'They trusted me',
    caseStudy: 'Case study',
    items: {
      gendarmerie: { name: 'French National Gendarmerie', sector: 'Public service', work: 'Custom applications' },
      trik3r: { name: 'Trik3r Collecte', sector: 'Construction & waste collection', work: 'Complete web platform' },
      'ingrid-medium': { name: 'Ingrid Médium', sector: 'Psychic readings', work: 'Website creation' },
      'stephanie-lortal': { name: 'Stéphanie Lortal', sector: 'Sophrology', work: 'Website maintenance' },
    },
  },

  work: {
    eyebrow: 'Projects',
    title: 'The applications I designed, delivered and kept alive.',
    ctaEyebrow: 'And for you?',
    ctaTitle: 'Your project could be the next one.',
    ctaText:
      'A spreadsheet to replace, a process to automate or an idea to launch: we start by understanding your business, and the price is set in writing before we begin.',
    quote: 'Request a quote',
    profile: 'See my technical profile',
  },

  caseCard: {
    screenshotAlt: 'Screenshot of {client}',
    confidentialNote: 'Internal applications: for confidentiality reasons, I cannot show a screenshot.',
    read: 'Read the case study',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Let’s talk about your project.',
    intro: 'Describe what you need in a few lines, even if it is still vague. No jargon: we talk about your business, not about technology.',
    steps: [
      { title: 'You write', text: 'A few lines are enough, even if the need is still vague.' },
      { title: 'I reply within 24 business hours', text: 'With first ideas, no commitment.' },
      { title: 'We talk', text: 'By phone if you like, otherwise by email.' },
    ],
    preferWriting: 'Prefer to write directly?',
    writeByEmail: 'Email me',
    preferTalking: 'Prefer to talk?',
    bookCall: 'Book a 20-minute call',
    requiredNote: ['Fields marked with a ', ' are required.'],
    projectLegend: 'Your project is about',
    projectTypes: { outil: 'A custom tool', site: 'A showcase website', autre: 'Something else' },
    name: 'Name',
    email: 'Email',
    company: 'Company',
    message: 'What you need',
    placeholder: 'E.g. I manage my quotes in Excel and lose time chasing my customers…',
    budgetLegend: 'Estimated budget',
    optional: '(optional)',
    budgets: {
      none: 'I don’t know yet',
      lt2k: 'Under €2,000',
      '2to5k': '€2,000 – €5,000',
      '5to15k': '€5,000 – €15,000',
      gt15k: 'Over €15,000',
    },
    honeypot: 'Do not fill in',
    privacy: ['Your details are only used to answer your request. They are neither sold nor used for marketing; details and rights are in the ', 'legal notice', '.'],
    submit: 'Send my request',
    sending: 'Sending…',
    msg: {
      success: 'Thank you, your message has been sent. I will reply within 24 business hours.',
      fallback: 'The message could not be sent. Please try again in a moment, or email me directly.',
      required: 'This field is required.',
      emailInvalid: 'Enter a valid email address, for example name@example.com.',
      tooShort: 'Write at least 20 characters.',
      invalid: 'Invalid value.',
      errors: 'The form contains errors: please correct the highlighted fields.',
    },
    server: {
      name: 'Please enter your name.',
      email: 'Invalid email address.',
      message: 'Your message must be at least 20 characters long.',
      invalid: 'Invalid form.',
      sendFailed: 'The message could not be sent. Please email me directly.',
    },
  },

  email: {
    subject: 'Confirmation: your request has been received — {name}',
    steps: [
      ['I read your request', 'I take the time to properly understand what you need.'],
      ['I reply within 24 business hours', 'With concrete first ideas.'],
      ['We talk', 'A conversation to agree on the best approach, no commitment.'],
    ],
    textHello: 'Hello {name},',
    textBody: 'Thank you for your message, I have received it. I will get back to you within 24 business hours with first ideas.',
    textRecap: 'As a reminder, your request:',
    textBye: 'Speak soon,',
    preheader: 'Thank you {name}, I have received your message and will get back to you within 24 business hours.',
    title: 'Thank you {name}, I have received your request.',
    leadBefore: 'I read your message carefully and will get back to you ',
    leadStrong: 'within 24 business hours',
    leadAfter: ' with first ideas.',
    next: 'What happens next',
    recapTitle: 'As a reminder, your request',
    recapProject: 'Project',
    recapBudget: 'Estimated budget',
    reply: 'Something to add? Just reply to this email, it reaches me directly.',
    backToSite: 'Back to the site',
    footer: 'You are receiving this message because you filled in the contact form on {host}. No other communication will be sent to you.',
  },

  profile: {
    title: 'Technical profile',
    description:
      'Freelance full-stack TypeScript developer: React, Next.js, Node.js, NestJS. Design of business applications and SaaS products, from brief to production. Remote assignments.',
    photoAlt: 'Elvis Pichou, freelance full-stack developer',
    cv: 'CV (PDF)',
    h1: 'Full-stack TypeScript developer, from business need to production.',
    intro:
      'Since 2021, I have been building complete web applications: understanding the business, functional design, architecture, development, testing, deployment and maintenance.',
    stats: [
      { label: 'Developer', value: 'Since 2021' },
      { label: 'French National Gendarmerie', value: '4 years' },
      { label: 'Users in production', value: '2,000+' },
    ],
    remote: 'Remote · based in Toulouse',
    languages: 'Native French · professional English',
    cta: 'Offer me a mission',
    experiences: 'Experience',
    experiencesHint: 'Click an experience: the skills used light up in the stack.',
    caseLink: 'Detailed case study →',
    stack: 'Stack',
    stackGroups: { frontend: 'Frontend', backend: 'Backend', data: 'Data', infra: 'Infrastructure & quality', integrations: 'Integrations' },
    skills: { 'unit-tests': 'Unit tests', geolocation: 'Geolocation' },
    experienceItems: {
      chariot: {
        period: '2025 → today',
        title: 'Co-founder & full-stack developer',
        org: 'Chariot (SaaS)',
        text: 'NestJS microservices architecture, real-time with Socket.IO, multi-database MongoDB/PostgreSQL, Keycloak, Stripe, full CI/CD up to automated deployment.',
      },
      gendarmerie: {
        period: '2022 → 2026',
        title: 'Full-stack developer',
        org: 'French National Gendarmerie',
        text: 'National application and regional applications (200 to 2,000 users). Requirements gathering, Next.js/NestJS/PostgreSQL, migration of Symfony monoliths, shared boilerplate, training of apprentices.',
      },
      trik3r: {
        period: '2024 · 6 months',
        title: 'Developer, freelance mission',
        org: 'Trik3r Collecte',
        text: 'Complete platform built from scratch: ordering, booking, pricing engine, Stripe, back office with roles and permissions. In production.',
      },
      lortal: {
        period: '2026 · freelance mission',
        title: 'Content and SEO for a WordPress website',
        org: 'Stéphanie Lortal, sophrologist',
        text: 'Added content and improved search ranking (SEO) on an existing WordPress website, outside my usual stack.',
      },
      ingrid: {
        period: '2024 · freelance mission',
        title: 'Website design and development',
        org: 'Ingrid Médium',
        text: '100% Next.js, Tailwind CSS and PostgreSQL website, with a real back office to manage her services and promotional events.',
      },
    },
    education: 'Education',
    educationItems: [
      { years: '2021 – 2023', title: 'DUT in Computer Science (2-year university degree)', school: 'IUT de Blagnac' },
      { years: '2023 – 2024', title: 'Bachelor’s in Software Development', school: 'Toulouse Ynov Campus' },
      { years: '2024 – 2026', title: 'Master’s: Software Development Expert (RNCP level 7)', school: 'Toulouse Ynov Campus' },
    ],
    thisSite: {
      eyebrow: 'This site',
      title: 'The right tool for the job, including here.',
      points: [
        {
          lead: 'Astro rather than Next.js.',
          text: 'A showcase site does not need to ship the React runtime: pages are static HTML, and JavaScript is only loaded where it is useful (contact form). The result: a very light, instant site.',
        },
        {
          lead: 'Typed content.',
          text: 'Case studies are Markdown files validated by a Zod schema at build time. The form goes through a serverless endpoint validated on the server, with anti-spam (honeypot + delay), and works even without JavaScript.',
        },
        {
          lead: 'Lean and respectful.',
          text: 'No cookies, anonymous audience measurement (Umami), careful accessibility (keyboard navigation, contrast, reduced motion), automatic dark mode, schema.org structured data. Available in French and English.',
        },
      ],
    },
  },

  casePage: {
    back: 'All projects',
    client: 'Client',
    period: 'Period',
    role: 'My role',
    problem: 'The problem',
    underTheHood: 'Under the hood',
    forTechnical: 'for technical profiles',
    results: 'Results',
    visit: 'Visit the site:',
    similarTitle: 'A similar need?',
    similarText1: 'Let’s talk: a first conversation is free and without commitment.',
    similarText2: 'Code and documentation handed over, regular check-ins at every delivery.',
    cta: 'Talk about my project',
    quoteOpen: '“',
    quoteClose: '”',
  },

  notFound: {
    title: 'Page not found',
    eyebrow: 'Error 404',
    heading: 'This page does not exist (anymore).',
    back: 'Back to the home page',
  },

  legal: {
    title: 'Legal notice',
  },
};
