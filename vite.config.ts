import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {
  ANALYTICS_ENABLED,
  GTM_CONTAINER_ID,
  GA4_MEASUREMENT_ID,
} from './src/app/analytics/config'

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
    {
      name: 'inject-gtm',
      // Snippet oficial do Google Tag Manager. IDs vêm de
      // src/app/analytics/config.ts — único lugar a trocar. Enquanto forem
      // o placeholder, os marcadores viram comentário/string vazia: nada de
      // script, requisição ou ruído no console antes do container existir.
      transformIndexHtml: (html: string) => {
        // Consent Mode v2 — TEM que vir ANTES do snippet do GTM, senão o
        // container carrega com o padrão do Google (concedido) e grava cookie
        // antes de o usuário decidir. Com `denied`, o GA4 roda sem cookie até
        // o aceite; o `update` sai de src/app/analytics/consent.ts.
        // ad_* ficam negados em caráter permanente: o site não faz remarketing,
        // e é isso que a política de privacidade afirma ao paciente.
        const consentDefault = ANALYTICS_ENABLED
          ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});</script>`
          : ''
        const headSnippet = ANALYTICS_ENABLED
          ? `${consentDefault}<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({ga4MeasurementId:"${GA4_MEASUREMENT_ID}"});(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');</script>`
          : `<!-- GTM desativado: troque GTM_CONTAINER_ID em src/app/analytics/config.ts -->`
        const bodySnippet = ANALYTICS_ENABLED
          ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
          : ''
        return html
          .replaceAll('%GTM_HEAD%', headSnippet)
          .replaceAll('%GTM_BODY%', bodySnippet)
      },
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
