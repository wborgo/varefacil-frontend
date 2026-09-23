/**
 * Gráfico de linhas genérico (uma instância reutilizada no collapse).
 * `series`: [{ id, label, color?, points: [{ label, valor }] }]
 */
export default function AnaliticoLineChart({
  series = [],
  height = 220,
  className = '',
}) {
  const width = 640
  const pad = { t: 16, r: 12, b: 28, l: 36 }
  const innerW = width - pad.l - pad.r
  const innerH = height - pad.t - pad.b

  const all = series.flatMap((s) => s.points.map((p) => p.valor))
  const min = all.length ? Math.min(...all) : 0
  const max = all.length ? Math.max(...all) : 1
  const span = max - min || 1
  const labels = series[0]?.points?.map((p) => p.label) ?? []

  function pathFor(points) {
    return points
      .map((p, i) => {
        const x = pad.l + (i / Math.max(points.length - 1, 1)) * innerW
        const y = pad.t + innerH - ((p.valor - min) / span) * innerH
        return `${i === 0 ? 'M' : 'L'}${x} ${y}`
      })
      .join(' ')
  }

  const ticks = 4
  const grid = Array.from({ length: ticks + 1 }, (_, i) => {
    const t = i / ticks
    const y = pad.t + innerH * (1 - t)
    const val = Math.round(min + span * t)
    return { y, val }
  })

  return (
    <div className={['w-full overflow-x-auto', className].join(' ')}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[280px] text-accent"
        role="img"
        aria-label="Gráfico de visualizações e compartilhamentos"
      >
        {grid.map((g) => (
          <g key={g.y}>
            <line
              x1={pad.l}
              x2={width - pad.r}
              y1={g.y}
              y2={g.y}
              className="stroke-border"
              strokeWidth="1"
            />
            <text
              x={pad.l - 8}
              y={g.y + 3}
              textAnchor="end"
              className="fill-muted"
              fontSize="10"
            >
              {g.val}
            </text>
          </g>
        ))}

        {series.map((s) => (
          <path
            key={s.id}
            d={pathFor(s.points)}
            fill="none"
            stroke={s.color || 'currentColor'}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {labels.map((lab, i) => {
          if (i % 2 === 1 && labels.length > 8) return null
          const x = pad.l + (i / Math.max(labels.length - 1, 1)) * innerW
          return (
            <text
              key={`${lab}-${i}`}
              x={x}
              y={height - 8}
              textAnchor="middle"
              className="fill-muted"
              fontSize="9"
            >
              {lab}
            </text>
          )
        })}
      </svg>

      <ul className="mt-2 flex flex-wrap gap-4 text-xs text-muted">
        {series.map((s) => (
          <li key={s.id} className="inline-flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ background: s.color || 'var(--color-accent)' }}
              aria-hidden
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
