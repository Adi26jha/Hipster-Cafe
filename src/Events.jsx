import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import { supabase } from './supabaseClient';
import styles from './Events.module.css';
import { useModal } from './ModalContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  const fallbackEvents = [
    {
      id: 1,
      artist: "Luna Moon",
      image: "https://images.unsplash.com/photo-1516280440502-628d011885f8?q=80&w=2000&auto=format&fit=crop",
      date: "Friday, 8:00 PM",
      genre: "Indie Acoustic",
      tag: "Live Music"
    },
    {
      id: 2,
      artist: "The Midnight Howl",
      image: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4f8?q=80&w=1000&auto=format&fit=crop",
      date: "Saturday, 9:00 PM",
      genre: "Alternative Rock",
      tag: "Headliner"
    },
    {
      id: 3,
      artist: "Open Mic Night",
      image: "https://images.unsplash.com/photo-1525926472844-36940026e255?q=80&w=1000&auto=format&fit=crop",
      date: "Thursday, 7:00 PM",
      genre: "Various",
      tag: "Community"
    }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('id', { ascending: true });

        if (error || !data || data.length === 0) throw new Error("Trigger Fallback");
        setEvents(data);
      } catch (error) {
        console.log('Using fallback events due to network timeout or empty DB.');
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section id="events" className={styles.stageContainer}>

      {/* Background Ambience & Neon Watermark */}
      <div className={styles.glow} />
      <div className="absolute top-1/3 -left-[5%] opacity-[0.06] select-none pointer-events-none whitespace-nowrap overflow-hidden mix-blend-screen">
        <span className="text-[20rem] md:text-[30rem] font-heading font-black text-transparent leading-none" style={{ WebkitTextStroke: '4px #38BDF8' }}>THE STAGE</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          THE STAGE
        </motion.h2>

        <p className={styles.subtitle}>
          We don't just serve coffee. We serve culture.
          Catch the best local talent or grab the mic yourself.
        </p>
      </div>

      {/* Dynamic Rendering Logic */}
      {loading ? (
        <div className="flex justify-center py-20 text-alpine-blue animate-spin">
          <Loader size={40} />
        </div>
      ) : (
        <div className={styles.performersGrid}>
          {events.length === 0 ? (
            <div className="text-center text-white/50 w-full col-span-3">
              No upcoming events found. Stay tuned!
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={index === 0 ? "md:col-span-8 md:row-span-2 min-h-[500px] h-full" : "md:col-span-4 min-h-[350px] h-full"}
              >
                {/* DARK GLASS CARD WRAPPER */}
                <div
                  className={`${styles.card} w-full h-full group`}
                  onClick={() => openModal(event.artist, "Detailed lineup and booking info coming soon.", "text")}
                >
                  {/* BACKGROUND IMAGE WITH MOODY OPACITY */}
                  <img
                    src={event.image}
                    alt={event.artist}
                    className={styles.cardImage}
                  />

                  {/* FLOATING DARK LOGO/TAGS */}
                  <div className={styles.artistTag}>
                    <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold font-heading border border-white/10 text-sunrise-gold uppercase tracking-widest shadow-xl">
                      {event.genre}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold font-heading border border-white/20 text-white shadow-xl">
                      {event.tag}
                    </span>
                  </div>

                  {/* CONTENT OVERLAY */}
                  <div className={styles.cardContent}>
                    <h3 className={`${styles.artistName} ${index === 0 ? 'text-5xl md:text-7xl mb-4' : 'text-3xl mb-2'}`}>
                      {event.artist}
                    </h3>

                    <div className="flex items-center justify-between w-full mt-2">
                      <div className="flex items-center gap-2 text-morning-mist/80 group-hover:text-white transition-colors font-bold text-sm tracking-wider uppercase">
                        <Calendar size={16} className="text-alpine-blue" />
                        {event.date}
                      </div>

                      {/* HOVER REVEAL CTA - Neon Arrow */}
                      <div
                        className="w-12 h-12 rounded-full border border-alpine-blue/50 text-alpine-blue flex items-center justify-center group-hover:bg-alpine-blue group-hover:text-[#0A0E13] group-hover:border-alpine-blue group-hover:shadow-[0_0_20px_#38bdf899] transition-all duration-300"
                      >
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* "Pitch Yourself" CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.ctaContainer}
      >
        <div className={styles.glow} style={{ top: '50%', left: '50%', width: '600px', height: '600px' }}></div>
        <h3 className="font-heading text-4xl mb-4 relative z-10 text-white">Take The Stage</h3>
        <p className="font-body text-morning-mist/80 mb-6 relative z-10 max-w-xl mx-auto">
          Got an unreleased track? A poem that needs oxygen? Our stage is open to the community every Thursday night.
        </p>
        <button
          className={styles.ctaButton}
          onClick={() => openModal("Open Mic", "Signups for Open Mic open every Monday at noon.", "text")}
        >
          Apply for Open Mic <ArrowRight size={18} />
        </button>
      </motion.div>

    </section>
  );
};

export default Events;