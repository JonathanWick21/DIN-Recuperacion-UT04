import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-32 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-9xl font-serif font-bold text-slate-200 mb-4 drop-shadow-sm">
          404
        </h2>
        <h3 className="text-3xl font-bold text-amber-600 mb-4">
          Reino Desconocido
        </h3>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl">
          Parece que te has desviado del camino. La ruta a la que intentas acceder no existe en nuestros archivos.
        </p>
        
        <Link to="/" className="btn-cosmere">
          Volver a un lugar seguro
        </Link>
      </main>
      <Footer />
    </>
  );
}