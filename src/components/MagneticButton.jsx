import { useRef } from 'react'
import { MoveRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'

function MagneticButton({ children, href, variant = 'primary' }) {
  const buttonRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const handleMove = (event) => {
    if (prefersReducedMotion || !buttonRef.current) {
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.18
    const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.22
    buttonRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
  }

  const handleLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
  }

  return (
    <a
      ref={buttonRef}
      href={href}
      data-cursor="interactive"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={[
        'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition duration-300 will-change-transform',
        variant === 'primary'
          ? 'bg-[linear-gradient(135deg,#0f68c8_0%,#147be0_58%,#33a2ff_100%)] text-white shadow-[0_18px_45px_rgba(20,123,224,0.28)]'
          : 'glass-card border border-[#d7e9fb] text-neutral-900 shadow-[0_18px_40px_rgba(23,23,23,0.08)]',
      ].join(' ')}
    >
      <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.75),transparent)] transition duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <MoveRight className="relative h-4 w-4 transition duration-300 group-hover:translate-x-1" />
    </a>
  )
}

export default MagneticButton
