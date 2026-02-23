import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import styles from './Preloader.module.css';

const Preloader = () => {
  return (
    <motion.div
      className={styles.loaderContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }} // Slides up and fades out when done
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      
      {/* Spinning Compass */}
      <motion.div
        className={styles.compassWrapper}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Compass size={64} strokeWidth={1.5} />
      </motion.div>

      {/* Brand Text */}
      <motion.h1 
        className={styles.text}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Hipster's Cafe
      </motion.h1>
      
      <motion.p 
        className={styles.subtext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        ESTABLISHING BASE CAMP...
      </motion.p>

      {/* Loading Bar Animation */}
      <div className={styles.progressContainer}>
        <motion.div 
          className={styles.progressBar}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </div>

    </motion.div>
  );
};

export default Preloader;