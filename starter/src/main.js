import './styles/main.css';
import { gsap } from 'gsap';
import { reducedMotion } from './lib/env.js';
import { startScroll, scrollToTarget } from './motion/scroll.js';
import { initFilm } from './motion/film.js';
import { initChoreography, fitText } from './motion/choreography.js';
import { initTransitions } from './motion/transitions.js';
import { initHoverDistort } from './gl/hover-distort.js';
import { createPreloader } from './ui/preloader.js';
import { initCommerce } from './ui/commerce.js';

const reduced = reducedMotion();
document.documentElement.classList.toggle('reduced', reduced);

const preloader = createPreloader({ reduced });
startScroll(reduced);
initFilm({ reduced, onProgress: preloader.progress });
fitText(document.querySelector('[data-fit]'));
initChoreography();
initTransitions({ reduced });
initCommerce({ reduced });
if (!reduced && window.matchMedia('(pointer: fine)').matches) initHoverDistort();

// In-page anchors go through Lenis so the smooth clock never fights native jumps
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id === '#' || id === '#top' ? 0 : document.querySelector(id);
    if (target === null) return;
    e.preventDefault();
    scrollToTarget(target);
  });
});

// Hero entrance after the preloader lifts
preloader.ready.then(() => {
  if (reduced) return;
  gsap.from('[data-hero-copy] .line-mask > span', { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.09, delay: 0.25 });
  gsap.from('[data-hero-copy] [data-rise], [data-scroll-cue]', { y: 18, opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.5, stagger: 0.1 });
});
