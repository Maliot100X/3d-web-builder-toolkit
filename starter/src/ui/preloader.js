import { gsap } from 'gsap';

/**
 * Counts real work (film frames + fonts), never a fake timer. Releases once the
 * first ~20% of frames (the coarse pass covers the whole film) and fonts are in,
 * or after a hard 4s ceiling so a slow network never traps the visitor.
 */
export function createPreloader({ reduced }) {
  const el = document.querySelector('.preloader');
  const count = el?.querySelector('[data-load-count]');
  let shown = 0, target = 0, done = false, resolveReady;
  const ready = new Promise((r) => (resolveReady = r));
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  let framesOk = false, fontsOk = false;
  fonts.then(() => { fontsOk = true; check(); });
  const ceiling = setTimeout(() => finish(), 4000);

  function check() { if (framesOk && fontsOk) finish(); }
  function finish() {
    if (done) return;
    done = true; clearTimeout(ceiling);
    if (!el) return resolveReady();
    gsap.to({ v: shown }, { v: 100, duration: reduced ? 0 : 0.4, ease: 'power2.out', onUpdate() { count.textContent = String(Math.round(this.targets()[0].v)); } });
    gsap.to(el, {
      clipPath: 'inset(0% 0% 100% 0%)', duration: reduced ? 0.01 : 1.1, ease: 'expo.inOut', delay: reduced ? 0 : 0.45,
      onStart: () => resolveReady(),
      onComplete: () => el.remove(),
    });
  }

  return {
    ready,
    progress(p) {
      target = Math.round(p * 100);
      if (!done && count) { shown = Math.max(shown, Math.min(target, 99)); count.textContent = String(shown); }
      if (p >= 0.2) { framesOk = true; check(); }
    },
  };
}
