import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaFileAlt, FaSync, FaDownload, FaChartBar, FaTree, FaStar, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLabData } from '../hooks/useLabData';
import { useAdvancedSearch } from '../hooks/useAdvancedSearch';
import { useFavorites } from '../hooks/useFavorites';
import AdvancedSearchBox from '../components/AdvancedSearchBox';
import { VirtualizedStudyListWithInfo } from '../components/VirtualizedStudyList';
import StudyDetailModal from '../components/StudyDetailModal';
import StudyCard from '../components/StudyCard';
import { exportToJSON } from '../utils/excelProcessor';

const Estudios = () => {
  const labData = useLabData({ autoLoad: true, useCache: true });
  const { isFavorite, toggleFavorite, stats: favStats } = useFavorites();
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [showStudyCard, setShowStudyCard] = useState(false);

  // Hook de búsqueda avanzada con Fuse.js
  const {
    searchQuery,
    setSearchQuery,
    filters,
    searchResults,
    suggestions,
    searchHistory,
    activeFilters,
    isSearching,
    stats,
    updateFilter,
    removeFilter,
    clearSearch,
    hasResults
  } = useAdvancedSearch(labData.data?.estudios || [], {
    keys: ['nombre', 'codigo', 'tipoEstudio', 'searchText'],
    threshold: 0.3,
    debounceDelay: 300
  });

  // Categorías para filtros
  const categories = useMemo(() => labData.categories || {
    tiposEstudio: [],
    nivel1: [],
    nivel2: []
  }, [labData.categories]);

  // Manejar selección de estudio - mostrar StudyCard en panel lateral
  const handleStudyClick = (estudio) => {
    setSelectedStudy(estudio);
    setShowStudyCard(true);
  };

  // Manejar favoritos
  const handleToggleFavorite = (study) => {
    toggleFavorite(study);
  };

  // Manejar más información (abrir modal)
  const handleMoreInfo = (study) => {
    setSelectedStudy(study);
    setShowStudyCard(false); // Cerrar panel lateral si está abierto
  };

  // Cerrar panel lateral de StudyCard
  const handleCloseStudyCard = () => {
    setShowStudyCard(false);
    setSelectedStudy(null);
  };

  // Función para renderizar nombre con highlighting
  const renderHighlightedName = (estudio) => {
    if (!estudio.matches || estudio.matches.length === 0) {
      return estudio.nombre;
    }
    
    const matchForField = estudio.matches.find(m => m.key === 'nombre');
    if (!matchForField || !matchForField.indices || matchForField.indices.length === 0) {
      return estudio.nombre;
    }
    
    const text = estudio.nombre;
    let result = [];
    let lastIndex = 0;
    
    const sortedIndices = [...matchForField.indices].sort((a, b) => a[0] - b[0]);
    
    sortedIndices.forEach(([start, end], i) => {
      if (start > lastIndex) {
        result.push(
          <span key={`text-${i}`}>{text.substring(lastIndex, start)}</span>
        );
      }
      
      result.push(
        <mark key={`mark-${i}`} className="bg-yellow-200 text-gray-900 font-semibold">
          {text.substring(start, end + 1)}
        </mark>
      );
      
      lastIndex = end + 1;
    });
    
    if (lastIndex < text.length) {
      result.push(
        <span key="text-end">{text.substring(lastIndex)}</span>
      );
    }
    
    return <>{result}</>;
  };

  // Exportar datos
  const handleExport = () => {
    if (!labData.data) return;
    const jsonData = exportToJSON(labData.data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estudios_lab_eg_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-eg-pinkLight py-16">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-eg-grayDark">
              Directorio de Estudios
            </h1>
            <p className="text-xl text-eg-gray">
              Explore nuestro catálogo completo de análisis clínicos
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white shadow-sm sticky top-16 z-10">
        <div className="container-responsive">
          {/* Barra de búsqueda avanzada */}
          <AdvancedSearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            updateFilter={updateFilter}
            removeFilter={removeFilter}
            clearSearch={clearSearch}
            suggestions={suggestions}
            searchHistory={searchHistory}
            activeFilters={activeFilters}
            stats={stats}
            categories={categories}
          />
          
          {/* Controles adicionales */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
              >
                Vista Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
              >
                Vista Lista
              </button>
              <Link
                to="/estudios/tree"
                className="btn btn-outline flex items-center gap-2"
              >
                <FaTree />
                Vista Árbol
              </Link>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={labData.reload}
                className="btn btn-outline"
                title="Recargar datos"
                disabled={labData.loading}
              >
                <FaSync className={labData.loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleExport}
                className="btn btn-outline"
                title="Exportar datos"
                disabled={labData.loading || !labData.data}
              >
                <FaDownload />
              </button>
              <button
                className="btn btn-outline"
                title="Ver estadísticas"
              >
                <FaChartBar />
                {stats && (
                  <span className="ml-2">
                    {stats.total}
                  </span>
                )}
              </button>
              <Link
                to="/favoritos"
                className="btn btn-outline"
                title="Estudios favoritos"
              >
                <FaStar className="text-yellow-500" />
                <span className="ml-2">
                  {favStats.total}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-responsive">

          {/* Loading */}
          {labData.loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eg-purple mx-auto"></div>
                <p className="mt-4 text-eg-gray">Cargando estudios del laboratorio...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {labData.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">Error al cargar datos:</p>
              <p className="text-sm mt-1">{labData.error}</p>
            </div>
          )}

          {/* Resultados con panel lateral para StudyCard */}
          <div className="flex gap-6">
            {/* Columna principal de resultados */}
            <div className={`transition-all duration-300 ${showStudyCard ? 'flex-1' : 'w-full'}`}>
              {!labData.loading && hasResults && (
                <>
                  {viewMode === 'list' ? (
                    <VirtualizedStudyListWithInfo
                      items={searchResults}
                      searchResults={labData.data?.estudios}
                      height={600}
                      onItemClick={handleStudyClick}
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.slice(0, 50).map((estudio, index) => (
                        <motion.div
                          key={estudio.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
                          className={`card hover:shadow-medical-lg transition-all duration-300 cursor-pointer ${
                            selectedStudy?.id === estudio.id ? 'ring-2 ring-eg-purple shadow-lg' : ''
                          }`}
                          onClick={() => handleStudyClick(estudio)}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-eg-grayDark leading-tight">
                                {renderHighlightedName(estudio)}
                              </h3>
                            </div>
                            {estudio.tipoEstudio && (
                              <span className="px-2 py-1 bg-eg-pink/20 text-eg-purple text-xs font-medium rounded-full whitespace-nowrap">
                                {estudio.tipoEstudio}
                              </span>
                            )}
                          </div>
                          
                          {estudio.codigo && (
                            <p className="text-sm text-eg-purple font-medium mb-2">
                              Código: {estudio.codigo}
                            </p>
                          )}
                          
                          {estudio.jerarquia && estudio.jerarquia.length > 0 && (
                            <p className="text-xs text-eg-gray mb-3 line-clamp-2">
                              {estudio.jerarquia.join(' > ')}
                            </p>
                          )}

                          {(estudio.tiempoEntrega || estudio.preparacion) && (
                            <div className="space-y-2 text-sm">
                              {estudio.tiempoEntrega && (
                                <div className="flex items-center gap-2 text-eg-gray">
                                  <FaClock className="text-eg-purple flex-shrink-0" />
                                  <span>Tiempo: {estudio.tiempoEntrega}</span>
                                </div>
                              )}
                              {estudio.preparacion && (
                                <div className="flex items-center gap-2 text-eg-gray">
                                  <FaFileAlt className="text-eg-purple flex-shrink-0" />
                                  <span>Prep: {estudio.preparacion}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {estudio.precio > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-lg font-semibold text-eg-purple">
                                ${estudio.precio.toFixed(2)}
                              </p>
                            </div>
                          )}
                          
                          {estudio.score !== undefined && (
                            <div className="text-xs text-eg-gray mt-2">
                              Relevancia: {((1 - estudio.score) * 100).toFixed(0)}%
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {viewMode === 'grid' && searchResults.length > 50 && (
                    <div className="mt-6 text-center">
                      <p className="text-eg-gray mb-4">
                        Mostrando 50 de {searchResults.length} resultados
                      </p>
                      <button
                        onClick={() => setViewMode('list')}
                        className="btn btn-primary"
                      >
                        Ver todos en vista de lista
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Panel lateral con StudyCard */}
            <AnimatePresence>
              {showStudyCard && selectedStudy && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  transition={{ duration: 0.3 }}
                  className="w-96 flex-shrink-0"
                >
                  <div className="sticky top-24">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
                      {/* Header del panel */}
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-eg-grayDark">Detalles del Estudio</h3>
                        <button
                          onClick={handleCloseStudyCard}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      
                      {/* StudyCard en el panel */}
                      <div className="p-4">
                        <StudyCard
                          study={selectedStudy}
                          isFavorite={isFavorite(selectedStudy.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onMoreInfo={handleMoreInfo}
                          className="shadow-none border-none"
                          showPruebas={true}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {!hasResults && !labData.loading && !isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-eg-gray text-lg">
                No se encontraron estudios que coincidan con tu búsqueda.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal de detalles del estudio */}
      <StudyDetailModal
        study={selectedStudy}
        isOpen={!!selectedStudy}
        onClose={() => setSelectedStudy(null)}
      />
    </div>
  );
};

export default Estudios;