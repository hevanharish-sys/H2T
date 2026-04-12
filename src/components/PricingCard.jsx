import { motion } from 'framer-motion'
import { Check, ArrowRight, Star } from 'lucide-react'
import { useReveal } from '../hooks'
import BorderGlow from './BorderGlow'
import MagneticButton from './MagneticButton'

function PricingCard({ plan, index, selectedCurrency }) {
  const [ref, isVisible] = useReveal()
  const currentPrices = plan.prices[selectedCurrency]

  const combinedVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={combinedVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="w-full"
    >
      <BorderGlow
        className="w-full max-w-5xl mx-auto overflow-visible"
        borderRadius={32}
        glowColor="255 255 255"
        colors={['#ffffff', '#737373', '#ffffff']}
        animated={index === 1}
        backgroundColor="rgba(0, 0, 0, 0.4)"
        fillOpacity={0}
      >
        <div className="relative p-8 md:p-12 transition-all duration-500 group">
          <div className="flex flex-col gap-10">
            {/* Header Row: Title & Price */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
              <div className="space-y-4 flex-grow">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none font-clash">
                    {plan.name}
                  </h3>
                  {plan.highlighted && (
                    <div className="badge-monochrome shrink-0">
                      <Star className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  )}
                </div>
                <p className="text-gray-400 font-medium max-w-xl text-base md:text-lg leading-relaxed font-sans">
                  {plan.description}
                </p>
              </div>

              <div className="lg:text-right shrink-0">
                <motion.div 
                   key={selectedCurrency}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3 }}
                   className="flex flex-col lg:items-end justify-center h-full min-w-[240px]"
                >
                  {currentPrices.original && (
                    <span className="text-xl text-gray-500 line-through font-bold mb-1">
                      {currentPrices.original}
                    </span>
                  )}
                  <div className="flex items-baseline lg:justify-end gap-2 text-white">
                    <span className="text-5xl md:text-7xl font-black whitespace-nowrap font-clash">
                      {currentPrices.current === 'Custom' ? (
                        'Custom'
                      ) : currentPrices.current}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-black text-white/60 uppercase tracking-[0.3em] mt-3 border-t border-white/10 pt-2 w-fit lg:ml-auto">
                    {currentPrices.current === 'Custom' ? 'Quote Based' : currentPrices.period}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Content Row: Features & CTA */}
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Features Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                {plan.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover/item:border-white/40 transition-colors">
                      <Check className="w-3.5 h-3.5 text-white group-hover/item:scale-110 transition-transform" />
                    </div>
                    <span className="text-white/80 font-medium text-sm md:text-base tracking-wide font-sans">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Area */}
              <div className="lg:col-span-4 flex justify-end">
                <MagneticButton
                  href="#contact"
                  variant="primary"
                  className="w-full md:w-auto"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  )
}

export default PricingCard
