import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShipPreloader } from './components/preloader/ShipPreloader';
import { Home } from './pages/Home';
import { Team } from './pages/Team';
import { initLenis, cleanupLenis } from './lib/lenis';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scroll during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Initialize Lenis smooth scroll after preloader
  useEffect(() => {
    if (!isLoading && showContent) {
      initLenis();

      return () => {
        cleanupLenis();
      };
    }
  }, [isLoading, showContent]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Preloader */}
        <ShipPreloader onComplete={handlePreloaderComplete} />

        {/* Main Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
