import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import DigitalSolutions from './pages/DigitalSolutions'
import CreativeSolutions from './pages/CreativeSolutions'
import ProjectCalculatorPage from './pages/ProjectCalculatorPage'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

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
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <div style={{ 
        opacity: loading ? 0 : 1, 
        transition: "opacity 0.5s ease-out",
        visibility: loading ? 'hidden' : 'visible'
      }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
              <Route index element={<Home loading={loading} />} />
              <Route path="digital-solutions" element={<DigitalSolutions />} />
              <Route path="creative-solutions" element={<CreativeSolutions />} />
              <Route path="project-estimation" element={<ProjectCalculatorPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
