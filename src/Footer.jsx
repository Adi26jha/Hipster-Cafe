import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, ArrowRight, Check } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  // State to track if the user has subscribed
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  const handleSubscribe = () => {
    // In a real app, you would send this to Supabase here
    if (!emailSubscribed) setEmailSubscribed(true);
  };

  return (
    <footer id="visit" className={styles.footerContainer}>
      <div className={styles.contentWrapper}>

        {/* Col 1: Brand */}
        <div>
          <h3 className="font-heading text-4xl text-sunrise-gold mb-6 drop-shadow-sm">HIPSTER'S CAFE</h3>
          <p className={styles.text}>
            More than a cafe. A community of explorers, artists, and dreamers.
            Base Camp for your next adventure.
          </p>
        </div>

        {/* Col 2: Visit */}
        <div>
          <h4 className={styles.columnTitle}>VISIT BASE CAMP</h4>
          <div className="flex items-start gap-3 mb-4 text-morning-slate/80">
            <MapPin size={20} className="mt-1 text-alpine-blue" />
            <p>123 Adventure Lane,<br />Hauz Khas Village,<br />New Delhi, 110016</p>
          </div>
          <div className="flex items-center gap-3 mb-4 text-morning-slate/80">
            <Phone size={20} className="text-alpine-blue" />
            <p>+91 98765 43210</p>
          </div>
          <div className="flex items-center gap-3 text-morning-slate/80">
            <Mail size={20} className="text-alpine-blue" />
            <p>hello@hipstercafe.com</p>
          </div>
        </div>

        {/* Col 3: Links */}
        <div>
          <h4 className={styles.columnTitle}>EXPLORE</h4>
          <a href="#story" className={styles.textLink}>The Story</a>
          <a href="#events" className={styles.textLink}>Upcoming Events</a>
          <a href="#trips" className={styles.textLink}>Travel Archive</a>
          <a href="#" className={styles.textLink}>Careers (Join the Crew)</a>
        </div>

        {/* Col 4: Newsletter (Interactive) */}
        <div>
          <h4 className={styles.columnTitle}>JOIN THE TRIBE</h4>
          <p className="text-sm mb-4 text-morning-slate/80">Get updates on the next mountain trip and open mic nights.</p>

          {emailSubscribed ? (
            // Success State
            <div className="bg-alpine-blue/10 text-alpine-blue p-3 rounded border border-alpine-blue/20 flex items-center gap-2 animate-pulse shadow-sm">
              <Check size={20} />
              <span className="font-bold text-sm">Welcome to the Tribe.</span>
            </div>
          ) : (
            // Input State
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Your email..." className={styles.input} />
              <button onClick={handleSubscribe} className={styles.submitBtn}>
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          <div className={styles.socialGroup}>
            <div className={styles.socialIcon}><Instagram size={20} /></div>
            <div className={styles.socialIcon}><Facebook size={20} /></div>
            <div className={styles.socialIcon}><Twitter size={20} /></div>
          </div>
        </div>

      </div>

      <div className={styles.copyright}>
        © 2026 Hipster's Cafe. Built for the Community.
      </div>
    </footer>
  );
};

export default Footer;