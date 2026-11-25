---
name: 3d-web-build-process
description: Mandatory phased process (1-9), design bar and canonical stack for building art-directed, cinematic-scroll websites (scroll-scrubbed frame films, editorial type, GSAP ScrollTrigger, Lenis, Tailwind, Vite, Vercel; three.js only when the subject needs it). Use whenever the user asks to build, redesign, or prototype a website, landing page, portfolio, or web UI — before writing any code.
---

# 3D web build process

Never bulk-generate a whole site. Work phase by phase; each phase has an exit check that must pass before the next.
Report to the user after each phase. Ask before anything paid, public, or irreversible.
Full details, techniques and pitfalls: `PLAYBOOK.md` in https://github.com/Maliot100X/3d-web-builder-toolkit.
Working starter: `starter/` in that repo (copy it for Phase 4). Quality bar: `DESIGN-BAR.md`. Read it first.

## Design bar (short)
One subject with its own world. The hero is a camera move pre-rendered to WebP frames and scrubbed by scroll with holds
(never `<video>` seeking). Giant fitted type that interacts with the subject. A display serif with italic emphasis, a sans and
mono labels. A palette sampled from the photography. Commerce cards land during holds. WebGL only where it means something.
**Never**: spinning cubes or primitives, generic noise blobs or orbs, stock particles or starfields, template gradients or
glassmorphism, neon "tech" fonts by default, identical icon cards, fake preloaders.

## Stack (pin these)
gsap@3.12.5 + ScrollTrigger · lenis@1.1.18 · Tailwind v4 (@tailwindcss/vite) · Vite 6 · frame film on canvas (no lib).
Fonts: Fraunces / Bodoni Moda / Instrument Serif (display) + Sora / Albert Sans (body) + IBM Plex Mono / Martian Mono (labels).
Only if needed: three@0.160.0 (code-split) or React 19 + R3F + drei + @gsap/react.
Deploy: Vercel (vercel.json, output dist). QA: Playwright + ESLint.

## Phases
1. **Brief + architecture audit** — goal, audience, sections, interactions, assets, references (user's zip sites first), stack choice → PROJECT.md.
2. **Tool/skill setup** — load gsap-*, threejs-*, frontend-design/impeccable, emil-animate, webq-* skills; check GitHub/Vercel; fetch docs for any version drift.
3. **Design system**: subject, world and photography first (DESIGN-BAR self-check); tokens in `@theme` (colours, clamp() type scale, easing, durations), fonts, motion principles; contrast check.
4. **Scaffold**: copy starter, pin versions, folders gl/motion/lib/ui, ESLint, vercel.json, .gitignore; build + lint pass; page complete without JS.
5. **Hero medium**: by default, render or generate the camera move, extract WebP frames, and wire film.js (beats, holds, focal crop, coarse-to-fine loading, poster fallback). For real-time 3D: DPR cap, single RAF, dispose, code-split three. Reduced-motion still frame either way.
6. **Animation/scroll** — Lenis driven by gsap.ticker + ScrollTrigger.update; intro timeline; the film timeline plus pinned chapters and clip-path reveals; batch reveals, pins, split text; all inside gsap.matchMedia with a reduced-motion branch; refresh after fonts.
7. **Content + responsive** — real copy, optimized images, meta/OG; check 390/768/1024/1440/1920; no overflow-x; touch alternatives.
8. **QA** — `npm run lint && npm run build && npm run qa` (desktop, mobile, reduced-motion screenshots; fail on any console/page error); perf + a11y audit.
9. **GitHub + Vercel** — with user approval: clean git status (no secrets/node_modules/dist), push via gh, deploy on Vercel, re-run QA against the production URL, report both URLs.

## Hard rules
- Transforms/opacity only; one RAF; HalfFloat render targets; `texture.colorSpace = SRGBColorSpace`.
- DOM holds the accessible content; canvas is `aria-hidden`.
- Respect licences of references: study "no licence" repos, never copy their code/assets.
- Zero console errors at ship.
