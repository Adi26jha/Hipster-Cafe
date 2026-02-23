import React from 'react';
import styles from './Overlay.module.css';

const Overlay = () => {
  return (
    <>
      {/* The Grain Texture */}
      <div className={styles.noise} />
      {/* The Dark Corners (Vignette) */}
      <div className={styles.vignette} />
    </>
  );
};

export default Overlay;