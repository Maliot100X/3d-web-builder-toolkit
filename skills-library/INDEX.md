# skills-library index

Vendored agent skills (permissive licences; LICENSE kept in each folder). Sources & rationale: ../SKILLS-AND-MCPS.md

| Folder | Description |
|---|---|
| `anthropic-algorithmic-art` | Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. Use this when users request creating art using code, generative art, algorithmic art, flow fields, or |
| `anthropic-canvas-design` | Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create ori |
| `anthropic-frontend-design` | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defau |
| `anthropic-skill-creator` | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill |
| `anthropic-theme-factory` | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact t |
| `anthropic-web-artifacts-builder` | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui). Use for complex artifacts requiring state manag |
| `anthropic-webapp-testing` | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser l |
| `emil-animate` | Build an animation from scratch, making the decisions in the order that determines whether it feels right — should it animate at all, what purpose, which tool, which properties, which curve and dura |
| `emil-animation-performance` | Keep web animations inside the frame budget — animate composite-only properties, keep motion off the main thread when the page is busy, and find the cause when an animation drops frames. Use when an |
| `emil-animation-vocabulary` | Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term (the bouncy thing when a popover opens → Pop in; the iOS rubber-band scroll → Rubber- |
| `emil-break-ui` | Try to break a piece of UI by feeding it worst-case data — long names, unbreakable emails, one-letter names, missing fields, huge counts, zero items, long labels, non-Latin text, emoji, extreme numb |
| `emil-choreograph` | Coordinate several elements that animate together — decide what moves, in what order, how much they overlap, and what stays still — so a group reads as one intentional motion instead of a pile of  |
| `emil-emil-design-eng` | Emil Kowalski's design-engineering philosophy for UI polish, component design, animation decisions, and the invisible details that make software feel great. Use when building or reviewing a UI compone |
| `emil-find-animation-opportunities` | Search a codebase or UI for places that don't animate but should, and reject everything that shouldn't. Read-only; it proposes motion with exact values, it does not implement it. Use when the user ask |
| `emil-gestures` | Build drag, swipe, and sheet interactions that track the finger 1:1 and stay interruptible. Use when building or fixing anything the user drags, swipes, flings, holds, or dismisses with a gesture —  |
| `emil-improve-animations` | Survey a codebase's animation and motion code as a senior motion advisor, then produce a prioritized audit and self-contained implementation plans for other agents (or cheaper models) to execute. Read |
| `emil-learn-taste` | Turn a session's design corrections into rules, with their why, in DESIGN.md, a project skill, or a lint check. |
| `emil-pick-ui-library` | Pick the library for a frontend task from a curated list — primitives, toasts, drawers, command menus, OTP, numbers, charts, virtualization, drag and drop, state, styling. |
| `emil-prototype` | Build multiple genuinely different versions of a UI piece you describe, rendered behind a visual picker so you can flip through them live and promote the one that feels right. |
| `emil-review-animations` | Reviews animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy. Default to flagging; approval is earned. |
| `gsap-core` | Official GSAP skill for the core API — gsap.to(), from(), fromTo(), easing, duration, stagger, defaults, gsap.matchMedia() (responsive, prefers-reduced-motion). Use when the user asks for a JavaScri |
| `gsap-frameworks` | Official GSAP skill for Vue, Svelte, and other non-React frameworks — lifecycle, scoping selectors, cleanup on unmount. Use when the user wants animation in Vue, Nuxt, Svelte, SvelteKit, or asks abo |
| `gsap-performance` | Official GSAP skill for performance — prefer transforms, avoid layout thrashing, will-change, batching. Use when optimizing GSAP animations, reducing jank, or when the user asks about animation perf |
| `gsap-plugins` | Official GSAP skill for GSAP plugins — registration, ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG and physics plugins, CustomEase, EasePack, Custo |
| `gsap-react` | Official GSAP skill for React — useGSAP hook, refs, gsap.context(), cleanup. Use when the user wants animation in React or Next.js, or asks about GSAP with React, useGSAP, or cleanup on unmount. Rec |
| `gsap-scrolltrigger` | Official GSAP skill for ScrollTrigger — scroll-linked animations, pinning, scrub, triggers. Use when building or recommending scroll-based animation, parallax, pinned sections, or when the user asks |
| `gsap-timeline` | Official GSAP skill for timelines — gsap.timeline(), position parameter, nesting, playback. Use when sequencing animations, choreographing keyframes, or when the user asks about animation sequencing |
| `gsap-utils` | Official GSAP skill for gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, pipe. Use when the user asks about gsap.utils, clamp, mapRange, random, snap, toArray, wrap |
| `impeccable` | Use when the user wants to design, redesign, shape, critique, audit, polish, simplify, harden, animate, or otherwise improve a frontend interface: websites, landing pages, dashboards, product UI, comp |
| `taste-skill` | tasteskill 2.5.1, the anti-slop frontend skill. Builds professional company websites at the level |
| `threejs-animation` | Keyframe, skeletal and morph-target animation, procedural motion and clip blending, on WebGL or with WebGPU and TSL. Use when animating objects, playing glTF animations, posing bones, driving morph ta |
| `threejs-asset-pipeline` | Shrinking glTF assets for three.js with gltf-transform: inspect, validate and optimize commands, Draco, meshopt and quantization, KTX2, WebP and AVIF textures, the loader setup each output needs, and  |
| `threejs-fundamentals` | Three.js scene setup: scenes and fog, cameras, the renderer and tone mapping, the animation loop, object hierarchies, transforms, core math and cleanup, on WebGL or with WebGPU and TSL. Use when creat |
| `threejs-geometry` | Creating and shaping three.js geometry: built-in shapes, 3D text, vertex buffers and attributes, merging, instancing, batching, point clouds and lines, on WebGL or with WebGPU and TSL. Use when buildi |
| `threejs-interaction` | Picking with raycasting, camera controls, transform gizmos, drag, hover and box selection for three.js, identical under WebGL and WebGPU. Use when handling mouse, touch or keyboard input, detecting cl |
| `threejs-lighting` | Light types and physical units, shadow maps, HDR environment lighting, light probes, and lighting performance, on WebGL or with WebGPU and TSL. Use when adding or tuning lights, fixing shadow acne, se |
| `threejs-loaders` | Loading three.js assets: glTF with Draco, meshopt and KTX2 compression, other model formats, textures, HDR and EXR environments, progress, caching, cloning and disposal. Use when loading 3D models, te |
| `threejs-materials` | Choosing and configuring three.js materials - unlit, diffuse, specular, PBR, toon, point and line materials - shared properties like blending and stencil, environment response, and the WebGPU node-mat |
| `threejs-performance` | Measuring and optimizing three.js speed: render statistics, memory counters, fewer draw calls via merging, instancing, batching and LOD, fill rate, shadows, CPU work per frame, shader stalls and GPU c |
| `threejs-postprocessing` | Three.js post-processing: composer pass chains, built-in renderer effects, and the WebGPU/TSL node pipeline — bloom, depth of field, ambient occlusion, custom screen effects. Use when adding visual  |
| `threejs-react-three-fiber` | Building three.js scenes from React with React Three Fiber and drei: renderer setup, the scene graph as JSX, frame-loop, state and loading hooks, pointer events, and adaptive performance, on WebGL or  |
| `threejs-shaders` | Custom GLSL vertex and fragment shaders: uniforms, varyings, shader chunks, extending built-in materials, instanced attributes, plus the same effects as node materials with TSL on WebGPU. Use when wri |
| `threejs-textures` | Three.js textures: image loading, color spaces, UV channels and transforms, texture types from canvas to HDR and KTX2, render targets, texture memory. Use when working with images on materials, UV coo |
| `true-web-clone` | True Web Clone: clone public websites from a URL into local files with source-first, asset-first, runtime-aware fidelity. Use when the user says True Web Clone, web clone, clone this website, mirror/d |
| `ui-ux-pro-max` | UI/UX design intelligence for web, mobile, and desktop. This skill should be used when designing, building, reviewing, or fixing interfaces, including pages, components, design systems, accessibility, |
| `webq-accessibility` | Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to improve accessibility, a11y audit, WCAG compliance, screen reader support, keyboard navigation, or make accessible. |
| `webq-best-practices` | Apply modern web development best practices for security, compatibility, and code quality. Use when asked to apply best practices, security audit, modernize code, code quality review, or check for vul |
| `webq-core-web-vitals` | Optimize Core Web Vitals (LCP, INP, CLS) for better page experience using field and lab evidence. Use when asked to improve Core Web Vitals, fix LCP, reduce CLS, optimize INP, page experience optimiza |
| `webq-performance` | Optimize web performance for faster loading and better user experience. Use when asked to speed up my site, optimize performance, reduce load time, fix slow loading, improve page speed, or performance |
| `webq-seo` | Optimize for search engine visibility and ranking. Use when asked to improve SEO, optimize for search, fix meta tags, add structured data, sitemap optimization, or search engine optimization. |
| `webq-web-quality-audit` | Run an evidence-led web quality audit covering performance, accessibility, SEO, best practices, and agentic browsing. Use when asked to audit my site, review web quality, run lighthouse audit, check p |

## Deepgram (local copy, not committed)
Copied 2026-11-25 from https://github.com/deepgram/skills (no licence file upstream, so it is kept out of git; re-fetch with `git clone --depth 1 https://github.com/deepgram/skills`).
`deepgram/voice-agent` (Agent WebSocket contract, Settings, functions), `deepgram/browser-agent` (@deepgram/agents SDK, tokenFactory auth), `deepgram/text-to-speech`, `deepgram/speech-to-text`, `deepgram/cli` (dg CLI), `deepgram/setup-mcp` (docs MCP https://api.dx.deepgram.com/kapa/mcp), `deepgram/api`, `deepgram/recipes`, `deepgram/starters`, `deepgram/examples`, `deepgram/docs`, `deepgram/audio-intelligence`, `deepgram/text-intelligence`, `deepgram/self-hosted`.

## Added 2026-11-25 (Phase 0) — 65 skills, see SOURCE.md in each folder
- `vercel-web-design-guidelines` — https://github.com/vercel-labs/agent-skills/tree/HEAD/skills/web-design-guidelines (none-declared)
- `vercel-react-best-practices` — https://github.com/vercel-labs/agent-skills/tree/HEAD/skills/react-best-practices (none-declared)
- `vercel-react-view-transitions` — https://github.com/vercel-labs/agent-skills/tree/HEAD/skills/react-view-transitions (none-declared)
- `vercel-composition-patterns` — https://github.com/vercel-labs/agent-skills/tree/HEAD/skills/composition-patterns (none-declared)
- `vercel-deploy-to-vercel` — https://github.com/vercel-labs/agent-skills/tree/HEAD/skills/deploy-to-vercel (none-declared)
- `mengto-build-awwwards-quality-sites` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/build-awwwards-quality-sites (MIT)
- `mengto-build-threejs-scroll-worlds` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/build-threejs-scroll-worlds (MIT)
- `mengto-scroll-world-storytelling` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/scroll-world-storytelling (MIT)
- `mengto-webgl-3d-object` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/webgl-3d-object (MIT)
- `mengto-shaders-cursor-ripples` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/shaders-cursor-ripples (MIT)
- `mengto-masked-reveal` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/masked-reveal (MIT)
- `mengto-staggered-word-reveal` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/staggered-word-reveal (MIT)
- `mengto-progressive-blur` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/progressive-blur (MIT)
- `mengto-marquee-loop` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/marquee-loop (MIT)
- `mengto-painted-product-showcase` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/painted-product-showcase (MIT)
- `mengto-scroll-progress-timeline` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/scroll-progress-timeline (MIT)
- `mengto-gsap` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/gsap (MIT)
- `mengto-threejs` — https://github.com/mengto/skills/tree/HEAD/agent-skills/web-design/threejs (MIT)
- `mengto-no-ai-design-slop` — https://github.com/mengto/skills/tree/HEAD/agent-skills/ui/no-ai-design-slop (MIT)
- `mengto-audit-ai-design-slop` — https://github.com/mengto/skills/tree/HEAD/agent-skills/ui/audit-ai-design-slop (MIT)
- `mengto-refract-liquid-glass` — https://github.com/mengto/skills/tree/HEAD/agent-skills/ui/refract-liquid-glass (MIT)
- `mengto-optimize-web-animations` — https://github.com/mengto/skills/tree/HEAD/agent-skills/codex/optimize-web-animations (MIT)
- `mengto-iterate-until-verified` — https://github.com/mengto/skills/tree/HEAD/agent-skills/codex/iterate-until-verified (MIT)
- `lottiefiles-motion-design` — https://github.com/lottiefiles/motion-design-skill/tree/HEAD/skills/motion-design (MIT)
- `design-motion-principles` — https://github.com/kylezantos/design-motion-principles/tree/HEAD/skills/design-motion-principles (MIT)
- `ibelick-fixing-motion-performance` — https://github.com/ibelick/ui-skills/tree/HEAD/skills/fixing-motion-performance (MIT)
- `ibelick-baseline-ui` — https://github.com/ibelick/ui-skills/tree/HEAD/skills/baseline-ui (MIT)
- `ibelick-improve-ui` — https://github.com/ibelick/ui-skills/tree/HEAD/skills/improve-ui (MIT)
- `ibelick-fixing-accessibility` — https://github.com/ibelick/ui-skills/tree/HEAD/skills/fixing-accessibility (MIT)
- `fresh-threejs-webgl` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/threejs-webgl (MIT)
- `fresh-react-three-fiber` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/react-three-fiber (MIT)
- `fresh-motion-framer` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/motion-framer (MIT)
- `fresh-modern-web-design` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/modern-web-design (MIT)
- `fresh-lightweight-3d-effects` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/lightweight-3d-effects (MIT)
- `fresh-web3d-integration-patterns` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/web3d-integration-patterns (MIT)
- `fresh-pixijs-2d` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/pixijs-2d (MIT)
- `fresh-animated-component-libraries` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/animated-component-libraries (MIT)
- `fresh-barba-js` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/barba-js (MIT)
- `fresh-scroll-reveal-libraries` — https://github.com/freshtechbro/claudedesignskills/tree/HEAD/.claude/skills/scroll-reveal-libraries (MIT)
- `iart-shader-glsl` — https://github.com/iart-ai/webgl-animation-skills/tree/HEAD/skills/shader-glsl (MIT)
- `iart-particle-system` — https://github.com/iart-ai/webgl-animation-skills/tree/HEAD/skills/particle-system (MIT)
- `awwwards-animations` — https://github.com/devmartinese/awwwards-animations-skill/tree/HEAD/devmartinese__awwwards-animations-skill (none-declared)
- `juliobsz-awwwards` — https://github.com/juliobsz/skills/tree/HEAD/awwwards (MIT)
- `extract-design-system` — https://github.com/arvindrk/extract-design-system/tree/HEAD/skills/extract-design-system (MIT)
- `wshobson-tailwind-design-system` — https://github.com/wshobson/agents/tree/HEAD/plugins/frontend-mobile-development/skills/tailwind-design-system (MIT)
- `wshobson-interaction-design` — https://github.com/wshobson/agents/tree/HEAD/plugins/ui-design/skills/interaction-design (MIT)
- `wshobson-visual-design-foundations` — https://github.com/wshobson/agents/tree/HEAD/plugins/ui-design/skills/visual-design-foundations (MIT)
- `wshobson-responsive-design` — https://github.com/wshobson/agents/tree/HEAD/plugins/ui-design/skills/responsive-design (MIT)
- `shadcn` — https://github.com/shadcn-ui/ui/tree/HEAD/skills/shadcn (MIT)
- `scroll-world` — https://github.com/oso95/scroll-world/tree/HEAD/skills/scroll-world (MIT)
- `scroll-craft` — https://github.com/nateherkai/scroll-craft/tree/HEAD/plugins/nateherk-design/skills/scroll-craft (MIT)
- `live2d-cubism-web-quickstart` — https://github.com/arjunindia/live2d-skills/tree/HEAD/live2d-cubism-web-quickstart (none-declared)
- `live2d-cubism-web-rendering` — https://github.com/arjunindia/live2d-skills/tree/HEAD/live2d-cubism-web-rendering (none-declared)
- `live2d-cubism-web-motion` — https://github.com/arjunindia/live2d-skills/tree/HEAD/live2d-cubism-web-motion (none-declared)
- `neko-vrm-physics` — https://github.com/project-n-e-k-o/n.e.k.o/tree/HEAD/.agent/skills/vrm-physics (Apache)
- `neko-vrm-mtoon-outline` — https://github.com/project-n-e-k-o/n.e.k.o/tree/HEAD/.agent/skills/vrm-mtoon-outline (Apache)
- `neko-avatar-rendering` — https://github.com/project-n-e-k-o/n.e.k.o/tree/HEAD/.agent/skills/avatar-rendering (Apache)
- `neko-voice-realtime-tts` — https://github.com/project-n-e-k-o/n.e.k.o/tree/HEAD/.agent/skills/voice-realtime-tts (Apache)
- `garden-web-design-engineer` — https://github.com/conardli/garden-skills/tree/HEAD/skills/web-design-engineer (MIT)
- `designing-beautiful-websites` — https://github.com/tristanmanchester/agent-skills/tree/HEAD/designing-beautiful-websites (none-declared)
- `nextjs-framer-motion-animations` — https://github.com/tristanmanchester/agent-skills/tree/HEAD/nextjs-framer-motion-animations (none-declared)
- `copilot-gsap-framer-scroll-animation` — https://github.com/github/awesome-copilot/tree/HEAD/skills/gsap-framer-scroll-animation (MIT)
- `copilot-web-design-reviewer` — https://github.com/github/awesome-copilot/tree/HEAD/skills/web-design-reviewer (MIT)
- `gamedev-shader-programming` — https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/HEAD/skills/disciplines/shader-programming (Apache)
- `tailwind-4-docs` — https://github.com/lombiq/tailwind-agent-skills/tree/HEAD/skills/tailwind-4-docs (none-declared)
