# Halcyon: editorial scroll starter

A working reference for the [DESIGN-BAR](../DESIGN-BAR.md): a fictional ceramics atelier at Lake Ohrid, built the way
Scrolltide's sites are built. There are no cubes, blobs or particles. Every moving thing is a photograph, a camera or type.

```bash
npm i
npm run dev        # http://localhost:5173
npm run lint && npm run build && npm run qa   # QA = Playwright desktop / mobile 390 / reduced-motion, fails on any console error or sideways scroll
```

| Section | Technique | File |
|---|---|---|
| 01 Film | 121 WebP frames (one 8 s dolly push-in) scrubbed on a sticky canvas; coarse-to-fine loading; time-remap holds; focal crop for portrait; 3 beats; chapter rail; stage closes into a rounded card | `src/motion/film.js`, `src/lib/frames.js` |
| Preloader | wordmark plus a % of real frames and fonts loaded (4 s ceiling) | `src/ui/preloader.js` |
| 02 Manifesto | scrubbed word rise (accessible split) | `src/motion/split.js`, `choreography.js` |
| 03 Process | sticky media column; chapters wipe in with clip-path and scale settle; counter. Mobile: inline images | `choreography.js` |
| 04 Pieces | staggered editorial cards; liquid ripple hover in **one shared WebGL1 canvas** (fine pointer only); bag counter | `src/gl/hover-distort.js`, `src/ui/commerce.js` |
| 05 Atelier | window → full-bleed clip-path reveal plus inner parallax | `choreography.js` |
| 06 Visit | waitlist form; fitted "Halcyon" wordmark with letter rise | `fitText()` |
| Detail page | `piece.html` shares `view-transition-name: piece-01` with the card (cross-document View Transitions); ink-curtain fallback | `src/motion/transitions.js`, `src/piece.js` |

**One clock**: the GSAP ticker drives Lenis and the film renderer (`src/motion/scroll.js`). **Reduced motion**: no Lenis, a
still frame, no reveals, beats hidden, and the film collapses to one screen. **Fonts**: Fraunces (opsz/SOFT/WONK italics),
Sora and IBM Plex Mono. **Palette**: ink `#14130f`, bone `#efe9df`, paper `#f6f2ea`, celadon `#9db8a6`, clay `#b5643c`.

## Make it yours
1. Generate or render your own camera move (image → video), then
   `ffmpeg -i move.mp4 -vf "fps=15,scale=1280:-2" -c:v libwebp -quality 72 public/frames/f%03d.webp` and set `FRAME_COUNT`.
2. Retune `BEATS` (holds), `focalX` (where the subject sits) and the beat windows in `film.js`.
3. Replace `public/media/*`, the copy, and the `@theme` tokens in `src/styles/main.css`.
4. Deploy: `vercel.json` is ready (framework vite, output dist).

Images and frames are AI-generated for this starter (no third-party assets); code is MIT.
