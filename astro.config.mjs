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
  integrations: [sitemap({ filter: (page) => !page.includes('/mentions-legales') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
