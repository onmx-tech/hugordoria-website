import { useEffect, useRef, useState } from "react";
import svgPaths from "../../imports/svg-nx92b0rij3";
import { gsap } from "../../lib/gsap";

// Depoimentos reais de pacientes — excertos das avaliações verificadas no
// Doctoralia (perfil do Dr. Hugo Doria-Netto), levemente encurtados.
type Testimonial = { quote: string; name: string; role: string; photo?: string | null };
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Com muita competência, atenção e sensibilidade, conduziu minha cirurgia de forma impecável, sempre me transmitindo segurança, calma e confiança desde o primeiro contato.",
    name: "Rita Cássia Nogueira",
    role: "Paciente — Cirurgia de Aneurisma",
  },
  {
    quote:
      "Não há palavras que possam expressar minha sincera gratidão e admiração pelo Dr. Hugo! É evidente a capacidade dele como profissional. Mas é a forma como trata os pacientes, com respeito e dedicação, que o transforma em um ser humano único.",
    name: "Marjouri Garcia",
    role: "Paciente — Tumores Cerebrais",
  },
  {
    quote:
      "Excelente profissional. Atendimento humanizado, muito empático. Dr. Hugo e sua equipe salvaram minha vida. A cirurgia foi um sucesso e me recupero muito bem.",
    name: "Rita de Cássia de Jesus Silva",
    role: "Paciente — Schwannoma",
  },
  {
    quote:
      "Dr. Hugo demonstra muito domínio técnico e conhecimento científico em sua área de atuação; mas possui um diferencial: respeitar os momentos humanos que passamos como pacientes de cirurgias tão delicadas.",
    name: "Rebecca F. A. Silva",
    role: "Paciente — Meningioma",
  },
  {
    quote:
      "Eu só tenho a agradecer a Deus, ao meu anjo da guarda Dr. Hugo Doria e toda equipe médica, que esteve ao meu lado durante todo o período que estive hospitalizada. Eterna gratidão!",
    name: "Maria José da Silva Barbosa",
    role: "Paciente — Cirurgia de Aneurisma",
  },
  {
    quote:
      "Neurocirurgião com expertise de nível internacional. Médico de altíssimo conhecimento científico e alma iluminada.",
    name: "Reginaldo Queiroz",
    role: "Paciente",
  },
  {
    quote:
      "Desde a primeira consulta me passou total confiança, foi muito atencioso e prestativo. Faz 5 anos que fiz a cirurgia e estou totalmente curada.",
    name: "Marli de Fátima Pereira Viana",
    role: "Paciente — Cirurgia de Aneurisma",
  },
  {
    quote:
      "Dr. Hugo e sua equipe, com a graça de Deus, conseguiram me livrar dessa angústia — hoje estou curado e minha gratidão é eterna!",
    name: "James Cássio de Miranda",
    role: "Paciente — Cirurgia de Aneurisma",
  },
  {
    quote:
      "Ótimo profissional, muito atencioso antes, durante e após o procedimento. Tratamento super eficaz! Sou grato por tudo!",
    name: "Renato Santos",
    role: "Paciente",
  },
  {
    quote:
      "Na minha primeira consulta fui muito bem recebida, com muita atenção e carinho. Me senti totalmente segura e confiante. Minha recuperação tem sido rápida e tranquila graças à atenção e profissionalismo do Dr. Hugo e toda sua equipe.",
    name: "Ana Maria Rosini",
    role: "Paciente — Meningioma",
  },
];

const CARDS_PER_PAGE = 2;

function QuoteIcon() {
  return (
    <svg
      className="w-[40px] h-[34px] md:w-[55px] md:h-[47px]"
      viewBox="0 0 55 47"
      fill="none"
    >
      <path d={svgPaths.p3f3a4c80} fill="var(--color-accent-gold-light)" />
    </svg>
  );
}

function ArrowIcon({ flipped }: { flipped?: boolean }) {
  return (
    <span
      className="inline-flex text-navy/60 text-2xl leading-none tracking-[-0.04em]"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
    >
      →
    </span>
  );
}

export default function SectionCasosDeSucesso() {
  const [page, setPage] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const items = TESTIMONIALS.slice(0, 10); // home: no máximo 10
  const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const visibleCards = items.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-reveal]");
      gsap.set(items, { y: 40, autoAlpha: 0 });
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "top 25%",
          scrub: 0.6,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-card]");
    gsap.fromTo(
      cards,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" },
    );
  }, [page]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "var(--color-bg-cream)",
      }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-28">
        {/* Header */}
        <div
          data-reveal
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8 mb-12 md:mb-16"
        >
          <h2
            className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
          >
            Casos de Sucesso
          </h2>
          <p
            className="font-['Arimo',sans-serif] font-normal text-navy/70 leading-[1.13] max-w-[380px]"
            style={{ fontSize: "clamp(16px, 1.2vw, 20px)" }}
          >
            Veja como transformamos vidas com nossos tratamentos inovadores e
            especializados em neurocirurgia.
          </p>
        </div>

        {/* Divider */}
        <div
          data-reveal
          className="w-full h-px bg-navy/[0.24] mb-10 md:mb-14"
        />

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {visibleCards.map((t, i) => (
            <article
              key={`${page}-${i}`}
              data-card
              className="group relative flex flex-col justify-between rounded-2xl border border-navy/[0.08] bg-white p-8 md:p-10 lg:p-12 transition-all duration-400 hover:border-gold-light/30 hover:shadow-[0_8px_40px_-12px_rgba(26,41,63,0.08)]"
            >
              <div className="flex flex-col gap-6 md:gap-8">
                <QuoteIcon />
                <p
                  className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(18px, 2vw, 32px)" }}
                >
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8 md:mt-10 pt-6 border-t border-navy/[0.08]">
                {t.photo ? (
                  <img
                    src={t.photo}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-navy/[0.06] flex items-center justify-center">
                    <span className="font-['Geist',sans-serif] font-medium text-navy/40 text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span
                    className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.3]"
                    style={{ fontSize: "clamp(14px, 1vw, 18px)" }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="font-['Arimo',sans-serif] font-normal text-navy/40 leading-[1.3]"
                    style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div
          data-reveal
          className="flex items-center justify-between mt-10 md:mt-14"
        >
          <span
            className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
            style={{ fontSize: "clamp(18px, 1.4vw, 24px)" }}
          >
            {String(page + 1).padStart(2, "0")} —{" "}
            {String(totalPages).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => canPrev && setPage((p) => p - 1)}
              disabled={!canPrev}
              className="inline-flex items-center gap-3 rounded-full border border-navy px-5 py-3 font-['Arimo',sans-serif] font-normal text-navy transition-opacity duration-200 disabled:opacity-30"
              style={{ fontSize: "clamp(16px, 1.2vw, 24px)" }}
            >
              <ArrowIcon flipped />
              Voltar
            </button>
            <button
              type="button"
              onClick={() => canNext && setPage((p) => p + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-3 rounded-full border border-navy px-5 py-3 font-['Arimo',sans-serif] font-normal text-navy transition-opacity duration-200 disabled:opacity-30"
              style={{ fontSize: "clamp(16px, 1.2vw, 24px)" }}
            >
              Próximo
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
