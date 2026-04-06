import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function Loader() {
  const MotionDiv = motion.div
  const MotionSpan = motion.span
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1300)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <MotionDiv
      className="fixed inset-0 z-[90] flex items-center justify-center bg-white/88 backdrop-blur-2xl"
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="space-y-6 text-center">
        <div className="mx-auto grid w-28 grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <MotionSpan
              key={index}
              className="h-3 rounded-full bg-[linear-gradient(135deg,#0f68c8,#147be0)] shadow-[0_0_18px_rgba(20,123,224,0.24)]"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.92, 1, 0.92] }}
              transition={{
                duration: 1.1,
                ease: 'easeInOut',
                delay: index * 0.06,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
          H2T Technologies
        </p>
      </div>
    </MotionDiv>
  )
}

export default Loader
