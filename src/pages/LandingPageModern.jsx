import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroCarouselEG from '../components/landing/HeroCarouselEG';
import NavigationMenu from '../components/landing/NavigationMenu';
import StudiesSectionEG from '../components/landing/StudiesSectionEG';
import CTASectionEG from '../components/landing/CTASectionEG';
import FooterEG from '../components/landing/FooterEG';
import CategoryMenu from '../components/landing/CategoryMenu';
import { 
  FaCheckCircle, 
  FaWhatsapp, 
  FaDownload,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaChevronRight,
  FaShieldAlt,
  FaAward,
  FaMicroscope,
  FaVial,
  FaFlask,
  FaDna,
  FaHeartbeat,
  FaBaby,
  FaCalendarAlt,
  FaUserMd
} from 'react-icons/fa';

const LandingPageModern = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Barra de confianza
  const trustBar = [
    { icon: '✅', text: 'Certificación ISO 9001:2015', highlight: true },
    { icon: '🏥', text: '+50,000 pacientes atendidos' },
    { icon: '🔬', text: '+200 tipos de estudios' },
    { icon: '⏱️', text: 'Resultados mismo día*' }
  ];

  // Servicios principales con precios
  const mainServices = [
    {
      icon: '🩸',
      title: 'Biometría Hemática',
      description: 'Análisis completo de células sanguíneas',
      price: 180,
      oldPrice: 220,
      savings: '18% OFF',
      features: ['Resultados en 2 horas', 'Sin ayuno requerido'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: '🧪',
      title: 'Química Sanguínea',
      description: 'Perfil metabólico completo',
      price: 350,
      oldPrice: 420,
      savings: '17% OFF',
      features: ['6 elementos', 'Ayuno de 8 horas'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '💉',
      title: 'Perfil Tiroideo',
      description: 'TSH, T3 y T4 completo',
      price: 580,
      oldPrice: 680,
      savings: '15% OFF',
      features: ['Diagnóstico preciso', 'Resultados en 24h'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🦠',
      title: 'Cultivos',
      description: 'Urocultivo y antibiograma',
      price: 450,
      oldPrice: 520,
      savings: '13% OFF',
      features: ['Identificación bacteriana', '48-72 horas'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '🤰',
      title: 'Prueba Embarazo',
      description: 'Prueba cuantitativa en sangre',
      price: 150,
      oldPrice: 190,
      savings: '21% OFF',
      features: ['Alta precisión', 'Mismo día'],
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '🧬',
      title: 'COVID-19 PCR',
      description: 'Prueba molecular RT-PCR',
      price: 800,
      oldPrice: 1200,
      savings: '33% OFF',
      features: ['Certificado de viaje', '24 horas'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  // Paquetes y promociones
  const packages = [
    {
      id: 1,
      name: 'Check-up Básico',
      description: 'Perfil preventivo esencial',
      studies: ['Biometría Hemática', 'Química Sanguínea 6', 'Examen General de Orina'],
      price: 599,
      oldPrice: 780,
      savings: 180,
      badge: 'Más vendido',
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      id: 2,
      name: 'Check-up Mujer',
      description: 'Salud integral femenina',
      studies: ['Papanicolau', 'Colposcopia', 'Perfil Hormonal', 'Densitometría'],
      price: 1299,
      oldPrice: 1699,
      savings: 400,
      badge: '30% OFF',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 3,
      name: 'Check-up Diabético',
      description: 'Control y prevención de diabetes',
      studies: ['Glucosa', 'Hemoglobina Glucosilada', 'Perfil de Lípidos', 'Microalbuminuria'],
      price: 780,
      oldPrice: 1000,
      savings: 220,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      name: 'Check-up Ejecutivo',
      description: 'Evaluación completa para profesionales',
      studies: ['25+ estudios', 'Electrocardiograma', 'Rx de Tórax', 'Espirometría'],
      price: 2499,
      oldPrice: 3200,
      savings: 701,
      badge: 'Premium',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Por qué elegirnos
  const whyChooseUs = [
    { icon: '✨', title: 'Tecnología de última generación', description: 'Equipos automatizados de vanguardia' },
    { icon: '👨‍⚕️', title: 'Personal altamente calificado', description: 'Bioanalistas certificados y especializados' },
    { icon: '🏆', title: '43 años de experiencia', description: 'Trayectoria comprobada en el sector' },
    { icon: '📱', title: 'Resultados en línea y WhatsApp', description: 'Acceso inmediato desde cualquier dispositivo' },
    { icon: '💳', title: 'Múltiples formas de pago', description: 'Efectivo, tarjetas, transferencias y más' },
    { icon: '🏥', title: 'Convenios con aseguradoras', description: 'Trabajamos con las principales aseguradoras' }
  ];

  // Testimonios
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      role: 'Paciente frecuente',
      text: 'Excelente atención y resultados rápidos. El personal es muy profesional y las instalaciones están impecables. Llevo 5 años haciéndome todos mis estudios aquí.',
      rating: 5,
      avatar: '👩'
    },
    {
      id: 2,
      name: 'Dr. Carlos Rodríguez',
      role: 'Médico Internista',
      text: 'Como médico, confío plenamente en los resultados del Laboratorio Elizabeth Gutiérrez. La precisión y rapidez son excepcionales.',
      rating: 5,
      avatar: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      role: 'Empresa Cliente',
      text: 'Realizamos todos los exámenes ocupacionales de nuestra empresa aquí. El servicio empresarial es excelente y los precios muy competitivos.',
      rating: 5,
      avatar: '👩‍💼'
    }
  ];

  // Ubicaciones
  const locations = [
    {
      id: 1,
      name: 'Sede Principal - La Campiña',
      address: 'Av. Libertador, Edificio Majestic, Piso 1, Consultorio 18',
      hours: 'L-V: 7:00 AM - 4:00 PM | S: 7:00 AM - 12:00 PM',
      phone: '(0212) 762-0561',
      services: ['Toma de muestras', 'Resultados', 'Atención empresarial'],
      parking: true,
      mainBranch: true
    },
    {
      id: 2,
      name: 'Sucursal Centro',
      address: 'Av. Universidad, Torre Médica, PB',
      hours: 'L-V: 6:00 AM - 6:00 PM | S: 7:00 AM - 2:00 PM',
      phone: '(0212) 555-0102',
      services: ['Toma de muestras', 'Urgencias'],
      parking: false
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Menu */}
      <NavigationMenu />
      
      {/* Hero Carousel - EG Style */}
      <HeroCarouselEG />

      {/* Category Menu - Replace Search */}
      <CategoryMenu />

      {/* Studies Section - Directorio EG Style */}
      <StudiesSectionEG />

      {/* Main Services Section (Hidden - Replaced by StudiesSection) */}
      <section className="py-16 bg-white hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Estudios Más Solicitados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Precios especiales y resultados garantizados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-5xl">{service.icon}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                    {service.savings}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-end pt-4 border-t">
                  <div>
                    <span className="text-3xl font-bold text-eg-purple">
                      ${service.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${service.oldPrice}
                    </span>
                  </div>
                  <Link
                    to="/estudios"
                    className="px-4 py-2 bg-eg-purple text-white rounded-lg hover:bg-eg-purple/90 transition-colors"
                  >
                    Ver más →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="acceso-rapido" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Paquetes y Promociones Especiales
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ahorra hasta 30% con nuestros paquetes preventivos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-xl overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-eg-purple shadow-xl' : 'shadow-lg'
                } hover:shadow-2xl transition-all`}
              >
                {pkg.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-bold">
                      {pkg.badge}
                    </span>
                  </div>
                )}
                
                <div className={`h-2 bg-gradient-to-r ${pkg.color}`} />
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {pkg.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.studies.map((study, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 flex-shrink-0 mt-0.5" />
                        {study}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-eg-purple">
                        ${pkg.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${pkg.oldPrice}
                      </span>
                    </div>
                    
                    <p className="text-sm text-green-600 font-semibold mb-4">
                      Ahorras ${pkg.savings}
                    </p>
                    
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="w-full py-3 bg-eg-purple text-white rounded-lg hover:bg-eg-purple/90 transition-colors font-semibold"
                    >
                      Seleccionar Paquete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué elegirnos?
              </h2>
              <div className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <span className="text-3xl flex-shrink-0">{reason.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
                alt="Laboratorio moderno"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-eg-purple text-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold">43</div>
                <div className="text-sm">Años de experiencia</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text-lg text-gray-600">
              Miles de pacientes satisfechos avalan nuestra calidad
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl" />
                ))}
              </div>
              
              <p className="text-lg text-gray-700 text-center mb-6 italic">
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="text-center">
                <div className="text-5xl mb-3">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <h4 className="font-semibold text-gray-900">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-sm text-gray-600">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTestimonial 
                        ? 'w-8 bg-eg-purple' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="ubicacion" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestras Ubicaciones
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra la sucursal más cercana a ti
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.0176625173577!2d-66.8658!3d10.4905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI5JzI1LjgiTiA2NsKwNTEnNTYuOSJX!5e0!3m2!1sen!2sve!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Laboratorio"
              />
            </div>
            
            <div className="space-y-4">
              {locations.map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`p-6 border rounded-xl hover:shadow-lg transition-all ${
                    location.mainBranch ? 'border-eg-purple bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-900">
                      {location.name}
                    </h3>
                    {location.mainBranch && (
                      <span className="px-2 py-1 bg-eg-purple text-white text-xs rounded-full">
                        Principal
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-eg-purple" />
                    {location.address}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    <FaClock className="inline mr-2 text-eg-purple" />
                    {location.hours}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    <FaPhone className="inline mr-2 text-eg-purple" />
                    {location.phone}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {location.services.map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <button className="text-eg-purple text-sm font-semibold hover:underline">
                    Ver en mapa →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Directorio EG Style */}
      <CTASectionEG />

      {/* Old Final CTA - Hidden */}
      <section className="py-20 bg-gradient-to-r from-eg-purple to-pink-600 hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para cuidar tu salud?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Agenda tu cita ahora y obtén 20% de descuento en tu primer estudio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-eg-purple rounded-full font-bold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <FaCalendarAlt />
                Agendar Cita Ahora
              </Link>
              <a
                href="https://wa.me/584149019327"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
              >
                <FaWhatsapp />
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Directorio EG Style */}
      <FooterEG />

      {/* Old Complete Footer - Hidden */}
      <footer className="bg-gray-900 text-white py-12 hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Laboratorio EG</h3>
              <p className="text-gray-400 mb-4">
                43 años cuidando la salud de las familias venezolanas
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                  <FaFacebookF />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                  <FaInstagram />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                  <FaTwitter />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/estudios" className="hover:text-white transition">Estudios</Link></li>
                <li><Link to="/resultados" className="hover:text-white transition">Resultados</Link></li>
                <li><Link to="/nosotros" className="hover:text-white transition">Nosotros</Link></li>
                <li><Link to="/contacto" className="hover:text-white transition">Contacto</Link></li>
              </ul>
            </div>
            
            {/* Schedule */}
            <div>
              <h4 className="font-bold mb-4">Horarios</h4>
              <div className="text-gray-400 space-y-1">
                <p>Lunes - Viernes: 7:00 AM - 4:00 PM</p>
                <p>Sábado: 7:00 AM - 12:00 PM</p>
                <p>Domingo: Cerrado</p>
                <p className="text-yellow-400 mt-2">
                  ⚡ Servicio de urgencias disponible
                </p>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <div className="text-gray-400 space-y-2">
                <p>📞 (0212) 762-0561</p>
                <p>📱 WhatsApp: +58 414-901-9327</p>
                <p>✉️ info@laboratorioeg.com</p>
                <a
                  href="https://wa.me/584149019327"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  <FaWhatsapp />
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          {/* Legal */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Laboratorio Elizabeth Gutiérrez. Todos los derechos reservados.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-white transition">Aviso de Privacidad</a>
              <a href="#" className="hover:text-white transition">Términos y Condiciones</a>
              <a href="#" className="hover:text-white transition">MPPS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageModern;