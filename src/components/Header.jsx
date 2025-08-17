import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaBell,
  FaUser,
  FaFlask,
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Menu toggle and Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/LogoEG.png" 
                alt="Laboratorio Elizabeth Gutiérrez" 
                className="h-12 w-auto"
              />
              <div className="hidden sm:block">
                <div className="flex flex-col">
                  <span className="text-xs text-eg-gray uppercase tracking-wider">Laboratorio Clínico</span>
                  <h1 className="text-xl font-bold text-eg-grayDark dark:text-eg-purple">
                    ELIZABETH GUTIÉRREZ
                  </h1>
                  <span className="text-xs text-eg-gray">Microbiológico</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center section: Search bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div className={`relative transition-all duration-200 ${
                isSearchFocused ? 'scale-105' : ''
              }`}>
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar estudios, análisis, resultados..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-eg-pink dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eg-purple focus:border-transparent dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes size={14} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right section: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile search button */}
            <button
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
              aria-label="Search"
            >
              <FaSearch size={20} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Notifications"
            >
              <FaBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <button
              className="flex items-center gap-2 p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-eg-purple to-eg-pink rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <span className="hidden sm:block text-sm font-medium">
                Admin
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <motion.div
          initial={false}
          animate={{ height: isSearchFocused ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <form onSubmit={handleSearch} className="py-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar estudios..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-eg-pink dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eg-purple dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;