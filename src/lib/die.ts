/**
 * Dé à 20 faces en fil de fer, dessiné sur un canvas.
 * Tourne doucement au repos, se lance au clic ; la face qui s'arrête devant appelle onResult.
 */
const PHI = (1 + Math.sqrt(5)) / 2;
const POINTS: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];
// Numérotation d'un vrai d20 : deux faces opposées font toujours 21.
const NUMBERS = [20, 8, 14, 2, 17, 5, 11, 9, 3, 16, 1, 13, 7, 19, 10, 15, 6, 12, 4, 18];

export interface DieOptions {
  onResult: (value: number) => void;
  reducedMotion: boolean;
}

export function createDie(canvas: HTMLCanvasElement, { onResult, reducedMotion }: DieOptions) {
  const ctx = canvas.getContext('2d')!;
  const size = canvas.width;
  const scale = size * 0.245;
  let ax = 0.6, ay = 0.4, vx = 0, vy = 0;
  let rolling = false;
  let visible = true;
  let frame = 0;
  let lastTime = 0;
  let ink = '#ffffff';

  const readInk = () => { ink = getComputedStyle(canvas).color; };
  readInk();
  new MutationObserver(() => { readInk(); if (!frame) draw(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  function rotate([x, y, z]: number[]) {
    let c = Math.cos(ay), s = Math.sin(ay);
    [x, z] = [x * c + z * s, -x * s + z * c];
    c = Math.cos(ax); s = Math.sin(ax);
    [y, z] = [y * c - z * s, y * s + z * c];
    return [x, y, z];
  }

  /** Dessine le dé et renvoie le numéro de la face la plus proche du spectateur. */
  function draw(): number {
    const r = POINTS.map(rotate);
    const faces = FACES.map((f, k) => ({
      k, f, c: [0, 1, 2].map((j) => (r[f[0]][j] + r[f[1]][j] + r[f[2]][j]) / 3),
    })).sort((a, b) => a.c[2] - b.c[2]);
    const top = faces[faces.length - 1];

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = ink;
    for (const o of faces) {
      const front = o.c[2] > 0;
      ctx.beginPath();
      o.f.forEach((v, j) => {
        const x = size / 2 + r[v][0] * scale, y = size / 2 - r[v][1] * scale;
        j ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      ctx.closePath();
      ctx.globalAlpha = front ? 0.9 : 0.15;
      ctx.lineWidth = front ? size / 60 : size / 120;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = ink;
    ctx.font = `700 ${Math.round(size * 0.19)}px "Space Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(NUMBERS[top.k]), size / 2 + top.c[0] * scale, size / 2 - top.c[1] * scale);
    return NUMBERS[top.k];
  }

  /** Vitesses exprimées par image à 60 Hz ; `k` les ramène à la durée réelle écoulée (écrans 30/60/144 Hz). */
  function tick(now: number) {
    const k = Math.min((now - (lastTime || now)) / (1000 / 60), 3);
    lastTime = now;
    const friction = 0.965 ** k;
    ax += vx * k; ay += vy * k; vx *= friction; vy *= friction;
    const value = draw();
    if (rolling && Math.abs(vx) + Math.abs(vy) < 0.004) {
      rolling = false; vx = vy = 0;
      onResult(value);
    }
    if (!rolling) ay += 0.0015 * k;
    frame = visible ? requestAnimationFrame(tick) : 0;
  }

  function roll() {
    if (reducedMotion) {
      // Pas d'animation : on pose le dé dans une position tirée au hasard.
      ax = Math.random() * Math.PI * 2; ay = Math.random() * Math.PI * 2;
      onResult(draw());
      return;
    }
    if (rolling) return;
    vx = (Math.random() - 0.5) * 0.5 + 0.25;
    vy = (Math.random() - 0.5) * 0.5 + 0.3;
    rolling = true;
  }

  if (reducedMotion) {
    draw();
  } else {
    // On n'anime que lorsque le dé est visible à l'écran.
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !frame) { lastTime = 0; frame = requestAnimationFrame(tick); }
    }).observe(canvas);
    frame = requestAnimationFrame(tick);
  }

  return { roll };
}
