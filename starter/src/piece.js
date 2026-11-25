import './styles/main.css';
import { gsap } from 'gsap';
import { reducedMotion } from './lib/env.js';
import { startScroll } from './motion/scroll.js';
import { initTransitions } from './motion/transitions.js';
import { initCommerce } from './ui/commerce.js';

const reduced = reducedMotion();
document.documentElement.classList.toggle('reduced', reduced);
startScroll(reduced);
initTransitions({ reduced });
initCommerce({ reduced });

if (!reduced) {
  gsap.from('h1 .line-mask > span', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.1, delay: 0.35 });
  gsap.from('[data-rise]', { y: 24, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.5 });
  gsap.fromTo('main .frame img', { scale: 1.08 }, { scale: 1, duration: 1.8, ease: 'expo.out' });
}
