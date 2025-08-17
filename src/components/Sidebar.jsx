import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaFlask,
  FaVial,
  FaMicroscope,
  FaClipboardList,
  FaUserMd,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronRight,
  FaFilter,
  FaCalendarAlt,
  FaDollarSign,
  FaClock,
  FaHeart,
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(['estudios']);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    deliveryTime: 'all',
    category: 'all',
  });

  const navigation = [
    {
      id: 'inicio',
      name: 'Inicio',
      icon: <FaHome />,
      path: '/',
    },
    {
      id: 'estudios',
      name: 'Estudios',
      icon: <FaFlask />,
      path: '/estudios',
      children: [
        { name: 'Hematología', path: '/estudios/hematologia', icon: <FaVial /> },
        { name: 'Química Sanguínea', path: '/estudios/quimica', icon: <FaMicroscope /> },
        { name: 'Microbiología', path: '/estudios/microbiologia', icon: <FaClipboardList /> },
        { name: 'Inmunología', path: '/estudios/inmunologia', icon: <FaUserMd /> },
      ],
    },
    {
      id: 'favoritos',
      name: 'Favoritos',
      icon: <FaHeart />,
      path: '/favoritos',
    },
    {
      id: 'resultados',
      name: 'Resultados',
      icon: <FaClipboardList />,
      path: '/resultados',
    },
    {
      id: 'pacientes',
      name: 'Pacientes',
      icon: <FaUserMd />,
      path: '/pacientes',
    },
    {
      id: 'reportes',
      name: 'Reportes',
      icon: <FaChartBar />,
      path: '/reportes',
    },
  ];

  const bottomNavigation = [
    {
      id: 'configuracion',
      name: 'Configuración',
      icon: <FaCog />,
      path: '/configuracion',
    },
    {
      id: 'ayuda',
      name: 'Ayuda',
      icon: <FaQuestionCircle />,
      path: '/ayuda',
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (item) => {
    if (item.children) {
      return item.children.some(child => location.pathname.startsWith(child.path));
    }
    return false;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-30 overflow-y-auto lg:translate-x-0 ${
          isOpen ? '' : 'lg:w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-1">
              {navigation.map(item => (
                <div key={item.id}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleSection(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                          isParentActive(item)
                            ? 'bg-eg-pinkLight dark:bg-eg-purple/20 text-eg-purple dark:text-eg-pink'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {expandedSections.includes(item.id) ? (
                          <FaChevronDown size={12} />
                        ) : (
                          <FaChevronRight size={12} />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedSections.includes(item.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 mt-1 space-y-1 overflow-hidden"
                          >
                            {item.children.map(child => (
                              <Link
                                key={child.path}
                                to={child.path}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                  isActive(child.path)
                                    ? 'bg-eg-pinkLight dark:bg-eg-purple/20 text-eg-purple dark:text-eg-pink'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                              >
                                {child.icon}
                                <span className="text-sm">{child.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-eg-pinkLight dark:bg-eg-purple/20 text-eg-purple dark:text-eg-pink'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Filters Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="flex items-center gap-2 px-3 mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                <FaFilter size={14} />
                Filtros Rápidos
              </h3>

              <div className="space-y-4">
                {/* Price Range Filter */}
                <div className="px-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaDollarSign size={14} />
                    Rango de Precio
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-eg-pink dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eg-purple"
                  >
                    <option value="all">Todos</option>
                    <option value="0-500">$0 - $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000+">$1,000+</option>
                  </select>
                </div>

                {/* Delivery Time Filter */}
                <div className="px-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaClock size={14} />
                    Tiempo de Entrega
                  </label>
                  <select
                    value={filters.deliveryTime}
                    onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-eg-pink dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eg-purple"
                  >
                    <option value="all">Todos</option>
                    <option value="same-day">Mismo día</option>
                    <option value="24h">24 horas</option>
                    <option value="48h">48 horas</option>
                    <option value="72h+">72+ horas</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="px-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FaCalendarAlt size={14} />
                    Categoría
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-eg-pink dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eg-purple"
                  >
                    <option value="all">Todas</option>
                    <option value="urgente">Urgente</option>
                    <option value="rutina">Rutina</option>
                    <option value="especializado">Especializado</option>
                  </select>
                </div>
              </div>
            </div>
          </nav>

          {/* Bottom navigation */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {bottomNavigation.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-eg-pinkLight dark:bg-eg-purple/20 text-eg-purple dark:text-eg-pink'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;