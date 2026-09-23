const STORAGE_KEY = 'vf-catalogo-drafts'

export function loadCatalogoDrafts() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCatalogoDraft(draft) {
  const list = loadCatalogoDrafts().filter((d) => d.id !== draft.id)
  list.unshift(draft)
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 20)))
  return draft
}

export function getCatalogoDraft(id) {
  return loadCatalogoDrafts().find((d) => d.id === id) ?? null
}

export function createDraftId() {
  return `draft-${Date.now().toString(36)}`
}
