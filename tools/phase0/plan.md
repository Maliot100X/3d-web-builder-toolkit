
## 6. Issues / partial runs (honest list)

| Item | What happened | Fix applied / status |
|---|---|---|
| ANUXR4G/Mage-UI | `next build` fails on an upstream TypeScript error (`@radix-ui/react-alert-dialog` DialogProps) and contentlayer YAML errors; `yarn` berry lockfile | installed with npm `--legacy-peer-deps`; **runs in `next dev`** and was screenshotted |
| meetdarji006/meet-ui | Turbopack build failed (`next/font/google` resolver) | built with `next build --webpack`, served static `out/` ✅ |
| Live2D/CubismWebSamples | Framework submodule is 5-r.5, public Cubism Core available on the box is 5-r.4 / CDN build → `byteLength` error; background renders, **model does not draw** | Core is proprietary (not committed). Needs the matching 5-r.5 Core from the Live2D SDK download (licence click-through) to fully render. pixi-live2d-display path works instead |
| guansss/pixi-live2d-display | `npm run setup` downloads from a dead CDN; submodule URL is SSH | cores copied locally, submodule via HTTPS; playground runs ✅ (model partly off-frame) |
| anushkachauhxn/particle-galaxy-3js | heavy GPU points crash SwiftShader under parallel load | ran alone: 3 shots ✅ |
| moeru-ai/airi | full stage-web builds and runs; chat needs its backend on :6121 (not started) | onboarding screen shots ✅ |
| datascale-ai/opentalking | web client runs; Python/GPU talking-head backend not run (needs GPU) | UI-only ✅ |
| bedimcode/responsive-pirate-website | renders a flat beige page headless (decorative SVG/PNG layers animate in) | low value, kept for completeness |
| IROHAuwu/fbtpods, jofizcd/Soul-of-Waifu | Windows desktop apps (SteamVR driver / PyQt) — no website to run | code studied (Soul-of-Waifu `vrm_module.html` emotion→VRM mapping) |
| hekall21/nothin-paris-luxury | repo is only DESIGN.md | live site https://noth.in screenshotted ✅ |
| deepgram/skills | markdown skills, not a site | installed (skills-library/deepgram) |
| 0xAllan123/animated-landing-page | upstream HEAD now renders a "Dreams Market" garage page (not the MacBook page from the earlier notes) | runs ✅; R3F components still in src/ |
| Skipped on purpose | booth.pm paid item; raw-IP API `13.62.148.110:3001`; Scrolltide MCP (paid) | — |

## 7. Proposed combination plan — real pieces → café sections (NOT built yet; awaiting review)

Base engine: **Halcyon starter** (Vite + GSAP/ScrollTrigger + Lenis + Tailwind 4 + three.js, View Transitions) — it is the quality bar the user picked. Shaders via **vite-plugin-glsl**. Content truth: `cafe-rdv/content/menu.json` (59 drinks, exact prices) + 59 photos.

| # | Café section | Real pieces lifted (source → file) | Skills that drive it |
|---|---|---|---|
| 0 | Preloader | norrav `Loader.tsx` counter timeline + Naiade chapter rail reveal | gsap-timeline, emil-choreograph |
| 1 | Hero film "Art du Rendez-Vous" | **Naiade/Halcyon** scroll-scrubbed WebP frame film (Grok-Imagine pour/latte footage → frames) + **Cyberfiction** canvas sequence pattern; title with **gentlerain** ripple-refraction shader (`script.js` L1-160) as a coffee-surface ripple on cursor; SplitText title per **mojito** `Hero.tsx` | mengto-build-awwwards-quality-sites, gsap-scrolltrigger, iart-shader-glsl |
| 2 | Signature drinks (3) | **Halcyon** `hold.js` product-hold + **Otis** `engine.ts` grab-and-stretch WebGL cup; studio lighting from **0xAllan** R3F `ProductViewer` (Lightformer setup ported to vanilla three); Fresnel rim from **custom-globe** atmosphere shader | threejs-*, mengto-webgl-3d-object, fresh-lightweight-3d-effects |
| 3 | Full menu (all tabs, 59 drinks) | **mojito** `Menu.tsx` tab-slider (prev/next names, image slide-in, details rise) + **spylt** `FlavorSlider.tsx` pinned horizontal reel per category + **Selene** MissionLog pinned reel & drawn trajectory line as the category progress | copilot-gsap-framer-scroll-animation, mengto-scroll-progress-timeline, scroll-world |
| 4 | 3D page-flip menu book | three.js bent-plane page geometry (vertex shader curl) using menu pages; **Visor** mask-image reveal on open; swipe via pointer gestures | threejs-shaders, emil-gestures, gamedev-shader-programming |
| 5 | Drink detail | View Transitions (Halcyon) + **Balaji** `lando-reveal.tsx` lens reveal (photo → ingredients layer) + **Mage-UI** `trailing-image.tsx` (MIT) on gallery hover | vercel-react-view-transitions, mengto-masked-reveal |
| 6 | Gallery | **Mage-UI** parallax-scroll / layout-grid (MIT) + **mojito** `Art.tsx` mask-scale reveal; **meet-ui** marquee (MIT) for photo ribbon | mengto-marquee-loop, ibelick-baseline-ui |
| 7 | Ambient layer | **WebGL-Fluid-Background** (MIT) tuned to milk/espresso palette as cursor "cream pour" behind menu; **quantum-particle-wave** idea → steam particles; **Paper Shaders MeshGradient** warm backdrop (cloth-simulation) | iart-particle-system, fresh-web3d-integration-patterns |
| 8 | Order agent + avatar | VRM stage from **YuriOS** `VrmStage.js` + `Blink.js` + `GazeController.js` + `viseme.js` (Apache-2.0) on **three-vrm** `VRMLoaderPlugin`; viseme weights aa/ee/ih/oh/ou from **utsuwa** `lipsync/analyzer.ts` (MIT); emotion tags → expressions per **Soul-of-Waifu** `vrm_module.html`; Live2D fallback via **pixi-live2d-display** `ParamMouthOpenY`; layout = **utsuwa** landing (avatar beside headline); voice = Deepgram Voice Agent with **server-side token grant only** | neko-avatar-rendering, neko-vrm-physics, deepgram voice-agent, live2d-cubism-web-* |
| 9 | Order bag / QR / contact & hours | Halcyon form patterns + **naborajs** `CommandPalette.tsx` (⌘K "find a drink", MIT) + **Mage-UI** glowing-bento for hours/contact | ibelick-fixing-accessibility, webq-* |
| QA | every phase | Playwright shots (tools/shoot2.mjs), Understand-Anything graph audit, webq-core-web-vitals, mengto-audit-ai-design-slop, mengto-iterate-until-verified | — |

Licence rule for the build: MIT/Apache pieces (Mage-UI, meet-ui, naborajs, WebGL-Fluid, YuriOS, utsuwa, three-vrm, pixi-live2d, Balaji) may be copied with attribution; "none" repos (mojito, spylt, gentlerain, Cyberfiction, 0xAllan, Yash…) are **re-implemented from the studied technique**, never pasted.
