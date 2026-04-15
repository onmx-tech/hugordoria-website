import { gsap, ScrollTrigger, SplitText } from "../../../lib/gsap";

type Refs = {
  section: HTMLElement;
  mark: HTMLElement;
  quote: HTMLElement;
  signature: SVGSVGElement;
  attribution: HTMLElement;
};

export function initQuoteAnimation(refs: Refs) {
  const { section, mark, quote, signature, attribution } = refs;

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

    gsap.set(split.lines, { yPercent: 110 });
    gsap.set(mark, { y: -24, opacity: 0 });
    gsap.set(attribution, { y: 24, opacity: 0 });

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: isDesktop ? "+=1800" : "bottom top",
        pin: isDesktop,
        scrub: 1,
        anticipatePin: isDesktop ? 1 : 0,
        invalidateOnRefresh: true,
      },
    });

    tl.to(mark, { y: 0, opacity: 1, duration: 0.6 }, 0)
      .to(split.lines, { yPercent: 0, duration: 1, stagger: 0.15 }, 0.15)
      .to(
        paths,
        { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: "none" },
        ">-0.3"
      )
      .to(attribution, { y: 0, opacity: 1, duration: 0.8 }, ">-0.25");

    ScrollTrigger.refresh();
  }, section);

  return () => ctx.revert();
}
