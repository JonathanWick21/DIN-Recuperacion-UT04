import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header className="bg-slate-900 text-amber-400 border-b-2 border-amber-600 shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold tracking-tighter">
          <Link to="/">COSMERE<span className="text-white">WIKI</span></Link>
        </h1>
        <nav aria-label="Menú principal">
          <ul className="flex gap-8 font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo</Link></li>
            <li><Link to="/admin" className="text-amber-200 hover:text-white">Admin</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}