// Ferramentas de "desenho": marca (máscaras de esqueleto) e line art (DrawSVG).
import { gsap, ScrollTrigger, reduzido, duracaoDoTraco } from './nucleo';

type OpcoesMarca = { duracao?: number; atraso?: number; ease?: string; sobreposicao?: number };

/** Anima o monograma/wordmark: cada esqueleto revela a forma original na ordem de escrita. */
export function desenharMarca(svg: SVGSVGElement, opcoes: OpcoesMarca = {}) {
  const { duracao = 1.6, atraso = 0, ease = 'power1.inOut', sobreposicao = 0.82 } = opcoes;
  const esqueletos = Array.from(svg.querySelectorAll<SVGPathElement>('.marca__esqueleto'));
  const tl = gsap.timeline({ delay: atraso });
  if (reduzido || !esqueletos.length) {
    gsap.set(svg, { visibility: 'visible' });
    gsap.set(esqueletos, { drawSVG: '0% 100%' });
    return tl;
  }
  const comps = esqueletos.map((p) => p.getTotalLength());
  const total = comps.reduce((a, b) => a + b, 0) || 1;
  gsap.set(esqueletos, { drawSVG: '0% 0%' });
  gsap.set(svg, { visibility: 'visible' });
  let t = 0;
  esqueletos.forEach((p, i) => {
    const d = Math.max((duracao * comps[i]) / total, 0.14);
    tl.to(p, { drawSVG: '0% 100%', duration: d, ease }, t);
    t += d * sobreposicao;
  });
  return tl;
}

/** Deixa a marca pronta para ser desenhada (invisível, sem piscar). */
export function esconderMarca(svg: SVGSVGElement) {
  const esqueletos = svg.querySelectorAll<SVGPathElement>('.marca__esqueleto');
  gsap.set(esqueletos, { drawSVG: '0% 0%' });
  gsap.set(svg, { visibility: 'visible' });
}

export function mostrarMarca(svg: SVGSVGElement) {
  gsap.set(svg.querySelectorAll('.marca__esqueleto'), { drawSVG: '0% 100%' });
  gsap.set(svg, { visibility: 'visible' });
}

type OpcoesTracos = {
  duracao?: number;
  stagger?: number;
  ease?: string;
  atraso?: number;
  proporcional?: boolean;
};

/** Desenha traços de line art (paths com stroke) e faz os pontos "pularem". */
export function desenharTracos(raiz: Element, opcoes: OpcoesTracos = {}) {
  const { duracao, stagger = 0.035, ease = 'espatula', atraso = 0, proporcional = true } = opcoes;
  const paths = Array.from(raiz.querySelectorAll<SVGPathElement>('path'));
  const pontos = Array.from(raiz.querySelectorAll<SVGCircleElement>('circle'));
  const tl = gsap.timeline({ delay: atraso });
  gsap.set(raiz, { visibility: 'visible' });
  if (reduzido) return tl;
  if (paths.length) gsap.set(paths, { drawSVG: '0% 0%' });
  if (pontos.length) gsap.set(pontos, { scale: 0, transformOrigin: '50% 50%' });
  paths.forEach((p, i) => {
    const comp = proporcional ? p.getBoundingClientRect().width + p.getBoundingClientRect().height : 600;
    tl.to(p, { drawSVG: '0% 100%', duration: duracao ?? duracaoDoTraco(comp * 1.4), ease }, i * stagger);
  });
  if (pontos.length) {
    tl.to(pontos, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.45)', stagger: 0.05 }, '>-0.4');
  }
  return tl;
}

/** Prepara um SVG de traços para ser desenhado depois (estado inicial invisível). */
export function esconderTracos(raiz: Element) {
  const paths = raiz.querySelectorAll('path');
  const pontos = raiz.querySelectorAll('circle');
  gsap.set(raiz, { visibility: 'visible' });
  if (reduzido) return;
  if (paths.length) gsap.set(paths, { drawSVG: '0% 0%' });
  if (pontos.length) gsap.set(pontos, { scale: 0, transformOrigin: '50% 50%' });
}

/** Desenha quando o elemento entra na tela. */
export function desenharAoRolar(raiz: Element, opcoes: OpcoesTracos & { inicio?: string } = {}) {
  esconderTracos(raiz);
  if (reduzido) return;
  ScrollTrigger.create({
    trigger: raiz,
    start: opcoes.inicio ?? 'top 82%',
    once: true,
    onEnter: () => desenharTracos(raiz, opcoes),
  });
}
