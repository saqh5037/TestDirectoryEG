import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { UnifiedAppProvider } from './contexts/UnifiedAppContext';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import PWAWrapper from './components/PWAComponents';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import pwaManager from './utils/pwa';

// Lazy loading de páginas para code splitting
const LandingPageModern = lazy(() => import('./pages/LandingPageModern'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Home = lazy(() => import('./pages/Home'));
const Estudios = lazy(() => import('./pages/Estudios'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Contacto = lazy(() => import('./pages/Contacto'));
const TreeViewDemo = lazy(() => import('./pages/TreeViewDemo'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

// Nuevas páginas del directorio
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BudgetPage = lazy(() => import('./pages/BudgetPage'));

function App() {
  useEffect(() => {
    // Inicializar PWA al cargar la aplicación
    pwaManager.init();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UnifiedAppProvider>
          <Router>
            {/* Toast notifications */}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#7B68A6',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            
            <PWAWrapper>
              <MainLayout>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<LandingPageModern />} />
                    <Route path="/landing-old" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/estudios" element={<Estudios />} />
                    <Route path="/estudios/tree" element={<TreeViewDemo />} />
                    <Route path="/estudios/:category" element={<Estudios />} />
                    <Route path="/buscar" element={<SearchPage />} />
                    <Route path="/favoritos" element={<FavoritesPage />} />
                    <Route path="/presupuesto" element={<BudgetPage />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/resultados" element={<div className="p-8 text-center">Página de Resultados (Próximamente)</div>} />
                    <Route path="/pacientes" element={<div className="p-8 text-center">Página de Pacientes (Próximamente)</div>} />
                    <Route path="/reportes" element={<div className="p-8 text-center">Página de Reportes (Próximamente)</div>} />
                    <Route path="/configuracion" element={<div className="p-8 text-center">Página de Configuración (Próximamente)</div>} />
                    <Route path="/ayuda" element={<div className="p-8 text-center">Página de Ayuda (Próximamente)</div>} />
                  </Routes>
                </Suspense>
              </MainLayout>
            </PWAWrapper>
          </Router>
        </UnifiedAppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App
