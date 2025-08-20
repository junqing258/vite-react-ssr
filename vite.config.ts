import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Pages from 'vite-plugin-pages'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), Pages({
      dirs: [{ dir: 'src/pages', baseRoute: '/' }],
      exclude: [
        '**/component(s)?/**/*.(ts|tsx)',
        '**/component(s)?/*.(ts|tsx)',
      ],
      extensions: ['tsx'],
    }), UnoCSS()],
  }
})
