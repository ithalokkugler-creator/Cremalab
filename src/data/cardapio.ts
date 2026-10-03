// Cafés, doces e salgados citados pela imprensa. Preços ficam na loja (podem mudar).

export type ItemCardapio = { nome: string; descricao: string; nota?: string };
export type SecaoCardapio = { id: string; titulo: string; itens: ItemCardapio[] };

export const CARDAPIO: SecaoCardapio[] = [
  {
    id: 'cafes',
    titulo: 'Cafés',
    itens: [
      { nome: 'Espresso & cafés especiais', descricao: 'Para começar, terminar ou acompanhar a bola do dia.' },
      { nome: 'Affogato', descricao: 'Dois shots de ristretto sobre uma bola de gelato de baunilha bourbon.' },
      { nome: 'Doppio Latte', descricao: 'Latte encorpado, com dose dupla.', nota: 'menu de inverno' },
      { nome: 'Ciocco Latte', descricao: 'Latte com chocolate.', nota: 'menu de inverno' },
      { nome: 'Pistacchio Latte', descricao: 'Latte com pistache.', nota: 'menu de inverno' },
      { nome: 'Crema Latte', descricao: 'O latte da casa.', nota: 'menu de inverno' },
    ],
  },
  {
    id: 'doces',
    titulo: 'Doces',
    itens: [
      { nome: 'Cioccocrumble', descricao: 'Sobremesa de chocolate com amêndoas e crumble de nibs de cacau.' },
      {
        nome: 'Quattrino di Pistacchio',
        descricao: 'Bolo úmido de pistache, farofa doce de pistache e sorbet de pistache.',
      },
    ],
  },
  {
    id: 'salgados',
    titulo: 'Salgados',
    itens: [
      { nome: 'Panini Caprese', descricao: 'No pão de queijo artesanal da casa.' },
      { nome: 'Panini Mineirinho', descricao: 'No pão de queijo artesanal da casa.' },
      { nome: 'Panini Parma', descricao: 'No pão de queijo artesanal da casa.' },
    ],
  },
];
