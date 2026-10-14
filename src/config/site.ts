/**
 * Configuration centrale du site : identité, liens, SEO.
 * Les liens à `null` ne sont pas affichés.
 */
export const site = {
  name: 'Elvis Pichou',
  url: 'https://elvispichou.com',
  role: 'Développeur web freelance',
  tagline: 'Je conçois des outils web qui simplifient le travail des entreprises.',
  description:
    "Développeur web freelance à Toulouse : outils sur mesure pour TPE et PME, sites vitrines pour indépendants et commerçants. Un interlocuteur unique, du besoin jusqu'à la mise en ligne.",
  // TODO : remplacer par l'adresse définitive une fois le domaine acheté.
  email: 'pichou.elvis@gmail.com',
  location: 'Toulouse — missions 100 % à distance',
  availability: 'Disponible pour de nouveaux projets',
  /** Mentions légales : à renseigner avant la mise en ligne (null = « à compléter » affiché sur la page). */
  legal: {
    status: 'entrepreneur individuel' as string | null,
    siret: null as string | null,
    address: null as string | null, // adresse professionnelle (domiciliation possible)
    vat: null as string | null, // n° de TVA intracommunautaire, ou null si franchise en base
    vatFranchise: true as boolean, // TVA non applicable, art. 293 B du CGI
    mediator: null as string | null, // médiateur de la consommation (obligatoire pour les clients particuliers)
  },
  links: {
    malt: 'https://www.malt.fr/profile/elvispichou',
    linkedin: 'https://www.linkedin.com/in/elvis-pichou' as string | null,
    github: 'https://github.com/Eyvos',
    calendar: null as string | null, // TODO : lien Cal.com « Appel découverte 20 min »
    cv: null as string | null, // TODO : '/elvis-pichou-cv.pdf' une fois le PDF dans /public
  },
} as const;

/**
 * Projets et clients affichés dans la bande « Ils m'ont fait confiance ».
 * Logo : déposer `src/assets/logos/<id>.svg` (ou .png) ; sans fichier, le nom s'affiche en texte.
 * url : adresse du site, affichée et cliquable. null = rien d'affiché.
 */
export const clients = [
  { id: 'gendarmerie', sector: 'Service public', name: 'Gendarmerie nationale', work: 'Applications sur mesure', url: null as string | null, case: 'gendarmerie' as string | null },
  { id: 'trik3r', sector: 'BTP & collecte', name: 'Trik3r Collecte', work: 'Plateforme web complète', url: 'https://trik3r-collecte.fr' as string | null, case: 'trik3r' as string | null },
  { id: 'ingrid-medium', sector: 'Voyance', name: 'Ingrid Médium', work: 'Création du site', url: 'https://ingrid-medium.fr' as string | null, case: null as string | null }, // TODO : confirmer le nom exact
  { id: 'stephanie-lortal', sector: 'Sophrologie', name: 'Stéphanie Lortal', work: 'Maintenance du site', url: 'https://sophrologue-lortal.fr' as string | null, case: null as string | null },
] as const;

/**
 * Menu principal : une entrée par section de la homepage (sauf accueil = logo, contact = bouton d'action).
 * Le contrôle `npm run audit` échoue si une section manque ici.
 */
export const nav = [
  { href: '/#offre', label: 'Offres' },
  { href: '/#realisations', label: 'Réalisations' },
  { href: '/#a-propos', label: 'Qui je suis' },
] as const;

/** Accès discret pour les recruteurs, ESN et agences (décision D-05). */
export const navProfile = { href: '/profil', label: 'Profil technique' } as const;
