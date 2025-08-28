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

// Language switching API endpoint
app.post('/api/language', express.json(), (req, res) => {
  const { language } = req.body
  const supportedLanguages = ['zh-CN', 'en-US']
  
  if (!language || !supportedLanguages.includes(language)) {
    return res.status(400).json({ error: 'Invalid language' })
  }
  
  // 设置语言 cookie
  const maxAge = 365 * 24 * 60 * 60 // 1年
  res.cookie('i18next-lng', language, {
    path: '/',
    maxAge: maxAge * 1000, // express 需要毫秒
    sameSite: 'strict',
    secure: false, // 开发环境设为 false
  })
  
  res.json({ success: true, language })
})

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

    // 语言检测逻辑
    let detectedLanguage = 'zh-CN' // 默认语言
    
    if (!isProduction && vite) {
      // 开发环境：动态导入语言检测器
      const { detectServerLanguage } = await vite.ssrLoadModule('/src/server/languageDetector.ts')
      detectedLanguage = detectServerLanguage(req)
    } else {
      // 生产环境：直接导入
      const { detectServerLanguage } = await import('./dist/server/languageDetector.js')
      detectedLanguage = detectServerLanguage(req)
    }

    const rendered = await render({ url, userAgent, cookie, language: detectedLanguage })

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
