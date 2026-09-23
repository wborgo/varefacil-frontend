/**
 * Abas horizontais estilo Gogo (underline) — UI própria, tokens VareFacil.
 * `items`: [{ id, label, Icon? }] — Icon = componente Phosphor.
 */
export default function PainelTabs({ items, value, onChange, 'aria-label': ariaLabel }) {
  return (
    <div className="mb-5 border-b border-border sm:mb-6">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="-mb-px flex gap-1 overflow-x-auto"
      >
        {items.map((item) => {
          const selected = item.id === value
          const Icon = item.Icon
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`painel-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`painel-tabpanel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(item.id)}
              className={[
                'relative inline-flex shrink-0 cursor-pointer items-center gap-2 px-4 py-3',
                'text-sm font-semibold tracking-wide transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                selected
                  ? 'text-accent after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-accent'
                  : 'text-muted hover:text-text',
              ].join(' ')}
            >
              {Icon ? (
                <Icon
                  size={18}
                  weight={selected ? 'fill' : 'regular'}
                  aria-hidden
                />
              ) : null}
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
