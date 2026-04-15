import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../../lib/gsap";
import svgPaths from "../../imports/svg-nx92b0rij3";

type Card = {
  title: string;
  description: string;
  icon: ReactNode;
};

const stroke = { stroke: "#B78E30", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, fill: "none" } as const;
const strokeThin = { ...stroke, strokeWidth: 1.5 } as const;

function IconSchwannoma() {
  return (
    <svg viewBox="0 0 48 48" className="size-[48px]" fill="none" aria-hidden="true">
      <path d={svgPaths.p35d2d4c0} {...stroke} />
      <path d={svgPaths.p1888b00} {...stroke} />
    </svg>
  );
}

function IconAneurisma() {
  return (
    <svg viewBox="0 0 48 48" className="size-[48px]" fill="none" aria-hidden="true">
      <path d={svgPaths.p11260970} {...strokeThin} />
    </svg>
  );
}

function IconMAV() {
  return (
    <svg viewBox="0 0 48 48" className="size-[48px]" fill="none" aria-hidden="true">
      <path d="M12 6V30" {...stroke} />
      <path d={svgPaths.p3790d380} {...stroke} />
      <path d={svgPaths.p211045b0} {...stroke} />
      <path d={svgPaths.p100365c0} {...stroke} />
    </svg>
  );
}

function IconTumor() {
  return (
    <svg viewBox="0 0 48 48" className="size-[48px]" fill="none" aria-hidden="true">
      <path d={svgPaths.p14c86900} {...stroke} />
      <path d={svgPaths.p342dea00} {...stroke} />
      <path d={svgPaths.p178ef400} {...stroke} />
      <path d={svgPaths.p33923780} {...stroke} />
      <path d={svgPaths.p31a60900} {...stroke} />
      <path d={svgPaths.pd7f3b40} {...stroke} />
      <path d={svgPaths.p2c0983c0} {...stroke} />
      <path d={svgPaths.pcd66900} {...stroke} />
      <path d={svgPaths.p246e8ba0} {...stroke} />
    </svg>
  );
}

const cards: Card[] = [
  {
    icon: <IconSchwannoma />,
    title: "Schwannoma Vestibular",
    description:
      "O schwannoma vestibular (SV) é um tumor benigno do nervo vestibulococlear.",
  },
  {
    icon: <IconAneurisma />,
    title: "Aneurisma Cerebral",
    description:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias cerebrais.",
  },
  {
    icon: <IconMAV />,
    title: "MAVs",
    description:
      "As malformações arteriovenosas (MAVs) são conexões anormais entre artérias e veias cerebrais.",
  },
  {
    icon: <IconTumor />,
    title: "Tumores Cerebrais",
    description:
      "Remoção de tumores cerebrais e medulares com neuronavegação e monitorização intraoperatória.",
  },
  {
    icon: <IconSchwannoma />,
    title: "Doença de Moyamoya",
    description:
      "Tratamento da doença rara com estreitamento progressivo das artérias cerebrais, via revascularização.",
  },
  {
    icon: <IconAneurisma />,
    title: "Neuralgia do Trigêmeo",
    description:
      "Dor facial intensa e episódica tratada por descompressão microvascular ou radiocirurgia estereotáxica.",
  },
  {
    icon: <IconMAV />,
    title: "Espasmo Hemifacial",
    description:
      "Contrações involuntárias da musculatura facial abordadas por descompressão microvascular do nervo facial.",
  },
  {
    icon: <IconTumor />,
    title: "Revascularização Cerebral",
    description:
      "Bypass cerebral para restauração do fluxo sanguíneo em casos de isquemia crônica e doenças oclusivas.",
  },
  {
    icon: <IconAneurisma />,
    title: "Tumores Hipofisários",
    description:
      "Remoção de adenomas hipofisários por via endoscópica endonasal, preservando a função glandular.",
  },
];

function CardArrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-[24px]" fill="none" aria-hidden="true">
      <path d="M19 12H5" stroke="#C5A471" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 17L19 12" stroke="#C5A471" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 7L19 12" stroke="#C5A471" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
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
      {/* Static title column */}
      <div
        className="absolute left-[clamp(40px,5vw,96px)] top-1/2 z-10 -translate-y-1/2"
        style={{ width: "clamp(320px, 28vw, 440px)" }}
      >
        <span className="mb-[20px] block font-['Geist',sans-serif] text-[14px] font-normal leading-[1.3] text-[#d9d3ca]">
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
          paddingLeft:
            "calc(clamp(40px, 5vw, 96px) + clamp(320px, 28vw, 440px) + clamp(40px, 4vw, 80px))",
        }}
      >
        {cards.map((card, i) => (
          <article
            key={i}
            className="flex shrink-0 flex-col items-start justify-between overflow-hidden p-[32px]"
            style={{
              width: 513,
              height: 509,
              backgroundColor: "rgba(255, 255, 255, 0.07)",
            }}
          >
            {card.icon}
            <div className="flex w-full flex-col gap-[64px]">
              <div className="flex w-full flex-col gap-[8px] font-['Geist',sans-serif] font-normal leading-[0]">
                <div className="w-full text-[20px] text-white">
                  <p className="leading-[1.5]">{card.title}</p>
                </div>
                <div className="w-full text-[16px] text-white/70">
                  <p className="leading-[1.5]">{card.description}</p>
                </div>
              </div>
              <button
                type="button"
                className="flex w-full items-center gap-[8px] text-left"
              >
                <span className="font-['Geist',sans-serif] text-[14px] font-semibold leading-none text-white">
                  Saiba mais
                </span>
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
