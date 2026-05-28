import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 font-semibold rounded-full transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-red-700 shadow-[0_0_15px_rgba(255,31,45,0.4)] hover:shadow-[0_0_25px_rgba(255,31,45,0.6)]",
    outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
    secondary: "bg-dark-light text-white hover:bg-dark border border-white/10 hover:border-white/30",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
