import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import GLSLHills from './ui/glsl-hills';

const LogoisumHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-black">
      {/* GLSL Hills Background / Fallback */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <GLSLHills speed={0.8} />
      </div>

      {/* Content Overlay */}
      <div className="container relative z-10 text-center text-white px-4 pt-10">
        <Reveal>
          <div className="flex flex-col items-center">
            {/* Massive Primary Headline */}
            <h1 className="flex flex-col items-center mb-8 leading-[0.85] text-center">
              <span className="text-4xl md:text-[80px] lg:text-[100px] font-bold font-barlow tracking-[-0.04em] uppercase mb-4 opacity-100">
                AGENCY THAT MAKES YOUR
              </span>
              <span className="text-[60px] md:text-[110px] lg:text-[130px] font-serif-display italic lowercase tracking-tight -mt-4 md:-mt-8 text-neutral-300">
                products & brands scale
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-[16px] md:text-[20px] font-semibold font-barlow mb-14 max-w-4xl mx-auto opacity-70 tracking-tight leading-relaxed">
              Performance marketing, Bespoke design, and High-fidelity development for forward-thinking brands.
            </p>

            {/* Primary CTA */}
            <a href="#work-section">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black pl-10 pr-6 py-5 rounded-full flex items-center gap-6 transition-all hover:bg-neutral-100"
              >
                <span className="text-lg font-bold font-barlow uppercase tracking-widest">See Our Portfolio</span>
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                  <ArrowUpRight size={18} />
                </div>
              </motion.button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LogoisumHero;
