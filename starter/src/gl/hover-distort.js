/**
 * Purposeful WebGL: one tiny WebGL1 context shared by every product card. On hover
 * the canvas moves into that card and renders its own photo with a soft liquid
 * ripple that follows the cursor and eases out on leave. No three.js needed.
 * Skipped on touch and reduced motion (the plain <img> is the content).
 */
const VERT = `attribute vec2 p; varying vec2 v; void main(){ v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `precision mediump float;
varying vec2 v;
uniform sampler2D t;
uniform vec2 m;       // pointer in uv
uniform float k;      // strength 0..1
uniform float time;
uniform vec4 cover;   // uv scale (xy) + offset (zw) for object-fit: cover
void main(){
  vec2 uv = vec2(v.x, 1.0 - v.y);
  vec2 d = uv - m;
  float r = length(d * vec2(1.0, 1.33));
  float wave = sin(r * 30.0 - time * 4.0) * exp(-r * 3.2) * 0.032 * k;
  vec2 o = normalize(d + 1e-5) * wave;
  vec2 zuv = mix(uv, m, 0.045 * k);  // slight push-in toward the cursor
  vec2 cuv = (zuv + o) * cover.xy + cover.zw;
  float split = 0.009 * k * exp(-r * 2.5);
  float cr = texture2D(t, cuv + o * 0.6 + vec2(split, 0.0)).r;
  float cg = texture2D(t, cuv).g;
  float cb = texture2D(t, cuv - vec2(split, 0.0)).b;
  float glint = max(wave, 0.0) * 6.0;  // light catching the ripple crests
  gl_FragColor = vec4(vec3(cr, cg, cb) + glint, 1.0);
}`;

export function initHoverDistort() {
  const frames = [...document.querySelectorAll('[data-distort]')];
  if (!frames.length) return () => {};
  const canvas = document.createElement('canvas');
  canvas.className = 'distort-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false });
  if (!gl) return () => {};

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {};
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = Object.fromEntries(['t', 'm', 'k', 'time', 'cover'].map((n) => [n, gl.getUniformLocation(prog, n)]));
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((w) => gl.texParameteri(gl.TEXTURE_2D, w, gl.CLAMP_TO_EDGE));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  let active = null, raf = 0, strength = 0, target = 0, mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
  const start = performance.now();

  function bind(frame) {
    const img = frame.querySelector('img');
    if (!img.complete || !img.naturalWidth) return false;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    const r = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(frame.clientWidth * r);
    canvas.height = Math.round(frame.clientHeight * r);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const fa = frame.clientWidth / frame.clientHeight, ia = img.naturalWidth / img.naturalHeight;
    const sx = fa > ia ? 1 : fa / ia, sy = fa > ia ? ia / fa : 1;
    gl.uniform4f(U.cover, sx, sy, (1 - sx) / 2, (1 - sy) / 2);
    frame.appendChild(canvas);
    return true;
  }

  function loop() {
    strength += (target - strength) * 0.08;
    mx += (tmx - mx) * 0.12; my += (tmy - my) * 0.12;
    gl.uniform1f(U.k, strength);
    gl.uniform2f(U.m, mx, my);
    gl.uniform1f(U.time, (performance.now() - start) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (target === 0 && strength < 0.01) { active?.classList.remove('is-distorting'); active = null; raf = 0; return; }
    raf = requestAnimationFrame(loop);
  }

  const enter = (e) => {
    const frame = e.currentTarget;
    if (active && active !== frame) active.classList.remove('is-distorting');
    if (!bind(frame)) return;
    active = frame; target = 1;
    frame.classList.add('is-distorting');
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    tmx = (e.clientX - r.left) / r.width; tmy = (e.clientY - r.top) / r.height;
  };
  const leave = () => { target = 0; };
  frames.forEach((f) => { f.addEventListener('pointerenter', enter); f.addEventListener('pointermove', move); f.addEventListener('pointerleave', leave); });

  return () => {
    cancelAnimationFrame(raf);
    frames.forEach((f) => { f.removeEventListener('pointerenter', enter); f.removeEventListener('pointermove', move); f.removeEventListener('pointerleave', leave); });
    gl.deleteTexture(tex); gl.deleteBuffer(buf); gl.deleteProgram(prog);
    canvas.remove();
  };
}
