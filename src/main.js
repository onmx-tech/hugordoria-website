import './styles/index.css';
import { initLenis } from './lib/lenis';
import { initBarba } from './lib/barba';

function initApp() {
  initLenis();
  initBarba();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
