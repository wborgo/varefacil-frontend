/**
 * Mini gráfico de linha (sparkline) — SVG puro, sem lib.
 * `points`: [{ valor }]
 */
export default function Sparkline({
  points = [],
  width = 96,
  height = 32,
  className = '',
  stroke = 'currentColor',
}) {
  if (!points.length) {
    return <div className={className} style={{ width, height }} aria-hidden />
  }

  const vals = points.map((p) => p.valor)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const span = max - min || 1
  const pad = 2

  const coords = vals.map((v, i) => {
    const x = pad + (i / Math.max(vals.length - 1, 1)) * (width - pad * 2)
    const y = height - pad - ((v - min) / span) * (height - pad * 2)
    return `${x},${y}`
  })

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={coords.join(' ')}
      />
    </svg>
  )
}
