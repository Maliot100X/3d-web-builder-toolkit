// Height-field wave simulation (ping-pong). Technique: gentlerain.ai clone
// (references/manish-850__gentlerain.ai/script.js). r = height, g = velocity,
// ba = gradient used by the composite pass to refract the hero texture.
uniform sampler2D uPrev;
uniform vec2 uRes;        // sim resolution in px
uniform vec3 uPointer;    // xy = uv, z = strength (0 = no input)
uniform vec3 uDrop;       // idle drip, same layout
uniform float uAspect;
uniform int uFrame;
varying vec2 vUv;

const float DELTA = 1.4;

float splash(vec2 uv, vec3 p, float radius) {
  if (p.z <= 0.0) return 0.0;
  vec2 d = uv - p.xy;
  d.x *= uAspect;
  float dist = length(d);
  return p.z * smoothstep(radius, 0.0, dist);
}

void main() {
  if (uFrame == 0) { gl_FragColor = vec4(0.0); return; }
  vec2 texel = 1.0 / uRes;
  vec4 data = texture2D(uPrev, vUv);
  float h = data.r;
  float v = data.g;
  float hr = texture2D(uPrev, vUv + vec2(texel.x, 0.0)).r;
  float hl = texture2D(uPrev, vUv - vec2(texel.x, 0.0)).r;
  float hu = texture2D(uPrev, vUv + vec2(0.0, texel.y)).r;
  float hd = texture2D(uPrev, vUv - vec2(0.0, texel.y)).r;

  v += DELTA * (-2.0 * h + hr + hl) / 4.0;
  v += DELTA * (-2.0 * h + hu + hd) / 4.0;
  h += DELTA * v;
  v -= 0.005 * DELTA * h;   // spring back
  v *= 1.0 - 0.002 * DELTA; // damping
  h *= 0.995;

  h += splash(vUv, uPointer, 0.035);
  h += splash(vUv, uDrop, 0.05);

  gl_FragColor = vec4(h, v, (hr - hl) * 0.5, (hu - hd) * 0.5);
}
