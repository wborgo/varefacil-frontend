import CatalogoAddTile from '@/components/painel/CatalogoAddTile.jsx'
import CatalogoCard from '@/components/painel/CatalogoCard.jsx'
import { mockCatalogos } from '@/pages/painel/mockData.js'

export default function Catalogo() {
  return (
    <div className="min-h-full p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          Catálogos
        </h1>
        <p className="mt-1 text-sm text-muted">
          Páginas compartilháveis do seu negócio. O card com + cria um novo.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {mockCatalogos.map((item) => (
          <li key={item.id}>
            <CatalogoCard
              nome={item.nome}
              descricao={item.descricao}
              imagem={item.imagem}
            />
          </li>
        ))}
        <li>
          <CatalogoAddTile />
        </li>
      </ul>
    </div>
  )
}
