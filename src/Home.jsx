// src/Home.jsx
import React from 'react';

// Import all the components
import Navbar from './Navbar';
import Hero from './Hero';
import Marquee from './Marquee';
import Timeline from './Timeline';
import Events from './Events';
import Trips from './Trips';
import Testimonials from './Testimonials';
import CommunityStories from './CommunityStories';
import Menu from './Menu';
import Footer from './Footer';
import Overlay from './Overlay'; 
import Cursor from './Cursor';
import MusicPlayer from './MusicPlayer';
import ParallaxDivider from './ParallaxDivider';
import Altimeter from './Altimeter';

const Home = () => {
  return (
    <>
      {/* The Aesthetic Layers */}
      <Overlay /> 
      <Cursor />  
      <MusicPlayer />
      <Altimeter /> 
      
      {/* The Main Content */}
      <Navbar />
      <Hero />

      {/* --- 1. THE BUFFER (Marquee) --- */}
      {/* This creates a clean break between the Hero image and the next section */}
      <Marquee /> 

      {/* --- 2. THE INTRO (Divider) --- */}
      {/* Now this image won't clash with the Hero image */}
      <ParallaxDivider 
        image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
        text="Roasted with Love"
      />

      {/* --- 3. THE MENU --- */}
      <Menu />

      {/* The Story follows the food */}
      <Timeline />
      <Events />

      <ParallaxDivider 
        image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
        text="Into the Wild"
      />

      <Trips />
      <Testimonials />
      
      <CommunityStories /> 

      <Footer />
    </>
  );
};

export default Home;