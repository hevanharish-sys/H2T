import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useReveal } from '../hooks'

function VideoPlayer({ project }) {
  const [ref, isVisible] = useReveal()

  return (
    <div ref={ref} className="flex-1 w-full px-6 md:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-3xl overflow-hidden group cursor-pointer h-full w-full"
      >
        {/* Project Image */}
        <div className="w-full h-full bg-gradient-to-br from-white/5 via-black to-white/5 rounded-3xl overflow-hidden border-2 border-white/10 relative text-white font-clash">
          
          {/* Placeholder Image - Replace with actual screenshot */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/5">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="text-6xl font-black text-white mb-4">
                  {project.number}
                </div>
                <p className="text-white font-bold text-xl">{project.title}</p>
                <p className="text-white/60 font-semibold mt-2 font-sans">{project.highlight}</p>
              </div>
            )}
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <a
              href="https://theelitetrader.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-all"
            >
              Visit Site
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Border Glow */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-500 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  )
}

export default VideoPlayer
