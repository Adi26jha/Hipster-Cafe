import React from 'react';
import styles from './Fog.module.css';

const Fog = () => {
  return (
    <div className={styles.fogWrapper}>
      {/* Three layers of fog for thick, 3D atmosphere */}
      <div className={`${styles.fogLayer} ${styles.layer1}`}></div>
      <div className={`${styles.fogLayer} ${styles.layer2}`}></div>
      
      {/* Optional: A gradient overlay to blend it smoothly if needed */}
      <div className={styles.fogFade}></div> 
    </div>
  );
};

export default Fog;