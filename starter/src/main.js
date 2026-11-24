import './style.css';
import 'lenis/dist/lenis.css';
import { createIcons, ArrowRight, ArrowUpRight, Sparkles, Box, Waves, Gauge, Accessibility, Github, Mail, MousePointer2 } from 'lucide';
import { hasWebGL2, prefersReducedMotion } from './lib/env.js';
import { initSmoothScroll } from './motion/smooth-scroll.js';
import { initChoreography } from './motion/choreography.js';

createIcons({ icons: { ArrowRight, ArrowUpRight, Sparkles, Box, Waves, Gauge, Accessibility, Github, Mail, MousePointer2 } });

const reduced = prefersReducedMotion();
const canvas = document.querySelector('#stage');
let stage = null;
let teardown = [];

async function boot() {
  // WebGL is progressive enhancement: the page is complete without it.
  if (canvas && hasWebGL2()) {
    try {
      const { createStage } = await import('./scene/stage.js'); // code-split three.js
      await document.fonts?.load('700 100px "Chakra Petch"').catch(() => {});
      stage = createStage(canvas, { title: document.body.dataset.title || 'HYPERFORM', kicker: document.body.dataset.kicker || '3D web studio', reduced });
      document.documentElement.classList.add('has-webgl');
      teardown.push(() => stage.dispose());
    } catch (err) {
      console.warn('[stage] WebGL init failed, using CSS fallback', err);
      document.documentElement.classList.add('no-webgl');
    }
  } else {
    document.documentElement.classList.add('no-webgl');
  }

  if (!reduced) teardown.push(initSmoothScroll());
  teardown.push(initChoreography({ stage }));
  document.documentElement.classList.add('is-ready');
}

boot();

document.querySelector('#year')?.replaceChildren(String(new Date().getFullYear()));

if (import.meta.hot) {
  import.meta.hot.dispose(() => { teardown.forEach((fn) => fn()); teardown = []; });
}
