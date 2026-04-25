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

    // Initial states. Section bg matches the preceding section (no seam),
    // group is hidden below, quote lines masked, mark drops in from above.
    gsap.set(section, { backgroundColor: "var(--color-bg-deep)" });
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
        start: "top 85%",
        end: "top 35%",
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

    tl
      // 1. Darken to navy black
      .to(section, { backgroundColor: "var(--color-bg-darkest)", duration: 0.6 }, 0)
      // 2. Mark drops in with a back ease
      .to(
        mark,
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.6)",
        },
        0.2
      )
      // 3. Quote lines rise in the dark
      .to(
        split.lines,
        { yPercent: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
        0.6
      )
      // 3. Signature draws
      .to(
        paths,
        { strokeDashoffset: 0, duration: 1.2, stagger: 0.06, ease: "none" },
        ">-0.1"
      )
      // 4. Hold a beat at max dark
      .to(section, { backgroundColor: "var(--color-bg-darkest)", duration: 0.4 })
      // 5. Lines re-mask + signature dissolves so the exit mirrors the entry
      .to(
        split.lines,
        { yPercent: -110, duration: 1, stagger: 0.08, ease: "power3.in" },
        ">"
      )
      .to(
        paths,
        { autoAlpha: 0, duration: 0.6, stagger: 0.04, ease: "none" },
        "<"
      )
      // 6a. Mark shrinks back up and out
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
      // 6b. Group sinks up and fades out, mirroring the rise on entry
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
      // 7. Lighten back to navy so the exit matches the next section
      .to(
        section,
        { backgroundColor: "var(--color-bg-deep)", duration: 0.8 },
        "<0.2"
      );

    ScrollTrigger.refresh();
  }, section);

  return () => ctx.revert();
}
