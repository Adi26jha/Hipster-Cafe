import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ParallaxDivider.module.css';

const ParallaxDivider = ({ image, text }) => {
  const ref = useRef(null);

  // Track scroll progress of THIS specific component
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax Effect: Move image on Y axis based on scroll
  // As we scroll down, the image moves slightly in the opposite direction
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={styles.container} style={{ position: 'relative' }}>
      <motion.img
        src={image}
        alt="Parallax Background"
        style={{ y }} // Bind the motion value
        className={styles.image}
      />

      <div className={styles.overlay} />

      {text && (
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.text}
        >
          {text}
        </motion.h2>
      )}
    </div>
  );
};

export default ParallaxDivider;