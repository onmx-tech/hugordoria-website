import { ScrollTrigger } from '../lib/gsap';
import { initHeader, destroyHeader } from '../components/header/header';
import { initHero, destroyHero } from '../components/hero/hero';
import { initAbout, destroyAbout } from '../components/about/about';
import { initQuote, destroyQuote } from '../components/quote/quote';
import { initSpecialties, destroySpecialties } from '../components/specialties/specialties';
import { initTestimonials, destroyTestimonials } from '../components/testimonials/testimonials';
import { initNeuroimagens, destroyNeuroimagens } from '../components/neuroimagens/neuroimagens';
import { initFooter, destroyFooter } from '../components/footer/footer';

export function initHomePage() {
  initHeader();
  initHero();
  initAbout();
  initQuote();
  initSpecialties();
  initTestimonials();
  initNeuroimagens();
  initFooter();
  ScrollTrigger.refresh();
}

export function destroyHomePage() {
  destroyHeader();
  destroyHero();
  destroyAbout();
  destroyQuote();
  destroySpecialties();
  destroyTestimonials();
  destroyNeuroimagens();
  destroyFooter();
}
