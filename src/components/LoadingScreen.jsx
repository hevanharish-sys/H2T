import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MagicRings from './MagicRings';

const LoadingScreen = ({ onComplete }) => {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Dismiss loading screen after 8 seconds
    const timer = setTimeout(() => {
      onCompleteRef.current?.();
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col justify-between items-center cursor-pointer"
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onClick={() => onCompleteRef.current?.()}
    >
      <div className="absolute inset-0 z-0">
        <MagicRings 
          color="#3B82F6" 
          colorTwo="#fc42ff" 
          speed={1.2}
          ringCount={8}
          followMouse={true}
        />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none mt-20">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-black font-clash uppercase tracking-tighter"
        >
          H2T Technologies
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        className="relative z-10 mb-16 text-white/40 uppercase tracking-[0.5em] text-xs md:text-sm font-bold pointer-events-none"
      >
        design <span className="mx-4 text-white/20">•</span> inspire <span className="mx-4 text-white/20">•</span> create
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
