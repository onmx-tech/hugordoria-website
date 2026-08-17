// Loader do conteúdo institucional TRADUZÍVEL. Cada arquivo {pt,en,es}.ts
// exporta os 6 objetos traduzíveis (SOBRE_MIM, DOUTORADO, PUBLICACOES,
// EVENTOS, MIDIA_VIDEOS, SEGUNDA_OPINIAO). Import estático dos 3 — o conjunto
// é pequeno e fixo. Fallback PT campo a campo garante que a página nunca fica
// vazia se uma tradução ainda não existir.
//
// ⚠️ Os INVARIANTES (CONTATO, SOCIAL) NÃO moram aqui —
// ficam no barrel content/institucional.ts, que também reexporta getInstitucional.

import type { Locale } from "../../i18n/config";
import { DEFAULT_LOCALE } from "../../i18n/config";
import * as pt from "./pt";
import * as en from "./en";
import * as es from "./es";

type InstitucionalBundle = {
  SOBRE_MIM: typeof pt.SOBRE_MIM;
  DOUTORADO: typeof pt.DOUTORADO;
  PUBLICACOES: typeof pt.PUBLICACOES;
  EVENTOS: typeof pt.EVENTOS;
  MIDIA_VIDEOS: typeof pt.MIDIA_VIDEOS;
  SEGUNDA_OPINIAO: typeof pt.SEGUNDA_OPINIAO;
};

const registry: Record<Locale, Partial<InstitucionalBundle>> = { pt, en, es };

/**
 * Conteúdo institucional traduzível no idioma pedido, com fallback PT campo a
 * campo (cada um dos 6 objetos cai no PT quando o idioma não o traz).
 */
export function getInstitucional(
  locale: Locale = DEFAULT_LOCALE,
): InstitucionalBundle {
  const loc = registry[locale] ?? {};
  return {
    SOBRE_MIM: loc.SOBRE_MIM ?? pt.SOBRE_MIM,
    DOUTORADO: loc.DOUTORADO ?? pt.DOUTORADO,
    PUBLICACOES: loc.PUBLICACOES ?? pt.PUBLICACOES,
    EVENTOS: loc.EVENTOS ?? pt.EVENTOS,
    MIDIA_VIDEOS: loc.MIDIA_VIDEOS ?? pt.MIDIA_VIDEOS,
    SEGUNDA_OPINIAO: loc.SEGUNDA_OPINIAO ?? pt.SEGUNDA_OPINIAO,
  };
}
