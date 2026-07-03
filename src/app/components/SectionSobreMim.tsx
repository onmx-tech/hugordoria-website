import { useEffect, useRef } from "react";
const imgMedicalRoom = "/v4/photos/sobre-portrait.jpg";
import { gsap } from "../../lib/gsap";

const STATS = [
  { value: "+20", label: "Anos de Experiência" },
  { value: "+100", label: "Artigos Publicados" },
  { value: "+9.500", label: "Casos de Sucesso" },
] as const;

export default function SectionSobreMim() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll("[data-reveal]");
      gsap.set(items, { y: 44, autoAlpha: 0 });
      gsap.to(items, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 70%", end: "top 25%", scrub: 0.8 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden py-16 md:py-20"
      style={{ background: "var(--color-bg-cream)" }}
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Foto */}
          <div
            data-reveal
            className="relative w-full overflow-hidden ring-1 ring-navy/10"
            style={{ aspectRatio: "5 / 6" }}
          >
            <img
              src={imgMedicalRoom}
              alt="Dr. Hugo Doria em seu consultório"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "50% 28%" }}
            />
          </div>

          {/* Texto + Stats */}
          <div className="flex flex-col gap-8 md:gap-10 lg:pl-4">
            <h2
              data-reveal
              className="font-['Geist',sans-serif] font-medium text-navy leading-[1.08] tracking-[-0.035em]"
              style={{ fontSize: "clamp(30px, 3.4vw, 52px)" }}
            >
              Melhor Neurocirurgia e Cuidados Neurológicos
            </h2>

            <p
              data-reveal
              className="font-['Arimo',sans-serif] font-normal text-navy/70 leading-[1.55] max-w-[560px]"
              style={{ fontSize: "clamp(16px, 1.3vw, 20px)" }}
            >
              Confie em mim, para proporcionar o melhor tratamento e transformar
              sua vida com excelência e dedicação, de forma humana e exclusiva —
              meu maior compromisso com meus pacientes e suas famílias.
            </p>

            <div className="flex flex-col">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  data-reveal
                  className="flex items-baseline gap-5 border-t border-navy/12 py-5 md:py-6"
                >
                  <span
                    className="font-['Geist',sans-serif] font-semibold text-navy leading-none tracking-[-0.04em] shrink-0"
                    style={{ fontSize: "clamp(34px, 3.6vw, 54px)", minWidth: "clamp(120px, 12vw, 190px)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-['Geist',sans-serif] font-normal uppercase tracking-[0.06em] text-navy/50"
                    style={{ fontSize: "clamp(12px, 0.95vw, 15px)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
