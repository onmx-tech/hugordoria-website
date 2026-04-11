import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power2.out',
  duration: 0.85,
});

ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
