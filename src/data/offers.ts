import {
  Search, ShieldCheck, MousePointerClick, Timer, CircleCheck, Sprout,
  Globe, Workflow, MessageCircle, FileText, LifeBuoy, Rocket,
} from '@lucide/astro';

/** Contenu détaillé des deux offres (section à onglets de la homepage). */
export const offers = [
  {
    id: 'outil',
    tab: 'Transformation digitale',
    tabIcon: Workflow,
    audience: 'TPE, PME',
    headline: 'Ce que vous refaites à la main, une plateforme le fait pour vous.',
    intro:
      'Devis dans Word, planning par SMS, suivi sur Excel : je remplace ces bricolages par une plateforme construite autour de votre façon de travailler.',
    examples: 'Devis automatiques, commande et paiement, réservation et planning.',
    why: [
      { icon: Timer, title: 'Récupérer du temps', text: 'Ressaisies, relances et calculs se font tout seuls, sur une plateforme web sur mesure accessible partout.' },
      { icon: CircleCheck, title: 'Moins d’erreurs et d’oublis', text: 'Vos règles sont appliquées de la même façon à chaque fois.' },
      { icon: Sprout, title: 'Grandir sans alourdir', text: 'La plateforme évolue avec vous, sans repartir de zéro.' },
    ],
    steps: [
      { icon: MessageCircle, title: 'Je comprends votre activité', text: 'Un échange pour cerner ce que vous faites à la main, où vous perdez du temps et ce qui compte pour vous.' },
      { icon: FileText, title: 'Vous validez un prototype', text: 'Vous voyez une première version avant que tout soit construit, puis des points réguliers pour ajuster selon vos retours.' },
      { icon: LifeBuoy, title: 'Ensuite, à votre choix', text: 'Vous repartez avec le code et sa documentation, ou je m’occupe de tout clé en main : nom de domaine, serveur et maintenance technique.' },
    ],
    proof: { label: 'Cas client : Trik3r Collecte', href: '/realisations/trik3r', cta: 'De zéro à une plateforme en production' },
    cta: { label: 'Automatiser mon activité', href: '/?projet=outil#contact' },
  },
  {
    id: 'site',
    tab: 'Site vitrine',
    tabIcon: Globe,
    audience: 'Artisans, commerçants, indépendants',
    headline: 'Vos futurs clients vous cherchent d’abord sur internet.',
    intro:
      'En quelques secondes, un inconnu décide s’il vous appelle ou passe au suivant. Je conçois un site clair, rapide sur mobile et construit autour de votre activité, pour que le bon choix soit de vous contacter.',
    examples: 'Présentation de votre activité, tarifs, horaires, zone d’intervention, formulaire de contact.',
    why: [
      { icon: Search, title: 'Être trouvé', text: 'Votre site est conçu pour qu’on vous trouve plus facilement quand on cherche votre métier : rapide, adapté au mobile, pensé pour Google.' },
      { icon: ShieldCheck, title: 'Inspirer confiance', text: 'Un site clair rassure avant le premier échange. Il est conçu pour vous, pas un modèle recopié.' },
      { icon: MousePointerClick, title: 'Être contacté sans effort', text: 'Téléphone, formulaire, horaires : le visiteur trouve tout dès son arrivée, sur mobile.' },
    ],
    steps: [
      { icon: MessageCircle, title: 'On échange sur votre activité', text: 'On parle de votre métier, de vos clients et de ce qu’un visiteur doit pouvoir faire sur votre site.' },
      { icon: FileText, title: 'Je vous propose une maquette', text: 'Vous voyez à quoi ressemblera votre site avant qu’il soit construit.' },
      { icon: Rocket, title: 'Mise en ligne et prise en main', text: 'Je mets le site en ligne (nom de domaine, hébergement et mentions légales compris) et je vous montre comment il fonctionne.' },
    ],
    proof: { label: 'Ce site est fait comme je fais les vôtres', href: '/profil#ce-site', cta: 'Voir comment il est construit' },
    cta: { label: 'Me rendre visible', href: '/?projet=site#contact' },
  },
] as const;

