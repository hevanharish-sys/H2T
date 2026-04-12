"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

/**
 * NavHeader Component
 * A modern navigation header with a sliding cursor effect and responsive mobile menu.
 */
export default function NavHeader({
  logo,
  logoAlt = "Logo",
  items = [],
  activeHref = "#",
  className = "",
  isDark = false
}) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentPath = location.pathname === '/' ? '/' : location.pathname;

  // Initialize position for the active item
  useEffect(() => {
    const activeItem = items.find(item => item.href === activeHref);
    if (activeItem) {
      // Small delay to ensure DOM is ready for getBoundingClientRect
      const timer = setTimeout(() => {
        const element = document.querySelector(`[data-href="${activeHref}"]`);
        if (element) {
          const { width } = element.getBoundingClientRect();
          setPosition({
            width,
            opacity: 1,
            left: element.offsetLeft,
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeHref, items]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseLeave = () => {
    const element = document.querySelector(`[data-href="${activeHref}"]`);
    if (element) {
      const { width } = element.getBoundingClientRect();
      setPosition({
        width,
        opacity: 1,
        left: element.offsetLeft,
      });
    } else {
      setPosition((pv) => ({ ...pv, opacity: 0 }));
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 md:px-10",
        isScrolled 
          ? cn(
              "py-4 pt-6 backdrop-blur-md border-b", 
              isDark 
                ? "bg-black/20 border-white/10" 
                : "bg-white/20 border-black/5"
            ) 
          : "py-8"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left spacer — keeps nav centered when logo is hidden */}
        <div className="flex-1 flex items-center min-w-0">
          {logo ? (
            <a href="#hero" className="relative group shrink-0">
              <img 
                src={logo} 
                alt={logoAlt} 
                className={cn("h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-110", !isDark && "invert")}
              />
              <div className="absolute -inset-2 bg-black/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : null}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul
            className={cn("relative flex w-fit items-center rounded-full border bg-transparent p-1 transition-colors duration-300", isDark ? "border-white/10" : "border-black/5")}
            onMouseLeave={handleMouseLeave}
          >
            {items.map((item) => (
              <Tab 
                key={item.href} 
                setPosition={setPosition} 
                href={item.href}
                isActive={activeHref === item.href}
                isDark={isDark}
              >
                {item.label}
              </Tab>
            ))}

            <Cursor position={position} />
          </ul>
        </nav>

        {/* Action Button (Right Side) */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <a 
            href="#contact" 
            className={cn("hidden md:inline-flex px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-lg", isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800")}
          >
            Start Project
          </a>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn("md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-transparent border transition-colors", isDark ? "border-white/20" : "border-black/10")}
          >
            <motion.span 
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={cn("w-5 h-0.5 rounded-full", isDark ? "bg-white" : "bg-black")} 
            />
            <motion.span 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={cn("w-5 h-0.5 rounded-full", isDark ? "bg-white" : "bg-black")} 
            />
            <motion.span 
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={cn("w-5 h-0.5 rounded-full", isDark ? "bg-white" : "bg-black")} 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "absolute top-24 left-4 right-4 p-6 rounded-[2.5rem] backdrop-blur-2xl border shadow-2xl md:hidden flex flex-col gap-4",
              isDark ? "bg-black/90 border-white/10" : "bg-[#FBF6EE]/95 border-black/5"
            )}
          >
            {items.map((item) => {
              const isHash = item.href.startsWith('/#');
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-xl font-bold hover:translate-x-2 transition-all font-clash",
                    isDark ? "text-white/40 hover:text-white" : "text-black/40 hover:text-black"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <hr className={cn("my-2", isDark ? "border-white/10" : "border-black/5")} />
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "w-full py-4 rounded-2xl text-center font-bold",
                isDark ? "bg-white text-black" : "bg-black text-[#FBF6EE]"
              )}
            >
              Start Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  isActive,
  isDark
}) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className={cn(
        "relative z-10 block cursor-pointer px-4 py-2 text-sm font-bold uppercase transition-colors md:px-6 md:py-3 md:text-sm drop-shadow-sm",
        isActive 
          ? cn("font-black", isDark ? "text-white" : "text-black") 
          : cn(isDark ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black")
      )}
      data-href={href}
    >
      <Link to={href} className="relative z-10">{children}</Link>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-[2px] bg-[#3B82F6] bottom-0 my-auto shadow-sm shadow-[#3B82F6]/50"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
};
