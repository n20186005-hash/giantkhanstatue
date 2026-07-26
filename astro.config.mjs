import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://giantkhanstatue.com',
  output: 'static',
  i18n: {
    defaultLocale: 'mn',
    locales: ['zh', 'en', 'ja', 'ko', 'mn', 'ru'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
