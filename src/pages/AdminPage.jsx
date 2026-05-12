import { useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useApi } from "../hooks/useApi";

export default function AdminPage() {

    const { agregarPersonaje, loading, error: apiError } = useApi();

    const [formData, setFormData] = useState({
        nombre: '',
        mundo: '',
        tipo: '',
        habilidad: '',
        libro: '',
        descripcion: '',
        valor: '',
        imagenUrl: ''
    });

    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState(false);

    const nombreRef = useRef(null);
    const mundoRef = useRef(null);
    const valorRef = useRef(null);
    const tipoRef = useRef(null);
    const habilidadRef = useRef(null);
    const descripcionRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errores[name]) {
            setErrores({ ...errores, [name]: null });
        }
        setExito(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempErrors = {};

        if (formData.nombre.trim().length < 3) {
            tempErrors.nombre = 'El nombre debe tener al menos 3 caracteres.';
        } else if (formData.nombre.trim().charAt(0) !== formData.nombre.trim().charAt(0).toUpperCase()){
            tempErrors.nombre = 'El nombre debe empezar por mayúscula.'
        }

        if (!formData.mundo) {
            tempErrors.mundo = 'Debes especificar un planeta de origen (ej. Roshar, Scadrial o incluso Desconocido).';
        }

        if (!formData.tipo){
            tempErrors.tipo = 'Debes elegir un valor para el tipo.';
        }

        if (formData.habilidad.trim().length < 5){
            tempErrors.habilidad = 'La habilidad debe ser más detallada.';
        }

        //El libro lo voy a poner que no haga falta ponerlo

        if (formData.descripcion.trim().length < 15){
            tempErrors.descripcion = 'La descripción debe ser detallada.';
        }

        if (!formData.valor || isNaN(formData.valor) || Number(formData.valor) < 0) {
            tempErrors.valor = 'El valor debe ser un número positivo.';
        }

        //La imagen tambien opcional

        if (Object.keys(tempErrors).length > 0) {
            setErrores(tempErrors);

            if (tempErrors.nombre) {
                nombreRef.current.focus();
            } else if (tempErrors.mundo) {
                mundoRef.current.focus();
            } else if (tempErrors.tipo) {
                tipoRef.current.focus();
            } else if (tempErrors.habilidad) {
                habilidadRef.current.focus();
            } else if (tempErrors.descripcion) {
                descripcionRef.current.focus();
            } else if (tempErrors.valor) {
                valorRef.current.focus();
            }
            return;
        }

        console.log("Nueva entrada añadida al archivo:", formData);
        await agregarPersonaje(formData);
        setExito(true);
        setFormData({ nombre: '', mundo: '', tipo: '', habilidad: '', libro: '', descripcion: '', valor: '', imagenUrl: '' });
    };

    const hayErrores = Object.values(errores).some(error => error !== null && error !== undefined);
    

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-12 min-h-screen flex justify-center">
                <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-slate-200 h-fit">
                    <header className="mb-8 border-b border-slate-200 pb-4">
                        <h2 id="titulo-formulario" className="text-3xl font-serif font-bold text-slate-900" tabIndex="0">
                            Añadir al archivo
                        </h2>
                        <p className="text-slate-600 mt-2" tabIndex="0">
                            Registra un nuevo personaje o artefacto en el archivo
                        </p>
                    </header>

                    {exito && (
                        <div
                            tabIndex="0"
                            className="bg-green-50 border-l-4 border-green-600 text-green-800 p-4 mb-6 rounded-r focus:outline-none focus:ring-2 focus:ring-green-500"
                            role="status"
                            aria-live="polite"
                        >
                            <p className="font-bold">¡Entrada registrada con éxito!</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-labelledby="titulo-formulario">
                        <div>
                            <label htmlFor="nombre" className="block text-slate-800 font-bold mb-2">
                                Nombre de la Entrada *
                            </label>
                            <input
                                type="text"
                                required
                                ref={nombreRef}
                                id="nombre"
                                name="nombre"
                                autoComplete="off"
                                value={formData.nombre}
                                onChange={handleChange}
                                aria-invalid={errores.nombre ? "true" : "false"}
                                aria-describedby={errores.nombre ? "nombre-error" : undefined}
                                className={`w-full px-4 py-3 rounded-lg border ${errores.nombre ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 transition-colors`}
                            />
                            {errores.nombre && (
                                <p id="nombre-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1" aria-live="polite">
                                    {errores.nombre}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="mundo" className="block text-slate-800 font-bold mb-2">
                                Planeta de Origen *
                            </label>
                            <input
                                type="text"
                                required
                                ref={mundoRef}
                                id="mundo"
                                name="mundo"
                                autoComplete="off"
                                value={formData.mundo}
                                onChange={handleChange}
                                aria-invalid={errores.mundo ? "true" : "false"}
                                aria-describedby={errores.mundo ? "mundo-error" : undefined}
                                className={`w-full px-4 py-3 rounded-lg border ${errores.mundo ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 transition-colors`}
                            />
                            {errores.mundo && (
                                <p id="mundo-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1" aria-live="polite">
                                    {errores.mundo}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="tipo" className="block text-slate-800 font-bold mb-2">
                                Tipo *
                            </label>
                            <select 
                                required
                                id="tipo"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                aria-invalid={errores.tipo ? "true" : "false"}
                                aria-describedby={errores.tipo ? "tipo-error" : undefined}
                                className={`w-full px-4 py-3 rounded-lg border bg-white ${errores.tipo ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 transition-colors cursor-pointer`}    
                            >
                                <option value="">Selecciona el tipo</option>
                                <option value="Personaje">Personaje</option>
                                <option value="Artefacto">Artefacto</option>
                            </select>

                            {errores.tipo && (
                                <p id="tipo-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1" aria-live="polite">
                                    {errores.tipo}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="habilidad" className="block text-slate-800 font-bold mb-2">
                                Habilidad *
                            </label>
                            <input 
                                type="text"
                                required
                                ref={habilidadRef}
                                id="habilidad"
                                name="habilidad"
                                autoComplete="off"
                                value={formData.habilidad}
                                onChange={handleChange}
                                aria-invalid={errores.habilidad ? "true" : "false"}
                                aria-describedby={errores.habilidad ? "habilidad-error" : undefined}
                                className={`w-full px-4 py-3 rounded-lg border ${errores.habilidad ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 transition-colors`}
                            />
                            {errores.habilidad && (
                                <p id="habilidad-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1" aria-live="polite">
                                    {errores.habilidad}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="libro" className="block text-slate-800 font-bold mb-2">
                                Libro
                            </label>
                            <input 
                                type="text"
                                id="libro"
                                name="libro"
                                autoComplete="off"
                                value={formData.libro}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-amber-500 focus:outline-none focus:ring-2 transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="descripcion" className="block text-slate-800 font-bold mb-2">
                                Descripción *
                            </label>
                            <input 
                                type="text"
                                required
                                ref={descripcionRef}
                                id="descripcion"
                                name="descripcion"
                                autoComplete="off"
                                value={formData.descripcion}
                                onChange={handleChange}
                                aria-invalid={errores.descripcion ? "true" : "false"}
                                aria-describedby={errores.descripcion ? "descripcion-error": undefined}
                                className={`w-full px-4 py-3 rounded-lg border ${errores.descripcion ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 transition-colors`}
                                />
                                {errores.descripcion && (
                                    <p id="descripcion-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1" aria-live="polite">
                                        {errores.descripcion}
                                    </p>
                                )}
                        </div>
                        
                        <div>
                            <label htmlFor="valor" className="block text-slate-800 font-bold mb-2">
                                Valor estimado (Broams) *
                            </label>
                            <input
                                type="text"
                                required
                                ref={valorRef}
                                id="valor"
                                name="valor"
                                autoComplete="off"
                                value={formData.valor}
                                onChange={handleChange}
                                aria-invalid={errores.valor ? "true" : "false"}
                                aria-describedby={errores.valor ? "valor-error" : undefined}
                                className={`w-full px-4 py-3 rounded-lg border ${errores.valor ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} focus:outline-none focus:ring-2 transition-colors`}
                            />
                            {errores.valor && (
                                <p id="valor-error" className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1" aria-live="polite">
                                    {errores.valor}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="imagenUrl" className="block text-slate-800 font-bold mb-2">
                                Imagen
                            </label>
                            <input 
                                type="text"
                                id="imagenUrl"
                                name="imagenUrl"
                                value={formData.imagenUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-amber-500 focus:outline-none focus:ring-2 transition-colors"
                                />
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                            <button type="submit"
                            disabled={loading}
                            className="w-full btn-cosmere disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-amber-500 rounded-lg py-3">
                                Registrar
                            </button>
                        </div>

                    </form>
                </section>
            </main>
            <Footer />
        </>
    )
}