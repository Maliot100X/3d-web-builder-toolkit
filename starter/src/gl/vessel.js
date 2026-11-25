/**
 * "Hold it": the one place three.js earns its weight. The product turns in your
 * hands, so the visitor can see the glaze catch studio light and pick the glaze
 * it was fired in.
 *
 *  - Lathe-turned stoneware body (a real wall thickness: outer profile, rim, inner wall)
 *  - MeshPhysicalMaterial glaze: clearcoat over a slightly rough body; a canvas-generated
 *    crackle/speckle map feeds roughness + bump so highlights break like real celadon
 *  - Unglazed raw foot ring in a second material (how wood-fired pots really look)
 *  - Studio lighting: RoomEnvironment through PMREM (soft-box reflections) + one shadowing key light,
 *    shadow on an invisible ShadowMaterial floor, ACES tone mapping, sRGB output
 *  - Drag to turn (inertia); scroll progress adds a slow turn; glaze swatches tween colour/roughness
 *  - Renders on the GSAP ticker only while on screen; reduced motion = render on demand
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { dpr } from '../lib/env.js';

export const GLAZES = {
  celadon: { color: '#8fae9b', roughness: 0.34, clearcoat: 1, sheen: 0.0, crackle: 0.55 },
  oatmeal: { color: '#d9cdb8', roughness: 0.62, clearcoat: 0.35, sheen: 0.2, crackle: 0.15 },
  tenmoku: { color: '#2a1d16', roughness: 0.22, clearcoat: 1, sheen: 0.0, crackle: 0.05 },
};

/** Vase silhouette (radius, height) in cm-ish units, foot → shoulder → neck → lip. */
const OUTER = [[0.0, 0.0], [0.78, 0.0], [0.86, 0.06], [0.84, 0.16], [1.05, 0.55], [1.38, 1.25], [1.5, 1.85], [1.36, 2.55], [0.92, 3.15], [0.5, 3.6], [0.4, 4.0], [0.44, 4.35], [0.6, 4.62]];
const crackleTexture = () => {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#808080'; g.fillRect(0, 0, 512, 512);
  // speckle (iron spots in the clay body)
  for (let i = 0; i < 2600; i++) {
    const v = 60 + Math.random() * 90;
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.globalAlpha = 0.35 + Math.random() * 0.5;
    g.beginPath(); g.arc(Math.random() * 512, Math.random() * 512, Math.random() * 1.6 + 0.3, 0, Math.PI * 2); g.fill();
  }
  // crackle: random walk polylines, darker = rougher seams
  g.globalAlpha = 0.6; g.strokeStyle = '#3a3a3a'; g.lineWidth = 0.9;
  for (let i = 0; i < 140; i++) {
    let x = Math.random() * 512, y = Math.random() * 512, a = Math.random() * Math.PI * 2;
    g.beginPath(); g.moveTo(x, y);
    for (let s = 0; s < 14; s++) { a += (Math.random() - 0.5) * 1.1; x += Math.cos(a) * 9; y += Math.sin(a) * 9; g.lineTo(x, y); }
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 2);
  return t;
};

export function createVessel(host, { reduced, onReady }) {
  const canvas = document.createElement('canvas');
  canvas.className = 'vessel-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: dpr() < 1.5, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  host.appendChild(canvas);
  renderer.setPixelRatio(dpr());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // The vessel is a surface of revolution, so its shadow is identical at every yaw:
  // render the shadow map once instead of every frame.
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  camera.position.set(0, 2.5, 13.5);
  camera.lookAt(0, 2.15, 0);

  const key = new THREE.DirectionalLight('#fff4e6', 2.4);
  key.position.set(-4, 7, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 8;
  key.shadow.bias = -0.0005;
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 6, bottom: -2, near: 1, far: 20 });
  scene.add(key);
  const rim = new THREE.DirectionalLight('#cfe3ff', 0.9);
  rim.position.set(5, 4, -6);
  scene.add(rim);

  // body: outer profile, lip, inner wall (thickness 0.07)
  const pts = OUTER.map(([r, y]) => new THREE.Vector2(r, y));
  const inner = OUTER.slice(1).reverse().map(([r, y]) => new THREE.Vector2(Math.max(0.01, r - 0.07), Math.max(0.12, y - (y > 4.5 ? 0.03 : 0))));
  const profile = [...pts, ...inner, new THREE.Vector2(0.0, 0.12)];
  const bodyGeo = new THREE.LatheGeometry(profile, 160);
  bodyGeo.computeVertexNormals();
  const crackle = crackleTexture();
  const glaze = new THREE.MeshPhysicalMaterial({
    color: GLAZES.celadon.color, roughness: GLAZES.celadon.roughness, roughnessMap: crackle,
    bumpMap: crackle, bumpScale: 0.6, clearcoat: 1, clearcoatRoughness: 0.18,
    sheen: 0, sheenColor: new THREE.Color('#fff'), ior: 1.52, side: THREE.DoubleSide,
  });
  const body = new THREE.Mesh(bodyGeo, glaze);
  body.castShadow = true;
  body.receiveShadow = true;

  // raw foot: unglazed clay band where the glaze stops
  const footGeo = new THREE.LatheGeometry([[0.0, -0.001], [0.785, -0.001], [0.865, 0.06], [0.848, 0.17], [0.0, 0.17]].map(([r, y]) => new THREE.Vector2(r, y)), 160);
  const raw = new THREE.MeshStandardMaterial({ color: '#b07a55', roughness: 0.95, bumpMap: crackle, bumpScale: 1.2 });
  const foot = new THREE.Mesh(footGeo, raw);
  foot.castShadow = true;

  const vase = new THREE.Group();
  vase.add(body, foot);
  vase.rotation.z = 0.0;
  scene.add(vase);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.22 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // interaction state
  let yaw = -0.4, vel = reduced ? 0 : 0.0035, dragging = false, lastX = 0, scrollYaw = 0, visible = false, dirty = true;
  const onDown = (e) => { dragging = true; lastX = e.clientX; host.setPointerCapture?.(e.pointerId); host.classList.add('is-grabbing'); };
  const onMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    yaw += dx * 0.012; vel = dx * 0.0009; dirty = true;
  };
  const onUp = () => { dragging = false; host.classList.remove('is-grabbing'); if (reduced) vel = 0; };
  host.addEventListener('pointerdown', onDown);
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerup', onUp);
  host.addEventListener('pointercancel', onUp);

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 0.8 ? 32 : 26;
    camera.updateProjectionMatrix();
    dirty = true;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; dirty = true; }, { rootMargin: '10%' });
  io.observe(host);

  // Adaptive resolution: if frames run slow (weak GPU), drop pixel ratio once.
  let first = true, last = 0, slow = 0, lowered = false;
  const tick = () => {
    if (!visible) return;
    const now = performance.now();
    if (!lowered && last && now - last > 34) { if (++slow > 20) { lowered = true; renderer.setPixelRatio(1); resize(); } } else slow = Math.max(0, slow - 1);
    last = now;
    if (!dragging && !reduced) { yaw += vel; vel += (0.0035 - vel) * 0.02; dirty = true; }
    if (!dirty) return;
    dirty = false;
    vase.rotation.y = yaw + scrollYaw;
    renderer.render(scene, camera);
    if (first) { first = false; onReady?.(); }
  };
  gsap.ticker.add(tick);

  return {
    setGlaze(name) {
      const g = GLAZES[name];
      if (!g) return;
      const c = new THREE.Color(g.color);
      const d = reduced ? 0 : 0.9;
      gsap.to(glaze.color, { r: c.r, g: c.g, b: c.b, duration: d, ease: 'power2.inOut', onUpdate: () => (dirty = true) });
      gsap.to(glaze, { roughness: g.roughness, clearcoat: g.clearcoat, sheen: g.sheen, bumpScale: g.crackle, duration: d, ease: 'power2.inOut', onUpdate: () => (dirty = true), onComplete: () => (dirty = true) });
      if (!reduced) gsap.fromTo(vase.position, { y: 0 }, { y: 0.12, yoyo: true, repeat: 1, duration: 0.4, ease: 'sine.inOut', onUpdate: () => { dirty = true; renderer.shadowMap.needsUpdate = true; } });
    },
    setScroll(p) { scrollYaw = p * Math.PI * 1.5; dirty = true; },
    dispose() {
      gsap.ticker.remove(tick); ro.disconnect(); io.disconnect();
      host.removeEventListener('pointerdown', onDown); host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerup', onUp); host.removeEventListener('pointercancel', onUp);
      bodyGeo.dispose(); footGeo.dispose(); glaze.dispose(); raw.dispose(); crackle.dispose(); envTex.dispose(); pmrem.dispose();
      floor.geometry.dispose(); floor.material.dispose(); renderer.dispose(); canvas.remove();
    },
  };
}
