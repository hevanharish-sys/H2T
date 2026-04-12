import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowUpRight, TrendingUp, Layout, Smartphone, Briefcase, Zap, Globe, Send, Mail } from 'lucide-react'
import Reveal from '../components/Reveal'
import LogoisumHero from '../components/LogoisumHero'
import FullScreenScrollFX from '../components/ui/full-screen-scroll-fx'
import { InteractiveRobotSpline } from '../components/ui/interactive-3d-robot'
import { Card } from '../components/ui/card'
import { socialLinks } from '../data'
import AgencyPricingSection from '../components/ui/pricing-section-4'
import { ErrorBoundary } from '../components/ErrorBoundary'

const fxSections = [
  {
    leftLabel: "Pixel Craft",
    title: "Minimal Design",
    rightLabel: "WORK",
    url: "https://pixel-craft-studio-one.vercel.app/",
    renderBackground: (active, near) => (
      <div className={`absolute inset-0 w-full h-full bg-black transition-all duration-1000 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {!near && !active ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="w-24 h-24 border-b-2 border-white/20 rounded-full animate-spin opacity-20" />
          </div>
        ) : (
          <iframe 
            src="https://pixel-craft-studio-one.vercel.app/" 
            className={`w-full h-full border-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-30'}`}
            title="Pixel Craft"
            loading="lazy"
          />
        )}
      </div>
    )
  },
  {
    leftLabel: "Xtrme Logistics",
    title: "SaaS Platform",
    rightLabel: "WORK",
    url: "https://car-site-psi.vercel.app/",
    renderBackground: (active, near) => (
      <div className={`absolute inset-0 w-full h-full bg-black transition-all duration-1000 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {!near && !active ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="w-24 h-24 border-b-2 border-white/20 rounded-full animate-spin opacity-20" />
          </div>
        ) : (
          <iframe 
            src="https://car-site-psi.vercel.app/" 
            className={`w-full h-full border-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-30'}`}
            title="Xtrme Logistics"
            loading="lazy"
          />
        )}
      </div>
    )
  },
  {
    leftLabel: "Page One",
    title: "Landing Page",
    rightLabel: "WORK",
    url: "https://page-one-phi.vercel.app/",
    renderBackground: (active, near) => (
      <div className={`absolute inset-0 w-full h-full bg-black transition-all duration-1000 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {!near && !active ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="w-24 h-24 border-b-2 border-white/20 rounded-full animate-spin opacity-20" />
          </div>
        ) : (
          <iframe 
            src="https://page-one-phi.vercel.app/" 
            className={`w-full h-full border-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-30'}`}
            title="Page One"
            loading="lazy"
          />
        )}
      </div>
    )
  },
  {
    leftLabel: "Xtrme AI",
    title: "Automation",
    rightLabel: "WORK",
    url: "https://heroic-entry.vercel.app/",
    renderBackground: (active, near) => (
      <div className={`absolute inset-0 w-full h-full bg-black transition-all duration-1000 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {!near && !active ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="w-24 h-24 border-b-2 border-white/20 rounded-full animate-spin opacity-20" />
          </div>
        ) : (
          <iframe 
            src="https://heroic-entry.vercel.app/" 
            className={`w-full h-full border-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-30'}`}
            title="Xtrme AI"
            loading="lazy"
          />
        )}
      </div>
    )
  },
  {
    leftLabel: "Elite Trader",
    title: "FinTech App",
    rightLabel: "WORK",
    url: "https://theelitetrader.in/",
    renderBackground: (active, near) => (
      <div className={`absolute inset-0 w-full h-full bg-black transition-all duration-1000 ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {!near && !active ? (
          <div className="w-full h-full flex items-center justify-center bg-[#050505]">
            <div className="w-24 h-24 border-b-2 border-white/20 rounded-full animate-spin opacity-20" />
          </div>
        ) : (
          <iframe 
            src="https://theelitetrader.in/" 
            className={`w-full h-full border-none transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-30'}`}
            title="Elite Trader"
            loading="lazy"
          />
        )}
      </div>
    )
  }
];

const agencyServices = [
  {
    slug: 'digital-marketing',
    title: 'Performance Marketing',
    description: 'Data-driven campaigns across social and search. We focus on ROAS, high-ticket lead generation, and scalable growth architecture.',
    icon: TrendingUp,
    features: ['Meta & Search Ads', 'SEO Optimization', 'Conversion Tracking', 'A/B Hook Testing']
  },
  {
    slug: 'web-design',
    title: 'UI/UX & Web Design',
    description: 'Bespoke, high-fidelity interfaces that merge aesthetics with conversion psychology. Designing experiences, not just pages.',
    icon: Layout,
    features: ['Figma Prototypes', 'Design Systems', 'Micro-interactions', 'User Journey Mapping']
  },
  {
    slug: 'app-development',
    title: 'Application Dev',
    description: 'Scalable iOS, Android, and Web applications built on modern stacks. From MVP to enterprise-grade infrastructure.',
    icon: Smartphone,
    features: ['React Native & Flutter', 'Cloud Backends', 'API Architecture', 'Low-latency Data']
  },
  {
    slug: 'portfolio-building',
    title: 'Portfolio Architecture',
    description: 'World-class personal branding platforms for agencies, creatives, and executives to showcase their legacy.',
    icon: Briefcase,
    features: ['Brand Identity', 'Case Study Design', 'WebGL Integrations', 'Premium Typography']
  },
  {
    slug: 'content-strategy',
    title: 'Content Strategy',
    description: 'Commanding narratives that position your brand as an industry authority across all digital touchpoints.',
    icon: Zap,
    features: ['Copywriting', 'Brand Voice', 'Asset Curation', 'Omnichannel Planning']
  },
  {
    slug: 'global-ecommerce',
    title: 'eCommerce Scaling',
    description: 'Headless commerce solutions designed for ultra-fast checkout flows and maximal average order value.',
    icon: Globe,
    features: ['Shopify Plus', 'Custom Checkouts', 'Inventory Sync', 'Performance Audits']
  },
];

// Pricing data is now centralized within the AgencyPricingSection component

const DigitalSolutionsPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formState, setFormState] = useState('idle') // 'idle' | 'sending' | 'success'
  const [splineApp, setSplineApp] = useState(null)

  const onSplineLoad = (app) => {
    setSplineApp(app);
  };

  const handleBotReaction = () => {
    if (splineApp) {
      splineApp.emitEvent('mouseHover', 'Object');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    handleBotReaction();
    
    // Simulate flight time
    setTimeout(() => {
      setFormState('success');
      // No automatic reset to idle unless user clicks 'Send Another'
    }, 1500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-[#000] min-h-screen font-barlow text-white selection:bg-white selection:text-black">
        {/* Hero Section with WebGL background */}
      <LogoisumHero />

      {/* Services Section */}
      <section id="services" className="py-40 bg-black relative overflow-hidden">
        {/* Deep Blue Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container relative z-10">
          <Reveal className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              ENGINEERING <span className="font-serif-display italic lowercase text-white/40">growth</span>
            </h2>
            <p className="text-neutral-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              We architect complete digital ecosystems—merging precision marketing with high-performance development.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agencyServices.map((service, idx) => (
              <Reveal key={service.slug} delay={idx * 100}>
                <div className="group relative p-12 rounded-[2.5rem] bg-neutral-900/40 border border-white/5 hover:bg-neutral-900/80 transition-all duration-700 hover:-translate-y-3 shadow-2xl">
                  <div className="w-16 h-16 rounded-[20px] bg-white text-black flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-neutral-400 mb-10 font-medium leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-4 mb-4">
                    {service.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-neutral-500 font-medium group-hover:text-neutral-300 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="text-white w-7 h-7" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section Anchor */}
      <div id="work-section" className="scroll-mt-24">
        {/* Full Screen Scroll Effect Section */}
        <FullScreenScrollFX
          sections={fxSections}
          smoothScroll={true}
          parallaxAmount={8}
          durations={{ change: 0.9, snap: 800 }}
          className="bg-black"
        />
      </div>

      {/* Pricing Section */}
      <AgencyPricingSection />

      {/* Final Conversion Section */}
      <section id="contact" className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center py-20">
        
        {/* Subtle Blue Glow Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Full-width Robot Background */}
        <div className="absolute inset-x-0 top-0 bottom-0 z-0 opacity-40">
          <InteractiveRobotSpline 
            scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
            onLoad={onSplineLoad}
            className="w-full h-full"
          />
        </div>

        <div className="container relative z-10 px-6">
          <AnimatePresence mode="wait">
            {formState !== 'success' ? (
              <motion.div 
                key="contact-form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                className="max-w-xl mx-auto"
              >
                <Reveal className="text-center mb-16">
                  <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">Ready to <span className="font-serif-display italic lowercase text-white underline decoration-white/20">Inititate?</span></h2>
                  <p className="text-neutral-500 text-lg font-medium tracking-tight">Transmission secured via encrypted protocol.</p>
                </Reveal>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Reveal delay={100}>
                    <div className="group relative">
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address"
                        className="w-full p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all text-white font-bold"
                      />
                    </div>
                  </Reveal>

                  <Reveal delay={200}>
                    <div className="group relative">
                      <select 
                        required
                        defaultValue=""
                        className="w-full p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all text-white font-bold appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-black">Select Strategic Plan</option>
                        <option value="starter" className="bg-black">Starter Protocol (₹14,999)</option>
                        <option value="growth" className="bg-black">Growth Architecture (₹39,999)</option>
                        <option value="elite" className="bg-black">Elite Ecosystem (Custom)</option>
                      </select>
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={18} className="rotate-90" />
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={300}>
                    <div className="group relative">
                      <textarea 
                        required
                        placeholder="Describe your legacy..."
                        className="w-full p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all text-white font-bold min-h-[160px] resize-none"
                      />
                    </div>
                  </Reveal>

                  <div className="relative pt-6">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={handleBotReaction}
                      disabled={formState === 'sending'}
                      className="w-full p-8 rounded-full bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-neutral-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden"
                    >
                      <span className="relative z-10">{formState === 'sending' ? 'Transmitting...' : 'Send Message'}</span>
                      {formState === 'sending' ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="relative z-10 w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                          <Send size={14} />
                        </div>
                      )}
                      
                      {/* Sending Animation Overlay */}
                      {formState === 'sending' && (
                        <motion.div 
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-black/10 skew-x-12"
                        />
                      )}
                    </motion.button>

                    {/* Paper Plane Flight Animation */}
                    <AnimatePresence>
                      {formState === 'sending' && (
                        <motion.div
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ 
                            x: [0, 150, 400, 800], 
                            y: [0, -80, -250, -600],
                            opacity: [1, 1, 0.8, 0],
                            scale: [1, 1.2, 0.6, 0.2],
                            rotate: [0, -10, -25, -45]
                          }}
                          transition={{ 
                            duration: 1.2, 
                            ease: "circIn",
                            delay: 0.8 
                          }}
                          className="absolute right-0 top-0 z-50 pointer-events-none"
                        >
                          <Send className="w-10 h-10 text-white fill-white/10" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>

                <Reveal delay={500} className="mt-16 text-center">
                  <a 
                    href="mailto:h2t.technologies@gmail.com"
                    onMouseEnter={handleBotReaction}
                    className="inline-flex items-center gap-4 text-white/40 hover:text-white transition-colors group"
                  >
                    <Mail size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">h2t.technologies@gmail.com</span>
                  </a>
                </Reveal>
              </motion.div>
            ) : (
              <motion.div 
                key="contact-success"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                className="text-center space-y-12"
              >
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center mb-8 bg-white/[0.02]">
                    <Check size={48} className="text-white" />
                  </div>
                  {[1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                      className="absolute inset-x-0 inset-y-0 rounded-full border border-white/10 -z-10"
                    />
                  ))}
                </div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Transmission <span className="font-serif-display italic text-white/50">Successful</span></h3>
                <p className="text-neutral-500 text-xl font-medium max-w-sm mx-auto">Whobee has received your package. Expect contact within 24 standard hours.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="px-10 py-5 rounded-full border border-white/10 hover:border-white/30 text-[10px] font-black uppercase tracking-[0.4em] transition-all"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
    </ErrorBoundary>
  )
}

export default DigitalSolutionsPage
