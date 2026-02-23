import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Altimeter = () => {
  const [altitude, setAltitude] = useState(0);
  // Default to 'light' (meaning the text should be light because bg is dark)
  const [theme, setTheme] = useState('light'); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // 1. Calculate Altitude (1px = 1ft)
      setAltitude(Math.floor(scrollY));

      // 2. "Chameleon" Logic: Detect which section we are currently floating over
      // The Altimeter is fixed at roughly 50% of the viewport height
      const altimeterPosition = scrollY + (viewportHeight / 2);

      // Define your sections and their background type
      // true = Dark Background (Need Light Text)
      // false = Light Background (Need Dark Text)
      const sections = [
        { id: 'hero', isDark: true },    // Mountain Image
        { id: 'menu', isDark: false },   // Cream Paper
        { id: 'story', isDark: false },  // Cream/White
        { id: 'events', isDark: true },  // Dark Cave
        { id: 'trips', isDark: false },  // Light Grid
        { id: 'visit', isDark: true },   // Footer/Map usually Dark
      ];

      // Find which section is currently under the Altimeter
      let currentSectionIsDark = true; // Default to dark background behavior

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // Check if Altimeter line passes through this section
          if (altimeterPosition >= offsetTop && altimeterPosition < (offsetTop + offsetHeight)) {
            currentSectionIsDark = section.isDark;
            break; 
          }
        }
      }

      setTheme(currentSectionIsDark ? 'light' : 'dark');
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial color
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- DYNAMIC COLOR CLASSES ---
  const colors = {
    // If background is Dark -> Text should be White/Yellow
    light: {
      text: 'text-white',
      accent: 'text-energy-yellow',
      border: 'border-white/30',
      tick: 'bg-white'
    },
    // If background is Light -> Text should be Charcoal/Brown
    dark: {
      text: 'text-nature-dark',
      accent: 'text-nature-brown',
      border: 'border-nature-dark/30',
      tick: 'bg-nature-dark'
    }
  };

  const activeColor = colors[theme];

  return (
    // Container fixed to the right side
    <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-4 transition-colors duration-500 ${activeColor.text}`}>
      
      {/* 1. Rotated Label */}
      <span className={`text-[10px] uppercase tracking-[0.2em] font-bold rotate-90 origin-right translate-x-2 mb-8 opacity-70 transition-colors duration-500`}>
        ELEVATION
      </span>

      <div className="flex items-center gap-4">
        {/* 2. The Dynamic Number & Unit */}
        <div className="text-right">
          <div className="flex items-baseline justify-end gap-1">
            {/* The number itself pops in the Accent Color */}
            <motion.span 
               key={altitude} // React key to trigger micro-animation on change
               initial={{ y: -2, opacity: 0.8 }}
               animate={{ y: 0, opacity: 1 }}
               className={`font-heading text-3xl tabular-nums leading-none transition-colors duration-500 ${activeColor.accent}`}
            >
              {altitude}
            </motion.span>
            {/* Unit */}
            <span className="text-xs font-bold opacity-80">ft</span>
          </div>
        </div>

        {/* 3. The Vertical Scale (Visual Decor) */}
        <div className={`flex flex-col gap-3 items-end h-32 justify-between border-r-2 pr-2 py-2 transition-colors duration-500 ${activeColor.border}`}>
           {/* Tick Marks */}
           {[...Array(7)].map((_, i) => (
             <div 
               key={i} 
               className={`h-[2px] rounded-full transition-all duration-500 ${activeColor.tick} ${i === 3 ? 'w-6 opacity-100' : 'w-3 opacity-40'}`} 
             />
           ))}
        </div>
      </div>

    </div>
  );
};

export default Altimeter;