import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

type Card = {
  title: string;
  description: string;
};

const cards: Card[] = [
  {
    title: "Aneurisma Cerebral",
    description:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias cerebrais que exigem tratamento especializado.",
  },
  {
    title: "Malformações Arteriovenosas",
    description:
      "As MAVs são conexões anormais entre artérias e veias cerebrais, tratadas com técnicas microcirúrgicas avançadas.",
  },
  {
    title: "Tumores Cerebrais",
    description:
      "Remoção de tumores cerebrais e medulares com uso de neuronavegação e monitorização intraoperatória.",
  },
  {
    title: "Doença de Moyamoya",
    description:
      "Tratamento da doença rara com estreitamento progressivo das artérias cerebrais, via revascularização.",
  },
  {
    title: "Neuralgia do Trigêmeo",
    description:
      "Dor facial intensa e episódica tratada por descompressão microvascular ou radiocirurgia estereotáxica.",
  },
  {
    title: "Espasmo Hemifacial",
    description:
      "Contrações involuntárias da musculatura facial abordadas por descompressão microvascular do nervo facial.",
  },
  {
    title: "Revascularização Cerebral",
    description:
      "Bypass cerebral para restauração do fluxo sanguíneo em casos de isquemia crônica e doenças oclusivas.",
  },
  {
    title: "Schwannoma Vestibular",
    description:
      "Tumor benigno do nervo vestibulococlear tratado com preservação da audição e do nervo facial.",
  },
  {
    title: "Tumores Hipofisários",
    description:
      "Remoção de adenomas hipofisários por via endoscópica endonasal, preservando a função glandular.",
  },
];

function CardIcon({ index }: { index: number }) {
  const label = String(index + 1).padStart(2, "0");
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-[48px] items-center justify-center rounded-full border border-[#b78e30]/60">
        <span className="font-['Geist_Mono',sans-serif] text-[14px] font-medium text-[#b78e30]">
          {label}
        </span>
      </div>
    </div>
  );
}

function CardArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-[22px]"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M14 7l5 5-5 5"
        stroke="#C5A471"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SectionEspecialidades() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 80);

      gsap.to(track, {
        x: () => `-${getDistance()}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1a293f]"
      style={{ height: "100vh" }}
      data-section="especialidades"
    >
      {/* Static title column — stays put while cards slide */}
      <div
        className="absolute left-[clamp(40px,5vw,96px)] top-1/2 z-10 -translate-y-1/2"
        style={{ width: "clamp(320px, 28vw, 440px)" }}
      >
        <span className="mb-[20px] block font-['Geist_Mono',sans-serif] text-[12px] font-medium uppercase tracking-[0.2em] text-[#d9d3ca]">
          Serviços de Neurocirurgia
        </span>
        <h2
          className="font-['Arimo',sans-serif] font-normal text-white"
          style={{
            fontSize: "clamp(32px, 3.6vw, 44px)",
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
          }}
        >
          Minhas Especialidades
        </h2>
        <p className="mt-[24px] font-['Arimo',sans-serif] text-[16px] leading-[1.45] text-white/70">
          Dr. Hugo Doria oferece tratamentos avançados em neurocirurgia para
          aneurismas, malformações, tumores e doenças vasculares complexas.
        </p>
      </div>

      {/* Horizontal card track */}
      <div
        ref={trackRef}
        className="absolute inset-y-0 left-0 flex items-center gap-[32px] pr-[120px] will-change-transform"
        style={{
          width: "max-content",
          paddingLeft: "calc(clamp(40px, 5vw, 96px) + clamp(320px, 28vw, 440px) + clamp(40px, 4vw, 80px))",
        }}
      >
        {cards.map((card, i) => (
          <article
            key={i}
            className="flex shrink-0 flex-col justify-between bg-white/[0.06] p-[32px]"
            style={{ width: 420, height: 480 }}
          >
            <CardIcon index={i} />
            <div className="flex flex-col gap-[64px]">
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-['Geist',sans-serif] text-[22px] font-normal leading-[1.3] text-white">
                  {card.title}
                </h3>
                <p className="font-['Geist',sans-serif] text-[15px] leading-[1.55] text-white/70">
                  {card.description}
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-[10px] font-['Geist',sans-serif] text-[14px] font-medium text-white"
              >
                <span>Saiba mais</span>
                <CardArrow />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-[28px] right-[40px] z-10 flex items-center gap-[10px] font-['Geist_Mono',sans-serif] text-[11px] uppercase tracking-[0.22em] text-white/50">
        <span>Scroll</span>
        <span className="h-px w-[48px] bg-white/30" />
        <span>→</span>
      </div>
    </section>
  );
}
