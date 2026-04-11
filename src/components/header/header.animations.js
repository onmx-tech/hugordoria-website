import { gsap } from '../../lib/gsap';

export function initHeaderAnimation(root) {
  if (!root) return null;

  const tl = gsap.timeline();
  tl.from(root, {
    y: -40,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.1,
  });

  return tl;
}

export function initHeaderScrollState(root) {
  if (!root) return null;

  const onScroll = () => {
    root.dataset.scrolled = window.scrollY > 40 ? 'true' : 'false';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}
