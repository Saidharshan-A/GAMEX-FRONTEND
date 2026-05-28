import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MicroExpander = ({ icon: Icon, text, badge, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center text-text-primary bg-transparent hover:bg-secondary rounded-full p-2.5 transition-colors overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      <div className="relative z-10 flex items-center justify-center shrink-0">
        <Icon size={22} strokeWidth={2} className="transition-colors group-hover:text-accent" />
        {badge && (
          <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {badge}
          </span>
        )}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
            animate={{ width: "auto", opacity: 1, paddingLeft: 8 }}
            exit={{ width: 0, opacity: 0, paddingLeft: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden whitespace-nowrap text-sm font-bold text-dark"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const Navbar = ({ onCartClick, cartItemCount, onSelectCategory, selectedCategory, onAccountClick }) => {
  const navLinks = ['Shop', 'Marketplace', 'Deals', 'PC Builder', 'Sell Product'];

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-border shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 mr-8 cursor-pointer">
          <div className="w-8 h-8 bg-accent rounded-br-xl rounded-tl-xl flex items-center justify-center">
            <span className="text-white font-black text-xl leading-none">X</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-dark">GAME<span className="text-accent">X</span></span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-8 relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search for premium gaming gear..." 
            className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-full py-3 px-6 pl-12 outline-none text-sm text-text-primary placeholder:text-text-secondary"
          />
          <Search size={18} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-text-secondary" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-2 bg-white rounded-full border border-border p-1 shadow-sm">
          <MicroExpander icon={User} text="Account" onClick={onAccountClick} />
          <MicroExpander icon={Heart} text="Wishlist" />
          <MicroExpander icon={ShoppingCart} text="Cart" badge={cartItemCount > 0 ? cartItemCount.toString() : null} onClick={onCartClick} />
        </div>

      </div>

      {/* Secondary Nav Links */}
      <div className="max-w-[1600px] mx-auto px-6 h-12 flex items-center space-x-8 overflow-x-auto no-scrollbar border-t border-border/50">
        {navLinks.map((link) => (
          <button 
            key={link} 
            onClick={() => onSelectCategory && onSelectCategory(link)}
            className={`text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 h-full border-b-2 
              ${link === 'Sell Product' ? 'text-white bg-accent px-4 py-1.5 rounded-full my-auto h-auto border-none hover:bg-red-600 ml-auto' : 
                selectedCategory === link ? 'text-accent border-accent' : 'text-text-secondary border-transparent hover:text-accent'}`}
          >
            {link}
            {link === 'PC Builder' && <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded leading-none">NEW</span>}
          </button>
        ))}
      </div>
    </nav>
  );
};
