import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'
import eruda from './build/plugins/vite-plugin-eruda'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      Pages({
        dirs: [{ dir: 'src/pages', baseRoute: '/' }],
        exclude: [
          '**/component(s)?/**/*.(ts|tsx)',
          '**/component(s)?/*.(ts|tsx)',
        ],
        extensions: ['tsx'],
      }),
      UnoCSS(),
      eruda({ debug: mode !== 'production' })
    ],
    ssr: {
      external: ['react', 'react-dom', 'react-router-dom']
    },
    build: {
      rollupOptions: {
        output: {
          advancedChunks: {
            groups: [{ name: 'vendor', test: /\/react(?:-dom)?/ }]
          }
        }
      }
    }
  }
})
