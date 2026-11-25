# Reference repos & sites — URLs, licences, notes

Shallow clones (`--depth 1`) live on the box at `/workspace/3d-web-toolkit/references/<owner>__<repo>/`
(~1 GB incl. a 4.7 GB BD2 asset repo) and are **not vendored** in git — re-create them with
`bash references-notes/clone-all.sh`. Static ones were served and screenshotted into `references-screenshots/`.

Licence column: what the repo declares. "none" = all rights reserved → study only, never copy code/assets.

| Repo | Licence | Stack | What to learn (technique → where) |
|---|---|---|---|
| [manish-850/gentlerain.ai](https://github.com/manish-850/gentlerain.ai) | none | HTML/CSS/JS, three (CDN), GSAP+ScrollTrigger, **Lenis** | **Ripple height-field sim** (2 ping-pong float RTs, 4-neighbour wave eq.) refracting a `CanvasTexture` headline — `script.js` L1-160. Lenis⇄ScrollTrigger sync via `gsap.ticker` — L368-381. Scrubbed section transitions L200-330. *Adopted in starter.* |
| [tkabalin/WebGL-Fluid-Background](https://github.com/tkabalin/WebGL-Fluid-Background) | MIT | vanilla WebGL | Full Navier-Stokes dye/velocity/pressure/curl solver (PavelDoGreat port) as page background; tunable via `config.json` (SIM_RESOLUTION 128, DYE 1024, PRESSURE_ITERATIONS 20, SUNRAYS, BLOOM). Drop-in when a brief wants "liquid / smoke cursor". |
| [Yashchauhan008/portfolio-3d](https://github.com/Yashchauhan008/portfolio-3d) ([live](https://yash-chauhan.vercel.app/)) | none | three (bundled), GSAP+ScrollTrigger, GLB room, sounds | Cozy isometric **3D room hero** (character at desk, baked-lighting GLBs), click-to-enable sound, scroll moves camera through sections; bundled `index.js` (42k lines). Pattern: baked textures + low-poly GLB = cheap & pretty. |
| [0xAllan123/animated-landing-page](https://github.com/0xAllan123/animated-landing-page) | none | Vite + React 19 + **R3F + drei** + GSAP (`@gsap/react`) + Tailwind 4 + zustand | Apple-style product page: `useGLTF` gltfjsx-transformed MacBooks, `PresentationControls`, `Environment`+`Lightformer` studio lights, `useVideoTexture` on screen, pinned+scrubbed `Showcase`, `Performance` scrub timelines. Best R3F reference. |
| [peyush-nuwal/norrav-landing-page](https://github.com/peyush-nuwal/norrav-landing-page) ([live](https://norrav-landing-page.vercel.app/)) | none | Next.js + GSAP + ScrollTrigger + Lenis (`@studio-freight/lenis`, old pkg) + motion | Studio landing: preloader timeline, Lenis `ScrollProvider`, pinned scrubbed testimonials, stagger reveals; idle-user hook. Use `lenis` (new pkg) not `@studio-freight/lenis`. |
| [developermickey/Lagunitas-Website-YouTube](https://github.com/developermickey/Lagunitas-Website-YouTube) | none | HTML/CSS/JS, **Locomotive Scroll** + GSAP | Canonical `ScrollTrigger.scrollerProxy` + `pinType` integration for transform-based smooth scroll; pin+scrub product sections. (Prefer Lenis today: no proxy needed.) |
| [ANUXR4G/Mage-UI](https://github.com/ANUXR4G/Mage-UI) | MIT | Next.js, shadcn-style registry, framer-motion/motion, GSAP, tsparticles, cobe | Animated component library (shadcn registry format) — cobe globe, particles, SplitText-style text effects. Usable as a shadcn registry source. |
| [naborajs/personal-3d-portfolio-template-V1](https://github.com/naborajs/personal-3d-portfolio-template-V1) | MIT | Vite + React + TS + framer-motion + lucide | Cinematic "OS"-themed portfolio template; framer-motion particles & glow; clean component split. |
| [Sahilmd01/React-Portfolio](https://github.com/Sahilmd01/React-Portfolio) ([live](https://portfolio.devlyhub.in/)) | none | Vite + React + Tailwind 4 + framer-motion + Radix + @vercel/analytics | macOS-desktop metaphor portfolio (clock, weather widget, dock); `@vercel/analytics`; voice-AI demo video. |
| [nishatrhythm/Responsive-Animated-and-Colourful-Portfolio](https://github.com/nishatrhythm/Responsive-Animated-and-Colourful-Portfolio) | MIT | HTML/CSS/JS | Pure-CSS keyframes (`homeBgText`, `homeCursorText` typing reveal, `aboutSpinner`, `showRight`) — zero-JS animation fallback ideas. |
| [AHMAD-JX/Website-GameOver](https://github.com/AHMAD-JX/Website-GameOver) | MIT | HTML/CSS/jQuery (slick) | Game e-commerce layout; missing vendor CSS (404s) — example of what Phase 8 QA catches. |
| [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | MIT | TS monorepo, agent plugin, Astro homepage, graphology | **Agent tool**: turns a codebase/docs into an interactive knowledge graph (`/understand`, `/understand-knowledge`). Use in Phase 1 to audit an existing project's architecture. |
| [Jelosus2/BD2-L2D-Viewer](https://github.com/Jelosus2/BD2-L2D-Viewer) | MIT | Vue 3 + Vite 8 + Pinia + **Spine player 4.1/4.2** + Tailwind 4 + mediabunny | 2D skeletal (Spine/Live2D-style) character viewer with animation export to video (mediabunny). Pattern for animated 2D mascots. Repo is 3.8 GB of game assets — never vendor. |
| [IROHAuwu/fbtpods](https://github.com/IROHAuwu/fbtpods) | Apache-2.0 | Python + small web UI | AirPods → SteamVR full-body tracking. Not a web-design reference; kept for completeness (user listed it). |
| [deepgram/skills](https://github.com/deepgram/skills) | none declared | Agent skills (md) | Voice: STT, TTS, voice-agent, audio intelligence, MCP setup. Use when a site needs a voice agent (e.g. [playground voice-agent](https://playground.deepgram.com/voice-agent?scenario=finance-support)). Linked, not vendored. |

## Live sites fetched
- https://yash-chauhan.vercel.app/ — 3D room hero, "click to enable sounds", sections Home/About/Work/Contact. Screens: `references-screenshots/live-yash-chauhan.vercel.app-*.png`.
- https://portfolio.devlyhub.in/ — macOS-desktop UI (clock, New Delhi weather widget, "AI Services Offline"). Screens: `references-screenshots/live-portfolio.devlyhub.in-*.png`.

## Skipped on purpose
- `killmeplzzzzzz.booth.pm/items/9150907` (paid storefront item) — skipped per instructions.
- `http://13.62.148.110:3001/v1` (raw IP API endpoint) — not called.
- Scrolltide MCP — paid (Yearly/Lifetime), not used or authenticated.

## GitHub topics (top repos by stars, saved as TSV)
- `topic-animated-website.tsv` — highlights beyond the user's list: kirito666coder/spylt (Next+GSAP drink landing), meetdarji006/meet-ui (MIT animated components), SkyNotSilent/true-web-clone (MIT clone skill → vendored in skills-library).
- `topic-webgl-shaders.tsv` — **UstymUkhman/vite-plugin-glsl (MIT, 428★)**: `import frag from './x.glsl'` with `#include` + minify; use for shader-heavy builds.

## Added 2026-11-25 (café rebuild audit)
Every repo the user listed is cloned in `references/` (15 + deepgram/skills). BD2-L2D-Viewer was missing and is now cloned (4.7 GB with game assets, kept off git).

| Repo | Licence | Stack | What to learn (technique → where) |
|---|---|---|---|
| [Jelosus2/BD2-L2D-Viewer](https://github.com/Jelosus2/BD2-L2D-Viewer) | MIT | Vue 3 + Vite + **Spine player 4.1/4.2** | Viewer architecture: `src/components/SpineViewer.vue` (player lifecycle, camera reset, animation list), `stores/characterStore.ts`. **It plays Spine skeletons, not Live2D Cubism `.moc3`**, so for the Nekomi model use pixi-live2d-display. Reuse only the viewer UX (animation sidebar, background, camera) |
| [guansss/pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) | MIT | PixiJS 6/7 + Cubism Core 2.1/4 | `Live2DModel.from(model3.json)`, motions/expressions, `model.internalModel.coreModel.setParameterValueById('ParamMouthOpenY', v)` lip-sync, focus/hit-areas. Cubism **5** moc3 (Nekomi) needs a Cubism-5-capable core/fork (test in Phase 7) |
| [kirito666coder/spylt](https://github.com/kirito666coder/spylt) | none (study only) | Next 16 + GSAP 3.14 + @gsap/react + Tailwind 4 | **Drink landing page**: `components/FlavorSlider.tsx` (pinned horizontal drink slider, scrub, title split parallax L14–74), `ClipPathTitle.tsx` (clip-path polygon title reveal L23–35), `app/(root)/Hero.tsx` (SplitText chars rise + hero card rotate/scale on scroll L12–58), `VideoPinCompo.tsx` (pinned video circle). Re-implement, don't copy |
| [meetdarji006/meet-ui](https://github.com/meetdarji006/meet-ui) | MIT | Next + motion | Animated component library (text reveals, magnetic buttons); MIT means components can be ported |
| [UstymUkhman/vite-plugin-glsl](https://github.com/UstymUkhman/vite-plugin-glsl) | MIT | Vite plugin | `import frag from './x.glsl'` with `#include` + minify, for the page-curl and cup shaders |
| [hekall21/nothin-paris-luxury](https://github.com/hekall21/nothin-paris-luxury) | none | DESIGN.md only | Luxury lookbook design notes (chrome shaders). Reference text only |

**Scrolltide (free parts, no paid MCP):** the public template pages and preview films (studied in `scrolltide/`), and the free rebuild prompts of Otis, SELENE, NAÏADE and Fluxora (readable without login). The Scrolltide MCP (`https://www.scrolltide.co/api/mcp`) needs a Yearly/Lifetime plan and OAuth, so it was not connected.
