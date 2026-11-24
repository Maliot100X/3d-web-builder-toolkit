// Iridescent fresnel shell with an IQ cosine palette (https://iquilezles.org/articles/palettes/)
uniform float uTime;
uniform float uHue;
uniform vec3 uTint;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

vec3 palette(float t) {
  vec3 a = vec3(0.5), b = vec3(0.5), c = vec3(1.0), d = vec3(0.0, 0.33, 0.67);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.2);
  vec3 base = palette(vNoise * 0.45 + uHue + uTime * 0.03);
  vec3 col = mix(uTint * 0.15, base, 0.35 + fres * 0.9);
  col += fres * 0.6;
  gl_FragColor = vec4(col, 1.0);
}
