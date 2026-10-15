/**
 * Configuration centrale du site : identité, liens, SEO. Données indépendantes de la langue.
 * Tous les textes affichés (métier, accroche, description, lieu, libellés) vivent dans `src/i18n/`.
 * Les liens à `null` ne sont pas affichés.
 */
export const site = {
  name: 'Elvis Pichou',
  url: 'https://elvispichou.com',
  // TODO : remplacer par l'adresse définitive une fois le domaine acheté.
  email: 'pichou.elvis@gmail.com',
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
 * Projets et clients affichés dans la bande « Ils m'ont fait confiance » (secteur et prestation : `clients.items` dans `src/i18n/`).
 * Logo : déposer `src/assets/logos/<id>.svg` (ou .png) ; sans fichier, le nom s'affiche en texte.
 * url : adresse du site, affichée et cliquable. null = rien d'affiché.
 */
export const clients = [
  { id: 'gendarmerie', url: null as string | null, case: 'gendarmerie' as string | null },
  { id: 'trik3r', url: 'https://trik3r-collecte.fr' as string | null, case: 'trik3r' as string | null },
  { id: 'ingrid-medium', url: 'https://ingrid-medium.fr' as string | null, case: null as string | null }, // TODO : confirmer le nom exact
  { id: 'stephanie-lortal', url: 'https://sophrologue-lortal.fr' as string | null, case: null as string | null },
] as const;

/**
 * Menu principal : une entrée par section de la homepage (sauf accueil = logo, contact = bouton d'action).
 * Le libellé est `header.nav[key]` dans `src/i18n/`. Le contrôle `npm run audit` échoue si une section manque ici.
 */
export const nav = [
  { href: '/#offre', key: 'offre' },
  { href: '/#realisations', key: 'realisations' },
] as const;

/** Accès discret pour les recruteurs, ESN et agences (décision D-05). Libellé : `common.technicalProfile`. */
export const navProfile = { href: '/profil' } as const;
