import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "I came for the coffee, but stayed for the people. I met my co-founder at the open mic night here. This place has a soul.",
    name: "Alex R.",
    role: "Regular since 2018",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    rotation: '-2deg' // Slight tilt left
  },
  {
    text: "Most cafes are just workspaces now. Hipster's is different. It feels like a living room where everyone knows your name.",
    name: "Priya K.",
    role: "Travel Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    rotation: '1deg' // Slight tilt right
  },
  {
    text: "The Himalayan trip they organized last year changed my life. It's not just a brand, it's a real community.",
    name: "Marcus T.",
    role: "Adventure Junkie",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    rotation: '-1deg' // Slight tilt left
  }
];

const Testimonials = () => {
  return (
    <section className={styles.sectionContainer}>
      
      {/* Header */}
      <div className={styles.header}>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4 text-accent-rust"
        >
          <Quote size={40} />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          Stories from the Fire.
        </motion.h2>
        <p className={styles.subtitle}>
          Real words from the tribe.
        </p>
      </div>

      {/* Grid of Notes */}
      {/* FIX: Changed styles.grid to styles.testimonialsGrid */}
      <div className={styles.testimonialsGrid}>
        {reviews.map((review, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={styles.noteCard}
            style={{ rotate: review.rotation }} // Applies the tilt
          >
            {/* The Pin Graphic */}
            <div className={styles.pin} />

            <p className={styles.quote}>"{review.text}"</p>
            
            <div className={styles.author}>
              <img src={review.image} alt={review.name} className={styles.avatar} />
              <div>
                <div className={styles.name}>{review.name}</div>
                <div className={styles.role}>{review.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Testimonials;