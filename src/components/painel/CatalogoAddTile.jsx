import { PlusIcon } from '@phosphor-icons/react'

/**
 * Tile “adicionar catálogo” — sempre o último item do grid.
 * Sem formulário ainda; onClick opcional até existir fluxo de criação.
 */
export default function CatalogoAddTile({ onClick, label = 'Novo catálogo' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl',
        'border border-dashed border-border bg-transparent p-4 text-muted',
        'transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
      ].join(' ')}
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <PlusIcon size={28} weight="bold" aria-hidden />
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
