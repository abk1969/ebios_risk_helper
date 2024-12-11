import React, { useMemo } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Pages principales
import LandingPage from './landingpage';
import { EbiosAnalysis } from './components/EbiosAnalysis';
import { ResultsPage } from './components/ResultsPage';
import { DocumentationPage } from './components/pages/DocumentationPage';
import { DashboardPage } from './components/pages/DashboardPage';
import NotFoundPage from './components/pages/NotFoundPage';

// Composants de layout
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Providers et contextes
import { AnalysisProvider } from './context/AnalysisContext';
import { ProgressProvider } from './context/ProgressContext';

// Composant racine
const Root: React.FC = () => {
  const location = useLocation();

  // Optimisation du rendu avec useMemo pour les routes
  const routes = useMemo(() => (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analysis" element={<EbiosAnalysis />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  ), [location]);

  return (
    <AnalysisProvider>
      <ProgressProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Navbar />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait" initial={false}>
              <React.Suspense fallback={<LoadingSpinner />}>
                {routes}
              </React.Suspense>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </ProgressProvider>
    </AnalysisProvider>
  );
};

// Composant App avec BrowserRouter
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/ebios_risk_helper">
      <Root />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-background text-foreground border border-border',
          duration: 3000,
          success: {
            icon: '✅',
            className: 'border-green-500',
          },
          error: {
            icon: '❌',
            className: 'border-red-500',
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;