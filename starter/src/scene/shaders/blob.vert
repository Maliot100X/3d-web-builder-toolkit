// NOISE_CHUNK is injected by JS (noise.glsl)
uniform float uTime;
uniform float uDistort;
uniform float uFreq;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

void main() {
  float n = snoise(normal * uFreq + vec3(uTime * 0.25));
  vec3 displaced = position + normal * n * uDistort;
  // cheap normal re-estimate: perturb along noise derivative proxy
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  vNoise = n;
  gl_Position = projectionMatrix * mv;
}
