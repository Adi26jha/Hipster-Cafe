import React from 'react';
import styles from './Marquee.module.css';

const Marquee = () => {
  const content = "• FRESH BREWS • LIVE MUSIC • WILD TRIPS • COMMUNITY FIRST ";

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.track}>
        {/* Render text multiple times to ensure it fills wide screens */}
        <span className={styles.text}>{content}</span>
        <span className={styles.text}>{content}</span>
        <span className={styles.text}>{content}</span>
        <span className={styles.text}>{content}</span>
        
        {/* Duplicate set for the seamless loop effect */}
        <span className={styles.text}>{content}</span>
        <span className={styles.text}>{content}</span>
        <span className={styles.text}>{content}</span>
        <span className={styles.text}>{content}</span>
      </div>
    </div>
  );
};

export default Marquee;