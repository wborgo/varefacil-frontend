import CatalogoAddTile from '@/components/painel/CatalogoAddTile.jsx'
import OfertaCard from '@/components/painel/OfertaCard.jsx'
import { mockProdutos } from '@/pages/painel/mockData.js'

export default function Produtos() {
  return (
    <div className="min-h-full p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          Produtos
        </h1>
        <p className="mt-1 text-sm text-muted">
          Itens do seu catálogo. Dados e fotos abaixo são mock temporário.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {mockProdutos.map((item) => (
          <li key={item.id}>
            <OfertaCard
              nome={item.nome}
              descricao={item.descricao}
              imagem={item.imagem}
              preco={item.preco}
            />
          </li>
        ))}
        <li>
          <CatalogoAddTile label="Novo produto" />
        </li>
      </ul>
    </div>
  )
}
