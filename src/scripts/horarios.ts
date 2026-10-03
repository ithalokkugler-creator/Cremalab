// "Aberto agora" calculado no navegador, sempre no fuso de Curitiba.
import type { Horario } from '../data/unidades';

const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

function agoraEmCuritiba(agora = new Date()) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(agora);
  const v = (t: string) => partes.find((p) => p.type === t)?.value ?? '0';
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(v('weekday'));
  return { dia, minutos: Number(v('hour')) * 60 + Number(v('minute')) };
}

const emMinutos = (h: string) => {
  const [hh, mm] = h.split(':').map(Number);
  return hh * 60 + mm;
};
const formatar = (h: string) => h.replace(':00', 'h').replace(':', 'h');

export type Status = { aberto: boolean; texto: string; curto: string };

export function statusAgora(horarios: Horario[], agora = new Date()): Status {
  const { dia, minutos } = agoraEmCuritiba(agora);
  const hoje = horarios.find((h) => h.dias.includes(dia));
  if (hoje && minutos >= emMinutos(hoje.abre) && minutos < emMinutos(hoje.fecha)) {
    return { aberto: true, texto: `Aberto agora · fecha às ${formatar(hoje.fecha)}`, curto: 'Aberto agora' };
  }
  if (hoje && minutos < emMinutos(hoje.abre)) {
    return { aberto: false, texto: `Fechado · abre hoje às ${formatar(hoje.abre)}`, curto: 'Fechado agora' };
  }
  for (let k = 1; k <= 7; k++) {
    const d = (dia + k) % 7;
    const prox = horarios.find((h) => h.dias.includes(d));
    if (prox) {
      const quando = k === 1 ? 'amanhã' : DIAS[d];
      return { aberto: false, texto: `Fechado · abre ${quando} às ${formatar(prox.abre)}`, curto: 'Fechado agora' };
    }
  }
  return { aberto: false, texto: 'Fechado', curto: 'Fechado' };
}

/** Preenche todos os elementos [data-status] com o status ao vivo (e atualiza a cada minuto). */
export function ativarStatus(raiz: ParentNode = document) {
  const atualizar = () => {
    raiz.querySelectorAll<HTMLElement>('[data-status]').forEach((el) => {
      try {
        const horarios = JSON.parse(el.dataset.status || '[]') as Horario[];
        const s = statusAgora(horarios);
        const alvo = el.querySelector<HTMLElement>('[data-status-texto]') ?? el;
        alvo.textContent = el.hasAttribute('data-status-curto') ? s.curto : s.texto;
        el.classList.toggle('esta-aberto', s.aberto);
        el.classList.toggle('esta-fechado', !s.aberto);
      } catch {
        /* dados inválidos: mantém o texto estático */
      }
    });
  };
  atualizar();
  window.setInterval(atualizar, 60_000);
}
