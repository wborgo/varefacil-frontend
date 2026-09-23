import { PencilSimpleIcon, ShareNetworkIcon } from '@phosphor-icons/react'
import IconButton from '@/components/ui/IconButton.jsx'

/**
 * Card de catálogo no grid — visual product-card (inspiração Gogo, UI própria).
 */
export default function CatalogoCard({
  nome,
  descricao,
  imagem,
  categoria,
  badge,
  onClick,
}) {
  return (
    <article
      className={[
        'group flex h-full w-full max-w-[320px] flex-col overflow-hidden rounded-2xl border border-border/80',
        'bg-bg shadow-[var(--shadow-soft)] transition-shadow',
        'hover:shadow-[0_8px_28px_rgb(0_0_0_/_0.1)]',
        'dark:hover:shadow-[0_8px_28px_rgb(0_0_0_/_0.45)]',
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] max-h-[240px] overflow-hidden bg-border/40">
        {imagem ? (
          <img
            src={imagem}
            alt=""
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : null}

        {badge ? (
          <span
            role="status"
            className={[
              'absolute top-3 left-3 rounded-lg px-2 py-0.5 text-xs font-semibold shadow-sm',
              badge === 'Rascunho'
                ? 'bg-surface/95 text-muted backdrop-blur-sm'
                : 'bg-accent text-white dark:text-bg',
            ].join(' ')}
          >
            {badge}
          </span>
        ) : null}

        <div
          className={[
            'absolute top-2 right-2 flex flex-col gap-1',
            'opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100',
          ].join(' ')}
        >
          <IconButton
            label={`Compartilhar ${nome}`}
            className="size-9 rounded-full border border-border bg-surface/95 text-text shadow-sm backdrop-blur-sm hover:bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <ShareNetworkIcon size={16} weight="bold" aria-hidden />
          </IconButton>
          <IconButton
            label={`Editar ${nome}`}
            className="size-9 rounded-full border border-border bg-surface/95 text-text shadow-sm backdrop-blur-sm hover:bg-surface"
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
          >
            <PencilSimpleIcon size={16} weight="bold" aria-hidden />
          </IconButton>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className={[
          'flex flex-1 cursor-pointer flex-col gap-1 p-4 text-left',
          'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent',
        ].join(' ')}
      >
        {categoria ? (
          <span className="text-xs font-medium tracking-wide text-muted uppercase">
            {categoria}
          </span>
        ) : null}
        <span className="line-clamp-2 text-base font-semibold text-text">
          {nome}
        </span>
        {descricao ? (
          <span className="line-clamp-2 text-sm text-muted">{descricao}</span>
        ) : null}
      </button>
    </article>
  )
}
