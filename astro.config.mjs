// @ts-check
import { defineConfig } from 'astro/config';

// URL pública do site (usada em canonical, Open Graph e sitemap).
// Defina SITE_URL no ambiente de deploy quando o domínio final estiver decidido.
const site = process.env.SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
  vite: {
    build: { assetsInlineLimit: 2048 },
  },
});
