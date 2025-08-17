import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHistory, FaShieldAlt } from 'react-icons/fa';

const Nosotros = () => {
  const values = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Calidad Certificada',
      description: 'Cumplimos con los más altos estándares internacionales de calidad en diagnóstico clínico.',
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Equipo Especializado',
      description: 'Profesionales altamente calificados con años de experiencia en el sector médico.',
    },
    {
      icon: <FaHistory className="text-4xl" />,
      title: '20+ Años de Experiencia',
      description: 'Más de dos décadas sirviendo a la comunidad con excelencia y dedicación.',
    },
    {
      icon: <FaAward className="text-4xl" />,
      title: 'Reconocimientos',
      description: 'Múltiples certificaciones y reconocimientos por nuestro servicio de calidad.',
    },
  ];

  const team = [
    {
      name: 'Dra. Elena García',
      position: 'Directora Médica',
      specialty: 'Patología Clínica',
    },
    {
      name: 'Dr. Miguel Rodríguez',
      position: 'Jefe de Laboratorio',
      specialty: 'Microbiología',
    },
    {
      name: 'Dra. Ana Martínez',
      position: 'Especialista Senior',
      specialty: 'Hematología',
    },
    {
      name: 'Dr. Carlos López',
      position: 'Coordinador de Calidad',
      specialty: 'Química Clínica',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="gradient-medical text-white section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Sobre Nosotros
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100">
              Somos un laboratorio comprometido con la excelencia en el diagnóstico
              clínico, brindando resultados confiables y precisos para el cuidado
              de tu salud.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Nuestra Historia
              </h2>
              <p className="text-gray-700 mb-4">
                Laboratorio EG fue fundado en 2003 con la visión de proporcionar
                servicios de diagnóstico clínico de alta calidad accesibles para
                toda la comunidad.
              </p>
              <p className="text-gray-700 mb-4">
                A lo largo de los años, hemos invertido continuamente en tecnología
                de vanguardia y en la formación de nuestro equipo para mantenernos
                a la vanguardia de la medicina diagnóstica.
              </p>
              <p className="text-gray-700">
                Hoy, somos reconocidos como uno de los laboratorios más confiables
                de la región, procesando miles de muestras mensualmente con los
                más altos estándares de calidad y precisión.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-medical-navy to-medical-teal rounded-lg shadow-medical-lg flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <h3 className="text-6xl font-bold mb-2">20+</h3>
                  <p className="text-xl">Años de Experiencia</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="container-responsive">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Nuestros Valores
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-medical-teal mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-responsive">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
          >
            Nuestro Equipo
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-medical-navy to-medical-teal rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-medical-teal font-medium text-sm mb-1">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;