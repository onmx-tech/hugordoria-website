// Ponte única entre o app e o dataLayer do GTM. Se a mensuração estiver
// desativada (ID placeholder em config.ts), track() é NO-OP total — não
// cria window.dataLayer, não empilha nada, nunca pode quebrar o site.
import { ANALYTICS_ENABLED } from "./config";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Envia um evento para o dataLayer (lido pelo GTM).
 *
 * ⚠️ Nunca passe dado pessoal (nome, telefone, e-mail, texto de mensagem)
 * em `params` — só o nome do evento e metadados de origem/categoria
 * (página, especialidade/condição). Isso é regra de privacidade do pacote
 * de mensuração, não só estilo.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    // Mensuração nunca pode quebrar o site.
  }
}
