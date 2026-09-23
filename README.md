# VareFacil — frontend

## Dev

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Se o hot reload falhar no Windows: reinicie o `npm run dev` uma vez após puxar mudanças de config. Imports devem bater o **casing** das pastas (`@/pages/Painel/...`, não `painel`). O Vite em Windows usa polling leve no watcher.

## Build

```bash
npm run build
npm run preview
```

## Stack

React + Vite · Tailwind v4 · Urbanist · Phosphor (`@phosphor-icons/react`)

Env: copiar `.env.example` → `.env.local` (`VITE_API_URL`).
