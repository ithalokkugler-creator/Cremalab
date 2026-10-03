// Utilitários puros (rodam no build e no navegador).

/** PRNG determinístico (mulberry32) para rabiscos e variações estáveis. */
export function aleatorio(semente: number) {
  let a = semente >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash FNV-1a de 32 bits. */
export function hash(texto: string) {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom → Bézier cúbica (aberta ou fechada). */
export function curvaSuave(pts: [number, number][], fechada = false, tensao = 1) {
  if (pts.length < 2) return '';
  const n = pts.length;
  const p = (i: number) => (fechada ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
  const segs = fechada ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = p(i - 1);
    const p1 = p(i);
    const p2 = p(i + 1);
    const p3 = p(i + 2);
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tensao;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tensao;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tensao;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tensao;
    d += `C${r1(c1x)} ${r1(c1y)} ${r1(c2x)} ${r1(c2y)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return fechada ? `${d}Z` : d;
}

/** Arredonda as coordenadas de um "d" de SVG (1 casa decimal): os traços do Rough.js ficam bem menores. */
export const arredondarPath = (d: string) =>
  d.replace(/-?\d*\.\d+/g, (n) => {
    const r = Math.round(Number(n) * 10) / 10;
    return Object.is(r, -0) ? '0' : String(r);
  });
