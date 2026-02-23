import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ArrowRight } from 'lucide-react';

const menuData = {
  'Essentials': [
    { name: "Summit Espresso", price: "$3.50", desc: "Double shot, intense & smoky notes of pine." },
    { name: "Trail Flat White", price: "$4.50", desc: "Velvety oat milk with a caramel finish." },
    { name: "Basecamp Brew", price: "$4.00", desc: "Our signature drip. Endless refills for hikers." },
    { name: "Sherpa Chai", price: "$5.00", desc: "House-made spicy concentrate, steamed milk." },
    { name: "The Alpinist", price: "$6.50", desc: "Cold brew, maple syrup, dash of sea salt." }
  ],
  'Pour Overs': [
    { name: "Ethiopian Yirgacheffe", price: "$6.00", desc: "Light roast. Floral aromatics with a lemon-zest finish." },
    { name: "Colombian Supremo", price: "$5.50", desc: "Medium roast. Brown sugar, roasted nuts." },
    { name: "Sumatra Mandheling", price: "$5.75", desc: "Dark roast. Earthy, full-bodied with dark chocolate notes." }
  ],
  'Bites': [
    { name: "Trail Mix Cookie", price: "$3.50", desc: "Oats, dark chocolate chunks, cranberries, sea salt." },
    { name: "Climber's Croissant", price: "$4.50", desc: "Flaky, buttery, baked fresh every morning." },
    { name: "Avocado Base Toast", price: "$8.50", desc: "Sourdough, smashed avocado, chili flakes, olive oil." }
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Essentials');

  return (
    <section id="menu" className="py-32 bg-energy-cream relative overflow-hidden border-b border-t border-nature-dark/5">

      {/* Subtle Paper Grain Background */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      {/* Main Container constrained to avoid the Altimeter on the right edge */}
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">

        {/* Editorial Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-handwritten text-4xl text-energy-orange mb-3 rotate-[-3deg]"
          >
            Roasted with Love
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-heading text-nature-dark uppercase tracking-tight"
          >
            Basecamp <span className="text-nature-brown">Fuel</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-xl text-nature-dark/70 font-subheading italic max-w-xl text-center"
          >
            "Warm your hands and your soul. Our beans are sourced from the very mountains we climb."
          </motion.p>
        </div>

        {/* Magnetic Tabs - Center aligned */}
        <div className="flex flex-wrap justify-center gap-3 lg:gap-6 mb-20">
          {Object.keys(menuData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-8 py-3.5 font-heading text-sm md:text-base uppercase tracking-widest transition-colors duration-300 rounded-full ${activeCategory === category ? 'text-white' : 'text-nature-dark/50 hover:text-nature-dark'
                }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="minimal-menu-tab"
                  className="absolute inset-0 bg-energy-orange rounded-full shadow-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {category === 'Essentials' && <Coffee size={16} />}
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Centered Symmetrical Text Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid md:grid-cols-2 gap-x-16 gap-y-12"
            >
              {menuData[activeCategory].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  className="group cursor-pointer relative"
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-heading text-2xl text-nature-dark group-hover:text-energy-orange transition-colors duration-300 tracking-wide">
                      {item.name}
                    </h3>

                    {/* Dotted connector */}
                    <div className="flex-grow border-b-2 border-dotted border-nature-dark/10 mx-4 opacity-50 group-hover:opacity-100 transition-opacity" />

                    <span className="font-bold font-heading text-xl text-nature-green">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-base font-body text-nature-dark/60 group-hover:text-nature-dark/80 transition-colors pr-10">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle Bottom CTA */}
        <div className="mt-24 pt-12 border-t border-nature-dark/10 flex justify-center">
          <button className="flex items-center gap-3 text-energy-orange font-heading uppercase tracking-[0.2em] text-sm hover:text-nature-dark transition-all duration-300 group">
            <span className="relative overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">Download Full PDF Menu</span>
              <span className="block absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">Download Full PDF Menu</span>
            </span>
            <div className="w-10 h-10 rounded-full border border-energy-orange flex items-center justify-center group-hover:bg-nature-dark group-hover:border-nature-dark group-hover:text-white transition-colors duration-300">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Menu;