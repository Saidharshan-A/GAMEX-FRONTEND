import React from 'react';
import { Hero } from '../components/home/Hero';
import { RightWidgets } from '../components/home/RightWidgets';
import { FeaturesStrip } from '../components/home/FeaturesStrip';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { StatsStrip } from '../components/home/StatsStrip';
import { HotDeals } from '../components/home/HotDeals';

export const Home = ({ onRequireAuth, onSelectProduct, onAddToCart, onSelectCategory }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <Hero onSelectCategory={onSelectCategory} />
          <HotDeals onRequireAuth={onRequireAuth} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
        </div>
        <RightWidgets onSelectCategory={onSelectCategory} />
      </div>
      
      <FeaturesStrip />
      <FeaturedProducts onRequireAuth={onRequireAuth} onSelectProduct={onSelectProduct} onAddToCart={onAddToCart} />
      <StatsStrip />
    </div>
  );
};
