// Núcleo de animação: registra o GSAP e os plugins usados em todas as páginas,
// cria as curvas da marca, o scroll suave (Lenis) e o "portão de entrada" que faz
// as animações de cada página esperarem o loader / a transição terminar.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { CustomWiggle } from 'gsap/CustomWiggle';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, CustomEase, CustomWiggle);
if (import.meta.env.DEV) gsap.config({ nullTargetWarn: true });

CustomEase.create('creme', '0.22,1,0.36,1');
CustomEase.create('espatula', '0.65,0,0.35,1');
CustomWiggle.create('tremido', { wiggles: 6, type: 'easeOut' });

const mq = (q: string) => window.matchMedia(q).matches;

export const reduzido = mq('(prefers-reduced-motion: reduce)');
export const ponteiroFino = mq('(pointer: fine)') && mq('(hover: hover)');
export const telaPequena = mq('(max-width: 767px)');

const html = document.documentElement;
html.classList.add('js');
if (reduzido) html.classList.add('sem-movimento');

// ------------------------------------------------------------------ Lenis
let lenis: Lenis | null = null;

export function scroll(): Lenis | null {
  return lenis;
}

if (!reduzido) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    anchors: { offset: -90 },
    autoRaf: false,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((tempo) => lenis?.raf(tempo * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function rolarPara(alvo: number | string | HTMLElement, imediato = false) {
  if (lenis) lenis.scrollTo(alvo as never, { immediate: imediato, offset: typeof alvo === 'number' ? 0 : -90 });
  else if (typeof alvo === 'number') window.scrollTo({ top: alvo, behavior: imediato ? 'auto' : 'smooth' });
  else {
    const el = typeof alvo === 'string' ? document.querySelector(alvo) : alvo;
    el?.scrollIntoView({ behavior: imediato ? 'auto' : 'smooth' });
  }
}

export function pausarScroll(pausar: boolean) {
  if (!lenis) {
    document.body.style.overflow = pausar ? 'hidden' : '';
    return;
  }
  if (pausar) lenis.stop();
  else lenis.start();
}

// ------------------------------------------------------- portão de entrada
let liberar!: () => void;
const entrada = new Promise<void>((resolver) => (liberar = resolver));
let liberado = false;

/** Chamado pelo loader / pela transição quando a página começa a aparecer. */
export function liberarEntrada() {
  if (liberado) return;
  liberado = true;
  liberar();
}

/** Executa `fn` quando a página estiver visível (depois do loader ou da transição). */
export function aoEntrar(fn: () => void) {
  entrada.then(() => requestAnimationFrame(fn));
}

// atualizações de layout depois que fontes e imagens chegam
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());

// --------------------------------------------------------------- utilitários
/** Duração de um traço proporcional ao comprimento (seção 14 da preparação). */
export function duracaoDoTraco(comprimentoPx: number) {
  return gsap.utils.clamp(0.5, 2.2, comprimentoPx / 1100);
}

export { aleatorio, hash } from './util';

/** Classes dos pedaços do SplitText: as máscaras viram .line-mask/.word-mask/.char-mask (ver base.css). */
export const CLASSES_SPLIT = { linesClass: 'line', wordsClass: 'word', charsClass: 'char' } as const;

export { gsap, ScrollTrigger, SplitText };
