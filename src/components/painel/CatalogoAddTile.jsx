import { PlusIcon } from '@phosphor-icons/react'

/**
 * Tile “adicionar” — último item do grid; estica na altura dos cards da linha.
 */
export default function CatalogoAddTile({ onClick, label = 'Novo catálogo' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex h-full w-full max-w-[320px] min-h-[18rem] cursor-pointer flex-col',
        'items-center justify-center gap-3 rounded-2xl p-6 text-muted',
        'border border-dashed border-border bg-bg/50',
        'shadow-[var(--shadow-soft)] transition-colors',
        'hover:border-accent hover:bg-accent/5 hover:text-accent',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
      ].join(' ')}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        <PlusIcon size={26} weight="bold" aria-hidden />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  )
}
