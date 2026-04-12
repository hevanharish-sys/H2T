import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardSwap, { Card } from './CardSwap';
import { projects } from '../../data';
import { ArrowUpRight } from 'lucide-react';

const CardSwapWorkSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 550 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({ width: 280, height: 400 });
      } else {
        setDimensions({ width: 400, height: 550 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const activeProject = projects[activeIdx] || projects[0];

  return (
    <section className="min-h-screen bg-black relative flex flex-col md:flex-row items-center py-32 px-6 gap-x-12 gap-y-24 overflow-visible">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Left side: Project Details */}
      <div className="w-full md:w-1/2 md:pl-20 relative z-20 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="will-change-transform"
          >
            <div className="inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/50 mb-8 backdrop-blur-sm shadow-xl">
              Project {activeProject.number} • {activeProject.tag}
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
              {activeProject.title}
            </h2>
            
            <p className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-12">
              {activeProject.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {activeProject.features.map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                  <span className="text-sm font-bold text-white/70">{f}</span>
                </div>
              ))}
            </div>

            <a 
              href={activeProject.embedUrl} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Launch Site <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side: Card Swap Anim */}
      <div className="w-full md:w-1/2 relative h-[450px] md:h-[700px] z-10 flex items-center justify-center pointer-events-none mt-10 md:mt-0">
        <div className="relative md:absolute md:right-[20%] md:top-[40%] flex items-center justify-center w-full">
          <CardSwap
            width={dimensions.width}
            height={dimensions.height}
            onCardChange={setActiveIdx}
            delay={5000}
            cardDistance={60}
            verticalDistance={70}
            pauseOnHover={true}
          >
            {projects.map((p, i) => (
              <Card key={i} className="rounded-[2rem] overflow-hidden border-2 border-white/10 flex items-center justify-center bg-neutral-900 group shadow-2xl pointer-events-auto cursor-pointer" onClick={() => window.open(p.embedUrl, '_blank')}>
                  {/* Overlay to dim background cards */}
                  <div className="absolute inset-0 z-10 bg-black/30 group-hover:bg-black/0 transition-colors pointer-events-none" />
                  
                  {/* Iframe dynamically scaled to fit within the card bounds */}
                  {/* Scaled 50% so we have an ultra crisp mini-view of the live site */}
                  <iframe 
                    src={p.embedUrl}
                    className="absolute top-0 left-0 border-none pointer-events-none origin-top-left"
                    style={{ 
                      width: '200%', 
                      height: '200%',
                      transform: 'scale(0.5)'
                    }} 
                    tabIndex={-1}
                  />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default CardSwapWorkSection;
