import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { Eyebrow, Container } from "./primitives";
import { isPrerender } from "../../../lib/prerender";

// O texto do manifesto vive no i18n (sub.manifesto.lines). Aqui ficam apenas os
// flags de destaque, na MESMA ordem das linhas: `true` = linha realçada em
// dourado (Geist); `false` = corpo de leitura (Arimo).
const ACCENTS: boolean[] = [
  true, false, false, true, false, false, true, false, false, false, false, false, true,
];

export function ScrollRevealManifesto() {
  const { t } = useTranslation("sub");
  const lines = t("sub.manifesto.lines", { returnObjects: true }) as string[];
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Snapshot de pré-render captura o DOM estático (sem pin-spacers/canvas).
    if (isPrerender()) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          // A linha começa a acender ANTES de entrar na tela (start em 110%) e
          // termina de acender logo que sobe um pouco (86%) — ou seja, quando
          // ela chega à altura de leitura já está inteira. Antes só completava
          // com a linha no meio da tela, e no celular isso deixava um bloco
          // escuro e vazio por quase uma tela. Piso de 0.35: nunca some.
          { opacity: 0.35, y: 18 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 110%",
              end: "top 86%",
              scrub: 0.35,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-navy-800 py-16 md:py-28">
      <Container>
        <div className="mx-auto max-w-[860px]">
          <div className="mb-14 flex flex-col items-start gap-5 md:mb-20">
            <Eyebrow>{t("sub.manifesto.eyebrow")}</Eyebrow>
            <span className="font-mono uppercase tracking-[0.18em] text-white/30 text-[12px]">
              Dr. Hugo Doria
            </span>
          </div>

          <div className="flex flex-col gap-10 md:gap-14">
            {lines.map((text, i) =>
              ACCENTS[i] ? (
                <p
                  key={i}
                  data-line
                  className="font-display text-gold-600 tracking-[-0.02em] text-[clamp(26px,3.4vw,42px)]"
                  style={{ fontWeight: 500, lineHeight: 1.22 }}
                >
                  {text}
                </p>
              ) : (
                <p
                  key={i}
                  data-line
                  className="font-body text-white/85 text-[clamp(19px,2vw,26px)]"
                  style={{ fontWeight: 400, lineHeight: 1.55 }}
                >
                  {text}
                </p>
              ),
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
