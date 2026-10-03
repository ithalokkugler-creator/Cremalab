# Crema Lab — site

Site da **Crema Lab**, gelateria artesanal da chef gelatiere Harlen Tessari Brandão em Curitiba
(Batel, ParkShoppingBarigui e Shopping Mueller). Todo o conteúdo está em português do Brasil.

O planejamento completo está em [`preparacao-crema-lab.md`](./preparacao-crema-lab.md).
Este repositório é o site construído a partir dele.

**Tecnologias:** [Astro](https://astro.build) (site estático) · [GSAP](https://gsap.com) com ScrollTrigger,
DrawSVG, SplitText, Flip, Draggable e Inertia · [Rough.js](https://roughjs.com) · [Three.js](https://threejs.org) ·
[Lenis](https://lenis.darkroom.engineering) (rolagem suave).

---

## Como rodar e testar

Você precisa do **Node.js 22.12 ou mais recente** (`node -v` para conferir).

```bash
npm install        # instala as dependências (uma vez)
npm run dev        # abre o site em http://localhost:4321
```

Para testar no **celular**, com o computador e o celular na mesma rede Wi-Fi:

```bash
npm run dev -- --host
```

O terminal mostra um endereço do tipo `http://192.168.x.x:4321`. Abra esse endereço no celular.

Para conferir a **versão final** (a mesma que vai para o ar):

```bash
npm run build      # gera o site em dist/
npm run preview    # serve o dist/ em http://localhost:4321
npm run check      # checagem de tipos (deve terminar com 0 erros)
```

### Páginas

| Rota | O que tem |
|---|---|
| `/` | Home: loader, hero, manifesto, vitrine, "passe a espátula" (3D), chef, mural, fachada, unidades, prêmios |
| `/sabores` | Caderno de sabores com filtros, faixa de encomendas, cafés, doces e salgados |
| `/laboratorio` | A chef, o processo, "gelato não é sorvete", o espaço, a fachada de micélio (3D), experiências, equipe, prêmios |
| `/unidades` | Mapa desenhado + as três casas com status "aberto agora" |
| `/unidades/batel` · `/unidades/parkshoppingbarigui` · `/unidades/shopping-mueller` | Uma página para cada casa |
| `/eventos-e-encomendas` | Carrinho de gelato, pedido de orçamento pelo WhatsApp, encomendas, gelato em casa, FAQ |
| qualquer endereço que não existe | 404 — "Ops. Essa página derreteu." |

### Roteiro de teste (o que procurar)

**Em todas as páginas**
- [ ] **Primeira visita:** o monograma "CL" se desenha no loader e a página é revelada por uma "espatulada".
- [ ] **Troca de página:** ao clicar num link interno, uma pincelada na cor da página de destino cobre a tela.
- [ ] **Cursor** (computador): vira uma colher; sobre fotos e links aparece uma bolha com o texto da ação.
- [ ] **Botão "Sabores"** (canto superior esquerdo): abre os três clássicos da casa.
- [ ] **Botão do WhatsApp:** abre um QR code (no computador) para continuar a conversa no celular.
- [ ] **MENU:** abre em tela cheia com o mural se desenhando e o status das lojas. `Esc` fecha.
- [ ] Troque de aba do navegador: o título vira "Volta, tá derretendo! 🍨".

**Home**
- [ ] Clique na foto em arco do topo para trocar a foto; o botão de pausa para o carrossel.
- [ ] Role: as palavras "Tradição · Inovação · E sabor" correm na horizontal.
- [ ] **Vitrine** (computador): passe o mouse rápido pelos cartões de sabor — eles são "arremessados" e voltam.
- [ ] **Passe a espátula:** arraste o cursor (ou o dedo, depois de tocar em "Toque para espatular") sobre a cuba de gelato 3D; troque o sabor nos botões.
- [ ] O retrato da chef começa em traço e vira foto com a rolagem.
- [ ] O **mural da loja** se desenha conforme você rola.
- [ ] **Fachada:** mova o mouse — a luz revela o relevo dos losangos.

**Laboratório**
- [ ] "Anatomia de um gelato": no computador a seção trava e os 6 passos correm na horizontal, com os ícones se desenhando.
- [ ] Foto do salão: passe o mouse ou clique nos números para ver cada detalhe do espaço.
- [ ] **Fachada de micélio (3D):** role para os painéis "crescerem"; mexa o mouse para mover a luz e clique para o relevo "respirar".
- [ ] Experiências: arraste a galeria para o lado. Equipe: puxe a foto — ela volta balançando.

**Unidades**
- [ ] O status ("Aberto agora · fecha às 22h") é calculado no horário de Brasília.
- [ ] Na página de cada casa, o mapa se desenha e marca só aquela unidade.

**Eventos & Encomendas**
- [ ] O carrinho entra rodando, freia e abre o guarda-sol (passe o mouse para ele "acelerar").
- [ ] Formulário: enviar vazio mostra o erro; preenchido, abre o WhatsApp com a mensagem pronta.
- [ ] Perguntas frequentes abrem com um sublinhado à mão.

**Acessibilidade e celular**
- [ ] Ative "reduzir movimento" no sistema (macOS: Acessibilidade › Tela › Reduzir movimento; Windows:
  Configurações › Acessibilidade › Efeitos visuais › Efeitos de animação; iOS/Android: nas opções de
  acessibilidade). O site mostra tudo já desenhado, sem animações pesadas, e as cenas 3D dão lugar a versões estáticas.
- [ ] Navegue só com o teclado (`Tab`): os focos aparecem em âmbar.
- [ ] No celular, a cena da espátula só captura o dedo depois do toque em "Toque para espatular", para não travar a rolagem.

---

## Onde editar o conteúdo

| Arquivo | Conteúdo |
|---|---|
| `src/data/site.ts` | Nome, WhatsApp, Instagram, e-mail, prêmios e parceiros |
| `src/data/unidades.ts` | Endereços, horários, fotos e textos de cada unidade |
| `src/data/sabores.ts` | Sabores (nome, descrição, cor da ilustração, tags, temporada, unidade) |
| `src/data/cardapio.ts` | Cafés, doces e salgados |
| `src/assets/fotos/` | Fotos (o Astro gera versões WebP otimizadas no build) |
| `public/og-crema-lab.jpg` | Imagem que aparece quando o link é compartilhado (1200 × 630) |

As ilustrações dos sabores são geradas por código a partir da cor de cada sabor (`src/components/sabores/Bola.astro`).

## Antes de publicar: itens a confirmar com a Crema Lab

Os pontos abaixo vieram de pesquisa pública e precisam de validação (os principais estão marcados com `CONFIRMAR` no código):

1. **WhatsApp** `(41) 99652-8031` — número encontrado em resultado de busca, não confirmado (`src/data/site.ts`).
2. **Horários das três unidades** — as fontes divergem, principalmente no Batel (`src/data/unidades.ts`, campo `horariosConfirmar`).
3. **E-mail comercial** — ainda vazio (`src/data/site.ts`).
4. **Fotos** — as atuais são recortes de baixa resolução (Google Maps e Instagram) usados como provisórios. Substituir pelas originais, com autorização de uso (`src/assets/fotos/`).
5. **Fonte Blair ITC** — confirmar se a licença cobre uso na web (o site usa um recorte WOFF2 em `public/fonts/`).
6. **Sabores, cardápio e encomendas** — baseados em matérias de 2024 a 2026; conferir o que segue valendo. O site não mostra preços.
7. **Shopping Mueller** — data de inauguração e detalhes da unidade.
8. **Alergias e dietas** — o site não afirma "sem glúten"; qualquer alegação desse tipo precisa de confirmação formal.

## Publicar

O `npm run build` gera um site 100% estático em `dist/`, que pode ir para qualquer hospedagem estática
(Vercel, Netlify, Cloudflare Pages, GitHub Pages…). Defina o domínio final na variável de ambiente
`SITE_URL` no momento do build (ex.: `SITE_URL=https://cremalab.com.br npm run build`) para que os links
canônicos e as prévias de compartilhamento usem o endereço certo.

## Estrutura

```
src/
  pages/            páginas (cada arquivo é uma rota)
  layouts/Base.astro  <head>, loader, transições, menu, cursor e rodapé
  components/
    marca/          marca vetorizada (monograma, wordmark, mural, ícones em traço)
    home/ sabores/ laboratorio/ unidades/ eventos/ nav/ global/ ui/
  scripts/
    nucleo.ts       GSAP, Lenis e o "portão" das animações de entrada
    transicao.ts    loader e espatulada entre páginas
    desenho.ts      "desenho se desenhando" (DrawSVG)
    rabisco.ts      anotações à mão com Rough.js
    horarios.ts     status "aberto agora" no fuso de Brasília
    three/          cenas 3D (espátula e fachada de micélio)
  styles/           tokens de cor e tipografia, base
  data/             conteúdo editável
scripts/marca/      geração dos vetores da marca a partir dos PNGs
public/             fontes, favicons, cursores e imagem de compartilhamento
```

### Regenerar os vetores da marca

Os desenhos animados da marca (`src/assets/marca/*.json`) foram gerados a partir dos PNGs da raiz do
repositório (`cremalab logo1r.png`, `cremalab logo2.png`, `cremalab parts1.png`). Para gerar de novo:

```bash
pip install numpy scipy scikit-image pillow potracer opencv-python-headless
python3 scripts/marca/vetorizar.py   # monograma, wordmark e mural (prévias em scripts/marca/previas/)
python3 scripts/marca/retrato.py     # retrato em traço da chef
```
