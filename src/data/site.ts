// Dados gerais do site. Itens marcados com CONFIRMAR precisam de validação da Crema Lab
// antes da publicação (ver preparacao-crema-lab.md, seção 17.3).

export const SITE = {
  nome: 'Crema Lab',
  tagline: 'Felicidade atemporal',
  assinatura: 'Gelato + Café + Experiências',
  chef: 'Harlen Tessari Brandão',
  fundacao: 2024,
  cidade: 'Curitiba',
  descricao:
    'Gelateria artesanal da chef gelatiere Harlen Brandão: gelato italiano de autor, cafés especiais e experiências. Batel, ParkShoppingBarigui e Shopping Mueller, em Curitiba.',
  instagram: 'https://www.instagram.com/cremalabgelato/',
  instagramUsuario: '@cremalabgelato',
  // CONFIRMAR: número citado em resultado de busca, ainda não validado com a Crema Lab.
  whatsapp: '5541996528031',
  whatsappExibicao: '(41) 99652-8031',
  // CONFIRMAR: e-mail comercial.
  email: '',
} as const;

export type Mundo = 'fior' | 'ambar' | 'pistache-creme' | 'terracota' | 'telha' | 'rosa' | 'cacau';

export const CORES: Record<Mundo, string> = {
  fior: '#f5efe6',
  ambar: '#f1a500',
  'pistache-creme': '#dad3a7',
  terracota: '#b26a5b',
  telha: '#8e4f42',
  rosa: '#e4bfae',
  cacau: '#2b211c',
};

/** Cor de tinta legível sobre cada mundo (contraste medido na preparação, 5.1). */
export const TINTA: Record<Mundo, string> = {
  fior: CORES.cacau,
  ambar: CORES.cacau,
  'pistache-creme': CORES.cacau,
  terracota: CORES.fior,
  telha: CORES.fior,
  rosa: CORES.cacau,
  cacau: CORES.fior,
};

export const NAV = [
  { href: '/sabores', rotulo: 'Sabores', mundo: 'ambar' as Mundo },
  { href: '/laboratorio', rotulo: 'Laboratório', mundo: 'pistache-creme' as Mundo },
  { href: '/unidades', rotulo: 'Unidades', mundo: 'terracota' as Mundo },
  { href: '/eventos-e-encomendas', rotulo: 'Eventos & Encomendas', mundo: 'rosa' as Mundo },
];

/** Mundo de cor de cada rota — define a cor da "espatulada" de entrada. */
export const MUNDO_DA_ROTA: [prefixo: string, mundo: Mundo][] = [
  ['/unidades/parkshoppingbarigui', 'ambar'],
  ['/unidades/shopping-mueller', 'pistache-creme'],
  ['/unidades', 'terracota'],
  ['/sabores', 'ambar'],
  ['/laboratorio', 'pistache-creme'],
  ['/eventos-e-encomendas', 'rosa'],
  ['/', 'terracota'],
];

export function linkWhatsApp(mensagem = 'Olá, Crema Lab! Vim pelo site e gostaria de falar com vocês.') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const PREMIOS = [
  { ano: 2024, titulo: 'Prêmio Bom Gourmet', categoria: 'HAUS Ambientação', resultado: 'Vencedora' },
  { ano: 2024, titulo: 'Prêmio Bom Gourmet', categoria: 'Novidades', resultado: 'Vencedora' },
  { ano: 2025, titulo: 'Prêmio Bom Gourmet', categoria: 'Sorveteria ou Gelateria', resultado: 'Finalista' },
];

export const PARCEIROS = [
  { nome: 'Uza Design e Arquitetura', papel: 'Interiores' },
  { nome: 'Furf Design Studio', papel: 'Fachada de micélio' },
  { nome: 'Mush', papel: 'Biomaterial de micélio' },
  { nome: 'Lucca Cafés Especiais', papel: 'Café' },
  { nome: 'Casa Limoncello', papel: 'Limoncello do Limonello' },
  { nome: 'Vanessa Taques Casa', papel: 'Bowls de Natal' },
  { nome: 'Île de France', papel: 'Drinks com sorbet' },
  { nome: 'Revival', papel: 'Collab de moda' },
  { nome: 'designboom', papel: 'Imprensa' },
];
