import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import heroBg from '/images/hero_bg_1779654779374.png'; // Make sure to match the actual file name

export const Hero = ({ onSelectCategory }) => {
  return (
    <div className="relative h-[500px] rounded-[32px] overflow-hidden mb-8 shadow-2xl group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-12 md:px-20 z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/20 border border-accent/50 text-accent font-bold text-sm tracking-widest uppercase">
            New Arrival
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            GEAR UP.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-500">LEVEL UP.</span>
          </h1>
          
          <p className="text-lg text-white/80 mb-10 max-w-xl leading-relaxed">
            Premium gear. Unmatched performance. Built for gamers who demand the absolute best in esports and competitive play.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button onClick={() => onSelectCategory('Deals')} variant="outline">Explore Deals</Button>
          </div>
        </motion.div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-12 md:left-20 flex space-x-3">
        <div className="w-8 h-1 bg-accent rounded-full"></div>
        <div className="w-2 h-1 bg-white/30 rounded-full transition-all hover:bg-white/50 cursor-pointer"></div>
        <div className="w-2 h-1 bg-white/30 rounded-full transition-all hover:bg-white/50 cursor-pointer"></div>
      </div>
    </div>
  );
};
