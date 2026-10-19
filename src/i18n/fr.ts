/**
 * Textes du site en français (langue source).
 * Ce fichier définit la FORME du dictionnaire : `en.ts` est typé dessus, une clé manquante fait échouer `astro check`.
 * Règle : aucun texte visible, aria-label, alt, placeholder ou message d'erreur en dur dans un composant. Tout passe par ici.
 * Les textes à variables utilisent `{nom}` (voir `fmt` dans `index.ts`).
 */
export const fr = {
  site: {
    role: 'Développeur web freelance',
    tagline: 'Je conçois des outils web qui simplifient le travail des entreprises.',
    description:
      "Développeur web freelance à Toulouse : outils sur mesure pour TPE et PME, sites vitrines pour indépendants et commerçants. Un interlocuteur unique, du besoin jusqu'à la mise en ligne.",
    location: 'Toulouse — missions 100 % à distance',
    /** Services déclarés dans les données structurées (JSON-LD). */
    services: ['Création de sites vitrines', 'Outils web et applications sur mesure'],
    offerCatalog: 'Services',
    areaServed: 'France',
  },

  common: {
    skipToContent: 'Aller au contenu',
    newWindow: ' (nouvelle fenêtre)',
    internalApp: 'application interne',
    internalAppConfidential: 'application interne · confidentiel',
    caseKind: { site: 'Site vitrine', outil: 'Outil sur mesure', produit: 'Produit SaaS' },
    technicalProfile: 'Profil technique',
  },

  loader: {
    tagline: 'Un créatif au service de votre entreprise',
    rule: "Seul un succès au dé permettra l'affichage du site.",
  },

  header: {
    brandLabel: '{name}, accueil',
    navMain: 'Navigation principale',
    navMobile: 'Navigation mobile',
    nav: { offre: 'Offres', realisations: 'Réalisations' },
    ctaShort: 'Contact',
    ctaLong: 'Parler de mon projet',
    themeToLight: 'Passer en thème clair',
    themeToDark: 'Passer en thème sombre',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    /** Sélecteur de langue : les noms des langues (Français, English) sont écrits dans leur propre langue (`localeMeta`). */
    languageMenu: 'Choisir la langue',
  },

  footer: {
    siteTitle: 'Le site',
    elsewhere: 'Ailleurs',
    offers: 'Offres',
    projects: 'Réalisations',
    legal: 'Mentions légales',
    built: 'Site statique conçu avec Astro · sans cookie ·',
    howBuilt: 'comment il est fait',
  },

  hero: {
    photoAlt: 'Elvis Pichou, développeur web freelance',
    locationPill: 'Toulouse · 100 % à distance',
    eyebrow: 'Développeur web freelance',
    since: 'Depuis 2021 dans le web',
    gendarmerie: '4 ans pour la Gendarmerie nationale',
    titleBefore: 'Je conçois des outils web qui',
    titleAfter: 'le travail des entreprises.',
    /** Verbes du titre (D-39) : le premier est celui du « 20 ». */
    verbs: ['simplifient', 'automatisent', 'rendent visible', 'accélèrent', 'organisent'],
    pauseLabel: 'Mettre en pause l’animation',
    resumeLabel: 'Reprendre l’animation',
    pauseTip: 'Mettre en pause l’animation du titre',
    pausedTip: 'Animation en pause · cliquer pour reprendre',
    dieLabel: 'Lancer le dé pour changer le verbe du titre',
    dieStatus: 'Dé : {value}. Le verbe du titre est « {verb} ».',
    cards: {
      outil: {
        target: 'TPE, PME',
        title: 'Vous perdez du temps dans des processus ?',
        pitch: 'Devis, planning, suivi client éparpillés : un outil sur mesure s’adapte à votre façon de travailler.',
        points: ['Construit autour de votre métier', 'Chacun voit ce qui le concerne', 'Prototype validé avant de construire'],
        cta: 'Automatiser mon activité',
      },
      site: {
        target: 'Indépendants, commerçants',
        title: 'Vos clients ne vous trouvent pas ?',
        pitch: 'Un site clair et rapide, pensé pour être trouvé sur internet et donner envie d’appeler.',
        // FACTICE : délai provisoire, à confirmer par Elvis avant la mise en ligne (D-37).
        points: ['Livré en 3 semaines', 'Adapté au mobile', 'Hébergement et suivi inclus'],
        cta: 'Me rendre visible',
      },
    },
    profileTitle: 'Vous voulez en savoir plus sur mes compétences ?',
    profileText: 'Technologies maîtrisées, expériences, disponibilité : tout se trouve sur mon profil.',
    profileCta: 'Voir mon profil technique',
  },

  offers: {
    title: 'Ce que je fais pour vous',
    tablistLabel: 'Choisir une offre',
    forExample: 'Par exemple :',
    whyTitle: 'Ce que ça change pour vous',
    howTitle: 'Comment je travaille',
    step: 'Étape',
    items: {
      outil: {
        tab: 'Transformation digitale',
        audience: 'TPE, PME',
        headline: 'Ce que vous refaites à la main, une plateforme le fait pour vous.',
        intro:
          'Devis dans Word, planning par SMS, suivi sur Excel : je remplace ces bricolages par une plateforme construite autour de votre façon de travailler.',
        examples: 'Devis automatiques, commande et paiement, réservation et planning.',
        why: [
          { title: 'Récupérer du temps', text: 'Ressaisies, relances et calculs se font tout seuls, sur une plateforme web sur mesure accessible partout.' },
          { title: 'Moins d’erreurs et d’oublis', text: 'Vos règles sont appliquées de la même façon à chaque fois.' },
          { title: 'Grandir sans alourdir', text: 'La plateforme évolue avec vous, sans repartir de zéro.' },
        ],
        steps: [
          { title: 'Je comprends votre activité', text: 'Un échange pour cerner ce que vous faites à la main, où vous perdez du temps et ce qui compte pour vous.' },
          { title: 'Vous validez un prototype', text: 'Vous voyez une première version avant que tout soit construit, puis des points réguliers pour ajuster selon vos retours.' },
          { title: 'Ensuite, à votre choix', text: 'Vous repartez avec le code et sa documentation, ou je m’occupe de tout clé en main : nom de domaine, serveur et maintenance technique.' },
        ],
        cta: 'Automatiser mon activité',
      },
      site: {
        tab: 'Site vitrine',
        audience: 'Artisans, commerçants, indépendants',
        headline: 'Vos futurs clients vous cherchent d’abord sur internet.',
        intro:
          'En quelques secondes, un inconnu décide s’il vous appelle ou passe au suivant. Je conçois un site clair, rapide sur mobile et construit autour de votre activité, pour que le bon choix soit de vous contacter.',
        examples: 'Présentation de votre activité, tarifs, horaires, zone d’intervention, formulaire de contact.',
        why: [
          { title: 'Être trouvé', text: 'Votre site est conçu pour qu’on vous trouve plus facilement quand on cherche votre métier : rapide, adapté au mobile, pensé pour Google.' },
          { title: 'Inspirer confiance', text: 'Un site clair rassure avant le premier échange. Il est conçu pour vous, pas un modèle recopié.' },
          { title: 'Être contacté sans effort', text: 'Téléphone, formulaire, horaires : le visiteur trouve tout dès son arrivée, sur mobile.' },
        ],
        steps: [
          { title: 'On échange sur votre activité', text: 'On parle de votre métier, de vos clients et de ce qu’un visiteur doit pouvoir faire sur votre site.' },
          { title: 'Je vous propose une maquette', text: 'Vous voyez à quoi ressemblera votre site avant qu’il soit construit.' },
          { title: 'Mise en ligne et prise en main', text: 'Je mets le site en ligne (nom de domaine, hébergement et mentions légales compris) et je vous montre comment il fonctionne.' },
        ],
        cta: 'Me rendre visible',
      },
    },
  },

  clients: {
    title: "Ils m'ont fait confiance",
    caseStudy: 'Étude de cas',
    items: {
      gendarmerie: { name: 'Gendarmerie nationale', sector: 'Service public', work: 'Applications sur mesure' },
      trik3r: { name: 'Trik3r Collecte', sector: 'BTP & collecte', work: 'Plateforme web complète' },
      'ingrid-medium': { name: 'Ingrid Médium', sector: 'Voyance', work: 'Création du site' },
      'stephanie-lortal': { name: 'Stéphanie Lortal', sector: 'Sophrologie', work: 'Maintenance du site' },
    },
  },

  work: {
    eyebrow: 'Réalisations',
    title: 'Les applications que j’ai conçues, livrées et fait vivre.',
    ctaEyebrow: 'Et pour vous ?',
    ctaTitle: 'Votre projet pourrait être le prochain.',
    ctaText:
      'Un tableur à remplacer, un processus à automatiser ou une idée à lancer : on commence par comprendre votre activité, et le prix est fixé par écrit avant de démarrer.',
    quote: 'Demander un devis',
    profile: 'Voir mon profil technique',
  },

  caseCard: {
    screenshotAlt: 'Capture de {client}',
    confidentialNote: 'Applications internes : pour des raisons de confidentialité, je ne peux pas en montrer de capture.',
    read: "Lire l'étude de cas",
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Parlons de votre projet.',
    intro: "Décrivez votre besoin en quelques lignes, même s'il est encore flou. Pas de jargon : on parle de votre activité, pas de technique.",
    steps: [
      { title: 'Vous écrivez', text: 'Quelques lignes suffisent, même si le besoin est encore flou.' },
      { title: 'Je vous réponds sous 24 h ouvrées', text: 'Avec de premières pistes, sans engagement.' },
      { title: 'On en parle', text: 'De vive voix si vous le souhaitez, sinon par email.' },
    ],
    preferWriting: 'Vous préférez écrire directement ?',
    writeByEmail: "M'écrire par email",
    preferTalking: 'Vous préférez parler ?',
    bookCall: 'Réserver un appel de 20 min',
    requiredNote: ['Les champs marqués d’un ', ' sont obligatoires.'],
    projectLegend: 'Votre projet concerne',
    projectTypes: { outil: 'Un outil sur mesure', site: 'Un site vitrine', autre: 'Autre' },
    name: 'Nom',
    email: 'Email',
    company: 'Entreprise',
    message: 'Votre besoin',
    placeholder: 'Ex. : je gère mes devis sur Excel et je perds du temps à relancer mes clients…',
    budgetLegend: 'Budget indicatif',
    optional: '(facultatif)',
    budgets: {
      none: 'Je ne sais pas encore',
      lt2k: 'Moins de 2 000 €',
      '2to5k': '2 000 – 5 000 €',
      '5to15k': '5 000 – 15 000 €',
      gt15k: 'Plus de 15 000 €',
    },
    honeypot: 'Ne pas remplir',
    privacy: ['Vos informations servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni utilisées pour de la prospection ; détails et droits dans les ', 'mentions légales', '.'],
    submit: 'Envoyer ma demande',
    sending: 'Envoi…',
    /** Messages affichés par le script du formulaire (et au retour de l'envoi sans JavaScript). */
    msg: {
      success: 'Merci, votre message est bien parti. Je vous réponds sous 24 h ouvrées.',
      fallback: 'Le message n’a pas pu être envoyé. Réessayez dans un instant, ou écrivez-moi directement par email.',
      required: 'Ce champ est obligatoire.',
      emailInvalid: 'Saisissez une adresse email valide, par exemple nom@exemple.fr.',
      tooShort: 'Écrivez au moins 20 caractères.',
      invalid: 'Valeur invalide.',
      errors: 'Le formulaire contient des erreurs : corrigez les champs signalés.',
    },
    /** Erreurs renvoyées par le serveur (`/api/contact`). */
    server: {
      name: 'Merci d’indiquer votre nom.',
      email: 'Adresse email invalide.',
      message: 'Votre message doit faire au moins 20 caractères.',
      invalid: 'Formulaire invalide.',
      sendFailed: "Le message n'a pas pu être envoyé. Écrivez-moi directement par email.",
    },
  },

  /** Accusé de réception envoyé au prospect (dans sa langue). */
  email: {
    subject: 'Confirmation : votre demande est bien reçue — {name}',
    steps: [
      ['Je lis votre demande', 'Je prends le temps de bien comprendre votre besoin.'],
      ['Je vous réponds sous 24 h ouvrées', 'Avec des premières pistes concrètes.'],
      ['On en parle', 'Un échange pour valider la meilleure approche, sans engagement.'],
    ],
    textHello: 'Bonjour {name},',
    textBody: "Merci pour votre message, je l'ai bien reçu. Je reviens vers vous sous 24 h ouvrées avec des premières pistes.",
    textRecap: 'Pour rappel, votre demande :',
    textBye: 'À très vite,',
    preheader: "Merci {name}, j'ai bien reçu votre message et je reviens vers vous sous 24 h ouvrées.",
    title: "Merci {name}, j'ai bien reçu votre demande.",
    leadBefore: 'Je lis votre message avec attention et je reviens vers vous ',
    leadStrong: 'sous 24 h ouvrées',
    leadAfter: ' avec des premières pistes.',
    next: 'La suite',
    recapTitle: 'Pour rappel, votre demande',
    recapProject: 'Projet',
    recapBudget: 'Budget indicatif',
    reply: 'Une précision à ajouter ? Répondez simplement à ce mail, il me parvient directement.',
    backToSite: 'Retour au site',
    footer: 'Vous recevez ce message car vous avez rempli le formulaire de contact de {host}. Aucune autre communication ne vous sera envoyée.',
  },

  profile: {
    title: 'Profil technique',
    description:
      "Développeur full-stack TypeScript freelance : React, Next.js, Node.js, NestJS. Conception d'applications métier et de SaaS, du besoin à la production. Missions en remote.",
    photoAlt: 'Elvis Pichou, développeur full-stack freelance',
    cv: 'CV (PDF)',
    h1: 'Développeur full-stack TypeScript, du besoin métier à la production.',
    intro:
      'Depuis 2021, je conçois des applications web complètes : compréhension du métier, conception fonctionnelle, architecture, développement, tests, déploiement et maintenance.',
    stats: [
      { label: 'Développeur', value: 'Depuis 2021' },
      { label: 'Gendarmerie nationale', value: '4 ans' },
      { label: 'Utilisateurs en production', value: '2 000+' },
    ],
    remote: 'Remote · basé à Toulouse',
    languages: 'Français natif · anglais professionnel',
    cta: 'Me proposer une mission',
    experiences: 'Expériences',
    experiencesHint: 'Cliquez sur une expérience : les compétences utilisées s’allument dans la stack.',
    /** Téléphone et tablette : la stack est loin sous les expériences, les compétences s'affichent dans la carte touchée (D-118). */
    experiencesHintTouch: 'Touchez une expérience pour afficher les compétences utilisées.',
    caseLink: 'Étude de cas détaillée →',
    stack: 'Stack',
    stackGroups: { frontend: 'Frontend', backend: 'Backend', data: 'Données', infra: 'Infra & qualité', integrations: 'Intégrations' },
    /** Libellés des compétences qui ne sont pas des noms propres (les autres s'affichent tels quels). */
    skills: { 'unit-tests': 'Tests unitaires', geolocation: 'Géolocalisation' },
    experienceItems: {
      chariot: {
        period: '2025 → aujourd’hui',
        title: 'Cofondateur & développeur full-stack',
        org: 'Chariot (SaaS)',
        text: 'Architecture microservices NestJS, temps réel Socket.IO, multi-bases MongoDB/PostgreSQL, Keycloak, Stripe, CI/CD complète jusqu’au déploiement automatisé.',
      },
      gendarmerie: {
        period: '2022 → 2026',
        title: 'Développeur full-stack',
        org: 'Gendarmerie nationale',
        text: 'Application nationale et applications régionales (200 à 2 000 utilisateurs). Recueil du besoin, Next.js/NestJS/PostgreSQL, migration de monolithes Symfony, boilerplate commun, formation des alternants.',
      },
      trik3r: {
        period: '2024 · 6 mois',
        title: 'Développeur, mission freelance',
        org: 'Trik3r Collecte',
        text: 'Plateforme complète from scratch : commande, réservation, moteur de tarification, Stripe, back-office avec rôles et permissions. En production.',
      },
      lortal: {
        period: '2026 · mission freelance',
        title: 'Contenu et référencement d’un site WordPress',
        org: 'Stéphanie Lortal, sophrologue',
        text: 'Ajout de contenu et amélioration du référencement (SEO) sur un site WordPress existant, hors de ma stack habituelle.',
      },
      ingrid: {
        period: '2024 · mission freelance',
        title: 'Conception et développement du site',
        org: 'Ingrid Médium',
        text: 'Site 100 % Next.js, Tailwind CSS et PostgreSQL, avec un vrai back-office pour gérer ses prestations et ses événements promotionnels.',
      },
    },
    education: 'Formation',
    educationItems: [
      { years: '2021 – 2023', title: 'DUT Informatique', school: 'IUT de Blagnac' },
      { years: '2023 – 2024', title: 'Bachelor Développement', school: 'Toulouse Ynov Campus' },
      { years: '2024 – 2026', title: 'Master Expert en développement logiciel (RNCP niveau 7)', school: 'Toulouse Ynov Campus' },
    ],
    thisSite: {
      eyebrow: 'Ce site',
      title: 'Le bon outil pour le besoin, y compris ici.',
      points: [
        {
          lead: 'Astro plutôt que Next.js.',
          text: "Un site de présentation n'a pas besoin d'embarquer le runtime React : les pages sont du HTML statique, et le JavaScript n'est chargé que là où il sert (formulaire de contact). Résultat : un site très léger et instantané.",
        },
        {
          lead: 'Contenu typé.',
          text: "Les études de cas sont des fichiers Markdown validés par un schéma Zod au build. Le formulaire passe par un endpoint serverless validé côté serveur, avec anti-spam (honeypot + délai) et fonctionne même sans JavaScript.",
        },
        {
          lead: 'Sobre et respectueux.',
          text: "Aucun cookie, mesure d'audience anonyme (Umami), accessibilité soignée (navigation clavier, contrastes, mouvement réduit), mode sombre automatique, données structurées schema.org. Site disponible en français et en anglais.",
        },
      ],
    },
  },

  casePage: {
    back: 'Toutes les réalisations',
    client: 'Client',
    period: 'Période',
    role: 'Mon rôle',
    problem: 'Le problème',
    underTheHood: 'Sous le capot',
    forTechnical: 'pour les profils techniques',
    results: 'Résultats',
    visit: 'Voir le site :',
    similarTitle: 'Un besoin similaire ?',
    similarText1: 'Parlons-en : premier échange gratuit et sans engagement.',
    similarText2: 'Code et documentation transmis, points réguliers à chaque livraison.',
    cta: 'Parler de mon projet',
    shiftEyebrow: 'Ce que mes applications ont remplacé',
    before: 'Avant',
    after: 'Avec une application',
    domains: 'Domaines des projets',
    chapters: 'Chapitres',
    demoSteps: 'Étapes du processus',
    quoteOpen: '« ',
    quoteClose: ' »',
  },

  notFound: {
    title: 'Page introuvable',
    eyebrow: 'Erreur 404',
    heading: "Cette page n'existe pas (ou plus).",
    back: "Retour à l'accueil",
  },

  legal: {
    title: 'Mentions légales',
  },
};

export type Dict = typeof fr;
