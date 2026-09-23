import {
  BuildingsIcon,
  HouseIcon,
  ImagesIcon,
  PackageIcon,
  PaletteIcon,
  StorefrontIcon,
  WrenchIcon,
} from '@phosphor-icons/react'

/**
 * Menu do painel (varejo). Dados só — sem JSX de layout.
 * `to` pode apontar rota ainda sem página (Outlet vazio até existir).
 * `end: true` — NavLink só ativo na rota exata (ex.: Início em `/painel`).
 */
export const painelNavSections = [
  {
    id: 'visao',
    label: 'Visão',
    items: [
      {
        id: 'inicio',
        label: 'Início',
        to: '/painel',
        Icon: HouseIcon,
        end: true,
      },
    ],
  },
  {
    id: 'vitrine',
    label: 'Vitrine',
    items: [
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
    ],
  },
  {
    id: 'empresa',
    label: 'Empresa',
    items: [
      {
        id: 'dados',
        label: 'Dados cadastrais',
        to: '/painel/empresa',
        Icon: BuildingsIcon,
      },
      {
        id: 'identidade',
        label: 'Identidade visual',
        to: '/painel/identidade',
        Icon: PaletteIcon,
      },
      {
        id: 'midia',
        label: 'Biblioteca de mídia',
        to: '/painel/midia',
        Icon: ImagesIcon,
      },
    ],
  },
]

/** Flat — útil se algum consumidor só precisar da lista. */
export const painelNavItems = painelNavSections.flatMap((s) => s.items)
