# Zip site 4: "Visor, FUTURE VISION" (VR headset hero with text-behind-subject video)

Source: `/workspace/uploads/zips/visor.zip` (2.3 MB; = re-sent attachment `f6b24e12…`). Unzipped verbatim here.
Built (388 kB JS / 38 kB CSS), `vite preview` on 127.0.0.1, shot desktop + mobile. Page height is ~one screen (scrollHeight 192 px desktop), so all 5 desktop shots are near-identical.
Note: headless Chromium (no H.264) aborts `hero.mp4`; screenshots show the poster-less first frame. Works in a real browser.
Screenshots: `../screenshots/jpg/visor-00-0pct.jpg`, `visor-mobile-00-0pct.jpg` (+ the rest).

## What it is
A one-screen product hero for a VR headset: glass navbar, a rounded 16:9 video frame where huge "FUTURE VISION" type sits
**behind the person but in front of the background** (same video twice, the top copy masked to the subject), a hover hotspot on the headset that draws
a dot + SVG leader line + glass info card, three angled clip-path cards under the video (buy / learn / reviews), and motion modals.

## Stack
Vite 6 + TS 5.8, React 19, Tailwind v4, **motion 12** (`motion/react`), lucide-react. Fonts: Montserrat 800/900 (title), Outfit (headings), Plus Jakarta Sans (body), Syne. Asset: `public/hero.mp4` (H.264 1280×720, 10 s loop).

## File structure
```
src/App.tsx                          Navbar, 16:9 frame with CinematicHeroVideo, HeroCardsBanner, InteractiveModals
src/components/CinematicHeroVideo.tsx  dual-video occlusion, sync loop, hotspot + leader line + glass card, play/pause
src/components/HeroCardsBanner.tsx   3 angled cards (clip-path classes from index.css)
src/components/InteractiveModals.tsx buy / get-started / learn-more / reviews modals (AnimatePresence)
src/components/Navbar.tsx            glass nav, shared-layout active pill
src/index.css                        fonts, .glass-panel/.glass-nav, polygon clip-paths
```

## Key techniques (reusable, with refs)
1. **Text-behind-subject with one video**: `CinematicHeroVideo.tsx` L100–108 background video (z-0), L113–122 giant title (z-25), L126–138 the same video on top (z-20) with `mask-image: radial-gradient(ellipse 34% 88% at 50% 50%, black 50%, … transparent 85%)` so only the subject occludes the type. Cheap depth with zero 3D.
2. **Frame-locked sync**: L16–23 and L46–56: rAF loop re-seeks the foreground copy whenever drift > 40 ms.
3. **Hotspot annotation**: L144–150 invisible hover zone; L168–254 dot (spring scale), `motion.svg` leader line with `pathLength 0→1` (L185–187), glass card slide-in (L204–206).
4. **Angled card banner**: `index.css` `.polygon-left-card / -center-card / -right-card` clip-paths (≥1024px only), glass panels (`HeroCardsBanner.tsx` L50, L120).
5. **Shared-layout nav indicator**: `Navbar.tsx` L72–75 `layoutId="activeNavIndicator"`, spring 400/30.
6. **Modals**: `InteractiveModals.tsx` L19–30 scrim + scale/y spring entrance under `AnimatePresence`.

## Shaders
None.

## Motion
motion/react springs and `whileHover` scales; no scroll system (no Lenis).

## Type / colour
Montserrat 900 uppercase, −0.035em, 9.5–13vw; light sky `#eaf1f7` page, white glass cards, slate-900 text, cyan selection.

## How to reuse (café)
Lift only the **occlusion trick** (mask a top copy of the hero frame/cup so "Rendez-Vous" sits behind the cup), the **hotspot leader line** (tap a drink in a hero still → price card), and the angled glass card trio for "Commander / La carte / Avis". Not a base: no scroll engine, generic SaaS styling.
