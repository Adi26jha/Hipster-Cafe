import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mountain, Mic, Coffee } from 'lucide-react';

const timelineData = [
  {
    year: '2015',
    title: 'The First Expedition',
    text: 'It started with a backpack and a map. We organized monthly treks to the Himalayas, building a community of thrill-seekers who wanted more than just a weekend on the couch.',
    icon: <Mountain size={32} className="text-white mb-6" />,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    year: '2018',
    title: 'The Open Mic Movement',
    text: 'The tribe grew. We needed a place to share stories between trips. We started hosting open mic nights in basements and parks. Musicians, poets, and travelers found a voice.',
    icon: <Mic size={32} className="text-white mb-6" />,
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop'
  },
  {
    year: '2023',
    title: 'Base Camp Established',
    text: 'We finally found a home. Hipster Cafe opened its doors not just as a permanent coffee shop, but as a permanent base camp for the community we built over 8 years.',
    icon: <Coffee size={32} className="text-white mb-6" />,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop'
  }
];

const Timeline = () => {
  const containerRef = useRef(null);

  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate Opacities for the 3 background images
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);

  const opacities = [opacity1, opacity2, opacity3];

  return (
    <section ref={containerRef} id="story" className="relative w-full bg-[#0A0E13]">

      {/* 1. STICKY BACKGROUND CONTAINER */}
      <div className="absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              style={{ opacity: opacities[index] }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-black/50 z-10" />
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover scale-105"
              />
            </motion.div>
          ))}

          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-morning-mist to-transparent z-20" />
        </div>
      </div>

      {/* 2. SCROLLING CONTENT BLOCKS */}
      <div className="relative z-30">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="min-h-screen w-full flex items-center justify-center md:justify-start px-6 py-20 md:px-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-x-0 -top-20 h-40 bg-white/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-sunrise-gold/20 transition-colors duration-700" />

              <div className="relative z-10">
                {item.icon}
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-[1px] w-8 bg-sunrise-gold"></span>
                  <h4 className="font-heading text-sunrise-gold text-2xl tracking-widest uppercase">
                    {item.year}
                  </h4>
                </div>

                <h2 className="font-heading text-5xl md:text-7xl text-white mb-6 drop-shadow-lg tracking-tight">
                  {item.title}
                </h2>
                <p className="font-body text-white/80 text-lg md:text-xl leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          </div>
        ))}

        <div className="min-h-[30vh] w-full flex items-center justify-center py-20 pb-40 relative z-30 pointer-events-none">
          <p className="font-handwritten text-4xl text-morning-slate shadow-xl bg-white/60 backdrop-blur-md px-10 py-4 rounded-3xl z-30">And the journey continues...</p>
        </div>
      </div>

    </section>
  );
};

export default Timeline;