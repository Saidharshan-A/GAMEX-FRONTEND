import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children, selectedCategory, onSelectCategory, hideSidebar, onCartClick, cartItemCount, onAccountClick }) => {
  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      <TopBar />
      <Navbar onCartClick={onCartClick} cartItemCount={cartItemCount} onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} onAccountClick={onAccountClick} />

      <main className="flex-1 max-w-[1600px] mx-auto w-full px-6 py-8 flex gap-8">
        {!hideSidebar && (
          <Sidebar selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
        )}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </main>

      <footer className="bg-[#050505] pt-8 mt-auto overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-6 mb-4 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative z-10">
          {/* MENU */}
          <div>
            <div className="flex items-center mb-6">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mr-4">Menu</h4>
              <div className="flex-1 h-[1px] bg-white/20"></div>
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">Home</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">PC Gaming</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">Consoles</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">Accessories</a></li>
            </ul>
          </div>
          
          {/* SOCIALS */}
          <div>
            <div className="flex items-center mb-6">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mr-4">Socials</h4>
              <div className="flex-1 h-[1px] bg-white/20"></div>
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">X (Twitter)</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">Instagram</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">LinkedIn</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">Discord</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <div className="flex items-center mb-6">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mr-4">Resources</h4>
              <div className="flex-1 h-[1px] bg-white/20"></div>
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">GameX App</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">Newsletter</a></li>
              <li><a href="#" className="text-white/60 font-medium hover:text-white transition text-sm">Support</a></li>
            </ul>
            <button className="mt-6 px-6 py-2 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:bg-white hover:text-black transition-colors">
              Send a message
            </button>
          </div>
        </div>

        {/* Huge Logo Text with Gradient Fade & Dock Effect */}
        <div className="w-full px-6 flex justify-center items-end pb-2 relative z-0 mt-2">
          <h1 className="font-black tracking-tighter select-none w-full text-center flex justify-between dock-container" style={{ fontSize: 'min(8vw, 120px)', lineHeight: '0.85' }}>
            {['G', 'A', 'M', 'E', 'X'].map((letter, i) => (
              <span 
                key={i} 
                className="dock-item"
                style={{ 
                  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </footer>
    </div>
  );
};
