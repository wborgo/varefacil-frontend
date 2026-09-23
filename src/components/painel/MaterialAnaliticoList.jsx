import { createPortal } from 'react-dom'
import { CaretDownIcon, ShareNetworkIcon, EyeIcon } from '@phosphor-icons/react'
import AnaliticoLineChart from '@/components/painel/AnaliticoLineChart.jsx'
import Sparkline from '@/components/painel/Sparkline.jsx'

/**
 * Lista estilo “orders”: linha com sparkline; collapse com detalhe + slot do gráfico.
 * O gráfico é uma única instância (portal) no host da linha aberta.
 */
export default function MaterialAnaliticoList({
  items,
  expandedId,
  onToggle,
  chartHostEl,
  onChartHost,
  chartSeries,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-bg">
      <div className="hidden grid-cols-[minmax(0,1.6fr)_5.5rem_5.5rem_6.5rem_2rem] gap-3 border-b border-border px-4 py-2.5 text-xs font-semibold tracking-wide text-muted uppercase sm:grid">
        <span>Material</span>
        <span className="text-right">Views</span>
        <span className="text-right">Shares</span>
        <span className="text-center">14 dias</span>
        <span className="sr-only">Abrir</span>
      </div>

      <ul className="divide-y divide-border">
        {items.map((item) => {
          const open = expandedId === item.id
          return (
            <li key={item.id} className="bg-bg">
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                aria-expanded={open}
                className={[
                  'grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 text-left',
                  'sm:grid-cols-[minmax(0,1.6fr)_5.5rem_5.5rem_6.5rem_2rem] sm:gap-3 sm:px-4',
                  'transition-colors hover:bg-accent/5',
                  open ? 'bg-accent/5' : '',
                  'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent',
                ].join(' ')}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <img
                    src={item.imagem}
                    alt=""
                    className="size-11 shrink-0 rounded-lg object-cover sm:size-12"
                    loading="lazy"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-text">
                      {item.nome}
                    </span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                      <span>{item.tipo}</span>
                      <span aria-hidden>·</span>
                      <span>{item.status}</span>
                    </span>
                  </span>
                </span>

                <span className="hidden text-right text-sm font-medium text-text tabular-nums sm:block">
                  {item.views.toLocaleString('pt-BR')}
                </span>
                <span className="hidden text-right text-sm font-medium text-text tabular-nums sm:block">
                  {item.shares.toLocaleString('pt-BR')}
                </span>

                <span className="flex items-center justify-end gap-3 sm:justify-center">
                  <span className="inline-flex items-center gap-2 text-xs text-muted sm:hidden">
                    <EyeIcon size={14} aria-hidden />
                    {item.views}
                    <ShareNetworkIcon size={14} aria-hidden />
                    {item.shares}
                  </span>
                  <Sparkline
                    points={item.series.views}
                    className="text-accent"
                    width={88}
                    height={28}
                  />
                </span>

                <span className="flex justify-end sm:justify-center">
                  <CaretDownIcon
                    size={18}
                    className={[
                      'text-muted transition-transform',
                      open ? 'rotate-180' : '',
                    ].join(' ')}
                    aria-hidden
                  />
                </span>
              </button>

              {open ? (
                <div className="border-t border-border bg-surface px-3 py-4 sm:px-4">
                  <div className="mb-4 flex flex-wrap gap-4 text-sm">
                    <p className="inline-flex items-center gap-2 text-muted">
                      <EyeIcon size={16} className="text-accent" aria-hidden />
                      <span>
                        <strong className="font-semibold text-text">
                          {item.views.toLocaleString('pt-BR')}
                        </strong>{' '}
                        visualizações
                      </span>
                    </p>
                    <p className="inline-flex items-center gap-2 text-muted">
                      <ShareNetworkIcon
                        size={16}
                        className="text-accent"
                        aria-hidden
                      />
                      <span>
                        <strong className="font-semibold text-text">
                          {item.shares.toLocaleString('pt-BR')}
                        </strong>{' '}
                        compartilhamentos
                      </span>
                    </p>
                  </div>
                  <p className="mb-4 text-sm text-muted">{item.destaque}</p>
                  <div
                    ref={onChartHost}
                    className="min-h-[13rem] rounded-xl border border-border bg-bg p-3 sm:p-4"
                  />
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>

      {chartHostEl && chartSeries
        ? createPortal(
            <AnaliticoLineChart series={chartSeries} />,
            chartHostEl,
          )
        : null}
    </div>
  )
}
