import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Études de cas. Le corps Markdown raconte l'histoire côté client ;
 * `underTheHood` alimente le bloc repliable « Sous le capot », destiné aux profils techniques.
 */
const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    url: z.url().optional(),
    sector: z.string(),
    kind: z.enum(['site', 'outil', 'produit']),
    period: z.string(),
    role: z.string(),
    summary: z.string(),
    cardNote: z.string().optional(),
    problem: z.string(),
    keyFacts: z.array(z.object({ value: z.string(), label: z.string() })).max(3).optional(),
    outcomes: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    confidential: z.boolean().default(false),
    testimonial: z.object({ quote: z.string(), author: z.string() }).optional(),
    underTheHood: z.object({
      stack: z.array(z.string()),
      highlights: z.array(z.string()),
    }),
  }),
});

export const collections = { realisations };
