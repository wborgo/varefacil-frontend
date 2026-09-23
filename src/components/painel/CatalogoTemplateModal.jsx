import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckIcon, PlusIcon, XIcon } from '@phosphor-icons/react'
import TemplateLodThumb from '@/components/painel/TemplateLodThumb.jsx'
import {
  TEMPLATE_SLOTS,
  mockBrandPalette,
  mockCatalogTemplates,
  resolveTemplateColors,
} from '@/pages/Painel/mockTemplates.js'

/**
 * Modal: escolher template de catálogo + ajustar paleta da marca no mesmo fluxo.
 */
export default function CatalogoTemplateModal({ open, onClose, onConfirm }) {
  const titleId = useId()
  const closeRef = useRef(null)

  const [mode, setMode] = useState(() =>
    mockBrandPalette.colors.length ? 'custom' : 'original',
  )
  const [brandColors, setBrandColors] = useState(() => [
    ...mockBrandPalette.colors,
  ])
  /** Composição custom: qual hex em cada slot (pode ser original ou da identidade). */
  const [composition, setComposition] = useState({})
  const [selectedId, setSelectedId] = useState(mockCatalogTemplates[0]?.id)
  const [slotPicker, setSlotPicker] = useState(null)

  useEffect(() => {
    if (!open) return undefined
    closeRef.current?.focus()
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const selected = mockCatalogTemplates.find((t) => t.id === selectedId)

  function colorsFor(template) {
    return resolveTemplateColors(template, mode, brandColors, composition)
  }

  function openSlotPicker(slotId) {
    setSlotPicker((cur) => (cur === slotId ? null : slotId))
  }

  function pickColor(hex) {
    if (!slotPicker) return
    setComposition((c) => ({ ...c, [slotPicker]: hex }))
    setMode('custom')
    setSlotPicker(null)
  }

  function addBrandColor(hex) {
    if (!hex) return
    setBrandColors((list) =>
      list.includes(hex.toLowerCase()) ? list : [...list, hex],
    )
    setMode('custom')
  }

  function handleConfirm() {
    if (!selected) return
    onConfirm?.({
      template: selected,
      mode,
      colors: colorsFor(selected),
      brandColors,
      composition,
    })
    onClose?.()
  }

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-text/40 backdrop-blur-[1px]"
        aria-label="Fechar"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          'relative z-10 flex max-h-[min(92dvh,52rem)] w-full max-w-3xl flex-col',
          'rounded-t-2xl border border-border bg-surface shadow-[var(--shadow-soft)] sm:rounded-2xl',
        ].join(' ')}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-lg font-semibold tracking-tight text-text"
            >
              Escolher visual
            </h2>
            <p className="mt-0.5 text-sm text-muted">
              Toque num modelo. Ajuste as cores aqui — não precisa sair da tela.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-muted hover:bg-border/60 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Fechar"
          >
            <XIcon size={20} weight="bold" aria-hidden />
          </button>
        </header>

        {/* Barra de paleta — editor leve da marca */}
        <div className="shrink-0 space-y-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-muted uppercase">
              Cores no preview
            </span>
            <div className="inline-flex rounded-xl border border-border bg-bg p-0.5">
              <button
                type="button"
                onClick={() => setMode('original')}
                className={[
                  'cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                  mode === 'original'
                    ? 'bg-surface text-text shadow-sm'
                    : 'text-muted hover:text-text',
                ].join(' ')}
              >
                Originais do modelo
              </button>
              <button
                type="button"
                onClick={() => setMode('custom')}
                className={[
                  'cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                  mode === 'custom'
                    ? 'bg-surface text-text shadow-sm'
                    : 'text-muted hover:text-text',
                ].join(' ')}
              >
                Minha identidade
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {TEMPLATE_SLOTS.map((slot) => {
              const sample = selected
                ? colorsFor(selected)[slot.id]
                : brandColors[0] || '#0f766e'
              const active = slotPicker === slot.id
              return (
                <div key={slot.id} className="relative">
                  <button
                    type="button"
                    onClick={() => openSlotPicker(slot.id)}
                    className={[
                      'flex cursor-pointer items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors',
                      active
                        ? 'border-accent bg-accent/5'
                        : 'border-border bg-bg hover:border-accent/40',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    ].join(' ')}
                  >
                    <span
                      className="size-8 rounded-lg border border-black/10 shadow-sm"
                      style={{ background: sample }}
                    />
                    <span>
                      <span className="block text-xs font-semibold text-text">
                        {slot.label}
                      </span>
                      <span className="block font-mono text-[0.65rem] text-muted">
                        {sample}
                      </span>
                    </span>
                  </button>

                  {active ? (
                    <div className="absolute top-full left-0 z-20 mt-2 w-56 rounded-xl border border-border bg-surface p-3 shadow-[var(--shadow-soft)]">
                      <p className="mb-2 text-[0.65rem] font-semibold tracking-wide text-muted uppercase">
                        Originais deste modelo
                      </p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {selected
                          ? Object.values(selected.original).map((hex) => (
                              <button
                                key={`o-${hex}`}
                                type="button"
                                title={hex}
                                onClick={() => pickColor(hex)}
                                className="size-8 cursor-pointer rounded-lg border border-border shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                                style={{ background: hex }}
                              />
                            ))
                          : null}
                      </div>
                      <p className="mb-2 text-[0.65rem] font-semibold tracking-wide text-muted uppercase">
                        Minha identidade
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {brandColors.map((hex) => (
                          <button
                            key={`b-${hex}`}
                            type="button"
                            title={hex}
                            onClick={() => pickColor(hex)}
                            className="size-8 cursor-pointer rounded-lg border border-border shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            style={{ background: hex }}
                          />
                        ))}
                        <label className="relative flex size-8 cursor-pointer items-center justify-center rounded-lg border border-dashed border-border text-muted hover:border-accent hover:text-accent">
                          <PlusIcon size={16} weight="bold" aria-hidden />
                          <span className="sr-only">Nova cor</span>
                          <input
                            type="color"
                            className="absolute inset-0 cursor-pointer opacity-0"
                            onChange={(e) => {
                              addBrandColor(e.target.value)
                              pickColor(e.target.value)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
          <p className="text-xs text-muted">
            Sem cor na identidade, o modelo usa a original. Trocar um slot já
            deixa o preview em “Minha identidade”.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {mockCatalogTemplates.map((tpl) => {
              const cols = colorsFor(tpl)
              const isSel = tpl.id === selectedId
              return (
                <li key={tpl.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(tpl.id)}
                    className={[
                      'group w-full cursor-pointer rounded-2xl border p-2 text-left transition-shadow',
                      isSel
                        ? 'border-accent ring-2 ring-accent/30'
                        : 'border-border hover:border-accent/40',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    ].join(' ')}
                  >
                    <TemplateLodThumb
                      layout={tpl.layout}
                      primary={cols.primary}
                      secondary={cols.secondary}
                    />
                    <span className="mt-2 flex items-start justify-between gap-2 px-0.5">
                      <span>
                        <span className="block text-sm font-semibold text-text">
                          {tpl.nome}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {tpl.descricao}
                        </span>
                      </span>
                      {isSel ? (
                        <CheckIcon
                          size={18}
                          weight="bold"
                          className="mt-0.5 shrink-0 text-accent"
                          aria-hidden
                        />
                      ) : null}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <footer className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onClose}
            className="h-11 cursor-pointer rounded-xl px-4 text-sm font-semibold text-muted hover:bg-border/50 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white dark:text-bg hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Usar este visual
          </button>
        </footer>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
