import { gsap } from '../../lib/gsap';

export function initQuoteAnimation(root) {
  if (!root) return [];

  const text = root.querySelector('[data-animate="text"]');
  const cite = root.querySelector('[data-animate="cite"]');

  const triggers = [];
  const tween = gsap.from([text, cite], {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: root,
      start: 'top 70%',
      once: true,
    },
  });
  if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  return triggers;
}
