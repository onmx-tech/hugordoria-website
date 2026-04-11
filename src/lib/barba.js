import barba from '@barba/core';
import { gsap } from './gsap';
import { initPage, destroyPage, killScrollTriggers } from './page-lifecycle';
import { scrollToTop } from './lenis';

export function initBarba() {
  barba.init({
    transitions: [
      {
        name: 'default-transition',

        async leave(data) {
          destroyPage(data.current.namespace);
          killScrollTriggers();

          await gsap.to(data.current.container, {
            opacity: 0,
            y: -24,
            duration: 0.5,
            ease: 'power2.out',
          });
        },

        async enter(data) {
          scrollToTop(true);
          gsap.set(data.next.container, { opacity: 0, y: 24 });
          initPage(data.next.namespace);

          await gsap.to(data.next.container, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          });
        },

        async once(data) {
          initPage(data.next.namespace);
          await gsap.from(data.next.container, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: 'power3.out',
          });
        },
      },
    ],

    views: [
      {
        namespace: 'home',
        beforeEnter() {},
        afterEnter() {},
      },
    ],
  });
}
