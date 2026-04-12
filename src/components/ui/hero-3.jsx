"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// Reusable Button component styled with H2T brand red
const ActionButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="mt-8 px-10 py-5 rounded-full bg-[#FF5656] text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(255,86,86,0.3)] transition-all hover:bg-[#FF7A56] focus:outline-none"
  >
    {children}
  </motion.button>
);

// The main hero component
export const AnimatedMarqueeHero = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className,
  onCtaClick
}) => {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full h-[90vh] md:h-screen overflow-hidden bg-black flex flex-col items-center justify-center text-center px-4",
        className
      )}
    >
      <div className="z-20 flex flex-col items-center max-w-5xl mx-auto pt-20">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-8 inline-block rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/50 backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="text-5xl md:text-8xl lg:text-[110px] font-black tracking-tighter text-white leading-[0.85] font-clash"
        >
          {typeof title === 'string' ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-10 max-w-2xl text-lg md:text-xl text-white/40 font-medium leading-relaxed font-sans"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
        >
          <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
        </motion.div>
      </div>

      {/* Animated Image Marquee */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_40%,black_60%,transparent)] z-10 pointer-events-none opacity-40">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["-50%", "0%"],
            transition: {
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-56 md:h-80 flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -3 : 6)}deg`,
              }}
            >
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5656]/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
};
