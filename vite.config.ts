import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Domínio canônico vem de site.config.json — fonte única. O index.html usa o
// marcador %SITE_URL% (canonical, og:url, og:image, JSON-LD) e recebe o valor
// na build, para não haver duas verdades sobre o endereço do site.
const { siteUrl } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './site.config.json'), 'utf8'),
)

export default defineConfig({
  plugins: [
    {
      name: 'inject-site-url',
      transformIndexHtml: (html: string) =>
        html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, '')),
    },
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
