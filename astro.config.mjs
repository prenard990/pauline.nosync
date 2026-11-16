import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pauline-renard.mute-dew-d0f2.workers.dev',
  integrations: [sitemap()],
  redirects: {
    '/offres': '/prestations/',
    '/accompagnements': '/prestations/#accompagnements',
    '/balades-collectives': '/prestations/#balades',
    '/a-propos': '/mon-approche/',
    '/conseils': '/ecole-oslo/#conseils',
    '/races': '/ecole-oslo/#familles',
  },
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
