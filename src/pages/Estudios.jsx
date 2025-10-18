import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaFileAlt, FaSync, FaDownload, FaChartBar, FaStar, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLabData } from '../hooks/useLabDataDB';
import { useAdvancedSearch } from '../hooks/useAdvancedSearch';
import { useFavorites } from '../hooks/useFavorites';
import AdvancedSearchBox from '../components/AdvancedSearchBox';
import { VirtualizedStudyListWithInfo } from '../components/VirtualizedStudyList';
import StudyCard from '../components/StudyCard';
import StudyTreeView from '../components/StudyTreeView';
import { exportToJSON } from '../utils/excelProcessor';
import { SkeletonStudyList, SkeletonStats } from '../components/SkeletonLoaders';
import { LOGO_SPECS } from '../constants/brandDesignSystem';

// Animations CSS - Matching Nosotros/Contacto pages
const animationStyles = `
  @keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(10px, -10px) rotate(2deg); }
    66% { transform: translate(-10px, 10px) rotate(-2deg); }
  }
  .animate-blob-float {
    animation: blobFloat 10s ease-in-out infinite;
  }
`;

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

  // Manejar más información (mantener en panel lateral)
  const handleMoreInfo = (study) => {
    // Solo mantener el estudio seleccionado en el panel lateral
    setSelectedStudy(study);
    setShowStudyCard(true);
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
    // Full-width container
    <div className="w-full">
      <div className="w-full min-h-screen bg-white relative overflow-hidden">
        {/* Inject animation styles */}
        <style>{animationStyles}</style>

        {/* Purple Hero Section with Blobs */}
        <section className="relative bg-eg-purple py-16 md:py-20 overflow-hidden">
          {/* Decorative Blobs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-30 pointer-events-none z-0 animate-blob-float">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                fill="#DDB5D5"
                d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,39.8,76.8C25.8,84.6,8.9,87.6,-6.4,86.3C-21.7,85,-43.4,79.4,-58.9,68.9C-74.4,58.4,-83.7,43,-87.7,26.4C-91.7,9.8,-90.4,-7.9,-84.3,-23.9C-78.2,-39.9,-67.3,-54.2,-53.5,-61.6C-39.7,-69,-23,-69.5,-7.6,-72.9C7.8,-76.3,30.6,-83.6,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-40 pointer-events-none z-0 animate-blob-float" style={{animationDelay: '2s'}}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                fill="#7B68A6"
                d="M41.3,-72.8C53.4,-65.3,63,-54.7,69.8,-42.4C76.6,-30.1,80.6,-15.1,81.4,0.4C82.2,15.9,79.8,31.8,72.5,45.2C65.2,58.6,53,69.5,39.1,76.2C25.2,82.9,9.6,85.4,-5.5,84.5C-20.6,83.6,-35.2,79.3,-48.3,71.6C-61.4,63.9,-73,52.8,-79.7,39.4C-86.4,26,-88.2,10.3,-86.4,-4.7C-84.6,-19.7,-79.2,-34,-70.5,-46.2C-61.8,-58.4,-49.8,-68.5,-36.6,-75.5C-23.4,-82.5,-8.8,-86.4,3.5,-84.6C15.8,-82.8,29.2,-80.3,41.3,-72.8Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-4 leading-tight" style={{textShadow: '4px 8px 16px rgba(0,0,0,0.5)'}}>
                Directorio de Estudios
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-4">
                Explore nuestro catálogo completo de análisis clínicos
              </p>
              <p className="text-lg text-white/90">
                {stats.total || 511} estudios disponibles · Lista actualizada 2025
              </p>
            </motion.div>

            {/* Estadísticas de la lista de precios */}
            {labData.loading ? (
              <SkeletonStats />
            ) : (
              <motion.div
                className="bg-white rounded-2xl p-8 mt-6 shadow-[0_20px_60px_rgba(123,104,166,0.3)] border border-eg-purple/10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <p className="text-3xl md:text-4xl font-normal text-eg-purple mb-2">348</p>
                    <p className="text-base text-eg-dark font-normal">Pruebas activas</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-3xl md:text-4xl font-normal text-eg-purple mb-2">163</p>
                    <p className="text-base text-eg-dark font-normal">Grupos/Perfiles activos</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <p className="text-3xl md:text-4xl font-normal text-eg-purple mb-2">511</p>
                    <p className="text-base text-eg-dark font-normal">Total de estudios disponibles</p>
                  </motion.div>
                </div>
                <motion.p
                  className="text-sm text-eg-gray mt-4 text-center font-normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Lista de precios: Ambulatorio Abril 2025
                </motion.p>
              </motion.div>
            )}
          </div>
        </section>

      {/* Search Section - Premium Gradient Background */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-white via-eg-pink/20 to-eg-purple/15 overflow-hidden sticky top-16 z-10">
        {/* Decorative blobs for this section */}
        <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full opacity-25 pointer-events-none bg-gradient-to-br from-eg-purple to-eg-pink animate-blob-float" style={{animationDelay: '1s'}}>
        </div>
        <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full opacity-20 pointer-events-none bg-gradient-to-br from-eg-pink to-eg-purple animate-blob-float" style={{animationDelay: '3s'}}>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
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
          
          {/* Controles adicionales - Premium styling */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-3 rounded-xl font-normal transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-eg-purple to-eg-pink text-white shadow-[0_10px_30px_rgba(123,104,166,0.3)]'
                    : 'bg-white text-eg-purple border-2 border-eg-purple/30 hover:border-eg-purple/50 shadow-[0_5px_20px_rgba(123,104,166,0.15)]'
                }`}
              >
                Vista Lista
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={labData.reload}
                className="p-3 rounded-xl bg-white text-eg-purple border-2 border-eg-purple/30 hover:border-eg-purple/50 shadow-[0_5px_20px_rgba(123,104,166,0.15)] transition-all duration-300"
                title="Recargar datos"
                disabled={labData.loading}
              >
                <FaSync className={labData.loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={handleExport}
                className="p-3 rounded-xl bg-white text-eg-purple border-2 border-eg-purple/30 hover:border-eg-purple/50 shadow-[0_5px_20px_rgba(123,104,166,0.15)] transition-all duration-300"
                title="Exportar datos"
                disabled={labData.loading || !labData.data}
              >
                <FaDownload />
              </button>
              <button
                className="p-3 rounded-xl bg-white text-eg-purple border-2 border-eg-purple/30 hover:border-eg-purple/50 shadow-[0_5px_20px_rgba(123,104,166,0.15)] transition-all duration-300"
                title="Ver estadísticas"
              >
                <FaChartBar />
                {stats && (
                  <span className="ml-2 font-normal">
                    {stats.total}
                  </span>
                )}
              </button>
              <Link
                to="/favoritos"
                className="px-4 py-3 rounded-xl bg-white text-eg-purple border-2 border-eg-purple/30 hover:border-eg-purple/50 shadow-[0_5px_20px_rgba(123,104,166,0.15)] transition-all duration-300 flex items-center gap-2"
                title="Estudios favoritos"
              >
                <FaStar className="text-yellow-500" />
                <span className="font-normal">
                  {favStats.total}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Full-width with premium styling */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">

          {/* Loading con Skeletons */}
          {labData.loading && (
            <SkeletonStudyList count={9} />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {searchResults.slice(0, 50).map((estudio, index) => (
                        <motion.div
                          key={estudio.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.5) }}
                          className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-500
                            shadow-[0_20px_60px_rgba(123,104,166,0.25)]
                            hover:shadow-[0_30px_80px_rgba(123,104,166,0.4)]
                            hover:scale-105 hover:-translate-y-2
                            border-2 ${
                              selectedStudy?.id === estudio.id
                                ? 'border-eg-purple shadow-[0_30px_80px_rgba(123,104,166,0.4)]'
                                : 'border-eg-purple/30'
                            }`}
                          onClick={() => handleStudyClick(estudio)}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-normal text-eg-purple leading-tight">
                                {renderHighlightedName(estudio)}
                              </h3>
                            </div>
                            {estudio.tipoEstudio && (
                              <span className="px-3 py-1 bg-gradient-to-r from-eg-purple/20 to-eg-pink/20 text-eg-purple text-xs font-normal rounded-full whitespace-nowrap border border-eg-purple/20">
                                {estudio.tipoEstudio}
                              </span>
                            )}
                          </div>

                          {estudio.codigo && (
                            <p className="text-sm text-eg-purple font-normal mb-2 bg-eg-pink/10 px-3 py-1 rounded-lg inline-block">
                              Código: {estudio.codigo}
                            </p>
                          )}

                          {estudio.jerarquia && estudio.jerarquia.length > 0 && (
                            <p className="text-xs text-eg-dark/70 mb-3 line-clamp-2 font-normal">
                              {estudio.jerarquia.join(' > ')}
                            </p>
                          )}

                          {(estudio.tiempoEntrega || estudio.preparacion) && (
                            <div className="space-y-2 text-sm">
                              {estudio.tiempoEntrega && (
                                <div className="flex items-center gap-2 text-eg-dark">
                                  <FaClock className="text-eg-purple flex-shrink-0" />
                                  <span className="font-normal">Tiempo: {estudio.tiempoEntrega}</span>
                                </div>
                              )}
                              {estudio.preparacion && (
                                <div className="flex items-center gap-2 text-eg-dark">
                                  <FaFileAlt className="text-eg-purple flex-shrink-0" />
                                  <span className="font-normal">Prep: {estudio.preparacion}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {estudio.precio > 0 && (
                            <div className="mt-4 pt-4 border-t-2 border-eg-purple/20">
                              <p className="text-xl font-normal text-eg-purple">
                                ${estudio.precio.toFixed(2)}
                              </p>
                            </div>
                          )}

                          {estudio.score !== undefined && (
                            <div className="text-xs text-eg-dark/70 mt-2 font-normal">
                              Relevancia: {((1 - estudio.score) * 100).toFixed(0)}%
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {viewMode === 'grid' && searchResults.length > 50 && (
                    <div className="mt-10 text-center">
                      <p className="text-eg-dark font-normal mb-6 text-lg">
                        Mostrando 50 de {searchResults.length} resultados
                      </p>
                      <button
                        onClick={() => setViewMode('list')}
                        className="px-8 py-4 bg-gradient-to-r from-eg-purple to-eg-pink text-white rounded-xl font-normal shadow-[0_10px_30px_rgba(123,104,166,0.3)] hover:shadow-[0_15px_40px_rgba(123,104,166,0.4)] transition-all duration-300 hover:scale-105"
                      >
                        Ver todos en vista de lista
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Panel lateral con StudyCard - Premium styling */}
            <AnimatePresence>
              {showStudyCard && selectedStudy && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  transition={{ duration: 0.3 }}
                  className="w-[480px] flex-shrink-0"
                >
                  <div className="sticky top-24">
                    <div className="bg-white rounded-2xl border-2 border-eg-purple/30 shadow-[0_20px_60px_rgba(123,104,166,0.3)]">
                      {/* Header del panel */}
                      <div className="flex items-center justify-between p-6 border-b-2 border-eg-purple/20">
                        <h3 className="font-normal text-xl text-eg-purple">Detalles del Estudio</h3>
                        <button
                          onClick={handleCloseStudyCard}
                          className="text-eg-purple hover:text-eg-pink transition-colors p-2 rounded-lg hover:bg-eg-pink/10"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      {/* StudyCard en el panel */}
                      <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                        <StudyCard
                          study={selectedStudy}
                          isFavorite={isFavorite(selectedStudy.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onMoreInfo={handleMoreInfo}
                          className="shadow-none border-none"
                          showPruebas={true}
                        />

                        {/* Árbol jerárquico para grupos */}
                        <StudyTreeView
                          studyId={selectedStudy.id}
                          studyName={selectedStudy.nombre}
                          studyCode={selectedStudy.codigo}
                          studyType={selectedStudy.tipo}
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
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-10 shadow-[0_20px_60px_rgba(123,104,166,0.25)] border-2 border-eg-purple/30 max-w-2xl mx-auto">
                <p className="text-eg-purple text-xl font-normal">
                  No se encontraron estudios que coincidan con tu búsqueda.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      </div>
    </div>
  );
};

export default Estudios;