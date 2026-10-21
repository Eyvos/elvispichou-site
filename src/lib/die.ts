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
/** Les 30 arêtes de l'icosaèdre : [sommet, sommet, face, face], chacune partagée par exactement deux faces. */
const EDGES: [number, number, number, number][] = (() => {
  const seen = new Map<string, [number, number, number, number]>();
  FACES.forEach((f, k) => {
    for (let j = 0; j < 3; j++) {
      const a = f[j], b = f[(j + 1) % 3], key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const e = seen.get(key);
      if (e) e[3] = k; else seen.set(key, [a, b, k, k]);
    }
  });
  return [...seen.values()];
})();
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
  let settled = false; // le dé a fini de rouler et repose sur une face : plus de dérive, plus d'animation
  let settle: { t0: number; ax0: number; ay0: number; ax1: number; ay1: number; face: number } | null = null;
  let topFace = 0;
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
    const centers = FACES.map((f) => [0, 1, 2].map((j) => (r[f[0]][j] + r[f[1]][j] + r[f[2]][j]) / 3));
    let top = 0;
    centers.forEach((c, k) => { if (c[2] > centers[top][2]) top = k; });
    topFace = top;

    // Chaque arête n'est tracée qu'une fois (les faces voisines la partagent) : trait net, sans surépaisseur ni pointe aux sommets.
    // Une arête est « devant » si l'une de ses deux faces regarde le spectateur (les arêtes de contour comprises).
    const front = new Set<number>();
    EDGES.forEach(([, , f1, f2], i) => { if (centers[f1][2] > 0 || centers[f2][2] > 0) front.add(i); });
    const path = (wanted: boolean) => {
      ctx.beginPath();
      EDGES.forEach(([a, b], i) => {
        if (front.has(i) !== wanted) return;
        ctx.moveTo(size / 2 + r[a][0] * scale, size / 2 - r[a][1] * scale);
        ctx.lineTo(size / 2 + r[b][0] * scale, size / 2 - r[b][1] * scale);
      });
      ctx.stroke();
    };

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = ink;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = size / 120;
    path(false);
    ctx.globalAlpha = 0.9;
    ctx.lineWidth = size / 60;
    path(true);
    ctx.globalAlpha = 1;
    ctx.fillStyle = ink;
    ctx.font = `700 ${Math.round(size * 0.19)}px "Space Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(NUMBERS[top]), size / 2 + centers[top][0] * scale, size / 2 - centers[top][1] * scale);
    return NUMBERS[top];
  }

  /** Angles (ay puis ax, comme `rotate`) qui amènent le centre de la face `k` droit face au spectateur : le numéro est alors centré. */
  function anglesFor(k: number): [number, number] {
    const f = FACES[k];
    const [x, y, z] = [0, 1, 2].map((j) => (POINTS[f[0]][j] + POINTS[f[1]][j] + POINTS[f[2]][j]) / 3);
    const rho = Math.hypot(x, z);
    return [Math.atan2(y, rho), Math.atan2(-x, z)];
  }
  /** Même orientation, par le chemin le plus court depuis l'orientation actuelle (pas de tour complet en trop). */
  const nearest = (target: number, from: number) => target + Math.PI * 2 * Math.round((from - target) / (Math.PI * 2));

  /** Vitesses exprimées par image à 60 Hz ; `k` les ramène à la durée réelle écoulée (écrans 30/60/144 Hz). */
  function tick(now: number) {
    const k = Math.min((now - (lastTime || now)) / (1000 / 60), 3);
    lastTime = now;
    if (settle) {
      // Fin de course : le dé se redresse doucement pour poser la face obtenue bien en face.
      const p = Math.min((now - settle.t0) / 450, 1), e = 1 - (1 - p) ** 3;
      ax = settle.ax0 + (settle.ax1 - settle.ax0) * e;
      ay = settle.ay0 + (settle.ay1 - settle.ay0) * e;
      draw();
      if (p >= 1) {
        const face = settle.face;
        settle = null; settled = true;
        onResult(NUMBERS[face]);
      }
      frame = visible ? requestAnimationFrame(tick) : 0;
      return;
    }
    if (settled) { draw(); frame = 0; return; }
    const friction = 0.965 ** k;
    ax += vx * k; ay += vy * k; vx *= friction; vy *= friction;
    draw();
    if (rolling && Math.abs(vx) + Math.abs(vy) < 0.004) {
      rolling = false; vx = vy = 0;
      const [tx, ty] = anglesFor(topFace);
      settle = { t0: now, ax0: ax, ay0: ay, ax1: nearest(tx, ax), ay1: nearest(ty, ay), face: topFace };
    }
    if (!rolling) ay += 0.0015 * k;
    frame = visible ? requestAnimationFrame(tick) : 0;
  }

  function roll() {
    if (reducedMotion) {
      // Pas d'animation : on pose le dé sur une face tirée au hasard, bien en face.
      const face = Math.floor(Math.random() * FACES.length);
      [ax, ay] = anglesFor(face);
      draw();
      onResult(NUMBERS[face]);
      return;
    }
    if (rolling || settle) return;
    settled = false;
    // Toujours un vrai lancer : direction quelconque, mais vitesse d'au moins 0,38 (≈ 1,7 tour) pour que le dé ne bouge jamais « à peine ».
    const dir = Math.random() * Math.PI * 2, mag = 0.38 + Math.random() * 0.22;
    vx = Math.cos(dir) * mag; vy = Math.sin(dir) * mag;
    rolling = true;
    if (!frame && visible) { lastTime = 0; frame = requestAnimationFrame(tick); }
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
