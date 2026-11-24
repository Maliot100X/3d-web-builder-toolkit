// Draws the hero "poster" (gradient + display type) into a 2D canvas that becomes a
// texture for the ripple shader. Same idea as gentlerain's CanvasTexture headline.
export function drawPoster(ctx, w, h, { title, kicker }) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#07080c');
  g.addColorStop(0.55, '#0d1020');
  g.addColorStop(1, '#14082a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // faint grid — gives the refraction something to bend
  ctx.strokeStyle = 'rgba(124,245,255,0.06)';
  ctx.lineWidth = Math.max(1, w / 1600);
  const step = Math.round(Math.min(w, h) / 14);
  for (let x = step; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = step; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

  // fit the title to ~88% width (Otis useFitHeadline idea, done in canvas)
  const probe = 100;
  ctx.font = `700 ${probe}px "Chakra Petch", system-ui, sans-serif`;
  const natural = ctx.measureText(title).width || 1;
  const size = Math.min((probe * w * 0.88) / natural, h * 0.32);
  ctx.font = `700 ${size}px "Chakra Petch", system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const grad = ctx.createLinearGradient(w * 0.1, 0, w * 0.9, 0);
  grad.addColorStop(0, '#e8fbff');
  grad.addColorStop(0.5, '#7cf5ff');
  grad.addColorStop(1, '#b69bff');
  ctx.fillStyle = grad;
  ctx.fillText(title, w / 2, h * 0.47);

  ctx.font = `500 ${Math.max(12, size * 0.11)}px "IBM Plex Mono", ui-monospace, monospace`;
  ctx.fillStyle = 'rgba(232,251,255,0.55)';
  ctx.fillText(kicker.toUpperCase().split('').join(String.fromCharCode(8202)), w / 2, h * 0.47 + size * 0.62);
}
