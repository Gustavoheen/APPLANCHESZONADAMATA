// ================================================================
//  Cardápio completo — Scooby-Doo Lanches
//  Atualizado via Excel cardapio_scooby_doo_1.xlsx
// ================================================================

export const ADICIONAIS = [
  { id: 'add-frango',      nome: 'Frango',        preco: 13.00, emoji: '🍗' },
  { id: 'add-lombo',       nome: 'Lombo',         preco: 13.00, emoji: '🥩' },
  { id: 'add-calabresa',   nome: 'Calabresa',     preco:  6.00, emoji: '🌭' },
  { id: 'add-catupiry',    nome: 'Catupiry',      preco:  5.00, emoji: '🫕' },
  { id: 'add-cheddar',     nome: 'Cheddar',       preco:  5.00, emoji: '🧀' },
  { id: 'add-bacon',       nome: 'Bacon',         preco:  6.00, emoji: '🥓' },
  { id: 'add-bife-hamb',   nome: 'Bife Hamb',     preco:  4.00, emoji: '🍔' },
  { id: 'add-presunto',    nome: 'Presunto',      preco:  4.00, emoji: '🍖' },
  { id: 'add-queijo',      nome: 'Queijo',        preco:  6.00, emoji: '🧀' },
  { id: 'add-ovo',         nome: 'Ovo',           preco:  4.00, emoji: '🍳' },
]

export const categorias = [

  // ── HAMBÚRGUERES SIMPLES ──────────────────────────────────────
  {
    id: 'hamburgueres',
    nome: '🍔 Hambúrgueres',
    emoji: '🍔',
    itens: [
      {
        id: 1, nome: 'Hamburger',
        descricao: 'Pão, bife, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 14.00 },
          { label: 'Filé de Frango',     preco: 20.00 },
          { label: 'Lombo de Porco',     preco: 20.00 },
        ]
      },
      {
        id: 2, nome: 'Cheese Burger',
        descricao: 'Pão, bife, mussarela, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 19.00 },
          { label: 'Filé de Frango',     preco: 25.00 },
          { label: 'Lombo de Porco',     preco: 25.00 },
        ]
      },
      {
        id: 3, nome: 'Bacon Burger',
        descricao: 'Pão, bife, bacon, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 19.00 },
          { label: 'Filé de Frango',     preco: 25.00 },
          { label: 'Lombo de Porco',     preco: 25.00 },
        ]
      },
      {
        id: 4, nome: 'Egg Burger',
        descricao: 'Pão, bife, ovo, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 19.00 },
          { label: 'Filé de Frango',     preco: 25.00 },
          { label: 'Lombo de Porco',     preco: 25.00 },
        ]
      },
      {
        id: 5, nome: 'Calabresa Burger',
        descricao: 'Pão, bife, calabresa, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 19.00 },
          { label: 'Filé de Frango',     preco: 25.00 },
          { label: 'Lombo de Porco',     preco: 25.00 },
        ]
      },
      {
        id: 6, nome: 'Cheese Egg Burger',
        descricao: 'Pão, bife, mussarela, ovo, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 22.00 },
          { label: 'Filé de Frango',     preco: 29.00 },
          { label: 'Lombo de Porco',     preco: 29.00 },
        ]
      },
      {
        id: 7, nome: 'Cheese Bacon Burger',
        descricao: 'Pão, bife, mussarela, bacon, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 22.00 },
          { label: 'Filé de Frango',     preco: 29.00 },
          { label: 'Lombo de Porco',     preco: 29.00 },
        ]
      },
      {
        id: 8, nome: 'Egg Bacon Burger',
        descricao: 'Pão, bife, ovo, bacon, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 22.00 },
          { label: 'Filé de Frango',     preco: 29.00 },
          { label: 'Lombo de Porco',     preco: 29.00 },
        ]
      },
      {
        id: 9, nome: 'Cheese Calabresa Burger',
        descricao: 'Pão, bife, mussarela, calabresa, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 22.00 },
          { label: 'Filé de Frango',     preco: 29.00 },
          { label: 'Lombo de Porco',     preco: 29.00 },
        ]
      },
      {
        id: 10, nome: 'Egg Calabresa Burger',
        descricao: 'Pão, bife, ovo, calabresa, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 22.00 },
          { label: 'Filé de Frango',     preco: 29.00 },
          { label: 'Lombo de Porco',     preco: 29.00 },
        ]
      },
      {
        id: 11, nome: 'Cheese Egg Calabresa Burger',
        descricao: 'Pão, bife, ovo, mussarela, calabresa, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 25.00 },
          { label: 'Filé de Frango',     preco: 33.00 },
          { label: 'Lombo de Porco',     preco: 33.00 },
        ]
      },
      {
        id: 12, nome: 'Cheese Egg Bacon Burger',
        descricao: 'Pão, bife, mussarela, ovo, bacon, salada e batata palha',
        proteinas: [
          { label: 'Bife de Hamburguer', preco: 25.00 },
          { label: 'Filé de Frango',     preco: 33.00 },
          { label: 'Lombo de Porco',     preco: 33.00 },
        ]
      },
    ]
  },

  // ── HAMBÚRGUERES DUPLOS ──────────────────────────────────────
  {
    id: 'duplos',
    nome: '🍔 Hambúrgueres Duplos',
    emoji: '🍔',
    itens: [
      { id: 101, nome: 'Hamburger Duplo',                    descricao: 'Pão, 2 bifes, salada e batata palha',                                   preco: 18.00 },
      { id: 102, nome: 'Cheese Burger Duplo',                descricao: 'Pão, 2 bifes, mussarela, salada e batata palha',                        preco: 23.00 },
      { id: 103, nome: 'Bacon Burger Duplo',                 descricao: 'Pão, 2 bifes, bacon, salada e batata palha',                            preco: 23.00 },
      { id: 104, nome: 'Egg Burger Duplo',                   descricao: 'Pão, 2 bifes, ovo, salada e batata palha',                              preco: 23.00 },
      { id: 105, nome: 'Calabresa Burger Duplo',             descricao: 'Pão, 2 bifes, calabresa, salada e batata palha',                        preco: 23.00 },
      { id: 106, nome: 'Cheese Egg Burger Duplo',            descricao: 'Pão, 2 bifes, mussarela, ovo, salada e batata palha',                   preco: 26.00 },
      { id: 107, nome: 'Cheese Bacon Burger Duplo',          descricao: 'Pão, 2 bifes, mussarela, bacon, salada e batata palha',                 preco: 26.00 },
      { id: 108, nome: 'Egg Bacon Burger Duplo',             descricao: 'Pão, 2 bifes, ovo, bacon, salada e batata palha',                       preco: 26.00 },
      { id: 109, nome: 'Cheese Calabresa Burger Duplo',      descricao: 'Pão, 2 bifes, mussarela, calabresa, salada e batata palha',             preco: 26.00 },
      { id: 110, nome: 'Egg Calabresa Burger Duplo',         descricao: 'Pão, 2 bifes, ovo, calabresa, salada e batata palha',                   preco: 26.00 },
      { id: 111, nome: 'Cheese Egg Calabresa Burger Duplo',  descricao: 'Pão, 2 bifes, ovo, mussarela, calabresa, salada e batata palha',        preco: 30.00 },
      { id: 112, nome: 'Cheese Egg Bacon Burger Duplo',      descricao: 'Pão, 2 bifes, mussarela, ovo, bacon, salada e batata palha',            preco: 30.00 },
    ]
  },

  // ── ARTESANAIS ───────────────────────────────────────────────
  {
    id: 'artesanais',
    nome: '🥩 Artesanais',
    emoji: '🥩',
    itens: [
      { id: 201, nome: 'Simples Artesanal',      descricao: 'Pão, bife 160g, alface, tomate e cebola',                            preco: 23.00 },
      { id: 202, nome: 'Bacon Burger Artesanal', descricao: 'Pão, bife 160g, bacon, alface, tomate e cebola',                     preco: 26.00 },
      { id: 203, nome: 'X Burger Artesanal',     descricao: 'Pão, bife 160g, queijo, alface, tomate e cebola',                    preco: 26.00 },
      { id: 204, nome: 'Egg Burger Artesanal',   descricao: 'Pão, bife 160g, ovo, alface, tomate e cebola',                       preco: 26.00 },
      { id: 205, nome: 'X Bacon Artesanal',      descricao: 'Pão, bife 160g, bacon, queijo, alface, tomate e cebola',             preco: 30.00 },
      { id: 206, nome: 'X Egg Bacon Artesanal',  descricao: 'Pão, bife 160g, queijo, ovo, bacon, alface, tomate e cebola',        preco: 34.00 },
      { id: 207, nome: 'Artesanal X Egg Duplo',  descricao: 'Pão, 2 bifes 160g, 2 ovos, queijo, alface, tomate e cebola',         preco: 41.00 },
    ]
  },

  // ── LANCHES DA CASA ──────────────────────────────────────────
  {
    id: 'casaespecial',
    nome: '⭐ Lanches da Casa',
    emoji: '⭐',
    itens: [
      { id: 401, nome: 'Laçador',    descricao: 'Pão, bife, salada, frango desfiado, ovo, mussarela, presunto e batata palha',                        preco: 32.00 },
      { id: 402, nome: 'Especial',   descricao: 'Pão, bife, salada, milho, frango desfiado, bacon, mussarela, presunto e batata palha',               preco: 34.00 },
      { id: 403, nome: 'Cheese Tudo',descricao: 'Pão, 2 bifes, salada, milho, frango desfiado, ovo, bacon, mussarela, presunto e batata palha',       preco: 38.00 },
    ]
  },

  // ── PÃO COM LINGUIÇA ─────────────────────────────────────────
  {
    id: 'linguica',
    nome: '🌭 Pão com Linguiça',
    emoji: '🌭',
    itens: [
      { id: 301, nome: 'Pão com Linguiça Simples',     descricao: 'Pão, linguiça, mussarela e salada',                              preco: 19.00 },
      { id: 302, nome: 'Pão com Linguiça Tradicional', descricao: 'Pão, linguiça, mussarela, bacon e salada',                       preco: 24.00 },
      { id: 303, nome: 'Pão com Linguiça da Casa',     descricao: 'Pão, linguiça, mussarela, bacon, ovo, catupiry e salada',        preco: 29.00 },
    ]
  },

  // ── MACARRÃO NA CHAPA ────────────────────────────────────────
  {
    id: 'macarrao',
    nome: '🍝 Macarrão na Chapa',
    emoji: '🍝',
    itens: [
      {
        id: 501, nome: 'Macarrão Alho, Óleo e Bacon',
        descricao: 'Macarrão, alho, óleo, bacon, azeite, mussarela, milho e cheiro verde',
        tamanhos: [{ label: 'Meio', preco: 23.00 }, { label: 'Inteiro', preco: 33.00 }]
      },
      {
        id: 502, nome: 'Macarrão à Bolonhesa',
        descricao: 'Macarrão, molho de carne moída, mussarela, milho e cheiro verde',
        tamanhos: [{ label: 'Meio', preco: 23.00 }, { label: 'Inteiro', preco: 33.00 }]
      },
      {
        id: 503, nome: 'Macarrão à Bolonhesa Big',
        descricao: 'Macarrão, molho de carne moída, bacon, calabresa, catupiry, mussarela, milho e cheiro verde',
        tamanhos: [{ label: 'Meio', preco: 28.00 }, { label: 'Inteiro', preco: 39.00 }]
      },
      {
        id: 504, nome: 'Macarrão de Frango',
        descricao: 'Macarrão, molho de frango, mussarela, milho e cheiro verde',
        tamanhos: [{ label: 'Meio', preco: 22.00 }, { label: 'Inteiro', preco: 32.00 }]
      },
      {
        id: 505, nome: 'Macarrão de Frango Big',
        descricao: 'Macarrão, molho de frango, bacon, calabresa, catupiry, mussarela, milho e cheiro verde',
        tamanhos: [{ label: 'Meio', preco: 28.00 }, { label: 'Inteiro', preco: 39.00 }]
      },
    ]
  },

  // ── PORÇÕES ──────────────────────────────────────────────────
  {
    id: 'porcoes',
    nome: '🍟 Porções',
    emoji: '🍟',
    itens: [
      { id: 601, nome: 'Batata (200g) Queijo e Bacon',      descricao: 'Porção de batata frita 200g com queijo e bacon',                         preco: 22.00 },
      { id: 602, nome: 'Batata (400g) Queijo e Bacon',      descricao: 'Porção de batata frita 400g com queijo e bacon',                         preco: 34.00 },
      { id: 603, nome: 'Porção de Contra Filé Inteira',     descricao: '500g de batata frita, 400g de contra filé, queijo e bacon',              preco: 90.00 },
      { id: 604, nome: 'Meia Porção de Contra Filé',        descricao: '300g de batata frita, 200g de contra filé, queijo e bacon',              preco: 70.00 },
      { id: 605, nome: 'Porção de Pernil Inteira',          descricao: '500g de batata frita, 400g de pernil, queijo e bacon',                   preco: 80.00 },
      { id: 606, nome: 'Meia Porção de Pernil',             descricao: '300g de batata frita, 200g de pernil, queijo e bacon',                   preco: 60.00 },
    ]
  },

  // ── BEBIDAS ──────────────────────────────────────────────────
  {
    id: 'bebidas',
    nome: '🥤 Bebidas',
    emoji: '🥤',
    itens: [
      { id: 701, nome: 'Coca-Cola 2L',         descricao: 'Refrigerante Coca-Cola 2 litros',         preco: 16.00 },
      { id: 702, nome: 'Fanta Laranja 2L',     descricao: 'Refrigerante Fanta Laranja 2 litros',     preco: 16.00 },
      { id: 703, nome: 'Guaraná 1L',           descricao: 'Refrigerante Guaraná 1 litro',            preco: 12.00 },
      { id: 704, nome: 'Coca-Cola 1L',         descricao: 'Refrigerante Coca-Cola 1 litro',          preco: 12.00 },
      { id: 705, nome: 'Coca-Cola 600ml',      descricao: 'Refrigerante Coca-Cola 600ml',            preco:  9.00 },
      { id: 706, nome: 'Coca-Cola Lata',       descricao: 'Refrigerante Coca-Cola lata 350ml',       preco:  6.50 },
      { id: 707, nome: 'Fanta Laranja Lata',   descricao: 'Refrigerante Fanta Laranja lata 350ml',   preco:  6.50 },
      { id: 708, nome: 'Monster Energético',   descricao: 'Energético Monster 473ml',                preco: 12.00 },
      { id: 709, nome: 'Brahma Latão',         descricao: 'Cerveja Brahma latão 473ml',              preco:  8.00 },
      { id: 710, nome: 'Skol Latão',           descricao: 'Cerveja Skol latão 473ml',                preco:  8.00 },
      { id: 711, nome: 'Suco Tial Uva 1L',     descricao: 'Suco Tial sabor Uva 1 litro',            preco: 13.00 },
      { id: 712, nome: 'Suco Tial Uva Lata',   descricao: 'Suco Tial sabor Uva lata',               preco:  6.00 },
      { id: 713, nome: 'Del Valle Uva 1L',     descricao: 'Suco Del Valle sabor Uva 1 litro',        preco: 13.00 },
      { id: 714, nome: 'Del Valle Laranja 1L', descricao: 'Suco Del Valle sabor Laranja 1 litro',    preco: 13.00 },
      { id: 715, nome: 'Del Valle Uva Lata',   descricao: 'Suco Del Valle sabor Uva lata',           preco:  6.00 },
      { id: 716, nome: 'Água s/ Gás',          descricao: 'Água mineral sem gás',                    preco:  3.50 },
      { id: 717, nome: 'Água c/ Gás',          descricao: 'Água mineral com gás',                    preco:  4.00 },
    ]
  },
]
