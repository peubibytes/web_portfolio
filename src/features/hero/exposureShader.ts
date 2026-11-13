export const VERTEX = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/**
 * Retrato em "exposição longa":
 * - dithering ordenado (Bayer 8×8, mesma fórmula de src/lib/dither.ts)
 * - uExposure 0→1: a placa acumula luz; antes disso há ruído de grão
 * - perto do cursor as células diminuem (o "campo de visão" ganha resolução)
 */
export const FRAGMENT = /* glsl */ `
precision mediump float;
uniform sampler2D uImg;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uExposure;
uniform float uTime;
uniform float uDpr;
uniform vec3 uInk;
varying vec2 vUv;

float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  float dist = length(frag - uMouse) / uDpr;
  float focus = 1.0 - smoothstep(30.0, 150.0, dist);
  float cell = mix(3.0, 1.0, focus) * uDpr;

  vec2 cellId = floor(frag / cell);
  vec2 center = (cellId + 0.5) * cell / uRes;
  vec3 c = texture2D(uImg, vec2(center.x, 1.0 - center.y)).rgb;
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  l = clamp((l - 0.5) * 1.25 + 0.5, 0.0, 1.0);

  vec2 d = (center - 0.5) / 0.5;
  float mask = 1.0 - smoothstep(0.78, 0.98, length(d));

  float grain = (hash(cellId + floor(uTime * 14.0)) - 0.5) * 0.9 * (1.0 - uExposure);
  float ink = ((1.0 - l) * uExposure + grain * 0.6) * mask;

  // estritamente maior: limiar 0 não pode pintar onde não há tinta
  float dotOn = ink > bayer8(cellId) ? 1.0 : 0.0;
  gl_FragColor = vec4(uInk * dotOn, dotOn);
}
`;
