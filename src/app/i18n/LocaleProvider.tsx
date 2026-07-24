import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { Link, Outlet, useLocation, type LinkProps } from "react-router";
import { useTranslation } from "react-i18next";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  localizedPath,
  parseLocalePath,
  type Locale,
} from "./config";

type LocaleContextValue = {
  /** Locale ativo desta subárvore de rotas. */
  locale: Locale;
  /** Path atual SEM o prefixo de idioma (ex.: "/especialidades"). */
  basePath: string;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  basePath: "/",
});

/** Locale ativo + path base da rota atual. */
export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

/**
 * Layout de rota que fixa o locale de toda a subárvore. Renderizado uma vez por
 * grupo de idioma no roteador (raiz=pt, /en, /es). Seta i18next, <html lang> e
 * expõe o locale via contexto. Não desenha UI — só orquestra e faz <Outlet/>.
 */
export function LocaleLayout({ locale }: { locale: Locale }) {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const { basePath } = parseLocalePath(pathname);

  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale, i18n]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, basePath }),
    [locale, basePath],
  );

  return (
    <LocaleContext.Provider value={value}>
      <Outlet />
    </LocaleContext.Provider>
  );
}

/**
 * <Link> ciente de idioma. Recebe um path BASE em PT ("/especialidades") e o
 * prefixa com o locale ativo, mantendo o usuário no mesmo idioma ao navegar.
 * Âncoras (#...) e URLs externas passam intactas.
 */
export function LocaleLink({ to, ...rest }: LinkProps) {
  const { locale } = useLocale();
  const target =
    typeof to === "string" && to.startsWith("/")
      ? localizedPath(to, locale)
      : to;
  return <Link to={target} {...rest} />;
}

/** Helper imperativo para montar um path localizado no locale ativo. */
export function useLocalizedPath(): (basePath: string) => string {
  const { locale } = useLocale();
  return (basePath: string) => localizedPath(basePath, locale);
}

export function LocaleProviderRaw({
  locale,
  basePath,
  children,
}: {
  locale: Locale;
  basePath: string;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, basePath }), [locale, basePath]);
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
