import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';

export const ProductCard = ({ image, name, category, price, originalPrice, rating, isNew, onAddToCart, onSelectProduct }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 group border border-border relative overflow-hidden cursor-pointer"
      onClick={() => onSelectProduct && onSelectProduct({ image, name, category, price, originalPrice, rating, isNew })}
    >
      {isNew && (
        <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          NEW
        </div>
      )}
      
      <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-secondary flex items-center justify-center p-4">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={image} 
          alt={name} 
          className="object-contain h-full w-full"
        />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart();
          }}
          className="absolute bottom-4 right-4 bg-dark text-white p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent shadow-lg"
        >
          <ShoppingCart size={20} />
        </button>
      </div>

      <div className="space-y-1">
        <div className="text-xs text-text-secondary font-medium tracking-wider uppercase">{category}</div>
        <h3 className="font-bold text-text-primary text-lg leading-tight line-clamp-1">{name}</h3>
        
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-accent text-accent" : "text-gray-300"} />
          ))}
          <span className="text-xs text-text-secondary ml-1">({rating})</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-text-primary">₹{price}</span>
          {originalPrice && (
            <span className="text-sm text-text-secondary line-through">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
