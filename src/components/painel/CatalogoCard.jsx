/**
 * Card de um catálogo existente no grid do painel.
 * Responsabilidade: exibir capa + resumo; clique fica a cargo do pai.
 */
export default function CatalogoCard({ nome, descricao, imagem, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex min-h-40 cursor-pointer flex-col overflow-hidden rounded-2xl border border-border',
        'bg-bg text-left transition-colors',
        'hover:border-accent/40 hover:bg-accent/5',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
      ].join(' ')}
    >
      {imagem ? (
        <img
          src={imagem}
          alt=""
          className="h-28 w-full object-cover sm:h-32"
          loading="lazy"
        />
      ) : (
        <div className="h-28 w-full bg-border/40 sm:h-32" aria-hidden />
      )}
      <span className="flex flex-1 flex-col gap-1 p-4">
        <span className="line-clamp-2 text-base font-semibold text-text">{nome}</span>
        {descricao ? (
          <span className="line-clamp-2 text-sm text-muted">{descricao}</span>
        ) : null}
      </span>
    </button>
  )
}
