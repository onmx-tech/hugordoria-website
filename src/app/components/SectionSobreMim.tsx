import { useEffect, useRef } from "react";
import imgMedicalRoom from "@/assets/e25bc4f66b4a426ccf342bc9c87ec2d3e73f4b1a.png";
import { gsap } from "../../lib/gsap";

const STATS = [
  { value: "+ 20", label: "Anos de Experiência" },
  { value: "+100", label: "Artigos Publicados" },
  { value: "+ 9,500", label: "Casos de Sucesso" },
] as const;

export default function SectionSobreMim() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-reveal]");
      gsap.set(items, { y: 48, autoAlpha: 0 });
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.8,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #eeebe4 0%, #ffffff 100%)",
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32">
        {/* Title */}
        <h2
          data-reveal
          className="mx-auto max-w-[790px] text-center font-['Geist',sans-serif] font-medium text-[#1a293f] leading-[1.24] tracking-[-0.04em]"
          style={{ fontSize: "clamp(32px, 4vw, 64px)" }}
        >
          Melhor Neurocirurgia
          <br />e Cuidados Neurológicos
        </h2>

        {/* Content grid: photo left, text+stats right */}
        <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Photo */}
          <div
            data-reveal
            className="relative aspect-[815/980] max-h-[600px] md:max-h-none w-full overflow-hidden rounded-sm bg-[rgba(88,88,88,0.1)]"
          >
            <img
              src={imgMedicalRoom}
              alt="Consultório Dr. Hugo Doria"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Text + Stats */}
          <div className="flex flex-col justify-between gap-12 md:gap-16 min-h-full">
            <p
              data-reveal
              className="font-['Arimo',sans-serif] font-normal text-[#1a293f] leading-[1.18] tracking-[-0.02em]"
              style={{ fontSize: "clamp(22px, 2.5vw, 40px)" }}
            >
              Confie em mim, para proporcionar o melhor tratamento e transformar
              sua vida com excelência e dedicação, de forma humana e exclusiva,
              meu maior compromisso com meus pacientes e suas familias.
            </p>

            <div className="flex flex-col gap-10 md:gap-12">
              {STATS.map((stat) => (
                <div key={stat.label} data-reveal>
                  <div className="h-px w-full bg-[#1a293f]/24 mb-5" />
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className="font-['Geist',sans-serif] font-normal text-[#1a293f] leading-[1.09] tracking-[-0.03em] whitespace-nowrap"
                      style={{ fontSize: "clamp(36px, 4vw, 64px)" }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="font-['Geist',sans-serif] font-normal text-black/60 leading-[1.09] tracking-[-0.03em] whitespace-nowrap"
                      style={{ fontSize: "clamp(14px, 1.2vw, 20px)" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
