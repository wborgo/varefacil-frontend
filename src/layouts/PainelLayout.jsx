import { useState } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import PainelHeader from '@/components/painel/PainelHeader.jsx'
import PainelSidebar from '@/components/painel/PainelSidebar.jsx'

/**
 * Master page do varejo (`/painel/*`).
 * No editor de catálogo: menu do site em rail de ícones + main sem teto max-w.
 */
export default function PainelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const editingCatalogo = Boolean(useMatch('/painel/catalogo/novo'))

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <PainelHeader onMenuClick={() => setSidebarOpen((v) => !v)} />

      <div className="flex min-h-0 flex-1">
        <PainelSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          compact={editingCatalogo}
        />

        <div
          className={[
            'flex min-w-0 flex-1 flex-col',
            editingCatalogo ? 'p-0' : 'p-3 sm:p-4',
          ].join(' ')}
        >
          <main
            className={[
              'flex min-h-0 w-full flex-1 flex-col bg-surface',
              editingCatalogo
                ? 'rounded-none border-0 shadow-none'
                : 'mx-auto max-w-7xl rounded-2xl border border-border shadow-[var(--shadow-soft)]',
            ].join(' ')}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
