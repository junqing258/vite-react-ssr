import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Writable } from 'stream'
import 'virtual:uno.css'
import App from './App'

export function render(url: string) {
  return new Promise<{ html: string }>((resolve, reject) => {
    const chunks: Buffer[] = []
    
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk)
        callback()
      },
      final(callback) {
        const html = Buffer.concat(chunks).toString('utf-8')
        resolve({ html })
        callback()
      }
    })

    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onShellReady() {
          // The content above all Suspense boundaries is ready
          stream.pipe(writable)
        },
        onShellError(error: unknown) {
          // Something errored before we could complete the shell
          reject(error)
        },
        onError(error: unknown) {
          console.error('SSR Error:', error)
        }
      }
    )
  })
}
