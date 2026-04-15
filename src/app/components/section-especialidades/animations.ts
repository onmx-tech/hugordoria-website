import { gsap } from "../../../lib/gsap";
import { CANVAS_H, HEADER_W, TRACK_W } from "./data";

type Refs = {
  section: HTMLElement;
  track: HTMLElement;
  headerWrap: HTMLElement;
};

export function initEspecialidadesAnimation({ section, track, headerWrap }: Refs) {
  const getScale = () => {
    const byHeight = window.innerHeight / CANVAS_H;
    const byWidth = window.innerWidth / HEADER_W;
    return Math.min(byHeight, byWidth);
  };
  const getDistance = () =>
    Math.max(0, TRACK_W * getScale() - window.innerWidth);

  const applyScale = () => {
    const s = getScale();
    gsap.set(headerWrap, { scale: s, transformOrigin: "top left" });
    gsap.set(track, { scale: s, transformOrigin: "top left" });
  };
  applyScale();

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
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
