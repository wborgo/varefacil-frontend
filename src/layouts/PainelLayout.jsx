import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import PainelHeader from '@/components/painel/PainelHeader.jsx'
import PainelSidebar from '@/components/painel/PainelSidebar.jsx'

/**
 * Master page do varejo (`/painel/*`).
 * Responsabilidade: casca (header + sidebar + área de conteúdo). Páginas entram via Outlet.
 */
export default function PainelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <PainelHeader onMenuClick={() => setSidebarOpen((v) => !v)} />

      <div className="flex min-h-0 flex-1">
        <PainelSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <main className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
