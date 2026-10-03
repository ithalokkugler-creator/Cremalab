// Loader (1ª visita) e transições entre páginas com a "espatulada".
// Navegação é uma troca de página normal (MPA): a camada cobre a tela, a próxima página
// já nasce coberta (classe .coberto aplicada no <head>) e então revela.
import { gsap, reduzido, liberarEntrada, rolarPara } from './nucleo';
import { desenharMarca, mostrarMarca } from './desenho';
import { CORES, TINTA, MUNDO_DA_ROTA, type Mundo } from '../data/site';

const html = document.documentElement;
const camada = document.querySelector<HTMLElement>('.espatulada')!;
const traco = camada.querySelector<SVGPathElement>('.espatulada__traco')!;
const solido = camada.querySelector<HTMLElement>('.espatulada__solido')!;
const caixaMono = camada.querySelector<HTMLElement>('.espatulada__mono')!;
const mono = caixaMono.querySelector<SVGSVGElement>('svg')!;
const aviso = document.getElementById('aviso-carregamento');

const LARGURA_MIN = 70;
const LARGURA_MAX = 340;
const CHAVE = 'crema:transicao';
const VISITOU = 'crema:visitou';
const ROTACAO: Mundo[] = ['terracota', 'ambar', 'pistache-creme', 'rosa', 'cacau'];

const sessao = {
  ler(chave: string) {
    try {
      return sessionStorage.getItem(chave);
    } catch {
      return null;
    }
  },
  gravar(chave: string, valor: string) {
    try {
      sessionStorage.setItem(chave, valor);
    } catch {
      /* navegação privada sem storage: segue sem lembrar */
    }
  },
  apagar(chave: string) {
    try {
      sessionStorage.removeItem(chave);
    } catch {
      /* idem */
    }
  },
};

export function mundoDaRota(caminho: string): Mundo {
  const c = caminho.replace(/\/+$/, '') || '/';
  for (const [prefixo, mundo] of MUNDO_DA_ROTA) {
    if (prefixo === '/' ? c === '/' : c === prefixo || c.startsWith(`${prefixo}/`)) return mundo;
  }
  return 'terracota';
}

function aplicarCor(mundo: Mundo) {
  camada.style.setProperty('--cor-transicao', CORES[mundo]);
  camada.style.setProperty('--cor-mono-transicao', TINTA[mundo]);
}

/** Promessa que resolve quando a animação termina. */
const fim = (anim: gsap.core.Animation) =>
  new Promise<void>((resolve) => {
    anim.then(() => resolve());
  });

/** Cobre a tela com a espatulada (≈ 0,85 s). */
export function cobrir(mundo: Mundo): Promise<void> {
  aplicarCor(mundo);
  camada.classList.add('ativa');
  gsap.killTweensOf([traco, solido, caixaMono]);
  if (reduzido) {
    gsap.set(caixaMono, { opacity: 0 });
    return fim(gsap.fromTo(solido, { opacity: 0 }, { opacity: 1, duration: 0.22 }));
  }
  gsap.set(solido, { opacity: 0 });
  gsap.set(traco, { visibility: 'visible', drawSVG: '0% 0%', attr: { 'stroke-width': LARGURA_MIN } });
  gsap.set(caixaMono, { opacity: 1, scale: 1 });
  const tl = gsap.timeline();
  tl.to(traco, { drawSVG: '0% 100%', duration: 0.85, ease: 'espatula' }, 0)
    .to(traco, { attr: { 'stroke-width': LARGURA_MAX }, duration: 0.85, ease: 'power2.inOut' }, 0)
    .add(desenharMarca(mono, { duracao: 0.62 }), 0.32)
    .set(solido, { opacity: 1 });
  return fim(tl);
}

/** Revela a página (≈ 1,1 s) e libera as animações de entrada. */
export function revelar(): Promise<void> {
  camada.classList.add('ativa');
  html.classList.remove('coberto');
  gsap.set(solido, { opacity: 1 });
  mostrarMarca(mono);
  gsap.set(caixaMono, { opacity: 1, scale: 1 });
  if (reduzido) {
    liberarEntrada();
    return fim(gsap.to([solido, caixaMono], { opacity: 0, duration: 0.25, onComplete: () => camada.classList.remove('ativa') }));
  }
  gsap.set(traco, { visibility: 'visible', drawSVG: '0% 100%', attr: { 'stroke-width': LARGURA_MAX } });
  const tl = gsap.timeline({
    onComplete: () => {
      camada.classList.remove('ativa');
      gsap.set(traco, { visibility: 'hidden' });
    },
  });
  tl.set(solido, { opacity: 0 }, 0.04)
    .to(caixaMono, { opacity: 0, scale: 0.86, duration: 0.3, ease: 'power2.in' }, 0)
    .to(traco, { drawSVG: '100% 100%', duration: 1.05, ease: 'power2.inOut' }, 0.06)
    .to(traco, { attr: { 'stroke-width': LARGURA_MIN }, duration: 1.05, ease: 'power2.inOut' }, 0.06)
    .call(liberarEntrada, undefined, 0.32);
  return fim(tl);
}

const espera = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function primeiraImagem(): Promise<void> {
  const img = document.querySelector<HTMLImageElement>('[data-lcp] img, img[fetchpriority="high"]');
  if (!img || img.complete) return Promise.resolve();
  return new Promise((r) => {
    img.addEventListener('load', () => r(), { once: true });
    img.addEventListener('error', () => r(), { once: true });
  });
}

async function carregar() {
  const loader = document.querySelector<HTMLElement>('.loader');
  if (!loader) return;
  if (aviso) aviso.textContent = 'Preparando a vitrine…';
  const monoLoader = loader.querySelector<SVGSVGElement>('svg.marca')!;
  const onda = loader.querySelector<SVGPathElement>('.loader__onda path')!;
  gsap.set(onda, { drawSVG: '0% 0%' });
  const desenho = desenharMarca(monoLoader, { duracao: 1.45, atraso: 0.15 });
  gsap.to(onda, { drawSVG: '0% 72%', duration: 1.5, ease: 'power1.out' });
  await Promise.race([Promise.all([document.fonts?.ready, primeiraImagem()]), espera(2600)]);
  await desenho.then(() => undefined);
  await gsap.to(onda, { drawSVG: '0% 100%', duration: 0.3, ease: 'power2.out' }).then(() => undefined);
  await cobrir('terracota');
  loader.remove();
  html.classList.remove('carregando');
  sessao.gravar(VISITOU, '1');
  if (aviso) aviso.textContent = '';
  await revelar();
}

function iniciar() {
  const coberto = html.classList.contains('coberto');
  const carregando = html.classList.contains('carregando');
  sessao.apagar(CHAVE);

  if (carregando && !reduzido) {
    carregar();
  } else if (coberto) {
    html.classList.remove('carregando');
    document.querySelector('.loader')?.remove();
    Promise.race([document.fonts?.ready, espera(450)]).then(() => revelar());
  } else {
    html.classList.remove('carregando');
    document.querySelector('.loader')?.remove();
    sessao.gravar(VISITOU, '1');
    liberarEntrada();
  }
}

// --------------------------------------------------------- links internos
function deveInterceptar(e: MouseEvent, a: HTMLAnchorElement) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if ((a.target && a.target !== '_self') || a.hasAttribute('download') || 'semTransicao' in a.dataset) return false;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return false;
  if (!/^https?:$/.test(url.protocol)) return false;
  return true;
}

let navegando = false;

document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest?.('a');
  if (!a || !deveInterceptar(e, a as HTMLAnchorElement)) return;
  const url = new URL((a as HTMLAnchorElement).href, location.href);
  const mesmaPagina = url.pathname.replace(/\/+$/, '') === location.pathname.replace(/\/+$/, '');
  if (mesmaPagina) {
    e.preventDefault();
    if (url.hash) rolarPara(url.hash);
    else rolarPara(0);
    return;
  }
  e.preventDefault();
  if (navegando) return;
  navegando = true;
  let mundo = mundoDaRota(url.pathname);
  if (mundo === mundoDaRota(location.pathname)) {
    mundo = ROTACAO[(ROTACAO.indexOf(mundo) + 1) % ROTACAO.length];
  }
  document.dispatchEvent(new CustomEvent('crema:saindo'));
  sessao.gravar(CHAVE, mundo);
  cobrir(mundo).then(() => {
    location.assign(url.href);
  });
});

// voltar pelo histórico (bfcache): a página volta como estava — descobrir
window.addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  navegando = false;
  sessao.apagar(CHAVE);
  html.classList.remove('coberto');
  gsap.set(solido, { opacity: 0 });
  gsap.set(traco, { visibility: 'hidden', drawSVG: '0% 0%' });
  gsap.set(caixaMono, { opacity: 0 });
  camada.classList.remove('ativa');
});

iniciar();
