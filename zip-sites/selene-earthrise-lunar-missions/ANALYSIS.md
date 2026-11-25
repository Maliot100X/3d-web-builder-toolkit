# Zip site 2: "SELENE" (Earthrise layered parallax + lunar mission booking)

Source: `/workspace/uploads/zips/selene.zip` (2.8 MB; = re-sent attachment `5f50ec7c…`, package name `lunar`). Unzipped verbatim here.
Built (271 kB JS / 29 kB CSS), `vite preview` on 127.0.0.1, `tools/shoot.mjs` desktop + mobile. No console errors.
Screenshots: `../screenshots/jpg/selene-0{0..4}-*pct.jpg`, `selene-mobile-0{0..4}-*pct.jpg`.

## What it is
A space-tourism landing for lunar missions. Hero: a dust veil you "scroll to clear", then a **6-layer photographic Earthrise**
(sky, earth, moonscape, crater rim, astronaut, ground) moving at different rates with a telemetry HUD. Then a **pinned horizontal reel**
of mission stills, a pinned **SVG trajectory** drawn as you scroll ("384,400 km, drawn as you scroll") with a capsule riding the path and a km counter,
three mission-class cards with orbit rings, and a "Put your name on the manifest" form with a live launch countdown.

## Stack
| Layer | Choice |
|---|---|
| Build | Vite 6 + TS 5.8, React 19 |
| CSS | Tailwind v4, tokens in `@theme` (`src/index.css` L23–45) |
| Scroll | Lenis 1.3 + single rAF (`src/lib/scroll.ts` L14 `startScroll`, L34 `onFrame`, L42 `scrollToHash`) |
| Graphics | DOM layers (`<picture>` d/m WebP) + Canvas 2D dust motes + inline SVG paths; no WebGL |
| Fonts | Michroma (display, tracked caps), Manrope (text), IBM Plex Mono (telemetry) |
| Assets | `public/layers/{d,m}/*.webp` (6 cut layers each), `public/media/cards/m1–m4.webp`, og.jpg |

## File structure
```
src/App.tsx                    Header, Earthrise, MissionLog, Trajectory, Missions, Reserve, Footer
src/content.ts                 brand, nav, hero, intro, log[], trajectory{legs}, missions, reserve
src/components/Earthrise.tsx   pinned 440svh layered parallax + dust canvas + HUD
src/components/MissionLog.tsx  pinned 340svh horizontal reel with focus line
src/components/Trajectory.tsx  pinned 380svh SVG path draw + capsule + km counter
src/components/Missions.tsx    3 cards, CTA pre-fills the form's <select> then smooth-scrolls
src/components/Reserve.tsx     countdown (setInterval 1 s) + validated form with status
src/components/Chrome.tsx      Header (L22), Footer (L57)
src/lib/math.ts, hooks/*       identical to NAÏADE (same author family): clamp/range/pinProgress, useFitText, useReveals, useReducedMotion
```

## Key techniques (reusable, with refs)
1. **Layered photographic parallax from one render**: `Earthrise.tsx` L25–29 (one shared `object-cover` crop keeps layers registered), L69–74 `set(layer, y, scale, opacity)`, L119–129 far→near rates (sky −6vh, earth rises 34→0vh, crater rim scales 1.6→1, astronaut & ground climb), L111 exit tilt where the ground's black apron (L160–162) swallows the frame and hands over to the next section.
2. **Title resolves by tracking**: L131–138: letter-spacing 0.6em → 0.24em + blur 10px → 0, then yields behind the crater (title sits between layer 3 and 4, L169–179).
3. **Dust veil canvas**: L60–106, seeded PRNG motes (140), drift + scale with progress; "scroll to clear the dust" prompt L191–199.
4. **Telemetry HUD**: L140–144 mission clock & elevation driven by scroll progress.
5. **Pinned horizontal reel with focus line**: `MissionLog.tsx` L30–56: `track.translateX(-k·travel)`; each card dims/scales by distance from a focus line at 62vw, inner image counter-drifts (`off·−60px`), progress bar `scaleX(k)`, live `0N` counter.
6. **SVG path drawn by scroll**: `Trajectory.tsx` L52–66: `pathLength={1}` (L142) + `strokeDashoffset 1−k` (L60), capsule placed with `getPointAtLength` (L62), km counter L65–66, leg state via `setLeg` only on change.
7. **CTA → form prefill**: `Missions.tsx` L6–11.
8. **Live countdown + accessible form**: `Reserve.tsx` L8–10, L27, L77 (`noValidate`, `aria-describedby` status).
9. Same `pinProgress` sticky-section math as NAÏADE (`math.ts` L19).

## Shaders
None (Canvas 2D + CSS transforms + SVG).

## Motion
Everything is pinned-section progress → direct style writes in one rAF; `easeOutCubic` everywhere; early-outs when `|Δp| < 5e-5` and when off-screen.

## Type / colour
Michroma tracked caps (`--text-hero clamp(2.25rem,8.6vw,9rem)`, tracking .24em), Manrope 300–700, IBM Plex Mono labels.
Palette: void `#05070c`, void-2 `#0b0f18`, regolith `#c9ccd3`, dust `#8b909b`, earth `#6fb6ff`, sunlit `#f2e6c9`.

## How to reuse (café)
MissionLog reel → per-category drink reels (59 photos, price under each); Trajectory → "Venir" route/hours line; Earthrise layer stack → a terrace/street layered scene (layers cut from one generated image); Reserve → reservation/callback form with "ouvre dans hh:mm" countdown.
