// Capability + preference probes. Read once at boot; listen for changes where it matters.
export const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
export const prefersReducedMotion = () => reducedMotionQuery.matches;
export const isCoarsePointer = () => window.matchMedia('(pointer: coarse)').matches;
export const isSmallScreen = () => window.matchMedia('(max-width: 767px)').matches;

export function hasWebGL2() {
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

// DPR cap: 2 on desktop, 1.5 on phones/tablets. Fill-rate is the #1 mobile WebGL killer.
export const cappedDpr = () => Math.min(window.devicePixelRatio || 1, isCoarsePointer() ? 1.5 : 2);
