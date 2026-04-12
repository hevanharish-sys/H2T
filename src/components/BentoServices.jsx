import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data'
import Reveal from './Reveal'

const ServiceCard = ({ service, index }) => {
  const divRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  const isWide = index % 4 === 0 || index % 4 === 3
  const destination = index < 6 ? '/digital-solutions' : '/creative-solutions'
  
  return (
    <Link to={destination} className={isWide ? 'md:col-span-2' : 'md:col-span-1'}>
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-sm transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] hover:-translate-y-2 group h-full"
      >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
      />
      
      <div className="relative z-10">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] mb-8 group-hover:bg-[#3B82F6] group-hover:text-white transition-colors duration-300">
          <service.icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-black mb-4 text-white font-clash">{service.title}</h3>
        <p className="text-white/40 font-medium leading-relaxed max-w-md font-sans">
          {service.description}
        </p>
      </div>
      </motion.div>
    </Link>
  )
}

const BentoServices = () => {
  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="container">
        <Reveal className="text-center mb-24">
          <p className="text-white font-bold text-xs tracking-[0.4em] uppercase mb-4 opacity-40">Services</p>
          <h2 className="section-heading text-white font-clash">What We <span className="text-[#3B82F6]">Do</span></h2>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, idx) => (
            <Reveal key={service.title} delay={idx * 100}>
              <ServiceCard service={service} index={idx} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BentoServices
