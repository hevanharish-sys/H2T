"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * TimelineContent Component (Compatibility Layer)
 * 
 * Provides a scroll-aware staggered animation for timeline items.
 * 
 * @param {React.ReactNode} children - Content to animate
 * @param {number} animationNum - Order of animation for staggering
 * @param {React.RefObject} timelineRef - (Unused in simple version) Reference to the container
 * @param {Object} customVariants - Custom motion variants for the animation
 * @param {string} className - Additional CSS classes
 * @param {string|React.Component} as - Wrapper element type
 */
export const TimelineContent = ({
  children,
  animationNum = 0,
  timelineRef,
  customVariants,
  className = "",
  as: Component = "div",
}) => {
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const variants = customVariants || defaultVariants;

  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={animationNum}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
};

