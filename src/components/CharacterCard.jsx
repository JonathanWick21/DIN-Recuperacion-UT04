import { Link } from 'react-router-dom';

export default function CharacterCard({ character }) {
  return (
    <Link 
      to={`/detalle/${character.id}`} 
      className="block h-full group focus:outline-none focus:ring-4 focus:ring-amber-500 rounded-xl rounded-b-xl"
      aria-label={`Ver archivo completo de ${character.nombre}`}
    >
      <article className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col transform group-hover:-translate-y-2">
        
        <div className="h-80 w-full overflow-hidden bg-slate-100 relative">
          <img 
            src={character.imagenUrl} 
            alt={`Ilustración de ${character.nombre}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 right-3 bg-slate-900/80 text-amber-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
            {character.mundo}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-grow border-t-4 border-amber-600">
          <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-amber-700 transition-colors">
            {character.nombre}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
            {character.descripcion}
          </p>
          
          <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-100">
            <span className="font-mono font-bold text-slate-900">{character.valor} Broams(moneda)</span>
          </div>
        </div>

      </article>
    </Link>
  );
}