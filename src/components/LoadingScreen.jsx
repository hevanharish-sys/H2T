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
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full scale-150" />
          
          <img 
            src="/h2t-logo.jpeg" 
            alt="H2T Technologies" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-[2rem] relative z-10 shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Hidden spacer to keep logo centered vertically via flex-between if needed, 
          but with flex-1 + justify-center above it is already centered. 
          The user wanted "remove the text", so tagline is gone. */}
    </motion.div>
  );
};

export default LoadingScreen;
