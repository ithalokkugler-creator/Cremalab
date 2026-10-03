# Preparação — Site Crema Lab

**Gelato + Café + Experiências · Felicidade Atemporal**

> Documento de preparação criativa e técnica para um site-experiência nível Awwwards.
> **Somente planejamento** — nenhum código do site foi escrito.
> Data: 03/10/2026 · Idioma do site: **português do Brasil** · Arquivos de marca usados: `cremalab logo1r.png`, `cremalab logo2.png`, `cremalab parts1.png`, `blair-itc-medium.otf` (raiz deste repositório).

---

## Sumário

0. [Ficha rápida](#0-ficha-rápida)
1. [Briefing consolidado](#1-briefing-consolidado)
2. [Pesquisa — quem é a Crema Lab](#2-pesquisa--quem-é-a-crema-lab)
3. [Análise das imagens e arquivos da marca](#3-análise-das-imagens-e-arquivos-da-marca)
4. [Conceito criativo](#4-conceito-criativo)
5. [Identidade visual para web](#5-identidade-visual-para-web)
6. [A marca animada — o desenho se desenhando](#6-a-marca-animada--o-desenho-se-desenhando)
7. [Inspiração: truus.co](#7-inspiração-truusco)
8. [Arquitetura de informação](#8-arquitetura-de-informação)
9. [Home — narrativa seção por seção](#9-home--narrativa-seção-por-seção)
10. [Páginas internas](#10-páginas-internas)
11. [Microinterações globais](#11-microinterações-globais)
12. [Three.js — onde o 3D ganha o lugar](#12-threejs--onde-o-3d-ganha-o-lugar)
13. [Rough.js — o rabisco da chef](#13-roughjs--o-rabisco-da-chef)
14. [GSAP — arquitetura de animação](#14-gsap--arquitetura-de-animação)
15. [Stack e estrutura do projeto](#15-stack-e-estrutura-do-projeto)
16. [Performance, acessibilidade, SEO e LGPD](#16-performance-acessibilidade-seo-e-lgpd)
17. [Conteúdo — inventário, shot list e checklist do cliente](#17-conteúdo--inventário-shot-list-e-checklist-do-cliente)
18. [Roadmap de produção](#18-roadmap-de-produção)
19. [Critérios de aceite](#19-critérios-de-aceite)
20. [Riscos e mitigação](#20-riscos-e-mitigação)
21. [Pendências — perguntas ao cliente](#21-pendências--perguntas-ao-cliente)
- [Apêndice A — Fontes](#apêndice-a--fontes)
- [Apêndice B — Snippets ilustrativos](#apêndice-b--snippets-ilustrativos)

---

## 0. Ficha rápida

| Item | Definição |
|---|---|
| **Cliente** | Crema Lab — gelateria artesanal de inspiração italiana, Curitiba/PR |
| **Fundação** | 2024, no Batel, pela chef gelatiere **Harlen Tessari Brandão** |
| **Unidades** | **Batel** (flagship) · **ParkShoppingBarigui** · **3ª unidade a confirmar** (fontes públicas confirmam só duas até out/2026) |
| **Objetivo nº 1** | Transformar visita ao site em visita à loja: a pessoa sai com vontade de tomar um gelato **e** sabendo onde, quando e o que pedir |
| **Objetivos secundários** | Encomendas e eventos via WhatsApp (carrinho de gelato, sobremesas sazonais) · contar a história da chef e do laboratório · reforçar autoridade (prêmios, arquitetura, fachada de micélio) |
| **Público** | (1) curitibanos de 20 a 45 anos que valorizam gastronomia autoral, design e "lugares para ir"; (2) famílias de fim de semana no Batel e no Barigui; (3) quem contrata eventos (casamentos, corporativo, aniversários); (4) imprensa e parceiros |
| **Sensação nos primeiros 5 s** | "Entrei na loja": calor terracota, o traço da marca se desenhando na tela, a vitrine em movimento. Sofisticado, mas sorrindo |
| **Idioma** | pt-BR |
| **Ambição** | Awwwards SOTD: experiência interativa e imersiva, com desenho em tempo real |
| **Stack** | Astro 7 + TypeScript · GSAP 3.15 (ScrollTrigger, DrawSVG, MorphSVG, SplitText, Inertia, Draggable, Flip, CustomEase/CustomWiggle) · Lenis 1.3 · Rough.js 4.6 · Three.js r186 (sob demanda) · Vercel |
| **Referência principal** | truus.co: topo da landing e rolagem, adaptados às cores e ao traço da Crema Lab |
| **Fonte da marca** | Blair ITC Medium (no repo) + Jost para texto corrido |

### Como esta preparação foi feita (e seus limites)

- **Pesquisa da marca:** imprensa local e especializada (Bom Gourmet, Haus, designboom, Bem Paraná, Topview, CBN, HojePR, Where Curitiba, Curitidoce, Curitiba Honesta, RIC). Links no [Apêndice A](#apêndice-a--fontes).
- **Bloqueio de rede no ambiente de preparação:** `truus.co`, `instagram.com` e os sites de notícia não abriram diretamente. Por isso:
  - a **truus.co** foi analisada pela ficha Awwwards (via busca) e pela leitura do código de uma **recriação open-source** do site (GitHub `Thakuma07/Truus.co-Awwward-Website`). Tempos, eases e mecânicas citados aqui vêm dessa recriação e precisam ser **validados no site real antes do build** (checklist em [7.5](#75-checklist-para-validar-no-site-real));
  - o **Instagram @cremalabgelato** não pôde ser aberto. A leitura de "o que a marca gosta" vem das 3 fotos enviadas e de conteúdos do perfil reproduzidos na imprensa. Pedir ao cliente os 20–30 posts favoritos ou acesso ao drive de fotos;
  - as informações de imprensa vieram de trechos indexados por busca. Itens frágeis (horários, preços, datas, telefone) estão marcados como **(confirmar)**.
- **Arquivos do repositório:** analisados diretamente. As cores das fotos foram amostradas por pixel, a fonte foi inspecionada glifo a glifo e os PNGs foram medidos.

---

## 1. Briefing consolidado

### 1.1 O que o cliente já definiu

- [x] Site interativo, nível Awwwards, "uma verdadeira experiência".
- [x] Micro-animações com **GSAP**, **Rough.js** e **Three.js**.
- [x] Marca animada "como um desenho sendo desenhado", usando os logos do repo.
- [x] Inspiração **truus.co**, sobretudo o topo da landing e a rolagem: usar muito do que ele tem, mas com as cores da Crema Lab.
- [x] Cores: **#b26a5b** (principal), **#dad3a7**, **#f1a500** e complementares.
- [x] Fonte: **Blair ITC Medium** (enviada).
- [x] Cores diferentes para construir as landing pages.
- [x] Conteúdo em português do Brasil.
- [x] Pesquisar o lugar, a equipe, a dona e as três unidades.

### 1.2 Decisões assumidas nesta preparação (validar com o cliente)

| Decisão | Motivo |
|---|---|
| Objetivo principal = visita à loja; secundário = WhatsApp para eventos e encomendas | As fontes não citam e-commerce nem delivery próprio; a marca vende uma experiência presencial |
| Site **multipágina** com transições: Home, Sabores, Laboratório, Unidades (+ uma página por unidade), Eventos & Encomendas | "Landing pages" no plural e SEO local por unidade |
| Cada página é um **mundo de cor** da paleta | Atende ao pedido de cores diferentes por landing sem quebrar a unidade visual |
| Fonte de texto corrido complementar (**Jost**) | Blair ITC só tem maiúsculas e versaletes e é larga: ótima para títulos, cansativa em parágrafos |
| 3ª unidade como **slot de conteúdo pronto** (dados plugáveis, flag `ativa`) | Só duas lojas confirmadas publicamente |
| **Astro** em vez de Webflow ou Next.js | Site majoritariamente estático, rápido e bom para SEO; JS só onde há animação ou 3D; transições com `ClientRouter` |
| Uma cena WebGL por página, no máximo | Orçamento de performance para celulares médios |

---

## 2. Pesquisa — quem é a Crema Lab

### 2.1 Conceito da marca

- **Assinatura:** GELATO + CAFÉ + EXPERIÊNCIAS · **tagline:** FELICIDADE ATEMPORAL · **manifesto pintado na coluna da loja:** TRADIÇÃO / INOVAÇÃO / E SABOR.
- Apresenta-se como "um verdadeiro laboratório de experiências gastronômicas": gelato italiano artesanal e purista, com toque local e curadoria de ingredientes, muitos deles feitos na casa.
- **Produção à vista:** o laboratório fica no fundo da loja do Batel, atrás de uma parede de vidro sustentada por estrutura metálica de linhas curvas e abobadadas. O cliente vê o gelato sendo feito.
- **Sustentabilidade como linguagem:** fachada de micélio e enxoval de serviço totalmente compostável (o copo da foto 3).
- **Reconhecimento rápido:** premiada no primeiro ano (ver 2.7).

### 2.2 A chef — Harlen Tessari Brandão

- Fundadora e chef gelatiere. O nome assina a marca: "CHEF GELATIERE · CL · HARLEN BRANDÃO" aparece na fachada e no mural.
- **Formação na Itália:** curso intensivo em San Marino e, depois, curso em tempo integral em Brescia. São três formações em institutos italianos, com mestres do gelato artesanal, e passagens por cozinhas e laboratórios de renome.
- **Método purista:** receitas autorais, tudo feito do zero, **inclusive as pastas de pistache e de avelã**.
- Ingredientes funcionais e compromisso com sustentabilidade.
- **Coletar com o cliente:** retrato profissional; 2 ou 3 citações em primeira pessoa; a história de origem (por que gelato, por que Curitiba); o sabor favorito; "o sabor que mudou tudo"; e uma amostra de letra manuscrita para a fonte "letra da chef" (ver 5.2).

### 2.3 As unidades

| | **Batel (flagship)** | **ParkShoppingBarigui** | **3ª unidade** |
|---|---|---|---|
| Endereço | R. Dep. Antônio Baby, 18 — Batel | Piso L3, Loja 319 — Mossunguê (nova ala do 3º piso, junto ao Park Gourmet) | **a confirmar** |
| Abertura | 2024 | 18/11/2025, segundo a imprensa (confirmar) | — |
| Horário **(confirmar: as fontes divergem)** | Ter–Sáb 11h–22h · Dom 11h–21h. Outra fonte: Ter–Sáb 10h–21h · Dom 10h–20h. Segunda fechado (implícito) | Seg–Sáb 10h–22h · Dom 12h–20h | — |
| Destaques | Fachada de micélio "casquinha"; laboratório envidraçado; **Piazza** (área comum que recebeu a exposição "A Arte do Gelato"); mural de traço | Fachada de micélio replicada; pistache **exclusivo** com chocolate branco e toque de laranja | — |
| Mundo de cor no site | Terracota | Âmbar | Creme Pistache (provisório) |

### 2.4 O espaço — arquitetura e materiais

- **Interiores:** **Uza Design e Arquitetura**, inspirada nas gelaterias italianas tradicionais.
- **Piso:** paginação exclusiva com pequenas peças cerâmicas, tipo granilite/terrazzo, em rosa, areia, preto e branco. Traz calor e resgata uma tradição histórica.
- **Arcos e abóbadas:** vãos, passagens e forro arredondados que remetem às cúpulas de capelas e palácios italianos (é o forro curvo terracota da foto 1).
- **Pintura espatulada** nas paredes, que lembra o movimento da espátula ao montar a vitrine e ao servir o gelato.
- **Fachada:** **Furf Design Studio** com a startup brasileira **Mush**. São painéis de **micélio** (a parte vegetativa dos cogumelos) produzidos a partir de resíduos agrícolas, com **textura inspirada na casquinha de sorvete**. Fazem isolamento térmico e acústico, absorvem CO₂ na produção e biodegradam em até cerca de 90 dias se descartados na natureza. O designboom (set/2024) a apresentou como **a primeira fachada comercial do mundo feita com painéis de micélio**. Foi replicada na unidade do Barigui.
- **Mural (foto 1):** grafismo em traço preto contínuo sobre parede creme. Tem arco com onda, xícara fumegante, ramo, régua de listras verticais, linhas pontilhadas com pontos e o logotipo no centro, ladeado por "GELATO + CAFÉ + EXPERIÊNCIAS" e "FELICIDADE ATEMPORAL".
- **Mobiliário:** cadeiras pretas de casca, mesas redondas pretas, mesinha amarelo-mostarda e toldos amarelos na fachada.

### 2.5 Cardápio — catálogo de referência

> Itens e preços citados pela imprensa entre 2024 e 2026. Servem para estruturar o conteúdo, **não** para publicação sem confirmação.

**Gelatos e sorbets já citados**

| Sabor | Descrição | Observação |
|---|---|---|
| Nocciolotto | pasta artesanal de avelã, creme de avelã e pedaços crocantes | recorrente |
| Pistache (Batel) | sorbet clássico à base de água + farofinha de pistache | |
| Pistache (Park) | pistache, chocolate branco e toque cítrico de laranja | exclusivo da unidade |
| Fior di Latte / Doppio di Latte | base láctea italiana | base de várias criações |
| Baunilha bourbon | | base do affogato |
| Mango Lab com pesto doce de manjericão | sorbet de manga Palmer, sem açúcar refinado | verão |
| Pêssego com gorgonzola | combinação inusitada | |
| Batidinha de Maracujá | sorbet com leite condensado e cachaça mineira | Carnaval |
| Limonello | limão-siciliano + licor da **Casa Limoncello** (Curitiba) | verão |
| Uva Terci | sorbet de suco artesanal de uvas frescas | |
| Cuca de Doce de Leite | fior di latte + doce de leite mineiro + farofa doce | inverno |
| Manhã Viva | sorbet vegano sem açúcar refinado: laranja, cenoura, manga, leite de coco, cúrcuma, gengibre e canela | inverno |
| Mandarino | | inverno |
| Foresta Nera | fior di latte com flocos de chocolate, calda de amarena, raspas de chocolate e cerejas | fim de ano |
| Sorbet de café com licor de laranja | grãos **Lucca Cafés Especiais** + Cointreau Noir | |
| Edição Dia do Sorvete | chocolate com azeite e flor de sal · baunilha com bacon crocante · Doppio di Latte com farofa de batata frita e chocolate | edição limitada |
| Natal (sob encomenda) | sorbet de ameixa com calda de ginja (sem lactose) · gelato almendrado (creme de ovos + praliné de amêndoas) | bowls |

**Cafés, doces e salgados**

| Item | Descrição | Preço citado |
|---|---|---|
| Cafés especiais | | a partir de R$ 7 |
| Affogato | dois shots de ristretto + bola de gelato de baunilha bourbon | R$ 18 |
| Lattes de inverno | Doppio Latte · Ciocco Latte · Pistacchio Latte · Crema Latte | R$ 18 cada |
| Cioccocrumble | sobremesa de chocolate com amêndoas e crumble de nibs de cacau | R$ 31,90 |
| Quattrino di Pistacchio | bolo úmido de pistache, farofa doce de pistache e sorbet de pistache | R$ 34,90 |
| Paninis no pão de queijo artesanal | Caprese · Mineirinho · Parma | a partir de R$ 10 |
| Festival San Giovanni (edição) | gelato de pipoca doce com caramelo salgado (R$ 23,90) · arroz-doce português com gelato de canela (R$ 27,90) · panini de pão de queijo com salsicha alemã artesanal e raclette de Witmarsum | edição limitada |
| Bowls de Natal | meia esfera ≈ 1,4 kg (até 10 pessoas) R$ 279 · esfera inteira R$ 558 · pedidos via WhatsApp até 22/12 | sazonal |

**Alergias e dietas:** um guia de terceiros (Find Me Gluten Free) lista a loja como "dedicada sem glúten". Isso **precisa de confirmação formal** antes de aparecer no site, porque alegações de alérgenos têm risco legal e de saúde.

### 2.6 Experiências, eventos e collabs

- **Exposição "A Arte do Gelato".** Inaugurada em 23/09, Dia do Sorvete, nas paredes da **Piazza** do Batel. Traz fotos, **mapas de ingredientes**, adesivos e textos didáticos sobre o processo, e vira conteúdo da página Laboratório.
- **Festival San Giovanni**, um "São João italiano" que celebra o padroeiro de Florença, com menu temático (ver 2.5).
- **Carrinho de gelato para eventos**, com drinks exclusivos feitos com os gelatos.
- **Natal:** sobremesas sob encomenda em **bowls metalizados exclusivos** criados com a **Vanessa Taques Casa**. Depois, a peça vira objeto decorativo, que é sustentabilidade estética.
- **Collabs:** **Île de France** (drinks com sorbets: maçã + Applejack; laranja e damasco + Cointreau; limão + vodka de baunilha) · **Revival** (moda, ligada pela cor pistache) · **Lucca Cafés Especiais** · **Casa Limoncello**.

### 2.7 Prêmios e imprensa

- **Prêmio Bom Gourmet 2024:** **HAUS Ambientação** (vencedora, pela arquitetura) e **Novidades**.
- **Prêmio Bom Gourmet 2025:** **finalista (top 5)** em Sorveteria ou Gelateria.
- **designboom** (set/2024): a fachada de micélio.
- Cobertura recorrente em Gazeta/Bom Gourmet, Haus, Bem Paraná, Topview, CBN Curitiba, HojePR, Where Curitiba, Curitidoce, Curitiba Honesta e RIC.

### 2.8 A equipe ("crew")

- **Pública:** Harlen Tessari Brandão (fundadora e chef gelatiere).
- **Quem criou o espaço:** Uza Design e Arquitetura (interiores), Furf Design Studio (fachada) e Mush (biomaterial).
- **Parceiros de produto:** Lucca Cafés Especiais, Casa Limoncello e Vanessa Taques Casa.
- **Equipe de loja e laboratório:** sem nomes nas fontes públicas. O site terá a seção **"Quem faz"** pronta para 4 a 12 pessoas. Coletar nome, função, tempo de casa, sabor favorito e uma foto em fundo liso (vira retrato em traço; ver 10.2).

### 2.9 O que a marca "gosta" (leitura de fotos, imprensa e perfil)

**Pilares de conteúdo percebidos**

1. Lançamentos sazonais com nomes italianos e brincadeiras brasileiras (Batidinha de Maracujá, Cuca de Doce de Leite, Manhã Viva).
2. Bastidores do laboratório e da técnica.
3. Arquitetura e materiais: micélio, piso, arcos.
4. Collabs com moda, alta gastronomia e design.
5. Datas e festas: Dia do Sorvete, Carnaval, São João italiano, Natal.
6. Gente: mãos segurando o copo, a vitrine, o encontro na Piazza.

**Estética:** luz natural quente, tons terrosos, enquadramento frontal e simétrico (como a fachada), close na textura do gelato e o copo compostável com o logotipo em destaque. **Validar com o feed real.**

### 2.10 Leitura estratégica

- **Diferenciais únicos** (que nenhuma concorrente tem e que o site precisa dramatizar): (1) a fachada de micélio "casquinha"; (2) o laboratório envidraçado e o método purista da chef; (3) o traço gráfico autoral do mural; (4) combinações inusitadas com base técnica.
- **Concorrência direta citada:** Bacio di Latte, vencedora da categoria no Bom Gourmet 2024/2025. O posicionamento contra ela é **autoral × rede**: o site deve ter cara de ateliê, não de franquia.

---

## 3. Análise das imagens e arquivos da marca

### 3.1 Foto 1 — interior e mural

| Observação | Detalhe | Decisão de design |
|---|---|---|
| Cores | forro curvo terracota (≈ #8E503F na sombra), parede creme (≈ #EDE4DC), coluna rosada clara (≈ #DCC8B8), preto do traço e das cadeiras, granilite rosa/areia/preto/branco, mesinha mostarda | Fundo base **creme quente**, nunca branco puro; terracota escura (Telha) para textos em tom de marca |
| Tipografia | "TRADIÇÃO / INOVAÇÃO / E SABOR" em Blair, caixa-alta larga, escalonado em diagonal, com "E SABOR" inclinado; no mural, Blair pequena com espaçamento aberto | Títulos em Blair escalonados na diagonal; "itálico" da marca reproduzido como oblíquo controlado |
| Texturas | listras verticais finas (efeito ripado ou código de barras) emoldurando o mural; granilite; pintura espatulada | A "régua" de listras vira **divisor de seção** e **barra de progresso**; o granilite vira padrão generativo; a espatulada vira o **gesto da transição** |
| Formas | arco, onda senoidal, pontos sobre linha, xícara, ramo, cúpula | Fotos com **máscara em arco**; a **onda** é o motivo de movimento da marca |
| Luz e mood | difusa, clara e quente; calma editorial | Animações "cremosas", com desacelerações longas |

### 3.2 Foto 2 — fachada

| Observação | Detalhe | Decisão de design |
|---|---|---|
| Cores | terracota (na foto ≈ #9B5D57; na marca **#B26A5B**), toldos amarelos (foto superexposta ≈ #E8D19B; na marca **#F1A500**), letreiro creme | Terracota = cor-mãe; âmbar = toque de alegria |
| Textura | **losangos em relevo** (casquinha/waffle) em grade diagonal | Padrão SVG para fundos terracota + cena da fachada (ver 9.8 e 12.2) |
| Composição | simétrica e frontal; dois toldos; wordmark central; assinaturas pequenas nas laterais ("GELATO + CAFÉ + EXPERIÊNCIAS" à esquerda, "FELICIDADE ATEMPORAL" à direita) e embaixo ("CHEF GELATIERE · CL · HARLEN BRANDÃO") | O **letreiro vira o layout do topo**: assinaturas nos cantos do hero e wordmark ao centro na navbar |
| Vida | pessoa passando, rua real | Hero em vídeo com gente, nunca só produto |

### 3.3 Foto 3 — produto

| Observação | Detalhe | Decisão de design |
|---|---|---|
| Cores | copo kraft/creme (≈ #D5C099), gelato de manga (≈ #E4B358), coco/creme (≈ #EFEACC) | O Creme Pistache #DAD3A7 conversa com o copo; o Âmbar conversa com a manga |
| Textura | gelato poroso e cremoso, com marcas de espátula | **Material do 3D** ("Passe a espátula") |
| Objeto | copo compostável com logotipo e assinaturas | "Objeto-herói" para stickers, ícones e OG images |
| Contexto | gente e plantas desfocadas, balcão | Fotos de produto **na mão**, em uso real |

### 3.4 Arquivos do repositório

| Arquivo | O que é | Estado técnico | Uso no site |
|---|---|---|---|
| `cremalab logo1r.png` | **Monograma CL.** "C" circular aberto à direita; "l" interno curvo; crescente preenchido à esquerda com borda **ondulada** (a "onda" do creme); traço oblíquo acima (acento) e cauda curva abaixo (colher/sorriso) | PNG 1504×2826, tinta preta sobre transparência (84% transparente) | favicon, loader, transições, selo, 404 |
| `cremalab logo2.png` | **Wordmark "crema lab"**, **girado 90°** (lê-se de cima para baixo). "c" com onda no topo, "e" com metade preenchida, "m" construído com diagonais, "a" e "b" com contraformas preenchidas, "l" com cauda | PNG 1024×4178, tinta preta sobre transparência (88%) | navbar, hero, rodapé, mural |
| `cremalab parts1.png` | **Folha de line art do mural**, espelhada em cima e embaixo: faixas de listras verticais, réguas, onda senoidal, xícara com vapor, ramo com folhas e bolinhas, arco/abóbada, sol nascente com raios, nuvem/copa, cartão com canto dobrado, raios em "Y" | PNG 1984×2126, traço monolinha de espessura constante, pontas retas | doodles, divisores, stickers, mural digital |
| `blair-itc-medium.otf` | **Blair ITC Medium** (ITC, 1995–97), v001.001 | 229 glifos; Latin-1 completo, **com todos os acentos do PT-BR** (Á À Â Ã É Ê Í Ó Ô Õ Ú Ü Ç); minúsculas = **versaletes** (x-height 615 / cap 724, ≈ 85%); kerning GPOS; **sem itálico**; **sem setas (→ ←), sem €, sem ≈** | display e rótulos (ver 5.2) |
| `Cores.txt` | vazio | — | paleta definida na seção 5.1 |

> Para o build: renomear os assets em kebab-case, sem espaços (`crema-monograma.png`, `crema-wordmark.png`, `crema-mural-pecas.png`).

### 3.5 Mood

> A Crema Lab é uma gelateria italiana desenhada a nanquim sobre papel creme: terracota quente, granilite alegre e um traço fino, preciso e contínuo que conta histórias. É elegante como um café de Milão e simpática como um fim de tarde no Batel. É tradição com cara de laboratório, onde cada sabor é um experimento anotado à mão.

---

## 4. Conceito criativo

### 4.1 Big idea — "O Caderno do Laboratório"

O site é o **caderno de laboratório da chef**. Cada página é uma folha onde a marca **se desenha enquanto você rola**. Três camadas trabalham juntas:

| Camada | Quem desenha | Linguagem | Ferramenta | Significado |
|---|---|---|---|---|
| **O traço da marca** | a marca | monolinha precisa: mural, logo, ícones | SVG + GSAP DrawSVG/MorphSVG | **Tradição** |
| **O rabisco da chef** | a chef | anotações tortas: círculos, setas, hachuras, fórmulas | **Rough.js** + DrawSVG | **Inovação** |
| **A matéria** | o visitante | textura de gelato e de micélio, luz, cremosidade | **Three.js** | **Sabor** |

Frase-guia interna: **"Todo sabor começa num rabisco."**

### 4.2 Princípios de experiência

1. **Desenhar, não aparecer.** Nada surge com um fade genérico: as linhas se traçam, as cores são espalhadas como na espátula e as letras caem como bolas de gelato.
2. **Precisão e brincadeira.** Para cada traço perfeito existe uma anotação torta, nunca o contrário: logo, monograma e mural **nunca** recebem Rough.js.
3. **Temperatura.** Conteúdo se move de forma "cremosa", com desacelerações longas. Elásticos curtos ficam só para objetos lúdicos (stickers, cards, letras).
4. **A loja é o destino.** Toda seção termina apontando para uma unidade, um sabor ou o WhatsApp.
5. **Leve como sorbet.** Animação nunca bloqueia a leitura, o 3D carrega sob demanda e tudo tem versão sem movimento.
6. **No máximo um "momento uau" por dobra.** O resto é microinteração.

### 4.3 Tom de voz

Caloroso, curioso e preciso. Mistura o italiano de vitrine (nomes de sabores, *piazza*, *gelatiere*) com o português afetivo de Curitiba. Frases curtas, humor leve e nunca debochado. Usa "a gente". Explica a técnica sem pedantismo.

| Uso | Copy |
|---|---|
| H1 da Home | **FELICIDADE** *ATEMPORAL* |
| Subtítulo da Home | Gelato italiano de autor, feito do zero todos os dias no nosso laboratório. |
| Manifesto horizontal | **TRADIÇÃO · INOVAÇÃO ·** *E SABOR* |
| Vitrine | **A VITRINE MUDA COM AS ESTAÇÕES** |
| Chef | **APRENDEU NA ITÁLIA. REESCREVEU EM CURITIBA.** |
| Laboratório | **DO ZERO. ATÉ A PASTA DE PISTACHE.** |
| Fachada | **UMA FACHADA QUE NASCEU DE COGUMELOS.** |
| Interação 3D | **AGORA É COM VOCÊ: PASSE A ESPÁTULA.** |
| Unidades | **ESCOLHA SUA VITRINE** |
| CTA principal | Quero um gelato agora |
| CTA WhatsApp | Chamar no WhatsApp |
| CTA eventos | Levar o carrinho pra minha festa |
| Cursor contextual | provar · abrir · ir · ver mapa · espatular |
| Aba inativa | Volta, tá derretendo! 🍨 |
| 404 | OPS. ESSA PÁGINA DERRETEU. |
| Loader (texto acessível) | Preparando a vitrine… |
| Rodapé | Felicidade atemporal desde 2024. |

**Evitar:** "o melhor sorvete da cidade" e superlativos sem prova; "sorvete" quando o assunto é gelato (usar "sorvete" só em SEO e explicações); qualquer afirmação de saúde ou alérgeno sem confirmação.

---

## 5. Identidade visual para web

### 5.1 Paleta

| Token | Nome | Hex | Papel | Origem |
|---|---|---|---|---|
| `--c-terracota` | **Terracota Crema** | `#B26A5B` | cor principal: mundo Unidades, transição "espatulada", títulos grandes sobre creme, botões primários | fachada e forro (**cliente**) |
| `--c-telha` | **Telha Profunda** | `#8E4F42` | terracota **para texto** em fundo claro; painéis com texto corrido em creme; hover e pressed | forro na sombra (foto 1) |
| `--c-ambar` | **Âmbar Toldo** | `#F1A500` | destaque: stickers, pílulas, "aberto agora", mundo Sabores; texto sobre ele sempre em Cacau | toldos e manga (**cliente**) |
| `--c-pistache-creme` | **Creme Pistache** | `#DAD3A7` | segundo fundo claro: mundo Laboratório, cards, blobs | copo e coco (**cliente**) |
| `--c-fior` | **Fior di Latte** | `#F5EFE6` | papel e base do site | parede e coluna creme (foto 1) |
| `--c-cacau` | **Cacau** | `#2B211C` | traço e texto principal; fundo do rodapé | cadeiras e preto do granilite |
| `--c-rosa` | **Rosa Granilite** | `#E4BFAE` | terciária: mundo Eventos, cards, hachuras de destaque | granilite (foto 1) |
| `--c-pistache` | **Pistache** | `#A3A86B` | **só ilustração e sabor** (3D, stickers); nunca texto nem fundo de texto | sabor-ícone + collab Revival (proposta) |

**Contraste WCAG medido**

| Texto ↓ / Fundo → | Fior | Creme Pistache | Rosa | Âmbar | Terracota | Telha | Cacau |
|---|---|---|---|---|---|---|---|
| **Cacau** | 13,74 ✅ | 10,36 ✅ | 9,25 ✅ | 7,57 ✅ | 3,82 ⚠️ grande | 2,50 ❌ | — |
| **Fior** | — | 1,33 ❌ | 1,49 ❌ | 1,81 ❌ | 3,60 ⚠️ grande | 5,49 ✅ | 13,74 ✅ |
| **Telha** | 5,49 ✅ | 4,14 ⚠️ grande | 3,69 ⚠️ grande | 3,02 ⚠️ grande | — | — | 2,50 ❌ |
| **Terracota** | 3,60 ⚠️ grande | 2,71 ❌ | 2,42 ❌ | 1,98 ❌ | — | 1,53 ❌ | 3,82 ⚠️ grande |

✅ = AA para qualquer tamanho · ⚠️ grande = só texto ≥ 24px (ou ≥ 18,66px bold) · ❌ = nunca para texto.

**Regras derivadas**

1. Texto corrido (< 24px) só em: Cacau sobre Fior, Creme Pistache, Rosa ou Âmbar; Fior sobre Cacau ou Telha; Telha sobre Fior.
2. Em fundos **Terracota**, o texto corrido fica dentro de **painéis Telha** (Fior sobre Telha, 5,49) ou de **cards Fior**. Títulos em Blair grande podem ir direto, em Fior.
3. O **Âmbar nunca é texto** sobre claro (1,81). Ele é preenchimento.
4. Itens da navbar sobre fundos coloridos ficam **sobre blobs** (como o "work" da truus): Cacau sobre blob Âmbar ou Fior. O logo é isento.
5. Foco visível: anel de 3px **Âmbar** com contorno interno de 2px **Cacau**, válido em qualquer fundo.

**Mundos de cor (um por página)**

| Página | Fundo dominante | Tinta | Acento decorativo | Cor da "espatulada" de entrada |
|---|---|---|---|---|
| Home | Fior di Latte (seções alternam, ver 9) | Cacau | Terracota + Âmbar | Terracota |
| Sabores | Âmbar no hero, depois Fior | Cacau | Terracota | Âmbar |
| Laboratório | Creme Pistache | Cacau | Telha | Creme Pistache |
| Unidades | Terracota no hero; texto em painéis Telha e Fior | Fior | Âmbar | Terracota |
| Unidade Batel | Terracota | Fior | Âmbar | Terracota |
| Unidade ParkShoppingBarigui | Âmbar | Cacau | Terracota | Âmbar |
| 3ª unidade | Creme Pistache | Cacau | Telha | Creme Pistache |
| Eventos & Encomendas | Rosa Granilite | Cacau | Terracota | Rosa |
| Rodapé (global) | Cacau | Fior | Âmbar | — |

A "espatulada" sorteia a cor do **mundo de destino** e nunca repete a cor da transição anterior.

### 5.2 Tipografia

**Display e rótulos — Blair ITC Medium (500)**

- Larga e em caixa-alta. Minúsculas viram **versaletes** a ≈ 85% da altura da maiúscula; usar isso para hierarquia ("FELICIDADE *atemporal*" vira caixa-alta + versalete).
- Usos: H1–H3, eyebrows, navegação, botões, preços, selos e etiquetas.
- Tracking: títulos grandes de `0` a `0.02em`; rótulos ≤ 14px de `0.18em` a `0.24em`, como "GELATO + CAFÉ + EXPERIÊNCIAS" no mural.
- **"Itálico" da marca** ("E SABOR"): a Blair não tem itálico. Usar oblíquo controlado, `display:inline-block; transform: skewX(-12deg)`, com `font-synthesis: none` para evitar o itálico sintético inconsistente entre navegadores.
- **Sem setas**: setas e ícones são SVG da biblioteca de traço, nunca glifos.
- **Licença:** o .otf é de desktop (ITC/Monotype). O **uso web exige licença de webfont**: confirmar ou adquirir antes do lançamento. Gerar WOFF2 com subset Latin + Latin-1 + pontuação (≈ 20–30 KB) e fazer preload só dela.
- Fallback: `"Blair ITC", "Copperplate", "Copperplate Gothic Light", "Optima", sans-serif`, com `@font-face` de fallback usando `size-adjust`/`ascent-override` para zerar CLS.

**Texto corrido — Jost (OFL, variável 100–900)**

- Geometria tipo Futura que conversa com o wordmark geométrico, boa legibilidade e PT-BR completo. Hospedar em WOFF2 próprio (sem chamar o Google Fonts).
- Pesos: 300 (leads grandes), 400 (corpo), 500 (legendas e UI).
- Alternativas, se o cliente preferir: Urbanist ou Outfit.

**Anotações — "letra da chef"**

- Digitalizar a letra manuscrita da Harlen (template Calligraphr → OTF/WOFF2) para as anotações do "rabisco da chef". É o toque mais autoral do site.
- Fallback até lá: **Caveat** (OFL).
- Máximo de 8 palavras por anotação; nunca em texto essencial.

**Escala tipográfica (fluida)**

| Estilo | Fonte | Tamanho | Line-height | Tracking |
|---|---|---|---|---|
| Gigante (manifesto) | Blair | `clamp(6rem, 22vw, 26rem)` | 0.9 | -0.01em |
| H1 | Blair | `clamp(2.75rem, 7vw, 7.5rem)` | 0.95 | 0 |
| H2 | Blair | `clamp(2rem, 4.5vw, 4.5rem)` | 1.0 | 0.01em |
| H3 | Blair | `clamp(1.25rem, 2vw, 1.75rem)` | 1.1 | 0.04em |
| Eyebrow / rótulo | Blair | `0.75rem`–`0.875rem` | 1.2 | 0.22em |
| Lead | Jost 300 | `clamp(1.25rem, 1.8vw, 1.625rem)` | 1.35 | 0 |
| Corpo | Jost 400 | `1rem`–`1.125rem` | 1.55 | 0 |
| Legenda / UI | Jost 500 | `0.8125rem` | 1.4 | 0.02em |
| Anotação | Letra da chef / Caveat | `clamp(1.1rem, 1.6vw, 1.5rem)` | 1.1 | 0 |

### 5.3 Sistema de traço

| Camada | Ferramenta | Espessura (desktop 1440) | Pontas | Cor | Animação |
|---|---|---|---|---|---|
| Traço da marca (mural, ícones, logo) | SVG vetorizado | 2px (ícones) · 3px (mural), proporcional ao tamanho, sem `non-scaling-stroke` | retas (`butt`), como a arte original; pontos sólidos nos ramos | Cacau sobre claro · Fior sobre escuro | DrawSVG, ease `espatula` |
| Rabisco da chef | Rough.js (SVG) | 1,5–2,5px | redondas | Telha ou Cacau (Âmbar só sobre escuro) | DrawSVG + "fervura" (ver 13) |
| Espatulada (transição) | um `path` gigante | `stroke-width` 8% → 30% da viewport | redondas | cor do mundo de destino | DrawSVG + `strokeWidth` |

### 5.4 Formas, grid e espaçamento

- **Grid:** 12 colunas, margem de 24px (mobile 16px), gutter de 24px, conteúdo com máx. 1440px; seções imersivas sangram até a borda.
- **Breakpoints:** 0–599 (mobile) · 600–1023 (tablet) · 1024–1439 (desktop) · 1440+ (wide).
- **Cantos:** card do vídeo do hero e cards de UI com raio de **24px** (como na truus). **Fotos editoriais** usam **máscara em arco** (`border-radius: 999px 999px 24px 24px`), referência aos arcos e abóbadas da loja.
- **Espaçamento base 8px:** 8 · 16 · 24 · 40 · 64 · 104 · 168. Seções com 168px no desktop e 104px no mobile.
- **Divisores de seção — "régua do mural":** linha horizontal + faixa de listras verticais (12px de altura, intervalo de 10px) + linha pontilhada com pontos a cada 48px. Desenham da esquerda para a direita ao entrar.
- **Texturas:**
  - **Waffle/losango** (fachada): SVG pattern a 6–8% de opacidade em fundos Terracota.
  - **Granilite generativo:** polígonos irregulares em Rosa, Âmbar, Cacau e Fior (seed fixa), usado no mundo Eventos e como placeholder de imagem.
  - **Grão de papel:** noise global a 3%, para dar a sensação de caderno.

### 5.5 Ícones e stickers

- **Biblioteca vinda do mural** (vetorizar): xícara, ramo, sol nascente, nuvem/copa, onda, arco, cartão dobrado, régua e pontos.
- **Novos ícones no mesmo traço:** copo Crema Lab, casquinha, espátula, colher compostável, pin de mapa, carrinho de gelato, presente (encomenda), relógio (horário), WhatsApp redesenhado em monolinha, setas (direita, esquerda, diagonal, baixo).
- **Stickers** (versão adesivo, como os da truus): ícone em traço Cacau sobre forma sólida (Âmbar, Rosa ou Creme Pistache), contorno Fior de 6px e sombra leve (`0 6px 0 rgba(43,33,28,.12)`). Rotação de repouso aleatória entre -12° e +12°.

### 5.6 Direção de fotografia e vídeo

- **Luz:** natural, lateral e quente. Sombras puxadas para o cacau, nunca para o azul.
- **Produto:** fundo Fior ou Creme Pistache liso; três ângulos por sabor (cuba vista de cima, copo a 3/4, macro da textura), sempre com o mesmo enquadramento para permitir máscaras.
- **Gente:** mãos com o copo, a vitrine, a Piazza, o laboratório através do vidro; enquadramentos frontais e simétricos, como a fachada.
- **Retratos da equipe:** fundo Creme Pistache liso e luz suave, para virarem retratos em traço.
- **Grade de cor:** altas puxando para âmbar e terracota, médios creme, pretos cacau.
- Shot list completa do vídeo do hero na seção 17.2.

---

## 6. A marca animada — o desenho se desenhando

### 6.1 Pipeline de vetorização (pré-requisito de tudo)

1. **Pedir os vetores originais** ao cliente ou ao designer da identidade: AI, PDF ou SVG do logo, do monograma e do mural. É o caminho mais rápido e fiel.
2. Sem vetores:
   - **Monograma e wordmark** são vetorizados como **formas preenchidas** (Illustrator Image Trace "Black and White", limiar ≈ 128, paths 90%, corners 50%, ruído 1px, ou potrace). Depois vem a limpeza manual de nós e o ajuste das curvas a círculos perfeitos onde a geometria pede (o C do monograma e os bojos de a, b e e).
   - **Girar o wordmark 90°** para a horizontal antes de vetorizar (o PNG está em pé).
   - **Line art do mural:** **redesenhar como traço de linha central** (pen tool, stroke sem preenchimento). **Não** usar auto-trace de contorno: o DrawSVG precisa de **um caminho por linha, na direção em que a caneta anda**.
3. **Técnica de máscara para o logo** (mantém o desenho original intacto): para cada letra ou parte, criar um **caminho-esqueleto** que segue a ordem e a direção da escrita. Ele é usado como `<mask>`, com stroke branco mais grosso que a espessura máxima da letra. Animar o esqueleto com DrawSVG **revela a forma preenchida exata**: o logo continua idêntico, mas parece desenhado à mão (snippet no Apêndice B).
4. **SVGO** com precisão 2, **sem** mesclar paths animáveis, preservando `id`s e atributos `data-ordem`.
5. **Saída:** `brand/monograma.svg`, `brand/wordmark.svg`, `brand/mural/<elemento>.svg` (um por elemento + a composição completa) e `brand/stickers/*.svg`.

### 6.2 Monograma CL — storyboard

Usos: loader da primeira visita, centro das transições, selo, 404 e favicon.

| Tempo (s) | Ação | Técnica | Ease |
|---|---|---|---|
| 0,00–0,25 | o **acento oblíquo** superior desce | máscara DrawSVG 0 → 100% | `espatula` |
| 0,15–0,85 | o **"C"** é traçado no sentido anti-horário, da ponta superior direita até a inferior | máscara DrawSVG | `power3.inOut` |
| 0,55–0,95 | o **"l" interno** desce | máscara DrawSVG | `power2.out` |
| 0,75–1,20 | o **crescente** da esquerda enche como creme: `clipPath` sobe de baixo e a borda ondulada balança duas vezes | clipPath + MorphSVG (onda A ↔ onda B) | `creme` |
| 1,00–1,35 | a **cauda** inferior é traçada da esquerda para a direita (colher/sorriso) e dá um "pique" de 3° | DrawSVG + CustomWiggle | `elastic.out(1, .5)` |
| 1,35–1,60 | respiro: escala 1 → 1,04 → 1 | — | `sine.inOut` |

- Versão curta para transições: **0,9 s** (timeline com `timeScale(1.8)`).
- **Favicon:** SVG estático do monograma. Quando a aba fica inativa, troca para a variante "derretida" (junto com o título "Volta, tá derretendo! 🍨").

### 6.3 Wordmark "crema lab" — storyboard

Ordem c → r → e → m → a → (espaço) → l → a → b, com stagger de **0,12 s**; cada letra leva de 0,45 a 0,6 s; total ≈ **1,8 s**.

| Letra | Como desenha |
|---|---|
| **c** | começa pela **onda do topo** (esquerda → direita) e desce contornando; no fim, a onda balança duas vezes com amplitude decrescente (MorphSVG) |
| **r** | haste sobe e o ombro faz a curva |
| **e** | o arco é traçado; a metade preenchida "enche" com clip-path da esquerda |
| **m** | as diagonais são traçadas como **um zigue-zague contínuo** (um único esqueleto) |
| **a**, **b** | bojo traçado; a contraforma preenchida entra com pop (scale 0,6 → 1, `elastic.out(1, .4)`) |
| **l** | haste desce e a cauda curva "chuta" com overshoot |

- **Usos:** hero (primeira visita, logo após o loader), rodapé (ao entrar na viewport, gigante) e centro do mural digital.
- **Hover na navbar:** "tremido" stop-motion, rotação ±3° com `steps(1)`, 0,15 s, yoyo infinito enquanto houver hover. É referência direta ao logo da truus.

### 6.4 Biblioteca do mural — doodles vivos

| Elemento | Onde aparece | Entrada | Microinteração |
|---|---|---|---|
| **Onda** | sublinhado de títulos, loader de imagem, divisores, barra do loader | DrawSVG esquerda → direita, 0,8 s | hover: a onda "ferve" (MorphSVG em 3 fases, loop de 0,6 s) |
| **Xícara com vapor** | seção Cafés, sticker | o corpo desenha e depois o vapor sobe (2 linhas onduladas, y -6px, opacidade) | vapor em loop leve (4 s) |
| **Ramo** | perto de "INOVAÇÃO", sabores com ervas | haste → folhas (stagger 0,08) → bolinhas com pop | hover: folhas balançam ±4° |
| **Sol nascente** | hero, "Manhã Viva", eventos de dia | o arco desenha e os raios dão pop 1-2-3 | raios giram devagar |
| **Arco/abóbada** | máscara de fotos, molduras | o contorno desenha em 1 s e revela a foto | — |
| **Régua (listras)** | divisores, barra de progresso | as listras crescem do centro (scaleY 0 → 1, stagger 0,015) | progresso: as listras escurecem conforme o scroll |
| **Pontilhado com pontos** | linha do tempo, indicadores | a linha desenha e os pontos dão pop elástico | — |
| **Cartão com canto dobrado** | moldura das fichas de sabor | contorno + o canto dobra (MorphSVG) | hover: o canto levanta mais |
| **Nuvem/copa** | Eventos (festas ao ar livre) | contorno | flutua 6px em loop |
| **Raios em "Y"** | brilhos e destaques | traços curtos com stagger | — |

### 6.5 Selo Atemporal (badge giratório)

- Texto em Blair, 12px, tracking 0,3em, em volta de um círculo: **"FELICIDADE ATEMPORAL • GELATO + CAFÉ + EXPERIÊNCIAS • CURITIBA •"**, com o monograma no centro.
- **Entrada:** o anel de texto se escreve letra a letra (SplitText chars, stagger 0,02 s) enquanto o monograma desenha.
- **Em repouso:** gira 360° a cada 24 s e acelera com a velocidade do scroll (`lenis.velocity` → `timeScale` de 1 a 4, voltando com `power2.out`).
- **Onde:** canto inferior direito do hero e no rodapé.

### 6.6 Mural digital — a assinatura da Home

Recriação do mural da loja (foto 1) em tela cheia, **desenhada pelo scroll** (pin de ≈ 250% da altura da viewport, `scrub: 1`):

| Progresso | O que se desenha |
|---|---|
| 0–15% | as duas linhas pontilhadas com pontos cruzam a tela (topo e base) |
| 15–35% | as faixas de listras verticais "chovem" do topo (stagger) |
| 35–55% | o **arco** se traça; a **onda** desce dentro dele; a **xícara** surge na base e o vapor sobe |
| 55–75% | o **ramo** cresce e o **sol** nasce no canto |
| 75–100% | o **wordmark** se desenha no centro; surgem "GELATO + CAFÉ + EXPERIÊNCIAS", "FELICIDADE ATEMPORAL" e "CHEF GELATIERE · CL · HARLEN BRANDÃO" em Blair espaçada |
| fim | crossfade de 0,6 s para a **foto real do mural**: o desenho encontra a loja |

- **Interação depois de completo:** passar o cursor sobre a onda a deforma como creme. São 12 pontos de controle com física de mola (`quickTo`) e retorno elástico.
- **Legenda:** "O mural da nossa loja do Batel — agora desenhando pra você."
- **Mobile:** sem pin longo. São 3 "quadros" com pin curto (120%) ou animação por tempo ao entrar.

### 6.7 Onde a marca animada vive

| Momento | Peça |
|---|---|
| Loader (1ª visita) | monograma completo (1,6 s) |
| Transição de página | espatulada + monograma curto (0,9 s) |
| Navbar | wordmark com tremido no hover |
| Hero | wordmark (1ª visita), selo, doodles do mural |
| Mural digital | composição inteira |
| Rodapé | wordmark gigante desenhando + selo |
| 404 | monograma "derretendo" (MorphSVG para a variante escorrida) |
| Aba inativa | título e favicon derretidos |

---

## 7. Inspiração: truus.co

### 7.1 Sobre o site

Site da agência **Truus** ("advertising for the new mainstream"). Foi **Awwwards Site of the Day em 09/09/2025**, com Developer Award e Honors no-code. Design e direção de arte de **Jordan Gilroy**; desenvolvimento de **Dennis Snellenberg**; feito em **Webflow + GSAP**. A paleta é bege `#F0EBE6` + preto + cores pop. **Fonte da análise:** ficha Awwwards e código da recriação open-source (ver 0). **Validar ao vivo.**

### 7.2 O topo da landing

1. **Abertura "scribble":** um único `path` SVG gigante é desenhado sobre a tela inteira enquanto a espessura cresce de ~8% a ~31%, até cobrir tudo com **uma cor sorteada da marca**. O logo surge no centro tremendo em stop-motion; depois o traço "desdesenha" e revela a página (≈ 2,2 s de entrada + 2,7 s de saída). O mesmo efeito roda ao clicar no logo, que leva de volta ao topo.
2. **Navbar fixa e transparente, em 3 zonas:**
   - **esquerda:** blob com "work" que gira 360° no hover e abre um painel (cresce a partir do centro do ícone, `expo.out` 0,8 s; itens com stagger de 0,06 s) com 3 projetos e um botão;
   - **centro:** logo manuscrito com tremido no hover;
   - **direita:** WhatsApp, que abre um painel com QR code;
   - um overlay escurece a página (35%) quando um painel abre, e a **cor da navbar alterna** entre claro e escuro conforme a seção de baixo.
3. **Hero:** vídeo em loop dentro de um **card com cantos de 24px e 12px de margem** da viewport, com degradê escuro na base. Título enorme centralizado embaixo (sans pesada + uma palavra em itálico serifado), **doodles** (smiley, estrela) e uma **elipse desenhada à mão** que se traça em volta da palavra-chave (1,4 s). Uma **bolha segue o cursor** (`quickTo` 0,5 s; entrada elástica de 1,7 s) e liga ou desliga o som.
4. **Cursores SVG próprios** (padrão, link, texto) + bolha "click" contextual sobre elementos clicáveis.

### 7.3 A rolagem

1. **Lenis** (`duration 1.2`, easing exponencial) sincronizado ao ticker do GSAP.
2. **Frase gigante horizontal com pin:** entra pela direita enquanto a seção sobe e, presa no topo, atravessa a tela (`scrub: 1`, ≈ 2.500px). Cada letra cai de posição e rotação aleatórias com `elastic` (`containerAnimation`); stickers dão pop; setas desenhadas se traçam.
3. **Cards "motion"** inclinados sobre um blob, **arremessáveis** com o mouse (InertiaPlugin, velocidade × 20), que voltam ao lugar; etiquetas flutuantes com frases-manifesto; título com sublinhado desenhado e sticker elástico ao entrar (`top 70%`).
4. **Cards de serviço que abrem em leque** no hover (`elastic.out(1, 0.5)`; o card ativo escala 1,08). No mobile, empilham e revelam com o scroll (pin).
5. **Marquee duplo vertical** (colunas subindo e descendo, 22 s) com logos em blocos coloridos, sem vizinhos repetidos nem na emenda do loop.
6. **Rodapé com stickers** que pulam ao entrar (`back.out`) e são **empurrados por movimentos rápidos do cursor**, voltando com mola. Créditos abrem como pop-out e o link do mapa tem traço desenhado.
7. **Título da aba** muda quando a aba perde o foco.

### 7.4 Pegar / Adaptar / Descartar

**Pegar (no espírito, quase igual)**

- Lenis + ScrollTrigger e a rolagem "manteiga".
- Navbar fixa em 3 zonas, com painéis pop-out que nascem do ícone e overlay.
- Hero como card de vídeo arredondado com margem, título gigante embaixo e elipse desenhada.
- Frase gigante horizontal com pin, letras elásticas e setas se desenhando.
- Cards arremessáveis com inércia + etiquetas flutuantes.
- Cards em leque no hover e em pilha no mobile.
- Stickers físicos no rodapé.
- Transição por traço que cobre a tela, com o logo ao centro.
- Bolha de cursor contextual e título da aba que muda.

**Adaptar**

| truus | Crema Lab |
|---|---|
| Rabisco caótico | **"Espatulada":** traço largo em S e ondas, o gesto da espátula que espalha o gelato (e a pintura espatulada das paredes) |
| Cores pop sorteadas | Cor do **mundo de destino**, sem repetir a anterior |
| Logo manuscrito trêmulo | **Monograma CL que se desenha** no centro e dá um "pique" elástico |
| Blob "work" à esquerda | Blob **"SABORES"** em forma de bola de gelato; painel "NA VITRINE HOJE" |
| WhatsApp à direita | Igual, porque é o canal real de encomendas e eventos |
| Smiley e estrela | Doodles do **próprio mural** (sol nascente, ramo, xícara) |
| Sans pesada + itálico serifado | **Blair caixa-alta + Blair oblíqua**, como o "E SABOR" da coluna |
| Elipse desenhada perfeita | **Elipse Rough.js** (anotação da chef) |
| Degradê preto no hero | Degradê **Cacau** translúcido |
| Logos de clientes no marquee | **Prêmios, parceiros e imprensa** |
| Mute bubble | Bolha **"som"** em forma de bola de gelato (áudio ambiente: espátula, espresso, conversa) |
| "Hey, over here! 👋" | "Volta, tá derretendo! 🍨" |
| Showreel | **Quatro momentos de marca:** passe a espátula (3D), laboratório, mural digital e fachada |

**Descartar**

- Fundos pretos e escuros dominantes: a marca é clara e quente.
- Tipografia ultrapesada e "gritante": não combina com a elegância da Blair.
- Stickers de cultura de internet (polegar, smiley, cursor): substituídos pelo vocabulário do mural.
- Paleta multicolor saturada.
- Cursor customizado em textos longos e formulários: manter o nativo, por acessibilidade.
- Abertura completa em todo carregamento: na Crema Lab, o **loader completo roda só na 1ª visita da sessão**.

**Mapa de seções truus → Crema Lab**

| # | truus | Crema Lab | Mantém | Muda |
|---|---|---|---|---|
| 0 | Scribble de abertura | Loader + **espatulada** | cobrir/descobrir com traço gigante | forma (ondas), cor do mundo, monograma desenhando |
| 1 | Navbar (work · logo · WhatsApp) | Navbar (sabores · wordmark · WhatsApp) | estrutura e pop-outs | conteúdo e blobs |
| 2 | Vimeo hero | Hero **"Felicidade atemporal"** | card arredondado, título embaixo, elipse, bolha de som | Blair, doodles do mural, degradê cacau, selo |
| 3 | Horizontal words | Manifesto **"Tradição · Inovação · E sabor"** | pin, scrub, letras elásticas, setas | cor terracota, stickers da marca |
| 4 | Motion cards | **A Vitrine** | inércia e etiquetas | sabores, fundo âmbar, blob de espátula |
| 5 | Showreel | **Passe a espátula (3D)** + **Laboratório** + **Mural** + **Fachada** | o "momento de vídeo" | vira quatro momentos de marca |
| 6 | Service cards | **"Do que você precisa hoje?"** | leque e pilha | cores por serviço |
| — | — | **Unidades** (mapa desenhado) | — | seção nova |
| 7 | Double marquee | **Prêmios, parceiros e imprensa** | colunas infinitas | conteúdo e cores |
| 8 | Footer com stickers | **Rodapé cacau** | stickers físicos, créditos pop-out | wordmark desenhando, selo, unidades ao vivo |

### 7.5 Checklist para validar no site real

Para fazer isso numa próxima sessão, liberar os domínios `truus.co` e `instagram.com` no acesso de rede do ambiente.

- [ ] Duração real do loader, e se ele roda em todas as páginas.
- [ ] Comportamento do card de vídeo ao rolar (escala? encolhe? fica?).
- [ ] Distância real do pin e velocidade da frase horizontal.
- [ ] Easing e tempos dos pop-outs da navbar.
- [ ] Mobile: menu, hero, frase horizontal, cards.
- [ ] Transições entre páginas internas (o scribble roda em todos os links?).
- [ ] Páginas internas (cases): estrutura e transições.

---

## 8. Arquitetura de informação

```
/                              Home — "O Caderno"
/sabores                       A Vitrine (cardápio vivo)
/sabores/[slug]                (fase 2) ficha de laboratório de cada sabor
/laboratorio                   história, chef, processo, exposição, sustentabilidade, espaço, equipe, prêmios
/unidades                      mapa desenhado + todas as unidades
/unidades/batel                mini-landing da unidade
/unidades/parkshoppingbarigui  mini-landing da unidade
/unidades/[terceira]           quando confirmada (flag `ativa`)
/eventos-e-encomendas          carrinho para eventos, encomendas sazonais, collabs, FAQ
/404                           "Essa página derreteu"
```

**Navegação**

- **Navbar desktop:** blob **SABORES** (abre painel) · **wordmark** (Home e transição) · blob **WhatsApp** (abre painel) · botão **MENU** à direita do WhatsApp. O menu abre em tela cheia via espatulada, com links grandes em Blair: Sabores, Laboratório, Unidades, Eventos & Encomendas, Instagram.
- **Navbar mobile:** wordmark à esquerda e MENU à direita. Depois do primeiro scroll aparece uma **pílula Âmbar flutuante de WhatsApp** (canto inferior direito, 56px).
- **Rodapé:** unidades com "aberto agora", links, redes e créditos.
- **Atalhos de conversão:** qualquer página leva a "onde e quando" em no máximo um clique.

---

## 9. Home — narrativa seção por seção

**Ritmo de cor e tema da navbar**

| # | Seção | Fundo | Tinta | Navbar |
|---|---|---|---|---|
| 0 | Loader | Fior → espatulada Terracota | Cacau / Fior | — |
| 1 | Hero | vídeo + degradê Cacau | Fior | clara (sobre blobs) |
| 2 | Manifesto horizontal | Fior | Terracota (gigante) | escura |
| 3 | A Vitrine | **Âmbar** | Cacau | escura |
| 4 | Passe a espátula (3D) | Fior → cor do sabor | Cacau | escura |
| 5 | Laboratório (teaser) | **Creme Pistache** | Cacau | escura |
| 6 | Mural digital | Fior | Cacau | escura |
| 7 | Fachada de micélio | **Terracota** | Fior (texto em painel Telha) | clara (sobre blobs) |
| 8 | Do que você precisa hoje? | Fior | cards coloridos | escura |
| 9 | Unidades | Fior | cards na cor de cada unidade | escura |
| 10 | Prêmios & parceiros | **Rosa Granilite** | Cacau | escura |
| 11 | Rodapé | **Cacau** | Fior | clara |

Mecânica do tema: cada `<section data-nav="clara|escura">` cria um ScrollTrigger (`start: "top 40px"`, `end: "bottom 40px"`) que alterna a classe da navbar, com transição de cor de 0,5 s `cubic-bezier(.4,0,.2,1)`.

### 9.0 Loader (1ª visita na sessão)

- **Visual:** tela Fior di Latte; o **monograma CL** (Cacau) se desenha no centro (1,6 s, ver 6.2). Abaixo dele, a **onda** funciona como barra de progresso e se desenha conforme os assets críticos carregam (Blair, poster do hero, primeiro frame do vídeo). Mínimo de 1,2 s e máximo de 3 s.
- **Saída:** a **espatulada Terracota** cobre a tela (0,9 s; `strokeWidth` 8% → 30%). O monograma passa a Fior sobre o terracota e o traço se desfaz (1,1 s), revelando o hero, cuja entrada começa 0,2 s antes do fim.
- **Pular:** qualquer clique ou tecla acelera (`timeScale(3)`).
- **Repetição:** com `sessionStorage`, as visitas seguintes recebem só a transição curta (0,9 s).
- **Acessibilidade:** `aria-live="polite"` com "Preparando a vitrine…"; o foco vai para o H1 ao terminar.
- **Reduced motion:** monograma estático + fade de 300 ms.
- **Regra de performance:** o hero renderiza **por baixo** do loader, que é só um overlay. O LCP não espera a animação.

### 9.1 Navbar

| Zona | Elemento | Animação | Conteúdo do painel |
|---|---|---|---|
| Esquerda | blob **SABORES** (forma de bola de gelato, Âmbar, texto Cacau) | hover: blob gira `+=360` (0,7 s `power3.inOut`); painel Fior escala 0 → 1 **a partir do centro do ícone** (0,8 s `expo.out`); itens `y 10 → 0`, stagger 0,06, delay 0,18; saída 0,3 s `expo.in` | eyebrow "NA VITRINE HOJE" · 3 sabores (foto em arco de 72px, pílula da unidade, nome em Blair, nota de 1 linha) · botão Cacau **VER VITRINE COMPLETA** |
| Centro | **wordmark** | hover: tremido ±3° `steps(1)` 0,15 s; clique: espatulada → Home | — |
| Direita | blob **WhatsApp** (ícone em traço) | mesmo crescimento do painel; ícone muda para Telha | **QR code** (Cacau sobre Fior) · "CHAME A GENTE NO WHATSAPP" · "Encomendas, eventos e dúvidas. Respondemos no horário das lojas." · link "Abrir no computador" com **sublinhado duplo desenhado** |
| Direita | **MENU** | clique: espatulada cobre; links em Blair H2 entram com SplitText (chars `yPercent 100 → 0`, stagger 0,015); hover em cada link desenha um sublinhado Rough | Sabores · Laboratório · Unidades · Eventos & Encomendas · @cremalabgelato |

- **Overlay:** Cacau a 35% (0,35 s de entrada, 0,3 s de saída).
- **Teclado:** os painéis abrem com foco/Enter, fecham com Esc e prendem o foco; `aria-expanded` e `aria-controls`.
- **Barra de progresso:** uma mini **régua de listras** (40px) ao lado do MENU, cujas listras escurecem conforme o progresso da página.

### 9.2 Hero — "Felicidade atemporal"

- **Layout:** card de vídeo com **12px de margem e raio de 24px**, altura `calc(100svh - 24px)`. Mobile: margem de 8px, raio de 16px, altura 88svh. Degradê na base: transparente → `rgba(43,33,28,.55)` (Cacau, não preto).
- **Assinaturas como no letreiro da fachada:** canto inferior esquerdo "GELATO + CAFÉ + EXPERIÊNCIAS"; canto inferior direito, o **Selo Atemporal** girando.
- **H1** (Blair, Fior, centralizado embaixo): linha 1 **FELICIDADE**, linha 2 ***ATEMPORAL*** (oblíqua -12°). Marcação: `<h1><span class="sr-only">Crema Lab, gelateria artesanal em Curitiba: </span>Felicidade atemporal</h1>`.
- **Subtítulo** (Jost 300): "Gelato italiano de autor, feito do zero todos os dias no nosso laboratório."
- **Doodles do mural** (traço Fior):
  - **sol nascente** acima e à direita de "FELICIDADE": o arco desenha em 0,8 s e os raios dão pop 1-2-3;
  - **ramo** junto ao "L" de ATEMPORAL;
  - **elipse Rough.js** em volta de "ATEMPORAL" (Âmbar, sobre o vídeo escurecido), desenhando em 1,4 s com 0,3 s de delay após o título.
- **Entrada do título:** SplitText por caractere; as letras sobem de `yPercent 110` com rotação aleatória de ±8°, stagger 0,025, 0,9 s, ease `creme`. Depois entram os doodles.
- **Vídeo:** loop de 10–14 s (ver 17.2), mudo, `playsinline`, poster AVIF.
  - Clicar no vídeo liga ou desliga o som.
  - A **bolha "som"** (bola de gelato Fior, ícone Cacau) segue o cursor (`quickTo` 0,5 s `power3`). Entra com `elastic.out(1, 0.4)` em 1,7 s e sai em 0,3 s `sine.inOut` com rotação de -30°. Some sobre o título e os controles.
  - Controles no canto inferior esquerdo: play/pause e tela cheia (36px, borda Fior a 30%, `backdrop-filter: blur(8px)`).
- **Dica de rolagem:** "role para provar" em Blair 12px, com uma **onda-seta** que se desenha em loop a cada 2,4 s.
- **Ao rolar (adaptação, validar com a truus):** o card encolhe levemente (scale 1 → 0,92; raio 24 → 40px) e o título sobe com parallax de 1,2×, como se "a vitrine se afastasse".
- **Mobile:** sem bolha (botão de som fixo no canto), vídeo 720p, só a elipse como doodle.
- **Reduced motion:** poster estático com botão play, título sem split e doodles já desenhados.

### 9.3 Manifesto horizontal — "TRADIÇÃO · INOVAÇÃO · E SABOR"

- **Fundo** Fior; **letras** Terracota no tamanho gigante (Blair, `clamp(6rem, 22vw, 26rem)`).
- **Frase:** `TRADIÇÃO · INOVAÇÃO · E SABOR ·`, com "E SABOR" oblíquo. Entre as palavras entram os **stickers** xícara, ramo e casquinha, e **setas Rough.js** ligam uma palavra à seguinte.
- **Mecânica (da truus):**
  - a seção entra pela direita enquanto sobe (`x: 100vw → 50vw`, durante 1 viewport de scroll), pina no topo e atravessa (`scrub: 1`; distância = largura do texto - 50vw, ≈ 2.500–3.500px no desktop);
  - **cada letra**: `from { yPercent: random(-250, 250), rotation: random(-30, 30) }`, ease `elastic.out(1.2, 1)`, `scrub: 0.5`, `containerAnimation`, `start: "left 90%"`, `end: "left 50%"`. As letras "caem como bolas de gelato na casquinha";
  - **stickers**: `scale 0 → 1` + rotação aleatória, mesmo gatilho;
  - **setas**: DrawSVG 0 → 100% ao passar pelo centro.
- **Texto de apoio** (Jost, canto inferior esquerdo, 3 linhas): "A Crema Lab nasceu em 2024, no Batel, do encontro entre a técnica italiana e a curiosidade de quem vive testando. Aqui tudo começa do zero — até a pasta de pistache."
- **Mobile:** frase menor (`clamp(5rem, 30vw, 9rem)`), pin de 1.200px e letras com bounce por tempo, sem scrub.
- **Reduced motion:** a frase quebra em 3 linhas estáticas e centralizadas, como na coluna da loja (escalonadas na diagonal).

### 9.4 A Vitrine — cards arremessáveis (mundo Âmbar)

- **Título:** **A VITRINE MUDA COM AS ESTAÇÕES**. Uma **onda Rough** sublinha o título (1,5 s `power2.out`) e o sticker de sol dá pop (`elastic.out(1, 0.4)`, 1,7 s), com gatilho `top 70%`.
- **Área:** blob Creme Pistache em forma de "espatulada" ao fundo (SVG) com **4 cards** inclinados (-8°, 5°, -3°, 9°). Cada card tem foto do sabor em máscara de arco, nome em Blair, nota em Jost e pílula da unidade.
- **Sabores de exemplo** (usar a vitrine atual): Nocciolotto · Pistache (Batel: sorbet com farofinha) · Mango Lab com pesto doce de manjericão · Cuca de Doce de Leite.
- **Etiquetas flutuantes** (pílulas Blair com contorno Rough e fundos Fior, Rosa ou Creme Pistache): "feito do zero, todo dia" · "pasta de pistache da casa" · "técnica italiana, sotaque curitibano" · "manga com pesto? confia."
- **Interação:** arrastar e **arremessar** cards e etiquetas com Draggable + InertiaPlugin (velocidade × 20 nos cards, × 25 nas etiquetas). Tudo volta à posição e à rotação de origem com inércia. No hover, o card endireita (0°) e sobe 8px (0,4 s `creme`), e o cursor mostra "provar".
- **Clique no card:** abre a "ficha de laboratório" do sabor (modal na fase 1, página na fase 2).
- **CTA:** **VER TODOS OS SABORES**, botão Cacau com contorno Rough que "ferve" no hover.
- **Mobile:** deck horizontal com swipe (Draggable `type: "x"` + inertia + snap); as etiquetas viram uma faixa de pílulas embaixo.
- **Reduced motion:** grid estático 2×2.

### 9.5 Passe a espátula — o momento 3D da Home

- **Copy:** eyebrow "GELATO NÃO É BOLA" · H2 **AGORA É COM VOCÊ: PASSE A ESPÁTULA.** · texto: "Na Itália, o gelato é trabalhado na espátula: cremoso, denso, vivo. Arraste para sentir a textura — e troque o sabor quando quiser."
- **Cena:** uma cuba de gelato a 3/4. Arrastar o cursor ou o dedo **esculpe sulcos** que relaxam devagar. Pílulas de sabor (Pistache · Manga · Fior di Latte · Cioccolato) trocam a cor e a textura (lerp de 0,8 s). Especificação técnica em 12.1.
- **Cursor:** vira uma **espátula** em traço, com a bolha "espatular".
- **Mobile:** para não prender o scroll, a cena começa **inativa** com o botão **"TOQUE PARA ESPATULAR"**. Ativada, captura o toque; um botão "pronto" devolve o scroll.
- **Fallback (GPU fraca, reduced motion, `saveData`):** vídeo de 4 s de uma espátula na cuba, ou foto.

### 9.6 Laboratório (teaser) — "Aprendeu na Itália. Reescreveu em Curitiba." (mundo Creme Pistache)

- **À esquerda:** retrato da chef em **traço de linha única** (vetorizado a partir de foto), desenhado pelo scroll (pin de 120%, scrub). Quando completo, a foto real aparece por trás em máscara de arco (crossfade de 0,6 s): "do traço à foto".
- **À direita:** **linha do tempo pontilhada** (o pontilhado do mural) com 4 marcos que dão pop: "SAN MARINO — curso intensivo" · "BRESCIA — formação em tempo integral" · "2024 — CREMA LAB NO BATEL" · "2025 — PARKSHOPPINGBARIGUI".
- **Anotações da chef** (Rough.js + letra da chef) em volta do retrato: setas + "pasta de avelã feita aqui", "testa, prova, anota".
- **Texto:** "Harlen Tessari Brandão estudou com mestres gelatieri em San Marino e em Brescia e trouxe para Curitiba o método purista: receitas autorais, ingredientes escolhidos a dedo e tudo feito do zero, à vista de quem passa pela parede de vidro do laboratório."
- **CTA:** **CONHEÇA O LABORATÓRIO**.
- **Mobile:** o retrato desenha por tempo ao entrar (2 s), sem pin.

### 9.7 Mural digital

Especificado em 6.6. Fundo Fior e traço Cacau; é o momento-assinatura da marca.

### 9.8 Fachada de micélio (mundo Terracota) — versão 2.5D na Home

- **Visual:** a seção inteira em Terracota com o **padrão de losangos** (casquinha) em traço Telha. Uma **luz rasante segue o cursor**: uma camada "iluminada" do padrão (traço Fior a 35%) é revelada por `mask-image: radial-gradient(circle at var(--x) var(--y), #000 0, transparent 240px)`, com `quickTo` de 0,6 s.
- **Ao rolar:** o padrão "cresce como micélio". As linhas se desenham do centro para fora (DrawSVG, stagger por distância ao centro, scrub) e ganham filamentos finos (paths Rough curtos, Fior a 50%) que depois somem.
- **Copy:** eyebrow "ARQUITETURA QUE VOLTA PRA TERRA" · H2 **UMA FACHADA QUE NASCEU DE COGUMELOS.** (Fior, grande) · painel Telha com texto: "No Batel, a casquinha é a própria parede: painéis de micélio — a raiz dos cogumelos — cultivados a partir de resíduos agrícolas. Isolam calor e som, absorvem CO₂ na produção e, um dia, voltam para a natureza."
- **Pílulas de fato:** "resíduo agrícola → painel" · "isolamento térmico e acústico" · "absorve CO₂ na produção" · "biodegrada em até 90 dias".
- **Crédito:** "Fachada: Furf Design Studio + Mush · Interiores: Uza Design e Arquitetura".
- **CTA:** "VER A HISTÓRIA COMPLETA" → `/laboratorio#fachada` (onde fica a versão Three.js, ver 12.2).
- **Mobile:** a luz passeia sozinha em loop lento (8 s).
- **Reduced motion:** foto da fachada + padrão estático.

### 9.9 "Do que você precisa hoje?" — cards em leque

| Card | Cor | Texto | Destino |
|---|---|---|---|
| **UM GELATO AGORA** | Terracota | "Veja a unidade mais perto e se ela está aberta agora." | `/unidades` |
| **CAFÉ & AFFOGATO** | Cacau | "Espresso sobre baunilha bourbon. Precisa dizer mais?" | `/sabores#cafes` |
| **ENCOMENDAS** | Rosa | "Sobremesas e bowls da estação para levar à mesa." | `/eventos-e-encomendas#encomendas` |
| **CARRINHO PARA EVENTOS** | Âmbar | "Gelato — e drinks com gelato — na sua festa." | `/eventos-e-encomendas#carrinho` |
| **EXPERIÊNCIAS** | Creme Pistache | "Exposições, festivais e lançamentos no laboratório." | `/laboratorio#experiencias` |

- **Desktop:** os cards ficam sobrepostos em leque fechado. No hover, os vizinhos se afastam (`x` ±, `elastic.out(1, 0.5)`, 1 s) e o ativo escala 1,08 (0,9 s); o sticker do card dá um tremido.
- **Mobile:** pilha com pin; cada trecho de scroll revela o próximo card (`power3.out`).
- **Reduced motion:** lista vertical simples.

### 9.10 Unidades — "ESCOLHA SUA VITRINE"

- **Mapa desenhado de Curitiba** em Rough.js: ruas principais simplificadas, o **Parque Barigui** como mancha hachurada Creme Pistache e o Batel marcado. Ao entrar, as ruas se desenham (stagger) e os **pins** (monograma em sticker) caem com elastic.
- **Cards** na cor de cada unidade, com nome em Blair, endereço, horário e **status ao vivo** ("ABERTO AGORA · FECHA ÀS 22H" / "FECHADO · ABRE AMANHÃ ÀS 11H"), calculado no cliente em `America/Sao_Paulo` a partir dos dados do CMS. Botões **COMO CHEGAR** (Google Maps) e **WHATSAPP**.
- **Hover no card:** o pin correspondente pula e uma **rota-rabisco** se desenha até ele.
- **3ª unidade:** card pronto; só renderiza com `ativa: true`.
- **Mobile:** mapa compacto acima e lista de cards abaixo.

### 9.11 Prêmios, parceiros e imprensa — marquee duplo (mundo Rosa)

- **Esquerda:** **FEITO COM QUEM A GENTE ADMIRA**. Sublinhado `scaleX 0 → 1` (1 s), doodle de ramo com pop (`back.out(1.7)`) e onda desenhando (1,5 s), com gatilho `top 70%`.
- **Direita:** 2 colunas de blocos coloridos (Fior, Âmbar, Creme Pistache, Terracota), uma subindo e outra descendo (22 s, linear, infinito, pausa no hover).
  - **Conteúdo:** PRÊMIO BOM GOURMET 2024 · HAUS AMBIENTAÇÃO · NOVIDADES 2024 · FINALISTA 2025 · designboom · Lucca Cafés Especiais · Casa Limoncello · Mush · Furf · Uza · Vanessa Taques Casa · Île de France · Revival.
  - Logos só com autorização; sem ela, nomes em Blair.
  - Sem vizinhos repetidos (cor e item), inclusive na emenda do loop.
- **Mobile:** uma faixa horizontal.

### 9.12 Rodapé (mundo Cacau)

- **Wordmark gigante** (Fior, 100% da largura) se desenha ao entrar (1,8 s).
- **Colunas:**
  - **UNIDADES:** endereços, horários e "aberto agora";
  - **FALE COM A GENTE:** WhatsApp e e-mail comercial (coletar);
  - **SIGA:** @cremalabgelato;
  - **NAVEGUE:** links das páginas.
- **Stickers** (copo, casquinha, sol, ramo, monograma, onda) espalhados. Pulam ao entrar (`scale 0 → 1`, `back.out`, stagger). Movimentos rápidos do cursor por perto os **empurram** com força proporcional à velocidade, e eles voltam com `elastic`. No mobile, um tap faz o sticker pular.
- **CRÉDITOS** abre como pop-out (altura 0 → auto, textos com stagger) com: fotografia, arquitetura (Uza), fachada (Furf + Mush) e site.
- **Selo Atemporal** girando.
- **Linha final:** "© 2026 Crema Lab · Felicidade atemporal desde 2024 · CNPJ (coletar)".

---

## 10. Páginas internas

Todas abrem com a espatulada na cor do seu mundo, um H1 em Blair que entra com SplitText e um divisor-régua.

### 10.1 `/sabores` — A Vitrine (mundo Âmbar)

1. **Hero Âmbar:** **A VITRINE** gigante + "Sabores que mudam com as estações. A disponibilidade varia por unidade." Filtros: unidade (Batel · Park) e categoria (Gelatos · Sorbets & veganos · Cafés · Doces · Salgados · Sazonais).
2. **Grade de "fichas de laboratório":** cada sabor é um card com **canto dobrado** (line art), foto em arco, nome em Blair, descrição curta, tags (vegano, sem lactose, contém castanhas, alcoólico, sem açúcar refinado) e "onde tem".
   - Hover: o canto dobra mais (MorphSVG) e aparecem **anotações Rough** ("+ farofinha de pistache").
   - Filtro com **GSAP Flip** (reordena em 0,6 s `creme`).
3. **Faixa Sazonal** em Terracota com o lançamento da estação (ex.: bowls de Natal, Festival San Giovanni).
4. **Cafés:** xícara de line art com vapor + lista com preços (Affogato, lattes, espresso).
5. **Aviso de alérgenos:** "Ingredientes podem variar. Tem alguma restrição? Fale com a equipe antes de pedir."
6. **Dados:** content collection `sabores` (schema em 15.3).

### 10.2 `/laboratorio` — O Laboratório (mundo Creme Pistache)

1. **Hero:** **DO ZERO. ATÉ A PASTA DE PISTACHE.** + vídeo do laboratório pela parede de vidro, em máscara de arco.
2. **A chef:** bio completa, linha do tempo (San Marino → Brescia → Batel → Barigui), citações e "o sabor que mudou tudo".
3. **O processo — "Anatomia de um gelato":** 6 passos como fórmulas de caderno (Rough.js: setas, chaves, hachuras), com pin horizontal curto: **Curadoria → Pastas da casa → Balanceamento → Maturação → Batimento → Vitrine & espátula**. Cada passo tem ícone de line art e uma anotação da chef.
   - Bloco didático **"Gelato × sorvete"** com gráficos Rough (menos ar, servido menos gelado, sabor mais intenso). **Números a validar com a chef.**
4. **A Arte do Gelato:** conteúdo da exposição (fotos, mapas de ingredientes, textos) numa **galeria arrastável** (Draggable + inertia).
5. **A fachada** (`#fachada`): cena **Three.js** completa (12.2) + fatos + créditos.
6. **Sustentabilidade:** micélio, enxoval compostável e bowls reutilizáveis.
7. **O espaço:** arquitetura (Uza), piso de cacos, arcos, pintura espatulada. Galeria com máscaras em arco e créditos.
8. **Quem faz:** retratos em traço da equipe, que se desenham no hover; a foto aparece no clique ou tap. Nome, função e sabor favorito.
9. **Prêmios:** Bom Gourmet 2024 (HAUS Ambientação, Novidades) e finalista em 2025.

### 10.3 `/unidades` e `/unidades/[slug]` (mundo Terracota)

- **Índice:** a seção 9.10 em tela cheia.
- **Cada unidade é uma mini-landing**, com:
  - hero com foto (Batel: fachada; Park: loja no shopping) em máscara de arco e status "aberto agora";
  - horários completos (incluindo feriados, via CMS), como chegar (estacionamento, piso, referência), galeria e **sabores exclusivos da unidade**;
  - botões COMO CHEGAR e WHATSAPP;
  - schema `IceCreamShop` (16.5).
- **Cores:** Batel Terracota · Park Âmbar · 3ª Creme Pistache.

### 10.4 `/eventos-e-encomendas` (mundo Rosa Granilite)

1. **Hero:** o **carrinho de gelato** em line art atravessa a tela ao entrar (MotionPathPlugin, 2 s, as rodas girando) e para no centro; o título **LEVE A CREMA LAB PRA SUA FESTA** se desenha.
2. **Carrinho para eventos:** o que inclui (gelatos + drinks com gelato), tipos de evento e um **formulário curto** (nome, data, cidade, número de convidados, tipo de evento). O envio gera uma **mensagem pronta no WhatsApp** (`wa.me` com texto codificado), sem backend.
3. **Encomendas sazonais:** módulo ligado e desligado pelo CMS (ex.: bowls de Natal com a Vanessa Taques Casa), com **contador de prazo** ("pedidos até 22/12").
4. **Collabs:** Île de France e Revival, em cards com foto + anotação Rough.
5. **FAQ:** acordeão com sublinhado Rough; abre com `height: auto` (Flip ou `gsap.to` com `height: "auto"`).

### 10.5 `/404`

**OPS. ESSA PÁGINA DERRETEU.** O monograma escorre (MorphSVG para a variante derretida, 1,2 s `power2.in`) e uma gota cai em loop. "Mas a vitrine continua cheia." Botão **VOLTAR PRA VITRINE**.

---

## 11. Microinterações globais

| Elemento | Comportamento | Especificação |
|---|---|---|
| **Links de texto** | sublinhado em **onda** desenha da esquerda no hover e desdesenha para a direita no leave | DrawSVG 0,45 s `espatula` / 0,3 s |
| **Botões primários** | contorno Rough que **"ferve"** (re-render com seed+1 a cada 110 ms ≈ 9 fps) + **magnético** (até 8px na direção do cursor) | `quickTo` 0,4 s `power3`; retorno `elastic.out(1, .4)` |
| **Botões secundários** | pílula Blair; o fundo enche com hachura Rough `zigzag` da esquerda | 0,35 s |
| **Cursor** (só `pointer: fine`) | **colherzinha** SVG (padrão) · **bola de gelato** com texto contextual em links (provar, abrir, ir, ver mapa, espatular) · barra fina Cacau em texto | bolha: `quickTo` 0,5 s; entra `elastic.out(1, .4)` 1,7 s; sai 0,3 s `sine.inOut` |
| **Imagens** | revelam com o **contorno do arco desenhando** e a foto subindo 4% | 0,8 s + 1,2 s `creme`, gatilho `top 80%` |
| **Títulos H2** | SplitText em linhas/palavras sobem com máscara | `yPercent 100 → 0`, stagger 0,06, 0,9 s `creme`, gatilho `top 75%` |
| **Preços e números** | Blair; dígitos embaralham e assentam | ScrambleText 0,6 s (só dígitos) |
| **Divisores** | régua + pontilhado desenham ao entrar | 1,2 s |
| **Barra de progresso** | mini régua na navbar | ScrollTrigger `progress` |
| **Aba inativa** | título "Volta, tá derretendo! 🍨" + favicon derretido | `visibilitychange` |
| **Seleção de texto** | `::selection` Âmbar com texto Cacau | — |
| **Som** (opcional, desligado por padrão) | toggle no rodapé; "clique" de espátula nos hovers principais | ≤ 15 KB por som, volume 0,3 |
| **Easter egg** (fase 2) | digitar "gelato" faz chover bolas de gelato com física (Physics2DPlugin) que somem no rodapé | máx. 24 bolas, 3 s |

---

## 12. Three.js — onde o 3D ganha o lugar

**Regra:** 3D só onde ele conta a história **tátil** da marca, o gelato e o micélio. Nada de partículas genéricas flutuando. No máximo **uma cena WebGL ativa por página**.

### 12.1 Cena A — "Passe a espátula" (Home, seção 9.5)

| Aspecto | Especificação |
|---|---|
| **O quê** | cuba retangular de gelato vista a 3/4 (câmera perspectiva de 35°), superfície cremosa com marcas de espátula; o visitante arrasta e **esculpe sulcos** que relaxam devagar |
| **Simulação** | heightmap em **render target ping-pong** (512×512, `HalfFloatType`). **Passo "pincel":** a cada movimento, raycast do ponteiro no plano → UV → quad desenha um sulco ao longo do segmento anterior → atual, com perfil de espátula (centro afunda, bordas sobem). **Passo "relaxar":** a cada frame, `h = mix(h, blur(h), 0.02)` |
| **Geometria** | `PlaneGeometry` 256×256 segmentos, deslocada no vertex shader (altura × 0,04 unidade); normais no fragment shader por diferenças centrais do heightmap |
| **Material** | `ShaderMaterial` próprio: iluminação *wrap* (0,5) para um falso subsurface, brilho especular suave (Blinn-Phong de baixo gloss), micro-ruído fbm nas normais (textura gelada), cor por sabor |
| **Sabores** | Pistache `#A3A86B` · Manga `#E4B358` · Fior di Latte `#F1EBDD` · Cioccolato `#5A3A2C`; troca com lerp de 0,8 s. Inclusões (farofa, nibs) em `InstancedMesh` com ≤ 400 instâncias, assentadas pela altura |
| **Cuba** | moldura metálica simples (`MeshStandardMaterial`, metalness 1, roughness 0,35) + envmap PMREM a partir de HDRI pequeno (256px) |
| **Câmera** | parallax suave com o mouse (±2°), `quickTo` 0,8 s |
| **Orçamento** | < 70k triângulos · 1 luz direcional + envmap · DPR máx. 1,75 (desktop) / 1,25 (mobile) · 60 fps no desktop médio, ≥ 40 fps no celular médio |
| **Ciclo de vida** | `import()` dinâmico quando a seção está a 1 viewport de distância; `setAnimationLoop(null)` fora da tela (IntersectionObserver) e com a aba oculta; `dispose()` de geometrias, materiais e render targets no `astro:before-swap` |
| **Fallback** | `hardwareConcurrency <= 4`, `deviceMemory <= 4`, `saveData`, WebGL indisponível ou reduced motion → vídeo de 4 s em loop ou foto |
| **Acessibilidade** | canvas com `aria-hidden="true"`; todo o texto da seção é HTML; botão "TOQUE PARA ESPATULAR" com foco visível |

### 12.2 Cena B — Fachada de micélio (`/laboratorio#fachada`)

| Aspecto | Especificação |
|---|---|
| **O quê** | parede de painéis em losango (casquinha) em relevo; **luz pontual rasante segue o cursor**; o scroll faz os painéis **crescerem como micélio** |
| **Geometria** | `InstancedMesh` (ex.: 24 × 10 painéis, **1 draw call**); normal map do losango (procedural ou fotografado da fachada real) em KTX2 1K |
| **Shader de crescimento** | ruído 3D + limiar animado pelo progresso do scroll (0 → 1); a borda do limiar tem emissão creme fina (filamentos); ao completar, painéis terracota `#B26A5B` com variação de ±4% de luminosidade por instância |
| **Interação** | luz segue o cursor (`quickTo` 0,6 s); clique em um painel o faz "respirar" (scale z 1 → 1,15 → 1, `elastic`) |
| **Orçamento** | DPR máx. 1,5; texturas ≤ 1,5 MB no total; 60 fps no desktop médio |
| **Fallback** | a versão 2.5D da Home (9.8) |

### 12.3 Cena C (opcional, fase 2) — o copo 3D

O copo compostável com o logotipo gira com o scroll no rodapé, e o gelato do topo troca de sabor no clique. Só entra se sobrar orçamento de prazo e de performance.

### 12.4 Regras técnicas gerais

- `three@0.186` com `WebGLRenderer` (`antialias: true` só quando DPR < 2; `powerPreference: "high-performance"`). O renderizador WebGPU fica como evolução futura.
- Shaders em arquivos `.glsl` importados como string (Vite `?raw`).
- Nenhuma cena bloqueia o LCP. Todas carregam depois do `load` e sob demanda.

---

## 13. Rough.js — o rabisco da chef

**Usar em:** elipses em palavras-chave · sublinhados especiais · setas entre palavras e anotações · contornos "fervendo" de botões · hachuras de destaque atrás de palavras (marca-texto) · o mapa de Curitiba · gráficos didáticos (gelato × sorvete) · caixas de nota nas fichas de sabor.

**Nunca usar em:** logo, monograma, line art do mural ou ícones de navegação. Esses são o "traço da marca".

**Presets** (cores via `currentColor`, controladas por CSS):

```js
// motion/rough-presets.js
export const presets = {
  anotacao:   { roughness: 1.6, bowing: 1.4, strokeWidth: 2,   stroke: 'currentColor' },
  sublinhado: { roughness: 1.2, bowing: 2,   strokeWidth: 2.5, stroke: 'currentColor' },
  contorno:   { roughness: 1.1, bowing: 0.8, strokeWidth: 1.75, stroke: 'currentColor' },
  hachura:    { roughness: 1.1, stroke: 'none', fill: 'currentColor', fillStyle: 'zigzag',
                hachureGap: 7, fillWeight: 1.6, hachureAngle: -41 },
  mapa:       { roughness: 0.9, bowing: 0.6, strokeWidth: 1.5, stroke: 'currentColor' },
};
```

**Como animar:** gerar com `rough.svg(svg)`, anexar ao DOM e animar cada `<path>` do grupo com DrawSVG (`gsap.from(paths, { drawSVG: 0, stagger: .15 })`). O Rough desenha dois traços por forma (multi-stroke): o 2º entra com 0,15 s de atraso, como uma "passada dupla" de caneta. Para um traço único e limpo, usar `disableMultiStroke: true`.

**"Fervura" (line boil):** enquanto houver hover, re-renderizar a forma com `seed + 1` a cada 110 ms (≈ 9 fps), no máximo 4 paths por elemento. Desligada em reduced motion.

**Determinismo:** `seed = hash(id do elemento)`, para que o rabisco seja sempre o mesmo entre visitas.

**Sem CLS:** formas estáticas (mapa, sublinhados de títulos) são **pré-geradas no build** com `rough.generator()` + `generator.toPaths()` e saem como `<path>` no HTML. No cliente, só se anima.

---

## 14. GSAP — arquitetura de animação

**Plugins:** ScrollTrigger · DrawSVGPlugin · MorphSVGPlugin · SplitText · InertiaPlugin · Draggable · Flip · CustomEase · CustomWiggle · MotionPathPlugin · ScrambleTextPlugin · Physics2DPlugin · Observer. Todos são gratuitos desde a aquisição pela Webflow: licença "Standard no charge", **verificada no pacote `gsap@3.15.0`**, que já inclui os bônus.

**Vocabulário de eases**

```js
CustomEase.create('creme',    '0.22,1,0.36,1');   // revelações de conteúdo (0,8–1,2 s)
CustomEase.create('espatula', '0.65,0,0.35,1');   // traços que se desenham
CustomWiggle.create('tremido', { wiggles: 6, type: 'easeOut' }); // hovers stop-motion
// bola:     'elastic.out(1, 0.45)'  → stickers, letras, pins
// derreter: 'power2.in'             → saídas (0,3–0,5 s, y +8px, scaleY .96)
```

**Escala de durações**

| Tipo | Duração |
|---|---|
| micro (estados, cor) | 0,15–0,2 s |
| hover | 0,3–0,45 s |
| revelação de conteúdo | 0,8–1,2 s |
| desenho de traço | `clamp(0.5, comprimento / 1100px, 2.2)` s |
| loader completo | ≤ 3 s |
| transição de página | 1,6–2 s (cobrir 0,8 + revelar 1,0) |

**Convenções**

- Uma `gsap.matchMedia()` por componente, com as condições `(prefers-reduced-motion: no-preference)`, `(pointer: fine)` e `(min-width: 768px)`. Fazer `revert()` no `astro:before-swap`.
- Rodar `ScrollTrigger.refresh()` depois de `document.fonts.ready` e de imagens críticas.
- API declarativa nos componentes: `data-anim="titulo|imagem-arco|divisor|sticker"`, lida por um único inicializador.
- **SplitText** com `mask: "lines"` e `aria: "auto"`, para o texto continuar acessível. Usar `autoSplit: true` para refazer o split no resize.
- **Lenis** com os mesmos parâmetros da referência: `{ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true }`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`. Desligado em reduced motion; no toque, o scroll é nativo.

**Transição de página** (Astro `ClientRouter` + espatulada):

```ts
// motion/transicao.ts — ilustrativo
document.addEventListener('astro:before-preparation', (e) => {
  const carregar = e.loader;
  e.loader = async () => {
    await cobrir(corDoMundo(e.to));   // DrawSVG 0→100% + strokeWidth 8%→30% (~0,8 s)
    await carregar();
  };
});
document.addEventListener('astro:after-swap', () => lenis.scrollTo(0, { immediate: true }));
document.addEventListener('astro:page-load', () => {
  revelar();                          // drawSVG "100% 100%" + strokeWidth 30%→8% (~1 s) + monograma curto
  iniciarAnimacoesDaPagina();
});
```

O overlay SVG da espatulada, a navbar e o cursor ficam com `transition:persist`. O `<html>` recebe `transition:animate="none"`, porque a animação é nossa e não a padrão.

---

## 15. Stack e estrutura do projeto

### 15.1 Tecnologias (versões conferidas no npm em 03/10/2026)

| Camada | Escolha | Observação |
|---|---|---|
| Framework | **Astro 7.3.x** (Node ≥ 22.12) | SSG; `ClientRouter` para as transições; ilhas de JS |
| Linguagem | TypeScript estrito | |
| Animação | **gsap 3.15** + **lenis 1.3** + **roughjs 4.6** | |
| 3D | **three 0.186** | sempre carregado sob demanda |
| CSS | vanilla com custom properties + `@layer` (reset, tokens, base, components, utilities) | sem framework CSS; total controle de motion |
| Imagens | `astro:assets` (sharp) → AVIF/WebP, `srcset`/`sizes`, placeholder na cor dominante | |
| Vídeo | MP4 H.264 + WebM/AV1; 1080p ≤ 4 MB, 720p ≤ 2 MB; `preload="metadata"`; poster AVIF | CDN da Vercel ou Bunny Stream |
| Fontes | WOFF2 próprios, subset Latin/Latin-1, `font-display: swap`, preload só da Blair | |
| Conteúdo | Astro Content Collections (fase 1) → CMS headless na fase 2 (Sanity, Storyblok ou Decap) para a equipe editar sabores e horários | |
| Hospedagem | **Vercel** (preview por PR, Web Analytics, Speed Insights) | |
| Formulários | sem backend: mensagem pronta no WhatsApp. Opcional: função serverless + Resend para e-mail | |

### 15.2 Estrutura de pastas

```
src/
  pages/            index.astro · sabores.astro · laboratorio.astro · eventos-e-encomendas.astro · 404.astro
                    unidades/index.astro · unidades/[slug].astro
  layouts/          Base.astro  (head, ClientRouter, navbar, cursor, overlay da espatulada)
  components/
    nav/            Navbar.astro · PainelSabores.astro · PainelWhatsApp.astro · MenuTelaCheia.astro
    hero/           Hero.astro · BolhaSom.ts · Selo.astro
    manifesto/      ManifestoHorizontal.astro
    vitrine/        Vitrine.astro · CardSabor.astro · Etiqueta.astro
    espatula/       PasseAEspatula.astro (ilha 3D)
    laboratorio/    TeaserChef.astro · LinhaDoTempo.astro
    mural/          MuralDigital.astro
    fachada/        Fachada25D.astro · Fachada3D.astro (ilha)
    leque/          CardsLeque.astro
    unidades/       MapaDesenhado.astro · CardUnidade.astro · statusAberto.ts
    marquee/        MarqueeDuplo.astro
    rodape/         Rodape.astro · Stickers.ts
    ui/             Botao.astro · LinkOnda.astro · Divisor.astro · ImagemArco.astro
  brand/            monograma.svg · wordmark.svg · mural/*.svg · stickers/*.svg · espatulada.svg
  motion/           eases.ts · lenis.ts · transicao.ts · desenhar.ts · rough-presets.js · split.ts
                    inercia.ts · cursor.ts · reduzido.ts · iniciar.ts
  three/            espatula/ (cena.ts, shaders/*.glsl) · micelio/ (cena.ts, shaders/*.glsl)
  content/          sabores/*.md · unidades/*.json · parceiros/*.json · equipe/*.md · sazonais/*.md
  content.config.ts
  styles/           tokens.css · base.css · tipografia.css · utilitarios.css
public/             fonts/ · video/ · og/ · favicon.svg · favicon-derretido.svg
```

### 15.3 Modelos de conteúdo (ilustrativo)

```ts
// src/content.config.ts
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const unidades = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/unidades' }),
  schema: ({ image }) => z.object({
    nome: z.string(),                       // "Batel"
    ativa: z.boolean(),
    endereco: z.string(), bairro: z.string(), referencia: z.string().optional(),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    horarios: z.array(z.object({ dias: z.array(z.number().min(0).max(6)), abre: z.string(), fecha: z.string() })),
    excecoes: z.array(z.object({ data: z.string(), fechado: z.boolean(), abre: z.string().optional(), fecha: z.string().optional() })).default([]),
    whatsapp: z.string(), mapsUrl: z.string().url(),
    mundo: z.enum(['terracota', 'ambar', 'pistache-creme']),
    fotos: z.array(image()),
  }),
});

const sabores = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sabores' }),
  schema: ({ image }) => z.object({
    nome: z.string(),
    categoria: z.enum(['gelato', 'sorbet', 'cafe', 'doce', 'salgado', 'sazonal']),
    descricao: z.string().max(140),
    tags: z.array(z.enum(['vegano', 'sem-lactose', 'contem-castanhas', 'alcoolico', 'sem-acucar-refinado'])).default([]),
    unidades: z.array(reference('unidades')),
    cor: z.string(),                        // cor do sabor: cards e 3D
    preco: z.string().optional(),
    disponivel: z.boolean(),
    temporada: z.object({ inicio: z.coerce.date(), fim: z.coerce.date() }).optional(),
    foto: image(),
  }),
});

export const collections = { unidades, sabores };
```

---

## 16. Performance, acessibilidade, SEO e LGPD

### 16.1 Orçamentos

| Métrica | Meta |
|---|---|
| LCP (4G, celular médio) | ≤ 2,5 s |
| CLS | ≤ 0,05 |
| INP | ≤ 200 ms |
| JS inicial (sem 3D) | ≈ 90–110 KB gzip (GSAP + plugins usados + Lenis + Rough); medir no build |
| Three.js + cena | ≈ 150 KB+ gzip, **sempre sob demanda** |
| Poster do hero | ≤ 180 KB AVIF |
| Fotos de card | ≤ 80 KB cada |
| Lighthouse | Perf ≥ 85 (mobile) / ≥ 95 (desktop) · A11y ≥ 95 · SEO 100 |

### 16.2 Plano de reduced motion

| Recurso | Com movimento | `prefers-reduced-motion: reduce` |
|---|---|---|
| Loader | monograma desenhando + espatulada | monograma estático, fade de 300 ms |
| Transições | espatulada | crossfade de 200 ms |
| Lenis | ativo | desligado (scroll nativo) |
| Hero | vídeo autoplay + split | poster + botão play; texto estático |
| Manifesto horizontal | pin + letras elásticas | 3 linhas estáticas |
| Desenhos (DrawSVG) | traçam | já aparecem no estado final |
| Fervura Rough | ativa | desligada |
| Cards com inércia | arremessáveis | grid estático |
| Mural digital | pin + scrub | composição final + foto |
| 3D | cenas | imagem ou vídeo curto com controle |
| Marquee | rolando | parado (lista) |
| Selo | gira | parado |
| Cursor customizado | ativo | nativo |

### 16.3 Comportamento no mobile

| Recurso | Desktop | Mobile |
|---|---|---|
| Loader | completo na 1ª visita | igual, com traço proporcional |
| Navbar | 3 zonas + pop-outs | wordmark + MENU; pílula de WhatsApp flutuante |
| Hero | card 12px/24px, bolha de som | card 8px/16px, botão de som fixo, vídeo 720p |
| Manifesto | pin longo + scrub | pin curto, letras por tempo |
| Vitrine | arremesso livre | deck com swipe e snap |
| Passe a espátula | ativa no hover | "TOQUE PARA ESPATULAR" (não prende o scroll) |
| Laboratório | retrato por scrub | retrato por tempo |
| Mural | pin de 250% | 3 quadros, pin de 120% |
| Fachada | luz segue o cursor | luz automática em loop |
| Leque | abre no hover | pilha por scroll |
| Unidades | mapa grande + rotas | mapa compacto + lista |
| Marquee | 2 colunas verticais | 1 faixa horizontal |
| Rodapé | stickers empurráveis | tap faz o sticker pular |
| Cursor | customizado | nativo |

### 16.4 Acessibilidade

- `lang="pt-BR"`, landmarks e skip link "Pular para o conteúdo".
- Texto real sempre no DOM: SplitText com `aria: "auto"`, e SVGs decorativos com `aria-hidden="true"`. O logo SVG leva `<title>Crema Lab</title>`.
- Pop-outs e menu acessíveis por teclado (Enter/Espaço, Esc, foco preso, `aria-expanded`).
- Contraste conforme a 5.1; foco visível Âmbar + Cacau em qualquer fundo.
- Vídeo sem som automático; legendas se houver fala.
- Formulários com label visível, erros descritivos e `autocomplete`.
- Áreas de toque ≥ 44px.
- Testes: axe, Lighthouse, VoiceOver (iOS/macOS) e NVDA nos fluxos "achar unidade aberta" e "pedir orçamento de evento".

### 16.5 SEO local

- **Title da Home:** "Crema Lab | Gelato artesanal italiano em Curitiba — Batel e ParkShoppingBarigui".
- **Description:** "Gelateria artesanal da chef gelatiere Harlen Brandão: gelato italiano de autor, cafés especiais e experiências. Batel e ParkShoppingBarigui, em Curitiba."
- **Schema.org (JSON-LD):** `Organization` + **`IceCreamShop`** por unidade (`address`, `geo`, `openingHoursSpecification`, `telephone`, `image`, `priceRange`, `servesCuisine: "Gelato"`, `sameAs` com o Instagram) + `Person` (chef) + `Menu`/`MenuItem` (fase 2).
- **Uma página por unidade**, com URL limpa e mapa, ligada ao Google Business Profile de cada loja.
- **OG images** por página: cor do mundo + monograma + título em Blair, geradas no build.
- `sitemap.xml`, `robots.txt` e `canonical`.
- Palavras-chave naturais no texto: gelato artesanal Curitiba, gelateria Batel, gelato italiano, affogato, sorbet vegano, carrinho de gelato para eventos.

### 16.6 LGPD

- Analytics sem cookies (Vercel Web Analytics ou Plausible), o que dispensa banner pesado. Se entrarem GA4 ou Meta Pixel, exigir banner de consentimento.
- O formulário de eventos envia direto para o WhatsApp, sem armazenar dados no site, e informa a finalidade.
- Página de política de privacidade simples.

---

## 17. Conteúdo — inventário, shot list e checklist do cliente

### 17.1 Inventário por página

| Página | Precisa de |
|---|---|
| Home | vídeo do hero, 4 fotos de sabor, retrato da chef (foto + versão em traço), foto do mural, fotos da fachada, dados das unidades, prêmios |
| Sabores | lista atual completa (nome, descrição, tags, unidades, preço), 3 fotos por sabor, cafés e preços |
| Laboratório | bio e citações da chef, vídeo do laboratório, conteúdo da exposição "A Arte do Gelato", fotos do espaço, créditos (Uza, Furf, Mush), equipe |
| Unidades | horários oficiais, exceções/feriados, fotos de cada loja, como chegar, WhatsApp |
| Eventos & Encomendas | como funciona o carrinho, fotos em eventos, regras de encomenda, prazos, collabs |

### 17.2 Shot list — vídeo do hero (10–14 s, loop)

1. **Macro:** espátula moldando gelato de pistache na cuba (filmar a 60 fps e usar em câmera lenta).
2. **Affogato:** espresso caindo sobre a bola de baunilha bourbon (close lateral, contraluz).
3. **Fachada ao entardecer:** gente passando, toldos e letreiro (como a foto 2).
4. **Laboratório pela parede de vidro:** a chef finalizando uma cuba (rack focus do vidro às mãos).
5. **Mãos com o copo compostável** na Piazza, risadas fora de foco (como a foto 3).
6. **Detalhes:** granilite, mural, pintura espatulada e micélio em macro com luz rasante.
7. **Carrinho de gelato** num evento, na golden hour.

Captação em 4K, entrega em 24 fps, cortes a cada 1,5–2 s no ritmo de uma "batida de espátula", grade quente (ver 5.6), sem texto queimado. O mesmo material gera os fallbacks (vídeos de 4 s) e as fotos de apoio.

### 17.3 Checklist do cliente

- [ ] **Qual é a 3ª unidade?** Endereço, data de abertura, fotos e horários.
- [ ] Vetores originais da marca (logo, monograma, mural) e manual de identidade. Quem desenhou a identidade?
- [ ] **Licença webfont da Blair ITC.**
- [ ] Horários oficiais das unidades (as fontes divergem para o Batel).
- [ ] WhatsApp oficial (um resultado de busca cita (41) 99652-8031 — **não publicar sem confirmação**), e-mail comercial e CNPJ.
- [ ] Cardápio atual com preços, alérgenos e opções veganas e sem lactose. A loja é de fato "dedicada sem glúten"?
- [ ] Fotos e vídeos existentes, ou aprovação de diária de produção (17.2).
- [ ] Equipe: nomes, funções, fotos e autorização de uso de imagem.
- [ ] 2 ou 3 citações da chef + amostra de letra manuscrita (fonte "letra da chef").
- [ ] Autorização para usar logos de parceiros e selos de prêmios.
- [ ] Acesso ao Instagram (ou os 20–30 posts favoritos) e ao Google Business Profile.
- [ ] Conteúdo da exposição "A Arte do Gelato" (mapas de ingredientes, textos).
- [ ] Delivery (iFood, Rappi ou próprio)? Se existir, incluir links.
- [ ] Domínio, DNS e acesso à Vercel.

---

## 18. Roadmap de produção

| Fase | Entregas | Duração estimada |
|---|---|---|
| **0. Validação** | aprovação desta preparação, checklist do cliente, licença da fonte | 1 semana |
| **1. Design** | moodboard → style tiles dos mundos de cor → wireframes → UI da Home, Sabores e Unidade → protótipos de motion (código) do loader, hero e manifesto | 2–3 semanas |
| **2. Vetores e marca animada** (paralelo à fase 1) | vetorização, esqueletos de máscara, biblioteca de line art, stickers, storyboards animados | 1–1,5 semana |
| **3. Build base** | Astro, tokens, conteúdo, páginas estáticas responsivas e acessíveis | 2 semanas |
| **4. Motion e interações** | Lenis, navbar, hero, manifesto, vitrine, leque, unidades, marquee, rodapé, transições, Rough | 2–3 semanas |
| **5. 3D** | cenas A e B + fallbacks | 1,5–2 semanas |
| **6. QA e performance** | dispositivos reais (iPhone, Android médio, desktop), Lighthouse, a11y, SEO, ajuste fino de easing | 1 semana |
| **7. Lançamento** | domínio, analytics, Search Console, Google Business Profile, inscrição em Awwwards, CSSDA e FWA | 2–3 dias |

**Total estimado: 9–12 semanas.**

---

## 19. Critérios de aceite

- [ ] Identidade única e reconhecível: traço da marca + rabisco da chef + matéria 3D, coerentes em todos os mundos de cor.
- [ ] "Onde e quando" (unidade + status aberto/fechado) a no máximo **1 clique** de qualquer página; WhatsApp sempre acessível.
- [ ] Os **6 momentos-assinatura** funcionando: loader e espatulada · manifesto com letras-gelato · vitrine arremessável · passe a espátula · mural digital · fachada que cresce.
- [ ] Toda a copy é original em pt-BR, revisada, sem alegações não confirmadas.
- [ ] O mobile tem experiência própria, não uma "versão reduzida".
- [ ] Orçamentos da 16.1 cumpridos; zero erros no console; 60 fps nas animações principais (Chrome Performance, desktop médio).
- [ ] Reduced motion completo (16.2) e teclado funcionando em todos os componentes interativos.
- [ ] Conteúdo editável (sabores, horários, sazonais) sem mexer em código de animação.

---

## 20. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Sem vetores originais da marca | atraso e fidelidade | vetorização manual na fase 2, aprovada pelo cliente letra a letra |
| Blair ITC sem licença web | bloqueia o lançamento | orçar na fase 0; fallback temporário em Copperplate |
| Sem vídeo do hero | hero fraco | diária de 4 h de captação; fallback com sequência de fotos + doodles desenhando |
| 3D pesado em celulares | performance e bateria | detecção de capacidade + fallback; DPR limitado; pausa fora da tela |
| Cardápio sazonal desatualizado | frustração na loja | collections/CMS com flag `disponivel` e um responsável no cliente |
| Excesso de animação | cansaço e acessibilidade | regra de 1 "momento uau" por dobra; reduced motion completo |
| Dados divergentes (horários) | cliente vai à loja fechada | fonte única no CMS, espelhada no Google Business Profile |
| 3ª unidade indefinida | conteúdo incompleto | flag `ativa`; card pronto |
| Diferenças entre a recriação e a truus real | expectativa errada | checklist 7.5 antes do build |

---

## 21. Pendências — perguntas ao cliente

1. **Qual é a terceira unidade?** A pesquisa pública encontrou só Batel e ParkShoppingBarigui.
2. O objetivo nº 1 é mesmo levar gente às lojas, ou também vender encomendas online?
3. Existem vetores e manual da marca? Quem criou a identidade visual?
4. A Crema Lab já tem licença web da Blair ITC?
5. Quais são os horários oficiais e os canais (WhatsApp, e-mail)?
6. Há delivery? Por qual plataforma?
7. Podemos usar logos de parceiros e selos de prêmios?
8. Há orçamento para produção de foto e vídeo?
9. A operação é 100% sem glúten (como diz um guia de terceiros)?
10. A chef topa digitalizar a própria letra para as anotações do site?

---

## Apêndice A — Fontes

> Consultadas via mecanismo de busca em 03/10/2026. As páginas não puderam ser abertas diretamente no ambiente de preparação (bloqueio de rede); os dados vêm dos trechos indexados. Revalidar antes de publicar.

**Crema Lab**
- HojePR — [Crema Lab: a gelateria artesanal que celebra o estilo de vida italiano](https://hojepr.com/crema-lab-a-gelateria-artesanal-curitiba/)
- HojePR — [Harlen Brandão: a chef gelatiere por trás da Crema Lab](https://hojepr.com/coluna-ruy-harlen-brandao-a-chef-gelatiere-por-tras-da-crema-lab/)
- Revista Haus — [Projeto de arquitetura destaca gelato em Curitiba](https://revistahaus.com.br/haus/arquitetura/projeto-de-arquitetura-destaca-gelato-em-curitiba/)
- designboom — [furf's mycelium facade for crema lab café in brazil resembles ice cream cone](https://www.designboom.com/architecture/furf-mycelium-facade-crema-lab-cafe-brazil-ice-cream-cone-09-19-2024/)
- Furf Design Studio — [Crema Lab](https://furf.it/projeto/crema-lab/)
- Empreendedor — [Com material biotecnológico, startup cria fachada sustentável para gelateria](https://empreendedor.com.br/sustentabilidade/com-material-biotecnologico-startup-cria-fachada-sustentavel-para-gelateria/)
- Bom Gourmet — [Crema Lab (guia)](https://bomgourmet.com/premiobomgourmet/restaurantes/Doces/crema-lab/) · [Vencedora HAUS Ambientação 2024](https://bomgourmet.com/bomgourmet/premio-bom-gourmet/haus-ambientacao-vencedora-premio-bom-gourmet-2024/)
- Where Curitiba — [Crema Lab: entre as melhores sorveterias do Paraná](https://www.wherecuritiba.com.br/crema-lab-entre-as-melhores-sorveterias-do-parana/) · [Crema Lab: muito além do gelato](https://www.wherecuritiba.com.br/crema-lab-muito-alem-do-gelato/)
- CBN Curitiba — [Crema Lab celebra nova unidade no ParkShoppingBarigui](https://cbncuritiba.com.br/materias/crema-lab-celebra-nova-unidade-no-parkshoppingbarigui-e-lanca-novo-sabor/)
- Curitiba Honesta — [Nova unidade no Park Shopping Barigui](https://curitibahonesta.com.br/crema-lab-celebra-nova-unidade-no-park-shopping-bariqui/) · [Sobremesa de Natal em bowl decorativo](https://curitibahonesta.com.br/crema-lab-apresenta-sobremesa-de-natal-com-gelato-artesanal-servido-em-bowl-decorativo-exclusivo/)
- Topview — [Exposição que transforma gelato em arte](https://topview.com.br/estilo/gastronomia/crema-lab-inaugura-exposicao-que-transforma-gelato-em-arte/) · [Conheça a Crema Lab](https://topview.com.br/estilo/gastronomia/conheca-a-crema-lab-sorveteria-artesanal-de-curitiba/) · [Sabores de Carnaval](https://topview.com.br/estilo/gastronomia/sorveteria-artesanal-de-curitiba-lanca-novos-sabores-para-celebrar-o-carnaval/)
- Bem Paraná — [Exposição que transforma sorvete em arte](https://www.bemparana.com.br/publicacao/blogs/comerecurtir/crema-lab-inaugura-exposicao-que-transforma-sorvete-em-arte/) · [A arte das colaborações](https://www.bemparana.com.br/publicacao/geral/crema-lab-e-a-arte-das-colaboracoes-de-gelados-alem-da-vitrine/)
- Sabores de Curitiba — [São João italiano e novidades](https://saboresdecuritiba.com.br/crema-lab-apresenta-sao-joao-italiano-e-novidades-no-cardapio/) · [Sabores de inverno](https://saboresdecuritiba.com.br/crema-lab-apresenta-novos-sabores-inverno/)
- Comer & Curtir — [Café em forma de sorbet](https://comerecurtir.com.br/crema-lab-lanca-cafe-em-forma-de-sorbet/)
- RIC — [Sobremesa autoral de Natal](https://ric.com.br/estilo-de-vida/gastronomia/crema-lab-aposta-em-sobremesa-autoral-de-natal-que-une-gelato-artesanal-e-design-exclusivo)
- Curitidoce — [Crema Lab e a arte das colaborações](https://curitidoce.com.br/2025/03/12/gelateria-curitiba-collab/)
- ParkShoppingBarigui — [Crema Lab](https://www.parkshoppingbarigui.com.br/gastronomia/crema-lab/)
- Find Me Gluten Free — [Crema Lab](https://www.findmeglutenfree.com/biz/crema-lab/4690559138922496) (alegação de terceiros, confirmar)
- Instagram — [@cremalabgelato](https://www.instagram.com/cremalabgelato/)

**truus.co**
- [truus.co](https://truus.co/) · [Awwwards — Truus (SOTD)](https://www.awwwards.com/sites/truus) · [UI Coach — Truus, SOTD 09/09/2025](https://www.uicoach.io/inspirations/award-winning/truus) · [Made in Webflow — Truus](https://webflow.com/made-in-webflow/website/truus)
- Recriação open-source estudada: [Thakuma07/Truus.co-Awwward-Website](https://github.com/Thakuma07/Truus.co-Awwward-Website)

---

## Apêndice B — Snippets ilustrativos

> Ilustrações para orientar o build, não código final.

**Tokens e mundos de cor**

```css
:root {
  --c-terracota: #B26A5B; --c-telha: #8E4F42; --c-ambar: #F1A500;
  --c-pistache-creme: #DAD3A7; --c-fior: #F5EFE6; --c-cacau: #2B211C;
  --c-rosa: #E4BFAE; --c-pistache: #A3A86B;

  --bg: var(--c-fior); --ink: var(--c-cacau); --acento: var(--c-terracota);

  --f-display: "Blair ITC", "Copperplate", "Copperplate Gothic Light", "Optima", sans-serif;
  --f-texto: "Jost", "Futura", "Century Gothic", system-ui, sans-serif;
  --f-anotacao: "Letra da Chef", "Caveat", cursive;

  --ease-creme: cubic-bezier(.22, 1, .36, 1);
  --raio: 24px; --margem: 24px;
}
[data-mundo="sabores"]     { --bg: var(--c-ambar);           --ink: var(--c-cacau); --acento: var(--c-terracota); }
[data-mundo="laboratorio"] { --bg: var(--c-pistache-creme);  --ink: var(--c-cacau); --acento: var(--c-telha); }
[data-mundo="unidades"]    { --bg: var(--c-terracota);       --ink: var(--c-fior);  --acento: var(--c-ambar); }
[data-mundo="eventos"]     { --bg: var(--c-rosa);            --ink: var(--c-cacau); --acento: var(--c-terracota); }

.obliqua { display: inline-block; transform: skewX(-12deg); font-synthesis: none; } /* "E SABOR" */
```

**Logo desenhado via máscara (mantém a forma original intacta)**

```html
<svg viewBox="0 0 1504 2826" role="img" aria-labelledby="t-cl">
  <title id="t-cl">Crema Lab</title>
  <defs>
    <mask id="m-c" maskUnits="userSpaceOnUse">
      <path class="esqueleto" d="M1180 800 A560 560 0 1 0 1180 1520"
            stroke="#fff" stroke-width="140" fill="none" stroke-linecap="round"/>
    </mask>
  </defs>
  <path d="…forma preenchida do C…" fill="currentColor" mask="url(#m-c)"/>
</svg>
```

```js
gsap.from('.esqueleto', { drawSVG: 0, duration: 0.7, ease: 'espatula', stagger: 0.15 });
```

**Espatulada (cobrir e revelar)**

```js
const traco = document.querySelector('#espatulada path');
export const cobrir = (cor) => gsap.timeline()
  .set('#espatulada', { color: cor, autoAlpha: 1 })
  .fromTo(traco, { drawSVG: '0% 0%', strokeWidth: '8%' },
                 { drawSVG: '0% 100%', strokeWidth: '30%', duration: 0.8, ease: 'espatula' });
export const revelar = () => gsap.timeline()
  .to(traco, { drawSVG: '100% 100%', strokeWidth: '8%', duration: 1.0, ease: 'power2.inOut' })
  .set('#espatulada', { autoAlpha: 0 });
```

**Botão com contorno Rough "fervendo"**

```js
import rough from 'roughjs';
import { presets } from './rough-presets.js';

export function contornoFervendo(svg, w, h, seedBase) {
  const rc = rough.svg(svg);
  let seed = seedBase, timer = 0;
  const desenhar = () => svg.replaceChildren(rc.rectangle(2, 2, w - 4, h - 4, { ...presets.contorno, seed: ++seed }));
  desenhar();
  return {
    ligar:    () => { if (!timer) timer = setInterval(desenhar, 110); },
    desligar: () => { clearInterval(timer); timer = 0; },
  };
}
```

**Status "aberto agora"**

```ts
export function statusAgora(horarios: { dias: number[]; abre: string; fecha: string }[], agora = new Date()) {
  const sp = new Date(agora.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const dia = sp.getDay(), min = sp.getHours() * 60 + sp.getMinutes();
  const toMin = (h: string) => { const [hh, mm] = h.split(':').map(Number); return hh * 60 + mm; };
  const hoje = horarios.find((h) => h.dias.includes(dia));
  const aberto = !!hoje && min >= toMin(hoje.abre) && min < toMin(hoje.fecha);
  return { aberto, fechaAs: aberto ? hoje!.fecha : null };
}
```

---

*Fim da preparação. Próximo passo: validar as pendências da seção 21 e só então iniciar o design (fase 1). O build começa apenas com aprovação explícita.*
