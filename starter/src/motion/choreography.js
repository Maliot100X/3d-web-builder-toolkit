import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './split.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * All scroll choreography lives here, inside gsap.matchMedia() so that
 *  - reduced-motion users get static, fully visible content
 *  - desktop / mobile get different pin logic
 * and everything reverts cleanly (mm.revert()) on HMR or teardown.
 */
export function initChoreography({ stage }) {
  const mm = gsap.matchMedia();

  mm.add(
    { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 768px)' },
    (ctx) => {
      const { motion, desktop } = ctx.conditions;
      if (!motion) {
        // Reduced motion: no smooth scroll, no scrub, no reveals. The stage is a still
        // image whose poster simply fades out as you leave the hero (one redraw per scroll).
        gsap.set('[data-reveal], .w', { clearProps: 'all' });
        if (!stage) return;
        const onScroll = () => {
          const p = Math.min(1, window.scrollY / window.innerHeight);
          stage.state.posterOpacity = 1 - p;
          stage.state.blobScale = desktop ? 0.78 - p * 0.2 : 0.62;
          stage.renderOnce();
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
      }

      // 1. Hero intro timeline (loader-style entrance: norrav Loader / Otis header)
      const intro = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
      intro
        .from('.site-nav > *', { y: -24, autoAlpha: 0, stagger: 0.06 })
        .from('.hero-copy > *', { y: 40, autoAlpha: 0, stagger: 0.08 }, '<0.1')
        .from('.scroll-cue', { autoAlpha: 0, y: 10 }, '<0.4');
      if (stage) intro.from(stage.state, { blobScale: 0.2, distort: 0.9, duration: 2.2 }, 0);

      // 2. Whole-page progress → 3D stage state (one scrubbed timeline = one source of truth)
      if (stage) {
        gsap.timeline({
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
        })
          .to(stage.state, { progress: 1, hue: 0.6, ease: 'none', duration: 1 }, 0)
          .to(stage.state, { posterOpacity: 0, ease: 'power1.in', duration: 0.12 }, 0)
          .to(stage.state, { blobX: desktop ? -1.1 : 0.2, blobY: desktop ? -0.35 : 1.1, blobScale: desktop ? 0.55 : 0.45, duration: 0.25 }, 0.05)
          .to(stage.state, { blobX: desktop ? 1.1 : -0.2, blobY: desktop ? 0.2 : -1.2, distort: 0.42, blobScale: desktop ? 0.7 : 0.5, duration: 0.3 }, 0.35)
          .to(stage.state, { blobX: desktop ? 0.85 : 0, blobY: desktop ? 0.15 : 0.9, distort: 0.18, blobScale: desktop ? 0.9 : 0.6, duration: 0.3 }, 0.7);
      }

      // 3. Manifesto: word-by-word scrubbed opacity (gentlerain / Awwwards staple)
      document.querySelectorAll('[data-split-scrub]').forEach((el) => {
        const words = splitWords(el);
        gsap.fromTo(words, { opacity: 0.12 }, {
          opacity: 1, stagger: 0.05, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 40%', scrub: true },
        });
      });

      // 4. Masked line-rise headings
      document.querySelectorAll('[data-split-rise]').forEach((el) => {
        const words = splitWords(el);
        gsap.from(words, {
          yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.04,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // 5. Pinned horizontal gallery (Lagunitas pin+scrub, 0xAllan Showcase)
      const track = document.querySelector('.h-track');
      if (track && desktop) {
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: {
            trigger: '.h-pin', start: 'top top', end: () => '+=' + distance(),
            pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
      }

      // 6. Batch reveals for cards/grids (cheaper than one trigger per element)
      gsap.set('[data-reveal]', { y: 48, autoAlpha: 0 });
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });

      // 7. Counters
      document.querySelectorAll('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString(); },
        });
      });

      // 8. Velocity-reactive marquee
      const marquee = document.querySelector('.marquee-inner');
      if (marquee) {
        const loop = gsap.to(marquee, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
            gsap.to(loop, { timeScale: self.direction * Math.max(1, Math.abs(v)), duration: 0.3, overwrite: true });
          },
        });
      }
    },
  );

  // fonts change metrics → refresh pins once they land
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  return () => mm.revert();
}
