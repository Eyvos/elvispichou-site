import {
  Search, ShieldCheck, MousePointerClick, Timer, CircleCheck, Sprout,
  Globe, Workflow, MessageCircle, FileText, LifeBuoy, Rocket,
} from '@lucide/astro';

/**
 * Parties de l'offre indépendantes de la langue : icônes et liens. Les textes (onglet, promesse, raisons, étapes)
 * sont dans `offers.items[id]` de `src/i18n/`, dans le même ordre (3 raisons, 3 étapes).
 */
export const offerIds = ['outil', 'site'] as const;
export type OfferId = (typeof offerIds)[number];

export const offerMeta = {
  outil: {
    tabIcon: Workflow,
    whyIcons: [Timer, CircleCheck, Sprout],
    stepIcons: [MessageCircle, FileText, LifeBuoy],
    cta: '/?projet=outil#contact',
  },
  site: {
    tabIcon: Globe,
    whyIcons: [Search, ShieldCheck, MousePointerClick],
    stepIcons: [MessageCircle, FileText, Rocket],
    cta: '/?projet=site#contact',
  },
} as const;
