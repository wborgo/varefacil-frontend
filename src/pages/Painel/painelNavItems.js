import {
  PackageIcon,
  StorefrontIcon,
  WrenchIcon,
} from '@phosphor-icons/react'

/** Itens do menu do painel (varejo). Dados só — sem JSX de layout. */
export const painelNavItems = [
  {
    id: 'catalogo',
    label: 'Catálogo',
    to: '/painel/catalogo',
    Icon: StorefrontIcon,
  },
  {
    id: 'produtos',
    label: 'Produtos',
    to: '/painel/produtos',
    Icon: PackageIcon,
  },
  {
    id: 'servicos',
    label: 'Serviços',
    to: '/painel/servicos',
    Icon: WrenchIcon,
  },
]
