"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import Floating, { FloatingElement } from "./ui/parallax-floating"

const creativeImages = [
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
    title: "Modern Workspace",
  },
  {
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    title: "Lush Nature",
  },
  {
    url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop",
    title: "Corporate Excellence",
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    title: "Mountain Heights",
  },
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
    title: "Team Collaboration",
  },
  {
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop",
    title: "Scenic Horizon",
  },
  {
    url: "https://images.unsplash.com/photo-1518005020251-58296b97bc6e?q=80&w=2000&auto=format&fit=crop",
    title: "Architecture & Nature",
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
    title: "Global Tech",
  },
]

const CreativeHeroParallax = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  return (
    <div
      className="relative flex w-full h-[85vh] min-h-[700px] justify-center items-center bg-black overflow-hidden border-b border-white/[0.03]"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-6 items-center flex flex-col px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-[#3B82F6] font-black text-sm tracking-[0.5em] uppercase opacity-70">
          Visionary Agency
        </p>
        <h1 className="text-6xl md:text-8xl z-50 text-white font-clash font-black uppercase tracking-tighter leading-none">
          Creative<br />
          <span className="italic font-serif-display lowercase text-[#3B82F6]">Solutions</span>
        </h1>
        <p className="max-w-xl text-gray-400 text-lg font-medium leading-relaxed">
          Crafting immersive digital universes through advanced motion graphics, 
          cinematic storytelling, and innovative design thinking.
        </p>
        <div className="flex gap-4 items-center">
            <button 
                onClick={() => document.getElementById('marquee')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
            >
                Explore Works
            </button>
            <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border border-white/20 text-white rounded-full font-bold hover:bg-white/5 transition-colors"
            >
                Get Started
            </button>
        </div>
      </motion.div>

      <Floating sensitivity={-0.6} className="overflow-hidden">
        <FloatingElement depth={0.4} className="top-[12%] left-[8%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[0].url}
            className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-2xl border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl shadow-blue-500/10"
          />
        </FloatingElement>
        <FloatingElement depth={0.8} className="top-[15%] left-[28%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[1].url}
            className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-3xl border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
          />
        </FloatingElement>
        <FloatingElement depth={1.2} className="top-[5%] left-[55%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[2].url}
            className="w-32 h-44 md:w-48 md:h-64 object-cover rounded-[2rem] border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
          />
        </FloatingElement>
        <FloatingElement depth={0.7} className="top-[2%] left-[85%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[3].url}
            className="w-28 h-28 md:w-44 md:h-44 object-cover rounded-full border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
          />
        </FloatingElement>

        <FloatingElement depth={0.9} className="top-[45%] left-[4%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[4].url}
            className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-3xl border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
          />
        </FloatingElement>
        <FloatingElement depth={1.5} className="top-[65%] left-[82%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[7].url}
            className="w-32 h-32 md:w-52 md:h-72 object-cover rounded-[3rem] border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
          />
        </FloatingElement>

        <FloatingElement depth={2} className="top-[75%] left-[12%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[5].url}
            className="w-48 md:w-64 h-full object-cover rounded-[2.5rem] border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
          />
        </FloatingElement>
        <FloatingElement depth={0.6} className="top-[82%] left-[48%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={creativeImages[6].url}
            className="w-20 h-20 md:w-36 md:h-36 object-cover rounded-full border border-white/10 hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl"
          />
        </FloatingElement>
      </Floating>
    </div>
  )
}

export default CreativeHeroParallax
