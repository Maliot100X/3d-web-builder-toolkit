import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lenis ⇄ GSAP wiring (pattern used by gentlerain.ai + norrav):
 * Lenis drives scroll, GSAP's ticker drives Lenis, ScrollTrigger updates on every Lenis scroll.
 * Never run two rAF loops for scroll.
 */
export function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // in-page anchors go through Lenis so pins/scrubs stay in sync
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  };
  document.addEventListener('click', onClick);

  return () => {
    gsap.ticker.remove(raf);
    document.removeEventListener('click', onClick);
    lenis.destroy();
  };
}
