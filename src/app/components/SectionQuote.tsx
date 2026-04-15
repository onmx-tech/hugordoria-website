import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "../../lib/gsap";
import svgPaths from "../../imports/svg-nx92b0rij3";

const QUOTE_TEXT =
  "A Neurocirurgia é uma arte e é uma honra poder exercê-la. Atuar em uma área de extrema importância para resgatar a vida dos pacientes é muito mais que uma profissão, é um grande privilégio.";

const ATTRIBUTION =
  "Assim define Dr. Hugo Leonardo Doria-Netto, MD, PhD, seu dom na medicina é reconhecido como uma dádiva de Deus.";

const SIGNATURE_PATHS = [
  svgPaths.p1fc81800,
  svgPaths.p13cf9480,
  svgPaths.p28fd4ec0,
  svgPaths.p136b1e50,
  svgPaths.p58bf700,
  svgPaths.p312a1a00,
  svgPaths.p3236b800,
  svgPaths.p3a754760,
];

export default function SectionQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<SVGSVGElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mark = markRef.current;
    const quote = quoteRef.current;
    const sig = signatureRef.current;
    const attr = attributionRef.current;
    if (!section || !mark || !quote || !sig || !attr) return;

    const ctx = gsap.context(() => {
      // Split quote into lines with overflow-hidden mask
      const split = new SplitText(quote, {
        type: "lines",
        mask: "lines",
        linesClass: "quote-line",
      });

      const paths = Array.from(sig.querySelectorAll("path")) as SVGPathElement[];
      const pathLengths = paths.map((p) => {
        try {
          const len = p.getTotalLength();
          if (Number.isFinite(len) && len > 0) {
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            return len;
          }
        } catch {
          /* noop */
        }
        return 0;
      });
      void pathLengths;

      gsap.set(split.lines, { yPercent: 110 });
      gsap.set(mark, { y: -24, opacity: 0 });
      gsap.set(attr, { y: 24, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(mark, { y: 0, opacity: 1, duration: 0.6 }, 0)
        .to(
          split.lines,
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.15,
          },
          0.15
        )
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "none",
          },
          ">-0.3"
        )
        .to(
          attr,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          ">-0.25"
        );

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1a293f]"
      style={{ height: "100vh" }}
      data-section="quote"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          ref={markRef}
          className="block font-['Geist',sans-serif] font-bold text-[clamp(96px,10vw,138px)] leading-none tracking-[-0.04em] text-[#b78e30]"
          style={{ marginBottom: "clamp(24px, 3vh, 40px)" }}
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <p
          ref={quoteRef}
          className="mx-auto max-w-[min(1066px,88vw)] text-center font-['Geist',sans-serif] font-bold uppercase text-white"
          style={{
            fontSize: "clamp(26px, 2.6vw, 44px)",
            lineHeight: 1.24,
            letterSpacing: "-0.04em",
          }}
        >
          {QUOTE_TEXT}
        </p>

        <svg
          ref={signatureRef}
          viewBox="0 0 182 111.023"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="mt-[clamp(32px,5vh,64px)]"
          style={{ width: "clamp(140px, 12vw, 200px)", height: "auto" }}
          aria-hidden="true"
        >
          {SIGNATURE_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="#B78E30"
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </svg>

        <p
          ref={attributionRef}
          className="mt-[clamp(16px,2.5vh,24px)] max-w-[433px] text-center font-['Arimo',sans-serif] text-[clamp(14px,1.1vw,18px)] leading-[1.32] text-white/70"
        >
          {ATTRIBUTION}
        </p>
      </div>
    </section>
  );
}
