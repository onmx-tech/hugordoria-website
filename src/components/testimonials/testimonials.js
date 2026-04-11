import { initTestimonialsAnimation } from './testimonials.animations';
import { killTriggers } from '../../utils/cleanup';

let triggers = [];

export function initTestimonials() {
  const root = document.querySelector('[data-component="testimonials"]');
  if (!root) return;
  triggers = initTestimonialsAnimation(root);
}

export function destroyTestimonials() {
  killTriggers(triggers);
  triggers = [];
}
