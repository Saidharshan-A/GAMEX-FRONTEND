import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, RefreshCcw, Info, ChevronRight, ChevronLeft, CheckCircle2, ShieldAlert, ShoppingCart, Search, Zap, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { allProducts } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';

export const ProductDetailsPage = ({ product, onBack, onRequireAuth, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Specifications');

  // Find some related products from the same category
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.name !== product.name)
    .slice(0, 4);

  // Calculate discount percentage
  let discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 12;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 mb-24">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-text-secondary">
        <button onClick={onBack} className="hover:text-accent transition-colors">Home</button>
        <ChevronRight size={12} />
        <button onClick={onBack} className="hover:text-accent transition-colors">Consoles</button>
        <ChevronRight size={12} />
        <button onClick={onBack} className="hover:text-accent transition-colors">{product.category}</button>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">{product.name}</span>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Image Gallery (Span 5) */}
        <div className="lg:col-span-5 flex gap-4 bg-white p-4 rounded-xl border border-border">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 w-16 flex-shrink-0">
            {[1, 2, 3, 4].map((item, idx) => (
              <div 
                key={idx} 
                className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center p-1 cursor-pointer overflow-hidden
                  ${idx === 0 ? 'border-accent' : 'border-border hover:border-accent'}`}
              >
                <img src={product.image} alt="thumbnail" className="w-full h-full object-contain" />
              </div>
            ))}
            <button className="flex justify-center items-center h-6 text-gray-400 hover:text-dark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>
          {/* Main Image */}
          <div className="flex-1 relative flex items-center justify-center min-h-[400px]">
            {discountPercent > 0 && (
              <div className="absolute top-0 left-0 bg-red-50 text-accent font-bold text-[10px] px-2 py-1 rounded">
                -{discountPercent}%
              </div>
            )}
            <button className="absolute top-0 right-0 p-1.5 bg-white border border-border rounded-full hover:bg-gray-50 transition shadow-sm text-gray-600">
              <Search size={16} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={product.image} 
              alt={product.name} 
              className="w-full max-h-[400px] object-contain" 
            />
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>

        {/* Middle: Details (Span 4) */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded w-max mb-3">
            BEST SELLER
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight mb-2">
            {product.name}
          </h1>
          <div className="flex items-center text-xs text-text-secondary mb-3 space-x-2 divide-x divide-border">
            <span className="flex items-center gap-1">By <span className="text-blue-500 hover:underline cursor-pointer">{product.brand || 'Sony'}</span></span>
            <span className="pl-2">Platform: {product.platform || 'PlayStation 5'}</span>
          </div>

          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
              ))}
              <span className="font-bold text-text-primary ml-1 text-sm">{product.rating}</span>
            </div>
            <span className="text-border">|</span>
            <a href="#" className="text-blue-500 text-xs hover:underline">1,245 Reviews</a>
            <span className="text-border">|</span>
            <a href="#" className="text-blue-500 text-xs hover:underline">Add a review</a>
          </div>

          <div className="flex items-end space-x-3 mb-1">
            <span className="text-3xl font-black text-accent">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-text-secondary line-through mb-1.5">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span className="bg-red-50 text-accent font-bold text-[10px] px-2 py-1 rounded mb-1.5">{discountPercent}% OFF</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-text-secondary mb-6">Inclusive of all taxes</p>

          <div className="mb-6">
            <div className="flex items-center space-x-1.5 text-green-600 font-bold text-xs mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span>In Stock</span>
            </div>
            <div className="flex items-center text-text-secondary text-xs space-x-1">
              <span>Delivery by 24 May - 27 May</span>
              <Info size={12} className="text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-xs font-medium text-text-primary">Quantity:</span>
            <div className="flex items-center border border-border rounded-md overflow-hidden h-8">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 hover:bg-secondary text-text-secondary transition flex items-center justify-center"
              >-</button>
              <div className="w-8 text-xs font-medium border-x border-border flex items-center justify-center">{quantity}</div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 hover:bg-secondary text-text-secondary transition flex items-center justify-center"
              >+</button>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button variant="outline" onClick={() => onAddToCart(product, quantity)} className="flex-1 flex justify-center items-center gap-2 border-accent text-accent hover:bg-red-50 text-xs py-2 rounded-md font-bold">
              <ShoppingCart size={16} />
              ADD TO CART
            </Button>
            <Button variant="primary" className="flex-1 flex justify-center items-center gap-2 bg-accent hover:bg-red-600 text-white text-xs py-2 rounded-md font-bold">
              <Zap size={16} />
              BUY NOW
            </Button>
          </div>

          <div className="flex items-start justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-gray-600" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold">Free Delivery</span>
                <span className="text-[9px] text-text-secondary">On orders above ₹999</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-gray-600" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold">1 Year Warranty</span>
                <span className="text-[9px] text-text-secondary">Manufacturer Warranty</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCcw size={18} className="text-gray-600" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold">7 Days Replacement</span>
                <span className="text-[9px] text-text-secondary">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Seller Info (Span 3) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Seller Card */}
          <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
            <h3 className="font-bold text-xs mb-3">Seller Information</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center text-accent font-black text-lg">
                X
              </div>
              <div>
                <h4 className="font-bold text-xs">GameX Official Store</h4>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded text-[9px] font-bold mt-1 w-max">
                  <CheckCircle size={10} /> Verified Seller
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] mb-3">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-xs">4.9</span>
              <span className="text-text-secondary ml-1">| 10,324 Ratings</span>
            </div>

            <ul className="space-y-2.5 mb-4">
              <li className="flex items-center gap-2 text-[10px] text-text-secondary">
                <CheckCircle2 size={12} className="text-green-500" /> 98% Positive Seller Ratings
              </li>
              <li className="flex items-center gap-2 text-[10px] text-text-secondary">
                <ShieldCheck size={12} className="text-green-500" /> Ships on Time
              </li>
              <li className="flex items-center gap-2 text-[10px] text-text-secondary">
                <RefreshCcw size={12} className="text-green-500" /> 7 Days Easy Returns
              </li>
            </ul>

            <Button variant="outline" className="w-full text-[10px] font-bold py-1.5 rounded border-border text-text-primary hover:bg-gray-50">VIEW STORE</Button>
          </div>

          {/* Highlights Card */}
          <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
            <h3 className="font-bold text-xs mb-3">Highlights</h3>
            <div className="space-y-2 text-[10px]">
              <div className="grid grid-cols-3">
                <span className="text-text-secondary font-medium">Brand</span>
                <span className="col-span-2 text-text-primary">Sony</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-text-secondary font-medium">Model</span>
                <span className="col-span-2 text-text-primary">PlayStation 5 Slim Disc Edition</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-text-secondary font-medium">Storage</span>
                <span className="col-span-2 text-text-primary">1TB SSD</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-text-secondary font-medium">Resolution</span>
                <span className="col-span-2 text-text-primary">Up to 4K</span>
              </div>
            </div>
            <a href="#" className="inline-block mt-3 text-blue-500 font-medium text-[10px] hover:underline">View Full Specifications</a>
          </div>
        </div>

      </div>

      {/* Bottom Section: Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
        
        {/* Left: Specs (Span 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="flex border-b border-border px-2">
            {['Specifications', 'Reviews (1,245)', 'Q&A'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-3 text-[10px] font-bold text-center border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-accent text-dark' : 'border-transparent text-text-secondary hover:text-dark'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4 flex-1 text-xs">
            {activeTab === 'Specifications' && (
              <div className="flex justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Brand</span><span className="font-medium text-[10px]">Sony</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Model</span><span className="font-medium text-[10px]">{product.name}</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Platform</span><span className="font-medium text-[10px]">{product.category}</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Storage</span><span className="font-medium text-[10px]">1TB SSD</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Resolution</span><span className="font-medium text-[10px]">Up to 4K</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">HDR</span><span className="font-medium text-[10px]">HDR10, HLG</span></div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Disc Drive</span><span className="font-medium text-[10px]">Ultra HD Blu-ray Disc Drive</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Connectivity</span><span className="font-medium text-[10px]">Wi-Fi 6, Bluetooth 5.1, USB Type-C, HDMI 2.1</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Dimensions</span><span className="font-medium text-[10px]">358 x 216 x 80 mm</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Weight</span><span className="font-medium text-[10px]">3.2 kg</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Included In Box</span><span className="font-medium text-[10px]">PS5 Slim Console, DualSense Wireless Controller, HDMI Cable, Power Cord, USB Cable, Manuals</span></div>
                  <div className="flex flex-col gap-0.5"><span className="text-text-secondary text-[9px] uppercase font-bold">Warranty</span><span className="font-medium text-[10px]">1 Year Manufacturer Warranty</span></div>
                </div>
              </div>
            )}
            {activeTab !== 'Specifications' && (
              <div className="h-full flex items-center justify-center text-text-secondary text-[10px]">
                Content for {activeTab} will go here.
              </div>
            )}
          </div>
        </div>

        {/* Middle: Customer Reviews (Span 4) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xs">Customer Reviews</h3>
            <a href="#" className="text-blue-500 text-[10px] font-bold flex items-center hover:underline">View All <ChevronRight size={12}/></a>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-black">{product.rating}</div>
              <div className="flex justify-center my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <div className="text-[9px] text-text-secondary">1,245 Reviews</div>
            </div>
            <div className="flex-1 space-y-1">
              {[
                { stars: 5, pct: '80%', count: '1,032' },
                { stars: 4, pct: '12%', count: '156' },
                { stars: 3, pct: '5%', count: '38' },
                { stars: 2, pct: '2%', count: '11' },
                { stars: 1, pct: '1%', count: '8' }
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-1.5 text-[9px] text-text-secondary">
                  <span className="w-3 text-right">{row.stars} <Star size={8} className="inline fill-gray-400 text-gray-400 mb-0.5"/></span>
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: row.pct }}></div>
                  </div>
                  <span className="w-6 text-left">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[10px]">Arjun Mehta</span>
                  <span className="text-[9px] text-green-600 flex items-center gap-0.5"><CheckCircle2 size={10}/> Verified Buyer</span>
                </div>
                <div className="flex items-center gap-2 my-1">
                  <div className="flex">
                    <Star size={8} className="fill-yellow-400 text-yellow-400" /><Star size={8} className="fill-yellow-400 text-yellow-400" /><Star size={8} className="fill-yellow-400 text-yellow-400" /><Star size={8} className="fill-yellow-400 text-yellow-400" /><Star size={8} className="fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-[9px] text-text-secondary">2 days ago</span>
                </div>
                <p className="text-[10px] text-text-secondary leading-snug">
                  Amazing performance and super fast loading. The new slim design is sleek and fits perfectly in my setup. Totally worth it!
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-3 text-text-secondary border-t border-border pt-3">
              <button><ChevronLeft size={14}/></button>
              <div className="flex gap-1 items-center">
                 <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                 <div className="w-1 h-1 rounded-full bg-border"></div>
              </div>
              <button><ChevronRight size={14}/></button>
            </div>
          </div>
        </div>

        {/* Right: Related Products (Span 4) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xs">Related Products</h3>
            <a href="#" className="text-accent text-[10px] font-bold flex items-center hover:underline">View All <ChevronRight size={12}/></a>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.slice(0, 4).map((relProd, idx) => (
              <div key={idx} className="border border-border rounded-lg p-2 hover:shadow-sm cursor-pointer transition">
                <div className="h-20 mb-2 flex items-center justify-center rounded overflow-hidden">
                  <img src={relProd.image} alt={relProd.name} className="object-contain h-full w-full" />
                </div>
                <h4 className="font-bold text-[9px] line-clamp-2 mb-1 h-6">{relProd.name}</h4>
                <div className="flex items-center gap-1 text-[9px] text-text-secondary mb-1">
                  <Star size={8} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-text-primary">{relProd.rating}</span>
                  <span>(120)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[10px] text-text-primary">₹{relProd.price.toLocaleString('en-IN')}</span>
                  {relProd.originalPrice && <span className="text-[8px] text-text-secondary line-through">₹{relProd.originalPrice.toLocaleString('en-IN')}</span>}
                  <span className="text-[8px] text-accent bg-red-50 px-1 rounded">-12%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-md hover:text-accent">
            <ChevronRight size={12}/>
          </button>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-3 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transform transition-transform duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center p-1">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs">{product.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && <span className="text-text-secondary text-[10px] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>}
                <span className="text-accent text-[9px] bg-red-50 px-1 rounded font-bold">{discountPercent}% OFF</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-text-primary">Quantity:</span>
              <div className="flex items-center border border-border rounded-md overflow-hidden h-7">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-6 hover:bg-secondary text-text-secondary transition flex items-center justify-center text-xs">-</button>
                <div className="w-6 text-[10px] font-medium border-x border-border flex items-center justify-center">{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)} className="w-6 hover:bg-secondary text-text-secondary transition flex items-center justify-center text-xs">+</button>
              </div>
            </div>
            <Button variant="outline" onClick={() => onAddToCart(product, quantity)} className="flex justify-center items-center gap-1.5 border-accent text-accent hover:bg-red-50 text-[10px] py-1.5 px-3 rounded font-bold">
              <ShoppingCart size={12} />
              ADD TO CART
            </Button>
            <Button variant="primary" className="flex justify-center items-center gap-1.5 bg-accent hover:bg-red-600 text-white text-[10px] py-1.5 px-3 rounded font-bold">
              <Zap size={12} />
              BUY NOW
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};
