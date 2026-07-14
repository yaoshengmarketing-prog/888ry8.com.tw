import { getCollection } from 'astro:content';
import { CATEGORIES, SITE } from '../consts';

export async function GET() {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  const iso = (d) => new Date(d).toISOString();
  const now = new Date().toISOString();

  const staticPages = [
    ['/deposit-guide/', '0.7'], ['/withdraw-guide/', '0.7'],
    ['/security-license/', '0.6'], ['/terms/', '0.3'], ['/privacy/', '0.3'],
  ];

  const urls = [
    { loc: `${SITE.url}/`, lastmod: now, priority: '1.0' },
    { loc: `${SITE.url}/blog/`, lastmod: now, priority: '0.8' },
    ...Object.keys(CATEGORIES).map((c) => ({
      loc: `${SITE.url}/blog/categories/${c}/`, lastmod: now, priority: '0.6',
    })),
    ...staticPages.map(([loc, priority]) => ({ loc: `${SITE.url}${loc}`, lastmod: now, priority })),
    ...posts.map((p) => ({
      loc: `${SITE.url}/post/${p.slug}/`,
      lastmod: iso(p.data.updatedDate ?? p.data.pubDate),
      priority: '0.7',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
