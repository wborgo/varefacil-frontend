import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PainelLayout from '@/layouts/PainelLayout.jsx'
import Catalogo from '@/pages/Painel/Catalogo.jsx'
import CatalogoEditor from '@/pages/Painel/CatalogoEditor.jsx'
import Home from '@/pages/Painel/Home.jsx'
import Produtos from '@/pages/Painel/Produtos.jsx'
import Servicos from '@/pages/Painel/Servicos.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/painel" replace />} />
        <Route path="/painel" element={<PainelLayout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="catalogo/novo" element={<CatalogoEditor />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="servicos" element={<Servicos />} />
        </Route>
        <Route path="*" element={<Navigate to="/painel" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
