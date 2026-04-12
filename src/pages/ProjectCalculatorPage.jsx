import React, { useState, useEffect, useMemo, useRef } from "react";
import { ListChecks, ArrowLeft, Check, Mail, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import * as Slider from "@radix-ui/react-slider";
import { cn } from "../lib/utils";
import NumberFlow from "@number-flow/react";
import Reveal from "../components/Reveal";

const CALCULATOR_ADDONS = [
  { id: "content", title: "Content Support", label: "I will need help with content", cost: 50 },
  { id: "seo", title: "SEO Optimization", label: "I want to optimize my website for SEO", cost: 50 }
];

const ALL_COUNTRIES = [
  { name: "India", code: "IN", dial: "+91" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "Russia", code: "RU", dial: "+7" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "Norway", code: "NO", dial: "+47" },
  { name: "Sweden", code: "SE", dial: "+46" },
  { name: "Denmark", code: "DK", dial: "+45" },
  { name: "Switzerland", code: "CH", dial: "+41" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "Belgium", code: "BE", dial: "+32" },
  { name: "Israel", code: "IL", dial: "+972" },
  { name: "Others", code: "OTH", dial: "+" }
].sort((a, b) => a.name === "Others" ? 1 : b.name === "Others" ? -1 : a.name.localeCompare(b.name));

const ProjectCalculatorPage = () => {
  const [currency, setCurrency] = useState("INR");
  const [serviceType, setServiceType] = useState("both"); // 'design', 'dev', 'both'
  const [pages, setPages] = useState(5);
  const [addons, setAddons] = useState([]); // Array of strings (id)
  const [timeline, setTimeline] = useState("standard"); // 'agile', 'standard', 'strategic'
  
  const [formState, setFormState] = useState('idle'); // 'idle', 'sending', 'success'
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('IN');
  const [phone, setPhone] = useState('+91 ');
  const [description, setDescription] = useState('');
  
  const contactRef = useRef(null);
  
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  const exchangeRate = 82;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const prices = useMemo(() => {
    // Base Logic (USD)
    let base = 0;
    let perPage = 0;

    if (serviceType === "design") {
      base = 399;
      perPage = 100;
    } else if (serviceType === "development") {
      base = 199;
      perPage = 100;
    } else {
      base = 499;
      perPage = 200;
    }

    let h2tTotal = Math.max(base, base + (pages - 1) * perPage);
    
    // Addons calc
    if (addons.includes("content")) h2tTotal += pages * 50;
    if (addons.includes("seo")) h2tTotal += pages * 50;
    
    if (timeline === "rush") h2tTotal += pages * 100;
    if (timeline === "fast") h2tTotal += pages * 25;

    // Agency Logic
    const agencyPerPage = serviceType === "both" ? 1000 : 400;
    const agencyTotal = 8000 + (pages - 1) * agencyPerPage;

    // Freelancer Logic
    const freelancerPerPage = serviceType === "both" ? 500 : 200;
    const freelancerTotal = 3000 + (pages - 1) * freelancerPerPage;

    const factor = currency === "INR" ? exchangeRate : 1;

    return {
      h2t: h2tTotal * factor,
      agency: agencyTotal * factor,
      freelancer: freelancerTotal * factor,
    };
  }, [serviceType, pages, addons, timeline, currency]);

  const formatPrice = (val) => {
    return (currency === "INR" ? "₹" : "$") + Math.round(val).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5656]/30">
      {/* Navigation */}
      <div className="fixed top-8 left-8 z-[100]">
        <Link 
          to="/digital-solutions" 
          className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-xl"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Solutions</span>
        </Link>
      </div>

      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center max-w-7xl mx-auto">
        <Reveal>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-6 block">
            Try project estimation calculator
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
            Get premium website <br /> <span className="text-neutral-500 font-serif-display italic lowercase">within your budget</span>
          </h1>
        </Reveal>

        {/* Currency Switcher Overlay */}
        <div className="flex justify-center mb-12">
          <div className="bg-neutral-900/50 p-1 rounded-full border border-white/5 flex gap-1">
            {["USD", "INR"].map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={cn(
                  "px-8 py-2 rounded-full text-[10px] font-black tracking-widest transition-all",
                  currency === cur ? "bg-[#FF5656] text-white shadow-lg" : "text-white/40 hover:text-white"
                )}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section id="calculator-section" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#0D0D0D] shadow-2xl">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="p-8 md:p-14 lg:p-16 space-y-16 divide-y divide-white/5">
            
            {/* Service Type */}
            <div className="space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-tight">What kind of service do you need?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "design", label: "Only Design" },
                  { id: "development", label: "Only Development" },
                  { id: "both", label: "Design + Development" }
                ].map((opt) => (
                  <label key={opt.id} className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="service" 
                      className="hidden" 
                      checked={serviceType === opt.id}
                      onChange={() => setServiceType(opt.id)}
                    />
                    <div className={cn(
                      "p-6 rounded-3xl border transition-all flex items-center gap-4",
                      serviceType === opt.id ? "bg-[#FF5656]/5 border-[#FF5656]" : "bg-white/[0.02] border-white/5 group-hover:bg-white/[0.05]"
                    )}>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        serviceType === opt.id ? "border-[#FF5656]" : "border-white/20"
                      )}>
                        {serviceType === opt.id && <div className="w-2 h-2 rounded-full bg-[#FF5656]" />}
                      </div>
                      <span className={cn("text-xs font-black uppercase tracking-widest", serviceType === opt.id ? "text-white" : "text-white/40")}>
                        {opt.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Pages */}
            <div className="pt-16 space-y-10">
              <div className="flex justify-between items-end">
                <h3 className="text-lg font-bold uppercase tracking-tight">Number of Pages</h3>
                <span className="text-4xl font-black text-[#FF5656]">{pages}</span>
              </div>
              <div className="px-2">
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-10"
                  defaultValue={[5]}
                  max={30}
                  min={1}
                  step={1}
                  onValueChange={([val]) => setPages(val)}
                >
                  <Slider.Track className="bg-white/10 relative grow rounded-full h-1.5">
                    <Slider.Range className="absolute bg-[#FF5656] rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-8 h-8 bg-white border-4 border-[#FF5656] rounded-full hover:scale-110 active:scale-95 transition-all outline-none"
                    aria-label="Pages"
                  />
                </Slider.Root>
                <div className="flex justify-between mt-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                  <span>1 Page</span>
                  <span>30 Pages</span>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="pt-16 space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-tight">Strategic Add-ons</h3>
              <div className="space-y-4">
                {CALCULATOR_ADDONS.map((opt) => {
                  const isActive = addons.includes(opt.id);
                  return (
                    <label key={opt.id} className="cursor-pointer group block">
                      <div className={cn(
                        "p-8 rounded-3xl border transition-all flex items-center justify-between",
                        isActive ? "bg-[#FF5656]/5 border-[#FF5656]" : "bg-white/[0.02] border-white/5"
                      )}>
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                            isActive ? "bg-[#FF5656] border-[#FF5656]" : "border-white/10"
                          )}>
                            {isActive && <div className="text-white text-[10px]">✓</div>}
                          </div>
                          <span className="text-sm font-bold text-white/70">{opt.label}</span>
                        </div>
                        <span className="text-xs font-black text-[#FF5656] uppercase tracking-widest">
                          {currency === 'INR' ? `+₹${opt.cost * exchangeRate}/pg` : `+$${opt.cost}/pg`}
                        </span>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={isActive}
                          onChange={() => {
                            if (isActive) {
                              setAddons(addons.filter(a => a !== opt.id));
                            } else {
                              setAddons([...addons, opt.id]);
                            }
                          }}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="pt-16 space-y-8">
              <h3 className="text-lg font-bold uppercase tracking-tight">How fast do you need this?</h3>
              <div className="space-y-4">
                {[
                  { id: "rush", label: "Within 7 Days", tag: "+$100/pg" },
                  { id: "fast", label: "Within 14 Days", tag: "+$25/pg" },
                  { id: "regular", label: "Regular Speed (Based on discussion)", tag: "Free" }
                ].map((opt) => (
                  <label key={opt.id} className="cursor-pointer block">
                    <input 
                      type="radio" 
                      name="timeline" 
                      className="hidden" 
                      checked={timeline === opt.id}
                      onChange={() => setTimeline(opt.id)}
                    />
                    <div className={cn(
                      "p-8 rounded-3xl border transition-all flex items-center justify-between",
                      timeline === opt.id ? "bg-[#FF5656]/5 border-[#FF5656]" : "bg-white/[0.02] border-white/5"
                    )}>
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                          timeline === opt.id ? "border-[#FF5656]" : "border-white/20"
                        )}>
                          {timeline === opt.id && <div className="w-2 h-2 rounded-full bg-[#FF5656]" />}
                        </div>
                        <span className="text-sm font-bold text-white/70">{opt.label}</span>
                      </div>
                      <span className="text-xs font-black text-[#FF5656] uppercase tracking-widest">
                        {opt.id === 'rush' ? (currency === 'INR' ? `+₹${100*exchangeRate}/pg` : opt.tag) : 
                         opt.id === 'fast' ? (currency === 'INR' ? `+₹${25*exchangeRate}/pg` : opt.tag) : 'Free'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Cost Breakdown */}
          <div className="p-8 md:p-14 lg:p-16 bg-white/[0.02] flex flex-col justify-start space-y-8 border-l border-white/5">
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Estimated Cost</h3>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed max-w-sm">
                Transparent pricing comparison. We cut the overhead, not the quality. See how we stand against the market.
              </p>
            </div>

            <div className="space-y-4 flex-grow">
              {/* Agency Card */}
              <div className="p-8 pb-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-4 group transition-all hover:bg-white/[0.05]">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Typical Agency charges minimum</div>
                <div className="text-5xl font-black font-serif-display tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
                   {formatPrice(prices.agency)}
                </div>
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">+ Too much extra time & additional cost</p>
              </div>

              {/* Freelancer Card */}
              <div className="p-8 pb-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-4 group transition-all hover:bg-white/[0.05]">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Regular Freelancer charges minimum</div>
                <div className="text-5xl font-black font-serif-display tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">
                  {formatPrice(prices.freelancer)}
                </div>
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">+ Too much headache & back-and-forth</p>
              </div>

              {/* H2T Card (Gradient) */}
              <div className="p-10 pb-12 rounded-[2.5rem] bg-gradient-to-br from-[#FF5656] to-[#FF8A56] text-black shadow-[0_20px_80px_-15px_rgba(255,86,86,0.3)] space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <ListChecks size={120} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 relative z-10">With H2T Technologies</div>
                <div className="text-7xl font-black font-serif-display tracking-tighter relative z-10">
                  <NumberFlow value={prices.h2t} format={{ style: 'currency', currency: currency, currencyDisplay: 'narrowSymbol', minimumFractionDigits: 0 }} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-black/60 relative z-10">Save your money, time & headache</p>
                
                <div className="pt-8 relative z-10">
                  <button 
                    onClick={scrollToContact}
                    className="w-full py-6 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-all shadow-2xl"
                  >
                    Lock In This Quote
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quote Lockdown / Contact Section */}
      <section ref={contactRef} className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="container max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {formState !== 'success' ? (
              <motion.div
                key="quote-form"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                className="space-y-16"
              >
                <div className="text-center space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF5656]">Quote Lockdown</div>
                  <h2 className="text-4xl md:text-5xl font-normal tracking-tighter text-white">Let's build your vision</h2>
                  <p className="text-gray-400 font-medium">Please review your estimate details and share your project specifics.</p>
                </div>

                {/* Quote Tags */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                    {serviceType === 'both' ? 'Design + Dev' : serviceType === 'design' ? 'Only Design' : 'Only Development'}
                  </div>
                  <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                    {pages} {pages === 1 ? 'Page' : 'Pages'}
                  </div>
                  {addons.map(id => (
                    <div key={id} className="px-5 py-2.5 rounded-full bg-[#FF5656]/10 border border-[#FF5656]/20 text-[10px] font-black uppercase tracking-widest text-[#FF5656]">
                      {CALCULATOR_ADDONS.find(a => a.id === id)?.title}
                    </div>
                  ))}
                  <div className="px-5 py-2.5 rounded-full bg-white border border-white text-[10px] font-black uppercase tracking-widest text-black shadow-lg shadow-white/5">
                    Est. {formatPrice(prices.h2t)}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Business Email</label>
                      <input 
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#FF5656]/40 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Country</label>
                      <select 
                        required
                        value={country}
                        onChange={(e) => {
                          const code = e.target.value;
                          setCountry(code);
                          const dial = ALL_COUNTRIES.find(c => c.code === code)?.dial || '+';
                          setPhone(dial + ' ');
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-5 text-sm text-white focus:outline-none focus:border-[#FF5656]/40 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer"
                      >
                        {ALL_COUNTRIES.map(c => (
                          <option key={c.code} value={c.code} className="bg-[#0D0D0D] text-white">
                            {c.name} ({c.dial})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Phone Number</label>
                      <input 
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#FF5656]/40 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Project Description</label>
                    <textarea 
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell us more about your requirements, features, or any specific inspirations..."
                      className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-white placeholder:text-white/10 focus:outline-none focus:border-[#FF5656]/40 focus:bg-white/[0.07] transition-all resize-none"
                    />
                  </div>

                  <div className="relative pt-4">
                    <button 
                      type="submit"
                      disabled={formState === 'sending'}
                      className="group relative w-full py-6 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] overflow-hidden hover:scale-[1.01] transition-transform active:scale-95 disabled:opacity-50"
                    >
                      <span className={formState === 'sending' ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
                        Send Inquiry
                      </span>
                      {formState === 'sending' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        </div>
                      )}
                    </button>

                    {/* Paper Plane Animation */}
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

                <div className="text-center">
                  <a 
                    href="mailto:h2t.technologies@gmail.com"
                    className="inline-flex items-center gap-4 text-white/20 hover:text-white transition-colors group"
                  >
                    <Mail size={16} className="group-hover:translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">h2t.technologies@gmail.com</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="quote-success"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                className="text-center space-y-12"
              >
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center mb-8 bg-white/[0.02]">
                    <Check size={48} className="text-[#FF5656]" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Your quote is locked.</h2>
                  <p className="text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
                    We've received your inquiry. Our team will review the details and reach out within 24 hours.
                  </p>
                </div>
                <button 
                  onClick={() => setFormState('idle')}
                  className="px-10 py-4 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default ProjectCalculatorPage;
