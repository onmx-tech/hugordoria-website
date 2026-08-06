import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LocaleLink as Link } from "../i18n/LocaleProvider";
import { isPrerender } from "../../lib/prerender";
import { readConsent, writeConsent, restoreConsent } from "../analytics/consent";
import { ANALYTICS_ENABLED } from "../analytics/config";

/**
 * Aviso de cookies (LGPD).
 *
 * Regras que valeram as decisões daqui:
 * - **Recusar tem o mesmo peso de aceitar.** A ANPD entende que a recusa não
 *   pode ser mais difícil que o consentimento, então os dois são botões
 *   irmãos — nada de "aceitar" em ouro e "recusar" como link cinza.
 * - **Não aparece se não há o que consentir.** Enquanto o GTM estiver com ID
 *   placeholder (`ANALYTICS_ENABLED === false`), nenhum cookie é gravado e
 *   pedir consentimento seria teatro.
 * - **Fica fora do snapshot do prerender.** Se entrasse no HTML pré-renderizado,
 *   apareceria para quem já decidiu e sumiria no hydrate — flash feio. Por isso
 *   o estado inicial é `false` e a decisão só é lida depois da montagem.
 * - **`position: fixed` de propósito:** não empurra layout, então não gera CLS.
 *   O site marca 0,012 e a home é pré-renderizada; um banner no fluxo derrubaria
 *   a métrica que custou caro.
 */
export default function CookieConsent() {
  const { t } = useTranslation("common");
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (isPrerender() || !ANALYTICS_ENABLED) return;
    const decidido = readConsent();
    if (decidido) restoreConsent();
    else setVisivel(true);
  }, []);

  if (!visivel) return null;

  const decidir = (escolha: "granted" | "denied") => {
    writeConsent(escolha);
    setVisivel(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("cookies.aria")}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/12 bg-navy-900/97 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8">
        <p className="max-w-[68ch] font-body text-[14px] leading-relaxed text-white/70">
          {t("cookies.texto")}{" "}
          <Link
            to="/privacidade"
            className="text-gold-600 underline underline-offset-4 transition-colors hover:text-gold-500"
          >
            {t("cookies.politica")}
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decidir("denied")}
            className="border border-white/25 px-5 py-2.5 font-display text-[14px] text-white/85 transition-colors hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
          >
            {t("cookies.recusar")}
          </button>
          <button
            type="button"
            onClick={() => decidir("granted")}
            className="border border-gold-600 bg-gold-600 px-5 py-2.5 font-display text-[14px] text-black transition-colors hover:bg-gold-500 hover:border-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
          >
            {t("cookies.aceitar")}
          </button>
        </div>
      </div>
    </div>
  );
}
