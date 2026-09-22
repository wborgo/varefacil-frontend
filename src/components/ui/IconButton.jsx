/**
 * Botão só-ícone (chrome do painel, toolbars).
 * Sem lógica de negócio — quem monta decide onClick / disabled.
 */
export default function IconButton({
  label,
  children,
  onClick,
  disabled = false,
  className = '',
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={[
        'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl',
        'text-muted transition-colors',
        'hover:bg-border/60 hover:text-text',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}
