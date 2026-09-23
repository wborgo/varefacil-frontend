import {
  GridFourIcon,
  ListBulletsIcon,
  MegaphoneIcon,
  NewspaperClippingIcon,
  TextAlignLeftIcon,
  TextHIcon,
} from '@phosphor-icons/react'

/**
 * Linguagem: **Blocos** (não “componentes”) — montar o catálogo como peças.
 * O template já traz uma lista inicial de blocos.
 */

export const BLOCK_CATALOG = [
  {
    type: 'cabecalho',
    label: 'Cabeçalho',
    descricao: 'Logo, título e slogan',
    Icon: TextHIcon,
  },
  {
    type: 'faixa_promo',
    label: 'Faixa de promoção',
    descricao: 'Barra de destaque no topo',
    Icon: MegaphoneIcon,
  },
  {
    type: 'lista_itens',
    label: 'Lista de itens',
    descricao: 'Produtos ou serviços em lista',
    Icon: ListBulletsIcon,
  },
  {
    type: 'grade_itens',
    label: 'Grade de itens',
    descricao: 'Produtos ou serviços em mosaico',
    Icon: GridFourIcon,
  },
  {
    type: 'texto',
    label: 'Texto',
    descricao: 'Parágrafo livre',
    Icon: TextAlignLeftIcon,
  },
  {
    type: 'rodape',
    label: 'Rodapé',
    descricao: 'Contato e marca VareFacil',
    Icon: NewspaperClippingIcon,
  },
]

export const LOGO_OPTIONS = [
  {
    id: 'light',
    label: 'Logo claro',
    src: '/images/logo_light.png',
  },
  {
    id: 'dark',
    label: 'Logo escuro',
    src: '/images/logo_dark.png',
  },
]

/** Blocos iniciais por layout do template. */
export function seedBlocksForLayout(layout) {
  const id = () => `blk-${Math.random().toString(36).slice(2, 9)}`
  if (layout === 'promo') {
    return [
      { id: id(), type: 'faixa_promo', props: { texto: 'Oferta da semana · Dr Brilho' } },
      { id: id(), type: 'cabecalho', props: {} },
      { id: id(), type: 'lista_itens', props: {} },
      { id: id(), type: 'rodape', props: {} },
    ]
  }
  if (layout === 'grade') {
    return [
      { id: id(), type: 'cabecalho', props: {} },
      { id: id(), type: 'grade_itens', props: {} },
      { id: id(), type: 'rodape', props: {} },
    ]
  }
  if (layout === 'capa') {
    return [
      { id: id(), type: 'cabecalho', props: {} },
      { id: id(), type: 'lista_itens', props: {} },
      { id: id(), type: 'rodape', props: {} },
    ]
  }
  return [
    { id: id(), type: 'cabecalho', props: {} },
    { id: id(), type: 'lista_itens', props: {} },
    { id: id(), type: 'rodape', props: {} },
  ]
}

export function blockMeta(type) {
  return (
    BLOCK_CATALOG.find((b) => b.type === type) ?? {
      type,
      label: type,
      descricao: '',
      Icon: ListBulletsIcon,
    }
  )
}

export function createBlock(type) {
  const base = { id: `blk-${Math.random().toString(36).slice(2, 9)}`, type, props: {} }
  if (type === 'faixa_promo') {
    base.props = { texto: 'Oferta da semana · Dr Brilho' }
  }
  if (type === 'texto') {
    base.props = {
      texto:
        'Atendimento com hora marcada · Orçamento sem compromisso · Região metropolitana',
    }
  }
  return base
}
