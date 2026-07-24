import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { Eyebrow, Container } from "./primitives";

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
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.14, y: 26 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 48%",
              scrub: 0.5,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-navy-800 py-28 md:py-44">
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
