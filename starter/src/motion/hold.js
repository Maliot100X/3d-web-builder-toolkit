import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * "Hold it" section. three.js is code-split: the chunk loads only when the section is
 * about one viewport away, so the film and first paint never pay for it. Desktop pins the
 * section and lets scroll add a slow turn while the spec lines land; touch just lets you drag.
 */
export function initHold({ reduced }) {
  const section = document.querySelector('[data-hold]');
  if (!section) return;
  const host = section.querySelector('[data-vessel]');
  const swatches = [...section.querySelectorAll('[data-glaze]')];
  const name = section.querySelector('[data-glaze-name]');
  let vessel = null;

  const select = (btn) => {
    swatches.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    if (name) name.textContent = btn.dataset.label;
    vessel?.setGlaze(btn.dataset.glaze);
  };
  swatches.forEach((b) => b.addEventListener('click', () => select(b)));

  const io = new IntersectionObserver(async ([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    try {
      const { createVessel } = await import('../gl/vessel.js');
      vessel = createVessel(host, { reduced, onReady: () => host.classList.add('is-live') });
      const current = swatches.find((b) => b.getAttribute('aria-pressed') === 'true');
      if (vessel && current && current.dataset.glaze !== 'celadon') vessel.setGlaze(current.dataset.glaze);
    } catch {
      /* poster image stays: content is complete without WebGL */
    }
  }, { rootMargin: '100% 0px' });
  io.observe(section);

  if (reduced) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: 'top top', end: '+=140%', pin: true, scrub: 0.8,
        onUpdate: (s) => vessel?.setScroll(s.progress),
      },
    });
    tl.from('[data-spec]', { yPercent: 100, opacity: 0, stagger: 0.12, ease: 'power2.out', duration: 0.4 }, 0.1)
      .fromTo(host, { clipPath: 'inset(8% 10% 8% 10% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', duration: 0.6 }, 0);
  });
  mm.add('(max-width: 899px)', () => {
    gsap.from('[data-spec]', { y: 20, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: section.querySelector('[data-specs]'), start: 'top 90%', once: true } });
  });
  // Split-character headline
  const h = section.querySelector('[data-chars]');
  if (h) {
    const chars = [];
    h.setAttribute('aria-label', h.textContent.trim());
    [...h.childNodes].forEach((n) => {
      const italic = n.nodeType === 1 && n.tagName === 'EM';
      const wrap = document.createElement(italic ? 'em' : 'span');
      wrap.setAttribute('aria-hidden', 'true');
      [...n.textContent].forEach((ch) => {
        const m = document.createElement('span'); m.className = 'w-mask';
        const s = document.createElement('span'); s.className = 'w'; s.textContent = ch === ' ' ? '\u00a0' : ch;
        m.appendChild(s); wrap.appendChild(m); chars.push(s);
      });
      n.replaceWith(wrap);
    });
    gsap.from(chars, { yPercent: 110, rotate: 6, duration: 1.2, ease: 'expo.out', stagger: 0.035, scrollTrigger: { trigger: h, start: 'top 85%', once: true } });
  }
  ScrollTrigger.refresh();
}
