import type { APIRoute } from 'astro';
import { languagesList } from '../i18n/ui';

const site = 'https://giantkhanstatue.com';
const langs = languagesList; // ['zh', 'en', 'ja', 'ko', 'mn', 'ru']
// Each entry maps to the per-language route set. '' = the main attraction page.
// Policy/cookie pages are noindex and excluded from the sitemap.
const routes = [''];

function escapeUrl(url: string): string {
  return url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const GET: APIRoute = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  for (const route of routes) {
    const isHome = route === '';
    const loc = isHome ? `${site}/zh` : `${site}/zh${route}`;
    const priority = isHome ? '1.0' : '0.4';

    xml += `  <url>
    <loc>${escapeUrl(loc)}</loc>
`;
    for (const lang of langs) {
      const href = isHome ? `${site}/${lang}` : `${site}/${lang}${route}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeUrl(href)}" />
`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeUrl(loc)}" />
`;
    xml += `    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
