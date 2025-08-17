import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaClock, FaFileAlt, FaDollarSign, FaCode, FaClipboard, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const StudyDetailModal = ({ study, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!study) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-eg-pink/30 p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl font-bold text-eg-grayDark mb-2">
                    {study.nombre}
                  </h2>
                  {study.tipoEstudio && (
                    <span className="inline-block px-3 py-1 bg-eg-pink/20 text-eg-purple text-sm font-medium rounded-full">
                      {study.tipoEstudio}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-eg-pinkLight rounded-full transition-colors"
                >
                  <FaTimes className="text-eg-gray text-xl" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Código */}
              {study.codigo && (
                <div className="flex items-center justify-between bg-eg-pinkLight/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaCode className="text-eg-purple text-lg" />
                    <div>
                      <p className="text-sm text-eg-gray">Código del estudio</p>
                      <p className="font-semibold text-eg-grayDark">{study.codigo}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(study.codigo)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                    title="Copiar código"
                  >
                    {copied ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaClipboard className="text-eg-purple" />
                    )}
                  </button>
                </div>
              )}

              {/* Jerarquía */}
              {study.jerarquia && study.jerarquia.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-eg-gray mb-2">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.jerarquia.map((nivel, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-eg-grayDark text-sm rounded-full"
                      >
                        {nivel}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Información del estudio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.tiempoEntrega && (
                  <div className="flex items-start gap-3">
                    <FaClock className="text-eg-purple mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-eg-gray">Tiempo de entrega</p>
                      <p className="font-medium text-eg-grayDark">{study.tiempoEntrega}</p>
                    </div>
                  </div>
                )}

                {study.preparacion && (
                  <div className="flex items-start gap-3">
                    <FaFileAlt className="text-eg-purple mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-eg-gray">Preparación</p>
                      <p className="font-medium text-eg-grayDark">{study.preparacion}</p>
                    </div>
                  </div>
                )}

                {study.muestra && (
                  <div className="flex items-start gap-3">
                    <FaFileAlt className="text-eg-purple mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-eg-gray">Muestra</p>
                      <p className="font-medium text-eg-grayDark">{study.muestra}</p>
                    </div>
                  </div>
                )}

                {study.metodo && (
                  <div className="flex items-start gap-3">
                    <FaFileAlt className="text-eg-purple mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-eg-gray">Método</p>
                      <p className="font-medium text-eg-grayDark">{study.metodo}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Precio */}
              {study.precio && study.precio > 0 && (
                <div className="border-t border-eg-pink/30 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaDollarSign className="text-eg-purple text-2xl" />
                      <div>
                        <p className="text-sm text-eg-gray">Precio</p>
                        <p className="text-2xl font-bold text-eg-purple">
                          ${study.precio.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-primary">
                      Solicitar estudio
                    </button>
                  </div>
                </div>
              )}

              {/* Notas adicionales */}
              {study.notas && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">Notas importantes</p>
                  <p className="text-sm text-yellow-700">{study.notas}</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StudyDetailModal;