"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index) =>
    index === expandedImage ? "24rem" : "5rem";

  return (
    <div className="w-full h-fit bg-black py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#3B82F6] font-bold text-xs tracking-[0.4em] uppercase mb-4 opacity-70">Showcase</p>
          <h2 className="text-4xl md:text-6xl font-black text-white font-clash uppercase tracking-tight">
            Creative <span className="text-[#3B82F6]">Portfolios</span>
          </h2>
        </div>
        
        <div className="relative flex min-h-[500px] items-center justify-center p-2 transition-all duration-300 ease-in-out lg:flex w-full overflow-hidden">
          <div className="w-full h-full overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-12">
            <div className="flex h-full w-full items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-6xl px-5">
                <div className="flex w-full items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {images.map((src, idx) => (
                    <motion.div
                      key={idx}
                      className="relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 transition-all duration-500 ease-in-out flex-shrink-0"
                      animate={{
                        width: getImageWidth(idx + 1),
                        height: "28rem",
                      }}
                      onMouseEnter={() => setExpandedImage(idx + 1)}
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        src={src}
                        alt={`Image ${idx + 1}`}
                      />
                      {idx + 1 === expandedImage && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                          <div className="text-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] mb-1">Featured Project</p>
                            <p className="text-xl font-black font-clash uppercase">Visual Storytelling {idx + 1}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
