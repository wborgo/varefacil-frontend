import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Frame 16:9 (monitor). Conteúdo em `designWidth` (Full HD) escala para a
 * largura do box; se a página for mais alta, scroll dentro do 16:9.
 */
export default function ScaledDesktopPreview({
  children,
  designWidth = 1920,
  className = '',
}) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [contentHeight, setContentHeight] = useState(0)

  useLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return undefined

    function measure() {
      const avail = outer.clientWidth
      if (avail <= 0) return
      setScale(Math.min(1, avail / designWidth))
      setContentHeight(inner.scrollHeight)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(outer)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [designWidth, children])

  const pct = Math.round(scale * 100)
  const scaledW = designWidth * scale
  const scaledH = contentHeight * scale

  return (
    <div className={['mx-auto w-full max-w-4xl', className].join(' ')}>
      <div
        ref={outerRef}
        className="aspect-video w-full overflow-auto rounded-2xl border border-border bg-neutral-900 shadow-[var(--shadow-soft)]"
      >
        <div
          className="relative mx-auto overflow-hidden bg-white"
          style={{
            width: scaledW || '100%',
            height: scaledH || undefined,
            minHeight: '100%',
          }}
        >
          <div
            ref={innerRef}
            className="origin-top-left bg-white"
            style={{
              width: designWidth,
              transform: `scale(${scale})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted">
        Monitor <strong className="font-medium text-text">16:9</strong> · página
        em {designWidth}px · zoom {pct}%
      </p>
    </div>
  )
}
