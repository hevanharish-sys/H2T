import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CreativeSolutionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-black font-sans flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-8xl font-black text-white font-clash uppercase tracking-tight">
          Launching Soon
        </h1>
        <p className="mt-6 text-xl text-neutral-400 font-sans tracking-wide">
          Our creative experiences are being refined.
        </p>
      </motion.div>
    </div>
  );
};

export default CreativeSolutionsPage;
