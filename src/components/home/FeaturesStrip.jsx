import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Headset, Tag } from 'lucide-react';

export const FeaturesStrip = () => {
  const features = [
    { icon: <Truck size={24} />, title: "Free Shipping", desc: "On orders over $99" },
    { icon: <ShieldCheck size={24} />, title: "Secure Payment", desc: "100% secure checkout" },
    { icon: <RefreshCcw size={24} />, title: "Easy Returns", desc: "30-day return policy" },
    { icon: <Headset size={24} />, title: "24/7 Support", desc: "Dedicated gaming experts" },
    { icon: <Tag size={24} />, title: "Price Match", desc: "Best price guaranteed" },
  ];

  return (
    <div className="bg-dark rounded-[24px] py-8 px-6 md:px-12 flex flex-wrap justify-between gap-6 mb-12 shadow-lg border border-white/5">
      {features.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="text-accent bg-white/5 p-3 rounded-xl">
            {item.icon}
          </div>
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide">{item.title}</h4>
            <p className="text-text-secondary text-xs mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
