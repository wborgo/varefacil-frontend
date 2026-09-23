/**
 * Cabeçalho de página do painel estilo “product cards” (inspiração Gogo).
 * Título + subtítulo à esquerda; ações (ex. Novo) à direita.
 */
export default function PainelPageHeader({ title, description, children }) {
  return (
    <header className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-xl text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {children ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>
      ) : null}
    </header>
  )
}
