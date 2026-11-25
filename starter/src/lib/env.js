export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => window.matchMedia('(pointer: coarse)').matches;
export const isDesktop = () => window.matchMedia('(min-width: 900px)').matches;
export const dpr = () => Math.min(window.devicePixelRatio || 1, isTouch() ? 1.5 : 2);
