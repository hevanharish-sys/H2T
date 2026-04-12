import { 
  stats, 
  aboutFeatures 
} from '../data'
import Reveal from '../components/Reveal'
import AnimatedNumber from '../components/AnimatedNumber'
import SplitText from '../components/SplitText'
import BentoServices from '../components/BentoServices'
import CharacterAnimate from '../components/CharacterAnimate'
import ScrollVelocity from '../components/ScrollVelocity'
import ContactSection from '../components/ContactSection'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function Home({ loading }) {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen pt-40 pb-36 overflow-hidden bg-[#FBF6EE]" style={{ isolation: 'isolate' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-100">
            <source src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#FBF6EE]/10 via-transparent to-[#FBF6EE]/30" />
        </div>
        <div className="container text-center max-w-5xl relative z-10">
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/20 backdrop-blur-md mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">AI-First Digital Agency</span>
            </div>
          </Reveal>
          <h1 className="hero-title uppercase text-center mx-auto">
            {!loading && (
              <>
                <CharacterAnimate text="Architecting " delay={0.1} />
                <br />
                <CharacterAnimate text="Digital " delay={0.6} />
                <br />
                <CharacterAnimate text="Masterpieces" delay={1.2} />
              </>
            )}
          </h1>
          <Reveal delay={200}>
            <p className="hero-description mt-8 mb-12 max-w-lg mx-auto text-center">
              We combine cutting-edge AI with high-end design to sculpt the next generation of digital landscapes.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="relative z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto pointer-events-auto">
              <a href="#contact" className="px-10 py-4 rounded-full border border-white/40 bg-transparent text-white font-bold tracking-tight hover:bg-white/10 transition-all text-lg group">
                Start Project
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/digital-solutions" className="px-10 py-4 rounded-full border border-white/20 bg-transparent text-white/80 font-bold tracking-tight hover:text-white hover:bg-white/5 transition-all text-lg">
                Our Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats & About Wrapper */}
      <section id="about" className="py-24 bg-black relative">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 border-b border-white/5 pb-20">
            {stats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl font-black text-white mb-3">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} delay={idx * 100} />
                  </div>
                  <div className="text-[#3B82F6] font-semibold tracking-wide uppercase text-xs">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <Reveal>
              <div className="space-y-8">
                <SplitText className="text-5xl font-black text-white block">About H2T</SplitText>
                <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                  H2T Technologies is a digital solutions company focused on creating modern, scalable, and high-performing websites.
                </p>
                <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                  We combine design, technology, and strategy to help businesses stand out in a competitive digital landscape. Our goal is simple — deliver solutions that not only look great but also generate real results.
                </p>
              </div>
            </Reveal>
            <div className="space-y-6">
              {aboutFeatures.map((feature, idx) => (
                <Reveal key={feature.title} delay={idx * 150}>
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 shadow-sm flex items-center gap-8 group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300">
                    <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-colors duration-300">
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-1 text-white">{feature.title}</h4>
                      <p className="text-white/40 font-medium">{feature.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BentoServices />

      <ScrollVelocity 
        texts={['INNOVATION • IMPACT • GROWTH • DESIGN • EXCELLENCE']} 
        velocity={60} 
        className="text-[#3B82F6] font-black text-6xl md:text-8xl tracking-tighter opacity-15 my-24"
      />

      <ContactSection />
    </>
  )
}

export default Home
