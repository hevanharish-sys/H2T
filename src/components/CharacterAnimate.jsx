import { motion } from 'framer-motion';
import { useReveal } from '../hooks';

const CharacterAnimate = ({ text, delay = 0, className = "", isAccent = false }) => {
  const [ref, isVisible] = useReveal();
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`${className} ${isAccent ? "hero-title-accent" : ""}`}
      style={{ 
        display: "inline", 
        whiteSpace: "pre-wrap",
        backgroundClip: "inherit",
        WebkitBackgroundClip: "inherit",
        color: "inherit",
        fontFamily: "inherit"
      }}
    >
      {characters.map((character, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ 
            display: "inline-block",
            backgroundClip: "inherit",
            WebkitBackgroundClip: "inherit",
            color: "inherit",
            fontFamily: "inherit"
          }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default CharacterAnimate;
