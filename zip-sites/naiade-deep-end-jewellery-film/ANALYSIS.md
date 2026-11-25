# Zip site 3: "NAÏADE, The Deep End" (scroll-scrubbed jewellery film + shop)

Source: `/workspace/uploads/zips/naiade.zip` (18.1 MB, 990 files; = re-sent attachment `33b26539…`). Unzipped verbatim here.
Built with `npm i && npm run build` (275 kB JS / 37 kB CSS), served with `vite preview` on 127.0.0.1, shot with `tools/shoot.mjs`.
Screenshots: `../screenshots/jpg/naiade-0{0..4}-*pct.jpg` (1440×900) and `naiade-mobile-0{0..4}-*pct.jpg` (390×844). No console errors.

## What it is
A one-page fine-jewellery launch. The whole page is **one pinned 1500svh stage** that plays a 481-frame film as you scroll
(wide shot → crane up to the model's face → macro on the earring → down the neck to the pendant → down to the ring hand → rewind).
At each hold an ivory **product card slides in from the side** (bottom sheet on phones), the film narrows and re-crops around the jewel,
and you can add the piece to a bag drawer. It ends with a "Book a private viewing" set grid and a fit-to-width NAÏADE wordmark footer.

## Stack
| Layer | Choice |
|---|---|
| Build | Vite 6 + TypeScript 5.8 (`tsc --noEmit` lint) |
| UI | React 19, no router, no state lib (`useSyncExternalStore` bag) |
| CSS | Tailwind v4 (`@tailwindcss/vite`), tokens in `@theme` (`src/index.css` L5–28) |
| Scroll | Lenis 1.3 driven by **one rAF loop** (`src/lib/scroll.ts`), components subscribe with `onFrame` and write styles directly (no React re-render on scroll) |
| Graphics | Canvas 2D `drawImage` of pre-decoded WebP frames (no WebGL, no `<video>`) |
| Fonts | Bodoni Moda (display, opsz 96), Albert Sans (text), Martian Mono (labels), Google Fonts |
| Assets | `public/frames/d/c001–c481.webp` (12 MB desktop), `public/frames/m/…` (7 MB mobile), 3 product cut-outs in `public/media/` |

## File structure
```
index.html                  fonts, preload c001.webp (fetchpriority high)
src/App.tsx                 Preloader, Nav, Stage, Closing, Footer, BagDrawer, .grain overlay
src/content.ts              ALL copy: brand, nav, hero, products[] (id, name, price, material…), outro, closing, footer, formatPrice
src/lib/frames.ts           FRAME_COUNT=481, FPS=24, frameUrl, coarse-to-fine loader (6 workers)
src/lib/timeRemap.ts        monotone-cubic (Fritsch–Carlson) scroll→film-time speed ramp
src/lib/timeline.ts         BEATS (holds), CARDS windows, cardAmount, HERO_OUT/OUTRO_IN, FOCAL track
src/lib/scroll.ts           Lenis + single rAF + onFrame/scrollToHash/scrollToY
src/lib/math.ts             clamp, lerp, range, easeOutCubic, pinProgress (shared with SELENE)
src/lib/bag.ts              tiny external store (add/set/open/flash)
src/components/Stage.tsx    THE engine: canvas, playhead chase, cards, hero blur-out, outro masks, chapter rail, motion blur
src/components/ProductCard.tsx   slide-in card (side panel desktop / bottom sheet mobile), qty, add to bag
src/components/BagDrawer.tsx     toast pill + right drawer + checkout CTA
src/components/{HeroCopy,Outro,ChapterRail,Preloader,Nav,Closing,Footer}.tsx
src/hooks/useFitText.ts     single-line wordmark fills its parent exactly (ResizeObserver + fonts.ready)
src/hooks/useReveals.ts     IntersectionObserver + MutationObserver `[data-reveal]` → `.is-in`
```

## Key techniques (reusable, with refs)
1. **Frame film, never `<video>`**: `frames.ts` L1–8 rationale; `loadOrder` L20–32 loads the hold frames first, then every 32nd, 16th… so fast scrollers always have a neighbour; `loadFrames` L46–78 paints the hero frame alone first, then 6 parallel workers.
2. **Speed ramping like an editor**: `timeRemap.ts` L97–149 `createRemap(beats)`: monotone cubic Hermite so holds are flat (slow-mo) and travels steep, never running backwards. `speed(u)` gives relative playback speed.
3. **Beats as data**: `timeline.ts` L166–178 `BEATS` `[scrollU, filmSeconds]` pairs; card windows L184–188; `cardAmount` L191–197 (ease-out in, cubic out).
4. **Playhead chase**: `Stage.tsx` L114–119: the playhead chases the remapped target at `max(1.25, |diff|·3.2)` film-s/s, so it never stutters slower than real time and catches up on flicks.
5. **Focal-aware cover crop**: `Stage.tsx` L69–78 `draw()` cover-fits around a focal point from `timeline.ts` L211–226 `FOCAL`, so when a card takes 41vw (L188–202) the jewel stays in frame; portrait phones get the same steering.
6. **Lean-in zoom + drift during holds**: L204–207 (`zoom = 1 + .06·card + .035·hold`).
7. **Motion-blur trail at speed**: L209–219: previous frame lingers via `globalAlpha` when velocity > 2.2 film-s/s.
8. **Hero type blur-out stagger**: L139–151 (opacity, `blur(14px)`, −26px per `[data-out]` node).
9. **Outro lines rise out of masks**: L154–164; **chapter rail** with fill var L167–176; dirty-key render skip L180–184 (repaints only when frame/card/outro change).
10. **Slide-in product card**: `ProductCard.tsx` L25–33 (side panel `clamp(420px,41vw,640px)` / mobile 68svh sheet), `[data-k]` inner stagger driven from `Stage.tsx` L92–104; image cut-out with radial `mask-image` L66.
11. **Bag**: `bag.ts` L19–47 external store; `BagDrawer.tsx` L35 toast pill, L54 scrim, L61 drawer (`ease-drawer`).
12. **Preloader**: counts real decoded frames (`READY_AT = 28`, `Stage.tsx` L13/L39), lifts with `clip-path: inset(0 0 100% 0)` (`Preloader.tsx` L29–30), has a timeout fallback.
13. **CSS craft**: `index.css` L84–98 `[data-reveal]` blur-rise; L100–116 animated SVG-noise film grain; L118–137 hover glint sweep on buttons; L139 bag-count bump.
14. **Fit wordmark**: `useFitText.ts` (probe size × available/natural), used by `Footer.tsx` L8.

## Shaders
None. All imagery is Canvas 2D + CSS. The "3D" is photographic: a generated camera-move film scrubbed by scroll.

## Motion
Lenis `lerp 0.09, wheelMultiplier 0.9` (`scroll.ts` L16 in `startScroll`). Eases: `--ease-silk cubic-bezier(.2,.7,.1,1)`, `--ease-drawer cubic-bezier(.7,0,.2,1)`. Reduced motion: Lenis off, native scroll (`useReducedMotion`).

## Type / colour
Bodoni Moda 400 at opsz 96, line-height .86, −0.02em, italic accents (`.display em`); Albert Sans 300–600; Martian Mono 300 micro labels (0.625rem, .14em, uppercase).
Palette (`index.css` L5–16): ink `#060809`, ink-2 `#0d1112`, bone `#ece8e2`, stone `#d6d1cb`, mist `#8d9696`, paraíba `#2bf0ee`, paraíba-deep `#07b9cf`, pool `#9ff2f6`.

## How to reuse (café)
This is the best fit for a café: film holds = signature drinks, product cards = drink cards with exact price + "Ajouter", bag = the order handed to the voice agent. Swap `frames/`, `content.ts`, `BEATS`/`CARDS`/`FOCAL`, palette and fonts. See `/workspace/cafe-rdv/ARCHITECTURE.md`.
