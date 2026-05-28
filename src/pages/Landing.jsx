import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Landing = ({ onEnter }) => {
  const navLinks = ['Home', 'About', 'Shop', 'Services', 'Marketplace', 'Contact', 'Sell'];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden font-sans">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="https://res.cloudinary.com/dnxaq3bsf/video/upload/v1779684210/WhatsApp_Video_2026-05-24_at_10.11.55_PM_rwhm2h.mp4" type="video/mp4" />
      </video>

      {/* Navigation */}
      <nav className="w-full pt-12 flex justify-center relative z-10">
        <ul className="flex space-x-10 text-sm font-medium">
          {navLinks.map((link, idx) => (
            <li key={idx} className="relative">
              <a
                href="#"
                className={`${link === 'Home' ? 'text-[#00d26a]' : 'text-white hover:text-[#00d26a]'} transition-colors`}
              >
                {link}
              </a>
              {link === 'Home' && (
                <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#00d26a]"></div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-6">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="text-white text-[7vw] md:text-[120px] font-bold tracking-[0.2em] leading-none flex items-center justify-center">
            G<span className="font-light tracking-[0.2em] mx-1">Λ</span>M E X
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/90 text-xl md:text-3xl font-medium tracking-wide mb-14 text-center"
        >
          Where Innovation Knows No Bounds
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onClick={onEnter}
          className="group flex items-center space-x-4 border-2 border-[#00d26a] rounded-full py-2.5 pl-8 pr-2.5 hover:bg-[#00d26a]/10 transition-colors"
        >
          <span className="text-[#00d26a] font-medium text-lg tracking-wide">Browse Marketplace</span>
          <div className="w-10 h-10 bg-[#00d26a] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <ArrowRight className="text-[#07130c]" size={20} strokeWidth={3} />
          </div>
        </motion.button>

      </main>
    </div>
  );
};
