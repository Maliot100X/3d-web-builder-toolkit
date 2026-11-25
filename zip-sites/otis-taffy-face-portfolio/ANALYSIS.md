# Zip site 1 — "Otis Pell, character designer" (taffy-face portfolio)

Source: user zip `58b2bb1aed749020ae9bc6d3c20a3d78a07d221c62b70d68a146250d18c18ece.zip` (27 files, 2.5 MB). Unzipped verbatim here.
Screenshots: `../screenshots/otis-*.png` (hero, drag interaction, dark mode, mobile).

## What it is
A one-screen personal portfolio whose entire hero is a **grab-and-stretch cartoon portrait**. You pull Otis's
face with the mouse/finger; the skin stretches like taffy, snaps back with a damped wobble, his cheeks flush
redder the more you mistreat him, a live "Current mood / Patience" meter reacts, and he swaps expressions
(14 pre-rendered WebP faces) on release. Header, giant fit-to-width headline, bio, newsletter form, press strip.

## Stack
| Layer | Choice |
|---|---|
| Build | Vite 6 + TypeScript 5.8 (`tsc --noEmit` as lint) |
| UI | React 19 (function components + hooks), no router |
| CSS | **Tailwind v4** via `@tailwindcss/vite`, tokens in `@theme` / `@theme inline` |
| Graphics | **Raw WebGL2** (no three.js) — 2 programs: face mesh + cobalt disc |
| Fonts | Satoshi (Fontshare), Inter, Instrument Serif (italic accents), Unbounded, JetBrains Mono |
| Assets | 14 × ~170 KB WebP expressions, all registered to one 2:3 bust framing padded to square |

## File structure
```
index.html            preload base face, preconnect font CDNs, inline SVG favicon
src/main.tsx          React root
src/App.tsx           Header, Subscribe, MoodMeter, press strip, layout
src/content.ts        ALL copy + face table + rig landmarks (UV space) — content separated from code
src/hooks.ts          useFitHeadline (headline fills width exactly), useTheme (localStorage + prefers-color-scheme)
src/face/engine.ts    FaceEngine: shaders, 128×128 grid mesh, 4 grab slots, springs, crossfade, flush
src/face/FaceCanvas.tsx  pointer/touch wiring, hit-testing via alpha map, mood events, ResizeObserver layout
src/index.css         tokens (light + dark), type scale, grab-ring cursor
```

## Key techniques (reusable)
1. **Gaussian vertex-drag mesh deformation** (vertex shader): a 128² UV grid; each of 4 grab slots offsets vertices by
   `exp(-d²/2σ²)` of their rest distance to the anchor; σ widens with pull length → long pulls make a tapering tube.
2. **Damped spring release** on the CPU: `SPRING=260, DAMPING=11`, integrated per frame → rubbery wobble.
3. **Multi-touch** — 4 independent pointer slots keyed by `pointerId`, `setPointerCapture`, separate touch path with `{passive:false}`.
4. **Alpha-map hit testing**: a 256² alpha copy of the face decides whether a press grabs skin or passes through.
5. **Expression crossfade**: two textures + `uMix`, 90 ms fade; random "release" faces; fallback if a file fails.
6. **Procedural flush** (fragment shader): gaussian blobs at cheeks/nose, then face ellipse, masked to skin-like pixels
   (`r − b` threshold) so eyes stay clean; stretch amount adds redness.
7. **Head breaks out of the disc**: below the disc centre the bust is clipped by the circle, above it the head overflows —
   one `step()`/`smoothstep()` line. Disc edge is analytically anti-aliased with `uAa = 1/(size·dpr)`.
8. **Premultiplied alpha** canvas over the DOM; canvas `pointer-events-none` + separate hit layer, so the stretched face can
   spill over the text without blocking clicks.
9. **useFitHeadline**: measure at 100 px, scale font-size to the parent's content box, re-fit on `document.fonts.ready`
   and ResizeObserver, publish `--mega` CSS var so the stage tucks under the type.
10. **Theme**: `data-theme` on `<html>`, tokens swap, `meta[name=theme-color]` updated, choice persisted.
11. **Copy as personality**: "pull my face" handwritten-style hint, mood meter `aria-live="polite"`, press strip set in six
    different typefaces to fake real outlets.

## Typography / colour / layout
- Fog page `#e8ebf1`, ink `#12141b`, **cobalt disc `#2f4bf0`**, mustard marker `#f2b31b` (highlight behind "OTIS").
- Dark theme `#0e1015`. Colour-mix for the patience bar: `color-mix(in oklab, var(--disc) p%, #e8412c)`.
- Display: Satoshi bold, tight tracking; micro labels 11–12 px uppercase with 0.08–0.1em tracking.
- Three-column hero: bio left, portrait centre, mood + newsletter right; press strip pinned to bottom.

## Perf / a11y notes
- DPR capped at 2; only one RAF loop; grid 128² = 32k tris; images preloaded and decoded before first paint.
- Canvas is `aria-hidden`; an accessible labelled hit element describes the interaction; dark-mode button has `aria-pressed`.
- Gap: no explicit `prefers-reduced-motion` branch (springs always wobble) — add one when reusing.

## How to reuse
`npm i && npm run dev`. To port the effect: copy `src/face/engine.ts` + FaceCanvas, replace the WebP set
(keep identical framing), re-measure `rig` landmarks in UV space.

## Re-study in the Scrolltide light (2026-11-25)
This zip is Scrolltide's **free "Otis" hero template** (https://www.scrolltide.co/templates/otis). Its preview film is in
`scrolltide/frames/otis-sheet.jpg`. What it actually teaches, ranked by what matters for the bar:
1. **The interaction is the brand.** A designer's own face you can pull like taffy. The WebGL serves the person
   and is never decoration. Its real lesson is to pick a subject and make the effect *about* it.
2. **Editorial composition.** A three-column hero (bio, portrait, mood and newsletter), a press strip pinned to the bottom,
   a mustard marker behind the name, and micro-labels. It is quiet around a single loud element.
3. **Type and palette restraint.** Fog page, ink, one cobalt disc and one mustard accent; Satoshi with an Instrument Serif accent.
4. **Craft**: the fitted headline, alpha-map hit testing, spring physics and the accessible hit layer.
Gap vs the rest of Scrolltide: no scroll storytelling (single-screen hero) and no reduced-motion branch.
The `starter/` takes 2–4 from here and the scroll-film/storytelling from NAÏADE and SELENE.
