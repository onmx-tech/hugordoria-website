// Fundação de idiomas do site. Fonte única de quais locales existem, qual é o
// default e como cada um se traduz para <html lang>, og:locale e prefixo de URL.
// Estratégia de URL: PT na raiz (sem prefixo), EN/ES com prefixo (/en, /es).

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

/** Locales que ganham prefixo de URL (todos menos o default). */
export const PREFIXED_LOCALES = LOCALES.filter(
  (l) => l !== DEFAULT_LOCALE,
) as Exclude<Locale, typeof DEFAULT_LOCALE>[];

/** Valor de <html lang> por locale (BCP 47). */
export const HTML_LANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

/** og:locale por locale (formato Facebook). */
export const OG_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

/** hreflang por locale (o que vai no <link rel="alternate">). */
export const HREFLANG: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

/** Rótulo curto do seletor de idioma. */
export const LOCALE_LABEL: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/** Prefixo de path do locale ("" para o default, "/en" e "/es" nos demais). */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/**
 * Extrai o locale de um pathname e devolve o path SEM o prefixo.
 * "/en/especialidades" -> { locale: "en", basePath: "/especialidades" }
 * "/especialidades"    -> { locale: "pt", basePath: "/especialidades" }
 */
export function parseLocalePath(pathname: string): {
  locale: Locale;
  basePath: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    const basePath = "/" + segments.slice(1).join("/");
    return { locale: first, basePath: basePath === "/" ? "/" : basePath };
  }
  return { locale: DEFAULT_LOCALE, basePath: pathname || "/" };
}

/**
 * Constrói o path localizado de um path base ("/especialidades", "/").
 * Usado por links, canonical, hreflang e pelo seletor de idioma.
 */
export function localizedPath(basePath: string, locale: Locale): string {
  const clean = basePath.startsWith("/") ? basePath : `/${basePath}`;
  const prefix = localePrefix(locale);
  if (clean === "/") return prefix || "/";
  return `${prefix}${clean}`;
}

// Carrega TODOS os namespaces de todos os idiomas via glob. Cada arquivo
// locales/<locale>/<ns>.json vira o namespace <ns> daquele idioma. Adicionar
// um namespace (ex.: home.json, sub.json) = soltar o arquivo; nada aqui muda
// (agentes de tradução não colidem neste arquivo compartilhado).
const jsonModules = import.meta.glob<Record<string, unknown>>(
  "./locales/*/*.json",
  { eager: true, import: "default" },
);

const resources: Record<string, Record<string, Record<string, unknown>>> = {
  pt: {},
  en: {},
  es: {},
};

for (const [path, data] of Object.entries(jsonModules)) {
  const m = path.match(/\.\/locales\/(pt|en|es)\/(.+)\.json$/);
  if (!m) continue;
  const [, locale, ns] = m;
  resources[locale][ns] = data;
}

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: "common",
  // Namespaces existentes hoje; novos entram pelo glob sem listar aqui.
  ns: ["common"],
  interpolation: { escapeValue: false }, // React já escapa
  returnNull: false,
  // Sem Suspense: os recursos já vêm eager (glob), então useTranslation deve
  // resolver síncrono no primeiro render. Com Suspense ligado (padrão), um
  // primeiro render antes da init concluir renderiza o fallback (null) e quebra
  // a hidratação do HTML pré-renderizado (mismatch de Suspense → React #418).
  react: { useSuspense: false },
});

export default i18n;
