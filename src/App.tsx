import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { DataMesh } from './components/DataMesh';
import { Navbar } from './components/Navbar';
import { ScrollToTopBtn } from './components/ScrollToTopBtn';
import { Home } from './pages/Home';
import { ProjectDetails } from './pages/ProjectDetails';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/proyecto/:id" element={<ProjectDetails />} />
        </Routes>
      </AnimatePresence>
    </LayoutGroup>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Preloader />
      <CustomCursor />
      <DataMesh />
      <Navbar />
      <ScrollToTopBtn />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
