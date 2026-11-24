// Refract the hero "poster" texture (canvas-drawn type + gradient) through the
// wave gradient, with a little chromatic split and a specular glint.
uniform sampler2D uSim;
uniform sampler2D uPoster;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  vec4 data = texture2D(uSim, vUv);
  vec2 offs = data.ba * 0.35;
  float r = texture2D(uPoster, vUv + offs * 1.06).r;
  float g = texture2D(uPoster, vUv + offs).g;
  float b = texture2D(uPoster, vUv + offs * 0.94).b;
  vec3 col = vec3(r, g, b);
  vec3 n = normalize(vec3(-data.ba * 9.0, 1.0));
  float spec = pow(max(dot(n, normalize(vec3(-0.6, 0.8, 1.6))), 0.0), 70.0);
  col += spec * 0.35;
  gl_FragColor = vec4(col, uOpacity);
}
