import { MagnifyingGlassIcon } from '@phosphor-icons/react'

/**
 * Barra leve acima do grid (busca + filtros visuais).
 * Sem lógica ainda — só UI alinhada ao padrão product-cards.
 */
export default function PainelCardsToolbar({
  searchPlaceholder = 'Buscar…',
  children,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative block min-w-0 flex-1 sm:max-w-xs">
        <span className="sr-only">{searchPlaceholder}</span>
        <MagnifyingGlassIcon
          size={18}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          type="search"
          placeholder={searchPlaceholder}
          disabled
          className={[
            'h-11 w-full rounded-xl border border-border bg-bg py-2 pr-3 pl-10',
            'text-sm text-text placeholder:text-muted/80',
            'disabled:cursor-not-allowed disabled:opacity-70',
          ].join(' ')}
        />
      </label>
      {children ? (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      ) : null}
    </div>
  )
}
