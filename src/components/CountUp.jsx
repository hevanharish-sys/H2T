import { useEffect, useState } from 'react'
import { useReveal } from '../hooks'

function CountUp({ value, suffix, label, delay = 0 }) {
  const [ref, isVisible] = useReveal()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      return undefined
    }

    let frameId = 0
    const start = performance.now() + delay
    const duration = 1400

    const tick = (now) => {
      if (now < start) {
        frameId = window.requestAnimationFrame(tick)
        return
      }

      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.round(value * eased))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [delay, isVisible, value])

  return (
    <div ref={ref} className="glass-card rounded-[28px] p-6 text-left">
      <div className="text-4xl font-semibold tracking-[-0.08em] text-neutral-950 sm:text-5xl">
        {count}
        {suffix}
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.26em] text-neutral-500">
        {label}
      </p>
    </div>
  )
}

export default CountUp
