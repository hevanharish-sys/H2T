import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks'

function TypeWriter({ text, className = '', speed = 50, delay = 0 }) {
  const [ref, isVisible] = useReveal()
  const [displayedText, setDisplayedText] = useState('')
  const indexRef = useRef(0)

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('')
      indexRef.current = 0
      return
    }

    const timeout = setTimeout(() => {
      if (indexRef.current < text.length) {
        const interval = setInterval(() => {
          setDisplayedText((prev) => {
            if (prev.length < text.length) {
              indexRef.current += 1
              return text.slice(0, indexRef.current)
            }
            return prev
          })
        }, speed)

        return () => clearInterval(interval)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, text, speed, delay])

  return (
    <p ref={ref} className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </p>
  )
}

export default TypeWriter
