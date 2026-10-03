import type { ImageMetadata } from 'astro';
import type { Mundo } from './site';
import fachadaBatel from '../assets/fotos/fachada-batel.jpg';
import interiorMural from '../assets/fotos/interior-mural.jpg';
import lojaPkb from '../assets/fotos/loja-pkb.jpg';
import vitrineCubas from '../assets/fotos/vitrine-cubas.jpg';
import lojaMueller from '../assets/fotos/loja-mueller.jpg';
import copoFrutas from '../assets/fotos/copo-frutas-vermelhas.jpg';

export type Horario = { dias: number[]; abre: string; fecha: string };

export type Unidade = {
  slug: string;
  nome: string;
  nomeCurto: string;
  apelido: string;
  ativa: boolean;
  endereco: string;
  complemento?: string;
  bairro: string;
  cep: string;
  cidade: string;
  /** dias: 0 = domingo … 6 = sábado */
  horarios: Horario[];
  /** true enquanto os horários não forem confirmados pela Crema Lab */
  horariosConfirmar: boolean;
  mundo: Mundo;
  /** posição no mapa ilustrado (viewBox 1000 × 700) */
  mapa: { x: number; y: number };
  descricao: string;
  destaque: string;
  foto: ImageMetadata;
  galeria: ImageMetadata[];
  abertura: string;
};

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const UNIDADES: Unidade[] = [
  {
    slug: 'batel',
    nome: 'Crema Lab Batel',
    nomeCurto: 'Batel',
    apelido: 'A primeira casa',
    ativa: true,
    endereco: 'Rua Deputado Antônio Baby, 18',
    bairro: 'Batel',
    cep: '80240-370',
    cidade: 'Curitiba – PR',
    horarios: [
      { dias: [2, 3, 4, 5, 6], abre: '10:00', fecha: '21:00' },
      { dias: [0], abre: '10:00', fecha: '20:00' },
    ],
    horariosConfirmar: true,
    mundo: 'terracota',
    mapa: { x: 556, y: 452 },
    descricao:
      'A primeira casa: fachada de micélio com textura de casquinha, o laboratório à vista atrás da parede de vidro e a Piazza para ficar sem pressa.',
    destaque: 'Pistache clássico em sorbet, com farofinha de pistache.',
    foto: fachadaBatel,
    galeria: [interiorMural, fachadaBatel],
    abertura: '2024',
  },
  {
    slug: 'parkshoppingbarigui',
    nome: 'Crema Lab PKB',
    nomeCurto: 'ParkShoppingBarigui',
    apelido: 'Perto do parque',
    ativa: true,
    endereco: 'R. Prof. Pedro Viriato Parigot de Souza, 600',
    complemento: 'Piso L3, Loja 319',
    bairro: 'Mossunguê',
    cep: '81200-100',
    cidade: 'Curitiba – PR',
    horarios: [
      { dias: [1, 2, 3, 4, 5, 6], abre: '10:00', fecha: '22:00' },
      { dias: [0], abre: '12:00', fecha: '20:00' },
    ],
    horariosConfirmar: true,
    mundo: 'ambar',
    mapa: { x: 214, y: 392 },
    descricao:
      'No terceiro piso do ParkShoppingBarigui, a fachada de micélio se repete — e a vitrine guarda um pistache que só existe aqui.',
    destaque: 'Exclusivo: pistache com chocolate branco e um toque de laranja.',
    foto: lojaPkb,
    galeria: [lojaPkb, vitrineCubas],
    abertura: 'novembro de 2025',
  },
  {
    slug: 'shopping-mueller',
    nome: 'Crema Lab Shopping Mueller',
    nomeCurto: 'Shopping Mueller',
    apelido: 'A casa mais nova',
    ativa: true,
    endereco: 'Av. Cândido de Abreu, 127',
    complemento: 'Piso L2',
    bairro: 'Centro Cívico',
    cep: '80530-000',
    cidade: 'Curitiba – PR',
    horarios: [
      { dias: [1, 2, 3, 4, 5, 6], abre: '10:00', fecha: '22:00' },
      { dias: [0], abre: '14:00', fecha: '20:00' },
    ],
    horariosConfirmar: true,
    mundo: 'pistache-creme',
    mapa: { x: 702, y: 238 },
    descricao:
      'A casa mais nova, no Piso L2 do Shopping Mueller, no Centro Cívico: os mesmos arcos, o mesmo granilite e a mesma felicidade atemporal.',
    destaque: 'Pertinho do Centro Cívico, para a pausa do meio da tarde.',
    foto: lojaMueller,
    galeria: [lojaMueller, copoFrutas],
    abertura: 'recém-inaugurada',
  },
];

export const unidadesAtivas = () => UNIDADES.filter((u) => u.ativa);

export const linkMapa = (u: Unidade) =>
  maps(`Crema Lab, ${u.endereco}${u.complemento ? ` - ${u.complemento}` : ''} - ${u.bairro}, ${u.cidade}`);

const NOMES_DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/** "Ter–Sáb · 10h–21h" */
export function descreverHorarios(h: Horario[]): { dias: string; horas: string }[] {
  const faixa = (dias: number[]) => {
    const ord = [...dias].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
    if (ord.length === 1) return NOMES_DIAS[ord[0]];
    return `${NOMES_DIAS[ord[0]]}–${NOMES_DIAS[ord[ord.length - 1]]}`;
  };
  const hora = (s: string) => s.replace(':00', 'h').replace(':', 'h');
  return h.map((x) => ({ dias: faixa(x.dias), horas: `${hora(x.abre)}–${hora(x.fecha)}` }));
}

export function diasFechados(h: Horario[]): string[] {
  const abertos = new Set(h.flatMap((x) => x.dias));
  return [0, 1, 2, 3, 4, 5, 6].filter((d) => !abertos.has(d)).map((d) => NOMES_DIAS[d]);
}
