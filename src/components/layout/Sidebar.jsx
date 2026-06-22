import React from 'react';
import { Monitor, Cpu, HardDrive, Mouse, Headphones, ShieldCheck, Flame } from 'lucide-react';

export const Sidebar = ({ selectedCategory = 'All Categories', onSelectCategory }) => {
  const categories = [
    { name: 'All Categories', icon: <Flame size={18} /> },
    { name: 'PC Gaming', icon: <Monitor size={18} /> },
    { name: 'Graphics Cards', icon: <Cpu size={18} /> },
    { name: 'Processors', icon: <Cpu size={18} /> },
    { name: 'Motherboards', icon: <HardDrive size={18} /> },
    { name: 'Memory', icon: <HardDrive size={18} /> },
    { name: 'Storage', icon: <HardDrive size={18} /> },
    { name: 'Cooling', icon: <ShieldCheck size={18} /> },
    { name: 'Power Supplies', icon: <ShieldCheck size={18} /> },
    { name: 'Cases', icon: <Monitor size={18} /> },
    { name: 'Monitors', icon: <Monitor size={18} /> },
    { name: 'Keyboards', icon: <Mouse size={18} /> },
    { name: 'Mice', icon: <Mouse size={18} /> },
    { name: 'Headsets', icon: <Headphones size={18} /> },
    { name: 'Chairs & Desks', icon: <ShieldCheck size={18} /> },
    { name: 'Accessories', icon: <Mouse size={18} /> },
    { name: 'Deals', icon: <Flame size={18} />, textHighlight: true },
  ];

  return (
    <div className="w-64 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl shadow-sm border border-border p-4 sticky top-36">
        <ul className="space-y-1">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name || (cat.name === 'All Categories' && selectedCategory === 'Shop');
            return (
              <li key={idx}>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory(cat.name === 'All Categories' ? 'Shop' : cat.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isSelected ? 'bg-dark text-white shadow-md' : 'hover:bg-secondary text-text-primary'}`}
                >
                  <span className={`${isSelected ? 'text-accent' : 'text-text-secondary group-hover:text-accent'} transition-colors`}>
                    {cat.icon}
                  </span>
                  <span className={`font-semibold text-sm ${cat.textHighlight && !isSelected ? 'text-accent' : ''}`}>
                    {cat.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
