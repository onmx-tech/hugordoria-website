/**
 * Aponta um asset de `public/v4` para os derivados WebP responsivos gerados
 * por `scripts/optimize-images.mjs` (roda no prebuild).
 *
 * Motivo: os originais são JPG/PNG de 200-500KB exibidos em cartões de ~300px.
 * No HTML pré-renderizado o preload scanner dispara TODOS de uma vez e afoga o
 * LCP do hero. WebP responsivo derruba cada um para ~20-60KB.
 *
 * Uso: <img {...responsiveImg(src, "(max-width:1024px) 100vw, 600px")} />
 */
import dimensoes from "./img-dimensions.json";

const WIDTHS = [480, 960];
const SOURCE_RE = /\.(jpe?g|png)$/i;

const MAPA = dimensoes as Record<string, [number, number]>;

export function responsiveImg(src: string, sizes?: string) {
  if (!src.startsWith("/v4/") || !SOURCE_RE.test(src)) return { src };
  const base = src.replace(SOURCE_RE, "");
  // width/height são a PROPORÇÃO intrínseca, não o tamanho de exibição: o CSS
  // continua mandando no tamanho final, e o navegador usa a razão entre os dois
  // para reservar a altura certa antes do download. É o que impede o salto de
  // layout das imagens lazy (CLS). O mapa vem do prebuild — asset novo entra
  // sozinho, e um asset sem medida apenas volta ao comportamento antigo.
  const medida = MAPA[src];
  return {
    src: `${base}-${WIDTHS[WIDTHS.length - 1]}.webp`,
    srcSet: WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", "),
    ...(sizes ? { sizes } : {}),
    ...(medida ? { width: medida[0], height: medida[1] } : {}),
  };
}
