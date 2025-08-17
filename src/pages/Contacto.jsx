import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('Gracias por contactarnos. Te responderemos pronto.');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    });
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: 'Teléfono',
      info: '+52 (555) 123-4567',
      link: 'tel:+525551234567',
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: 'WhatsApp',
      info: '+52 (555) 987-6543',
      link: 'https://wa.me/525559876543',
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email',
      info: 'contacto@laboratorioeg.com',
      link: 'mailto:contacto@laboratorioeg.com',
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Dirección',
      info: 'Av. Principal #123, Col. Centro, Ciudad de México',
      link: '#',
    },
  ];

  const schedule = [
    { day: 'Lunes - Viernes', hours: '7:00 AM - 7:00 PM' },
    { day: 'Sábado', hours: '7:00 AM - 2:00 PM' },
    { day: 'Domingo', hours: '8:00 AM - 12:00 PM' },
  ];

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
              Contáctanos
            </h1>
            <p className="text-xl text-eg-gray">
              Estamos aquí para atender todas tus consultas
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-eg-purple">
                Envíanos un mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-eg-gray" htmlFor="nombre">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="input mt-1"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-eg-gray" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input mt-1"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-eg-gray" htmlFor="telefono">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="input mt-1"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-eg-gray" htmlFor="mensaje">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    className="input mt-1 h-auto"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Enviar mensaje
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-eg-grayDark">
                  Información de contacto
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="text-eg-purple mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-eg-grayDark">{item.title}</h4>
                        <p className="text-eg-gray">{item.info}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-eg-grayDark">
                  <FaClock className="text-eg-purple" />
                  Horario de atención
                </h3>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium text-eg-grayDark">{item.day}</span>
                      <span className="text-eg-gray">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-eg-pinkLight/20 section-padding">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-eg-grayDark">
              Encuentra nuestra ubicación
            </h2>
            <div className="aspect-video bg-gray-300 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <FaMapMarkerAlt className="text-6xl mb-4 mx-auto text-eg-purple" />
                  <p className="text-eg-gray">Mapa interactivo</p>
                  <p className="text-sm mt-2 text-eg-gray">Av. Principal #123, Col. Centro</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;