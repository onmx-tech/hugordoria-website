// ─────────────────────────────────────────────────────────────────────────
// Consentimento de cookies (LGPD) — Google Consent Mode v2.
//
// O snippet do GTM é injetado no <head> pelo vite.config.ts e dispara no
// carregamento, antes de qualquer decisão do usuário. Bloquear o container
// inteiro quebraria o próprio mecanismo de consentimento do Google; o padrão
// correto é declarar `consent default: denied` ANTES do snippet (feito no
// index.html) e mandar um `consent update` quando o usuário decidir.
//
// Enquanto negado, o GA4 roda em modo sem cookie: não grava identificador,
// não persiste nada no navegador. Só depois do aceite é que vira medição
// com cookie.
//
// `analytics_storage` é o único que este site usa. Não há remarketing, então
// ad_storage / ad_user_data / ad_personalization ficam negados para sempre —
// e é isso que a política de privacidade afirma.
// ─────────────────────────────────────────────────────────────────────────

const KEY = "hd.consent.v1";

export type ConsentChoice = "granted" | "denied";

/** Decisão já registrada, ou null se o usuário ainda não escolheu. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Safari em modo privado bloqueia o localStorage. Sem storage, o banner
    // reaparece a cada visita — chato, mas nunca mede sem consentimento.
    return null;
  }
}

/** Grava a decisão e avisa o GTM na mesma chamada. */
export function writeConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    /* segue sem persistir */
  }
  pushConsentUpdate(choice);
}

/**
 * Empurra o estado para o dataLayer no formato do Consent Mode.
 *
 * ⚠️ O GTM identifica um comando de consentimento pelo objeto `arguments`
 * — array-LIKE, não array. Por isso a função abaixo é `function` clássica e
 * empurra `arguments` cru: um `push(["consent", "update", {...}])` com array
 * de verdade não é reconhecido como comando e o consentimento é ignorado
 * em silêncio.
 */
export function pushConsentUpdate(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    }
    gtag("consent", "update", { analytics_storage: choice });
  } catch {
    // Consentimento nunca pode quebrar o site.
  }
}

/**
 * Reaplica no boot a decisão já tomada em visitas anteriores. O
 * `consent default: denied` do index.html vale para toda carga; sem esta
 * chamada, quem já aceitou seria medido sem cookie para sempre.
 */
export function restoreConsent(): void {
  const saved = readConsent();
  if (saved === "granted") pushConsentUpdate("granted");
}
