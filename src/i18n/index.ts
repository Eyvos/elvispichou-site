import { fr, type Dict } from './fr';
import { en } from './en';

/**
 * Internationalisation : français (langue par défaut, sans préfixe d'URL) et anglais (préfixe `/en`).
 * Tous les textes vivent dans `fr.ts` (source, qui définit la forme) et `en.ts` (typé sur `fr.ts` : une clé
 * manquante fait échouer `astro check`). Règle de projet : aucun texte visible en dur dans un composant.
 */
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

const dictionaries: Record<Locale, Dict> = { fr, en };

/** Codes pour `og:locale`, sitemap et JSON-LD. */
export const localeMeta: Record<Locale, { og: string; hreflang: string; label: string }> = {
  fr: { og: 'fr_FR', hreflang: 'fr-FR', label: 'Français' },
  en: { og: 'en_US', hreflang: 'en-US', label: 'English' },
};

const isLocale = (v: string | undefined): v is Locale => locales.includes(v as Locale);

/** Langue d'une URL : `/en/...` → anglais, tout le reste → français. */
export function getLocale(url: URL): Locale {
  const first = url.pathname.split('/')[1];
  return isLocale(first) && first !== defaultLocale ? first : defaultLocale;
}

/** Dictionnaire d'une langue. */
export const getDict = (locale: Locale): Dict => dictionaries[locale];

/** Raccourci pour les composants : `const { lang, t } = useI18n(Astro.url);` */
export function useI18n(url: URL) {
  const lang = getLocale(url);
  return { lang, t: dictionaries[lang] };
}

/**
 * Adresse d'un chemin interne dans une langue : `localePath('en', '/profil')` → `/en/profil`.
 * Gère les ancres et paramètres (`/#contact`, `/?projet=site#contact`). Les liens externes sont rendus tels quels.
 */
export function localePath(locale: Locale, path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

/** Chemin sans préfixe de langue : `/en/profil` → `/profil`. */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/([a-z]{2})(\/.*)?$/);
  return m && isLocale(m[1]) && m[1] !== defaultLocale ? (m[2] ?? '/') : pathname;
}

/** Même page dans une autre langue. */
export const switchLocalePath = (pathname: string, to: Locale) => localePath(to, stripLocale(pathname));

/** Remplace `{nom}` dans un texte : `fmt(t.x, { n: 3 })`. */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));

/**
 * `getStaticPaths` des pages qui existent dans chaque langue (dossier `src/pages/[...lang]/`) :
 * `/page` pour le français (paramètre absent), `/en/page` pour l'anglais.
 */
export const langStaticPaths = () =>
  locales.map((l) => ({ params: { lang: l === defaultLocale ? undefined : l } }));
