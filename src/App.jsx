import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { supabase } from './supabase'
import { ArrowRight, Blocks, Mail, Sparkles, Waves } from 'lucide-react'
import CountUp from './components/CountUp'
import CursorOrb from './components/CursorOrb'
import FloatingInput from './components/FloatingInput'
import Loader from './components/Loader'
import MagneticButton from './components/MagneticButton'
import Reveal from './components/Reveal'
import ScrollProgress from './components/ScrollProgress'
import SectionHeading from './components/SectionHeading'
import PillNav from './components/PillNav'
import {
  aboutTags,
  contactMeta,
  heroPills,
  navItems,
  projects,
  services,
  stats,
  teamInitials,
} from './data'

function App() {
  const MotionDiv = motion.div
  const [sent, setSent] = useState(false)
  const heroVisualRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const handleScroll = () => {
      if (heroVisualRef.current) {
        const offset = Math.min(window.scrollY * 0.14, 60)
        heroVisualRef.current.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    try {
      // 1. Store in Supabase
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            name: data.name,
            email: data.email,
            company: data.company,
            budget: data.budget,
            message: data.message
          }
        ])

      if (supabaseError) {
        console.warn('Supabase Insert Error:', supabaseError)
      }

      // 2. Send via Web3Forms
      formData.append("access_key", "81578801-2b06-4662-bc9b-6a6d2d0f1520")
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setSent(true)
        event.target.reset()
        window.setTimeout(() => setSent(false), 3000)
      } else {
        console.error("Form submission failed:", result)
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-x-hidden bg-white text-neutral-950 selection:bg-[#d9ecff]">
      <Loader />
      <CursorOrb />
      <ScrollProgress />

      <div className="ambient-light ambient-light-left" />
      <div className="ambient-light ambient-light-right" />

      <header className="fixed top-0 left-0 right-0 z-[100] flex w-full justify-center px-4 pt-6 sm:px-6">
        <PillNav
          logo="/h2t-logo.png"
          logoAlt="H2T Technologies"
          items={navItems}
          baseColor="rgba(255, 255, 255, 0.45)"
          pillColor="#147be0"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#1e293b"
        />
      </header>

      <main>
        <section
          id="hero"
          className="relative mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-4 pb-20 pt-24 sm:px-6 lg:pt-28"
        >
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e9fb] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#147be0] shadow-[0_12px_30px_rgba(20,123,224,0.08)] backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                2026 Edition
              </div>
              <h1 className="mt-8 max-w-4xl text-balance text-6xl font-semibold tracking-[-0.08em] text-neutral-950 sm:text-7xl lg:text-[5.5rem]">
                <span className="gradient-text">We Build</span>{' '}
                <span className="hero-line inline-block">Future-Ready</span>{' '}
                <span className="text-neutral-950">Digital Experiences</span>
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-neutral-600 sm:text-xl">
                H2T Technologies crafts high-performance web experiences for brands
                that want precision, motion, and a product feel far beyond ordinary
                agency websites.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton href="#contact">Get Started</MagneticButton>
                <MagneticButton href="#work" variant="secondary">
                  View Work
                </MagneticButton>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {heroPills.map((item, index) => (
                  <Reveal key={item} delay={index * 90}>
                    <div className="glass-card rounded-[24px] border border-[#d7e9fb] px-4 py-5 text-sm text-neutral-600">
                      {item}
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative" delay={120}>
              <div ref={heroVisualRef} className="hero-orbit">
                <div className="hero-grid" />
                <MotionDiv
                  className="glass-card hero-panel hero-panel-main border border-[#d7e9fb]"
                  animate={prefersReducedMotion ? {} : { y: [0, -12, 0], rotate: [0, -1.2, 0] }}
                  transition={{ duration: 8, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                        Experience Layer
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.06em] text-neutral-950">
                        Motion-driven product sites
                      </h3>
                    </div>
                    <div className="rounded-full bg-[linear-gradient(135deg,#0f68c8,#147be0)] p-3 text-white shadow-[0_12px_30px_rgba(20,123,224,0.24)]">
                      <Waves className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    <div className="rounded-[22px] border border-[#d7e9fb] bg-[linear-gradient(135deg,rgba(20,123,224,0.12),rgba(255,255,255,0.96))] p-5">
                      <div className="mb-4 flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#147be0]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#0d5fbd]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 rounded-full bg-white/80" />
                        <div className="h-3 w-4/5 rounded-full bg-white/70" />
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          <div className="h-24 rounded-[18px] bg-white/75" />
                          <div className="h-24 rounded-[18px] bg-blue-50" />
                          <div className="h-24 rounded-[18px] bg-white/60" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-[22px] bg-[linear-gradient(135deg,#17191f,#0f68c8)] px-5 py-4 text-white shadow-[0_18px_50px_rgba(20,123,224,0.22)]">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-blue-100">
                          Performance
                        </p>
                        <p className="mt-2 text-3xl font-semibold tracking-[-0.06em]">
                          60fps
                        </p>
                      </div>
                      <Blocks className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </MotionDiv>

                <MotionDiv
                  className="glass-card hero-panel hero-panel-floating border border-[#d7e9fb]"
                  animate={prefersReducedMotion ? {} : { y: [0, 14, 0], x: [0, 10, 0], rotate: [0, 2, 0] }}
                  transition={{
                    duration: 9,
                    ease: 'easeInOut',
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.4,
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                    Delivery model
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="rounded-full bg-[linear-gradient(135deg,#0f68c8,#147be0)] p-3 text-white shadow-[0_12px_24px_rgba(20,123,224,0.24)]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-neutral-950">
                        Launch-ready in weeks
                      </p>
                      <p className="text-sm text-neutral-500">
                        Strategy, design, build, and polish in one stream.
                      </p>
                    </div>
                  </div>
                </MotionDiv>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="services" className="relative py-24 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <SectionHeading
              eyebrow="Services"
              title="Engineered for premium digital brands"
              description="Every H2T engagement is built to feel sharp, cinematic, and operationally solid from the first scroll to the final conversion."
            />

            <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Reveal key={service.title} delay={index * 90}>
                    <div
                      data-cursor="interactive"
                      className="service-card glass-card h-full rounded-[30px] border border-[#d7e9fb] p-7"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f68c8,#147be0)] text-white shadow-[0_18px_40px_rgba(20,123,224,0.18)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.05em] text-neutral-950">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-neutral-600">
                        {service.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="work" className="relative py-24 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
            <SectionHeading
              eyebrow="Selected Work"
              title="Showcases that feel tactile, polished, and unmistakably current"
              description="A flexible system of image-led cards, elevated project storytelling, and hover states that reward exploration."
            />

            <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {projects.map((project, index) => (
                <Reveal key={project.title} className={index === 0 ? 'lg:row-span-2' : ''} delay={index * 120}>
                  <article
                    data-cursor="interactive"
                    className="portfolio-card group relative overflow-hidden rounded-[34px] border border-[#d7e9fb] bg-white/80 p-5 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
                  >
                    <div className="project-visual relative overflow-hidden rounded-[26px] border border-[#d7e9fb] bg-[linear-gradient(135deg,#ffffff,#edf6ff)] p-6">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(20,123,224,0.12))]" />
                      <div className="relative flex min-h-[260px] flex-col justify-between">
                        <div className="flex items-center justify-between text-neutral-950/75">
                          <span className="rounded-full border border-[#d7e9fb] bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#147be0]">
                            {project.category}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-[0.32em]">
                            2026
                          </span>
                        </div>
                        <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
                          <div className="rounded-[22px] border border-[#d7e9fb] bg-white/80 p-5 backdrop-blur-xl">
                            <div className="mb-4 flex gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#147be0]" />
                              <span className="h-2.5 w-2.5 rounded-full bg-[#0d5fbd]" />
                            </div>
                            <div className="space-y-3">
                              <div className="h-3 rounded-full bg-blue-100" />
                              <div className="h-3 w-5/6 rounded-full bg-blue-50" />
                              <div className="grid grid-cols-2 gap-3 pt-3">
                                <div className="h-20 rounded-[18px] bg-blue-50" />
                                <div className="h-20 rounded-[18px] bg-blue-100" />
                              </div>
                            </div>
                          </div>
                          <div className="rounded-[22px] border border-[#d7e9fb] bg-[#147be0]/8 p-4 backdrop-blur-xl">
                            <div className="h-full rounded-[18px] border border-[#d7e9fb] bg-white/90 p-4">
                              <div className="space-y-3">
                                <div className="h-10 rounded-2xl bg-blue-50" />
                                <div className="h-16 rounded-2xl bg-blue-100" />
                                <div className="h-16 rounded-2xl bg-blue-50" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-5">
                      <div>
                        <h3 className="text-3xl font-semibold tracking-[-0.05em] text-neutral-950">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm uppercase tracking-[0.28em] text-neutral-500">
                          {project.stats}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.26em] text-neutral-700">
                        Explore
                        <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>

                    <div className="portfolio-overlay">
                      <span className="rounded-full border border-[#81befe] bg-[#147be0] px-4 py-2 text-xs uppercase tracking-[0.35em] text-white">
                        Live case study
                      </span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative py-24 sm:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <div className="glass-card rounded-[34px] border border-[#d7e9fb] p-8 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#147be0]">
                  About H2T
                </p>
                <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-5xl">
                  A studio mindset with product-level execution.
                </h2>
                <p className="mt-6 text-base leading-8 text-neutral-600 sm:text-lg">
                  We partner with ambitious founders and growth teams to shape web
                  experiences that feel strategic on the inside and magnetic on the
                  outside.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  {aboutTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#d7e9fb] bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#147be0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-3">
                {stats.map((item, index) => (
                  <CountUp
                    key={item.label}
                    value={item.value}
                    suffix={item.suffix}
                    label={item.label}
                    delay={index * 100}
                  />
                ))}
              </div>

              <Reveal delay={120}>
                <div className="glass-card rounded-[34px] border border-[#d7e9fb] p-8 sm:p-10">
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.45em] text-neutral-500">
                        Team energy
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-neutral-950">
                        Small team, high-touch execution
                      </h3>
                    </div>
                    <div className="flex -space-x-4">
                      {teamInitials.map((initials, index) => (
                        <div
                          key={initials}
                          data-cursor="interactive"
                          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[linear-gradient(135deg,#17191f,#147be0)] text-sm font-semibold text-white shadow-[0_18px_40px_rgba(20,123,224,0.18)] transition duration-300 hover:-translate-y-1"
                          style={{ zIndex: 4 - index }}
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-600">
                    Designers, strategists, and frontend specialists work in a single
                    loop so ideas move quickly and the final product keeps the original
                    ambition intact.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-24 sm:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="space-y-7">
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#147be0]">
                  Contact
                </p>
                <h2 className="text-balance text-4xl font-semibold tracking-[-0.06em] text-neutral-950 sm:text-5xl">
                  Let&apos;s create the next signature digital launch.
                </h2>
                <p className="max-w-xl text-base leading-8 text-neutral-600 sm:text-lg">
                  Tell us about your company, timeline, and what success should feel
                  like. We&apos;ll shape the right combination of strategy, design, and
                  engineering around it.
                </p>
                <div className="glass-card rounded-[30px] border border-[#d7e9fb] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
                    Preferred channels
                  </p>
                  <div className="mt-5 grid gap-3">
                    {contactMeta.map((item) => (
                      <div
                        key={item}
                        className="rounded-[20px] border border-[#d7e9fb] bg-white/65 px-4 py-4 text-sm text-neutral-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <form
                onSubmit={handleSubmit}
                className="glass-card relative overflow-hidden rounded-[36px] border border-[#d7e9fb] p-6 sm:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#147be0,transparent)]" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatingInput id="name" label="Your Name" />
                  <FloatingInput id="email" label="Email Address" type="email" />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <FloatingInput id="company" label="Company" />
                  <FloatingInput id="budget" label="Budget Range" />
                </div>
                <div className="mt-4">
                  <FloatingInput id="message" label="Project Vision" isTextArea />
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="animated-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                      <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      ></path>
                    </svg>
                    <span className="text">{isSubmitting ? 'S E N D I N G . . .' : 'S U B M I T   R E Q U E S T'}</span>
                    <span className="circle"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                      <path
                        d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      ></path>
                    </svg>
                  </button>

                  <MotionDiv
                    className="text-sm uppercase tracking-[0.3em] text-neutral-500"
                    animate={sent ? { opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] } : {}}
                    transition={{ duration: 2.2, ease: 'easeInOut' }}
                  >
                    {sent ? 'Message received' : 'Replies within 24 hours'}
                  </MotionDiv>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d7e9fb] bg-white/70 py-8 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 H2T Technologies. Built for future-ready brands.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
