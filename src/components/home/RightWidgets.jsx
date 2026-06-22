import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';

export const RightWidgets = ({ onSelectCategory }) => {
  return (
    <div className="w-[320px] xl:w-[380px] flex-shrink-0 hidden md:flex flex-col gap-6">
      
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
