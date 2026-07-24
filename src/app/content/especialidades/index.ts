import type { ArticleContent } from "./types";
import type { Locale } from "../../i18n/config";
import { DEFAULT_LOCALE } from "../../i18n/config";

export type { ArticleContent, ArticleSection } from "./types";

// Carrega TODOS os artigos de todas as línguas de uma vez (eager). Cada arquivo
// content/especialidades/{pt,en,es}/<slug>.ts exporta `article`. Adicionar uma
// tradução = soltar o arquivo na pasta do idioma; o registro se monta sozinho,
// sem tocar aqui (zero colisão entre agentes de tradução).
const modules = import.meta.glob<{ article: ArticleContent }>(
  ["./pt/*.ts", "./en/*.ts", "./es/*.ts"],
  { eager: true },
);

// registry[locale][slug] = ArticleContent
const registry: Record<string, Record<string, ArticleContent>> = {
  pt: {},
  en: {},
  es: {},
};

for (const [path, mod] of Object.entries(modules)) {
  // path: "./pt/aneurisma-cerebral.ts"
  const m = path.match(/\.\/(pt|en|es)\/(.+)\.ts$/);
  if (!m) continue;
  const [, locale, slug] = m;
  if (mod.article) registry[locale][slug] = mod.article;
}

/**
 * Artigo de uma especialidade no idioma pedido, com fallback para o PT quando
 * a tradução ainda não existe (garante que a página nunca fica vazia).
 */
export function getArticle(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): ArticleContent | undefined {
  return registry[locale]?.[slug] ?? registry[DEFAULT_LOCALE]?.[slug];
}

/** Compat: assinatura antiga (sempre PT). Prefira getArticle(slug, locale). */
export function findArticleBySlug(slug: string): ArticleContent | undefined {
  return registry[DEFAULT_LOCALE]?.[slug];
}

/** Slugs que têm artigo (fonte = PT). */
export function articleSlugs(): string[] {
  return Object.keys(registry[DEFAULT_LOCALE]);
}
