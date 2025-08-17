import { motion } from 'framer-motion';
import { FaFlask, FaMicroscope, FaVial, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: <FaMicroscope className="text-3xl" />,
      title: 'Análisis Clínicos',
      description: 'Estudios completos de sangre, orina y más',
    },
    {
      icon: <FaVial className="text-3xl" />,
      title: 'Química Sanguínea',
      description: 'Perfiles completos de glucosa, colesterol y triglicéridos',
    },
    {
      icon: <FaFlask className="text-3xl" />,
      title: 'Microbiología',
      description: 'Cultivos y antibiogramas especializados',
    },
    {
      icon: <FaClipboardCheck className="text-3xl" />,
      title: 'Resultados Rápidos',
      description: 'Entrega de resultados en 24-48 horas',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="gradient-eg text-white section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-eg-grayDark">
              ELIZABETH GUTIÉRREZ
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-eg-gray">
              Laboratorio Clínico y Microbiológico
            </p>
            <p className="text-lg mb-8 text-eg-gray">
              43 años de experiencia en análisis clínicos
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/estudios" className="btn bg-eg-purple text-white hover:bg-eg-purpleDark">
                Ver Estudios
              </Link>
              <Link to="/contacto" className="btn btn-outline border-eg-purple text-eg-purple hover:bg-eg-purple/10">
                Contactar
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card hover:shadow-medical-lg transition-all duration-300"
                >
                  <div className="text-eg-purple mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-eg-grayDark">{service.title}</h3>
                  <p className="text-eg-gray">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-eg-pinkLight/20 section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-eg-purple">
              ¿Por qué elegir Laboratorio Elizabeth Gutiérrez?
            </h2>
            <p className="text-lg text-eg-gray mb-8">
              Con más de 43 años de experiencia, somos un laboratorio clínico y
              microbiológico que cumple con los mejores estándares de calidad
              y precios competitivos en el territorio nacional.
            </p>
            <Link to="/nosotros" className="btn btn-primary">
              Conocer más
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;