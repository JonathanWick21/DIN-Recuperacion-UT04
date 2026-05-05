import { useParams, Link } from 'react-router-dom';
import { cosmereData } from '../data/cosmereData';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Detail() {
  const { id } = useParams();
  const character = cosmereData.find(item => item.id === parseInt(id));

  if (!character) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-20 min-h-screen text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Entrada no encontrada</h2>
          <p className="text-slate-600 mb-8">Ese archivo ha debido perderse en las brumas...</p>
          <Link to="/catalogo" className="text-amber-600 font-bold hover:underline">
            &larr; Volver al Archivo
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <nav className="mb-8">
          <Link to="/catalogo" className="text-slate-500 hover:text-amber-600 transition-colors font-semibold">
            &larr; Volver al Archivo
          </Link>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 md:flex">
          
          <div className="md:w-2/5 bg-slate-100">
            <img 
              src={character.imagenUrl} 
              alt={character.nombre} 
              className="w-full h-full object-cover object-center min-h-[400px]"
            />
          </div>

          <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="tag-mundo">
                {character.mundo}
              </span>
              <span className="tag-mundo">
                {character.tipo}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              {character.nombre}
            </h1>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">Archivos Históricos</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {character.descripcion}
              </p>
              
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Habilidad / Magia</p>
                  <p className="text-slate-800 font-medium">{character.habilidad}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Aparición</p>
                  <p className="text-slate-800 font-medium">{character.libro}</p>
                </div>
              </div>
            </div>

            <div className="mt-auto inline-block bg-amber-100 text-amber-900 px-6 py-3 rounded-lg font-mono font-bold text-lg w-fit border border-amber-200">
              Valor estimado: {character.valor} Broams
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}