import { motion } from 'framer-motion'
import { useReveal } from '../hooks'
import React from 'react'

function SplitText({ children, className = '' }) {
  const [ref, isVisible] = useReveal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05
      }
    }
  }

  const characterVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  }

  // Extract and flatten text from React elements
  const extractText = (element) => {
    if (typeof element === 'string') return element
    if (React.isValidElement(element)) {
      return React.Children.toArray(element.props.children)
        .map(extractText)
        .join('')
    }
    if (Array.isArray(element)) {
      return element.map(extractText).join('')
    }
    return ''
  }

  const text = extractText(children)
  const characters = text.split('')

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      style={{ display: 'inline' }}
    >
      {characters.map((char, idx) => {
        const textPos = text.slice(0, idx).length
        let isHighlighted = false

        // Check if this character is part of "H2T"
        const h2tStart = text.indexOf('H2T')
        if (h2tStart !== -1 && idx >= h2tStart && idx < h2tStart + 3) {
          isHighlighted = true
        }

        return (
          <motion.span
            key={idx}
            variants={characterVariants}
            className={isHighlighted ? 'text-white font-black' : ''}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </motion.div>
  )
}

export default SplitText
