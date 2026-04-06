import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Blocks, Mail, Sparkles, Waves } from 'lucide-react'
import CountUp from './components/CountUp'
import CursorOrb from './components/CursorOrb'
import FloatingInput from './components/FloatingInput'
import Loader from './components/Loader'
import MagneticButton from './components/MagneticButton'
import Reveal from './components/Reveal'
import ScrollProgress from './components/ScrollProgress'
import SectionHeading from './components/SectionHeading'
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

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 2400)
  }

  return (
    <div className="relative overflow-x-hidden bg-white text-neutral-950 selection:bg-[#d9ecff]">
      <Loader />
      <CursorOrb />
      <ScrollProgress />

      <div className="ambient-light ambient-light-left" />
      <div className="ambient-light ambient-light-right" />

      <header className="sticky top-0 z-50 mx-auto w-full max-w-[1280px] px-4 pt-4 sm:px-6">
        <nav className="glass-card flex items-center justify-between rounded-full border border-[#d7e9fb] px-5 py-4 sm:px-7">
          <a
            href="#hero"
            data-cursor="interactive"
            className="flex items-center text-sm font-semibold text-neutral-950"
          >
            <img
              src="/h2t-logo.png"
              alt="H2T Technologies logo"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor="interactive"
                className="nav-link text-sm font-medium text-neutral-600"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e9fb] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-950 transition hover:border-[#147be0] hover:bg-white hover:text-[#147be0]"
          >
            Let&apos;s talk
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
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
                    data-cursor="interactive"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(135deg,#0f68c8_0%,#147be0_55%,#33a2ff_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_45px_rgba(20,123,224,0.24)] transition duration-300 hover:shadow-[0_22px_60px_rgba(20,123,224,0.34)]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.22),transparent)] transition duration-700 group-hover:translate-x-full" />
                    <span className="relative">Submit Request</span>
                    <ArrowRight className="relative h-4 w-4" />
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
          <div className="flex flex-wrap gap-6">
            {['Behance', 'LinkedIn', 'Dribbble', 'Instagram'].map((item) => (
              <a
                key={item}
                href="#"
                data-cursor="interactive"
                className="nav-link font-medium text-neutral-600"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
