import { cards, findCardBySlug, type CardData } from "./data";
import type { Locale } from "../../i18n/config";
import { DEFAULT_LOCALE } from "../../i18n/config";

// Texto localizável de um card. O PT é a base (em data.ts); en/es são overrides
// em cards-i18n/<locale>.ts (mapa por slug). Estrutura (slug, icon, image,
// coords, highlights, testimonials) é invariante e fica só no data.ts.
export type CardText = {
  title: string;
  description: string;
  detailedDescription?: string;
};

const overrides = import.meta.glob<{ CARDS_TEXT: Record<string, CardText> }>(
  ["./cards-i18n/en.ts", "./cards-i18n/es.ts"],
  { eager: true },
);

const textByLocale: Record<string, Record<string, CardText>> = { en: {}, es: {} };
for (const [path, mod] of Object.entries(overrides)) {
  const m = path.match(/\/cards-i18n\/(en|es)\.ts$/);
  if (m && mod.CARDS_TEXT) textByLocale[m[1]] = mod.CARDS_TEXT;
}

function localize(card: CardData, locale: Locale): CardData {
  if (locale === DEFAULT_LOCALE) return card;
  const t = textByLocale[locale]?.[card.slug];
  if (!t) return card; // fallback PT
  return {
    ...card,
    title: t.title,
    description: t.description,
    detailedDescription: t.detailedDescription ?? card.detailedDescription,
  };
}

/** Todos os cards no idioma pedido (ordem preservada; fallback PT por card). */
export function getCards(locale: Locale): CardData[] {
  return cards.map((c) => localize(c, locale));
}

/** Um card por slug no idioma pedido (fallback PT). */
export function getCard(slug: string, locale: Locale): CardData | undefined {
  const c = findCardBySlug(slug);
  return c ? localize(c, locale) : undefined;
}
