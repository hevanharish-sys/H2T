import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";
import { navItems, socialLinks, digitalServices } from "../data";

function HoverFooter() {
  const solutionLinks = [
    { label: 'Digital Solutions', href: '/digital-solutions' },
    { label: 'Pricing & Tiers', href: '/digital-solutions#pricing' },
    { label: 'Project Estimator', href: '/project-estimation' }
  ];

  return (
    <footer className="bg-[#0F0F11] relative h-fit rounded-[3rem] overflow-hidden m-4 md:m-8 text-[#F5F1EA]/60 selection:bg-[#9370DB]/30 selection:text-white">
      <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center">
              <img src="/h2t-logo.jpeg" alt="H2T Technologies" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs font-medium">
              Architecting the next generation of digital landscapes through AI-first design and high-performance engineering.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-white text-sm font-black tracking-[0.2em] uppercase mb-8 opacity-40">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-[#3B82F6] transition-all duration-300 font-bold flex items-center group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions section */}
          <div>
            <h4 className="text-white text-sm font-black tracking-[0.2em] uppercase mb-8 opacity-40">
              Solutions
            </h4>
            <ul className="space-y-4">
              {solutionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#3B82F6] transition-all duration-300 font-bold flex items-center group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className="text-white text-sm font-black tracking-[0.2em] uppercase mb-8 opacity-40">
              Contact
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#3B82F6]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-1">Email Us</span>
                  <a href="mailto:h2t.technologies@gmail.com" className="text-white font-bold hover:text-[#3B82F6] transition-all">
                    h2t.technologies@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#3B82F6]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-1">Based In</span>
                  <span className="text-white font-bold">Global / Remote</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/5 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs space-y-6 md:space-y-0 pb-8">
          {/* Social icons */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-label={link.name}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#3B82F6] transition-all duration-300"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end">
            <p className="font-bold text-white/60">
              © {new Date().getFullYear()} H2T Technologies.
            </p>
            <p className="mt-1 opacity-30">Designed for impact. Built for growth.</p>
          </div>
        </div>
      </div>

      {/* Text hover effect - Large interactive logo */}
      <div className="lg:flex hidden h-[22rem] items-center justify-center -mt-32 -mb-20 pointer-events-none select-none">
        <TextHoverEffect text="H2T" className="z-50 opacity-20" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
