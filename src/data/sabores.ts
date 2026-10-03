// Arquivo de sabores do laboratório. Reúne criações citadas pela imprensa entre 2024 e 2026.
// A vitrine muda com as estações: a disponibilidade real é a das lojas (e do Instagram).
// Cores servem para a ilustração de cada bola e para a cena 3D "Passe a espátula".

export type Inclusao = 'nenhuma' | 'farofa' | 'pedacos' | 'calda' | 'raspas' | 'pontos' | 'sementes';
export type Tag = 'vegano' | 'sem-acucar-refinado' | 'contem-castanhas' | 'alcoolico';

export type Sabor = {
  id: string;
  nome: string;
  categoria: 'gelato' | 'sorbet';
  descricao: string;
  cor: string;
  detalhe: string;
  inclusao: Inclusao;
  tags?: Tag[];
  classico?: boolean;
  temporada?: string;
  unidade?: { slug: string; nome: string; tipo: 'exclusivo' | 'versão da casa' };
};

export const ROTULO_TAG: Record<Tag, string> = {
  vegano: 'vegano',
  'sem-acucar-refinado': 'sem açúcar refinado',
  'contem-castanhas': 'contém castanhas',
  alcoolico: 'contém álcool',
};

export const SABORES: Sabor[] = [
  {
    id: 'nocciolotto',
    nome: 'Nocciolotto',
    categoria: 'gelato',
    descricao: 'Pasta artesanal de avelã, creme de avelã e pedaços crocantes da fruta.',
    cor: '#a87a52',
    detalhe: '#5e3d24',
    inclusao: 'pedacos',
    tags: ['contem-castanhas'],
    classico: true,
  },
  {
    id: 'pistacchio',
    nome: 'Pistacchio',
    categoria: 'sorbet',
    descricao: 'O clássico da casa: sorbet de pistache à base de água, com farofinha de pistache.',
    cor: '#a9ad6c',
    detalhe: '#5d6234',
    inclusao: 'farofa',
    tags: ['contem-castanhas'],
    classico: true,
    unidade: { slug: 'batel', nome: 'Batel', tipo: 'versão da casa' },
  },
  {
    id: 'pistacchio-park',
    nome: 'Pistacchio Park',
    categoria: 'gelato',
    descricao: 'Pistache, chocolate branco e um toque cítrico de laranja.',
    cor: '#b8b47a',
    detalhe: '#ef8f2a',
    inclusao: 'raspas',
    tags: ['contem-castanhas'],
    unidade: { slug: 'parkshoppingbarigui', nome: 'ParkShoppingBarigui', tipo: 'exclusivo' },
  },
  {
    id: 'fior-di-latte',
    nome: 'Fior di Latte',
    categoria: 'gelato',
    descricao: 'A base de tudo na tradição italiana: leite e creme, sem disfarce.',
    cor: '#f3ecdd',
    detalhe: '#cdbf9f',
    inclusao: 'nenhuma',
    classico: true,
  },
  {
    id: 'baunilha-bourbon',
    nome: 'Baunilha Bourbon',
    categoria: 'gelato',
    descricao: 'Baunilha bourbon de verdade — é ela que vai no affogato.',
    cor: '#f1dfae',
    detalhe: '#4b3322',
    inclusao: 'pontos',
    classico: true,
  },
  {
    id: 'mango-lab',
    nome: 'Mango Lab',
    categoria: 'sorbet',
    descricao: 'Sorbet de manga Palmer com pesto doce de manjericão, sem açúcar refinado.',
    cor: '#f0a43a',
    detalhe: '#5d7a36',
    inclusao: 'calda',
    tags: ['sem-acucar-refinado'],
    temporada: 'Verão',
  },
  {
    id: 'pessego-gorgonzola',
    nome: 'Pêssego com Gorgonzola',
    categoria: 'gelato',
    descricao: 'Doce, salgado e muito laboratório: pêssego encontra gorgonzola.',
    cor: '#f2b48c',
    detalhe: '#a9b4a4',
    inclusao: 'pedacos',
    temporada: 'Edição especial',
  },
  {
    id: 'batidinha-de-maracuja',
    nome: 'Batidinha de Maracujá',
    categoria: 'sorbet',
    descricao: 'Sorbet de maracujá com leite condensado e cachaça mineira.',
    cor: '#f4c441',
    detalhe: '#3d2a14',
    inclusao: 'sementes',
    tags: ['alcoolico'],
    temporada: 'Carnaval',
  },
  {
    id: 'limonello',
    nome: 'Limonello',
    categoria: 'sorbet',
    descricao: 'Limão-siciliano com o licor artesanal da Casa Limoncello, de Curitiba.',
    cor: '#f2e489',
    detalhe: '#b9a52c',
    inclusao: 'raspas',
    tags: ['alcoolico'],
    temporada: 'Verão',
  },
  {
    id: 'uva-terci',
    nome: 'Uva Terci',
    categoria: 'sorbet',
    descricao: 'Sorbet feito com suco artesanal de uvas frescas.',
    cor: '#7c3b5b',
    detalhe: '#4a1e35',
    inclusao: 'nenhuma',
  },
  {
    id: 'cuca-de-doce-de-leite',
    nome: 'Cuca de Doce de Leite',
    categoria: 'gelato',
    descricao: 'Fior di latte mesclado com doce de leite mineiro e farofa doce artesanal.',
    cor: '#ecd8ae',
    detalhe: '#b0773a',
    inclusao: 'calda',
    temporada: 'Inverno',
  },
  {
    id: 'manha-viva',
    nome: 'Manhã Viva',
    categoria: 'sorbet',
    descricao:
      'Laranja, cenoura e manga com leite de coco, cúrcuma, gengibre e canela. Vegano e sem açúcar refinado.',
    cor: '#f39a3d',
    detalhe: '#c9581c',
    inclusao: 'pontos',
    tags: ['vegano', 'sem-acucar-refinado'],
    temporada: 'Inverno',
  },
  {
    id: 'mandarino',
    nome: 'Mandarino',
    categoria: 'sorbet',
    descricao: 'Tangerina em sorbet: cítrico, fresco e luminoso.',
    cor: '#f48e36',
    detalhe: '#c05c18',
    inclusao: 'raspas',
    temporada: 'Inverno',
  },
  {
    id: 'foresta-nera',
    nome: 'Foresta Nera',
    categoria: 'gelato',
    descricao: 'Fior di latte com flocos de chocolate, calda de amarena, raspas de chocolate e cerejas.',
    cor: '#efe3d0',
    detalhe: '#6b1a2c',
    inclusao: 'calda',
    temporada: 'Fim de ano',
  },
  {
    id: 'cafe-e-laranja',
    nome: 'Café & Laranja',
    categoria: 'sorbet',
    descricao: 'Sorbet de café com licor de laranja: grãos da Lucca Cafés Especiais e Cointreau Noir.',
    cor: '#5b3a29',
    detalhe: '#e58b2e',
    inclusao: 'raspas',
    tags: ['alcoolico'],
  },
  {
    id: 'chocolate-azeite-flor-de-sal',
    nome: 'Chocolate, Azeite & Flor de Sal',
    categoria: 'gelato',
    descricao: 'Chocolate intenso com azeite e cristais de flor de sal.',
    cor: '#4b2c21',
    detalhe: '#c8b25a',
    inclusao: 'pontos',
    temporada: 'Dia do Sorvete',
  },
];

export const saboresClassicos = () => SABORES.filter((s) => s.classico);
export const sabor = (id: string) => SABORES.find((s) => s.id === id)!;
