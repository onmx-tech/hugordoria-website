import { gsap } from '../../lib/gsap';

export function initFooterAnimation(root) {
  if (!root) return [];

  const triggers = [];
  const tween = gsap.from(root.children[0]?.children || [], {
    y: 40,
    opacity: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: root, start: 'top 85%', once: true },
  });
  if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  return triggers;
}
