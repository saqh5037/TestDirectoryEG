import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import {
  FaHeart,
  FaRegHeart,
  FaInfoCircle,
  FaFlask,
  FaVials,
  FaMicroscope,
  FaDna,
  FaHeartbeat,
  FaSyringe,
  FaStethoscope,
  FaXRay,
  FaUserMd,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEye,
  FaTag,
  FaLayerGroup
} from 'react-icons/fa';

// Iconos médicos por categoría
const getCategoryIcon = (categoria, tipoEstudio) => {
  const iconMap = {
    'Química': FaFlask,
    'Hematología': FaVials,
    'Microbiología': FaMicroscope,
    'Genética': FaDna,
    'Cardiología': FaHeartbeat,
    'Inmunología': FaSyringe,
    'Radiología': FaXRay,
    'Medicina General': FaStethoscope,
    'Especialidades': FaUserMd
  };
  
  // Buscar por categoría exacta
  if (iconMap[categoria]) return iconMap[categoria];
  
  // Buscar por tipo de estudio
  if (iconMap[tipoEstudio]) return iconMap[tipoEstudio];
  
  // Buscar por coincidencia parcial
  for (const [key, icon] of Object.entries(iconMap)) {
    if (categoria?.toLowerCase().includes(key.toLowerCase()) || 
        tipoEstudio?.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  
  return FaFlask; // Icono por defecto
};

// Colores por categoría
const getCategoryColor = (categoria, tipoEstudio) => {
  const colorMap = {
    'Química': 'from-blue-500 to-blue-600',
    'Hematología': 'from-red-500 to-red-600',
    'Microbiología': 'from-green-500 to-green-600',
    'Genética': 'from-purple-500 to-purple-600',
    'Cardiología': 'from-pink-500 to-pink-600',
    'Inmunología': 'from-indigo-500 to-indigo-600',
    'Radiología': 'from-gray-500 to-gray-600',
    'Medicina General': 'from-teal-500 to-teal-600',
    'Especialidades': 'from-orange-500 to-orange-600'
  };
  
  // Buscar color por categoría
  for (const [key, color] of Object.entries(colorMap)) {
    if (categoria?.toLowerCase().includes(key.toLowerCase()) || 
        tipoEstudio?.toLowerCase().includes(key.toLowerCase())) {
      return color;
    }
  }
  
  return 'from-eg-purple to-eg-purpleDark'; // Color por defecto
};

// Componente principal StudyCard
const StudyCard = memo(({
  study,
  isFavorite = false,
  isSelected = false,
  onToggleFavorite,
  onMoreInfo,
  onSelect,
  className = '',
  showPruebas = true,
  imageUrl = null,
  lazy = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Extraer datos del estudio
  const {
    id,
    name = 'Estudio sin nombre',
    nombre = name,
    codigo,
    precio,
    categoria = study?.tipoEstudio,
    tipoEstudio,
    nivel1,
    nivel2,
    nivel3,
    tiempoEntrega,
    preparacion,
    pruebas = [],
    jerarquia = []
  } = study || {};

  // Determinar la categoría principal
  const mainCategory = categoria || tipoEstudio || nivel1 || 'General';
  const Icon = getCategoryIcon(mainCategory, tipoEstudio);
  const gradientColor = getCategoryColor(mainCategory, tipoEstudio);
  
  // Determinar el nivel en la jerarquía
  const hierarchyLevel = jerarquia?.length || 
    (nivel3 ? 3 : nivel2 ? 2 : nivel1 ? 1 : 0);

  // Formatear precio
  const formatPrice = (price) => {
    if (!price) return null;
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Manejar click en la card
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(study);
    }
  };

  // Manejar favoritos
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  // Manejar más información
  const handleMoreInfoClick = (e) => {
    e.stopPropagation();
    if (onMoreInfo) {
      onMoreInfo(study);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`
        relative bg-white rounded-xl shadow-md border border-gray-200
        hover:shadow-xl hover:border-eg-purple/30 transition-all duration-300
        cursor-pointer overflow-hidden group
        ${isSelected ? 'ring-2 ring-eg-purple ring-offset-2 shadow-lg' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Header con gradiente e icono */}
      <div className={`relative h-16 bg-gradient-to-r ${gradientColor} overflow-hidden`}>
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full" />
          <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/20 rounded-full" />
        </div>
        
        {/* Contenido del header */}
        <div className="relative h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Icon className="text-white" size={16} />
            </div>
            <div className="text-white">
              <h3 className="font-semibold text-sm truncate max-w-32">
                {mainCategory}
              </h3>
              {hierarchyLevel > 0 && (
                <div className="flex items-center gap-1 text-xs opacity-90">
                  <FaLayerGroup size={10} />
                  <span>Nivel {hierarchyLevel}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Botón de favorito */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="text-red-300" size={14} />
            ) : (
              <FaRegHeart className="text-white" size={14} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Imagen del estudio (si está disponible) */}
      {imageUrl && (
        <div className="relative h-32 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={nombre}
            loading={lazy ? 'lazy' : 'eager'}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-eg-purple/20 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      )}

      {/* Contenido principal */}
      <div className="p-4 space-y-3">
        {/* Título y código */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-base leading-tight group-hover:text-eg-purple transition-colors">
              {nombre}
            </h3>
            {codigo && (
              <span className="flex-shrink-0 px-2 py-1 bg-eg-purple/10 text-eg-purple text-xs font-mono rounded-md">
                {codigo}
              </span>
            )}
          </div>
          
          {/* Precio destacado */}
          {precio && (
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(precio)}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FaTag size={10} />
                <span>Precio actual</span>
              </div>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="space-y-2">
          {/* Tiempo de entrega */}
          {tiempoEntrega && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaClock className="text-blue-500" size={12} />
              <span>{tiempoEntrega}</span>
            </div>
          )}
          
          {/* Preparación requerida */}
          {preparacion && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaExclamationTriangle className="text-orange-500" size={12} />
              <span className="truncate">{preparacion}</span>
            </div>
          )}
          
          {/* Número de pruebas incluidas */}
          {showPruebas && pruebas.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" size={12} />
              <span>{pruebas.length} prueba{pruebas.length !== 1 ? 's' : ''} incluida{pruebas.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Lista de pruebas (preview) */}
        {showPruebas && pruebas.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-700 flex items-center gap-1">
              <FaVials size={10} />
              Pruebas incluidas:
            </h4>
            <div className="space-y-1 max-h-16 overflow-hidden">
              {pruebas.slice(0, 3).map((prueba, index) => (
                <div key={prueba.id || index} className="text-xs text-gray-600 flex items-center gap-1">
                  <div className="w-1 h-1 bg-eg-pink rounded-full" />
                  <span className="truncate">{prueba.nombre}</span>
                </div>
              ))}
              {pruebas.length > 3 && (
                <div className="text-xs text-eg-purple font-medium">
                  +{pruebas.length - 3} más...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer con botones de acción */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMoreInfoClick}
            className="flex-1 bg-eg-purple text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-eg-purpleDark transition-colors flex items-center justify-center gap-2"
          >
            <FaInfoCircle size={12} />
            Más información
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCardClick}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
          >
            <FaEye className="text-gray-600" size={14} />
          </motion.button>
        </div>
      </div>

      {/* Indicador de estado seleccionado */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 bg-eg-purple rounded-full flex items-center justify-center"
        >
          <FaCheckCircle className="text-white" size={12} />
        </motion.div>
      )}

      {/* Overlay de hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-eg-purple/5 to-transparent pointer-events-none"
      />
    </motion.div>
  );
});

StudyCard.displayName = 'StudyCard';

export default StudyCard;