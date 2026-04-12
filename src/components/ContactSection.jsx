import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, Mail, CheckCircle, ArrowUpRight, MessageSquare } from 'lucide-react';
import Reveal from './Reveal';
import { supabase } from '../supabase';

const GlassInput = ({ label, id, name, type = "text", required = true, placeholder = " " }) => {
  return (
    <div className="relative group mb-8">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="peer w-full px-6 py-5 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 outline-none transition-all duration-300 focus:bg-white/10 focus:border-[#3B82F6]/50 focus:ring-4 focus:ring-[#3B82F6]/5 text-white placeholder-transparent hover:border-[#3B82F6]/30"
      />
      <label
        htmlFor={id}
        className="absolute left-6 top-5 text-white/30 text-sm font-semibold pointer-events-none transition-all duration-300 peer-focus:-top-8 peer-focus:left-4 peer-focus:text-[#3B82F6] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-[#3B82F6] peer-[:not(:placeholder-shown)]:text-xs uppercase tracking-widest"
      >
        {label}
      </label>
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#3B82F6]/0 to-[#3B82F6]/0 group-hover:from-[#3B82F6]/5 group-hover:to-[#3B82F6]/5 pointer-events-none transition-all duration-500" />
    </div>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const buttonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('sending');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Add Web3Forms access key to the FormData object
    formData.append("access_key", "81578801-2b06-4662-bc9b-6a6d2d0f1520");

    try {
      // 1. Submit to Web3Forms (Using FormData for maximum compatibility)
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      // 2. Submit to Supabase (Database)
      const { error: supabaseError } = await supabase
        .from('contacts')
        .insert([
          { 
            name: data.name, 
            email: data.email, 
            message: data.message 
          }
        ]);

      if (supabaseError) throw supabaseError;
      
      // Bonus: Trigger subtle whoosh sound logic placeholder
      console.log("✈️ Whoosh! Message taking flight...");

      // Trigger flight animation sequence
      setTimeout(() => {
        setFormState('success');
        // Reset after 8 seconds 
        setTimeout(() => setFormState('idle'), 8000);
      }, 1000);
      
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
      setFormState('idle');
    }
  };

  return (
    <section id="contact" className="py-32 bg-black overflow-hidden relative selection:bg-[#3B82F6]/30">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {formState !== 'success' ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-center mb-20">
                  <Reveal>
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-8 font-clash tracking-tight uppercase">
                      SOMETHING <br /> <span className="text-[#3B82F6]">GREAT</span>
                    </h2>
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                      Ready to transform your digital presence? Reach out to us and let's start a conversation about your next project.
                    </p>
                  </Reveal>
                </div>

                <form onSubmit={handleSubmit} className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                    <Reveal delay={300}>
                      <GlassInput id="full-name" name="name" label="Full Name" />
                    </Reveal>
                    <Reveal delay={400}>
                      <GlassInput id="email" name="email" label="Email Address" type="email" />
                    </Reveal>
                  </div>
                  
                  <Reveal delay={500}>
                    <div className="relative group mb-12">
                      <textarea
                        required
                        id="vision"
                        name="message"
                        placeholder=" "
                        className="peer w-full px-6 py-6 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 outline-none transition-all duration-300 focus:bg-white/10 focus:border-[#3B82F6]/50 focus:ring-4 focus:ring-[#3B82F6]/5 text-white placeholder-transparent hover:border-[#3B82F6]/30 min-h-[180px] resize-none"
                      ></textarea>
                      <label
                        htmlFor="vision"
                        className="absolute left-6 top-6 text-white/30 text-sm font-semibold pointer-events-none transition-all duration-300 peer-focus:-top-8 peer-focus:left-4 peer-focus:text-[#3B82F6] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-8 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-[#3B82F6] peer-[:not(:placeholder-shown)]:text-xs uppercase tracking-widest"
                      >
                        Tell us about your project...
                      </label>
                    </div>
                  </Reveal>

                  <div className="flex flex-col items-center gap-10">
                    <Reveal delay={600}>
                      <div className="relative">
                        <motion.button
                          ref={buttonRef}
                          type="submit"
                          disabled={formState === 'sending'}
                          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
                          whileTap={{ scale: 0.98 }}
                          className="relative group px-14 py-6 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold text-xl shadow-lg transition-all duration-500 flex items-center gap-4 disabled:opacity-50 overflow-hidden"
                        >
                          <span className="relative z-20">
                            {formState === 'sending' ? "Sending..." : "Send Message"}
                          </span>
                          <motion.div
                            animate={formState === 'sending' ? { x: [0, 5, 0], y: [0, -5, 0] } : {}}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                          >
                            <Send className="w-6 h-6 relative z-20" />
                          </motion.div>
                          
                          {/* Sending Effect Overlay */}
                          {formState === 'sending' && (
                            <motion.div 
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 bg-white/20 skew-x-12 z-10"
                            />
                          )}
                        </motion.button>

                        {/* Paper Plane Flight Animation Container */}
                        <AnimatePresence>
                          {formState === 'sending' && (
                            <motion.div
                              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                              animate={{ 
                                x: [0, 200, 600, 1000], 
                                y: [0, -100, -300, -800],
                                opacity: [1, 1, 0.8, 0],
                                scale: [1, 1.3, 0.7, 0.3],
                                rotate: [0, -15, -30, -50]
                              }}
                              transition={{ 
                                duration: 1.2, 
                                ease: "circIn",
                                delay: 1.0 
                              }}
                              className="absolute top-1/2 right-12 z-50 pointer-events-none"
                            >
                              <Send className="w-10 h-10 text-[#3B82F6] fill-[#3B82F6]/20" />
                              {/* Trail Effect */}
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: 150 }}
                                transition={{ duration: 0.8 }}
                                className="absolute right-full top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-[#3B82F6] origin-right mr-3 blur-[1px]"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>

                    <Reveal delay={700}>
                      <div className="flex flex-col items-center gap-6">
                        <p className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase">
                          Typically respond within 24 hours
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-12">
                          <a href="mailto:hello@h2t.ai" className="flex items-center gap-2 text-white/60 hover:text-[#3B82F6] transition-colors font-bold group">
                            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            hello@h2t.ai
                          </a>
                          <button className="flex items-center gap-2 text-white/60 hover:text-[#3B82F6] transition-colors font-bold group">
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            WhatsApp
                          </button>
                          <button className="flex items-center gap-2 text-white/60 hover:text-[#3B82F6] transition-colors font-bold group">
                            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Call Us
                          </button>
                        </div>
                      </div>
                    </Reveal>

                    <Reveal delay={800}>
                      <button type="button" className="mt-4 px-10 py-5 rounded-[2rem] border border-white/5 bg-white/5 text-white/60 font-bold hover:bg-white hover:text-black transition-all flex items-center gap-3 group">
                        Book a Free Consultation
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </Reveal>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center py-32 min-h-[600px]"
              >
                <div className="relative mb-20 scale-110">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 60, delay: 0.2 }}
                    className="w-44 h-44 bg-white/5 rounded-full flex items-center justify-center shadow-[0_30px_80px_-15px_rgba(59,130,246,0.4)] relative z-10"
                  >
                    <CheckCircle className="w-24 h-24 text-[#3B82F6]" />
                  </motion.div>
                  {/* Glow ripples */}
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3, 
                        delay: i * 1,
                        ease: "easeOut" 
                      }}
                      className="absolute inset-0 rounded-full border border-[#3B82F6]/20"
                    />
                  ))}
                </div>

                <h3 className="text-6xl md:text-7xl font-black text-white mb-8 font-clash uppercase text-center leading-tight">
                  MESSAGE SENT <br /> <span className="text-[#3B82F6]">SUCCESSFULLY 🚀</span>
                </h3>
                <p className="text-white/40 text-xl max-w-sm text-center mb-16 leading-relaxed font-medium">
                  Thank you for reaching out! Your vision has taken flight and we'll be in touch shortly.
                </p>
                
                <button
                  onClick={() => setFormState('idle')}
                  className="px-12 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all shadow-xl"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
