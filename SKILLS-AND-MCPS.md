# Skills, MCP servers & APIs for 3D / animated web builds

All skills below are **free**. Vendored copies (permissive licences, LICENSE file kept beside each) are in
[`skills-library/`](skills-library/). Unlicensed ones are linked only. Install any skill with
`npx skills add <owner>/<repo>` (Vercel's open skills CLI, https://github.com/vercel-labs/skills) or by copying
the folder into your agent's skills directory. Directory to browse for more: **https://skills.sh** (leaderboard).

## A. Top skills — ranked for this toolkit

| # | Skill (folder in skills-library) | Source / licence | What it adds | Phase |
|---|---|---|---|---|
| 1 | `gsap-*` (core, timeline, scrolltrigger, plugins, react, performance, utils, frameworks) | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) MIT — **already installed** | Correct GSAP APIs, ScrollTrigger pin/scrub, matchMedia + reduced-motion, cleanup in React | 6 |
| 2 | `threejs-*` (13: fundamentals, shaders, materials, lighting, loaders, asset-pipeline, performance, postprocessing, r3f, interaction, animation, geometry, textures) | [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills) MIT, 4.4k★ | Modern three.js (WebGL + WebGPU/TSL), glTF Draco/meshopt/KTX2 pipeline, disposal, perf counters | 5 |
| 3 | `anthropic-frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) Apache-2.0 | Distinctive aesthetic direction, typography, avoids generic "AI" layouts | 3, 7 |
| 4 | `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) Apache-2.0, 116k★ | Design vocabulary: polish / bolder / critique / audit / harden commands | 3, 7, 8 |
| 5 | `taste-skill` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) MIT, 121k★ | Art direction, reference-image driven design, anti-slop rules (+ references/*.md on backgrounds, effects, copy) | 3 |
| 6 | `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) MIT, 154k★ | Searchable DB of styles, palettes, font pairings, UX rules (python scripts + CSV data) | 3 |
| 7 | `emil-*` (animate, choreograph, review-animations, improve-animations, animation-performance, animation-vocabulary, find-animation-opportunities, gestures, emil-design-eng, learn-taste, pick-ui-library, break-ui, prototype) | [emilkowalski/skills](https://github.com/emilkowalski/skills) MIT | Motion craft: easing/duration choices, choreography, gesture physics, motion review bar | 6, 8 |
| 8 | `webq-*` (performance, core-web-vitals, accessibility, seo, best-practices, web-quality-audit) | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills) MIT | Lighthouse/CWV-driven perf, WCAG 2.2 a11y, SEO audits | 8 |
| 9 | `anthropic-webapp-testing` | anthropics/skills Apache-2.0 | Playwright scripts to test local apps, capture console logs + screenshots | 8 |
| 10 | `true-web-clone` | [SkyNotSilent/true-web-clone](https://github.com/SkyNotSilent/true-web-clone) MIT | Source-first cloning of a public site incl. WebGL/animation runtimes — for studying references (respect licences) | 1 |
| 11 | `anthropic-web-artifacts-builder`, `anthropic-theme-factory`, `anthropic-canvas-design`, `anthropic-algorithmic-art`, `anthropic-skill-creator` | anthropics/skills Apache-2.0 | React+shadcn artifact bundling, 10 preset themes, poster/OG art, p5 generative art, writing new skills | 3, 4 |
| — | Vercel agent skills: `react-best-practices`, `web-design-guidelines`, `composition-patterns`, `react-view-transitions`, `deploy-to-vercel`, `vercel-optimize` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (no licence file → linked only) | React perf rules, UI guideline audit, View Transitions, deploy flow | 4, 8, 9 |
| — | Deepgram skills: speech-to-text, text-to-speech, voice-agent, browser-agent, audio-intelligence, setup-mcp | [deepgram/skills](https://github.com/deepgram/skills) (linked only) | Voice features (talking mascot, voice nav, voice agent) | 5–7 when brief needs voice |
| — | Remotion skills | [remotion-dev/skills](https://github.com/remotion-dev/skills) — already installed in this bot | Promo videos / animated OG videos of the site | after 9 |
| — | obra/superpowers (brainstorming, writing-plans, systematic-debugging, TDD, verification-before-completion) | [obra/superpowers](https://github.com/obra/superpowers) MIT — already installed in this bot | Process discipline around the 9 phases | all |
| — | Understand-Anything | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) MIT | Knowledge-graph audit of an existing codebase | 1 |

Directories / awesome-lists for discovering more (all free):
https://skills.sh · https://github.com/VoltAgent/awesome-agent-skills (1000+ skills) ·
https://github.com/ComposioHQ/awesome-claude-skills · https://github.com/travisvn/awesome-claude-skills ·
https://github.com/punkpeye/awesome-mcp-servers · https://github.com/wshobson/agents · https://github.com/mattpocock/skills

## B. Free MCP servers worth connecting (none connected by this run)

| MCP | Cost | Why it helps | Setup |
|---|---|---|---|
| **shadcn MCP** (+ Aceternity / Magic UI / Mage-UI registries) | Free (Aceternity Pro blocks paid — skip) | Search & install animated components from any shadcn registry by description | `npx shadcn@latest mcp`; add `"registries": {"@aceternity": "https://ui.aceternity.com/registry/{name}.json"}` to components.json — https://ui.shadcn.com/docs/mcp |
| **Magic UI MCP** | Free, MIT | 150+ animated React/Tailwind components (marquee, globe, particles, text effects) | https://github.com/magicuidesign/mcp |
| **Context7** | Free tier (API key optional) | Up-to-date docs for three, GSAP, R3F, Lenis, Tailwind v4, Vite — kills version-drift bugs | https://github.com/upstash/context7 (remote: `https://mcp.context7.com/mcp`) |
| **Playwright MCP** | Free, Apache-2.0 | Agent-driven browser QA: screenshots, console, interaction | https://github.com/microsoft/playwright-mcp |
| **Chrome DevTools MCP** | Free, Apache-2.0 | Performance traces, CWV, network, console from a real Chrome — the best perf tool for WebGL pages | https://github.com/ChromeDevTools/chrome-devtools-mcp |
| **Figma Context MCP** (Framelink) | Free (needs free Figma account + personal token) | Pull layout/tokens from a Figma design into Phase 3 | https://github.com/GLips/Figma-Context-MCP |
| **Blender MCP** | Free, MIT (needs local Blender on the desktop) | Generate / edit 3D models, export GLB for the scene | https://github.com/ahujasid/mcp-for-blender |
| **Vercel MCP** | Free Hobby plan | Deploys, logs, env vars, domains (Phase 9) | ✅ already connected (`user-Vercel`) |
| **GitHub** | Free | Repos, PRs, Actions | ✅ already connected (`cursor-github` + `gh` CLI authed as Maliot100X) |
| **Canva MCP** | Free tier | OG images, social assets, brand kits | ✅ already connected (`user-Canva`) |
| **Appwrite docs MCP** | Free | Backend (auth/db/storage) docs if a site needs one | ✅ already connected |
| **Deepgram MCP** | Free credit ($200 on signup), then paid usage | Voice agents / TTS / STT on a site | via `deepgram/skills` → `setup-mcp` |
| 21st.dev Magic MCP | ⚠️ Freemium — limited free generations, then **paid** | v0-style component generation | https://github.com/21st-dev/magic-mcp (optional) |
| Scrolltide MCP | ⚠️ **Paid** (Yearly/Lifetime) | Rebuild prompts library | Added to account but signed out; **not used** |

## C. Free APIs / asset sources that help 3D builds

| API / source | Cost | Use |
|---|---|---|
| Poly Haven (https://polyhaven.com, API https://api.polyhaven.com) | Free, CC0 | HDRIs for `Environment`, PBR textures, models |
| Sketchfab Download API | Free account; per-model licences (CC-BY etc.) | GLB models — check each licence |
| Kenney / Quaternius assets | Free, CC0 | Low-poly GLB packs |
| gltf.report / gltf-transform CLI | Free, MIT | Draco/meshopt/KTX2 compression (Phase 5) |
| Google Fonts / Fontshare | Free | Typography (Chakra Petch, Sora, IBM Plex Mono, Satoshi…) |
| Unsplash API / Pexels API | Free tier (API key) | Placeholder photography |
| LottieFiles | Free tier | Lottie micro-animations |
| Spline (https://spline.design) | Freemium (free tier exports with watermark limits) | Quick 3D scenes exportable to three/R3F |
| Deepgram / ElevenLabs | Free credits / free tier, then paid | Voice in the site |
| Vercel Analytics / Speed Insights | Free on Hobby | Real-user CWV after deploy |
| Formspree / Web3Forms | Free tier | Contact forms without a backend |
