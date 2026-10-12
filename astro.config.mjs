// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://elvispichou.fr',
  // Pages statiques par défaut ; seul /api/contact s'exécute côté serveur.
  adapter: vercel(),
  integrations: [sitemap({ filter: (page) => !page.includes('/mentions-legales') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
