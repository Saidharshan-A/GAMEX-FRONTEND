import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Trash2, Ticket, Lock, Truck, RefreshCcw, ShieldCheck, Headphones } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { allProducts } from '../data/products';

export const CartPage = ({ onBack, onSelectProduct, cartItems = [], updateQuantity, removeItem, onAddToCart, onCheckout }) => {
  const recommendedItems = allProducts.slice(0, 4);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal > 1500 ? 150.00 : 0; // Simple discount logic
  const tax = Math.max(0, (subtotal - discount)) * 0.18; 
  const total = subtotal - discount + tax;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <button onClick={onBack} className="hover:text-accent transition-colors">Home</button>
          <ChevronRight size={12} />
          <span className="text-text-primary font-medium">Cart</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-dark">Your Cart <span className="text-accent">({cartItems.length})</span></h1>
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-text-primary border border-border px-4 py-2 rounded hover:bg-secondary transition">
            <ArrowLeft size={16} /> Continue Shopping
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Header Row */}
          <div className="grid grid-cols-12 text-[10px] font-bold text-text-secondary uppercase tracking-wider px-6">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right pr-8">Total</div>
          </div>

          {/* Item List */}
          <div className="flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {cartItems.map((item, index) => (
              <div key={item.id || item.name} className={`grid grid-cols-12 items-center p-6 gap-4 ${index !== cartItems.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-5 h-5 bg-dark rounded flex items-center justify-center shrink-0 cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="w-24 h-24 bg-white shrink-0 flex items-center justify-center p-2 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-sm text-text-primary leading-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-text-secondary mb-2">{item.subtitle}</p>
                    <div className="flex items-center space-x-1.5 text-green-600 font-bold text-[10px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span>In Stock</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 text-center font-bold text-sm">
                  ${item.price.toFixed(2)}
                </div>
                
                <div className="col-span-2 flex justify-center">
                  <div className="flex items-center border border-border rounded-md overflow-hidden h-8">
                    <button onClick={() => updateQuantity(item.name, -1)} className="w-8 hover:bg-secondary text-text-secondary transition flex items-center justify-center text-xs">-</button>
                    <div className="w-8 text-xs font-bold border-x border-border flex items-center justify-center">{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.name, 1)} className="w-8 hover:bg-secondary text-text-secondary transition flex items-center justify-center text-xs">+</button>
                  </div>
                </div>

                <div className="col-span-2 flex justify-between items-center pl-2">
                  <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeItem(item.name)} className="text-text-secondary hover:text-accent transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {cartItems.length === 0 && (
              <div className="p-12 text-center text-text-secondary">
                Your cart is empty.
              </div>
            )}
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-accent rounded-xl flex items-center justify-center shrink-0">
              <Ticket size={24} className="transform -rotate-45" />
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="font-bold text-sm">Have a promo code?</h4>
              <p className="text-xs text-text-secondary">Enter your code to get discount</p>
            </div>
            <div className="flex gap-2 w-full max-w-[300px]">
              <input type="text" placeholder="Enter promo code" className="flex-1 border border-border rounded-lg px-4 text-sm outline-none focus:border-accent w-full" />
              <Button variant="primary" className="bg-dark hover:bg-dark-light text-white px-6">Apply</Button>
            </div>
          </div>
        </div>

        {/* Right: Order Summary (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary font-medium">Subtotal ({cartItems.length} items)</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary font-medium">Discount</span>
                <span className="font-bold text-green-500">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary font-medium">Shipping</span>
                <span className="font-bold text-green-500">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary font-medium">Tax (18%)</span>
                <span className="font-bold">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-black">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={onCheckout} variant="primary" className="w-full py-3 bg-accent hover:bg-red-600 text-white font-bold rounded-lg mb-4 flex justify-center items-center gap-2">
              Proceed to Checkout <ChevronRight size={16} />
            </Button>
            
            <div className="relative flex items-center justify-center mb-4">
              <div className="absolute border-t border-border w-full"></div>
              <span className="bg-white px-3 text-[10px] text-text-secondary font-medium relative z-10">or</span>
            </div>

            <Button variant="outline" className="w-full py-3 bg-secondary/50 border-border text-text-primary font-bold rounded-lg mb-6 flex justify-center items-center gap-2 hover:bg-secondary">
              <Lock size={14} /> Secure Checkout
            </Button>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Truck size={18} className="text-accent shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark">Free Shipping</span>
                  <span className="text-[10px] text-text-secondary">On orders over $99</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCcw size={18} className="text-accent shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark">7-Day Returns</span>
                  <span className="text-[10px] text-text-secondary">Hassle free returns</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-accent shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark">Secure Payment</span>
                  <span className="text-[10px] text-text-secondary">100% secure payments</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Headphones size={18} className="text-accent shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-dark">24/7 Support</span>
                  <span className="text-[10px] text-text-secondary">We're here to help</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended Items */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-6">Recommended Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedItems.map(product => (
            <ProductCard 
              key={product.name} 
              {...product} 
              onAddToCart={() => onAddToCart && onAddToCart(product, 1)}
              onSelectProduct={() => onSelectProduct(product)} 
            />
          ))}
        </div>
      </div>
      
      {/* Bottom Trust Badges (Horizontal) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border">
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">Secure Checkout</span>
            <span className="text-[10px] text-text-secondary">SSL Encrypted</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:border-l border-border md:pl-6">
          <Truck size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">Free Delivery</span>
            <span className="text-[10px] text-text-secondary">On orders over $99</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:border-l border-border md:pl-6">
          <RefreshCcw size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">7-Day Returns</span>
            <span className="text-[10px] text-text-secondary">Hassle free returns</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:border-l border-border md:pl-6">
          <Headphones size={24} className="text-dark opacity-80" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-dark">24/7 Support</span>
            <span className="text-[10px] text-text-secondary">We're here to help</span>
          </div>
        </div>
      </div>
    </div>
  );
};
