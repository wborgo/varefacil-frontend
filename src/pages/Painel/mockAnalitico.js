/**
 * Mock analítico — primeira entrega (visualizações / compartilhamentos / origem).
 * Série = últimos 14 dias. Só UI.
 */

function serie(seed, base, wave = 8) {
  const out = []
  for (let i = 13; i >= 0; i -= 1) {
    const d = new Date()
    d.setHours(12, 0, 0, 0)
    d.setDate(d.getDate() - i)
    const n =
      base +
      Math.round(Math.sin((i + seed) * 0.7) * wave) +
      ((seed * 3 + i * 5) % 7)
    out.push({
      dia: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      valor: Math.max(0, n),
    })
  }
  return out
}

function totais(views, shares) {
  const v = views.reduce((a, p) => a + p.valor, 0)
  const s = shares.reduce((a, p) => a + p.valor, 0)
  return { views: v, shares: s }
}

const cat1Views = serie(1, 18, 10)
const cat1Shares = serie(2, 4, 3)
const cat2Views = serie(3, 12, 8)
const cat2Shares = serie(4, 3, 2)
const cat3Views = serie(5, 28, 12)
const cat3Shares = serie(6, 7, 4)
const cat4Views = serie(7, 9, 6)
const cat4Shares = serie(8, 2, 2)
const pan1Views = serie(9, 14, 7)
const pan1Shares = serie(10, 5, 3)
const pan2Views = serie(11, 11, 5)
const pan2Shares = serie(12, 3, 2)

const t1 = totais(cat1Views, cat1Shares)
const t2 = totais(cat2Views, cat2Shares)
const t3 = totais(cat3Views, cat3Shares)
const t4 = totais(cat4Views, cat4Shares)
const p1 = totais(pan1Views, pan1Shares)
const p2 = totais(pan2Views, pan2Shares)

/** KPIs do estabelecimento (cards do topo). */
export const mockKpisHome = [
  {
    id: 'views',
    label: 'Visualizações',
    valor: t1.views + t2.views + t3.views + t4.views + p1.views + p2.views,
    delta: '+12%',
    positivo: true,
    detalhe: 'Últimos 14 dias · catálogos e panfletos',
  },
  {
    id: 'shares',
    label: 'Compartilhamentos',
    valor: t1.shares + t2.shares + t3.shares + t4.shares + p1.shares + p2.shares,
    delta: '+8%',
    positivo: true,
    detalhe: 'Cliques em compartilhar / copiar link',
  },
  {
    id: 'home',
    label: 'Acessos pela home',
    valor: 186,
    delta: '+5%',
    positivo: true,
    detalhe: 'Entraram pelo link da página do negócio (busca vem depois)',
  },
  {
    id: 'materiais',
    label: 'Materiais ativos',
    valor: 6,
    delta: '4 cat. · 2 panf.',
    positivo: true,
    detalhe: 'Com link público neste período',
  },
]

/** Origem dos acessos — visão simples (direção futura: busca vs home). */
export const mockOrigemAcessos = [
  { id: 'home', label: 'Home / link do negócio', valor: 186, pct: 62 },
  { id: 'direto', label: 'Link direto do material', valor: 94, pct: 31 },
  { id: 'outro', label: 'Outros / não identificado', valor: 21, pct: 7 },
]

/**
 * Linhas da lista analítica (catálogos + panfletos).
 * `series.views` / `series.shares` alimentam sparkline e o gráfico compartilhado.
 */
export const mockMateriaisAnalitico = [
  {
    id: 'cat-1',
    tipo: 'Catálogo',
    nome: 'Produtos Dr Brilho',
    status: 'Ativo',
    imagem: '/mock/cat-produtos.jpg',
    views: t1.views,
    shares: t1.shares,
    series: { views: cat1Views, shares: cat1Shares },
    destaque: 'Mais aberto em produtos de limpeza',
  },
  {
    id: 'cat-3',
    tipo: 'Catálogo',
    nome: 'Cardápio de serviços',
    status: 'Ativo',
    imagem: '/mock/cat-servicos.jpg',
    views: t3.views,
    shares: t3.shares,
    series: { views: cat3Views, shares: cat3Shares },
    destaque: 'Maior volume de visualizações no período',
  },
  {
    id: 'cat-2',
    tipo: 'Catálogo',
    nome: 'Promoções da semana',
    status: 'Ativo',
    imagem: '/mock/cat-promo.jpg',
    views: t2.views,
    shares: t2.shares,
    series: { views: cat2Views, shares: cat2Shares },
    destaque: 'Bom para status do WhatsApp',
  },
  {
    id: 'cat-4',
    tipo: 'Catálogo',
    nome: 'Campanha: Cristalização',
    status: 'Destaque',
    imagem: '/mock/cat-cristalizacao.jpg',
    views: t4.views,
    shares: t4.shares,
    series: { views: cat4Views, shares: cat4Shares },
    destaque: 'Campanha de um serviço — pronto para anúncio',
  },
  {
    id: 'pan-1',
    tipo: 'Panfleto',
    nome: 'Lavagem completa — fim de semana',
    status: 'Ativo',
    imagem: '/mock/panfleto-lavagem.jpg',
    views: p1.views,
    shares: p1.shares,
    series: { views: pan1Views, shares: pan1Shares },
    destaque: 'Pico no sábado',
  },
  {
    id: 'pan-2',
    tipo: 'Panfleto',
    nome: 'Combo interior + exterior',
    status: 'Destaque',
    imagem: '/mock/panfleto-combo.jpg',
    views: p2.views,
    shares: p2.shares,
    series: { views: pan2Views, shares: pan2Shares },
    destaque: 'Compartilhado pela consultora de vendas',
  },
]
