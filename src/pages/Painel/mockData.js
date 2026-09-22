/**
 * Dados e imagens MOCK temporários (Unsplash) — só para UI.
 * Remover quando houver API / uploads reais. Não usar em produção como asset de marca.
 */
export const mockCatalogos = [
  {
    id: 'cat-1',
    nome: 'Buffet Sabor & Festa',
    descricao: 'Pacotes para casamentos e aniversários na região.',
    imagem: '/mock/catalogo-buffet.jpg',
  },
  {
    id: 'cat-2',
    nome: 'Mercadinho do Bairro',
    descricao: 'Catálogo de produtos da semana para WhatsApp.',
    imagem: '/mock/catalogo-loja.jpg',
  },
  {
    id: 'cat-3',
    nome: 'Lava Rápido Express',
    descricao: 'Serviços e preços para compartilhar com clientes.',
    imagem: '/mock/catalogo-lava-rapido.jpg',
  },
]

export const mockProdutos = [
  {
    id: 'prod-1',
    nome: 'Kit limpeza casa',
    descricao: 'Combo prateleira — detergente, esponja e panos.',
    imagem: '/mock/produto-prateleira.jpg',
    preco: 'R$ 49,90',
  },
  {
    id: 'prod-2',
    nome: 'Lip balm hidratante',
    descricao: 'Embalagem unitária — pronta para vitrine.',
    imagem: '/mock/produto-embalagem.jpg',
    preco: 'R$ 18,00',
  },
  {
    id: 'prod-3',
    nome: 'Kit maquiagem básico',
    descricao: 'Paleta e pincéis para salão / revenda.',
    imagem: '/mock/produto-cosmetico.jpg',
    preco: 'R$ 89,90',
  },
]

export const mockServicos = [
  {
    id: 'srv-1',
    nome: 'Corte e finalização',
    descricao: 'Atendimento no salão — horário sob consulta.',
    imagem: '/mock/servico-salao.jpg',
    preco: 'A partir de R$ 60',
  },
  {
    id: 'srv-2',
    nome: 'Revisão rápida',
    descricao: 'Checagem básica e orientação na oficina.',
    imagem: '/mock/servico-oficina.jpg',
    preco: 'Sob orçamento',
  },
  {
    id: 'srv-3',
    nome: 'Decoração de festa',
    descricao: 'Montagem de mesa e ambientação.',
    imagem: '/mock/servico-festa.jpg',
    preco: 'A partir de R$ 350',
  },
]
