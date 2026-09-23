import { useMemo, useState } from 'react'
import {
  EyeIcon,
  HouseIcon,
  LinkSimpleIcon,
  ShareNetworkIcon,
  StackIcon,
} from '@phosphor-icons/react'
import MaterialAnaliticoList from '@/components/painel/MaterialAnaliticoList.jsx'
import PainelPageHeader from '@/components/painel/PainelPageHeader.jsx'
import {
  mockKpisHome,
  mockMateriaisAnalitico,
  mockOrigemAcessos,
} from '@/pages/Painel/mockAnalitico.js'
import { mockEstabelecimento } from '@/pages/Painel/mockData.js'

const KPI_ICONS = {
  views: EyeIcon,
  shares: ShareNetworkIcon,
  home: HouseIcon,
  materiais: StackIcon,
}

export default function Home() {
  const [expandedId, setExpandedId] = useState(null)
  const [chartHostEl, setChartHostEl] = useState(null)

  const selected = useMemo(
    () => mockMateriaisAnalitico.find((m) => m.id === expandedId) ?? null,
    [expandedId],
  )

  const chartSeries = useMemo(() => {
    if (!selected) return null
    return [
      {
        id: 'views',
        label: 'Visualizações',
        color: 'var(--color-accent)',
        points: selected.series.views,
      },
      {
        id: 'shares',
        label: 'Compartilhamentos',
        color: '#64748b',
        points: selected.series.shares,
      },
    ]
  }, [selected])

  function handleToggle(id) {
    setExpandedId((cur) => {
      if (cur === id) {
        setChartHostEl(null)
        return null
      }
      setChartHostEl(null)
      return id
    })
  }

  return (
    <div className="min-h-full p-4 sm:p-6">
      <PainelPageHeader
        title="Início"
        description={`${mockEstabelecimento.nome} — visão simples do que está performando. Números mock da primeira entrega.`}
      />

      <section
        aria-label="Indicadores"
        className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {mockKpisHome.map((kpi) => {
          const Icon = KPI_ICONS[kpi.id] ?? LinkSimpleIcon
          return (
            <article
              key={kpi.id}
              className="rounded-2xl border border-border bg-bg p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {kpi.label}
                </p>
                <span className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={18} weight="duotone" aria-hidden />
                </span>
              </div>
              <p className="text-2xl font-semibold tracking-tight text-text tabular-nums">
                {typeof kpi.valor === 'number'
                  ? kpi.valor.toLocaleString('pt-BR')
                  : kpi.valor}
              </p>
              <p
                className={[
                  'mt-1 text-xs font-medium',
                  kpi.positivo ? 'text-accent' : 'text-muted',
                ].join(' ')}
              >
                {kpi.delta}
              </p>
              <p className="mt-2 text-xs text-muted">{kpi.detalhe}</p>
            </article>
          )
        })}
      </section>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section aria-labelledby="home-materiais-title">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2
                id="home-materiais-title"
                className="text-base font-semibold text-text"
              >
                Materiais em desempenho
              </h2>
              <p className="mt-0.5 text-sm text-muted">
                Toque numa linha para ver o período completo. O gráfico é o
                mesmo bloco — só muda o material.
              </p>
            </div>
          </div>

          <MaterialAnaliticoList
            items={mockMateriaisAnalitico}
            expandedId={expandedId}
            onToggle={handleToggle}
            chartHostEl={chartHostEl}
            onChartHost={setChartHostEl}
            chartSeries={chartSeries}
          />
        </section>

        <section
          aria-labelledby="home-origem-title"
          className="rounded-2xl border border-border bg-bg p-4 shadow-[var(--shadow-soft)]"
        >
          <h2
            id="home-origem-title"
            className="text-base font-semibold text-text"
          >
            De onde vieram os acessos
          </h2>
          <p className="mt-1 text-sm text-muted">
            Na direção da plataforma, a busca local entra aqui. Nesta entrega
            mockamos a home do negócio.
          </p>

          <ul className="mt-5 flex flex-col gap-4">
            {mockOrigemAcessos.map((row) => (
              <li key={row.id}>
                <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium text-text">{row.label}</span>
                  <span className="tabular-nums text-muted">
                    {row.valor.toLocaleString('pt-BR')} · {row.pct}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-border/70">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
