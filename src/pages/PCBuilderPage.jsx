import React, { useState } from 'react';
import { 
  Cpu, Wind, CircuitBoard, MemoryStick, Monitor, HardDrive, Zap, Box, 
  CheckCircle, AlertTriangle, Save, Share2, Trash2, Plus, Info, 
  ShieldCheck, RefreshCcw, Truck, Headphones, ChevronDown, ChevronRight, Wrench, ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { defaultBuild, pcComponents } from '../data/pcComponents';

const ComponentRow = ({ category, icon: Icon, component, onChange }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-border shadow-sm hover:border-gray-300 transition-colors">
    <div className="w-12 flex flex-col items-center justify-center text-gray-500 gap-1 shrink-0">
      <Icon size={24} />
      <span className="text-[10px] font-bold tracking-wider uppercase text-center">{category}</span>
    </div>
    
    {component ? (
      <>
        <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center p-2 shrink-0">
          <img src={component.image} alt={component.name} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex flex-col flex-1 min-w-0 justify-center">
          <h4 className="font-bold text-sm text-dark truncate leading-tight">{component.name}</h4>
          <span className="text-[10px] text-text-secondary truncate">{component.specs}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-1 text-xs font-bold text-dark border border-border px-3 py-1.5 rounded hover:bg-secondary transition">
            Change <ChevronDown size={12} />
          </button>
          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle size={12} />
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="flex flex-col flex-1 justify-center pl-2">
          <h4 className="font-bold text-sm text-gray-400">Select {category}</h4>
        </div>
        <button className="flex items-center gap-1 text-xs font-bold text-accent border border-accent/30 px-3 py-1.5 rounded hover:bg-red-50 transition">
          <Plus size={12} /> Add
        </button>
      </>
    )}
  </div>
);

export const PCBuilderPage = ({ onBack }) => {
  const [build, setBuild] = useState(defaultBuild);
  const [perfTab, setPerfTab] = useState('1440p');

  // Calculate totals
  const totalWattage = Object.values(build).reduce((acc, comp) => acc + (comp ? comp.wattage : 0), 0);
  const totalPrice = Object.values(build).reduce((acc, comp) => acc + (comp ? comp.price : 0), 0);
  const recommendedPsu = Math.ceil((totalWattage + 100) / 50) * 50; // Add 100W overhead and round up to nearest 50

  const handleClear = () => {
    setBuild({
      cpu: null, cooler: null, motherboard: null, ram: null, 
      gpu: null, storage: null, psu: null, case: null
    });
  };

  const getFPS = (base) => {
    // Mock multiplier based on resolution tab
    const mult = perfTab === '1080p' ? 1.5 : perfTab === '1440p' ? 1.0 : 0.6;
    return Math.round(base * mult);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12 max-w-[1600px] mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
        <div>
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-text-primary border border-border px-4 py-2 rounded hover:bg-secondary transition w-fit mb-6">
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-black text-dark tracking-tight">Build My Custom PC</h1>
            <Info size={16} className="text-red-500" />
          </div>
          <p className="text-sm text-text-secondary">Select components, customize your dream PC and we'll build it for you.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-dark font-bold text-xs py-2">
            <Save size={16} /> Save Build
          </Button>
          <Button variant="outline" className="flex items-center gap-2 text-dark font-bold text-xs py-2">
            <Share2 size={16} /> Share Build
          </Button>
          <Button onClick={handleClear} variant="outline" className="flex items-center gap-2 text-accent border-accent/30 hover:bg-red-50 font-bold text-xs py-2">
            <Trash2 size={16} /> Clear Build
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Select Components - Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h3 className="font-bold text-sm tracking-wide mb-2 uppercase">1. SELECT COMPONENTS</h3>
          
          <ComponentRow category="CPU" icon={Cpu} component={build.cpu} />
          <ComponentRow category="CPU Cooler" icon={Wind} component={build.cooler} />
          <ComponentRow category="Motherboard" icon={CircuitBoard} component={build.motherboard} />
          <ComponentRow category="RAM" icon={MemoryStick} component={build.ram} />
          <ComponentRow category="Graphics Card" icon={Monitor} component={build.gpu} />
          <ComponentRow category="Storage" icon={HardDrive} component={build.storage} />
          <ComponentRow category="Power Supply" icon={Zap} component={build.psu} />
          <ComponentRow category="Case" icon={Box} component={build.case} />

          <button className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-red-200 text-accent font-bold hover:bg-red-50 transition mt-2">
            <Plus size={18} /> Add Custom Component
          </button>
        </div>

        {/* Middle Column (Preview & Status - Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm tracking-wide uppercase">2. YOUR BUILD PREVIEW</h3>
          </div>

          {/* PC Image Container */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-8 flex flex-col items-center justify-center min-h-[450px]">
             {/* Note: In a real app we'd map parts to visuals. Mocking the beautiful PC case here */}
            <img src={`${import.meta.env.BASE_URL}images/PC building page.png`} alt="PC Build" className="w-full h-full object-contain mix-blend-multiply opacity-0" style={{display: 'none'}} />
            <div className="relative w-full aspect-square max-w-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20 rounded-xl"></div>
              <img src={`${import.meta.env.BASE_URL}images/pc_builder_1779654793386.png`} alt="PC Preview" className="w-full h-full object-cover rounded-xl shadow-2xl" />
            </div>
            <p className="text-[10px] text-text-secondary mt-6">* Preview is for illustration only. Final product may vary.</p>
          </div>

          <h3 className="font-bold text-sm tracking-wide uppercase mt-2">3. BUILD STATUS</h3>
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
              <CheckCircle size={18} /> All components are fully compatible.
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col border-r border-border pr-4">
                <span className="text-[10px] text-text-secondary mb-1">Compatibility</span>
                <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                  <CheckCircle size={14} /> Perfect
                </div>
              </div>
              <div className="flex flex-col border-r border-border pr-4">
                <span className="text-[10px] text-text-secondary mb-1">Estimated Wattage</span>
                <span className="font-bold text-dark text-sm">{totalWattage}W</span>
                <span className="text-[9px] text-text-secondary mt-0.5">Recommended: {recommendedPsu}W</span>
              </div>
              <div className="flex flex-col border-r border-border pr-4">
                <span className="text-[10px] text-text-secondary mb-1">Build Difficulty</span>
                <span className="font-bold text-dark text-sm mb-1">Advanced</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary mb-1">Est. Assembly Time</span>
                <span className="font-bold text-dark text-sm">2-3 Days</span>
                <span className="text-[9px] text-text-secondary mt-0.5">(After order confirmation)</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-dark">AI Build Suggestions</span>
                <span className="bg-red-100 text-accent text-[9px] font-bold px-1.5 py-0.5 rounded">BETA</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
                <button className="text-xs font-bold border border-border px-4 py-2 rounded-lg hover:bg-secondary whitespace-nowrap transition">Best for Gaming</button>
                <button className="text-xs font-bold border border-border px-4 py-2 rounded-lg hover:bg-secondary whitespace-nowrap transition">Streaming Beast</button>
                <button className="text-xs font-bold border border-border px-4 py-2 rounded-lg hover:bg-secondary whitespace-nowrap transition">4K Ultra Build</button>
                <button className="text-xs font-bold border border-border px-4 py-2 rounded-lg hover:bg-secondary whitespace-nowrap transition">Budget Build</button>
                <ChevronRight size={16} className="text-gray-400 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Summary & Performance - Span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <h3 className="font-bold text-sm tracking-wide uppercase">4. BUILD SUMMARY</h3>
          
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary font-medium">Total Price (8 Items)</span>
              <span className="font-bold text-dark">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary font-medium">Estimated Wattage</span>
              <span className="font-bold text-dark">{totalWattage}W</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary font-medium">Recommended PSU</span>
              <span className="font-bold text-dark">{recommendedPsu}W+</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary font-medium">Compatibility</span>
              <div className="flex items-center gap-1 text-green-600 font-bold">
                <CheckCircle size={14} /> Perfect
              </div>
            </div>

            <Button variant="primary" className="w-full bg-accent hover:bg-red-600 text-white font-bold py-3 mt-4 flex flex-col items-center justify-center gap-1 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-2">
                <Wrench size={16} /> Build My PC
              </div>
              <span className="text-[10px] font-normal">We'll assemble it and ship it to you.</span>
            </Button>
          </div>

          <h3 className="font-bold text-sm tracking-wide uppercase mt-2 flex items-center gap-2">
            5. PERFORMANCE ESTIMATE <Info size={14} className="text-gray-400" />
          </h3>
          <div className="bg-white rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
            <div className="flex border-b border-border">
              {['1080p', '1440p', '4K'].map(res => (
                <button 
                  key={res}
                  onClick={() => setPerfTab(res)}
                  className={`flex-1 py-3 text-xs font-bold border-b-2 transition-colors ${perfTab === res ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:bg-secondary'}`}
                >
                  {res}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col p-4 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 rounded bg-gray-900 overflow-hidden shrink-0">
                    <img src={`${import.meta.env.BASE_URL}images/pc_builder_1779654793386.png`} alt="Valorant" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-dark">Valorant</span>
                    <span className="text-[10px] text-text-secondary">Esports Settings</span>
                  </div>
                </div>
                <span className="font-bold text-green-600 text-sm">{getFPS(240)}+ FPS</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 rounded bg-gray-900 overflow-hidden shrink-0">
                    <img src={`${import.meta.env.BASE_URL}images/pc_builder_1779654793386.png`} alt="Cyberpunk" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-dark">Cyberpunk 2077</span>
                    <span className="text-[10px] text-text-secondary">Ultra Settings, RT Off</span>
                  </div>
                </div>
                <span className="font-bold text-green-600 text-sm">{getFPS(160)}+ FPS</span>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-sm tracking-wide uppercase mt-2">6. SAVE & SHARE YOUR BUILD</h3>
          <div className="bg-secondary rounded-2xl border border-border p-4 flex flex-col gap-4">
            <span className="text-xs text-text-secondary">Save your build, share with friends or build again later.</span>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="bg-white hover:bg-gray-50 flex items-center justify-center gap-2 text-xs py-2 font-bold">
                <Save size={14} /> Save Build
              </Button>
              <Button variant="outline" className="bg-white hover:bg-gray-50 flex items-center justify-center gap-2 text-xs py-2 font-bold">
                <Share2 size={14} /> Share Build
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border">
        <div className="flex items-center gap-3">
          <Wrench size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">Expertly Assembled</span>
            <span className="text-[10px] text-text-secondary">Built by GameX Professionals</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:border-l border-border md:pl-6">
          <ShieldCheck size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">1 Year Warranty</span>
            <span className="text-[10px] text-text-secondary">On all assembled PC builds</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:border-l border-border md:pl-6">
          <Truck size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">Safe & Secure Delivery</span>
            <span className="text-[10px] text-text-secondary">Pan India insured shipping</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:border-l border-border md:pl-6">
          <Headphones size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">Lifetime Support</span>
            <span className="text-[10px] text-text-secondary">For your custom PC</span>
          </div>
        </div>
      </div>

    </div>
  );
};
