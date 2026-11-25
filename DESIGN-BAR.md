# DESIGN-BAR — what "premium" means here

The bar is the user's zip sites and the Scrolltide library (https://www.scrolltide.co/: Sprig, SÈVE, Aerie, Solano,
Standby, MIRÉ, Perch, MOLT, Sable, Landside, NAÏADE, SELENE, Otis…). They're **art-directed editorial sites with cinematic
scroll**, not WebGL demos. Read this before Phase 3 (design) and check every phase's output against it.
Evidence for all of it is in [`scrolltide/`](scrolltide/) (screenshots, 12-frame contact sheets of each preview film, NOTES.md).

## 1. What makes them premium

1. **A subject, not an effect.** Every site sells one specific thing (a soda can, a perfume flask, a jacket, a record
   shelf, jewellery) with its own world, palette and copy. The motion exists to show that product. Nothing decorative moves.
2. **The scroll is a film.** The hero is a camera move (dolly, orbit, zoom through an eye, astronaut rising over the
   Moon) scrubbed by the scrollbar, normally from a **pre-rendered frame sequence** on `<canvas>`, not real-time 3D. Scroll
   progress is remapped like a film edit: **holds** where copy needs reading, **fast-forwards** between beats.
3. **Typography does the shouting.** Huge wordmarks fitted to the viewport width (MI RÉ with the model between the
   letters, NAÏADE, EARTHRISE, "Halcyon"). A high-contrast display serif with **italic emphasis on one or two words**
   ("Three pieces, *One* night swim") over a quiet sans, and **mono micro-labels** for metadata (`LOOK 01 · A FULL TURN`).
4. **Photography is the material.** Every frame is a real (or rendered) photograph with its own light: night pool, mint
   lake, chrome puffer on white. There are no stock gradients and no abstract shapes standing in for content.
5. **The palette is sampled from the imagery.** Near-black ink and a warm bone or ivory, plus **one** accent taken from the
   product (Sprig's flavour colours, MIRÉ's oxblood plus blush pink, SÈVE's mint).
6. **Editorial grid.** A 12-column grid with asymmetric placements, numbered sections `(01) — The house`, staggered
   product cards, generous empty space, and copy columns about 40ch wide.
7. **Commerce woven into the story.** Product cards slide in as the camera settles, a "bag (0)" counter ticks, there are
   pack builders (Sprig's 12-pack), and a guest-list or waitlist form closes the page.
8. **3D only where it's integral**: the SÈVE flask, the Solano shop interior, the Sable shelf, the MOLT exploded layers.
   It is lit and art-directed like product photography, and often baked to frames anyway.
9. **Craft details.** A preloader that counts real loading, a chapter rail or progress, grain, masked line reveals,
   one easing family, `svh` units, no sideways scroll at 390/768/1280/1920, and a full reduced-motion branch.

## 2. Patterns to reuse (all implemented in `starter/`)

| Pattern | How | Starter file |
|---|---|---|
| Scroll-scrubbed frame film | 100–200 WebP frames, sticky 100svh stage inside a 4–6×vh section, `canvas.drawImage(nearest(frame))` | `src/motion/film.js` |
| Coarse-to-fine frame loading | load frame 0, then every 16th, 8th, 4th…, with a 6-worker pool; nearest-loaded fallback | `src/lib/frames.js` |
| Time remap with holds | piecewise smoothstep `[[u,t]…]` beats; flat = hold, steep = travel | `film.js` `BEATS` |
| Focal-point cover crop | the subject's x-position over time keeps it in frame on portrait screens | `film.js` `focalX` |
| Beats and captions | copy windows `rise → hold → fall` keyed to film progress | `film.js` + `lib/math.js window4` |
| Stage closes into a card | `clip-path: inset(… round 28px)` at the end of the film, handing over to the paper section | `film.js` |
| Masked line and word reveals | `.line-mask > span` yPercent 108→0; scrubbed word rise for the manifesto | `motion/choreography.js`, `split.js` |
| Pinned chapter storytelling | sticky media column; next image wipes up with `clip-path` and scale settle, chapter counter | `choreography.js` |
| Window → full-bleed image | `clip-path: inset(12% 22% round 28px) → inset(0)` plus inner parallax | `choreography.js` |
| Fit-to-width wordmark | measure at 100px, scale to the container, refit on fonts/resize; letters rise | `fitText()` |
| Preloader that counts work | % of frames and fonts, with a 4 s ceiling | `ui/preloader.js` |
| Page transition | cross-document View Transitions (`@view-transition`) with a shared `view-transition-name` on the product image; ink-curtain fallback | `motion/transitions.js`, `piece.html` |
| Purposeful WebGL | one shared tiny WebGL1 canvas; liquid ripple on the hovered product photo only (fine pointer, motion OK) | `gl/hover-distort.js` |
| One clock | the GSAP ticker drives Lenis; ScrollTrigger updates on Lenis scroll; the film renders in the same ticker | `motion/scroll.js` |

Also seen and worth adding per brief: six-layer photographic parallax (SELENE), horizontal mission reels, product tag
cards that follow the model (Solano), pack/configurator builders (Sprig), exploded-layer product diagrams (MOLT),
360° turn on scroll (MIRÉ).

## 3. Anti-patterns: never ship these

- ❌ **Spinning cubes, torus knots, floating icosahedra**, or any primitive as the hero.
- ❌ **Generic noise blobs** or iridescent spheres ("liquid metal orb") with no relation to the brand. *(The toolkit's own v1 starter did this. It was rejected.)*
- ❌ **Stock particle fields**, starfields, network/constellation lines, "matrix" rain.
- ❌ **Template gradients**: purple→blue mesh, aurora backgrounds, glassmorphism cards on a gradient.
- ❌ Neon cyber palettes and **Chakra/Orbitron-style "tech" display faces** unless the brand really is that.
- ❌ An orbit-controls model viewer as a substitute for art direction.
- ❌ Motion that doesn't carry meaning: everything fading up the same way, bouncy easing, parallax on every element.
- ❌ `<video>` scrubbing on scroll (seeks drop under fast scroll; use frames).
- ❌ Lorem ipsum, "Feature 1/2/3", emoji bullets, three identical icon cards.
- ❌ Centre-everything symmetric layouts with uniform type sizes.
- ❌ Fake preloaders with timers; spinners.
- ❌ Hover-only information on touch; sideways scroll on mobile; no reduced-motion branch.
- ❌ Multiple scroll engines or multiple rAF loops.
- ❌ Hotlinking someone else's assets (Scrolltide's R2 bucket in particular). Generate or license your own.

## 4. Self-check before showing anything

- Could a screenshot of the hero be mistaken for a template demo? → redo it.
- Is there a real subject photographed or rendered with intent? Is the palette sampled from it?
- Does the type have a display serif or grotesk at ≥ 9vw somewhere, italic emphasis, and mono labels?
- Does the scroll tell a story with holds, or does it just reveal boxes?
- Is any 3D or WebGL removable without losing meaning? If yes, remove it.
- 390 px screenshot: still composed, with no overflow and the subject in frame?
