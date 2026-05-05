import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <Header />
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-5xl font-serif mb-6 text-slate-800">Explora la Inmensidad del Cosmere</h2>
                <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
                    Desde los valles de Roshar hasta las brumas de Scadrial. Descubre los secretos de Adonalsium y las Esquirlas.
                </p>
                <Link to="/catalogo" className="btn-cosmere">
                    Ver el Catálogo
                </Link>
            </section>
            <Footer />
        </>
    );
}