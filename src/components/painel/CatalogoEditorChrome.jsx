import {
  ArrowLeftIcon,
  ChartBarIcon,
  PaletteIcon,
  PlusIcon,
  SquaresFourIcon,
  TrashIcon,
  XIcon,
} from '@phosphor-icons/react'
import {
  BLOCK_CATALOG,
  LOGO_OPTIONS,
  blockMeta,
} from '@/pages/Painel/catalogoBlocks.js'

/** Ferramentas do topo — Configurações primeiro (dados do catálogo). */
const TOOLS = [
  { id: 'config', label: 'Configurações', Icon: ChartBarIcon },
  { id: 'cores', label: 'Cores', Icon: PaletteIcon },
]

/**
 * Rail do editor: ao colapsar, só estreita — ícones mantêm a mesma posição.
 * Seta: fecha o painel secundário e reexpande o rail.
 * Ícone “Blocos”: no colapsado, mesmo atalho de voltar ao menu expandido.
 */
export default function CatalogoEditorChrome({
  tool,
  onTool,
  selectedBlockId,
  onSelectBlock,
  blocks,
  onAddBlock,
  onRemoveBlock,
  onUpdateBlockProps,
  colors,
  onColor,
  saveBrand,
  onSaveBrand,
  titulo,
  subtitulo,
  onTitulo,
  onSubtitulo,
  logoSrc,
  onLogoSrc,
  itemIds,
  onToggleItem,
  pool,
  published,
  onPublished,
  templateNome,
}) {
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) ?? null
  const showSecondary =
    tool === 'config' || tool === 'cores' || selectedBlock != null
  const compact = showSecondary

  function closeSecondary() {
    onSelectBlock(null)
    onTool('blocos')
  }

  function openTool(id) {
    onSelectBlock(null)
    onTool(id)
  }

  function openBlock(id) {
    onTool('bloco')
    onSelectBlock(id)
  }

  const secondaryTitle =
    tool === 'config'
      ? 'Configurações'
      : tool === 'cores'
        ? 'Cores'
        : selectedBlock
          ? blockMeta(selectedBlock.type).label
          : 'Blocos'

  return (
    <div className="flex min-h-0 shrink-0">
      <aside
        className={[
          'flex flex-col overflow-hidden border-r border-border bg-surface transition-[width] duration-200',
          compact ? 'w-[3.75rem]' : 'w-[17.5rem]',
        ].join(' ')}
      >
        <div className="flex h-[3.75rem] shrink-0 items-center gap-2 border-b border-border px-2">
          <button
            type="button"
            onClick={closeSecondary}
            disabled={!compact}
            className={[
              'inline-flex size-10 shrink-0 items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              compact
                ? 'cursor-pointer text-muted hover:bg-border/60 hover:text-text'
                : 'cursor-default text-muted/35',
            ].join(' ')}
            aria-label="Fechar painel e expandir menu"
            title={compact ? 'Voltar ao menu' : undefined}
          >
            <ArrowLeftIcon size={20} weight="bold" aria-hidden />
          </button>
          <div
            className={[
              'min-w-0 flex-1 transition-opacity duration-150',
              compact ? 'pointer-events-none opacity-0' : 'opacity-100',
            ].join(' ')}
          >
            <p className="truncate text-sm font-semibold whitespace-nowrap text-text">
              Montar catálogo
            </p>
            <p className="truncate text-xs whitespace-nowrap text-muted">
              {templateNome}
            </p>
          </div>
        </div>

        <nav
          className="flex flex-col gap-1 p-2"
          aria-label="Ferramentas do editor"
        >
          {TOOLS.map((t) => {
            const active = tool === t.id
            const Icon = t.Icon
            return (
              <button
                key={t.id}
                type="button"
                title={t.label}
                aria-label={t.label}
                aria-pressed={active}
                onClick={() => openTool(t.id)}
                className={[
                  'flex h-11 cursor-pointer items-center gap-3 rounded-xl px-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-accent/12 text-accent'
                    : 'text-muted hover:bg-border/50 hover:text-text',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                ].join(' ')}
              >
                <Icon
                  size={22}
                  weight={active ? 'fill' : 'regular'}
                  className="shrink-0"
                  aria-hidden
                />
                <span className="truncate whitespace-nowrap">{t.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex min-h-0 flex-1 flex-col border-t border-border">
          <div className="flex h-11 shrink-0 items-center gap-2 px-2.5">
            <button
              type="button"
              onClick={closeSecondary}
              disabled={!compact}
              title={compact ? 'Voltar aos blocos' : undefined}
              aria-label={compact ? 'Voltar aos blocos' : 'Blocos'}
              className={[
                'inline-flex size-8 shrink-0 items-center justify-center rounded-lg',
                compact
                  ? 'cursor-pointer text-accent hover:bg-accent/10'
                  : 'cursor-default text-accent',
              ].join(' ')}
            >
              <SquaresFourIcon size={18} weight="fill" aria-hidden />
            </button>
            <p
              className={[
                'truncate text-sm font-semibold whitespace-nowrap text-text transition-opacity',
                compact ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            >
              Blocos
            </p>
          </div>

          <ul className="min-h-0 flex-1 space-y-1 overflow-x-hidden overflow-y-auto px-2 pb-2">
            {blocks.map((blk) => {
              const meta = blockMeta(blk.type)
              const Icon = meta.Icon
              const active = selectedBlockId === blk.id

              if (compact) {
                return (
                  <li key={blk.id}>
                    <button
                      type="button"
                      onClick={() => openBlock(blk.id)}
                      title={meta.label}
                      aria-label={meta.label}
                      aria-pressed={active}
                      className={[
                        'flex size-11 cursor-pointer items-center justify-center rounded-xl border transition-colors',
                        active
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border bg-bg text-muted hover:bg-border/40 hover:text-text',
                      ].join(' ')}
                    >
                      <Icon
                        size={22}
                        weight={active ? 'fill' : 'regular'}
                        aria-hidden
                      />
                    </button>
                  </li>
                )
              }

              return (
                <li key={blk.id}>
                  <div
                    className={[
                      'flex h-11 items-center gap-1 rounded-xl border px-1',
                      active
                        ? 'border-accent bg-accent/10'
                        : 'border-border bg-bg',
                    ].join(' ')}
                  >
                    <button
                      type="button"
                      onClick={() => openBlock(blk.id)}
                      title={meta.label}
                      aria-label={meta.label}
                      aria-pressed={active}
                      className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1.5 text-left hover:bg-border/30"
                    >
                      <span
                        className={[
                          'inline-flex size-8 shrink-0 items-center justify-center rounded-lg',
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'bg-border/50 text-muted',
                        ].join(' ')}
                      >
                        <Icon
                          size={18}
                          weight={active ? 'fill' : 'regular'}
                          aria-hidden
                        />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium whitespace-nowrap text-text">
                        {meta.label}
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Remover ${meta.label}`}
                      onClick={() => onRemoveBlock(blk.id)}
                      className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-border/60 hover:text-text"
                    >
                      <TrashIcon size={16} aria-hidden />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div
            className={[
              'shrink-0 border-t border-border p-2 transition-opacity',
              compact
                ? 'pointer-events-none h-0 overflow-hidden border-0 p-0 opacity-0'
                : 'opacity-100',
            ].join(' ')}
          >
            <p className="mb-1.5 px-1 text-[0.65rem] font-semibold tracking-wide text-muted uppercase">
              Adicionar bloco
            </p>
            <ul className="flex max-h-36 flex-col gap-1 overflow-y-auto">
              {BLOCK_CATALOG.map((b) => {
                const Icon = b.Icon
                return (
                  <li key={b.type}>
                    <button
                      type="button"
                      onClick={() => onAddBlock(b.type)}
                      className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-muted hover:bg-accent/10 hover:text-text"
                    >
                      <Icon size={14} aria-hidden />
                      <PlusIcon size={12} weight="bold" aria-hidden />
                      <span className="truncate font-medium">{b.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </aside>

      {showSecondary ? (
        <aside className="flex w-[18.5rem] shrink-0 flex-col border-r border-border bg-surface">
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-3">
            <p className="text-sm font-semibold text-text">{secondaryTitle}</p>
            <button
              type="button"
              aria-label="Fechar painel"
              onClick={closeSecondary}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-xl text-muted hover:bg-border/60 hover:text-text"
            >
              <XIcon size={18} weight="bold" aria-hidden />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {tool === 'cores' ? (
              <CoresPanel
                colors={colors}
                onColor={onColor}
                saveBrand={saveBrand}
                onSaveBrand={onSaveBrand}
              />
            ) : null}

            {tool === 'config' ? (
              <ConfigPanel
                published={published}
                onPublished={onPublished}
                titulo={titulo}
              />
            ) : null}

            {selectedBlock?.type === 'cabecalho' ? (
              <CabecalhoPanel
                titulo={titulo}
                subtitulo={subtitulo}
                onTitulo={onTitulo}
                onSubtitulo={onSubtitulo}
                logoSrc={logoSrc}
                onLogoSrc={onLogoSrc}
              />
            ) : null}

            {selectedBlock?.type === 'lista_itens' ||
            selectedBlock?.type === 'grade_itens' ? (
              <ItensPanel
                itemIds={itemIds}
                onToggleItem={onToggleItem}
                pool={pool}
              />
            ) : null}

            {selectedBlock?.type === 'faixa_promo' ||
            selectedBlock?.type === 'texto' ||
            selectedBlock?.type === 'rodape' ? (
              <TextoBlockPanel
                value={selectedBlock.props?.texto || ''}
                onChange={(texto) =>
                  onUpdateBlockProps(selectedBlock.id, { texto })
                }
                label={
                  selectedBlock.type === 'faixa_promo'
                    ? 'Texto da faixa'
                    : selectedBlock.type === 'rodape'
                      ? 'Texto do rodapé'
                      : 'Texto'
                }
              />
            ) : null}
          </div>
        </aside>
      ) : null}
    </div>
  )
}

function CoresPanel({ colors, onColor, saveBrand, onSaveBrand }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Troque as cores durante a edição — o preview atualiza na hora.
      </p>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Principal
        </span>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colors.primary}
            onChange={(e) => onColor('primary', e.target.value)}
            className="size-10 cursor-pointer rounded-lg border border-border bg-transparent"
          />
          <span className="font-mono text-xs text-muted">{colors.primary}</span>
        </div>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Destaque
        </span>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colors.secondary}
            onChange={(e) => onColor('secondary', e.target.value)}
            className="size-10 cursor-pointer rounded-lg border border-border bg-transparent"
          />
          <span className="font-mono text-xs text-muted">{colors.secondary}</span>
        </div>
      </label>
      <label className="flex cursor-pointer items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={saveBrand}
          onChange={(e) => onSaveBrand(e.target.checked)}
          className="mt-1 size-4 accent-[var(--color-accent)]"
        />
        <span>
          Usar na minha identidade <span className="text-xs">(mock)</span>
        </span>
      </label>
    </div>
  )
}

function ConfigPanel({ published, onPublished, titulo }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-1 text-xs font-semibold text-muted uppercase">
          Publicação
        </p>
        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-bg px-3 py-3">
          <span className="text-sm font-medium text-text">Publicado</span>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => onPublished(e.target.checked)}
            className="size-4 accent-[var(--color-accent)]"
          />
        </label>
        <p className="mt-1.5 text-xs text-muted">
          {published
            ? 'Visível no link compartilhável (mock).'
            : 'Rascunho — só quem edita vê.'}
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-muted uppercase">
          Métricas
        </p>
        <p className="mb-2 text-xs text-muted">
          Disponível com mais dados depois de publicar. Preview só para
          conhecer o painel.
        </p>
        <ul className="grid grid-cols-2 gap-2">
          <li className="rounded-xl border border-border bg-bg px-3 py-3">
            <p className="text-[0.65rem] font-semibold tracking-wide text-muted uppercase">
              Acessos
            </p>
            <p className="mt-1 text-xl font-bold text-text">128</p>
            <p className="text-[0.65rem] text-muted">últimos 7 dias</p>
          </li>
          <li className="rounded-xl border border-border bg-bg px-3 py-3">
            <p className="text-[0.65rem] font-semibold tracking-wide text-muted uppercase">
              Cliques
            </p>
            <p className="mt-1 text-xl font-bold text-text">34</p>
            <p className="text-[0.65rem] text-muted">em itens</p>
          </li>
        </ul>
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold text-muted uppercase">
          Nome interno
        </p>
        <p className="rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-text">
          {titulo}
        </p>
        <p className="mt-1 text-xs text-muted">
          Edite o título no bloco Cabeçalho.
        </p>
      </div>
    </div>
  )
}

function CabecalhoPanel({
  titulo,
  subtitulo,
  onTitulo,
  onSubtitulo,
  logoSrc,
  onLogoSrc,
}) {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Título
        </span>
        <input
          value={titulo}
          onChange={(e) => onTitulo(e.target.value)}
          className="h-11 w-full rounded-xl border border-border bg-bg px-3 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-muted uppercase">
          Slogan
        </span>
        <textarea
          value={subtitulo}
          onChange={(e) => onSubtitulo(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>
      <div>
        <p className="mb-2 text-xs font-semibold text-muted uppercase">Logo</p>
        <ul className="grid grid-cols-2 gap-2">
          {LOGO_OPTIONS.map((opt) => {
            const on = logoSrc === opt.src
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => onLogoSrc(opt.src)}
                  className={[
                    'flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border px-2 py-3',
                    on
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-bg hover:bg-border/30',
                  ].join(' ')}
                >
                  <span className="flex h-10 w-full items-center justify-center rounded-lg bg-white px-2">
                    <img
                      src={opt.src}
                      alt=""
                      className="h-6 w-auto max-w-full object-contain"
                    />
                  </span>
                  <span className="text-xs font-medium text-text">
                    {opt.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function ItensPanel({ itemIds, onToggleItem, pool }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Marque produtos e serviços — eles aparecem neste bloco no preview.
      </p>
      <ul className="flex max-h-[28rem] flex-col gap-1 overflow-y-auto rounded-xl border border-border bg-bg p-2">
        {pool.map((item) => {
          const on = itemIds.includes(item.id)
          return (
            <li key={item.id}>
              <label
                className={[
                  'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm',
                  on ? 'bg-accent/10 text-text' : 'text-muted hover:bg-border/40',
                ].join(' ')}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => onToggleItem(item.id)}
                  className="size-4 accent-[var(--color-accent)]"
                />
                <span className="min-w-0 flex-1 truncate font-medium">
                  {item.nome}
                </span>
                <span className="shrink-0 text-[0.65rem] uppercase text-muted">
                  {item.kind === 'servico' ? 'serv.' : 'prod.'}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function TextoBlockPanel({ value, onChange, label }) {
  return (
    <label className="block space-y-2">
      <span className="block text-xs font-semibold text-muted uppercase">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />
    </label>
  )
}
