/**
 * Preview HTML do catálogo — `--brand-primary` / `--brand-secondary`.
 * Root é `@container`: a quebra responde à largura do frame (celular vs desktop).
 */
export default function CatalogoHtmlPreview({
  layout = 'lista',
  titulo,
  subtitulo,
  estabelecimento,
  items = [],
  primary,
  secondary,
  logoSrc = '/images/logo_light.png',
}) {
  const style = {
    '--brand-primary': primary,
    '--brand-secondary': secondary,
  }

  return (
    <div
      className="@container min-h-full overflow-hidden bg-white text-[15px] text-neutral-900"
      style={style}
    >
      {layout === 'promo' ? (
        <div
          className="px-4 py-2 text-center text-sm font-bold text-white @[40rem]:px-8 @[40rem]:text-base"
          style={{ background: 'var(--brand-secondary)' }}
        >
          Oferta da semana · Dr Brilho
        </div>
      ) : null}

      <header
        className={[
          'relative overflow-hidden px-4 pb-6 pt-5 text-white',
          '@[40rem]:flex @[40rem]:items-end @[40rem]:justify-between @[40rem]:gap-8 @[40rem]:px-8 @[40rem]:pb-8 @[40rem]:pt-8',
        ].join(' ')}
        style={{
          background:
            layout === 'capa'
              ? `linear-gradient(165deg, var(--brand-primary), var(--brand-secondary))`
              : 'var(--brand-primary)',
        }}
      >
        <div className="min-w-0 @[40rem]:max-w-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex h-8 items-center rounded-md bg-white/95 px-2">
              <img
                src={logoSrc}
                alt=""
                className="h-5 w-auto max-w-[5.5rem] object-contain brightness-0"
              />
            </span>
            <span className="text-xs font-medium text-white/85 @[40rem]:text-sm">
              {estabelecimento}
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight @[40rem]:text-3xl">
            {titulo}
          </h1>
          {subtitulo ? (
            <p className="mt-1 text-sm text-white/90 @[40rem]:text-base">
              {subtitulo}
            </p>
          ) : null}
        </div>
        {layout === 'capa' ? (
          <div className="mt-5 h-28 rounded-2xl bg-white/20 backdrop-blur-[1px] @[40rem]:mt-0 @[40rem]:h-40 @[40rem]:w-72 @[40rem]:shrink-0" />
        ) : null}
      </header>

      <div className="px-3 py-4 @[40rem]:px-8 @[40rem]:py-6">
        {layout === 'grade' ? (
          <ul className="grid grid-cols-2 gap-2 @[40rem]:grid-cols-3 @[40rem]:gap-4 @[56rem]:grid-cols-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
              >
                {item.imagem ? (
                  <img
                    src={item.imagem}
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div
                    className="aspect-square"
                    style={{ background: 'var(--brand-primary)', opacity: 0.15 }}
                  />
                )}
                <div className="p-2 @[40rem]:p-3">
                  <p className="line-clamp-2 text-xs font-semibold @[40rem]:text-sm">
                    {item.nome}
                  </p>
                  {item.preco ? (
                    <p
                      className="mt-1 text-xs font-bold @[40rem]:text-sm"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {item.preco}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul
            className={[
              'flex flex-col gap-2',
              '@[40rem]:grid @[40rem]:grid-cols-2 @[40rem]:gap-3',
              layout === 'lista' ? '@[56rem]:grid-cols-2' : '',
            ].join(' ')}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-2 shadow-sm @[40rem]:p-3"
              >
                {item.imagem ? (
                  <img
                    src={item.imagem}
                    alt=""
                    className="size-14 shrink-0 rounded-lg object-cover @[40rem]:size-20"
                  />
                ) : (
                  <div
                    className="size-14 shrink-0 rounded-lg @[40rem]:size-20"
                    style={{ background: 'var(--brand-secondary)', opacity: 0.25 }}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold @[40rem]:text-base">
                    {item.nome}
                  </p>
                  {item.descricao ? (
                    <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500 @[40rem]:text-sm">
                      {item.descricao}
                    </p>
                  ) : null}
                  {item.preco ? (
                    <p
                      className="mt-1 text-sm font-bold"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {item.preco}
                      {item.precoDe ? (
                        <span className="ml-2 text-xs font-normal text-neutral-400 line-through">
                          {item.precoDe}
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}

        {!items.length ? (
          <p className="rounded-xl border border-dashed border-neutral-300 px-3 py-8 text-center text-sm text-neutral-500">
            Selecione produtos ou serviços ao lado para montar o catálogo.
          </p>
        ) : null}
      </div>

      <footer className="border-t border-neutral-100 px-4 py-4 text-center text-xs text-neutral-400 @[40rem]:px-8">
        Feito com VareFacil · link compartilhável
      </footer>
    </div>
  )
}
