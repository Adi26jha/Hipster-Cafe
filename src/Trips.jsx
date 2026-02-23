import React, { useState } from 'react'; // <--- Added useState
import { motion } from 'framer-motion';
import { Map, ArrowUpRight } from 'lucide-react';
import styles from './Trips.module.css';

const pastTrips = [
  {
    title: "Himalayan Base Camp",
    date: "Oct 2019",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Desert Stargazing",
    date: "Mar 2021",
    image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Forest River Rafting",
    date: "Aug 2022",
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=2070&auto=format&fit=crop"
  }
];

const voteOptions = [
  { id: 'alpes', title: 'Swiss Alps', icon: '🏔️' },
  { id: 'patagonia', title: 'Patagonia', icon: '⛺' },
  { id: 'iceland', title: 'Iceland', icon: '🌋' }
];

const Trips = () => {
  // State to track which location the user voted for
  const [votedFor, setVotedFor] = useState(null);

  const handleVote = (id) => {
    setVotedFor(id);
  };

  return (
    <section id="trips" className={styles.tripContainer}>

      {/* Header */}
      <div className={styles.header}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          The Archive.
        </motion.h2>
        <p className={styles.subtitle}>
          Before we had walls, we had the wild. Explore our past expeditions.
        </p>
      </div>

      {/* Trip Gallery */}
      <div className={styles.tripsGrid}>
        {pastTrips.map((trip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`${styles.card} group`}
          >
            <img src={trip.image} alt={trip.title} className={styles.cardImage} />
            <div className={styles.cardOverlay} />

            <div className={styles.cardContent}>
              <span className={styles.tripDate}>{trip.date}</span>
              <h3 className={styles.tripTitle}>{trip.title}</h3>
              <div className="flex items-center gap-2 text-sm font-bold border-b border-accent-gold w-max pb-1">
                VIEW JOURNAL <ArrowUpRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Voting Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.votingSection}
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Map size={200} />
        </div>

        <h3 className={styles.votingTitle}>Where should we go next?</h3>
        <p className="mb-8 opacity-80">Cast your vote for the 2026 Community Trip.</p>

        {/* Interactive Vote Grid */}
        <div className={styles.voteGrid}>
          {voteOptions.map((option) => (
            <button
              key={option.id}
              className={`${styles.voteButton} group border ${votedFor === option.id ? 'border-sunrise-gold shadow-[0_4px_15px_#ffb3474c]' : 'border-white/60'}`}
              onClick={() => handleVote(option.id)}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{option.icon}</span>
                <span>{option.title}</span>
              </div>
              {/* Status Indicator */}
              {votedFor === option.id ? (
                <span className="bg-sunrise-gold text-white text-xs px-3 py-1.5 rounded-full font-bold">VOTED</span>
              ) : (
                <span className="text-alpine-blue/70 group-hover:text-alpine-blue text-xs px-3 py-1.5 rounded-full font-bold border border-alpine-blue/30 group-hover:border-alpine-blue transition-colors">VOTE</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Trips;