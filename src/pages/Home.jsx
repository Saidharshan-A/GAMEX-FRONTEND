import React from 'react';
import { Hero } from '../components/home/Hero';
import { RightWidgets } from '../components/home/RightWidgets';
import { FeaturesStrip } from '../components/home/FeaturesStrip';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { StatsStrip } from '../components/home/StatsStrip';

export const Home = ({ onRequireAuth, onSelectProduct, onAddToCart }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <Hero />
        </div>
        <RightWidgets />
      </div>
      
      <FeaturesStrip />
      <FeaturedProducts onRequireAuth={onRequireAuth} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
      <StatsStrip />
    </div>
  );
};
