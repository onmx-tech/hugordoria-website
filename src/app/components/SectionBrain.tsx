import { useEffect, useRef } from "react";
import svgPaths from "../../imports/svg-nx92b0rij3";
import imgBrainHead from "@/assets/7fee5577843640b2f76d574e1698b92b540003b2.png";
import { gsap } from "../../lib/gsap";

function BrainGraphic() {
  return (
    <svg
      className="absolute block size-full"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 609.44 342.64"
    >
      <g>
        <path d={svgPaths.p78dbb00} fill="url(#brain_g0)" />
        <path d={svgPaths.p3be4f000} fill="url(#brain_g1)" />
        <path d={svgPaths.p181e6080} fill="url(#brain_g2)" />
        <path d={svgPaths.p35cccc00} fill="url(#brain_g3)" />
        <path d={svgPaths.p25e46900} fill="url(#brain_g4)" />
        <path d={svgPaths.p2ea65680} fill="url(#brain_g5)" />
        <path d={svgPaths.p1b3af00} fill="url(#brain_g6)" />
        <path d={svgPaths.p182c0e00} fill="url(#brain_g7)" />
        <path d={svgPaths.p170e4400} fill="url(#brain_g8)" />
        <path d={svgPaths.p1dd2e800} fill="url(#brain_g9)" />
        <path d={svgPaths.pf152200} fill="url(#brain_g10)" />
        <path d={svgPaths.p121fd010} fill="url(#brain_g11)" />
        <path d={svgPaths.p30445c00} fill="url(#brain_g12)" />
        <path d={svgPaths.p250c5372} fill="url(#brain_g13)" />
        <path d={svgPaths.p22844200} fill="url(#brain_g14)" />
        <path d={svgPaths.p18650c00} fill="url(#brain_g15)" />
        <path d={svgPaths.p2d2c0700} fill="url(#brain_g16)" />
        <path d={svgPaths.p3ecc2c00} fill="url(#brain_g17)" />
        <path d={svgPaths.p29fd3100} fill="url(#brain_g18)" />
        <path d={svgPaths.p3888af00} fill="url(#brain_g19)" />
        <path d={svgPaths.p3f6ad200} fill="url(#brain_g20)" />
        <path d={svgPaths.p3a4cd280} fill="url(#brain_g21)" />
        <path d={svgPaths.p167a1a00} fill="url(#brain_g22)" />
        <path d={svgPaths.p3d613900} fill="url(#brain_g23)" />
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g0" x1="24.1388" x2="123.478" y1="99.5015" y2="99.6358">
          <stop stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g1" x1="67.4831" x2="277.811" y1="200.964" y2="109.346">
          <stop stopColor="#B28847" /><stop offset="1" stopColor="#ECDCC3" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g2" x1="639.85" x2="304.409" y1="371.4" y2="218.211">
          <stop stopColor="#316AA8" /><stop offset="0.342383" stopColor="#3873B1" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g3" x1="113.292" x2="249.735" y1="217.721" y2="148.761">
          <stop stopColor="#B28847" /><stop offset="1" stopColor="#ECDCC3" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g4" x1="20.688" x2="267.959" y1="144.327" y2="250.23">
          <stop stopColor="#316AA8" /><stop offset="0.357865" stopColor="#3873B1" /><stop offset="0.728891" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g5" x1="208.802" x2="284.698" y1="124.624" y2="124.624">
          <stop stopColor="#B28847" /><stop offset="1" stopColor="#ECDCC3" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g6" x1="-1.00006" x2="203.321" y1="128.493" y2="128.493">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g7" x1="50.7353" x2="88.1707" y1="175.847" y2="111.32">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g8" x1="-30.54" x2="136.442" y1="225.104" y2="269.435">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.690148" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g9" x1="66.3056" x2="398.228" y1="125.564" y2="125.564">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g10" x1="154.668" x2="276.333" y1="99.5017" y2="196.046">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g11" x1="27.5861" x2="340.369" y1="242.837" y2="248.255">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.496459" stopColor="#152649" /><stop offset="0.842244" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g12" x1="160.088" x2="375.834" y1="115.264" y2="115.264">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g13" x1="113.783" x2="279.78" y1="81.7637" y2="107.87">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g14" x1="240.869" x2="392.088" y1="7.38607" y2="101.467">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g15" x1="381.122" x2="368.56" y1="-83.2917" y2="387.533">
          <stop stopColor="#ECDCC3" /><stop offset="0.605769" stopColor="#B28847" /><stop offset="0.995192" stopColor="#ECDCC3" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g16" x1="353.172" x2="317.214" y1="-132.994" y2="413.76">
          <stop stopColor="#ECDCC3" /><stop offset="0.542944" stopColor="#B28847" /><stop offset="0.675202" stopColor="#B58C4D" /><stop offset="0.821569" stopColor="#C5A471" /><stop offset="0.995192" stopColor="#ECDCC3" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g17" x1="468.926" x2="582.71" y1="-21.6766" y2="283.718">
          <stop stopColor="#316AA8" /><stop offset="0.270453" stopColor="#3873B1" /><stop offset="0.590742" stopColor="#152649" /><stop offset="0.887789" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g18" x1="433.463" x2="464.003" y1="287.168" y2="165.011">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g19" x1="339.874" x2="532.962" y1="264.997" y2="264.997">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.512366" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g20" x1="366.472" x2="514.736" y1="211.804" y2="332.977">
          <stop stopColor="#B28847" /><stop offset="1" stopColor="#ECDCC3" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g21" x1="61.5713" x2="374.847" y1="243.819" y2="306.376">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g22" x1="82.2568" x2="303.421" y1="377.307" y2="257.613">
          <stop stopColor="#316AA8" /><stop offset="0.251676" stopColor="#3873B1" /><stop offset="0.627717" stopColor="#152649" /><stop offset="0.99" stopColor="#0C102C" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="brain_g23" x1="122.128" x2="361.054" y1="140.405" y2="262.54">
          <stop stopColor="#57A8D4" /><stop offset="0.932692" stopColor="#316AA8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function SectionBrain() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const graphicOverlay = root.querySelector("[data-brain='graphic']");
      const headImage = root.querySelector("[data-brain='head']");
      const textEls = root.querySelectorAll("[data-brain-text]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.fromTo(
        headImage,
        { opacity: 0, scale: 1.2, y: 60 },
        { opacity: 0.7, scale: 1, y: 0, ease: "none" },
        0
      )
        .fromTo(
          graphicOverlay,
          { opacity: 0, scale: 0.65, y: 30 },
          { opacity: 1, scale: 1, y: 0, ease: "none" },
          0.05
        )
        .fromTo(
          textEls[0] || [],
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0.15
        )
        .fromTo(
          textEls[1] || [],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0.2
        )
        .fromTo(
          textEls[2] || [],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0.25
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #122136 0%, #2a4260 50%, #3b5473 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1200px] mx-auto px-6 py-16 md:py-24 lg:py-28">
        {/* Brain visual — head image + SVG graphic overlay */}
        <div
          data-brain="wrapper"
          className="relative w-full max-w-[960px] aspect-square mb-6 md:mb-10"
        >
          <img
            data-brain="head"
            src={imgBrainHead}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain object-center select-none"
          />
          <div
            data-brain="graphic"
            className="absolute inset-[12%_8%_38%_40%] pointer-events-none"
          >
            <BrainGraphic />
          </div>
        </div>

        {/* Text content */}
        <h2
          data-brain-text
          className="text-center font-['Arimo',sans-serif] font-normal text-white leading-[1.18] tracking-[-0.02em] max-w-[612px]"
          style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
        >
          Cuidados Essenciais para Sua Saúde Neurológica
        </h2>

        <p
          data-brain-text
          className="mt-5 md:mt-6 text-center font-['Arimo',sans-serif] font-normal text-white/70 leading-[1.32] max-w-[612px]"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
        >
          Experimente tratamentos neurológicos de excelência mundial, associados
          ao cuidado humanizado, exclusivo e personalizado que são a marca
          registrada do Dr. Hugo Doria.
        </p>

        {/* CTA */}
        <a
          data-brain-text
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 md:mt-10 inline-flex items-center gap-2.5 rounded-full bg-[#c5a471] px-7 py-4 text-white font-['Roboto',sans-serif] font-medium transition-all duration-300 hover:bg-[#d4b584] hover:shadow-lg hover:shadow-[#c5a471]/20"
          style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 30.62 30.62"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.78"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6.38 26.79H24.24" />
            <path d={svgPaths.p14c86900} />
            <path d={svgPaths.p1c9dbf00} />
            <path d={svgPaths.p1de39ce6} />
            <path d={svgPaths.p392b0b00} />
          </svg>
          Entre em Contato
        </a>
      </div>
    </section>
  );
}
