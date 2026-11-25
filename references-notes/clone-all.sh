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
