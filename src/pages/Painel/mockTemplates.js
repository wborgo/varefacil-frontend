/**
 * Mock — templates de catálogo (LOD) + paleta da marca Dr Brilho.
 * Cores originais = do template; identidade = do estabelecimento (editável no modal).
 */

export const mockBrandPalette = {
  /** Cores já “cadastradas” na identidade (pode começar vazio em outros mocks). */
  colors: ['#0f766e', '#1a1d21'],
}

/** Slots que a maioria dos templates espera. */
export const TEMPLATE_SLOTS = [
  { id: 'primary', label: 'Principal' },
  { id: 'secondary', label: 'Destaque' },
]

export const mockCatalogTemplates = [
  {
    id: 'lista-limpa',
    nome: 'Lista limpa',
    descricao: 'Capa + lista de itens — bom para WhatsApp.',
    layout: 'lista',
    original: { primary: '#0f766e', secondary: '#134e4a' },
  },
  {
    id: 'capa-grande',
    nome: 'Capa destaque',
    descricao: 'Foto/gradiente grande e poucos blocos.',
    layout: 'capa',
    original: { primary: '#b45309', secondary: '#1c1917' },
  },
  {
    id: 'grade',
    nome: 'Grade de cards',
    descricao: 'Vários itens em mosaico.',
    layout: 'grade',
    original: { primary: '#1d4ed8', secondary: '#0f172a' },
  },
  {
    id: 'promo',
    nome: 'Faixa promoção',
    descricao: 'Faixa de oferta no topo + lista.',
    layout: 'promo',
    original: { primary: '#be123c', secondary: '#881337' },
  },
]

/**
 * Resolve cores do preview.
 * mode: 'original' | 'custom'
 * brandColors: string[] hex da identidade
 * composition: { primary?, secondary? } escolhas nos slots custom (podem vir da original)
 */
export function resolveTemplateColors(template, mode, brandColors, composition) {
  const original = template.original
  if (mode === 'original') return { ...original }

  const brand = brandColors?.length ? brandColors : []
  const primary =
    composition?.primary || brand[0] || original.primary
  const secondary =
    composition?.secondary || brand[1] || original.secondary

  return { primary, secondary }
}
