import Header from '../components/Header';
import Footer from '../components/Footer';
import CharacterCard from '../components/CharacterCard';
import { useApi } from '../hooks/useApi';

export default function Catalogue() {

const { data: personajes, loading, error } = useApi();

if (loading) return <p className="text-center py-20">Leyendo los archivos del Cosmere...</p>;
  if (error) return <p className="text-center py-20 text-red-500">Error: {error}</p>;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-amber-600 pl-4" tabIndex="0">
          Archivo de Personajes y Objetos
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" role="list">
          {personajes.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}