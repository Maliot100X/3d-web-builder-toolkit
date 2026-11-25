import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
let lenis = null;

/** One clock: GSAP's ticker drives Lenis; ScrollTrigger updates on every Lenis scroll. */
export function startScroll(reduced) {
  if (reduced) return () => {};
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null; };
}

export function scrollToTarget(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else (typeof target === 'number' ? window.scrollTo(0, target) : target.scrollIntoView());
}
export const stopScroll = () => lenis?.stop();
export const resumeScroll = () => lenis?.start();
