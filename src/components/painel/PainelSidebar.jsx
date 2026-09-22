import { painelNavItems } from '@/pages/painel/painelNavItems.js'
import PainelNavItem from '@/components/painel/PainelNavItem.jsx'

/**
 * Menu lateral do painel.
 * Responsabilidade: navegar itens do varejo; recebe open/onClose do layout.
 */
export default function PainelSidebar({ open, onClose }) {
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
          'fixed inset-y-0 left-0 z-40 flex w-[16.5rem] flex-col border-r border-border bg-surface',
          'transition-transform duration-200 ease-out lg:static lg:z-0 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-14 items-center border-b border-border px-4 sm:h-16 lg:hidden">
          <span className="text-sm font-semibold text-text">Menu</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Painel">
          {painelNavItems.map((item) => (
            <PainelNavItem
              key={item.id}
              to={item.to}
              label={item.label}
              Icon={item.Icon}
              onNavigate={onClose}
            />
          ))}
        </nav>
      </aside>
    </>
  )
}
