import {
  Search, ShieldCheck, MousePointerClick, Clock, Timer, CircleCheck, LayoutDashboard, Sprout,
  MessageCircle, FileText, Hammer, LifeBuoy, Globe, Workflow, Check,
} from '@lucide/astro';

/** Contenu détaillé des deux offres (section à onglets de la homepage). */
export const offers = [
  {
    id: 'outil',
    tab: 'Transformation digitale',
    tabIcon: Workflow,
    audience: 'TPE, PME, associations',
    headline: 'Ce que vous refaites chaque semaine à la main, une plateforme peut le faire à votre place.',
    intro:
      'Devis dans Word, planning par SMS, suivi sur Excel : je remplace ces bricolages par une plateforme construite autour de votre façon de travailler.',
    why: [
      { icon: Timer, title: 'Récupérer du temps', text: 'Ressaisies, relances et calculs se font tout seuls.' },
      { icon: CircleCheck, title: 'Moins d’erreurs et d’oublis', text: 'Vos règles sont appliquées de la même façon à chaque fois.' },
      { icon: LayoutDashboard, title: 'Tout au même endroit', text: 'Fini les infos éparpillées : tout est rassemblé sur une même plateforme.' },
      { icon: Sprout, title: 'Grandir sans alourdir', text: 'La plateforme évolue avec vous, sans repartir de zéro.' },
    ],
    gets: [
      'Une plateforme web sur mesure, accessible partout',
      'Livrée par étapes : vous l’utilisez avant la fin',
      'Code et documentation transmis, ou prise en charge clé en main',
    ],
    examples: ['Devis automatiques', 'Commande et paiement', 'Réservation et planning'],
    steps: [
      { title: 'Je comprends votre activité', text: 'Un échange pour cerner ce que vous faites à la main, où vous perdez du temps et ce qui compte pour vous. Le périmètre et le prix sont fixés par écrit avant de démarrer.' },
      { title: 'Vous validez un prototype', text: 'Vous voyez une première version avant que tout soit construit, puis un point à chaque livraison pour ajuster selon vos retours.' },
      { title: 'Livraison par étapes, puis à votre choix', text: 'Vous utilisez la plateforme avant qu’elle soit terminée. Ensuite, vous repartez avec le code et sa documentation, ou je m’occupe de tout clé en main : nom de domaine, serveur et maintenance technique.' },
    ],
    price: 'Périmètre et prix fixés par écrit avant de démarrer.',
    proof: { label: 'Cas client : Trik3r Collecte', href: '/realisations/trik3r', cta: 'De zéro à une plateforme en production' },
    cta: { label: 'Demander un devis', href: '/?projet=outil#contact' },
  },
  {
    id: 'site',
    tab: 'Site vitrine',
    tabIcon: Globe,
    audience: 'Artisans, commerçants, indépendants',
    headline: 'Vos futurs clients vous cherchent d’abord sur Google et sur leur téléphone.',
    intro:
      'En quelques secondes, un inconnu décide s’il vous appelle ou passe au suivant.',
    why: [
      { icon: Search, title: 'Être trouvé', text: 'Quand on cherche votre métier, vous apparaissez.' },
      { icon: ShieldCheck, title: 'Inspirer confiance', text: 'Un site clair et rapide rassure avant le premier échange.' },
      { icon: MousePointerClick, title: 'Être contacté sans effort', text: 'Téléphone, formulaire, horaires : le visiteur trouve tout dès son arrivée, sur mobile.' },
      { icon: Clock, title: 'Gagner du temps', text: 'Tarifs, horaires, zone : les questions fréquentes trouvent leur réponse.' },
    ],
    gets: [
      'Un site conçu pour vous, pas un modèle recopié',
      'Adapté au mobile, rapide, référencé sur Google',
      'Nom de domaine, hébergement et mentions légales pris en charge',
    ],
    examples: [],
    steps: [
      { title: 'On échange sur votre activité', text: 'On parle de votre métier, de vos clients et de ce qu’un visiteur doit pouvoir faire sur votre site.' },
      { title: 'Je vous propose une maquette', text: 'Vous voyez à quoi ressemblera votre site avant qu’il soit construit, avec un prix fixe annoncé dès le départ.' },
      { title: 'Mise en ligne et prise en main', text: 'Je mets le site en ligne (nom de domaine, hébergement et mentions légales compris) et je vous montre comment il fonctionne.' },
    ],
    price: 'Prix annoncé avant de commencer, sans surprise.',
    proof: { label: 'Ce site est fait comme je fais les vôtres', href: '/profil#ce-site', cta: 'Voir comment il est construit' },
    cta: { label: 'Demander un devis', href: '/?projet=site#contact' },
  },
] as const;

export const checkIcon = Check;
export const stepIcons = [MessageCircle, FileText, Hammer, LifeBuoy];
