import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useApi = (id = null) => {
  const [data, setData] = useState(id ? null : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = id ? await apiService.getById(id) : await apiService.getAll();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id || data.length === 0) {
        fetchData();
    }
  }, [id]);

  const agregarPersonaje = async (nuevoPersonaje) => {
    setLoading(true);
    setError(null);
    try {
      const creado = await apiService.create(nuevoPersonaje);
      setData((prev) => [...prev, creado]);
      return creado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, agregarPersonaje };
};