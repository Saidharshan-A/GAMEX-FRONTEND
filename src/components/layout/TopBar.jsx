import React from 'react';

export const TopBar = () => {
  return (
    <div className="bg-dark text-white/80 text-xs py-2 px-6 flex justify-between items-center z-50 relative">
      <div className="font-medium tracking-wide">
        <span className="text-accent font-bold">PROMO:</span> Free shipping on all orders over ₹4999
      </div>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-white transition-colors">Support</a>
        <a href="#" className="hover:text-white transition-colors">Track Order</a>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors">
          <span>EN / INR</span>
        </div>
      </div>
    </div>
  );
};
