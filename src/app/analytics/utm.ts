// Preserva os utm_* da URL de entrada pela duração da sessão (sessionStorage)
// e os injeta nos links de WhatsApp, para o time identificar a origem do
// lead dentro da própria conversa. Nunca quebra o link se não houver UTM.
import { ANALYTICS_ENABLED } from "./config";

const STORAGE_KEY = "doria_utm_params";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

/**
 * Lê a URL atual e, se tiver utm_*, grava na sessão — sobrescrevendo a UTM
 * anterior (a campanha mais recente clicada na sessão manda). Chamar uma
 * vez no boot do app.
 */
export function captureUtmParams(): void {
  if (!ANALYTICS_ENABLED || typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    let hasAny = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        found[key] = value;
        hasAny = true;
      }
    }
    if (hasAny) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage pode falhar (Safari privado, storage cheio) — sem UTM
    // guardada, os links de WhatsApp seguem intactos.
  }
}

export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Anexa a UTM guardada na sessão a uma URL (wa.me, etc.), sem duplicar
 * parâmetros já existentes (ex.: o `?text=` do formulário de contato).
 * Retorna a URL original se não houver UTM guardada ou se algo falhar.
 */
export function appendUtmToUrl(url: string): string {
  const utm = getStoredUtmParams();
  if (Object.keys(utm).length === 0) return url;
  try {
    const parsed = new URL(url);
    for (const [key, value] of Object.entries(utm)) {
      if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}
