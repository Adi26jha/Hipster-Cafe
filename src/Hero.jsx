import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Compass } from 'lucide-react';
import { useModal } from './ModalContext';

// Staggered Text Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each word appearing
      delayChildren: 0.3,
    },
  },
};

const wordVariant = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } // Custom easing for that "whip" effect
  },
};

const Hero = () => {
  const { openModal } = useModal();

  // Parallax background hook
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]); // Moves the bg down 300px for every 1000px scrolled

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end pb-12 pt-32">

      {/* 1. CINEMATIC BACKGROUND (WITH PARALLAX) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          style={{ y }} // Apply parallax scroll value
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2673&auto=format&fit=crop"
          alt="Morning Mountain Peak"
          className="w-full h-[120%] object-cover -top-[10%]" // Made taller to handle parallax movement
        />
        {/* A much tighter, cleaner gradient just to anchor the text, not wash out the whole image */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-morning-mist via-morning-mist/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-between">

        {/* 2. TOP SECTION: THE HYPER-TYPOGRAPHY */}
        <div className="flex-grow flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[1px] w-12 bg-sunrise-gold"></span>
            <span className="text-sunrise-gold font-heading tracking-[0.4em] text-xs font-bold uppercase drop-shadow-[0_0_10px_#ffb34780]">
              Welcome to the New Era
            </span>
          </motion.div>

          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="text-7xl md:text-[8rem] lg:text-[11rem] leading-[0.85] font-heading font-bold text-morning-slate uppercase tracking-tighter flex flex-col"
          >
            {/* STAGGERED REVEAL: AWAKE */}
            <div className="overflow-hidden p-2 -m-2">
              <motion.span variants={wordVariant} className="block opacity-90 inline-block">
                AWAKE
              </motion.span>
            </div>

            {/* STAGGERED REVEAL: THE PEAK */}
            <div className="overflow-hidden p-2 -m-2">
              <motion.span variants={wordVariant} className="block text-transparent bg-clip-text bg-gradient-to-r from-sunrise-gold via-sunrise-peach to-alpine-blue pb-4 pr-10 drop-shadow-xl inline-block">
                THE PEAK
              </motion.span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 max-w-lg text-morning-slate/80 font-body text-base md:text-lg leading-relaxed"
          >
            We've evolved. From mountain trails to digital frontiers, we are the ultimate base camp for the visionary explorer.
          </motion.p>
        </div>

        {/* 3. BOTTOM SECTION: BENTO GRID INTERFACE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 h-auto"
        >

          {/* Bento Box 1: Primary Action (Watch Story) */}
          <div
            onClick={() => openModal("Evolution", "Watch how we redefined our space for the modern era.", "video")}
            className="md:col-span-4 glass-panel-light p-6 cursor-pointer group hover:bg-white/80 border-t border-l border-white/60 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-sunrise-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-full border border-sunrise-gold/30 flex items-center justify-center text-sunrise-gold group-hover:bg-sunrise-gold group-hover:text-white group-hover:shadow-[0_0_20px_#ffb34780] transition-all duration-300">
                <Play size={20} fill="currentColor" />
              </div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-morning-slate/60">01/ Play</span>
            </div>
            <div className="mt-12 relative z-10">
              <h3 className="text-xl font-heading font-bold text-morning-slate mb-1 group-hover:text-sunrise-gold transition-colors">Our Evolution</h3>
              <p className="text-xs text-morning-slate/70">Watch the story to 2026</p>
            </div>
          </div>

          {/* Bento Box 2: Explore Action */}
          <div
            onClick={() => document.getElementById('trips')?.scrollIntoView({ behavior: 'smooth' })}
            className="md:col-span-4 glass-panel-light p-6 cursor-pointer group hover:bg-white/80 border-t border-l border-white/60 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-tl from-alpine-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-morning-slate group-hover:scale-110 group-hover:bg-alpine-blue group-hover:border-alpine-blue group-hover:text-white group-hover:shadow-[0_0_20px_#a2c2e199] transition-all duration-300">
                <ArrowRight size={20} />
              </div>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-morning-slate/60">02/ Explore</span>
            </div>
            <div className="mt-12 relative z-10">
              <h3 className="text-xl font-heading font-bold text-morning-slate mb-1 group-hover:text-alpine-blue transition-colors">Digital Expeditions</h3>
              <p className="text-xs text-morning-slate/70">Discover our new trips</p>
            </div>
          </div>

          {/* Bento Box 3: Live Status / Info Widget */}
          <div className="md:col-span-4 glass-panel-light p-6 border-t border-l border-white/60 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -inset-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent opacity-50"></div>
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sunrise-gold shadow-[0_0_10px_#ffb347] animate-pulse"></span>
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-morning-slate/60">Live Base</span>
              </div>
              <Compass size={20} className="text-morning-slate/60 animate-[spin_10s_linear_infinite]" />
            </div>
            <div className="mt-8 relative z-10">
              <div className="flex justify-between items-end border-b border-morning-slate/10 pb-2 mb-2">
                <span className="text-xs text-morning-slate/70 uppercase tracking-wider">Alt</span>
                <span className="font-heading font-bold text-sunrise-gold">1,824m</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs text-morning-slate/70 uppercase tracking-wider">Temp</span>
                <span className="font-heading font-bold text-morning-slate">12°C / Clear</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;