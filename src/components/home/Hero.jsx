import React from 'react';
import { motion } from 'framer-motion';

export const Hero = ({ onSelectCategory }) => {
  const products = [
    {
      name: "PRO KEYBOARD",
      sub: "RZR 328",
      bg: "bg-[#f47f2e]", // Orange
      img: `${import.meta.env.BASE_URL}images/keyboard_razer.png`,
    },
    {
      name: "NVIDIA GPU",
      sub: "RTX 4090",
      bg: "bg-[#9a9a9a]", // Darker Gray
      img: `${import.meta.env.BASE_URL}images/rtx_4090_1779654832020.png`,
    },
    {
      name: "GAMING HEADSET",
      sub: "PRO P789",
      bg: "bg-[#bcbcbc]", // Lighter Gray
      img: `${import.meta.env.BASE_URL}images/headset_1779654846277.png`,
    },
    {
      name: "CONSOLE PS5",
      sub: "SONY 230",
      bg: "bg-[#f04b4b]", // Red
      img: `${import.meta.env.BASE_URL}images/console_ps5.png`,
    }
  ];

  return (
    <div className="relative h-[600px] bg-[#e6e7eb] rounded-[32px] overflow-hidden mb-8 shadow-2xl flex flex-col cursor-default border border-gray-300">

      {/* Giant Background Vertical Text */}
      <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
        <span
          className="text-[120px] font-black text-transparent whitespace-nowrap"
          style={{ WebkitTextStroke: '2px #000', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          BEST SELLER
        </span>
      </div>
      <div className="absolute right-4 top-0 bottom-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden">
        <span
          className="text-[120px] font-black text-transparent whitespace-nowrap"
          style={{ WebkitTextStroke: '2px #000', writingMode: 'vertical-rl' }}
        >
          BEST SELLER
        </span>
      </div>

      {/* Top Header */}
      <div className="flex justify-between items-center w-full px-10 pt-8 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-[3px] border-[#ed3237] text-[#ed3237] flex items-center justify-center font-black text-xl">
            G
          </div>
          <span className="font-black text-gray-800 tracking-widest text-lg">GAMEX GROUP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[#ed3237] font-black text-3xl">G</div>
          <div className="flex flex-col">
            <span className="font-black text-gray-800 leading-none text-xl">GAMEX</span>
            <span className="text-[9px] font-bold text-gray-500 tracking-widest mt-0.5">CREATE YOUR FUTURE</span>
          </div>
        </div>
      </div>

      {/* Title Area */}
      <div className="relative mt-8 mb-6 px-16 z-10 flex flex-col items-center">
        <div className="flex items-end gap-4 ml-[-4rem]">
          <span className="text-6xl md:text-[80px] font-black text-gray-800 tracking-tighter leading-none" style={{ textShadow: '2px 2px 0px #fff' }}>
            BEST SELLER
          </span>
          <div className="flex flex-col justify-end pb-1">
            <span className="text-[#ed3237] text-3xl font-black leading-none mb-1">ON MAY</span>
            <span
              className="text-transparent text-[55px] font-black leading-none"
              style={{ WebkitTextStroke: '1.5px #ed3237' }}
            >
              2023
            </span>
          </div>
        </div>
      </div>

      {/* Columns Container */}
      <div className="flex-1 flex justify-center gap-2 px-24 pb-20 z-10">
        {products.map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 + 0.3 }}
            className={`relative flex-1 ${product.bg} shadow-lg overflow-hidden group hover:flex-[1.5] transition-all duration-500 cursor-pointer`}
            onClick={() => onSelectCategory('Deals')}
          >
            {/* Arrows decoration */}
            {idx === 0 && (
              <div className="absolute top-2 left-2 text-[#ed3237] font-black text-xl">
                &raquo;
              </div>
            )}

            {/* Vertical Text */}
            <div className="absolute left-3 top-0 bottom-0 flex items-center justify-center py-8 z-10 pointer-events-none">
              <div className="flex flex-col items-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                <span className="text-white font-black text-xl tracking-widest uppercase whitespace-nowrap drop-shadow-md">
                  {product.name}
                </span>
                <span className="text-white/90 font-bold text-sm tracking-widest mt-2 whitespace-nowrap drop-shadow-md">
                  {product.sub}
                </span>
              </div>
            </div>

            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <img
                src={product.img}
                alt={product.name}
                className="object-cover w-full h-full opacity-90 drop-shadow-2xl group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
              />
            </div>

            {idx === products.length - 1 && (
              <div className="absolute bottom-2 right-2 text-[#ed3237] font-black text-xl">
                &raquo;
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom Hashtags */}
      <div className="absolute bottom-6 left-24 flex items-center gap-2 z-10">
        <span className="text-5xl font-black text-gray-800">#</span>
        <div className="flex flex-col gap-0.5">
          <span className="text-gray-800 font-black tracking-wider leading-none text-xl">INGATGEAR</span>
          <span className="bg-[#ed3237] text-white font-black px-2 py-0.5 tracking-wider italic leading-none text-xl">
            INGATGAMEX
          </span>
        </div>
      </div>

      {/* Bottom Red Line decoration */}
      <div className="absolute bottom-4 right-10 flex flex-col gap-1 items-center">
        <div className="w-1 h-6 bg-[#ed3237]"></div>
        <div className="w-1 h-6 bg-[#ed3237]"></div>
      </div>
    </div>
  );
};
