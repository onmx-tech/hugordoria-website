import { gsap, ScrollTrigger, SplitText } from "../../../lib/gsap";

type Refs = {
  section: HTMLElement;
  group: HTMLElement;
  mark: HTMLElement;
  quote: HTMLElement;
  signature: SVGSVGElement;
  attribution: HTMLElement;
};

export function initQuoteAnimation(refs: Refs) {
  const { section, group, mark, quote, signature } = refs;

  const ctx = gsap.context(() => {
    const split = new SplitText(quote, {
      type: "lines",
      mask: "lines",
      linesClass: "quote-line",
    });

    const paths = Array.from(
      signature.querySelectorAll("path")
    ) as SVGPathElement[];

    paths.forEach((p) => {
      try {
        const len = p.getTotalLength();
        if (Number.isFinite(len) && len > 0) {
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        }
      } catch {
        /* path without geometry */
      }
    });

    gsap.set(group, { y: 120, autoAlpha: 0 });
    gsap.set(split.lines, { yPercent: 110 });
    gsap.set(mark, {
      scale: 0.4,
      autoAlpha: 0,
      y: -60,
      transformOrigin: "center bottom",
    });

    // Pre-pin: group rises and fades in so it's fully present before pin.
    gsap.to(group, {
      y: 0,
      autoAlpha: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        end: "top 48%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    // Pinned timeline: bg round-trips blue → dark → blue so the section never
    // shows a seam against the preceding/following navy sections. Quote
    // lines and signature reveal while held in the dark middle.
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isDesktop ? "+=1600" : "bottom top",
        pin: isDesktop,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    const bgDark = getComputedStyle(section).getPropertyValue("--color-bg-darkest").trim() || "#0a0e1a";
    const bgDeep = getComputedStyle(section).getPropertyValue("--color-bg-deep").trim() || "#101828";

    tl
      .to(section, { backgroundColor: bgDark, duration: 0.4 }, 0)
      .to(
        mark,
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.6)",
        },
        0.05
      )
      .to(
        split.lines,
        { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
        0.2
      )
      .to(
        paths,
        { strokeDashoffset: 0, duration: 1.2, stagger: 0.06, ease: "none" },
        ">-0.1"
      )
      // A assinatura ficava PRONTA por um sopro de scroll antes de a saída
      // começar — o cliente descreveu como "pegou e sumiu, tem que ir na
      // porrada pra ele pegar". Um traço que leva 1,2 para ser desenhado não
      // pode viver 0,4. O respiro agora é maior que o desenho, e a saída ficou
      // mais curta para o pin não crescer por causa disso.
      .to(
        split.lines,
        { yPercent: -110, duration: 0.7, stagger: 0.06, ease: "power3.in" },
        "+=1.3"
      )
      // A assinatura NÃO é apagada por conta própria: ela sai assinada, subindo
      // junto com o bloco (o `group` abaixo já leva o conjunto em autoAlpha).
      // Apagá-la antes era o que produzia a leitura de falha.
      .to(
        mark,
        {
          scale: 0.4,
          autoAlpha: 0,
          y: -60,
          duration: 0.7,
          ease: "power3.in",
        },
        "<"
      )
      .to(
        group,
        {
          y: -120,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.in",
        },
        "<0.1"
      )
      .to(
        section,
        { backgroundColor: bgDeep, duration: 0.8 },
        "<0.2"
      );
  }, section);

  return () => ctx.revert();
}
