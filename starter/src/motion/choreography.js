import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './split.js';

/**
 * Everything below the film. All inside gsap.matchMedia so reduced-motion users
 * get the finished page and every tween/trigger reverts on teardown.
 */
export function initChoreography() {
  const mm = gsap.matchMedia();

  mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, (c) => {
    const { motion, desktop } = c.conditions;
    if (!motion) return;

    // Masked line rises (headings outside the hero)
    gsap.utils.toArray('main section:not(.film) .line-mask > span').forEach((line) => {
      gsap.from(line, { yPercent: 108, duration: 1.25, ease: 'expo.out', scrollTrigger: { trigger: line, start: 'top 90%', once: true } });
    });

    // Manifesto: words rise in reading order as the paragraph crosses the viewport
    document.querySelectorAll('[data-words]').forEach((p) => {
      const words = splitWords(p);
      gsap.from(words, { yPercent: 110, opacity: 0, ease: 'none', stagger: 0.04, scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 55%', scrub: 0.6 } });
    });

    // Product cards: rise + image settles from 1.12 scale
    gsap.utils.toArray('[data-reveal]').forEach((card) => {
      const img = card.querySelector('img');
      gsap.set(card, { y: 80, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: card, start: 'top 88%', once: true,
        onEnter: () => {
          gsap.to(card, { y: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out' });
          if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'expo.out' });
        },
      });
    });

    // Process: pinned storytelling — each chapter wipes its image up from the bottom
    if (desktop) {
      const imgs = gsap.utils.toArray('[data-proc-img]');
      const num = document.querySelector('[data-proc-num]');
      imgs.forEach((frame, i) => {
        if (i === 0) return;
        gsap.set(frame, { clipPath: 'inset(100% 0% 0% 0%)' });
        const step = document.querySelector(`[data-proc-step="${i}"]`);
        gsap.timeline({ scrollTrigger: { trigger: step, start: 'top bottom', end: 'top top', scrub: true } })
          .to(frame, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
          .fromTo(frame.querySelector('img'), { scale: 1.25, yPercent: 8 }, { scale: 1, yPercent: 0, ease: 'none' }, 0)
          .to(imgs[i - 1].querySelector('img'), { scale: 0.92, yPercent: -6, ease: 'none' }, 0);
      });
      gsap.utils.toArray('[data-proc-step]').forEach((step, i) => {
        ScrollTrigger.create({ trigger: step, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => { if (s.isActive) num.textContent = `0${i + 1}`; } });
      });
    }

    // Atelier: the photograph opens from a window into full bleed, then drifts (parallax)
    const win = document.querySelector('[data-window]');
    if (win) {
      gsap.fromTo(win, { clipPath: desktop ? 'inset(12% 22% 12% 22% round 28px)' : 'inset(8% 6% 8% 6% round 20px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: win, start: 'top 90%', end: 'top 10%', scrub: true } });
      gsap.fromTo('[data-parallax]', { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: win, start: 'top bottom', end: 'bottom top', scrub: true } });
    }

    // Wordmark: letters rise like type set in a forme
    const fit = document.querySelector('[data-fit]');
    if (fit) {
      const letters = fit.textContent.split('');
      fit.textContent = '';
      letters.forEach((ch) => {
        const m = document.createElement('span'); m.className = 'w-mask';
        const s = document.createElement('span'); s.className = 'w'; s.textContent = ch;
        m.appendChild(s); fit.appendChild(m);
      });
      gsap.from(fit.querySelectorAll('.w'), { yPercent: 100, duration: 1.4, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: fit, start: 'top 92%', once: true } });
    }
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => mm.revert();
}

/** Size a single-line wordmark to its container width exactly (Otis / Scrolltide useFitText idea). */
export function fitText(el) {
  if (!el) return () => {};
  const fit = () => {
    el.style.fontSize = '100px';
    const range = document.createRange();
    range.selectNodeContents(el);
    const w = range.getBoundingClientRect().width;
    if (w) el.style.fontSize = `${(100 * el.clientWidth * 0.98) / w}px`;
  };
  fit();
  document.fonts?.ready.then(fit);
  const ro = new ResizeObserver(fit);
  ro.observe(el.parentElement);
  return () => ro.disconnect();
}
