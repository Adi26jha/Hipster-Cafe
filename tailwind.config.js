/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* --- 1. NEW "BASE CAMP 2026" PALETTE --- */

        // Primary - Deep & Immersive (Kept for legacy)
        nature: {
          dark: '#0A0E13',   // Near-black slate (Ultra Dark Mode)
          green: '#1A3311',  // Deeper forest neon-tint setup
          sky: '#3ABEF9',    // Brighter mountain sky
          brown: '#5C3317',  // Richer earth tones
        },

        // --- PHASE 3: MORNING MOUNTAIN PALETTE ---
        morning: {
          mist: '#F8FAFC',       // Clean, crisp morning white
          snow: '#FFFFFF',       // Absolute white
          slate: '#0F172A',      // Deep navy for sharp readable text
        },
        sunrise: {
          gold: '#F59E0B',       // Vivid morning sun (Amber)
          peach: '#F97316',      // Warm sunrise transition (Orange)
        },
        alpine: {
          blue: '#38BDF8',       // Bright clear sky blue
          pine: '#064E3B',       // Deep emerald shadow
        },

        // Secondary - Energy & High Contrast (Legacy)
        energy: {
          yellow: '#FFDD00', // Hyper-vibrant signature color
          orange: '#FF5A00', // Neon warmth
          gold: '#FFB800',   // Sharp highlight
          cream: '#F2E8DC',  // Off-white soft background
        },

        // Accent - Futuristic Action
        action: {
          teal: '#00FFCC',   // Cyberpunk-esque CTA color
          darkTeal: '#00997A', // Secondary CTA / Hover state
          blue: '#00C3FF',   // Neon Links
        },

        // NeutralPalette
        neutral: {
          offWhite: '#F8FAFC', // Crisp white on dark
          lightGray: '#94A3B8', // Muted borders/text
          mediumGray: '#475569', // Deep secondary elements
        },

        /* --- 2. LEGACY COMPATIBILITY (Ensures Visibility & Prevents Errors) --- */
        primary: {
          cream: '#F2E8DC',
          brown: '#0A0E13',
        },
        secondary: {
          charcoal: '#0A0E13',
        },
        accent: {
          gold: '#FFDD00',
          rust: '#FF5A00',
        },
        'ui-border': '#94A3B8',
      },

      // Typography System
      fontFamily: {
        heading: ['"Oswald"', 'sans-serif'],
        subheading: ['"Lora"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },

      // Background and Custom Utilities
      backgroundImage: {
        'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}