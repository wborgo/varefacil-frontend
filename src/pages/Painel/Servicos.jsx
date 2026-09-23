import { PlusIcon } from '@phosphor-icons/react'
import CatalogoAddTile from '@/components/painel/CatalogoAddTile.jsx'
import OfertaCard from '@/components/painel/OfertaCard.jsx'
import PainelCardsToolbar from '@/components/painel/PainelCardsToolbar.jsx'
import PainelPageHeader from '@/components/painel/PainelPageHeader.jsx'
import { mockServicos } from '@/pages/Painel/mockData.js'

export default function Servicos() {
  return (
    <div className="min-h-full p-4 sm:p-6">
      <PainelPageHeader
        title="Serviços"
        description="Serviços da estética automotiva — mock Dr Brilho. Fotos contextuais temporárias."
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
          Novo serviço
        </button>
      </PainelPageHeader>

      <PainelCardsToolbar searchPlaceholder="Buscar serviços…">
        <select
          disabled
          aria-label="Ordenar serviços"
          className="h-11 rounded-xl border border-border bg-bg px-3 text-sm text-muted disabled:opacity-70"
          defaultValue="destaque"
        >
          <option value="destaque">Em destaque</option>
          <option value="preco">Preço</option>
          <option value="nome">Nome</option>
        </select>
      </PainelCardsToolbar>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),320px))] items-stretch justify-items-stretch gap-4 sm:gap-5">
        {mockServicos.map((item) => (
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
          <CatalogoAddTile label="Novo serviço" />
        </li>
      </ul>
    </div>
  )
}
