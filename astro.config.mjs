import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://paulinerenard-educateurcanin.fr',
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
