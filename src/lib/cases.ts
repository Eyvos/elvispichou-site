import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type CaseEntry = CollectionEntry<'realisations'> & { slug: string };

/**
 * Études de cas d'une langue. Les fichiers vivent dans `src/content/realisations/<langue>/<slug>.md`
 * (chaque étude existe dans les deux langues, vérifié par `npm run audit`). `slug` = nom du fichier, commun aux langues.
 */
export async function getCases(lang: Locale): Promise<CaseEntry[]> {
  const all = await getCollection('realisations');
  return all.filter((e) => e.id.startsWith(`${lang}/`)).map((e) => Object.assign(e, { slug: e.id.slice(lang.length + 1) }));
}
