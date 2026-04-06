import { useEffect, useState } from 'react'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const nextValue = maxScroll <= 0 ? 0 : window.scrollY / maxScroll
      setProgress(nextValue)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 bg-transparent">
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,#0f68c8_0%,#147be0_55%,#49b1ff_100%)] shadow-[0_0_24px_rgba(20,123,224,0.3)] transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

export default ScrollProgress
