import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  DeviceMobileIcon,
  DesktopIcon,
  FloppyDiskIcon,
} from '@phosphor-icons/react'
import CatalogoEditorChrome from '@/components/painel/CatalogoEditorChrome.jsx'
import CatalogoHtmlPreview from '@/components/painel/CatalogoHtmlPreview.jsx'
import ScaledDesktopPreview from '@/components/painel/ScaledDesktopPreview.jsx'
import {
  createDraftId,
  getCatalogoDraft,
  saveCatalogoDraft,
} from '@/lib/catalogoDrafts.js'
import {
  createBlock,
  seedBlocksForLayout,
} from '@/pages/Painel/catalogoBlocks.js'
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

const MOBILE_FRAME = {
  widthClass: 'w-full max-w-[24rem]',
  shellClass:
    'rounded-[1.75rem] border-[10px] border-neutral-800 bg-neutral-800',
}

/**
 * Editor por blocos: Configurações / Cores + edição por bloco selecionado.
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

  const [draftId] = useState(
    () => existing?.id || choice?.draftId || createDraftId(),
  )
  const [tool, setTool] = useState('blocos')
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [flashBlockId, setFlashBlockId] = useState(null)
  const [titulo, setTitulo] = useState(
    () => existing?.titulo || 'Catálogo Dr Brilho',
  )
  const [subtitulo, setSubtitulo] = useState(
    () =>
      existing?.subtitulo ||
      'Produtos e serviços para deixar o carro impecável',
  )
  const [logoSrc, setLogoSrc] = useState(
    () => existing?.logoSrc || '/images/logo_light.png',
  )
  const [itemIds, setItemIds] = useState(
    () => existing?.itemIds || POOL.slice(0, 4).map((i) => i.id),
  )
  const [blocks, setBlocks] = useState(
    () => existing?.blocks || seedBlocksForLayout(template.layout),
  )
  const [colors, setColors] = useState(
    () => existing?.colors || choice?.colors || { ...template.original },
  )
  const [published, setPublished] = useState(() => existing?.published ?? false)
  const [saveBrand, setSaveBrand] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  const [previewMode, setPreviewMode] = useState('mobile')

  const selectedItems = useMemo(
    () => POOL.filter((i) => itemIds.includes(i.id)),
    [itemIds],
  )

  const previewKey = `${titulo}|${subtitulo}|${logoSrc}|${itemIds.join(',')}|${blocks.map((b) => `${b.type}:${b.props?.texto || ''}`).join(',')}`

  useEffect(() => {
    if (!selectedBlockId) return undefined
    setFlashBlockId(selectedBlockId)
    const t = window.setTimeout(() => setFlashBlockId(null), 1100)
    return () => window.clearTimeout(t)
  }, [selectedBlockId])

  if (!choice && !existing) {
    return <Navigate to="/painel/catalogo" replace />
  }

  function toggleItem(id) {
    setItemIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    )
  }

  function addBlock(type) {
    const blk = createBlock(type)
    setBlocks((list) => [...list, blk])
    setTool('bloco')
    setSelectedBlockId(blk.id)
  }

  function removeBlock(id) {
    setBlocks((list) => list.filter((b) => b.id !== id))
    if (selectedBlockId === id) {
      setSelectedBlockId(null)
      setTool('blocos')
    }
  }

  function updateBlockProps(id, patch) {
    setBlocks((list) =>
      list.map((b) =>
        b.id === id ? { ...b, props: { ...b.props, ...patch } } : b,
      ),
    )
  }

  function handleSave() {
    saveCatalogoDraft({
      id: draftId,
      titulo,
      subtitulo,
      logoSrc,
      itemIds,
      blocks,
      published,
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

  const preview = (
    <CatalogoHtmlPreview
      blocks={blocks}
      titulo={titulo}
      subtitulo={subtitulo}
      estabelecimento={mockEstabelecimento.nome}
      items={selectedItems}
      primary={colors.primary}
      secondary={colors.secondary}
      logoSrc={logoSrc}
      selectedBlockId={selectedBlockId}
      flashBlockId={flashBlockId}
    />
  )

  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <CatalogoEditorChrome
        tool={tool}
        onTool={setTool}
        selectedBlockId={selectedBlockId}
        onSelectBlock={setSelectedBlockId}
        blocks={blocks}
        onAddBlock={addBlock}
        onRemoveBlock={removeBlock}
        onUpdateBlockProps={updateBlockProps}
        colors={colors}
        onColor={(slot, hex) =>
          setColors((c) => ({ ...c, [slot]: hex }))
        }
        saveBrand={saveBrand}
        onSaveBrand={setSaveBrand}
        titulo={titulo}
        subtitulo={subtitulo}
        onTitulo={setTitulo}
        onSubtitulo={setSubtitulo}
        logoSrc={logoSrc}
        onLogoSrc={setLogoSrc}
        itemIds={itemIds}
        onToggleItem={toggleItem}
        pool={POOL}
        published={published}
        onPublished={setPublished}
        templateNome={template.nome}
      />

      <section className="flex min-w-0 flex-1 flex-col bg-bg/60">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface px-3 py-2">
          <div className="inline-flex rounded-xl border border-border bg-bg p-0.5">
            <button
              type="button"
              onClick={() => setPreviewMode('mobile')}
              className={[
                'inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold',
                previewMode === 'mobile'
                  ? 'bg-accent/12 text-accent'
                  : 'text-muted hover:text-text',
              ].join(' ')}
            >
              <DeviceMobileIcon
                size={16}
                weight={previewMode === 'mobile' ? 'fill' : 'regular'}
                aria-hidden
              />
              Celular
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('desktop')}
              className={[
                'inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold',
                previewMode === 'desktop'
                  ? 'bg-accent/12 text-accent'
                  : 'text-muted hover:text-text',
              ].join(' ')}
            >
              <DesktopIcon
                size={16}
                weight={previewMode === 'desktop' ? 'fill' : 'regular'}
                aria-hidden
              />
              Desktop
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl bg-accent px-3 text-xs font-semibold text-white dark:text-bg hover:opacity-90"
            >
              <FloppyDiskIcon size={16} weight="bold" aria-hidden />
              {savedFlash ? 'Salvo!' : 'Salvar'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/painel/catalogo')}
              className="h-9 cursor-pointer rounded-xl px-3 text-xs font-semibold text-muted hover:bg-border/50 hover:text-text"
            >
              Lista
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center overflow-auto p-4 sm:p-6">
          {previewMode === 'mobile' ? (
            <div className={MOBILE_FRAME.widthClass}>
              <div
                className={[
                  'overflow-hidden shadow-[var(--shadow-soft)]',
                  MOBILE_FRAME.shellClass,
                ].join(' ')}
              >
                <div className="max-h-[min(70dvh,42rem)] overflow-y-auto overflow-x-hidden bg-white">
                  {preview}
                </div>
              </div>
            </div>
          ) : (
            <ScaledDesktopPreview key={previewKey} designWidth={1920}>
              {preview}
            </ScaledDesktopPreview>
          )}
        </div>
      </section>
    </div>
  )
}
