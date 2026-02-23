import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Cursor.module.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  return (
    <motion.div 
      className={`${styles.cursor} ${isClicking ? styles.clicking : ''}`}
      animate={{ 
        x: position.x - 16, // Center offset
        y: position.y - 16  // Center offset
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 28,
        mass: 0.5
      }}
    />
  );
};

export default Cursor;