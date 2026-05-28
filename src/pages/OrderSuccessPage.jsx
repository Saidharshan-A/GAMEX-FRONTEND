import React from 'react';
import { Check, Package, Calendar, Truck, ArrowRight, ShieldCheck, RefreshCcw, Headphones, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const OrderSuccessPage = ({ orderData, onContinueShopping, onTrackOrder }) => {
  // If no orderData is passed, fallback to an empty array so it doesn't crash
  const items = orderData?.items || [];
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal > 1500 ? 15000 : 0; 
  const tax = Math.max(0, (subtotal - discount)) * 0.18; 
  const total = subtotal - discount + tax;

  const orderId = orderData?.id || "#GMX23891";
  
  // Format current date for order date
  const today = new Date();
  const orderDateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Format dates for estimated delivery (3-5 days from now)
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 3);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 5);
  const deliveryStr = `${deliveryStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${deliveryEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  return (
    <div className="flex flex-col animate-in fade-in duration-500 pb-12 max-w-5xl mx-auto w-full gap-8">
      
      {/* Top Success Message */}
      <div className="flex flex-col items-center text-center mt-4">
        {/* Confetti & Checkmark icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={48} className="text-green-500 stroke-[3]" />
          </div>
          {/* Decorative floating bits */}
          <div className="absolute top-0 -left-6 w-2 h-2 border-2 border-red-500 transform rotate-45 rounded-sm"></div>
          <div className="absolute top-4 -right-8 w-2 h-2 border-2 border-yellow-400 transform rotate-12 rounded-sm"></div>
          <div className="absolute bottom-2 -left-8 w-2 h-2 border-2 border-yellow-400 transform -rotate-12 rounded-sm"></div>
          <div className="absolute top-1/2 -right-12 w-2 h-2 border-2 border-green-500 transform rotate-45 rounded-sm"></div>
          <div className="absolute bottom-0 -right-6 w-2 h-2 border-2 border-purple-400 transform rotate-45 rounded-sm"></div>
          <div className="absolute -top-4 left-1/2 w-2 h-2 border-2 border-red-500 transform rotate-45 rounded-sm"></div>
        </div>
        <h1 className="text-4xl font-black text-dark mb-2">Order Confirmed!</h1>
        <p className="text-text-secondary text-sm">Thank you for your purchase. Your order has been placed successfully.</p>
      </div>

      {/* Order Info Card (ID, Date, Delivery) */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col md:flex-row justify-between items-center md:items-start divide-y md:divide-y-0 md:divide-x divide-border gap-6 md:gap-0">
        <div className="flex items-center gap-4 px-6 w-full md:w-1/3">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
            <Package size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary mb-1">Order ID</span>
            <span className="font-bold text-dark text-lg">{orderId}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 px-6 w-full md:w-1/3 pt-6 md:pt-0">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
            <Calendar size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary mb-1">Order Date</span>
            <span className="font-bold text-dark text-base">{orderDateStr}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 px-6 w-full md:w-1/3 pt-6 md:pt-0">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
            <Truck size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary mb-1">Estimated Delivery</span>
            <span className="font-bold text-dark text-base">{deliveryStr}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2">
        <Button onClick={onTrackOrder} variant="primary" className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto shadow-md">
          <Package size={18} /> Track Your Order
        </Button>
        <Button onClick={onContinueShopping} variant="outline" className="border-border text-dark hover:bg-secondary font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto">
          <ShoppingBag size={18} /> Continue Shopping
        </Button>
      </div>

      {/* Main Content Grid (Items vs Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Order Details */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold text-dark mb-6">Order Details</h2>
          
          <div className="flex flex-col gap-6 mb-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center p-2 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <h4 className="font-bold text-sm text-dark leading-tight mb-1">{item.name}</h4>
                  <span className="text-xs text-text-secondary">{item.subtitle || item.category}</span>
                </div>
                <div className="flex items-center gap-12">
                  <span className="text-xs text-text-secondary font-medium whitespace-nowrap">Qty: {item.quantity}</span>
                  <span className="font-bold text-sm text-dark whitespace-nowrap w-20 text-right">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-sm text-text-secondary text-center py-4">No items found for this order.</div>
            )}
          </div>
          
          <button className="text-accent text-sm font-bold flex items-center gap-1 hover:underline">
            View Full Order Details <ArrowRight size={16} />
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-lg font-bold text-dark mb-6">Order Summary</h2>
          
          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-text-secondary font-medium">Subtotal ({items.length} items)</span>
              <span className="font-bold text-dark">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary font-medium">Discount</span>
              <span className="font-bold text-green-500">- ₹{discount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary font-medium">Shipping</span>
              <span className="font-bold text-green-500">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary font-medium">Tax (18%)</span>
              <span className="font-bold text-dark">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex justify-between items-end">
              <span className="text-base font-bold text-dark">Total Amount</span>
              <span className="text-3xl font-black text-dark tracking-tight">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Trust Badges Footer */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-dark mb-0.5">Secure Payment</span>
              <span className="text-[10px] text-text-secondary leading-tight">Your payment information is safe with us.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:border-l border-border lg:pl-8">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <RefreshCcw size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-dark mb-0.5">7-Day Easy Returns</span>
              <span className="text-[10px] text-text-secondary leading-tight">Not satisfied? Return within 7 days.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:border-l border-border lg:pl-8">
            <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-dark mb-0.5">Fast & Free Shipping</span>
              <span className="text-[10px] text-text-secondary leading-tight">Free shipping on all orders.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:border-l border-border lg:pl-8">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Headphones size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-dark mb-0.5">24/7 Support</span>
              <span className="text-[10px] text-text-secondary leading-tight">We're here to help you anytime.</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
