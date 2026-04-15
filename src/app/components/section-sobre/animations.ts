import { gsap } from "../../../lib/gsap";
import { CANVAS_H, CANVAS_W } from "./data";

type Refs = {
  section: HTMLElement;
  track: HTMLElement;
};

export function initSobreAnimation({ section, track }: Refs) {
  const getScale = () => window.innerHeight / CANVAS_H;
  const applyScale = () => {
    gsap.set(track, { scale: getScale(), transformOrigin: "top left" });
  };
  applyScale();

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const getDistance = () =>
      Math.max(0, CANVAS_W * getScale() - window.innerWidth);

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
  });

  window.addEventListener("resize", applyScale);
  return () => {
    window.removeEventListener("resize", applyScale);
    mm.revert();
  };
}
