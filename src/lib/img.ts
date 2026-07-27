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
const WIDTHS = [480, 960];
const SOURCE_RE = /\.(jpe?g|png)$/i;

export function responsiveImg(src: string, sizes?: string) {
  if (!src.startsWith("/v4/") || !SOURCE_RE.test(src)) return { src };
  const base = src.replace(SOURCE_RE, "");
  return {
    src: `${base}-${WIDTHS[WIDTHS.length - 1]}.webp`,
    srcSet: WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", "),
    ...(sizes ? { sizes } : {}),
  };
}
