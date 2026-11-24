# 3D web starter (Vite · three@0.160.0 · gsap@3.12.5 · lenis@1.1.18 · Tailwind v4 · Lucide)

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build      # → dist/
npm run qa         # build first; Playwright desktop/mobile/reduced-motion screenshots, fails on console errors
```

## What's inside
| File | Role |
|---|---|
| `index.html` | Semantic sections (hero, manifesto, pinned gallery, marquee, craft grid, numbers, contact), fonts, meta |
| `src/main.js` | Boot: icons, WebGL feature-detect, code-split stage, Lenis, choreography, HMR teardown |
| `src/scene/stage.js` | Fixed full-viewport Three.js stage: ripple sim (ping-pong HalfFloat RTs) refracting a canvas-drawn poster + noise-displaced iridescent blob + dust. DPR cap, pause on hidden tab, full dispose |
| `src/scene/poster.js` | Draws gradient + fit-to-width headline into a 2D canvas → texture |
| `src/scene/shaders/*` | `ripple-sim.frag`, `ripple-composite.frag`, `blob.vert/.frag`, `noise.glsl` (Ashima, MIT), `fullscreen.vert` |
| `src/motion/smooth-scroll.js` | Lenis ⇄ GSAP ticker ⇄ ScrollTrigger wiring, anchor links via Lenis |
| `src/motion/choreography.js` | All GSAP inside `gsap.matchMedia()`: intro, master scrub → stage state, word scrub, masked rises, pinned horizontal gallery, batch reveals, counters, velocity marquee; reduced-motion branch |
| `src/motion/split.js` | Accessible word splitter (aria-label on parent) |
| `src/lib/env.js` | reduced-motion, coarse pointer, WebGL2 detect, DPR cap |
| `src/style.css` | Tailwind v4 `@theme` tokens (fonts, colours, clamp type scale), fallbacks, focus styles |
| `vercel.json` | Vite framework, immutable asset caching, security headers |
| `scripts/qa.mjs` | Phase 8 QA runner |

Customize: change `data-title` / `data-kicker` on `<body>` (drawn into the WebGL poster), tokens in `style.css`,
scene state keyframes in `choreography.js` (§2 master timeline).

Deploy: push to GitHub → import in Vercel (framework auto-detected) or `vercel deploy --prod`.
