import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PainelLayout from '@/layouts/PainelLayout.jsx'
import Catalogo from '@/pages/painel/Catalogo.jsx'
import Produtos from '@/pages/painel/Produtos.jsx'
import Servicos from '@/pages/painel/Servicos.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/painel" replace />} />
        <Route path="/painel" element={<PainelLayout />}>
          <Route index element={<Navigate to="catalogo" replace />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="servicos" element={<Servicos />} />
        </Route>
        <Route path="*" element={<Navigate to="/painel" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
