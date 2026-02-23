import React, { useState, useEffect } from 'react';
import { Menu, X, Mountain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Story', href: '#story' },
  { name: 'Events', href: '#events' },
  { name: 'Trips', href: '#trips' },
  { name: 'Menu', href: '#menu' },
  { name: 'Visit', href: '#visit' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the background change after scrolling down 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 pt-6 px-4 md:px-8">
      {/* 2026 Floating Glass Pill Design */}
      <div
        className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 rounded-full px-6 py-3 ${isScrolled
          ? 'glass-panel-light'
          : 'bg-white/30 backdrop-blur-md border border-white/40 shadow-sm'
          }`}
      >

        {/* LOGO - Morning Mountain */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-sunrise-gold flex items-center justify-center p-2 rounded-xl bg-white/40 border border-white/60 group-hover:border-sunrise-gold/50 group-hover:shadow-[0_0_15px_#ffb34766] transition-all"
          >
            <Mountain size={24} />
          </motion.div>
          <span className="text-xl md:text-2xl font-heading font-bold tracking-widest text-morning-slate">
            HIPSTER<span className="text-sunrise-gold">_</span>CAFE
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-bold tracking-[0.2em] text-morning-slate/70 hover:text-alpine-blue transition-colors uppercase font-heading group"
            >
              <span className="relative z-10">{link.name}</span>
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-alpine-blue -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}

          {/* CTA BUTTON - Morning Palette */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="ml-4 bg-transparent border-2 border-alpine-blue text-alpine-blue hover:bg-alpine-blue hover:text-white text-xs md:text-sm font-bold px-6 py-2.5 rounded-full transition-all tracking-[0.2em] uppercase shadow-[0_4px_10px_#a2c2e14c] hover:shadow-[0_4px_20px_#a2c2e199]"
          >
            Join the Tribe
          </motion.button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-morning-slate flex items-center justify-center p-2 bg-white/40 rounded-full border border-white/60 hover:bg-white/60 transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN (Glass Panel) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden mt-4 mx-2 glass-panel-light overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-heading font-bold text-morning-slate/70 hover:text-alpine-blue transition-colors tracking-widest uppercase relative inline-block mx-auto group"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-alpine-blue -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <div className="h-px bg-morning-slate/10 w-full" />
              <button
                className="w-full bg-alpine-blue text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-[0_4px_15px_#a2c2e166] hover:scale-[1.02] transition-transform"
                onClick={() => {
                  setIsMobileOpen(false);
                  navigate('/login');
                }}
              >
                Join the Tribe
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;