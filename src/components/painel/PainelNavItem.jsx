import { NavLink } from 'react-router-dom'

/**
 * Um item do menu lateral do painel.
 * Responsabilidade: aparência + NavLink; não conhece a lista completa.
 */
export default function PainelNavItem({ to, label, Icon, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
          isActive
            ? 'bg-accent/12 text-accent'
            : 'text-muted hover:bg-border/50 hover:text-text',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={22}
            weight={isActive ? 'fill' : 'regular'}
            className="shrink-0"
            aria-hidden
          />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}
