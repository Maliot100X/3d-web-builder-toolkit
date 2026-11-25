/**
 * Scroll-scrubbed film from a WebP frame sequence (not <video>: seeking a video
 * under fast scroll drops frames; decoded bitmaps make "pick a frame" an index).
 * Loads coarse → fine (every 16th, 8th, 4th…) so a fast scroller always has a
 * near neighbour, with a small concurrency pool.
 */
export const FRAME_COUNT = 121;
export const frameUrl = (i) => `/frames/f${String(i + 1).padStart(3, '0')}.webp`;

function order(count) {
  const seen = new Set();
  const out = [];
  const push = (i) => { if (i >= 0 && i < count && !seen.has(i)) { seen.add(i); out.push(i); } };
  push(0);
  for (let s = 16; s >= 1; s /= 2) for (let i = 0; i < count; i += s) push(i);
  push(count - 1);
  return out;
}

export function loadFrames(onFrame, onProgress, concurrency = 6) {
  const queue = order(FRAME_COUNT);
  let loaded = 0;
  let cancelled = false;
  const one = (i) => new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = frameUrl(i);
    img.decode().then(() => resolve(img), () => resolve(img.complete && img.naturalWidth ? img : null));
  });
  const worker = async () => {
    while (!cancelled && queue.length) {
      const i = queue.shift();
      const img = await one(i);
      if (cancelled) return;
      if (img) onFrame(i, img);
      onProgress(++loaded / FRAME_COUNT);
    }
  };
  for (let k = 0; k < concurrency; k++) worker();
  return () => { cancelled = true; };
}

/** Nearest loaded frame to i (searching outward). */
export function nearest(frames, i) {
  if (frames[i]) return frames[i];
  for (let d = 1; d < FRAME_COUNT; d++) {
    if (frames[i - d]) return frames[i - d];
    if (frames[i + d]) return frames[i + d];
  }
  return null;
}
