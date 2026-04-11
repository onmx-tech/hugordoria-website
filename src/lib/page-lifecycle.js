import { ScrollTrigger } from './gsap';
import { initHomePage, destroyHomePage } from '../pages/home';

const pageMap = {
  home: { init: initHomePage, destroy: destroyHomePage },
};

export function initPage(namespace) {
  const page = pageMap[namespace];
  if (!page?.init) return;
  page.init();
  ScrollTrigger.refresh();
}

export function destroyPage(namespace) {
  const page = pageMap[namespace];
  if (!page?.destroy) return;
  page.destroy();
}

export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
