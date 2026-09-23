import { painelNavSections } from '@/pages/Painel/painelNavItems.js'
import PainelNavItem from '@/components/painel/PainelNavItem.jsx'

/**
 * Menu lateral do painel.
 * `compact`: rail só com ícones (ex.: durante edição de catálogo).
 */
export default function PainelSidebar({ open, onClose, compact = false }) {
  return (
    <>
      <div
        role="presentation"
        className={[
          'fixed inset-0 z-30 bg-text/30 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
      />

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-surface',
          'transition-[transform,width] duration-200 ease-out lg:static lg:z-0 lg:translate-x-0',
          compact ? 'w-[4.25rem]' : 'w-[16.5rem]',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {!compact ? (
          <div className="flex h-14 items-center border-b border-border px-4 sm:h-16 lg:hidden">
            <span className="text-sm font-semibold text-text">Menu</span>
          </div>
        ) : null}

        <nav
          className={[
            'flex flex-1 flex-col overflow-y-auto',
            compact ? 'gap-1 p-2' : 'gap-5 p-3',
          ].join(' ')}
          aria-label="Painel"
        >
          {painelNavSections.map((section) => (
            <div key={section.id} className="flex flex-col gap-1">
              {!compact ? (
                <p className="px-3 pb-1 text-[0.6875rem] font-semibold tracking-wider text-muted uppercase">
                  {section.label}
                </p>
              ) : null}
              {section.items.map((item) => (
                <PainelNavItem
                  key={item.id}
                  to={item.to}
                  label={item.label}
                  Icon={item.Icon}
                  end={item.end}
                  compact={compact}
                  onNavigate={onClose}
                />
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
