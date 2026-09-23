import {
  BellIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SquaresFourIcon,
  SunIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import IconButton from '@/components/ui/IconButton.jsx'
import { useTheme } from '@/hooks/useTheme.js'

/**
 * Barra superior do painel.
 * Responsabilidade: chrome (marca, menu mobile, tema, ícones placeholder). Sem regras de domínio.
 */
export default function PainelHeader({ onMenuClick }) {
  const { isDark, toggle } = useTheme()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 sm:h-16 sm:px-4">
      <div className="flex min-w-0 items-center gap-1 sm:gap-2">
        <IconButton label="Abrir menu" onClick={onMenuClick} className="lg:hidden">
          <ListIcon size={22} weight="regular" aria-hidden />
        </IconButton>
        <Link
          to="/painel"
          className="flex h-9 shrink-0 items-center sm:h-11"
        >
          <img
            src={isDark ? '/images/logo_light.png' : '/images/logo_dark.png'}
            alt="VareFacil"
            className="h-full w-auto max-w-[12rem] object-contain object-left sm:max-w-[14rem]"
          />
        </Link>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <IconButton label="Buscar">
          <MagnifyingGlassIcon size={22} weight="regular" aria-hidden />
        </IconButton>
        <IconButton label="Atalhos" className="hidden sm:inline-flex">
          <SquaresFourIcon size={22} weight="regular" aria-hidden />
        </IconButton>
        <IconButton label="Notificações">
          <BellIcon size={22} weight="regular" aria-hidden />
        </IconButton>
        <IconButton
          label={isDark ? 'Usar tema claro' : 'Usar tema escuro'}
          onClick={toggle}
        >
          {isDark ? (
            <SunIcon size={22} weight="regular" aria-hidden />
          ) : (
            <MoonIcon size={22} weight="regular" aria-hidden />
          )}
        </IconButton>
        <IconButton label="Conta">
          <UserIcon size={22} weight="regular" aria-hidden />
        </IconButton>
      </div>
    </header>
  )
}
