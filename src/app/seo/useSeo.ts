import { useEffect } from "react";
import { useLocation } from "react-router";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_H,
  OG_IMAGE_W,
  SITE_NAME,
  absoluteUrl,
} from "./site";
import { useLocale } from "../i18n/LocaleProvider";
import {
  HREFLANG,
  LOCALES,
  OG_LOCALE,
  localizedPath,
  parseLocalePath,
} from "../i18n/config";

export type SeoInput = {
  /** Título da página SEM o sufixo da marca (ele é acrescentado aqui). */
  title: string;
  description?: string;
  /** Path ou URL da imagem de compartilhamento (1200×630). */
  image?: string;
  /** og:type — "website" (default) ou "article" nas especialidades. */
  type?: "website" | "article";
  /** Path canônico; default = rota atual. */
  canonicalPath?: string;
  /** Bloqueia indexação (usado no 404). */
  noindex?: boolean;
  /** Objetos JSON-LD desta página (schema.org). */
  jsonLd?: Record<string, unknown>[];
};

const MARK = "data-seo";

/** Cria/atualiza uma <meta> gerenciada, marcada para limpeza na troca de rota. */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(MARK, "");
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute(MARK, "");
  el.setAttribute("href", href);
}

const ALT_MARK = "data-seo-alt";

/**
 * Reescreve os <link rel="alternate" hreflang> da rota. Remove os antigos
 * (marcados) e recria um por locale + x-default. `basePath` é o path SEM
 * prefixo de idioma; cada alternate aponta para a versão localizada dele.
 */
function setHreflangAlternates(basePath: string) {
  document.head
    .querySelectorAll(`link[${ALT_MARK}]`)
    .forEach((el) => el.remove());

  const add = (hreflang: string, path: string) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", absoluteUrl(path));
    el.setAttribute(ALT_MARK, "");
    document.head.appendChild(el);
  };

  for (const loc of LOCALES) add(HREFLANG[loc], localizedPath(basePath, loc));
  // x-default aponta para o idioma padrão (PT, na raiz).
  add("x-default", localizedPath(basePath, "pt"));
}

const OGLOC_MARK = "data-seo-ogloc";

/** Reescreve os og:locale:alternate (um por idioma diferente do ativo). */
function setOgLocaleAlternates(active: string, alternates: string[]) {
  document.head
    .querySelectorAll(`meta[${OGLOC_MARK}]`)
    .forEach((el) => el.remove());
  for (const loc of alternates) {
    if (loc === active) continue;
    const el = document.createElement("meta");
    el.setAttribute("property", "og:locale:alternate");
    el.setAttribute("content", loc);
    el.setAttribute(OGLOC_MARK, "");
    document.head.appendChild(el);
  }
}

/**
 * Aplica título, descrição, canônico, Open Graph, Twitter Card e JSON-LD da
 * rota atual. O site é uma SPA: sem isso, as 21 rotas compartilham o mesmo
 * <head> do index.html e o Google/WhatsApp leem todas como a mesma página.
 */
export function useSeo(seo: SeoInput) {
  const { pathname } = useLocation();
  const { locale } = useLocale();
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_OG_IMAGE,
    type = "website",
    canonicalPath,
    noindex = false,
    jsonLd,
  } = seo;

  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;
    // Path base (sem prefixo de idioma): do canonicalPath explícito, ou
    // derivado do pathname atual. O canonical/og apontam para a versão
    // localizada dele; os alternates cobrem os 3 idiomas.
    const basePath = canonicalPath ?? parseLocalePath(pathname).basePath;
    const url = absoluteUrl(localizedPath(basePath, locale));
    const imageUrl = absoluteUrl(image);

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setLink("canonical", url);

    // Alternates hreflang — só em páginas indexáveis (não no 404).
    if (!noindex) {
      setHreflangAlternates(basePath);
    } else {
      document.head
        .querySelectorAll(`link[${ALT_MARK}]`)
        .forEach((el) => el.remove());
    }

    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", OG_LOCALE[locale]);
    setOgLocaleAlternates(
      OG_LOCALE[locale],
      LOCALES.map((l) => OG_LOCALE[l]),
    );
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:width", String(OG_IMAGE_W));
    setMeta("property", "og:image:height", String(OG_IMAGE_H));
    setMeta("property", "og:image:alt", fullTitle);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    // JSON-LD da rota — removido no cleanup para não acumular entre navegações.
    const scripts: HTMLScriptElement[] = [];
    if (jsonLd?.length) {
      for (const block of jsonLd) {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute("data-seo-jsonld", "");
        s.textContent = JSON.stringify(block);
        document.head.appendChild(s);
        scripts.push(s);
      }
    }
    return () => scripts.forEach((s) => s.remove());
  }, [
    title,
    description,
    image,
    type,
    canonicalPath,
    noindex,
    pathname,
    locale,
    jsonLdKey,
  ]);
}
