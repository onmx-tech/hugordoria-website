import { gsap } from '../../lib/gsap';

export function initNeuroAnimation(root) {
  if (!root) return [];

  const copy = root.querySelector('[data-animate="copy"]');
  const visual = root.querySelector('[data-animate="visual"]');
  const visualImg = visual?.querySelector('img');

  const triggers = [];

  const copyTween = gsap.from(copy?.children || [], {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: root, start: 'top 70%', once: true },
  });
  if (copyTween.scrollTrigger) triggers.push(copyTween.scrollTrigger);

  const visualTween = gsap.from(visual, {
    scale: 0.9,
    opacity: 0,
    duration: 1.4,
    ease: 'expo.out',
    scrollTrigger: { trigger: root, start: 'top 70%', once: true },
  });
  if (visualTween.scrollTrigger) triggers.push(visualTween.scrollTrigger);

  if (visualImg) {
    const parallax = gsap.to(visualImg, {
      yPercent: -10,
      rotate: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    if (parallax.scrollTrigger) triggers.push(parallax.scrollTrigger);
  }

  return triggers;
}
