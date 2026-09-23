import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IdentificationCardIcon,
  NewspaperClippingIcon,
  PlusIcon,
  StorefrontIcon,
} from '@phosphor-icons/react'
import CatalogoAddTile from '@/components/painel/CatalogoAddTile.jsx'
import CatalogoCard from '@/components/painel/CatalogoCard.jsx'
import CatalogoTemplateModal from '@/components/painel/CatalogoTemplateModal.jsx'
import PainelCardsToolbar from '@/components/painel/PainelCardsToolbar.jsx'
import PainelPageHeader from '@/components/painel/PainelPageHeader.jsx'
import PainelTabs from '@/components/painel/PainelTabs.jsx'
import { loadCatalogoDrafts } from '@/lib/catalogoDrafts.js'
import {
  mockCartoes,
  mockCatalogos,
  mockEstabelecimento,
  mockPanfletos,
} from '@/pages/Painel/mockData.js'

const TABS = [
  { id: 'catalogos', label: 'Catálogos', Icon: StorefrontIcon },
  { id: 'panfletos', label: 'Panfletos', Icon: NewspaperClippingIcon },
  { id: 'cartoes', label: 'Cartões', Icon: IdentificationCardIcon },
]

const TAB_META = {
  catalogos: {
    novo: 'Novo catálogo',
    busca: 'Buscar catálogos…',
    ordenar: 'Ordenar catálogos',
    items: mockCatalogos,
    hint: 'Links compartilháveis — produtos, serviços ou uma campanha de um item só.',
  },
  panfletos: {
    novo: 'Novo panfleto',
    busca: 'Buscar panfletos…',
    ordenar: 'Ordenar panfletos',
    items: mockPanfletos,
    hint: 'Artes para imprimir ou mandar no WhatsApp — promoção e pacotes.',
  },
  cartoes: {
    novo: 'Novo cartão',
    busca: 'Buscar cartões…',
    ordenar: 'Ordenar cartões',
    items: mockCartoes,
    hint: 'Cartão do dono, da equipe de vendas… cada pessoa com o seu.',
  },
}

export default function Catalogo() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('catalogos')
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const meta = TAB_META[tab]

  const drafts = tab === 'catalogos' ? loadCatalogoDrafts() : []

  function openNovo() {
    if (tab === 'catalogos') {
      setTemplateModalOpen(true)
    }
  }

  function handleTemplateConfirm(choice) {
    setTemplateModalOpen(false)
    navigate('/painel/catalogo/novo', { state: { choice } })
  }

  return (
    <div className="min-h-full p-4 sm:p-6">
      <PainelPageHeader
        title="Catálogo"
        description={`${mockEstabelecimento.nome} — materiais para compartilhar com o cliente. ${meta.hint}`}
      >
        <button
          type="button"
          onClick={openNovo}
          className={[
            'inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-4',
            'text-sm font-semibold text-white dark:text-bg',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          ].join(' ')}
        >
          <PlusIcon size={18} weight="bold" aria-hidden />
          {meta.novo}
        </button>
      </PainelPageHeader>

      <PainelTabs
        items={TABS}
        value={tab}
        onChange={setTab}
        aria-label="Tipo de material"
      />

      <div
        role="tabpanel"
        id={`painel-tabpanel-${tab}`}
        aria-labelledby={`painel-tab-${tab}`}
      >
        <PainelCardsToolbar searchPlaceholder={meta.busca}>
          <select
            disabled
            aria-label={meta.ordenar}
            className="h-11 rounded-xl border border-border bg-bg px-3 text-sm text-muted disabled:opacity-70"
            defaultValue="recentes"
          >
            <option value="recentes">Mais recentes</option>
            <option value="nome">Nome</option>
          </select>
        </PainelCardsToolbar>

        {tab === 'catalogos' && drafts.length ? (
          <div className="mb-5">
            <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
              Rascunhos nesta sessão
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),320px))] items-stretch justify-items-stretch gap-4 sm:gap-5">
              {drafts.map((d) => (
                <li key={d.id} className="min-w-0">
                  <CatalogoCard
                    nome={d.titulo || 'Sem título'}
                    descricao={`${d.template?.nome || 'Template'} · rascunho`}
                    categoria="Rascunho"
                    badge="Editando"
                    imagem={d.template?.layout === 'capa' ? '/mock/cat-promo.jpg' : '/mock/cat-produtos.jpg'}
                    onClick={() =>
                      navigate('/painel/catalogo/novo', {
                        state: { draftId: d.id },
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,200px),320px))] items-stretch justify-items-stretch gap-4 sm:gap-5">
          {meta.items.map((item) => (
            <li key={item.id} className="min-w-0">
              <CatalogoCard
                nome={item.nome}
                descricao={item.descricao}
                categoria={item.categoria}
                badge={item.badge}
                imagem={item.imagem}
              />
            </li>
          ))}
          <li className="min-w-0">
            <CatalogoAddTile label={meta.novo} onClick={openNovo} />
          </li>
        </ul>
      </div>

      <CatalogoTemplateModal
        open={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        onConfirm={handleTemplateConfirm}
      />
    </div>
  )
}
