import { gsap, ScrollTrigger } from '../../lib/gsap';

export function initAboutAnimation(root) {
  if (!root) return [];

  const cols = root.querySelectorAll('[data-animate="col"]');
  if (!cols.length) return [];

  const triggers = [];
  const tween = gsap.from(cols, {
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: root,
      start: 'top 75%',
      once: true,
    },
  });
  if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  return triggers;
}
