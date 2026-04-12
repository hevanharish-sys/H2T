import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks'

function AnimatedNumber({ value, suffix = '', delay = 0 }) {
  const [ref, isVisible] = useReveal()
  const displayRef = useRef(null)
  const currentValue = useRef(0)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      const duration = 1.5 // 1.5 seconds animation
      const startTime = Date.now()
      const startValue = 0
      const endValue = value

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)

        const newValue = Math.round(startValue + (endValue - startValue) * progress)
        currentValue.current = newValue

        if (displayRef.current) {
          displayRef.current.textContent = newValue
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, value, delay])

  return (
    <div ref={ref}>
      <span ref={displayRef}>0</span>
      <span>{suffix}</span>
    </div>
  )
}

export default AnimatedNumber
