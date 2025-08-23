import fs from 'node:fs/promises'
import express from 'express'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// 判断开发环境，设置合适的 base URL
const baseUrl = isProduction 
  ? (process.env.SITE_URL || 'https://example.com')
  : `http://localhost:${port}`;

// SEO 路由支持（仅开发环境中的简单实现）
if (!isProduction) {
  // 静态资源处理 - 处理 i18n 翻译文件
  app.use('/locales', express.static('public/locales'));
  
  // 开发环境简单实现 sitemap 和 robots
  app.get('/sitemap.xml', (req, res) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/en-US/" />
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/about" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/en-US/about" />
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${baseUrl}/contact" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/en-US/contact" />
  </url>
</urlset>`;
    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
  });

  app.get('/robots.txt', (req, res) => {
    const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

Disallow: /admin/
Disallow: /api/
Allow: /zh-CN/
Allow: /en-US/
Allow: /locales/`;
    res.set('Content-Type', 'text/plain');
    res.send(robots);
  });
} else {
  // 生产环境使用完整的中间件
  try {
    const { languageMiddleware } = await import('./dist/server/middleware/languageMiddleware.js')
    const { setupSEORoutes } = await import('./dist/server/utils/seoUtils.js')
    app.use(languageMiddleware)
    setupSEORoutes(app, baseUrl)
  } catch (e) {
    console.log('SEO utilities not available in production build')
  }
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const userAgent = req.headers['user-agent'] || ''
    const cookie = req.headers['cookie'] || ''

    const rendered = await render({ url, userAgent, cookie })

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
