export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;
/** 0→1 as v goes a→b (clamped). */
export const range = (v, a, b) => clamp((v - a) / (b - a));
export const smooth = (t) => t * t * (3 - 2 * t);
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);
/** Rise in over [a,b], hold, fall out over [c,d]. */
export const window4 = (v, a, b, c, d) => (v <= a || v >= d ? 0 : v < b ? easeOut(range(v, a, b)) : v <= c ? 1 : 1 - smooth(range(v, c, d)));
