import React from 'react';
import { Users, Package, Star, Award } from 'lucide-react';

export const StatsStrip = () => {
  const stats = [
    { icon: <Users size={28} />, value: "500K+", label: "Happy Customers" },
    { icon: <Package size={28} />, value: "1M+", label: "Orders Delivered" },
    { icon: <Award size={28} />, value: "250+", label: "Top Brands" },
    { icon: <Star size={28} />, value: "99.8%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-[24px] p-8 flex flex-col items-center justify-center text-center shadow-sm border border-border hover:shadow-md transition-shadow">
          <div className="text-dark mb-4 bg-secondary p-4 rounded-full">
            {stat.icon}
          </div>
          <h3 className="text-3xl font-black text-dark mb-1">{stat.value}</h3>
          <p className="text-text-secondary font-medium text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
