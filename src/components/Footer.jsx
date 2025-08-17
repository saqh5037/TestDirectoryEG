import { Link } from 'react-router-dom';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaFlask,
  FaShieldAlt,
  FaCertificate,
  FaAward,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Estudios', path: '/estudios' },
    { name: 'Resultados', path: '/resultados' },
    { name: 'Citas', path: '/citas' },
    { name: 'Nosotros', path: '/nosotros' },
  ];

  const services = [
    { name: 'Hematología', path: '/estudios/hematologia' },
    { name: 'Química Sanguínea', path: '/estudios/quimica' },
    { name: 'Microbiología', path: '/estudios/microbiologia' },
    { name: 'Inmunología', path: '/estudios/inmunologia' },
  ];

  const certifications = [
    { icon: <FaShieldAlt />, name: 'ISO 9001:2015' },
    { icon: <FaCertificate />, name: 'ISO 15189:2012' },
    { icon: <FaAward />, name: 'CAP Certified' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/525551234567', label: 'WhatsApp' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-eg-grayDark text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/LogoEG.png" 
                alt="Laboratorio Elizabeth Gutiérrez" 
                className="h-14 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold">ELIZABETH GUTIÉRREZ</h3>
                <p className="text-xs text-gray-400">Laboratorio Clínico Microbiológico</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Más de 43 años brindando servicios de análisis clínicos con los más altos
              estándares de calidad y precisión.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-eg-purple/20 rounded-lg flex items-center justify-center hover:bg-eg-purple transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-eg-purple mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Av. Principal #123, Col. Centro, Ciudad de México, 06000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-eg-purple flex-shrink-0" />
                <span className="text-gray-400 text-sm">+52 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-eg-purple flex-shrink-0" />
                <span className="text-gray-400 text-sm">contacto@laboratorioeg.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-eg-purple mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>Lun - Vie: 7:00 AM - 7:00 PM</p>
                  <p>Sábado: 7:00 AM - 2:00 PM</p>
                  <p>Domingo: 8:00 AM - 12:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-400"
              >
                <span className="text-2xl text-eg-purple">{cert.icon}</span>
                <span className="text-sm font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {currentYear} Laboratorio Elizabeth Gutiérrez. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <Link
                to="/privacidad"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Privacidad
              </Link>
              <Link
                to="/terminos"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Términos
              </Link>
              <Link
                to="/cookies"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;