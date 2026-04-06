import { useReveal } from '../hooks'

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal
