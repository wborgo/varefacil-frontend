import { useEffect, useState } from 'react'
import { applyTheme, resolveTheme, toggleTheme } from '@/lib/theme.js'

/** Tema claro/escuro — class `dark` no `<html>`, persistido em localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState(() => resolveTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  function toggle() {
    setTheme((current) => toggleTheme(current))
  }

  return { theme, toggle, isDark: theme === 'dark' }
}
