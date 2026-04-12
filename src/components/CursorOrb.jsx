import { useEffect, useEffectEvent, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function CursorOrb() {
  const MotionDiv = motion.div
  const prefersReducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMove = useEffectEvent((event) => {
    setPosition({ x: event.clientX, y: event.clientY })
  })

  const handleHover = useEffectEvent((event) => {
    const target = event.target
    if (!(target instanceof HTMLElement)) {
      return
    }

    setHovered(Boolean(target.closest('[data-cursor="interactive"]')))
  })

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(pointer:fine)')
    const syncPointer = () => setEnabled(mediaQuery.matches)
    syncPointer()

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleHover)
    mediaQuery.addEventListener('change', syncPointer)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleHover)
      mediaQuery.removeEventListener('change', syncPointer)
    }
  }, [prefersReducedMotion])

  if (!enabled) {
    return null
  }

  return (
    <>
      <MotionDiv
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-7 w-7 rounded-full border border-white/30 bg-white/25 shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-xl md:block"
        animate={{
          x: position.x - (hovered ? 26 : 14),
          y: position.y - (hovered ? 26 : 14),
          scale: hovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.5 }}
      />
      <MotionDiv
        className="pointer-events-none fixed left-0 top-0 z-[79] hidden h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(255,255,255,0.01)_70%)] blur-xl md:block"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: hovered ? 1.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.9 }}
      />
    </>
  )
}

export default CursorOrb
