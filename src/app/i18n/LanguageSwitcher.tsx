import { useNavigate } from "react-router";
import { useLocale } from "./LocaleProvider";
import { LOCALES, LOCALE_LABEL, localizedPath, type Locale } from "./config";

const PREF_KEY = "hd:locale";

/**
 * Seletor de idioma PT · EN · ES. Troca navega para a MESMA página no outro
 * idioma (preserva o basePath). Guarda a preferência em localStorage só como
 * conveniência — a raiz nunca é redirecionada automaticamente (decisão de SEO).
 *
 * `variant`:
 *  - "header": linha inline discreta, para o header sobre o navy.
 *  - "overlay": versão maior para o menu mobile.
 */
export function LanguageSwitcher({
  variant = "header",
  onSelect,
}: {
  variant?: "header" | "overlay";
  onSelect?: () => void;
}) {
  const { locale, basePath } = useLocale();
  const navigate = useNavigate();

  const choose = (l: Locale) => {
    if (l !== locale) {
      try {
        localStorage.setItem(PREF_KEY, l);
      } catch {
        /* ignora storage bloqueado */
      }
      navigate(localizedPath(basePath, l));
    }
    onSelect?.();
  };

  if (variant === "overlay") {
    return (
      <div
        className="flex items-center gap-3 font-mono text-[15px] tracking-[0.08em]"
        role="group"
        aria-label="Idioma"
      >
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => choose(l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? "text-gold-600"
                : "text-cream/50 transition-colors hover:text-cream"
            }
          >
            {LOCALE_LABEL[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 font-mono text-[12px] tracking-[0.1em]"
      role="group"
      aria-label="Idioma"
    >
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span className="text-cream/25" aria-hidden>·</span>}
          <button
            type="button"
            onClick={() => choose(l)}
            aria-current={l === locale ? "true" : undefined}
            className={
              l === locale
                ? "text-gold-600"
                : "text-cream/60 transition-colors hover:text-gold-600"
            }
          >
            {LOCALE_LABEL[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
