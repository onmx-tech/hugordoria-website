import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { Eyebrow, Container } from "./primitives";

// Cada item é um parágrafo do manifesto. `accent` realça a linha em dourado
// (Geist), as demais são corpo de leitura (Arimo). Texto verbatim.
const LINES: Array<{ text: string; accent?: boolean }> = [
  { text: "A excelência não se revela apenas no resultado final. Ela se revela na preparação baseada nos detalhes.", accent: true },
  { text: "Em décadas dedicadas ao estudo, em pesquisas científicas publicadas, em milhares de casos analisados com profundidade e na construção de um discernimento que só o tempo e a experiência são capazes de proporcionar." },
  { text: "Quando entro em uma cirurgia, tudo o que existe ao redor deixa de importar." },
  { text: "O foco passa a ser absoluto.", accent: true },
  { text: "Porque, naquele momento, conhecimento, experiência e capacidade de decisão precisam atuar em perfeita harmonia." },
  { text: "A neurocirurgia exige precisão técnica, mas exige também algo que vai além da técnica: a maturidade para avaliar cenários complexos, fazer escolhas difíceis e assumir a responsabilidade que cada decisão carrega." },
  { text: "Talvez essa seja a maior missão da profissão.", accent: true },
  { text: "Utilizar tudo o que aprendemos ao longo de uma vida para oferecer ao paciente aquilo que ele mais precisa naquele instante: segurança, cuidado e a melhor oportunidade de recuperar sua saúde e seguir em frente." },
  { text: "No fim, cada procedimento representa muito mais do que um ato médico." },
  { text: "Representa a possibilidade de devolver qualidade de vida, preservar histórias, reencontrar projetos interrompidos e permitir que alguém retorne à sua família, à sua rotina e aos seus planos para o futuro." },
  { text: "E por isso, ao final de cada cirurgia, minha gratidão é sempre compartilhada, com o paciente e à sua família, pela confiança depositada em nosso trabalho." },
  { text: "À equipe que caminha ao meu lado diariamente, pela competência, comprometimento e dedicação em cada etapa desse processo." },
  { text: "A neurocirurgia é construída por conhecimento, mas os resultados só são possíveis quando existe confiança.", accent: true },
];

export function ScrollRevealManifesto() {
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
            <Eyebrow>Em primeira pessoa</Eyebrow>
            <span className="font-mono uppercase tracking-[0.18em] text-white/30 text-[12px]">
              Dr. Hugo Doria
            </span>
          </div>

          <div className="flex flex-col gap-10 md:gap-14">
            {LINES.map((l, i) =>
              l.accent ? (
                <p
                  key={i}
                  data-line
                  className="font-display text-gold-600 tracking-[-0.02em] text-[clamp(26px,3.4vw,42px)]"
                  style={{ fontWeight: 500, lineHeight: 1.22 }}
                >
                  {l.text}
                </p>
              ) : (
                <p
                  key={i}
                  data-line
                  className="font-body text-white/85 text-[clamp(19px,2vw,26px)]"
                  style={{ fontWeight: 400, lineHeight: 1.55 }}
                >
                  {l.text}
                </p>
              ),
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
