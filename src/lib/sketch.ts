/**
 * Traços "a lápis": caminhos SVG levemente irregulares e determinísticos
 * (mesma semente → mesmo traço; nada muda entre renders).
 */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Elipse desenhada à mão: não fecha perfeitamente, passa um pouco do ponto inicial. */
export function sketchEllipse(cx: number, cy: number, rx: number, ry: number, seed = 1, overshoot = 0.12) {
  const r = rng(seed);
  const steps = 48;
  const start = -Math.PI * 0.62;
  const total = Math.PI * 2 * (1 + overshoot);
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = start + (total * i) / steps;
    const wobble = 1 + (r() - 0.5) * 0.025 + (i / steps) * 0.03;
    const x = cx + Math.cos(t) * rx * wobble;
    const y = cy + Math.sin(t) * ry * wobble;
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

/** Linha levemente curva de (x1,y1) a (x2,y2), com ponta de seta opcional. */
export function sketchArrow(x1: number, y1: number, x2: number, y2: number, seed = 1, head = true) {
  const r = rng(seed);
  const mx = (x1 + x2) / 2 + (r() - 0.5) * Math.abs(y2 - y1) * 0.25;
  const my = (y1 + y2) / 2 + (r() - 0.5) * Math.abs(x2 - x1) * 0.25;
  let d = `M${x1} ${y1} Q${mx.toFixed(2)} ${my.toFixed(2)} ${x2} ${y2}`;
  if (head) {
    const a = Math.atan2(y2 - my, x2 - mx);
    const len = 2.4;
    const h1x = x2 - Math.cos(a - 0.45) * len;
    const h1y = y2 - Math.sin(a - 0.45) * len;
    const h2x = x2 - Math.cos(a + 0.45) * len;
    const h2y = y2 - Math.sin(a + 0.45) * len;
    d += ` M${h1x.toFixed(2)} ${h1y.toFixed(2)} L${x2} ${y2} L${h2x.toFixed(2)} ${h2y.toFixed(2)}`;
  }
  return d;
}
