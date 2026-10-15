// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://elvispichou.com',
  // Pages statiques par défaut ; seul /api/contact s'exécute côté serveur.
  adapter: cloudflare(),
  // Deux langues : français à la racine, anglais sous /en (voir src/i18n/). Le sitemap publie les liens hreflang.
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/mentions-legales'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
