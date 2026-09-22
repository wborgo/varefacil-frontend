const STORAGE_KEY = 'vf-theme'

export function getStoredTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'light' || value === 'dark') return value
  } catch {
    /* private mode / blocked */
  }
  return null
}

export function resolveTheme(stored = getStoredTheme()) {
  if (stored) return stored
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

export function toggleTheme(current = resolveTheme()) {
  const next = current === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
