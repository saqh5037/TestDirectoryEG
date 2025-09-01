import { useState } from 'react';
import { 
  TestTubeIcon, 
  ClockIcon, 
  FastingIcon, 
  HeartIcon, 
  InfoIcon,
  getAreaIcon 
} from './MedicalIcons';

const StudyCard = ({ study, estudio, onViewDetails, onDetailsClick, isNew = false, viewMode = 'grid' }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Support both study and estudio props for backwards compatibility
  const studyData = study || estudio;
  
  if (!studyData) {
    return null; // Return null if no study data
  }
  
  const AreaIcon = getAreaIcon(studyData.area);
  
  // Función para determinar el color del área
  const getAreaColor = (area) => {
    const colors = {
      'Hematología': 'bg-red-50 text-red-700 border-red-200',
      'Química': 'bg-blue-50 text-blue-700 border-blue-200',
      'Microbiología': 'bg-green-50 text-green-700 border-green-200',
      'Inmunología': 'bg-purple-50 text-purple-700 border-purple-200',
      'Hormonas': 'bg-pink-50 text-pink-700 border-pink-200',
      'Uroanálisis': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Heces': 'bg-amber-50 text-amber-700 border-amber-200',
      'Especiales': 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[area] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleDetailsClick = () => {
    const callback = onViewDetails || onDetailsClick;
    if (callback) {
      callback(studyData);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-xl border border-gray-100 
                 shadow-[0_4px_12px_rgba(123,104,166,0.1)] 
                 hover:shadow-[0_8px_24px_rgba(123,104,166,0.15)]
                 transition-all duration-300 hover:-translate-y-1
                 overflow-hidden cursor-pointer"
      onClick={handleDetailsClick}
    >
      {/* Borde izquierdo decorativo al hover */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-eg-purple to-eg-pink 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Badges superiores */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full 
                         shadow-lg animate-pulse">
            NUEVO
          </span>
        )}
        {studyData.tipo === 'perfil' && (
          <span className="px-3 py-1 bg-eg-pink text-eg-purple text-xs font-medium rounded-full 
                         shadow-md">
            PERFIL
          </span>
        )}
      </div>

      {/* Contenido principal */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-eg-purple 
                           transition-colors duration-200 line-clamp-2">
                {studyData.nombre}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Código: {studyData.codigo}
              </p>
            </div>
            
            {/* Botón de favoritos */}
            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
              aria-label="Agregar a favoritos"
            >
              <HeartIcon 
                className={`w-4 h-4 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
                filled={isFavorite}
              />
            </button>
          </div>

          {/* Área/Departamento con ícono */}
          <div className="flex items-center gap-2 mt-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getAreaColor(studyData.area)}`}>
              <AreaIcon className="w-4 h-4" />
              {studyData.area}
            </span>
          </div>
        </div>

        {/* Información técnica */}
        <div className="space-y-3 mb-4 border-t border-gray-100 pt-4">
          {/* Tipo de muestra */}
          <div className="flex items-center gap-2 text-sm">
            <TestTubeIcon className="w-4 h-4 text-eg-purple flex-shrink-0" />
            <span className="text-gray-600">Muestra:</span>
            <span className="text-gray-900 font-medium truncate">{studyData.muestra}</span>
          </div>

          {/* Tiempo de entrega */}
          <div className="flex items-center gap-2 text-sm">
            <ClockIcon className="w-4 h-4 text-eg-purple flex-shrink-0" />
            <span className="text-gray-600">Entrega:</span>
            <span className="text-gray-900 font-medium">
              {studyData.tiempo}
              {studyData.tiempo.includes('hora') && parseInt(studyData.tiempo) <= 4 && (
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                  Rápido
                </span>
              )}
            </span>
          </div>

          {/* Ayuno requerido */}
          <div className="flex items-center gap-2 text-sm">
            <FastingIcon className="w-4 h-4 text-eg-purple flex-shrink-0" />
            <span className="text-gray-600">Ayuno:</span>
            <span className={`font-medium ${studyData.ayuno ? 'text-orange-600' : 'text-green-600'}`}>
              {studyData.ayuno ? 'Sí requiere' : 'No requiere'}
              {studyData.ayuno && (
                <span className="ml-2 text-xs text-gray-500">(8-12 horas)</span>
              )}
            </span>
          </div>

          {/* Para perfiles: estudios incluidos */}
          {studyData.tipo === 'perfil' && studyData.contiene && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-2">
                Incluye {studyData.contiene.length} estudios:
              </p>
              <div className="flex flex-wrap gap-1">
                {studyData.contiene.slice(0, 3).map((item, idx) => (
                  <span key={idx} className="px-2 py-1 bg-eg-purple/10 text-eg-purple text-xs rounded">
                    {item}
                  </span>
                ))}
                {studyData.contiene.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{studyData.contiene.length - 3} más
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer con precio y acciones */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Badge de precio */}
          <div className="bg-eg-purple text-white px-4 py-2 rounded-lg shadow-md">
            <p className="text-xs opacity-90">Precio</p>
            <p className="text-xl font-light">
              ${studyData.precio}
              <span className="text-xs ml-1 opacity-90">USD</span>
            </p>
          </div>

          {/* Botón más información */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDetailsClick();
            }}
            className="flex items-center gap-2 px-4 py-2 text-eg-purple hover:bg-eg-purple/5 
                     rounded-lg transition-colors duration-200 group/btn"
          >
            <span className="text-sm font-medium">Más información</span>
            <InfoIcon className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Indicador visual de ayuno en el borde superior */}
      {studyData.ayuno && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-500" />
      )}
    </div>
  );
};

export default StudyCard;