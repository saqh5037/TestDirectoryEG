import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { 
  FaMicroscope, 
  FaVial, 
  FaFlask, 
  FaHeartbeat,
  FaUserMd,
  FaCertificate,
  FaAward,
  FaShieldAlt,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaLaptopMedical,
  FaHandHoldingMedical,
  FaStar
} from 'react-icons/fa';

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Estadísticas del laboratorio
  const stats = [
    { number: '43+', label: 'Años de Experiencia', icon: FaAward },
    { number: '200+', label: 'Tipos de Análisis', icon: FaFlask },
    { number: '50K+', label: 'Pacientes Atendidos', icon: FaUsers },
    { number: '99.9%', label: 'Precisión en Resultados', icon: FaChartLine }
  ];

  // Servicios principales
  const mainServices = [
    {
      icon: FaMicroscope,
      title: 'Análisis Clínicos',
      description: 'Estudios completos de sangre, orina y heces con tecnología de última generación',
      features: ['Hematología completa', 'Química sanguínea', 'Uroanálisis', 'Coprología'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaVial,
      title: 'Microbiología',
      description: 'Cultivos bacteriológicos y antibiogramas para diagnóstico preciso',
      features: ['Urocultivos', 'Coprocultivos', 'Cultivos de secreciones', 'Antibiogramas'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaFlask,
      title: 'Inmunología',
      description: 'Pruebas inmunológicas y serológicas especializadas',
      features: ['Marcadores tumorales', 'Pruebas hormonales', 'Autoinmunidad', 'Serología viral'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaHeartbeat,
      title: 'Perfiles Especiales',
      description: 'Paquetes completos para chequeos preventivos y control',
      features: ['Perfil lipídico', 'Perfil tiroideo', 'Perfil hepático', 'Check-up ejecutivo'],
      color: 'from-pink-500 to-pink-600'
    }
  ];

  // Certificaciones y acreditaciones
  const certifications = [
    {
      title: 'MPPS',
      description: 'Certificado por el Ministerio del Poder Popular para la Salud',
      icon: FaCertificate
    },
    {
      title: 'ISO 9001:2015',
      description: 'Sistema de Gestión de Calidad certificado',
      icon: FaAward
    },
    {
      title: 'SVB',
      description: 'Miembro de la Sociedad Venezolana de Bioanalistas',
      icon: FaShieldAlt
    },
    {
      title: 'Bioseguridad',
      description: 'Protocolos internacionales de bioseguridad',
      icon: FaHandHoldingMedical
    }
  ];

  // Tecnología y equipos
  const technology = [
    {
      name: 'Analizador Hematológico',
      description: 'Equipos automatizados de última generación para hemogramas completos',
      image: '🔬'
    },
    {
      name: 'Química Clínica Automatizada',
      description: 'Sistemas integrados para análisis bioquímicos de alta precisión',
      image: '⚗️'
    },
    {
      name: 'Sistema LIS',
      description: 'Sistema informático de gestión de laboratorio para resultados en línea',
      image: '💻'
    },
    {
      name: 'Control de Calidad',
      description: 'Programas internos y externos de control de calidad continuo',
      image: '📊'
    }
  ];

  // Testimonios
  const testimonials = [
    {
      name: 'María González',
      role: 'Paciente frecuente',
      content: 'Excelente atención y resultados confiables. Llevo 5 años realizando todos mis exámenes aquí.',
      rating: 5,
      image: '👩'
    },
    {
      name: 'Dr. Carlos Rodríguez',
      role: 'Médico Internista',
      content: 'Confío plenamente en los resultados del Laboratorio Elizabeth Gutiérrez. Son mi primera opción.',
      rating: 5,
      image: '👨‍⚕️'
    },
    {
      name: 'Ana Martínez',
      role: 'Empresa Cliente',
      content: 'Realizamos los exámenes ocupacionales de nuestra empresa aquí. Servicio impecable.',
      rating: 5,
      image: '👩‍💼'
    }
  ];

  // Proceso de atención
  const process = [
    {
      step: 1,
      title: 'Solicite su Cita',
      description: 'Contáctenos por teléfono o WhatsApp para agendar su visita',
      icon: FaPhoneAlt
    },
    {
      step: 2,
      title: 'Toma de Muestra',
      description: 'Personal calificado realizará la toma de muestra con total profesionalismo',
      icon: FaVial
    },
    {
      step: 3,
      title: 'Procesamiento',
      description: 'Análisis con equipos de última tecnología y estricto control de calidad',
      icon: FaMicroscope
    },
    {
      step: 4,
      title: 'Entrega de Resultados',
      description: 'Resultados disponibles en 24-48 horas según el tipo de análisis',
      icon: FaCheckCircle
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Mejorado */}
      <section className="relative bg-gradient-to-br from-eg-purple via-eg-purple/90 to-eg-pink/30 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Laboratorio Clínico
              <span className="block text-3xl md:text-4xl mt-2 text-eg-pink">
                Elizabeth Gutiérrez
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              43 años de excelencia en diagnóstico clínico
            </p>
            <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
              Tecnología de vanguardia y personal altamente calificado para brindarle 
              resultados precisos y confiables en el menor tiempo posible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/estudios"
                className="px-8 py-4 bg-white text-eg-purple rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Ver Catálogo de Estudios
              </Link>
              <a
                href="https://wa.me/584149019327"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105"
              >
                Agendar Cita por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="text-4xl text-eg-purple mx-auto mb-3" />
                <div className="text-4xl font-bold text-eg-dark mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Principales */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-eg-dark mb-4">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una amplia gama de análisis clínicos con los más altos 
              estándares de calidad y precisión.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-eg-dark mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Atención */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-eg-dark mb-4">
              Proceso de Atención Simple y Eficiente
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En 4 simples pasos obtenga sus resultados de manera rápida y confiable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-eg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-2xl" />
                  </div>
                  <div className="text-6xl font-bold text-eg-purple/20 absolute top-0 left-1/2 transform -translate-x-1/2">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-eg-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <div className="w-full h-0.5 bg-eg-purple/20"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-20 bg-gradient-to-br from-eg-purple/10 to-eg-pink/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-eg-dark mb-4">
              Certificaciones y Acreditaciones
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cumplimos con los más altos estándares nacionales e internacionales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <cert.icon className="text-4xl text-eg-purple mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-eg-dark mb-4">
              Tecnología de Vanguardia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Equipos de última generación para garantizar resultados precisos y rápidos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technology.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4 text-center">{tech.image}</div>
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-eg-dark mb-4">
              Lo que Dicen Nuestros Pacientes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Miles de pacientes satisfechos avalan nuestra calidad y servicio
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl" />
                ))}
              </div>
              <p className="text-lg text-gray-700 text-center mb-6 italic">
                "{testimonials[activeTestimonial].content}"
              </p>
              <div className="text-center">
                <div className="text-4xl mb-2">{testimonials[activeTestimonial].image}</div>
                <h4 className="font-semibold text-eg-dark">
                  {testimonials[activeTestimonial].name}
                </h4>
                <p className="text-sm text-gray-600">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTestimonial ? 'bg-eg-purple w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-eg-dark mb-4">
              ¿Por qué Elegir Laboratorio Elizabeth Gutiérrez?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <FaClock className="text-3xl text-eg-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  Resultados Rápidos
                </h3>
                <p className="text-gray-600">
                  Entrega de resultados en 24-48 horas con opción de urgencias
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <FaUserMd className="text-3xl text-eg-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  Personal Calificado
                </h3>
                <p className="text-gray-600">
                  Bioanalistas especializados con años de experiencia
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <FaShieldAlt className="text-3xl text-eg-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  Confiabilidad Total
                </h3>
                <p className="text-gray-600">
                  Resultados precisos con estricto control de calidad
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <FaLaptopMedical className="text-3xl text-eg-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  Resultados en Línea
                </h3>
                <p className="text-gray-600">
                  Acceso seguro a sus resultados desde cualquier dispositivo
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <FaHandHoldingMedical className="text-3xl text-eg-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  Atención Personalizada
                </h3>
                <p className="text-gray-600">
                  Trato humano y profesional en cada visita
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <FaMapMarkerAlt className="text-3xl text-eg-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-eg-dark mb-2">
                  Ubicación Céntrica
                </h3>
                <p className="text-gray-600">
                  Fácil acceso en el corazón de Caracas
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-eg-purple to-eg-purple/80 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Su Salud es Nuestra Prioridad
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Confíe en nosotros para sus análisis clínicos. 
              43 años de experiencia nos respaldan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/estudios"
                className="px-8 py-4 bg-white text-eg-purple rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                <FaMicroscope className="mr-2" />
                Explorar Estudios
              </Link>
              <a
                href="tel:+582127620561"
                className="px-8 py-4 bg-eg-pink text-eg-dark rounded-lg font-semibold hover:bg-eg-pink/90 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                <FaPhoneAlt className="mr-2" />
                Llamar Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FaClock className="text-4xl text-eg-purple mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-eg-dark mb-2">Horarios</h3>
              <p className="text-gray-600">
                Lunes a Viernes: 7:00 AM - 4:00 PM<br />
                Sábados: 7:00 AM - 12:00 PM<br />
                Domingos: Cerrado
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FaMapMarkerAlt className="text-4xl text-eg-purple mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-eg-dark mb-2">Ubicación</h3>
              <p className="text-gray-600">
                Av. Libertador, Edificio Majestic<br />
                Piso 1, Consultorio 18<br />
                La Campiña, Caracas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <FaPhoneAlt className="text-4xl text-eg-purple mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-eg-dark mb-2">Contacto</h3>
              <p className="text-gray-600">
                Tel: (0212) 762-0561<br />
                WhatsApp: +58 414-901-9327<br />
                info@laboratorioeg.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;