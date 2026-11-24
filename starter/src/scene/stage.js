import * as THREE from 'three';
import fullscreenVert from './shaders/fullscreen.vert?raw';
import simFrag from './shaders/ripple-sim.frag?raw';
import compositeFrag from './shaders/ripple-composite.frag?raw';
import noise from './shaders/noise.glsl?raw';
import blobVert from './shaders/blob.vert?raw';
import blobFrag from './shaders/blob.frag?raw';
import { drawPoster } from './poster.js';
import { cappedDpr, isCoarsePointer } from '../lib/env.js';

/**
 * One fixed full-viewport WebGL stage behind the page:
 *  layer 1  ripple-refracted hero poster (ping-pong height field)
 *  layer 2  noise-displaced iridescent blob, driven by scroll (state.progress)
 * Exposes `state` so GSAP can tween plain numbers; the render loop reads them.
 */
export function createStage(canvas, { title, kicker, reduced }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setClearColor(0x07080c, 1);
  renderer.autoClear = false;

  const portrait = window.innerWidth / window.innerHeight < 0.8;
  const state = {
    progress: 0, posterOpacity: 1, hue: 0, distort: 0.22,
    blobX: portrait ? 0 : 1.05, blobY: portrait ? 1.0 : -0.05, blobScale: portrait ? 0.62 : 0.78,
  };
  const pointer = { x: 0.5, y: 0.5, down: false, active: false, last: 0 };
  let w = 1, h = 1, dpr = 1, frame = 0, raf = 0, running = false;
  const clock = new THREE.Clock();

  // --- ripple sim --------------------------------------------------------
  const rtOpts = { type: THREE.HalfFloatType, format: THREE.RGBAFormat, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false };
  let rtA = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  let rtB = new THREE.WebGLRenderTarget(2, 2, rtOpts);
  const quad = new THREE.PlaneGeometry(2, 2);
  const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const simMat = new THREE.ShaderMaterial({
    vertexShader: fullscreenVert,
    fragmentShader: simFrag,
    uniforms: {
      uPrev: { value: null }, uRes: { value: new THREE.Vector2() }, uPointer: { value: new THREE.Vector3() },
      uDrop: { value: new THREE.Vector3() }, uAspect: { value: 1 }, uFrame: { value: 0 },
    },
    depthTest: false, depthWrite: false,
  });
  const simScene = new THREE.Scene();
  simScene.add(new THREE.Mesh(quad, simMat));

  const posterCanvas = document.createElement('canvas');
  const posterCtx = posterCanvas.getContext('2d');
  const posterTex = new THREE.CanvasTexture(posterCanvas);
  posterTex.colorSpace = THREE.SRGBColorSpace;
  posterTex.minFilter = THREE.LinearFilter;
  posterTex.generateMipmaps = false;

  const compMat = new THREE.ShaderMaterial({
    vertexShader: fullscreenVert,
    fragmentShader: compositeFrag,
    uniforms: { uSim: { value: null }, uPoster: { value: posterTex }, uOpacity: { value: 1 } },
    transparent: true, depthTest: false, depthWrite: false,
  });
  const bgScene = new THREE.Scene();
  bgScene.add(new THREE.Mesh(quad, compMat));

  // --- 3D blob -----------------------------------------------------------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 6);
  const blobGeo = new THREE.IcosahedronGeometry(1, isCoarsePointer() ? 28 : 64);
  const blobMat = new THREE.ShaderMaterial({
    vertexShader: noise + '\n' + blobVert,
    fragmentShader: blobFrag,
    uniforms: {
      uTime: { value: 0 }, uDistort: { value: state.distort }, uFreq: { value: 1.1 },
      uHue: { value: 0 }, uTint: { value: new THREE.Color('#7cf5ff') },
    },
  });
  const blob = new THREE.Mesh(blobGeo, blobMat);
  scene.add(blob);

  // particle dust for depth
  const dustCount = isCoarsePointer() ? 350 : 900;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 14;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ color: 0x9fe9ff, size: 0.018, transparent: true, opacity: 0.55, depthWrite: false });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // --- sizing ------------------------------------------------------------
  function resize() {
    w = window.innerWidth; h = window.innerHeight; dpr = cappedDpr();
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // sim at half CSS resolution: plenty for waves, 4x cheaper
    const sw = Math.max(2, Math.round(w * 0.5)), sh = Math.max(2, Math.round(h * 0.5));
    rtA.setSize(sw, sh); rtB.setSize(sw, sh);
    simMat.uniforms.uRes.value.set(sw, sh);
    simMat.uniforms.uAspect.value = w / h;
    frame = 0;
    posterCanvas.width = Math.round(w * dpr); posterCanvas.height = Math.round(h * dpr);
    drawPoster(posterCtx, posterCanvas.width, posterCanvas.height, { title, kicker });
    posterTex.needsUpdate = true;
    if (!running) renderOnce();
  }

  // --- input -------------------------------------------------------------
  const onMove = (e) => {
    pointer.x = e.clientX / w; pointer.y = 1 - e.clientY / h;
    pointer.active = true; pointer.last = performance.now();
  };
  const onLeave = () => { pointer.active = false; };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);

  // --- loop --------------------------------------------------------------
  let nextDrop = 0;
  function step(dt, t, snap = false) {
    // ripple
    const idle = performance.now() - pointer.last > 1800;
    simMat.uniforms.uPointer.value.set(pointer.x, pointer.y, pointer.active && !idle ? 1.2 : 0);
    if (t > nextDrop && state.posterOpacity > 0.05) {
      simMat.uniforms.uDrop.value.set(0.15 + Math.random() * 0.7, 0.25 + Math.random() * 0.5, 1.6);
      nextDrop = t + 1.1 + Math.random() * 1.4;
    } else simMat.uniforms.uDrop.value.z = 0;
    simMat.uniforms.uFrame.value = frame++;
    simMat.uniforms.uPrev.value = rtA.texture;
    renderer.setRenderTarget(rtB);
    renderer.render(simScene, ortho);
    [rtA, rtB] = [rtB, rtA];

    // blob — follows GSAP-driven state + a little pointer parallax
    blobMat.uniforms.uTime.value = t;
    blobMat.uniforms.uDistort.value = state.distort;
    blobMat.uniforms.uHue.value = state.hue;
    const aspect = w / h;
    const px = (pointer.x - 0.5) * 0.35, py = (pointer.y - 0.5) * 0.25;
    const k = snap ? 1 : Math.min(1, dt * 4);
    blob.position.x += ((state.blobX * Math.min(aspect, 1.6)) + px - blob.position.x) * k;
    blob.position.y += (state.blobY + py - blob.position.y) * k;
    const s = state.blobScale;
    blob.scale.setScalar(s);
    blob.rotation.y += dt * 0.15;
    blob.rotation.x = state.progress * Math.PI * 1.5;
    dust.rotation.y = t * 0.01 + state.progress * 0.6;
    compMat.uniforms.uOpacity.value = state.posterOpacity;
  }

  function draw() {
    compMat.uniforms.uSim.value = rtA.texture;
    renderer.setRenderTarget(null);
    renderer.clear();
    if (state.posterOpacity > 0.001) renderer.render(bgScene, ortho);
    renderer.clearDepth();
    renderer.render(scene, camera);
  }

  function tick() {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 1 / 20);
    step(dt, clock.elapsedTime);
    draw();
  }
  function renderOnce() { step(0.016, clock.elapsedTime, true); draw(); }

  function start() { if (running || reduced) return; running = true; clock.getDelta(); tick(); }
  function stop() { running = false; cancelAnimationFrame(raf); }
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);

  const ro = new ResizeObserver(() => resize());
  ro.observe(document.documentElement);
  resize();
  if (reduced) renderOnce(); else start();

  // Re-draw poster once webfonts swap in (canvas text doesn't reflow by itself)
  document.fonts?.ready.then(() => {
    drawPoster(posterCtx, posterCanvas.width, posterCanvas.height, { title, kicker });
    posterTex.needsUpdate = true;
    if (!running) renderOnce();
  });

  function dispose() {
    stop(); ro.disconnect();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onMove);
    document.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', onVis);
    [quad, blobGeo, dustGeo].forEach((g) => g.dispose());
    [simMat, compMat, blobMat, dustMat].forEach((m) => m.dispose());
    [rtA, rtB].forEach((rt) => rt.dispose());
    posterTex.dispose();
    renderer.dispose();
  }

  return { state, start, stop, renderOnce, dispose };
}
