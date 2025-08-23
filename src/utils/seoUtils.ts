/**
 * Sitemap 生成器 - 支持多语言
 */
import { generateSitemapUrls } from '../utils/i18nRouting.js';

// 定义站点的所有路由
const SITE_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/unocss',
];

/**
 * 生成 XML Sitemap
 */
export function generateSitemap(baseUrl: string = 'https://example.com'): string {
  const now = new Date().toISOString();
  
  const urls = generateSitemapUrls(SITE_ROUTES, baseUrl, now);
  
  const urlEntries = urls.map(({ url, alternates }) => {
    const alternateLinks = alternates
      .map(({ lang, url: altUrl }) => 
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}" />`
      )
      .join('\n');

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${alternateLinks}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;
}

/**
 * 生成 robots.txt
 */
export function generateRobotsTxt(baseUrl: string = 'https://example.com'): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /.well-known/

# Allow specific crawling of language versions
Allow: /zh-CN/
Allow: /en-US/
Allow: /locales/`;
}

/**
 * Express 路由处理器
 */
export function setupSEORoutes(app: any, baseUrl: string = 'https://example.com') {
  // Sitemap.xml 路由
  app.get('/sitemap.xml', (_req: any, res: any) => {
    const sitemap = generateSitemap(baseUrl);
    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
  });

  // Robots.txt 路由
  app.get('/robots.txt', (_req: any, res: any) => {
    const robots = generateRobotsTxt(baseUrl);
    res.set('Content-Type', 'text/plain');
    res.send(robots);
  });
}
