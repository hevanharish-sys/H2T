import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import DigitalSolutions from './pages/DigitalSolutions'
import ProjectCalculatorPage from './pages/ProjectCalculatorPage'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Handle hash scrolling
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Use multiple attempts to ensure scrolling works as dynamic 3D elements load
        const scrollJob = () => element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        scrollJob();
        const t1 = setTimeout(scrollJob, 300);
        const t2 = setTimeout(scrollJob, 800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    // Add Visme script globally
    const script = document.createElement('script');
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden min-h-screen relative">
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div style={{ 
        opacity: loading ? 0 : 1, 
        transition: "opacity 0.8s ease-out",
        visibility: loading ? 'hidden' : 'visible'
      }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="digital-solutions" element={<DigitalSolutions />} />
              <Route path="project-estimation" element={<ProjectCalculatorPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
