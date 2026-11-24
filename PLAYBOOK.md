# PLAYBOOK — the 3D / animated web builder brain

Read this before every web project. It is the contract: **no phase is skipped, no phase starts before the previous
phase's exit checklist is green, and the whole site is never "bulk generated" in one go.**

---

## 0. Canonical stack

| Concern | Default (CDN / single-page) | Default (Vite build — preferred) | Bigger app option |
|---|---|---|---|
| Build | — | **Vite 6** (`npm create vite@latest`, vanilla) | Vite + React 19 (or Next.js when SSR/SEO-heavy) |
| 3D | `three@0.160.0` `https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js` (+ importmap for `three/addons/`) | `three@0.160.0` (npm, code-split via dynamic `import()`) | **React Three Fiber + drei** (`@react-three/fiber`, `@react-three/drei`), `@react-three/postprocessing` |
| Animation | `gsap@3.12.5` + `ScrollTrigger` (`https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`, `.../ScrollTrigger.min.js`) | `gsap@3.12.5` npm | `@gsap/react` `useGSAP` |
| Smooth scroll | `lenis@1.1.18` `https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js` | `lenis@1.1.18` + `lenis/dist/lenis.css` | same; `lenis/react` |
| CSS | `https://cdn.tailwindcss.com` (prototype only) | **Tailwind v4** via `@tailwindcss/vite`, tokens in `@theme` | + shadcn/ui registries (Aceternity, Magic UI) |
| Icons | `https://unpkg.com/lucide@latest` | `lucide` (named imports + `createIcons`) | `lucide-react` |
| Fonts | Google Fonts: **Chakra Petch** 500/600/700 (display), **Sora** 300–600 (body), **IBM Plex Mono** 400/500 (labels) | same, `preconnect` + `display=swap` | Fontshare (Satoshi) as alt |
| Shaders | inline template strings | `?raw` imports of `.vert/.frag/.glsl` | `vite-plugin-glsl` for `#include` |
| Deploy | — | **Vercel** (`vercel.json`, framework `vite`, output `dist`) | Vercel |
| QA | — | Playwright (`npm run qa`), ESLint 9 flat config | + Chrome DevTools MCP traces |

Pin exact versions of three/gsap/lenis (APIs drift). The working reference implementation is [`starter/`](starter/).

---

## 1. Techniques catalog (zip sites first, then repos)

### From the user's zip sites (highest priority)
| Technique | How | Source |
|---|---|---|
| Grab-and-stretch mesh warp | 128² UV grid; vertex shader offsets each vertex by `exp(-d²/2σ²)` of distance to up to 4 grab anchors; σ grows with pull length | zip 1 `otis…/src/face/engine.ts` (faceVert) |
| Damped spring snap-back | per-slot `v += (-k·x - c·v)·dt` with k=260, c=11 | zip 1 engine.ts |
| Multi-pointer input | slot per `pointerId`, `setPointerCapture`, passive:false touch path | zip 1 FaceCanvas.tsx |
| Alpha-map hit-test | downsampled alpha copy decides if a press grabs the sprite | zip 1 FaceCanvas/engine |
| Texture crossfade states | two samplers + `uMix`, short fade, random state on release, file-fail fallback | zip 1 engine.ts + content.ts |
| Masked procedural tint | gaussian blobs × skin mask (`r−b` threshold) → blush/flush | zip 1 faceFrag |
| Break-out-of-frame | clip below disc centre, overflow above (`max(step(), inDisc)`) + analytic AA `1/(size·dpr)` | zip 1 faceFrag |
| Canvas over DOM, separate hit layer | canvas `pointer-events:none`, labelled hit element for a11y | zip 1 FaceCanvas.tsx |
| Fit-to-width headline | measure at 100px → scale to parent width; refit on `fonts.ready` + ResizeObserver; publish `--mega` | zip 1 hooks.ts (also in starter poster.js) |
| Live state UI | `aria-live` mood meter, `color-mix(in oklab, …)` bar | zip 1 App.tsx |
| Theme tokens | `@theme inline` mapped to CSS vars, `data-theme`, theme-color meta | zip 1 index.css/hooks.ts |
| *(zips 2–4: pending re-upload — add rows here after study)* | | |

### From the reference repos
| Technique | How | Source |
|---|---|---|
| Ripple-refracted headline | 2 ping-pong RTs (Half/FloatType), wave eq. with 4 neighbours, gradient in BA; composite samples a CanvasTexture at `uv + grad·k` | gentlerain `script.js` → **starter `ripple-*.frag`** |
| Lenis ⇄ ScrollTrigger | `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)` | gentlerain, norrav → starter `smooth-scroll.js` |
| Locomotive + scrollerProxy | `ScrollTrigger.scrollerProxy('#main', {...}); pinType` | Lagunitas (legacy; prefer Lenis) |
| Pinned horizontal gallery | `x: -(scrollWidth - innerWidth)`, `pin:true, scrub:1, invalidateOnRefresh` | Lagunitas, 0xAllan `Showcase.jsx` → starter |
| Scrubbed word-opacity manifesto | split words, `opacity .12→1`, stagger, scrub | gentlerain-style → starter |
| Product model viewer | `useGLTF` (gltfjsx `-transformed.glb`), `PresentationControls`, `Environment`+`Lightformer`, `useVideoTexture` screens | 0xAllan `ProductViewer.jsx`, `StudioLights.jsx` |
| Baked 3D room hero | low-poly GLB + baked textures, camera moves per section, opt-in audio | Yash portfolio-3d |
| Navier-Stokes fluid bg | dye/velocity/pressure/curl passes, config JSON | tkabalin WebGL-Fluid-Background |
| Preloader → intro timeline | counter/curtain then hero stagger | norrav `Loader.tsx` |
| Pure-CSS fallback motion | keyframe typing/spin/slide | nishatrhythm style.css |
| Registry component libraries | shadcn-format registry, cobe globe, particles | Mage-UI |
| Skeletal 2D characters | Spine player runtime, export frames to video | BD2-L2D-Viewer |
| Noise-displaced iridescent blob | simplex noise along normal + fresnel + IQ cosine palette | **starter `blob.*`** (Ashima noise MIT) |

---

## 2. Performance & accessibility rules (non-negotiable)

1. **DPR cap**: `Math.min(devicePixelRatio, coarsePointer ? 1.5 : 2)`. Simulations at ½ resolution.
2. **One RAF**. GSAP ticker drives Lenis; the WebGL loop is the only other RAF. Never add a third.
3. **Pause** on `visibilitychange` (hidden) and when the canvas is off-screen (IntersectionObserver) if it's not fixed.
4. **Dispose** every geometry, material, texture, render target and the renderer on teardown/HMR (`import.meta.hot.dispose`).
5. **Code-split three**: `await import('./scene/stage.js')` after first paint; content is complete without WebGL.
6. **Fallback**: no WebGL2 → `.no-webgl` CSS gradient; DOM `<h1>` is the accessible source, canvas `aria-hidden`.
7. **prefers-reduced-motion**: wrap all choreography in `gsap.matchMedia()`; reduced = no Lenis, no pin/scrub, no reveals,
   stage renders a still frame (redraw on scroll only). CSS: kill transitions/animations.
8. **Animate transforms/opacity only**; use `ScrollTrigger.batch` for grids; `will-change` only on animated nodes.
9. **Mobile**: lower geometry detail (ico detail 28 vs 64), fewer particles, no hover-only affordances, `svh` units,
   test 390×844 @2x. Touch listeners passive unless you must `preventDefault`.
10. **Assets**: glTF via gltf-transform (Draco/meshopt + KTX2/WebP), ≤ 2 MB hero budget, `preload` hero image, fonts `display=swap`.
11. **A11y**: skip link, `aria-label` on split text (spans `aria-hidden`), visible `:focus-visible`, colour contrast ≥ 4.5:1,
    keyboard reachable nav, `aria-live` for dynamic status, no information only in canvas.
12. **SEO**: title/description/OG, semantic sections, one `h1`.

## 3. Error pitfalls (seen in the references or common)

- Two scroll engines (Locomotive + Lenis, or Lenis + native smooth) → jitter. Pick Lenis only.
- Forgetting `ScrollTrigger.refresh()` after fonts/images load → pins at wrong offsets. (`document.fonts.ready.then(refresh)`.)
- `pin` inside a transformed parent → broken pins; pin a direct section.
- `@studio-freight/lenis` (deprecated) vs `lenis` (current) — use `lenis`.
- three r150+ colour management: set `texture.colorSpace = SRGBColorSpace` on colour textures (r160 has no `encoding`).
- FloatType render targets fail on some mobiles → use `HalfFloatType`.
- Canvas text drawn before webfont loads → wrong font in texture; `await document.fonts.load()` then redraw.
- `gsap.from()` on elements hidden by CSS ends at the hidden value; prefer `gsap.set` + `to` inside matchMedia.
- Missing vendor files → 404s (GameOver) — Phase 8 fails on any console error/`requestfailed`.
- Tailwind CDN in production (slow, warns) — use `@tailwindcss/vite`.
- Unbounded GLSL loops / dynamic indexing on GLES — keep loop counts constant (`for (int i=0;i<SLOTS;i++)`).
- Heavy `backdrop-filter` over a full-screen WebGL canvas costs GPU on mobile — limit glass panels.
- Committing `node_modules`, `.env`, nested `.git` → check `git status` before every commit.

---

## 4. The mandatory 9-phase process

Each project gets `PROJECT.md` with this checklist copied in and ticked as you go. Report to the user at the end of
each phase (what was done, screenshot if visual, what's next). **Ask before anything paid or public.**

### Phase 1 — Brief analysis + architecture audit
- **Entry**: user request received.
- Do: restate goal, audience, pages/sections, must-have interactions, brand/assets, deadline; collect references
  (zip sites first); if an existing repo — audit it (Understand-Anything / read tree, deps, build); pick CDN vs Vite vs R3F;
  write sitemap + section list + interaction list + risk list (perf, licences, assets).
- **Exit**: `PROJECT.md` has brief, sitemap, stack decision with reasons, phase plan; open questions listed (ask user only if blocking).

### Phase 2 — Tool / skill setup
- **Entry**: Phase 1 exit.
- Do: load skills needed for this brief (gsap-*, threejs-*, frontend-design/impeccable/taste, emil-animate, webq-*);
  check connectors (GitHub, Vercel; optional Context7/Playwright/shadcn MCP); verify `node -v`, `gh auth status`, Vercel access;
  fetch current docs for any lib whose version differs from §0.
- **Exit**: list of loaded skills + tools written to PROJECT.md; nothing paid connected without approval.

### Phase 3 — Design system
- **Entry**: Phase 2 exit.
- Do: moodboard from references; tokens (colour roles, type scale with clamp(), spacing, radii, easing curves,
  durations); font pairing; motion principles (what moves, what never moves); component inventory; dark/light decision.
- **Exit**: tokens in `src/style.css @theme`; a one-page style sample renders; contrast checked.

### Phase 4 — Scaffold
- **Entry**: Phase 3 exit.
- Do: copy `starter/` (or `npm create vite`), pin versions, folder layout (`src/scene`, `src/motion`, `src/lib`, `src/sections`),
  ESLint, `vercel.json`, `.gitignore`, README; `git init`; empty sections with semantic HTML + real copy placeholders.
- **Exit**: `npm run build` + `npm run lint` pass; page renders unstyled-but-complete with JS disabled.

### Phase 5 — 3D scene
- **Entry**: Phase 4 exit.
- Do: stage module (renderer, camera, resize, DPR cap, loop, dispose), models through gltf-transform, shaders in files,
  pointer interaction, state object for GSAP, WebGL fallback, reduced-motion still frame.
- **Exit**: hero renders at ≥ 50 fps desktop / acceptable on 390×844 swiftshader screenshot, 0 console errors, dispose verified on HMR.

### Phase 6 — Animation / scroll choreography
- **Entry**: Phase 5 exit.
- Do: Lenis wiring; intro timeline; one master scrubbed timeline that maps page progress → scene state; section reveals
  (batch), pins, split text, counters, marquee; all inside `gsap.matchMedia()` with reduced-motion branch.
- **Exit**: scroll through top→bottom with no jumps; pins correct after `refresh`; reduced-motion profile shows complete content.

### Phase 7 — Content, sections + responsive
- **Entry**: Phase 6 exit.
- Do: final copy, images (AVIF/WebP, sizes), forms, footer, meta/OG/favicon; breakpoints 390 / 768 / 1024 / 1440 / 1920;
  touch alternatives for hover; landscape phone check.
- **Exit**: every breakpoint screenshot reviewed; no overflow-x; tap targets ≥ 44 px.

### Phase 8 — QA
- **Entry**: Phase 7 exit.
- Do: `npm run lint`, `npm run build`, `npm run qa` (Playwright desktop/mobile/reduced, scroll stops, fails on console errors
  and page errors); Lighthouse/CWV via webq skills or Chrome DevTools MCP; keyboard pass; licence check of every asset.
- **Exit**: **zero console errors**, build + lint green, screenshots saved in `qa-screenshots/`, perf notes recorded.

### Phase 9 — GitHub push + Vercel deploy
- **Entry**: Phase 8 exit **and user approval** to publish.
- Do: `git status` clean of secrets/node_modules/dist; `gh repo create <owner>/<name> --public --source . --push`
  (or push to existing); Vercel: import repo or `vercel deploy --prod` (Vercel MCP/CLI), set env vars, check build logs,
  smoke-test the production URL with `npm run qa -- --url <prod-url>`.
- **Exit**: repo URL + production URL reported; QA passes against production; README updated with links.
