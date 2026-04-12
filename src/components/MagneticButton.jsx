import { useRef } from 'react'
import { MoveRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'

function MagneticButton({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const buttonRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const handleMove = (event) => {
    if (prefersReducedMotion || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.15
    const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.2
    buttonRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.02)`
  }

  const handleLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)'
    }
  }

  const variants = {
    primary: 'bg-white text-black hover:bg-neutral-200 shadow-lg',
    glass: 'bg-white/[0.06] backdrop-blur-md border border-white/15 text-white hover:bg-white/[0.1] hover:border-white/40 shadow-sm'
  }

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 no-underline overflow-hidden ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Shimmer Effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-25deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
      
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </a>
  )
}

export default MagneticButton
