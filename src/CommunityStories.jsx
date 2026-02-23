import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const CommunityStories = () => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      // Fetch 5 to have enough for a nice carousel (we can safely limit to 5)
      const { data, error } = await supabase.from('stories').select('*').limit(5).order('created_at', { ascending: false });
      if (data) {
        setStories(data);
        // If there's only 1 or 2 stories, just center the available ones. 
        // 5 is ideal for the 3D effect.
      }
    };
    fetchStories();
  }, []);

  if (stories.length === 0) return null;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % stories.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0A0E13] to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen" />

      {/* Glowing orb behind the active card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-sunrise-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-handwritten text-3xl text-sunrise-gold block mb-2 rotate-[-2deg]">
            The Journey So Far
          </span>
          <h2 className="text-5xl md:text-7xl font-heading text-white uppercase tracking-wider drop-shadow-md">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunrise-gold to-sunrise-peach">Chronicles</span>
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-white/60 font-body text-lg italic border-b border-sunrise-gold/30 pb-4 inline-block px-8">
            "Stories gathered from basecamps around the world."
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div
          className="relative h-[600px] flex items-center justify-center max-w-6xl mx-auto"
          style={{ perspective: '1200px' }}
        >
          <AnimatePresence>
            {stories.map((story, index) => {
              const isActive = index === currentIndex;
              const offset = index - currentIndex;
              const absOffset = Math.abs(offset);

              // Only render adjacent cards to keep DOM light and visual clean
              if (absOffset > 2) return null;

              return (
                <motion.div
                  key={story.id}
                  className="absolute w-[80vw] sm:w-[350px] md:w-[400px] h-[550px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    scale: isActive ? 1 : 1 - absOffset * 0.15,
                    opacity: isActive ? 1 : 1 - absOffset * 0.4,
                    x: `${offset * 75}%`,
                    zIndex: 30 - absOffset,
                    rotateY: offset * -20, // 3D tilt
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1] // Apple-like spring/ease
                  }}
                >
                  {/* The Physical Card */}
                  <div
                    className={`w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative  ${isActive
                        ? 'cursor-default ring-1 ring-sunrise-gold/30 shadow-[0_0_40px_rgba(255,179,71,0.15)]'
                        : 'cursor-pointer hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors'
                      }`}
                    onClick={() => !isActive && setCurrentIndex(index)}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100'}`}
                    />

                    {/* Rich cinematic gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

                    {/* Card Content (Only fully visible if active) */}
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white transition-opacity duration-300">

                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                        transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
                      >
                        <Quote size={32} className="text-sunrise-gold/40 mb-4" />

                        <h3 className="font-heading text-3xl md:text-4xl leading-tight mb-2 drop-shadow-md">
                          {story.title}
                        </h3>

                        <p className="text-sm font-bold text-sunrise-peach uppercase tracking-widest mb-4">
                          By {story.author_name}
                        </p>

                        <p className="text-white/80 font-body text-base leading-relaxed line-clamp-4 md:line-clamp-5">
                          {story.content}
                        </p>

                        <button className="mt-6 text-xs font-bold uppercase tracking-widest text-sunrise-gold hover:text-white transition-colors border-b border-sunrise-gold/50 pb-1 w-max">
                          Read The Full Entry
                        </button>
                      </motion.div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Carousel Controls */}
          {stories.length > 1 && (
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 z-40">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#1A1A1A] hover:bg-sunrise-gold hover:border-sunrise-gold transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {stories.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-sunrise-gold' : 'w-2 bg-white/20'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#1A1A1A] hover:bg-sunrise-gold hover:border-sunrise-gold transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default CommunityStories;