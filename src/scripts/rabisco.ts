// "Rabisco da chef": anotações à mão com Rough.js (elipses, sublinhados, marca-texto, caixas, setas).
// Uso no HTML:
//   <span data-rabisco="elipse" data-rabisco-cor="#f1a500" data-rabisco-gatilho="entrada|rolagem|hover"
//         data-rabisco-atraso="0.4" data-ferver>texto</span>
import rough from 'roughjs';
import { gsap, ScrollTrigger, reduzido, aoEntrar, hash } from './nucleo';

type Tipo = 'elipse' | 'sublinhado' | 'marca-texto' | 'caixa' | 'circulo' | 'risco' | 'seta';
const NS = 'http://www.w3.org/2000/svg';

type Estado = {
  host: HTMLElement;
  svg: SVGSVGElement;
  tipo: Tipo;
  cor: string;
  semente: number;
  desenhado: boolean;
};

function forma(e: Estado, w: number, h: number, semente: number) {
  const rc = rough.svg(e.svg);
  const cor = e.cor;
  switch (e.tipo) {
    case 'elipse':
      return rc.ellipse(w / 2, h / 2, w * (w > 600 ? 1.05 : 1.14) + 22, h * (w > 600 ? 1.2 : 1.45) + 6, {
        roughness: 1.5,
        bowing: 1.8,
        strokeWidth: 2.4,
        stroke: cor,
        seed: semente,
        curveStepCount: 11,
      });
    case 'circulo': {
      const d = Math.max(w, h) * 1.3 + 12;
      return rc.circle(w / 2, h / 2, d, { roughness: 1.4, bowing: 1.5, strokeWidth: 2.2, stroke: cor, seed: semente });
    }
    case 'sublinhado': {
      const y = h * 0.98;
      const pts: [number, number][] = [];
      const passos = Math.max(4, Math.round(w / 60));
      for (let i = 0; i <= passos; i++) {
        const x = -4 + ((w + 8) * i) / passos;
        pts.push([x, y + Math.sin(i * 1.7) * 3.2]);
      }
      return rc.curve(pts, { roughness: 1.1, bowing: 1.2, strokeWidth: 2.6, stroke: cor, seed: semente });
    }
    case 'risco':
      return rc.line(-6, h * 0.55, w + 6, h * 0.45, { roughness: 1.6, strokeWidth: 2.4, stroke: cor, seed: semente });
    case 'marca-texto':
      return rc.rectangle(-4, h * 0.22, w + 8, h * 0.66, {
        roughness: 0.9,
        stroke: 'none',
        fill: cor,
        fillStyle: 'zigzag',
        fillWeight: 4.2,
        hachureGap: 3.2,
        hachureAngle: -8,
        seed: semente,
      });
    case 'caixa':
      return rc.rectangle(1.5, 1.5, w - 3, h - 3, {
        roughness: 1.15,
        bowing: 0.9,
        strokeWidth: 1.8,
        stroke: cor,
        seed: semente,
      });
    case 'seta': {
      const g = document.createElementNS(NS, 'g');
      g.appendChild(
        rc.curve(
          [
            [0, h * 0.7],
            [w * 0.35, h * 0.1],
            [w * 0.72, h * 0.25],
            [w, h * 0.62],
          ],
          { roughness: 1.2, strokeWidth: 2.2, stroke: cor, seed: semente },
        ),
      );
      g.appendChild(
        rc.linearPath(
          [
            [w - 18, h * 0.42],
            [w, h * 0.62],
            [w - 22, h * 0.72],
          ],
          { roughness: 1.1, strokeWidth: 2.2, stroke: cor, seed: semente + 1 },
        ),
      );
      return g;
    }
  }
}

function render(e: Estado, semente = e.semente) {
  const w = e.host.offsetWidth;
  const h = e.host.offsetHeight;
  if (!w || !h) return [];
  e.svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  e.svg.setAttribute('width', String(w));
  e.svg.setAttribute('height', String(h));
  e.svg.replaceChildren(forma(e, w, h, semente));
  const paths = Array.from(e.svg.querySelectorAll('path'));
  paths.forEach((p) => {
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
  });
  return paths;
}

function desenhar(e: Estado, atraso = 0) {
  const paths = render(e);
  e.desenhado = true;
  if (reduzido) return gsap.timeline();
  gsap.set(paths, { drawSVG: '0% 0%' });
  const dur = e.tipo === 'marca-texto' ? 0.9 : e.tipo === 'caixa' ? 0.8 : 1.1;
  return gsap.timeline({ delay: atraso }).to(paths, {
    drawSVG: '0% 100%',
    duration: dur,
    ease: e.tipo === 'marca-texto' ? 'power2.inOut' : 'espatula',
    stagger: 0.16,
  });
}

function apagar(e: Estado) {
  const paths = Array.from(e.svg.querySelectorAll('path'));
  e.desenhado = false;
  return gsap.to(paths, { drawSVG: '100% 100%', duration: 0.35, ease: 'power2.in' });
}

const estados = new Map<HTMLElement, Estado>();

export function prepararRabisco(host: HTMLElement): Estado {
  const existente = estados.get(host);
  if (existente) return existente;
  const tipo = (host.dataset.rabisco || 'sublinhado') as Tipo;
  const svg = document.createElementNS(NS, 'svg') as SVGSVGElement;
  svg.classList.add('rabisco', `rabisco--${tipo}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  if (tipo === 'marca-texto') host.prepend(svg);
  else host.appendChild(svg);
  host.classList.add('tem-rabisco');
  const e: Estado = {
    host,
    svg,
    tipo,
    cor: host.dataset.rabiscoCor || 'currentColor',
    semente: (hash(host.dataset.rabiscoSemente || host.textContent || tipo) % 9000) + 7,
    desenhado: false,
  };
  estados.set(host, e);
  return e;
}

export function iniciarRabiscos(raiz: ParentNode = document) {
  raiz.querySelectorAll<HTMLElement>('[data-rabisco]').forEach((host) => {
    const e = prepararRabisco(host);
    const gatilho = host.dataset.rabiscoGatilho || 'rolagem';
    const atraso = Number(host.dataset.rabiscoAtraso || 0);

    if (gatilho === 'entrada') {
      aoEntrar(() => desenhar(e, atraso));
    } else if (gatilho === 'rolagem') {
      ScrollTrigger.create({ trigger: host, start: 'top 84%', once: true, onEnter: () => desenhar(e, atraso) });
    } else if (gatilho === 'manual') {
      // quem chama: document.dispatchEvent(new CustomEvent('crema:rabiscar', { detail: host }))
    }

    const alvoHover = (host.closest('a, button') as HTMLElement | null) ?? host;
    if (gatilho === 'hover') {
      alvoHover.addEventListener('mouseenter', () => desenhar(e));
      alvoHover.addEventListener('mouseleave', () => apagar(e));
      alvoHover.addEventListener('focus', () => desenhar(e));
      alvoHover.addEventListener('blur', () => apagar(e));
    }

    if ('ferver' in host.dataset && !reduzido) {
      let timer = 0;
      let s = e.semente;
      alvoHover.addEventListener('mouseenter', () => {
        if (!e.desenhado) return;
        window.clearInterval(timer);
        timer = window.setInterval(() => render(e, ++s), 110);
      });
      alvoHover.addEventListener('mouseleave', () => {
        window.clearInterval(timer);
        s = e.semente;
        if (e.desenhado) render(e);
      });
    }
  });

  document.addEventListener('crema:rabiscar', ((ev: CustomEvent<HTMLElement>) => {
    const e = estados.get(ev.detail);
    if (e && !e.desenhado) desenhar(e);
  }) as EventListener);

  // redesenha (já completo) quando o tamanho muda
  let t = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(t);
    t = window.setTimeout(() => {
      estados.forEach((e) => {
        if (e.desenhado) render(e);
      });
    }, 180);
  });
}

/** Desenha um rabisco por código (ex.: destaque ligado entre dois elementos). */
export function rabiscar(host: HTMLElement) {
  const e = prepararRabisco(host);
  if (!e.desenhado) desenhar(e);
}

export function apagarRabisco(host: HTMLElement) {
  const e = estados.get(host);
  if (e?.desenhado) apagar(e);
}
