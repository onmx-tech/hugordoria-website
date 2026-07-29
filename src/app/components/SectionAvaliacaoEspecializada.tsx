import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { isPrerender } from "../../lib/prerender";
import { useLocale } from "../i18n/LocaleProvider";
import CONTEUDO from "../content/faq/avaliacao-especializada.json";

type Bloco = { rotulo: string; texto: string };
type Conteudo = {
  eyebrow: string;
  titulo: string;
  lead: string;
  blocos: Bloco[];
  nota?: string;
};

/**
 * §10.3 do briefing do cliente — "Por que procurar avaliação especializada".
 *
 * É a seção que sustenta o posicionamento: explica diagnóstico, decisão
 * terapêutica, revisão de exames e individualização de risco. O site inteiro
 * fala do QUE se trata; faltava o PORQUÊ de procurar alguém para isso.
 *
 * A nota final não é rodapé decorativo: é ela que impede a leitura promocional
 * do bloco inteiro. Só sai se o Dr. Hugo pedir.
 */
export default function SectionAvaliacaoEspecializada() {
  const { locale } = useLocale();
  const ref = useRef<HTMLElement | null>(null);
  const c = (CONTEUDO as Record<string, Conteudo>)[locale] ?? (CONTEUDO as Record<string, Conteudo>).pt;

  useEffect(() => {
    if (isPrerender()) return;
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 82%" },
        },
      );
    }, root);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [locale]);

  return (
    <section ref={ref} className="w-full bg-cream py-20 md:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="flex flex-col gap-4">
            <span
              data-reveal
              className="font-['Geist_Mono',ui-monospace,monospace] text-[11px] uppercase tracking-[0.14em] text-navy/45"
            >
              {c.eyebrow}
            </span>
            <h2
              data-reveal
              className="max-w-[16ch] font-['Arimo',sans-serif] font-normal leading-[1.14] tracking-[-0.02em] text-navy"
              style={{ fontSize: "clamp(28px, 3.2vw, 44px)" }}
            >
              {c.titulo}
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-[46ch] font-['Arimo',sans-serif] font-normal leading-[1.5] text-navy/70"
            style={{ fontSize: "clamp(15px, 1.15vw, 18px)" }}
          >
            {c.lead}
          </p>
        </div>

        <div data-reveal className="mt-12 h-px w-full bg-navy/[0.14] md:mt-16" />

        {/* Quatro eixos. Numerados porque são etapas de um raciocínio, não uma
            lista de serviços — a ordem é a do briefing e ela conta uma história:
            entender o achado, entender as condutas, revisar o que já existe,
            e só então pesar risco contra benefício. */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {c.blocos.map((b, i) => (
            <div key={b.rotulo} data-reveal className="flex flex-col gap-4 border-t border-navy/[0.14] pt-7 lg:border-t-0 lg:pt-10">
              <span className="font-['Geist_Mono',ui-monospace,monospace] text-[11px] tracking-[0.14em] text-gold-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-['Arimo',sans-serif] font-normal leading-[1.25] tracking-[-0.01em] text-navy"
                style={{ fontSize: "clamp(19px, 1.5vw, 23px)" }}
              >
                {b.rotulo}
              </h3>
              <p
                className="font-['Arimo',sans-serif] font-normal text-navy/65"
                style={{ fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: 1.62 }}
              >
                {b.texto}
              </p>
            </div>
          ))}
        </div>

        {c.nota && (
          <p
            data-reveal
            className="mt-14 max-w-[68ch] border-l-2 border-gold-700/40 pl-5 font-['Arimo',sans-serif] text-[14px] leading-[1.6] text-navy/55 md:mt-16"
          >
            {c.nota}
          </p>
        )}
      </div>
    </section>
  );
}
