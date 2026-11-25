#!/usr/bin/env bash
# Re-create the reference clones (shallow). Run from the toolkit root.
set -e
mkdir -p references && cd references
for r in ANUXR4G/Mage-UI Egonex-AI/Understand-Anything nishatrhythm/Responsive-Animated-and-Colourful-Portfolio \
  developermickey/Lagunitas-Website-YouTube Yashchauhan008/portfolio-3d tkabalin/WebGL-Fluid-Background \
  Sahilmd01/React-Portfolio peyush-nuwal/norrav-landing-page naborajs/personal-3d-portfolio-template-V1 \
  AHMAD-JX/Website-GameOver 0xAllan123/animated-landing-page IROHAuwu/fbtpods manish-850/gentlerain.ai deepgram/skills; do
  d=${r//\//__}; [ -d "$d" ] || git clone --depth 1 "https://github.com/$r" "$d"
done
# 3.8 GB of game assets — only if you really need it:
# git clone --depth 1 https://github.com/Jelosus2/BD2-L2D-Viewer Jelosus2__BD2-L2D-Viewer

# Added 2026-11-25 (cafe-rdv rebuild): top topic picks + Live2D runtime
for r in kirito666coder/spylt meetdarji006/meet-ui UstymUkhman/vite-plugin-glsl hekall21/nothin-paris-luxury guansss/pixi-live2d-display; do
  d=${r//\//__}; [ -d "$d" ] || git clone --depth 1 --filter=blob:limit=20m "https://github.com/$r" "$d"
done

# Added 2026-11-25 Phase 0 full setup (user avatar/voice repos + topic top picks). Then build/run: tools/phase0/build-one.sh <name>; tools/phase0/run-one.sh <name> <port> [path]
for r in Balajitechlabs/balajitechlabs.com Bismay-exe/Cyberfiction CoderSwarup/ai_landing_page JuiceBoxxGames/utsuwa Live2D/CubismWebSamples SkyNotSilent/true-web-clone anushkachauhxn/custom-globe-3js anushkachauhxn/particle-galaxy-3js bedimcode/responsive-pirate-website codegenweb/Save-Animals datascale-ai/opentalking girishlade111/cloth-simulation hekall21/black-hole-singularity-3d hekall21/quantum-particle-wave-3d jofizcd/Soul-of-Waifu kirito666coder/mojito-cocktail moeru-ai/airi mursalhayat1/Everswap owais-khan-zai/Software-Company-Website-Project pixiv/three-vrm yuri-os/YuriOS zyna-b/React-GSAP-Animated-Studio-website ; do
  d=${r//\//__}; [ -d "$d" ] || git clone --depth 1 --recurse-submodules "https://github.com/$r" "$d"
done
