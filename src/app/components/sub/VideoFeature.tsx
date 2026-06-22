import { useState } from "react";
import { Play } from "lucide-react";
import { Eyebrow, SectionHeading, Container } from "./primitives";

/**
 * Bloco de vídeo cinematográfico (16:9) para as subpáginas.
 * Hoje sem URL real: ao clicar no play mostra um placeholder elegante. Quando
 * houver o vídeo, basta passar `src` (YouTube/Vimeo embed) — o iframe entra no
 * lugar do poster. Mantém o padrão navy + gold + Geist/Arimo da home.
 */
export function VideoFeature({
  eyebrow,
  title,
  poster,
  caption,
  src,
}: {
  eyebrow?: string;
  title?: string;
  poster?: string;
  caption?: string;
  src?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-navy-600 py-20 md:py-28">
      <Container>
        {(eyebrow || title) && (
          <div className="mb-10 flex flex-col gap-5 md:mb-14">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <SectionHeading tone="light" className="max-w-[760px]">
                {title}
              </SectionHeading>
            )}
          </div>
        )}

        <figure className="m-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-[24px] bg-navy-800 ring-1 ring-white/15">
            {playing && src ? (
              src.endsWith(".mp4") || src.startsWith("/") ? (
                <video
                  src={src}
                  poster={poster}
                  title={title ?? "Vídeo"}
                  className="absolute inset-0 size-full bg-black object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <iframe
                  src={src}
                  title={title ?? "Vídeo"}
                  className="absolute inset-0 size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <>
                {/* poster */}
                {poster ? (
                  <img src={poster} alt="" aria-hidden className="absolute inset-0 size-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-navy-900/30" />

                {/* play / estado */}
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Reproduzir vídeo"
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-5"
                >
                  <span className="flex size-[84px] items-center justify-center rounded-full bg-gold-600 transition-transform duration-300 group-hover:scale-105">
                    <Play className="size-8 translate-x-0.5 text-navy-900" strokeWidth={2} fill="currentColor" />
                  </span>
                  {playing && !src && (
                    <span className="font-mono uppercase tracking-[0.2em] text-cream text-[12px]">Vídeo em breve</span>
                  )}
                </button>

                {/* aviso de "em breve" depois do clique sem src */}
                {playing && !src && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-900/80">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <span className="font-mono uppercase tracking-[0.22em] text-gold-600 text-[12px]">Em breve</span>
                      <span className="font-display text-white text-[20px]" style={{ fontWeight: 500 }}>Vídeo em produção</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {caption && (
            <figcaption className="mt-5 font-mono uppercase tracking-[0.16em] text-mist text-[12px]">
              {caption}
            </figcaption>
          )}
        </figure>
      </Container>
    </section>
  );
}
