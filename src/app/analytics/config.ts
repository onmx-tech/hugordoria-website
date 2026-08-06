// ─────────────────────────────────────────────────────────────────────────
// Mensuração (GA4 via Google Tag Manager) — configuração central.
//
// Estes são os DOIS ÚNICOS valores a trocar quando o container/propriedade
// existirem de verdade. Nenhum outro arquivo do projeto guarda esses IDs.
//
//   1. GTM_CONTAINER_ID — o contêiner do Google Tag Manager (GTM-XXXXXXX).
//      É injetado no <head>/<body> do index.html via vite.config.ts
//      (marcadores %GTM_HEAD% / %GTM_BODY%, mesmo padrão do %SITE_URL%).
//
//   2. GA4_MEASUREMENT_ID — a propriedade GA4 (G-XXXXXXXXXX). O código não
//      "usa" esse ID para nada além de empurrá-lo pro dataLayer logo no
//      boot (`ga4MeasurementId`) — quem monta a tag de Configuração GA4
//      dentro do GTM lê esse valor de lá em vez de digitar o ID nas duas
//      pontas. Troca aqui, sem reabrir o contêiner no GTM.
//
// Enquanto os dois valores abaixo forem os placeholders, TODA a mensuração
// (snippet GTM no HTML, dataLayer, listener de wa.me, pageview de rota)
// vira NO-OP silencioso — nada é injetado, nada é escutado, nada aparece
// no console. Isso é decidido por ANALYTICS_ENABLED, uma única vez.
// ─────────────────────────────────────────────────────────────────────────

export const GTM_CONTAINER_ID = "GTM-XXXXXXX";
export const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";

function isPlaceholder(id: string): boolean {
  return id === "GTM-XXXXXXX" || id === "G-XXXXXXXXXX" || /X{4,}/.test(id);
}

/** true assim que GTM_CONTAINER_ID deixar de ser o placeholder acima. */
export const ANALYTICS_ENABLED = !isPlaceholder(GTM_CONTAINER_ID);

// ── Microsoft Clarity ────────────────────────────────────────────────────
// Mapa de calor, gravação de sessão e "clique morto" (onde a pessoa clica e
// nada acontece). Foi a recomendação levada à reunião de 06/08 como
// alternativa gratuita ao Hotjar. Basta trocar o ID pelo do projeto.
//
// ⚠️ Clarity GRAVA SESSÃO — é dado pessoal, e num site de paciente isso pesa
// mais do que em qualquer outro. Por isso ele entra pelo MESMO portão do GA4:
// só carrega quando o aviso de cookies existir e o visitante tiver aceitado.
// Não injetar por fora desse caminho.
export const CLARITY_PROJECT_ID = "";

/** true quando o projeto do Clarity foi preenchido E a medição está ligada. */
export const CLARITY_ENABLED = ANALYTICS_ENABLED && CLARITY_PROJECT_ID.length > 0;
