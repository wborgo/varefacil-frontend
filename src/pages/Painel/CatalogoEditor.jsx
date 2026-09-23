import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  DeviceMobileIcon,
  DesktopIcon,
  FloppyDiskIcon,
} from '@phosphor-icons/react'
import CatalogoHtmlPreview from '@/components/painel/CatalogoHtmlPreview.jsx'
import ScaledDesktopPreview from '@/components/painel/ScaledDesktopPreview.jsx'
import {
  createDraftId,
  getCatalogoDraft,
  saveCatalogoDraft,
} from '@/lib/catalogoDrafts.js'
import { mockCatalogTemplates } from '@/pages/Painel/mockTemplates.js'
import {
  mockEstabelecimento,
  mockProdutos,
  mockServicos,
} from '@/pages/Painel/mockData.js'

const POOL = [
  ...mockProdutos.slice(0, 6).map((p) => ({ ...p, kind: 'produto' })),
  ...mockServicos.slice(0, 6).map((s) => ({ ...s, kind: 'servico' })),
]

/** Frame do preview celular; desktop usa ScaledDesktopPreview (1920px + zoom). */
const MOBILE_FRAME = {
  widthClass: 'w-full max-w-[24rem]',
  shellClass:
    'rounded-[1.75rem] border-[10px] border-neutral-800 bg-neutral-800',
}

/**
 * Editor de rascunho do catálogo — aplica paleta via CSS vars no HTML do template.
 */
export default function CatalogoEditor() {
  const location = useLocation()
  const navigate = useNavigate()
  const choice = location.state?.choice
  const draftIdParam = location.state?.draftId

  const existing = draftIdParam ? getCatalogoDraft(draftIdParam) : null

  const template =
    existing?.template ||
    choice?.template ||
    mockCatalogTemplates.find((t) => t.id === existing?.templateId) ||
    mockCatalogTemplates[0]

  const initialColors = existing?.colors || choice?.colors || template.original

  const [draftId] = useState(
    () => existing?.id || choice?.draftId || createDraftId(),
  )
  const [titulo, setTitulo] = useState(
    () => existing?.titulo || 'Catálogo Dr Brilho',
  )
  const [subtitulo, setSubtitulo] = useState(
    () =>
      existing?.subtitulo ||
      'Produtos e serviços para deixar o carro impecável',
  )
  const [itemIds, setItemIds] = useState(
    () => existing?.itemIds || POOL.slice(0, 4).map((i) => i.id),
  )
  const [savedFlash, setSavedFlash] = useState(false)
  const [saveBrand, setSaveBrand] = useState(false)
  const [previewMode, setPreviewMode] = useState('mobile')

  const colors = initialColors
  const previewKey = `${titulo}|${subtitulo}|${itemIds.join(',')}|${template.layout}`

  const selectedItems = useMemo(
    () => POOL.filter((i) => itemIds.includes(i.id)),
    [itemIds],
  )

  if (!choice && !existing) {
    return <Navigate to="/painel/catalogo" replace />
  }

  function toggleItem(id) {
    setItemIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    )
  }

  function handleSave() {
    saveCatalogoDraft({
      id: draftId,
      titulo,
      subtitulo,
      itemIds,
      templateId: template.id,
      template,
      colors,
      mode: choice?.mode || existing?.mode,
      brandColors: choice?.brandColors || existing?.brandColors,
      composition: choice?.composition || existing?.composition,
      saveBrand,
      updatedAt: new Date().toISOString(),
    })
    setSavedFlash(true)
    window.setTimeout(() => setSavedFlash(false), 2000)
  }

  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-border lg:w-[22rem] lg:border-r lg:border-b-0">
        <div className="flex items-center gap-2 border-b border-border px-3 py-3">
          <Link
            to="/painel/catalogo"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl text-muted hover:bg-border/60 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Voltar aos catálogos"
          >
            <ArrowLeftIcon size={20} weight="bold" aria-hidden />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text">
              Montar catálogo
            </p>
            <p className="truncate text-xs text-muted">{template.nome}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
              Título
            </span>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
              Subtítulo
            </span>
            <textarea
              value={subtitulo}
              onChange={(e) => setSubtitulo(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </label>

          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              Cores aplicadas
            </p>
            <div className="flex items-center gap-2">
              <span
                className="size-8 rounded-lg border border-border"
                style={{ background: colors.primary }}
                title="Principal"
              />
              <span
                className="size-8 rounded-lg border border-border"
                style={{ background: colors.secondary }}
                title="Destaque"
              />
              <span className="text-xs text-muted">
                do visual escolhido (CSS vars)
              </span>
            </div>
            <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={saveBrand}
                onChange={(e) => setSaveBrand(e.target.checked)}
                className="mt-1 size-4 accent-[var(--color-accent)]"
              />
              <span>
                Usar estas cores na minha identidade{' '}
                <span className="text-xs">(mock — sync depois)</span>
              </span>
            </label>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
              Itens no catálogo
            </p>
            <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto rounded-xl border border-border bg-bg p-2">
              {POOL.map((item) => {
                const on = itemIds.includes(item.id)
                return (
                  <li key={item.id}>
                    <label
                      className={[
                        'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm',
                        on ? 'bg-accent/10 text-text' : 'text-muted hover:bg-border/40',
                      ].join(' ')}
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleItem(item.id)}
                        className="size-4 accent-[var(--color-accent)]"
                      />
                      <span className="min-w-0 flex-1 truncate font-medium">
                        {item.nome}
                      </span>
                      <span className="shrink-0 text-[0.65rem] uppercase tracking-wide opacity-70">
                        {item.kind}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border p-3">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-3 text-sm font-semibold text-white dark:text-bg hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FloppyDiskIcon size={18} weight="bold" aria-hidden />
            {savedFlash ? 'Salvo!' : 'Salvar rascunho'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/painel/catalogo')}
            className="h-11 cursor-pointer rounded-xl px-3 text-sm font-semibold text-muted hover:bg-border/50 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Lista
          </button>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col items-center bg-bg/60 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex rounded-xl border border-border bg-surface p-0.5 shadow-sm">
            <button
              type="button"
              onClick={() => setPreviewMode('mobile')}
              className={[
                'inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors',
                previewMode === 'mobile'
                  ? 'bg-accent/12 text-accent'
                  : 'text-muted hover:text-text',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              ].join(' ')}
            >
              <DeviceMobileIcon
                size={18}
                weight={previewMode === 'mobile' ? 'fill' : 'regular'}
                aria-hidden
              />
              Celular
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('desktop')}
              className={[
                'inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors',
                previewMode === 'desktop'
                  ? 'bg-accent/12 text-accent'
                  : 'text-muted hover:text-text',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              ].join(' ')}
            >
              <DesktopIcon
                size={18}
                weight={previewMode === 'desktop' ? 'fill' : 'regular'}
                aria-hidden
              />
              Desktop
            </button>
          </div>
        </div>

        {previewMode === 'mobile' ? (
          <div className={MOBILE_FRAME.widthClass}>
            <div
              className={[
                'overflow-hidden shadow-[var(--shadow-soft)]',
                MOBILE_FRAME.shellClass,
              ].join(' ')}
            >
              <div className="max-h-[min(70dvh,42rem)] overflow-y-auto overflow-x-hidden bg-white">
                <CatalogoHtmlPreview
                  layout={template.layout}
                  titulo={titulo}
                  subtitulo={subtitulo}
                  estabelecimento={mockEstabelecimento.nome}
                  items={selectedItems}
                  primary={colors.primary}
                  secondary={colors.secondary}
                />
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-muted">
              Preview na largura de um celular (~390px).
            </p>
          </div>
        ) : (
          <ScaledDesktopPreview key={previewKey} designWidth={1920}>
            <CatalogoHtmlPreview
              layout={template.layout}
              titulo={titulo}
              subtitulo={subtitulo}
              estabelecimento={mockEstabelecimento.nome}
              items={selectedItems}
              primary={colors.primary}
              secondary={colors.secondary}
            />
          </ScaledDesktopPreview>
        )}
      </section>
    </div>
  )
}
