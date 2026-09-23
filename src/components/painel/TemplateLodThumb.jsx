/**
 * Thumb LOD de um template de catálogo — formas + logo, não o HTML final.
 */
export default function TemplateLodThumb({
  layout = 'lista',
  primary,
  secondary,
  logoSrc = '/images/logo_dark.png',
  className = '',
}) {
  return (
    <div
      className={[
        'relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border/80',
        className,
      ].join(' ')}
      style={{
        background: `linear-gradient(160deg, ${primary} 0%, ${secondary} 100%)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-black/10" />

      {/* Logo stub */}
      <div className="absolute top-3 left-3 flex h-7 items-center rounded-md bg-white/90 px-1.5 shadow-sm">
        <img
          src={logoSrc}
          alt=""
          className="h-4 w-auto max-w-[4.5rem] object-contain"
        />
      </div>

      {layout === 'capa' ? (
        <>
          <div className="absolute inset-x-4 top-[28%] h-[32%] rounded-lg bg-white/25 backdrop-blur-[1px]" />
          <div className="absolute inset-x-6 top-[64%] h-2 rounded-full bg-white/80" />
          <div className="absolute inset-x-10 top-[70%] h-1.5 rounded-full bg-white/50" />
          <div className="absolute inset-x-4 bottom-4 h-8 rounded-lg bg-white/90" />
        </>
      ) : null}

      {layout === 'lista' ? (
        <>
          <div className="absolute inset-x-3 top-12 h-14 rounded-lg bg-white/20" />
          <div className="absolute inset-x-3 top-[42%] flex flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex h-7 items-center gap-2 rounded-md bg-white/90 px-2"
              >
                <span className="size-4 shrink-0 rounded bg-black/15" />
                <span className="h-1.5 flex-1 rounded-full bg-black/20" />
                <span className="h-1.5 w-6 rounded-full bg-black/10" />
              </div>
            ))}
          </div>
        </>
      ) : null}

      {layout === 'grade' ? (
        <>
          <div className="absolute inset-x-3 top-12 h-8 rounded-md bg-white/25" />
          <div className="absolute inset-x-3 top-[32%] grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-md bg-white/85 p-1.5"
              >
                <div className="mb-1 h-[45%] rounded bg-black/10" />
                <div className="h-1 rounded-full bg-black/20" />
                <div className="mt-1 h-1 w-2/3 rounded-full bg-black/10" />
              </div>
            ))}
          </div>
        </>
      ) : null}

      {layout === 'promo' ? (
        <>
          <div
            className="absolute inset-x-0 top-10 flex h-9 items-center justify-center"
            style={{ background: secondary }}
          >
            <span className="h-2 w-16 rounded-full bg-white/90" />
          </div>
          <div className="absolute inset-x-3 top-[38%] flex flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-8 rounded-md bg-white/90 px-2 py-1.5"
              >
                <div className="h-1.5 w-3/4 rounded-full bg-black/20" />
                <div className="mt-1 h-1 w-1/3 rounded-full bg-black/10" />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
