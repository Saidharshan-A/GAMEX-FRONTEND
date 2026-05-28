import React from 'react';
import { ProductCard } from '../ui/ProductCard';
import { motion } from 'framer-motion';
import rtxImg from '/images/rtx_4090_1779654832020.png';
import headsetImg from '/images/headset_1779654846277.png';

export const FeaturedProducts = ({ onRequireAuth, onSelectProduct, onAddToCart }) => {
  const products = [
    {
      name: "NVIDIA GeForce RTX 4090",
      category: "Graphics Cards",
      price: 127920,
      originalPrice: null,
      rating: 5.0,
      isNew: true,
      image: rtxImg
    },
    {
      name: "Logitech G Pro X Superlight",
      category: "Mice",
      price: 12799,
      originalPrice: 15999,
      rating: 4.8,
      isNew: false,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "PlayStation 5 Slim Console",
      category: "Consoles",
      price: 35920,
      originalPrice: 39920,
      rating: 4.9,
      isNew: false,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Razer Huntsman V3 Pro",
      category: "Keyboards",
      price: 19999,
      originalPrice: null,
      rating: 4.7,
      isNew: true,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Premium Gaming Headset",
      category: "Headsets",
      price: 15999,
      originalPrice: 19999,
      rating: 4.6,
      isNew: false,
      image: headsetImg
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black text-dark tracking-tight">FEATURED PRODUCTS</h2>
          <div className="w-16 h-1 bg-accent mt-3 rounded-full"></div>
        </div>
        <button className="text-text-secondary hover:text-accent font-semibold transition-colors">
          View All Collection &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProductCard {...product} onAddToCart={() => onAddToCart && onAddToCart(product, 1)} onSelectProduct={onSelectProduct} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
