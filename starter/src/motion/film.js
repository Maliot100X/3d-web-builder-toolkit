import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRAME_COUNT, loadFrames, nearest } from '../lib/frames.js';
import { clamp, lerp, range, smooth, window4 } from '../lib/math.js';
import { dpr } from '../lib/env.js';

/**
 * 01 · The film. The section is 520svh tall with a sticky 100svh stage; scroll
 * progress u (0→1) through it is the page's first timeline:
 *
 *   0.00–0.09  hero type rises away and blurs; film holds on frame 0
 *   0.08–0.38  dolly in (ramped)            beat 0 lands 0.12–0.36
 *   0.38–0.50  hold — beat 1 (the big line)
 *   0.50–0.86  arc around the vase           beat 2 lands 0.62–0.86
 *   0.88–1.00  the stage closes into a rounded card and hands over to the page
 *
 * Time remap = piecewise smoothstep between beats (monotone, eased in/out),
 * the way an editor speed-ramps: flat = slow-mo hold, steep = travel.
 */
const BEATS = [[0, 0], [0.08, 0], [0.38, 0.46], [0.5, 0.5], [0.86, 1], [1, 1]];
function filmTime(u) {
  for (let i = 0; i < BEATS.length - 1; i++) {
    const [u0, t0] = BEATS[i], [u1, t1] = BEATS[i + 1];
    if (u <= u1) return lerp(t0, t1, smooth(range(u, u0, u1)));
  }
  return 1;
}
/** Where the vase sits in the 16:9 frame over film time — keeps it in view on portrait crops. */
const focalX = (t) => lerp(0.24, 0.5, smooth(t));

export function initFilm({ reduced, onProgress }) {
  const section = document.querySelector('.film');
  const stage = section.querySelector('.film-stage');
  const canvas = section.querySelector('[data-film]');
  const poster = section.querySelector('.film-poster');
  const copy = section.querySelector('[data-hero-copy]');
  const beats = [...section.querySelectorAll('[data-beat]')];
  const railFill = section.querySelector('[data-rail-fill]');
  const railNum = section.querySelector('[data-rail-num]');
  const cue = section.querySelector('[data-scroll-cue]');
  const ctx = canvas.getContext('2d', { alpha: false });
  const frames = new Array(FRAME_COUNT);
  let u = 0, drawn = -1, dirty = true;

  const size = () => {
    const r = dpr();
    canvas.width = Math.round(stage.clientWidth * r);
    canvas.height = Math.round(stage.clientHeight * r);
    dirty = true;
  };
  size();
  const ro = new ResizeObserver(size);
  ro.observe(stage);

  function draw(index, t) {
    const img = nearest(frames, index);
    if (!img) return;
    const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(cw / iw, ch / ih);
    const w = iw * s, h = ih * s;
    const x = clamp(cw / 2 - focalX(t) * w, cw - w, 0);
    ctx.drawImage(img, x, (ch - h) / 2, w, h);
    if (poster.style.opacity !== '0') poster.style.opacity = '0';
  }

  const cancel = loadFrames(
    (i, img) => { frames[i] = img; if (i === 0 || Math.abs(i - drawn) < 3) dirty = true; },
    (p) => onProgress?.(p),
  );

  if (reduced) {
    // Still frame, headline only (beats are captions for camera moves that don't happen), no scrub.
    if (cue) cue.style.display = 'none';
    const once = () => { if (frames[0]) draw(0, 0); else requestAnimationFrame(once); };
    once();
    return () => { cancel(); ro.disconnect(); };
  }

  const st = ScrollTrigger.create({
    trigger: section, start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => { u = self.progress; dirty = true; },
  });

  const tick = () => {
    if (!dirty) return;
    dirty = false;
    const t = filmTime(u);
    const index = Math.round(t * (FRAME_COUNT - 1));
    draw(index, t);
    drawn = index;

    const out = range(u, 0.005, 0.09);
    copy.style.opacity = String(1 - out);
    copy.style.transform = `translate3d(0, ${-out * 12}vh, 0)`;
    copy.style.filter = out > 0 ? `blur(${out * 10}px)` : '';
    if (cue) cue.style.opacity = String(1 - range(u, 0, 0.03));
    const windows = [[0.12, 0.18, 0.3, 0.36], [0.38, 0.43, 0.52, 0.57], [0.62, 0.68, 0.8, 0.86]];
    beats.forEach((b, i) => {
      const a = window4(u, ...windows[i]);
      b.style.opacity = String(a);
      b.style.transform = `translate3d(0, ${(1 - a) * 24}px, 0)`;
    });
    railFill.style.transform = `scaleY(${u})`;
    railNum.textContent = `0${Math.min(3, 1 + Math.floor(u * 3))}`;
    // closing: the stage contracts into a rounded card
    const close = range(u, 0.88, 1);
    stage.style.clipPath = close > 0 ? `inset(${close * 6}% ${close * 4}% ${close * 6}% ${close * 4}% round ${close * 28}px)` : '';
  };
  gsap.ticker.add(tick);

  return () => { cancel(); ro.disconnect(); st.kill(); gsap.ticker.remove(tick); };
}
