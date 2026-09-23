import { useState } from 'react'
import { PackageIcon, PlusIcon, StackIcon } from '@phosphor-icons/react'
import CatalogoAddTile from '@/components/painel/CatalogoAddTile.jsx'
import OfertaCard from '@/components/painel/OfertaCard.jsx'
import PainelCardsToolbar from '@/components/painel/PainelCardsToolbar.jsx'
import PainelPageHeader from '@/components/painel/PainelPageHeader.jsx'
import PainelTabs from '@/components/painel/PainelTabs.jsx'
import { mockCombos, mockProdutos } from '@/pages/Painel/mockData.js'

const TABS = [
  { id: 'produtos', label: 'Produtos', Icon: PackageIcon },
  { id: 'combos', label: 'Combos', Icon: StackIcon },
]

export default function Produtos() {
  const [tab, setTab] = useState('produtos')
  const isCombos = tab === 'combos'
  const items = isCombos ? mockCombos : mockProdutos
  const novoLabel = isCombos ? 'Novo combo' : 'Novo produto'
  const buscaPlaceholder = isCombos ? 'Buscar combos…' : 'Buscar produtos…'
  const ordenarLabel = isCombos ? 'Ordenar combos' : 'Ordenar produtos'

  return (
    <div className="min-h-full p-4 sm:p-6">
      <PainelPageHeader
        title="Produtos"
        description="Itens e combos à venda — mock Dr Brilho Estética Automotiva."
      >
        <button
          type="button"
          className={[
            'inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-4',
            'text-sm font-semibold text-white dark:text-bg',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          ].join(' ')}
        >
          <PlusIcon size={18} weight="bold" aria-hidden />
          {novoLabel}
        </button>
      </PainelPageHeader>

      <PainelTabs
        items={TABS}
        value={tab}
        onChange={setTab}
        aria-label="Tipo de oferta"
      />

      <div
        role="tabpanel"
        id={`painel-tabpanel-${tab}`}
        aria-labelledby={`painel-tab-${tab}`}
      >
        <PainelCardsToolbar searchPlaceholder={buscaPlaceholder}>
          <select
            disabled
            aria-label={ordenarLabel}
            className="h-11 rounded-xl border border-border bg-bg px-3 text-sm text-muted disabled:opacity-70"
            defaultValue="destaque"
          >
            <option value="destaque">Em destaque</option>
            <option value="preco">Preço</option>
            <option value="nome">Nome</option>
          </select>
        </PainelCardsToolbar>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),320px))] items-stretch justify-items-stretch gap-4 sm:gap-5">
          {items.map((item) => (
            <li key={item.id} className="min-w-0">
              <OfertaCard
                nome={item.nome}
                descricao={item.descricao}
                categoria={item.categoria}
                badge={item.badge}
                imagem={item.imagem}
                preco={item.preco}
                precoDe={item.precoDe}
              />
            </li>
          ))}
          <li className="min-w-0">
            <CatalogoAddTile label={novoLabel} />
          </li>
        </ul>
      </div>
    </div>
  )
}
