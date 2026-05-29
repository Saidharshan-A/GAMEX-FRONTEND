import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';

export const RightWidgets = ({ onSelectCategory }) => {
  return (
    <div className="w-[320px] xl:w-[380px] flex-shrink-0 hidden md:flex flex-col gap-6">
      
      {/* Trending Now */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-lg">Trending Now</h3>
          <button className="text-accent text-sm font-semibold hover:text-red-700">View All</button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'NVIDIA RTX 4090', sub: 'Founders Edition', price: '₹1,27,920', img: `${import.meta.env.BASE_URL}images/rtx_4090_1779654832020.png` },
            { name: 'PlayStation 5 Slim', sub: 'Digital Edition', price: '₹35,920', img: `${import.meta.env.BASE_URL}images/console_ps5.png` },
            { name: 'Logitech G Pro X', sub: 'Superlight 2', price: '₹12,720', img: `${import.meta.env.BASE_URL}images/mouse_logitech.png` },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 group cursor-pointer">
              <div className="w-16 h-16 bg-secondary rounded-xl p-2 flex items-center justify-center overflow-hidden">
                <img src={item.img} alt={item.name} className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm text-text-primary group-hover:text-accent transition-colors">{item.name}</h4>
                <p className="text-xs text-text-secondary">{item.sub}</p>
                <p className="font-bold text-sm mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Build Your PC */}
      <div 
        onClick={() => onSelectCategory && onSelectCategory('PC Builder')}
        className="relative bg-dark rounded-[24px] overflow-hidden group cursor-pointer h-48 shadow-lg"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pc_builder_1779654793386.png)` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-6 z-10">
          <h3 className="text-white font-bold text-xl mb-1">Build Your PC</h3>
          <p className="text-white/70 text-xs mb-4">Custom PC builder with expert compatibility</p>
          <div className="flex items-center text-accent text-sm font-bold group-hover:translate-x-2 transition-transform">
            Start Building <ChevronRight size={16} className="ml-1" />
          </div>
        </div>
      </div>

      {/* Deal of the Day */}
      <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-border group cursor-pointer relative">
        <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          -25%
        </div>
        <div className="h-40 bg-secondary relative overflow-hidden flex items-center justify-center p-4">
          <img src={`${import.meta.env.BASE_URL}images/monitor_deal_1779654815151.png`} alt="Monitor" className="object-contain h-full group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-5">
          <div className="flex items-center space-x-2 text-accent text-xs font-bold mb-2">
            <Clock size={14} />
            <span>ENDS IN 04:23:59</span>
          </div>
          <h3 className="font-bold text-text-primary leading-tight mb-2">Alienware 34" Curved QD-OLED Gaming Monitor</h3>
          <div className="flex items-end gap-2">
            <span className="font-black text-2xl text-text-primary">₹71,920</span>
            <span className="text-sm text-text-secondary line-through mb-1">₹95,920</span>
          </div>
        </div>
      </div>

    </div>
  );
};
