import { motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, description }) {
  const MotionSpan = motion.span

  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#147be0]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-5xl">
        {title.split('').map((letter, index) => (
          <MotionSpan
            key={`${letter}-${index}`}
            className={letter === ' ' ? 'inline-block w-3' : 'inline-block gradient-text'}
            initial={{ opacity: 0, y: '0.65em' }}
            whileInView={{ opacity: 1, y: '0em' }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 0.52, delay: index * 0.018, ease: [0.22, 1, 0.36, 1] }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </MotionSpan>
        ))}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-neutral-600 sm:text-lg">
        {description}
      </p>
    </div>
  )
}

export default SectionHeading
