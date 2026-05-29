import React from 'react';
import { ProductCard } from '../ui/ProductCard';
import { motion } from 'framer-motion';
import { allProducts } from '../../data/products';

export const HotDeals = ({ onRequireAuth, onSelectProduct, onAddToCart }) => {
  // Grab a few high-end products to showcase as hot deals
  const deals = allProducts
    .filter(p => p.originalPrice || p.price > 50000)
    .slice(0, 3)
    .map(p => ({
      ...p,
      originalPrice: p.originalPrice || Math.floor(p.price * 1.2), // Add a fake original price if missing
      isNew: true
    }));

  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-black text-dark tracking-tight">HOT DEALS</h2>
          <div className="w-12 h-1 bg-accent mt-2 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {deals.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProductCard 
              {...product} 
              onAddToCart={() => onAddToCart && onAddToCart(product, 1)} 
              onSelectProduct={onSelectProduct} 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
