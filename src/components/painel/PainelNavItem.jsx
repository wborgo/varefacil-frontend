import { NavLink } from 'react-router-dom'

/**
 * Um item do menu lateral do painel.
 * `compact`: só ícone (rail no editor).
 */
export default function PainelNavItem({
  to,
  label,
  Icon,
  onNavigate,
  end = false,
  compact = false,
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      title={label}
      aria-label={label}
      className={({ isActive }) =>
        [
          'flex min-h-11 cursor-pointer items-center rounded-xl text-sm font-medium transition-colors',
          compact ? 'justify-center px-0' : 'gap-3 px-3',
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
          {!compact ? <span>{label}</span> : null}
        </>
      )}
    </NavLink>
  )
}
