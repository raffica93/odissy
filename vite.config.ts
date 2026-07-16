import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

/** SPA fallback on GitHub Pages: serve index.html for unknown paths */
function spaFallback() {
  return {
    name: 'spa-github-pages-fallback',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  // Absolute base for clean SEO routes on dovevedereodissea.it
  base: '/',
  plugins: [react(), tailwindcss(), spaFallback()],
})
