import React from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import { allProducts } from '../data/products';

import { ArrowLeft } from 'lucide-react';

export const CategoryPage = ({ selectedCategory, onBack, onRequireAuth, onSelectProduct, onAddToCart }) => {
  const displayCategory = selectedCategory === 'Deals' ? 'All Deals' : selectedCategory;
  
  // If "Deals", we might just filter items with discounts.
  let productsToDisplay = allProducts;
  if (selectedCategory === 'Deals') {
    productsToDisplay = allProducts.filter(p => p.originalPrice !== null);
  } else if (selectedCategory !== 'All Categories') {
    productsToDisplay = allProducts.filter(p => p.category === selectedCategory);
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="mb-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            {onBack && (
              <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-text-primary border border-border px-4 py-2 rounded hover:bg-secondary transition w-fit mb-6">
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <h2 className="text-3xl font-black text-dark tracking-tight uppercase">{displayCategory}</h2>
            <div className="w-16 h-1 bg-accent mt-3 rounded-full"></div>
            <p className="text-text-secondary mt-2">Showing {productsToDisplay.length} products</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {productsToDisplay.map((product, idx) => (
            <motion.div
              key={`${product.name}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <ProductCard {...product} onAddToCart={() => onAddToCart && onAddToCart(product, 1)} onSelectProduct={onSelectProduct} />
            </motion.div>
          ))}
        </div>
        
        {productsToDisplay.length === 0 && (
          <div className="text-center py-20 text-text-secondary">
            <p className="text-xl">No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};
