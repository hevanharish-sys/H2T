import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const words = ["Design", "Create", "Inspire"]
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    let start;
    const duration = 2700; // Exact 2.7 seconds specification

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(animate);
      } else {
        // Wait 400ms after reaching 100 as per spec
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 400);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 900); // 900ms interval per word

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[var(--bg-loader)] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Element 1: "Portfolio" Label (Top-Left) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-black/40 uppercase tracking-[0.3em] font-sans"
      >
        H2T Technologies
      </motion.div>

      {/* Element 2: Rotating Words (Center) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-black"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Element 3: Counter (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-black tabular-nums"
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* Element 4: Progress Bar (Bottom Edge) */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/5">
        <motion.div
          className="h-full origin-left bg-black"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          style={{ boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)" }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </motion.div>
  )
}

export default LoadingScreen
