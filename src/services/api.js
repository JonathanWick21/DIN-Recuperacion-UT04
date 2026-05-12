const API_URL = import.meta.env.VITE_API_URL;

export const apiService = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/personajes`);
    if (!res.ok) throw new Error("Error al obtener datos");
    return res.json();
  },
  getById: async (id) => {
    const res = await fetch(`${API_URL}/personajes/${id}`);
    if (!res.ok) throw new Error("Personaje no encontrado");
    return res.json();
  },
  create: async (data) => {
    const res = await fetch(`${API_URL}/personajes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};