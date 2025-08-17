import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para cargar datos desde la base de datos PostgreSQL
 * Configurado para usar la lista de precios ID 27 (Ambulatorio Abril 2025)
 */
export const useLabData = (options = {}) => {
  const {
    autoLoad = true,
    useCache = true,
    apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState(null);
  const [treeStructure, setTreeStructure] = useState(null);

  /**
   * Carga los datos desde la API
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Cargando datos desde la base de datos...');
      
      // Cargar pruebas de la lista ID 27
      const pruebasResponse = await fetch(`${apiUrl}/pruebas?limit=1000&lista_precios_id=27`);
      const pruebasData = await pruebasResponse.json();
      
      // Cargar grupos de la lista ID 27
      const gruposResponse = await fetch(`${apiUrl}/grupos?limit=1000&lista_precios_id=27`);
      const gruposData = await gruposResponse.json();
      
      // Cargar áreas
      const areasResponse = await fetch(`${apiUrl}/areas`);
      const areasData = await areasResponse.json();
      
      if (!pruebasData.success || !gruposData.success) {
        throw new Error('Error al cargar datos de la API');
      }

      // Formatear datos para compatibilidad con el componente
      const estudios = [
        ...pruebasData.data.map(p => ({
          id: `prueba-${p.id}`,
          codigo: p.nomenclatura || p.codigo || '',
          nombre: p.nombre,
          tipoEstudio: 'Prueba Individual',
          nivel1: p.area_nombre || 'Sin categoría',
          nivel2: p.tipo_muestra_nombre || '',
          nivel3: '',
          precio: parseFloat(p.precio_lista || p.precio || 0),
          searchText: `${p.nombre} ${p.nomenclatura || ''} ${p.descripcion || ''}`.toLowerCase(),
          tipo: 'prueba',
          area: p.area_nombre,
          area_nombre: p.area_nombre
        })),
        ...gruposData.data.map(g => ({
          id: `grupo-${g.id}`,
          codigo: g.codigo_caja || g.codigo || '',
          nombre: g.nombre,
          tipoEstudio: 'Perfil/Paquete',
          nivel1: g.area_nombre || 'Perfiles',
          nivel2: '',
          nivel3: '',
          precio: parseFloat(g.precio_lista || g.precio || 0),
          searchText: `${g.nombre} ${g.codigo_caja || ''} ${g.descripcion || ''}`.toLowerCase(),
          tipo: 'grupo',
          area: g.area_nombre,
          area_nombre: g.area_nombre,
          cantidadPruebas: g.cantidad_pruebas || 0
        }))
      ];

      const finalData = {
        estudios,
        pruebas: pruebasData.data,
        gruposPrueba: gruposData.data,
        areas: areasData.data || [],
        totalPruebas: 348, // Valores fijos de la lista ID 27
        totalGrupos: 163,
        totalEstudios: 511
      };

      // Guardar en cache si está habilitado
      if (useCache) {
        localStorage.setItem('labdata_cache', JSON.stringify({
          data: finalData,
          timestamp: Date.now()
        }));
      }

      setData(finalData);
      processLoadedData(finalData);
      
      console.log('Datos cargados exitosamente:', {
        estudios: finalData.estudios.length,
        pruebas: finalData.pruebas.length,
        grupos: finalData.gruposPrueba.length
      });

      return finalData;
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError(err.message);
      
      // Intentar cargar desde cache si hay error
      if (useCache) {
        const cached = localStorage.getItem('labdata_cache');
        if (cached) {
          const { data: cachedData } = JSON.parse(cached);
          setData(cachedData);
          processLoadedData(cachedData);
          console.log('Datos cargados desde cache debido a error de red');
          return cachedData;
        }
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiUrl, useCache]);

  /**
   * Procesa los datos cargados
   */
  const processLoadedData = (loadedData) => {
    if (!loadedData) return;

    // Construir estructura de árbol simple
    const tree = {
      'Pruebas Individuales': loadedData.estudios.filter(e => e.tipo === 'prueba'),
      'Perfiles/Paquetes': loadedData.estudios.filter(e => e.tipo === 'grupo')
    };
    setTreeStructure(tree);

    // Obtener categorías únicas
    const cats = {
      tiposEstudio: ['Prueba Individual', 'Perfil/Paquete'],
      nivel1: [...new Set(loadedData.estudios.map(e => e.nivel1).filter(Boolean))],
      nivel2: [...new Set(loadedData.estudios.map(e => e.nivel2).filter(Boolean))]
    };
    setCategories(cats);
  };

  /**
   * Busca estudios según término y filtros
   */
  const search = useCallback(async (searchTerm, filters = {}) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSearchResults(data?.estudios || []);
      return data?.estudios || [];
    }

    try {
      // Buscar en la API
      const response = await fetch(
        `${apiUrl}/search?q=${encodeURIComponent(searchTerm)}&lista_precios_id=27`
      );
      const result = await response.json();
      
      if (result.success) {
        // Formatear resultados
        const formattedResults = [
          ...(result.data.pruebas || []).map(p => ({
            id: `prueba-${p.id}`,
            codigo: p.nomenclatura || '',
            nombre: p.nombre,
            precio: parseFloat(p.precio || 0),
            tipo: 'prueba',
            area: p.area_nombre
          })),
          ...(result.data.grupos || []).map(g => ({
            id: `grupo-${g.id}`,
            codigo: g.codigo_caja || '',
            nombre: g.nombre,
            precio: parseFloat(g.precio || 0),
            tipo: 'grupo',
            cantidadPruebas: g.cantidad_pruebas
          }))
        ];
        
        setSearchResults(formattedResults);
        return formattedResults;
      }
    } catch (err) {
      console.error('Error en búsqueda:', err);
      // Búsqueda local como fallback
      if (data) {
        const searchLower = searchTerm.toLowerCase();
        const results = data.estudios.filter(e => 
          e.searchText.includes(searchLower)
        );
        setSearchResults(results);
        return results;
      }
    }
    
    return [];
  }, [data, apiUrl]);

  /**
   * Obtiene un estudio por ID
   */
  const getStudyById = useCallback((id) => {
    if (!data) return null;
    return data.estudios.find(e => e.id === id);
  }, [data]);

  /**
   * Obtiene estudios por categoría
   */
  const getStudiesByCategory = useCallback((category, level = 'tipoEstudio') => {
    if (!data) return [];
    
    return data.estudios.filter(estudio => {
      switch(level) {
        case 'tipoEstudio':
          return estudio.tipoEstudio === category;
        case 'nivel1':
          return estudio.nivel1 === category;
        case 'tipo':
          return estudio.tipo === category;
        default:
          return false;
      }
    });
  }, [data]);

  /**
   * Obtiene estadísticas de los datos
   */
  const getStats = useCallback(() => {
    if (!data) return null;

    const withPrice = data.estudios.filter(e => e.precio > 0).length;
    const avgPrice = data.estudios
      .filter(e => e.precio > 0)
      .reduce((sum, e) => sum + e.precio, 0) / (withPrice || 1);

    return {
      totalEstudios: data.totalEstudios || data.estudios.length,
      totalPruebas: data.totalPruebas || 348,
      totalGrupos: data.totalGrupos || 163,
      estudiosConPrecio: withPrice,
      precioPromedio: avgPrice.toFixed(2),
      categorias: categories?.tiposEstudio.length || 2
    };
  }, [data, categories]);

  /**
   * Limpia el cache
   */
  const clearCache = useCallback(() => {
    localStorage.removeItem('labdata_cache');
    console.log('Cache limpiado');
  }, []);

  /**
   * Recarga los datos (forzando nueva carga)
   */
  const reload = useCallback(async () => {
    clearCache();
    return await loadData();
  }, [clearCache, loadData]);

  // Cargar datos automáticamente al montar
  useEffect(() => {
    if (autoLoad && !data && !loading) {
      loadData();
    }
  }, [autoLoad, data, loading, loadData]);

  return {
    // Estado
    data,
    loading,
    error,
    searchResults,
    categories,
    treeStructure,
    
    // Funciones
    loadData,
    search,
    getStudyById,
    getStudiesByCategory,
    getStats,
    clearCache,
    reload,
    
    // Utilidades
    isReady: !loading && !error && data !== null,
    isEmpty: data?.estudios.length === 0
  };
};

/**
 * Hook para buscar estudios con debounce
 */
export const useStudySearch = (delay = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [filters, setFilters] = useState({});
  
  const labData = useLabData();

  // Debounce del término de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  // Ejecutar búsqueda cuando cambie el término debounced
  useEffect(() => {
    if (labData.isReady) {
      labData.search(debouncedTerm, filters);
    }
  }, [debouncedTerm, filters, labData]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    results: labData.searchResults,
    loading: labData.loading,
    updateFilter: (key, value) => {
      setFilters(prev => ({
        ...prev,
        [key]: value
      }));
    },
    clearFilters: () => setFilters({}),
    ...labData
  };
};