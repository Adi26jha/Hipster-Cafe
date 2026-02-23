import React, { useState, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './MusicPlayer.module.css';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'));
  
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.4; // Set volume to 40% so it's not too loud
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      className={styles.playerContainer}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }} // Wait for preloader
    >
      {/* Vinyl Disc Animation */}
      <div className={`${styles.disc} ${isPlaying ? styles.spinning : ''}`}>
        <div className={styles.discLabel} />
      </div>

      {/* Text Info */}
      <div className={styles.controls}>
        <span className={styles.trackName}>Cafe Vibes</span>
        <span className={styles.status}>
          {isPlaying ? 'Now Playing' : 'Paused'}
        </span>
      </div>

      {/* Play/Pause Button */}
      <button onClick={togglePlay} className={styles.toggleBtn}>
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

    </motion.div>
  );
};

export default MusicPlayer;