import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaBell,
  FaUser,
  FaFlask,
  FaShoppingCart,
  FaHeart,
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { useUnifiedApp } from '../contexts/UnifiedAppContext';

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { cart, favorites } = useUnifiedApp();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + (item.cantidad || 1), 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="h-16">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left section: Menu toggle and Logo */}
            <div className="flex items-center gap-4">
              {/* Menu Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMenuToggle}
                className="p-2.5 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400 hover:from-primary-500/20 hover:to-secondary-500/20 transition-all duration-300 lg:hidden"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isSidebarOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                  <img 
                    src="/LogoEG.png" 
                    alt="Laboratorio Elizabeth Gutiérrez" 
                    className="h-10 w-auto relative z-10"
                  />
                </motion.div>
                <div className="hidden sm:block">
                  <div className="flex flex-col">
                    <span className="text-2xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Laboratorio Clínico
                    </span>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      ELIZABETH GUTIÉRREZ
                    </h1>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center section: Navigation Menu */}
            <nav className="flex-1 hidden md:block">
              <ul className="flex items-center justify-center gap-1">
                <li>
                  <Link
                    to="/"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-eg-purple dark:hover:text-eg-purple transition-colors rounded-lg hover:bg-eg-purple/5"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/estudios"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-eg-purple dark:hover:text-eg-purple transition-colors rounded-lg hover:bg-eg-purple/5"
                  >
                    Estudios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/nosotros"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-eg-purple dark:hover:text-eg-purple transition-colors rounded-lg hover:bg-eg-purple/5"
                  >
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-eg-purple dark:hover:text-eg-purple transition-colors rounded-lg hover:bg-eg-purple/5"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resultados"
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-eg-purple dark:hover:text-eg-purple transition-colors rounded-lg hover:bg-eg-purple/5"
                  >
                    Resultados
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right section: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search button - now visible on all screens */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/buscar')}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <FaSearch size={18} />
              </motion.button>

              {/* Favorites */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/favoritos')}
                className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Favorites"
              >
                <FaHeart size={18} />
                {favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-2xs font-bold rounded-full flex items-center justify-center"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/presupuesto')}
                className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Cart"
              >
                <FaShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-2xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaSun size={18} className="text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaMoon size={18} className="text-blue-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
                aria-label="Notifications"
              >
                <FaBell size={18} />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              </motion.button>

              {/* User menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 pr-3 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 hover:from-primary-500/20 hover:to-secondary-500/20 transition-all duration-300"
                  aria-label="User menu"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                    <FaUser size={14} />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Usuario
                  </span>
                </motion.button>

                {/* User dropdown menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="py-2">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          Mi Perfil
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          Resultados
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          Configuración
                        </a>
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        <a href="#" className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          Cerrar Sesión
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;