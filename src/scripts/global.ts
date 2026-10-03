// Comportamentos globais: revelações declarativas (data-anim), selos girando,
// rabiscos, status das lojas e o título da aba que "derrete".
import { gsap, ScrollTrigger, SplitText, reduzido, aoEntrar, scroll, CLASSES_SPLIT } from './nucleo';
import { desenharAoRolar } from './desenho';
import { iniciarRabiscos } from './rabisco';
import { ativarStatus } from './horarios';

// ------------------------------------------------------------ data-anim
function revelarTitulos() {
  document.querySelectorAll<HTMLElement>('[data-anim="titulo"]').forEach((el) => {
    if (reduzido) return;
    const split = SplitText.create(el, { type: 'lines,words', mask: 'lines', aria: 'auto', ...CLASSES_SPLIT });
    gsap.set(split.lines, { yPercent: 105 });
    const entrar = () =>
      gsap.to(split.lines, { yPercent: 0, duration: 1, stagger: 0.08, ease: 'creme', delay: Number(el.dataset.atraso || 0) });
    if (el.dataset.gatilho === 'entrada') aoEntrar(entrar);
    else ScrollTrigger.create({ trigger: el, start: 'top 86%', once: true, onEnter: entrar });
  });
}

function revelarBlocos() {
  document.querySelectorAll<HTMLElement>('[data-anim="subir"]').forEach((el) => {
    if (reduzido) return;
    gsap.set(el, { y: 28, opacity: 0 });
    const entrar = () =>
      gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: 'creme', delay: Number(el.dataset.atraso || 0) });
    if (el.dataset.gatilho === 'entrada') aoEntrar(entrar);
    else ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: entrar });
  });
}

function revelarImagens() {
  document.querySelectorAll<HTMLElement>('[data-anim="imagem"]').forEach((el) => {
    if (reduzido) return;
    const img = el.querySelector('img, video');
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 24px 24px)' });
    if (img) gsap.set(img, { scale: 1.12 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 24px 24px)', duration: 1.25, ease: 'creme' });
        if (img) gsap.to(img, { scale: 1, duration: 1.6, ease: 'creme' });
      },
    });
  });
}

function desenharDivisores() {
  document.querySelectorAll<SVGSVGElement>('[data-anim="tracos"]').forEach((svg) => desenharAoRolar(svg));
}

// ------------------------------------------------------ botões magnéticos
function magneticos() {
  if (reduzido || !window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetico]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      xTo(dx * 8);
      yTo(dy * 6);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)', overwrite: true });
    });
  });
}

// --------------------------------------------------------------- selos
function girarSelos() {
  const aneis = document.querySelectorAll<SVGSVGElement>('[data-selo] .selo__anel');
  if (!aneis.length || reduzido) return;
  const giros = Array.from(aneis).map((a) =>
    gsap.to(a, { rotation: 360, duration: 24, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }),
  );
  const lenis = scroll();
  if (lenis) {
    lenis.on('scroll', () => {
      const v = Math.min(Math.abs(lenis.velocity) / 6, 4);
      giros.forEach((g) => gsap.to(g, { timeScale: 1 + v, duration: 0.3, overwrite: true }));
    });
  }
}

// ------------------------------------------------------- aba "derretendo"
function abaDerretendo() {
  const titulo = document.title;
  const icone = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]');
  const original = icone?.href;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = 'Volta, tá derretendo! 🍨';
      if (icone) icone.href = '/favicon-derretido.svg';
    } else {
      document.title = titulo;
      if (icone && original) icone.href = original;
    }
  });
}

revelarTitulos();
revelarBlocos();
revelarImagens();
desenharDivisores();
girarSelos();
magneticos();
iniciarRabiscos();
ativarStatus();
abaDerretendo();
