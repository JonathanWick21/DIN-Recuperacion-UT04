import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Detail from './pages/Detail';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/catalogo' element={<Catalogue />} />
        <Route path='detalle/:id' element={<Detail />} />
        <Route path='admin' element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;