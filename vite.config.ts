import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base: works on GitHub Pages project sites and any free host
  base: './',
  plugins: [react(), tailwindcss()],
})


