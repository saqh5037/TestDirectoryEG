import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUnifiedApp } from '../contexts/UnifiedAppContext';
import Hero from '../components/Hero';
import StudyCard from '../components/StudyCard';
import { estudiosData } from '../data/estudiosData';

const Home = ({ onStudySelect, onBudgetOpen, openBudget }) => {
  const { searchTerm, filters } = useUnifiedApp();
  const [featuredStudies, setFeaturedStudies] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);

  useEffect(() => {
    // Open budget calculator if requested
    if (openBudget) {
      onBudgetOpen();
    }
  }, [openBudget, onBudgetOpen]);

  useEffect(() => {
    // Get featured studies (perfiles)
    const featured = estudiosData.filter(e => e.tipo === 'perfil' || e.nombre?.includes('Perfil')).slice(0, 6);
    // If no profiles found, show first 6 studies
    setFeaturedStudies(featured.length > 0 ? featured : estudiosData.slice(0, 6));

    // Get popular categories
    const categories = [
      { name: 'Hematología', icon: '🩸', count: 45, color: 'bg-red-100 text-red-700' },
      { name: 'Química Sanguínea', icon: '🧪', count: 38, color: 'bg-blue-100 text-blue-700' },
      { name: 'Inmunología', icon: '🦠', count: 52, color: 'bg-green-100 text-green-700' },
      { name: 'Endocrinología', icon: '💉', count: 29, color: 'bg-purple-100 text-purple-700' },
      { name: 'Microbiología', icon: '🔬', count: 33, color: 'bg-yellow-100 text-yellow-700' },
      { name: 'Parasitología', icon: '🪱', count: 18, color: 'bg-pink-100 text-pink-700' }
    ];
    setPopularCategories(categories);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-light text-eg-purple mb-2">43</div>
              <div className="text-sm text-gray-600">Años de Experiencia</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-light text-eg-purple mb-2">200+</div>
              <div className="text-sm text-gray-600">Estudios Disponibles</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-light text-eg-purple mb-2">24h</div>
              <div className="text-sm text-gray-600">Resultados Rápidos</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-light text-eg-purple mb-2">100%</div>
              <div className="text-sm text-gray-600">Confiabilidad</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-medium text-eg-dark mb-8 text-center"
          >
            Categorías Populares
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl ${category.color} text-center transition-all duration-300 hover:shadow-lg`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs opacity-80 mt-1">{category.count} estudios</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Studies */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-medium text-eg-dark mb-2">
              Perfiles Recomendados
            </h2>
            <p className="text-gray-600">
              Paquetes completos con descuentos especiales
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StudyCard 
                  study={study} 
                  onViewDetails={() => onStudySelect && onStudySelect(study)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-eg-purple to-eg-purple/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-medium text-white mb-4">
              ¿Necesitas realizar múltiples estudios?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Usa nuestra calculadora de presupuesto y obtén descuentos automáticos por volumen.
              Genera tu presupuesto en PDF y compártelo fácilmente.
            </p>
            <button
              onClick={onBudgetOpen}
              className="px-8 py-3 bg-white text-eg-purple rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calcular Presupuesto
            </button>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-eg-purple"
            >
              <h3 className="text-lg font-medium text-eg-dark mb-3">Horarios de Atención</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📅 Lunes a Viernes: 7:00 AM - 4:00 PM</li>
                <li>📅 Sábados: 7:00 AM - 12:00 PM</li>
                <li>🚫 Domingos y Feriados: Cerrado</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-eg-pink"
            >
              <h3 className="text-lg font-medium text-eg-dark mb-3">Ubicación</h3>
              <p className="text-sm text-gray-600 mb-3">
                📍 Av. Libertador, Edificio Majestic,<br/>
                Piso 1, Consultorio 18<br/>
                Caracas, Venezuela
              </p>
              <a href="#" className="text-eg-purple text-sm hover:underline">
                Ver en Google Maps →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
            >
              <h3 className="text-lg font-medium text-eg-dark mb-3">Contacto Directo</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📞 (0212) 762-0561</li>
                <li>📞 (0212) 763-5909</li>
                <li>📱 WhatsApp: +58 414-901-9327</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;