import React, { useState } from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import { allProducts } from '../data/products';

import { ArrowLeft, ChevronDown, ArrowRight } from 'lucide-react';

export const CategoryPage = ({ selectedCategory, onBack, onRequireAuth, onSelectProduct, onAddToCart }) => {
  const displayCategory = selectedCategory === 'Deals' ? 'All Deals' : selectedCategory;
  const [activeTab, setActiveTab] = useState('Latest');
  
  // If "Deals", we might just filter items with discounts.
  let productsToDisplay = allProducts;
  if (selectedCategory === 'Deals') {
    productsToDisplay = allProducts.filter(p => p.originalPrice !== null);
  } else if (selectedCategory !== 'All Categories' && selectedCategory !== 'Shop' && selectedCategory !== 'Marketplace') {
    productsToDisplay = allProducts.filter(p => p.category === selectedCategory);
  }

  const isShopPage = selectedCategory === 'Shop' || selectedCategory === 'Marketplace';

  return (
    <div className="flex flex-col gap-8">
      <section className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            {onBack && (
              <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-text-primary border border-border px-4 py-2 rounded-xl hover:bg-secondary transition w-fit mb-6 shadow-sm">
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <h2 className="text-4xl font-black text-dark tracking-tight uppercase">{displayCategory}</h2>
            <div className="w-16 h-1 bg-accent mt-3 rounded-full"></div>
            <p className="text-text-secondary mt-2">Showing {productsToDisplay.length} products</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-semibold border border-border px-4 py-2 rounded-xl cursor-pointer hover:bg-secondary shadow-sm">
            <span>Sort by: Popular</span>
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Banner Grid for Shop/Marketplace */}
        {isShopPage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
            {/* Left Big Banner */}
            <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-10 relative overflow-hidden group cursor-pointer flex items-center min-h-[380px] shadow-2xl border border-white/5">
              {/* Background Image */}
              <img src={`${import.meta.env.BASE_URL}images/pc_builder_1779654793386.png`} alt="Gaming PC" className="absolute inset-0 w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-700 z-0" />
              
              {/* Subtle background gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-0"></div>
              
              <div className="relative z-10 w-[60%]">
                <p className="text-[#ed3237] font-black text-[11px] md:text-xs tracking-[0.15em] mb-3 uppercase">UP TO 30% OFF</p>
                <h3 className="text-white font-black text-4xl lg:text-[46px] tracking-tight leading-[1.1] mb-5">
                  Next Level<br/>Gaming<br/>PCs
                </h3>
                <p className="text-[#a0a0a0] font-bold text-xs lg:text-sm mb-6 tracking-wide">Power. Performance. Precision.</p>
                <button className="bg-white text-black font-black px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-all text-[13px] group-hover:gap-3 shadow-md">
                  Shop Now <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            
            {/* Right 2x2 Grid */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-[#0f0f0f] rounded-2xl p-6 relative overflow-hidden group cursor-pointer shadow-xl border border-white/5 flex items-center">
                <img src={`${import.meta.env.BASE_URL}images/headset_1779654846277.png`} alt="Headsets" className="absolute left-[-15%] top-1/2 -translate-y-1/2 h-[90%] object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" />
                <div className="relative z-10 w-1/2 ml-auto flex flex-col justify-center items-start text-left pl-2">
                  <h4 className="text-white font-bold text-lg mb-1">Headsets</h4>
                  <p className="text-white/50 text-[11px] mb-4 leading-tight">Immersive Sound, Zero Limits</p>
                  <button className="text-white text-xs font-bold flex items-center gap-1 group-hover:text-accent transition-colors group-hover:gap-2">
                    Shop Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              
              <div className="bg-[#0f0f0f] rounded-2xl p-6 relative overflow-hidden group cursor-pointer shadow-xl border border-white/5 flex items-center">
                <img src={`${import.meta.env.BASE_URL}images/keyboard_razer.png`} alt="Keyboards" className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-[120%] object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" />
                <div className="relative z-10 w-[55%] ml-auto flex flex-col justify-center items-start text-left pl-2">
                  <h4 className="text-white font-bold text-lg mb-1">Keyboards</h4>
                  <p className="text-white/50 text-[11px] mb-4 leading-tight">Every Keystroke Counts</p>
                  <button className="text-white text-xs font-bold flex items-center gap-1 group-hover:text-accent transition-colors group-hover:gap-2">
                    Shop Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              
              <div className="bg-[#0f0f0f] rounded-2xl p-6 relative overflow-hidden group cursor-pointer shadow-xl border border-white/5 flex items-center">
                <img src={`${import.meta.env.BASE_URL}images/mouse_logitech.png`} alt="Mice" className="absolute left-[-15%] top-1/2 -translate-y-1/2 h-[75%] object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" />
                <div className="relative z-10 w-1/2 ml-auto flex flex-col justify-center items-start text-left pl-2">
                  <h4 className="text-white font-bold text-lg mb-1">Mice</h4>
                  <p className="text-white/50 text-[11px] mb-4 leading-tight">Speed. Accuracy. Control.</p>
                  <button className="text-white text-xs font-bold flex items-center gap-1 group-hover:text-accent transition-colors group-hover:gap-2">
                    Shop Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              
              <div className="bg-[#0f0f0f] rounded-2xl p-6 relative overflow-hidden group cursor-pointer shadow-xl border border-white/5 flex items-center">
                <img src={`${import.meta.env.BASE_URL}images/cat_chair_1779732574707.png`} alt="Gaming Chairs" className="absolute left-[-5%] top-1/2 -translate-y-1/2 h-[95%] object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl" />
                <div className="relative z-10 w-[55%] ml-auto flex flex-col justify-center items-start text-left pl-2">
                  <h4 className="text-white font-bold text-lg mb-1">Gaming Chairs</h4>
                  <p className="text-white/50 text-[11px] mb-4 leading-tight">Comfort That Elevates</p>
                  <button className="text-white text-xs font-bold flex items-center gap-1 group-hover:text-accent transition-colors group-hover:gap-2">
                    Shop Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOP PRODUCTS SECTION */}
        {isShopPage && (
          <div className="flex justify-between items-center mb-6 border-b border-border pb-2 mt-4">
            <h3 className="font-black text-xl text-dark tracking-tight">TOP PRODUCTS</h3>
            <div className="flex gap-6 text-sm font-bold">
              <button 
                className={`transition-colors relative pb-2 ${activeTab === 'Latest' ? 'text-accent' : 'text-text-secondary hover:text-dark'}`}
                onClick={() => setActiveTab('Latest')}
              >
                Latest
                {activeTab === 'Latest' && <div className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-accent"></div>}
              </button>
              <button 
                className={`transition-colors relative pb-2 ${activeTab === 'Best Seller' ? 'text-accent' : 'text-text-secondary hover:text-dark'}`}
                onClick={() => setActiveTab('Best Seller')}
              >
                Best Seller
                {activeTab === 'Best Seller' && <div className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-accent"></div>}
              </button>
              <button 
                className={`transition-colors relative pb-2 ${activeTab === 'Featured' ? 'text-accent' : 'text-text-secondary hover:text-dark'}`}
                onClick={() => setActiveTab('Featured')}
              >
                Featured
                {activeTab === 'Featured' && <div className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-accent"></div>}
              </button>
            </div>
          </div>
        )}

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
