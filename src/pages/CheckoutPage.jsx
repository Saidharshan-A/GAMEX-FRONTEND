import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, MapPin, Truck, CreditCard, Lock, Edit2, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CheckoutPage = ({ cartItems = [], onBack, onComplete }) => {
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedShipping, setSelectedShipping] = useState('express');
  const [selectedPayment, setSelectedPayment] = useState('upi');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal > 1500 ? 15000 : 0; // Scaled for INR mock
  const tax = Math.max(0, (subtotal - discount)) * 0.18; 
  const total = subtotal - discount + tax;

  const addresses = [
    {
      id: 'home',
      type: 'Home',
      isDefault: true,
      name: 'Gamer X',
      address: '123, Gaming Street, Cyber City, Bangalore, Karnataka - 560001',
      phone: '+91 9876543210'
    },
    {
      id: 'office',
      type: 'Office',
      isDefault: false,
      name: 'Gamer X',
      address: '456, Tech Park, Whitefield, Bangalore, Karnataka - 560066',
      phone: '+91 9876543210'
    },
    {
      id: 'other',
      type: 'Other',
      isDefault: false,
      name: 'Gamer X',
      address: '789, MG Road, Indiranagar, Bangalore, Karnataka - 560038',
      phone: '+91 9876543210'
    }
  ];

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500 pb-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-text-primary border border-border px-4 py-2 rounded hover:bg-secondary transition w-fit">
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <h1 className="text-3xl font-black text-dark tracking-tight">Checkout</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent text-accent flex items-center justify-center font-bold text-sm bg-red-50">1</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none text-dark">Shipping</span>
            <span className="text-[10px] text-text-secondary">Address</span>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
        <div className="flex items-center space-x-3 opacity-50">
          <div className="w-8 h-8 rounded-full border-2 border-border text-text-secondary flex items-center justify-center font-bold text-sm bg-secondary">2</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">Payment</span>
            <span className="text-[10px]">Method</span>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
        <div className="flex items-center space-x-3 opacity-50">
          <div className="w-8 h-8 rounded-full border-2 border-border text-text-secondary flex items-center justify-center font-bold text-sm bg-secondary">3</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">Review</span>
            <span className="text-[10px]">Order</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Shipping Address Section */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-dark" />
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-dark">Shipping Address</h2>
                  <span className="text-xs text-text-secondary">Select or add a new shipping address</span>
                </div>
              </div>
              <button className="text-accent text-sm font-bold flex items-center gap-1 hover:underline">
                <Plus size={16} /> Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {addresses.map(addr => (
                <div 
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedAddress === addr.id ? 'border-accent bg-red-50/20' : 'border-border bg-white hover:border-gray-300'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddress === addr.id ? 'border-accent' : 'border-gray-300'}`}>
                        {selectedAddress === addr.id && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                      <span className="font-bold text-sm">{addr.type}</span>
                      {addr.isDefault && (
                        <span className="bg-red-100 text-accent text-[9px] font-bold px-1.5 py-0.5 rounded">DEFAULT</span>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-dark">
                      <Edit2 size={14} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-text-secondary">
                    <span className="text-dark font-medium">{addr.name}</span>
                    <p className="leading-relaxed">{addr.address}</p>
                    <span className="font-medium mt-1">{addr.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Method Section */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <Truck size={24} className="text-dark" />
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-dark">Shipping Method</h2>
                <span className="text-xs text-text-secondary">Choose your preferred shipping option</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div 
                onClick={() => setSelectedShipping('express')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedShipping === 'express' ? 'border-accent bg-red-50/20' : 'border-border bg-white hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedShipping === 'express' ? 'border-accent' : 'border-gray-300'}`}>
                    {selectedShipping === 'express' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-dark">Express Delivery</span>
                    <span className="text-xs text-text-secondary">Delivers in 2 - 3 business days</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 font-bold text-sm tracking-wide">FREE</span>
                  <span className="text-text-secondary text-xs line-through">₹149</span>
                </div>
              </div>

              <div 
                onClick={() => setSelectedShipping('standard')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedShipping === 'standard' ? 'border-accent bg-red-50/20' : 'border-border bg-white hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedShipping === 'standard' ? 'border-accent' : 'border-gray-300'}`}>
                    {selectedShipping === 'standard' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-dark">Standard Delivery</span>
                    <span className="text-xs text-text-secondary">Delivers in 5 - 7 business days</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-sm text-dark">₹99</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard size={24} className="text-dark" />
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-dark">Payment Method</h2>
                <span className="text-xs text-text-secondary">Select a payment method</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                onClick={() => setSelectedPayment('upi')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-colors flex flex-col justify-between ${selectedPayment === 'upi' ? 'border-accent bg-red-50/20' : 'border-border bg-white hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'upi' ? 'border-accent' : 'border-gray-300'}`}>
                    {selectedPayment === 'upi' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <span className="font-bold text-sm text-dark">UPI</span>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="text-[9px] font-bold text-gray-500 bg-white px-1 py-0.5 rounded border border-gray-200">G Pay</div>
                  <div className="text-[9px] font-bold text-gray-500 bg-white px-1 py-0.5 rounded border border-gray-200">PhonePe</div>
                  <div className="text-[9px] font-bold text-gray-500 bg-white px-1 py-0.5 rounded border border-gray-200">Paytm</div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedPayment('card')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-colors flex flex-col justify-between ${selectedPayment === 'card' ? 'border-accent bg-red-50/20' : 'border-border bg-white hover:border-gray-300'}`}
              >
                <div className="flex items-start gap-2 mb-4">
                  <div className={`w-4 h-4 mt-0.5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'card' ? 'border-accent' : 'border-gray-300'}`}>
                    {selectedPayment === 'card' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-dark leading-tight">Credit / Debit Card</span>
                    <span className="text-[9px] text-text-secondary mt-1">Visa, Mastercard, Rupay</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-auto">
                  <div className="text-[9px] font-bold text-blue-900 bg-white px-1 py-0.5 rounded border border-gray-200">VISA</div>
                  <div className="w-4 h-3 bg-red-500 rounded-sm relative overflow-hidden flex-shrink-0"><div className="w-2.5 h-3 bg-orange-400 rounded-full absolute -right-1"></div></div>
                  <div className="text-[9px] font-bold text-blue-800 bg-white px-1 py-0.5 rounded border border-gray-200">RuPay</div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedPayment('netbanking')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-colors flex flex-col justify-between ${selectedPayment === 'netbanking' ? 'border-accent bg-red-50/20' : 'border-border bg-white hover:border-gray-300'}`}
              >
                <div className="flex items-start gap-2 mb-4">
                  <div className={`w-4 h-4 mt-0.5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'netbanking' ? 'border-accent' : 'border-gray-300'}`}>
                    {selectedPayment === 'netbanking' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-dark leading-tight">Net Banking</span>
                    <span className="text-[9px] text-text-secondary mt-1">All major banks</span>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setSelectedPayment('wallets')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-colors flex flex-col justify-between ${selectedPayment === 'wallets' ? 'border-accent bg-red-50/20' : 'border-border bg-white hover:border-gray-300'}`}
              >
                <div className="flex items-start gap-2 mb-4">
                  <div className={`w-4 h-4 mt-0.5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'wallets' ? 'border-accent' : 'border-gray-300'}`}>
                    {selectedPayment === 'wallets' && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-dark leading-tight">Wallets</span>
                    <span className="text-[9px] text-text-secondary mt-1">Paytm, Amazon Pay</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                   <div className="text-[9px] font-bold text-blue-500 bg-white px-1 py-0.5 rounded border border-gray-200">Paytm</div>
                   <div className="text-[10px] font-bold text-gray-700 bg-white px-1 py-0.5 rounded border border-gray-200 flex items-center">a</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-text-secondary pl-2">
            <Lock size={12} /> Your data is 100% secure and encrypted.
          </div>

        </div>

        {/* Right: Order Summary (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <span className="text-xs text-text-secondary">{cartItems.length} Items</span>
            </div>

            {/* Items List (Simplified for Checkout) */}
            <div className="flex flex-col gap-3 mb-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center p-2 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h4 className="font-bold text-xs text-dark line-clamp-1">{item.name}</h4>
                    <span className="text-[10px] text-text-secondary mb-1">{item.subtitle || item.category}</span>
                    <span className="text-[10px] text-text-secondary">Qty: {item.quantity}</span>
                  </div>
                  <div className="font-bold text-xs text-dark mt-auto">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-4 space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-text-secondary font-medium">Subtotal ({cartItems.length} items)</span>
                <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
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
                <span className="font-bold">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div className="border-t border-border pt-3 mb-3">
              <div className="flex justify-between items-end">
                <span className="text-base font-bold text-dark">Total Amount</span>
                <span className="text-3xl font-black text-dark">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <Button onClick={onComplete} variant="primary" className="w-full py-3 bg-accent hover:bg-red-600 text-white font-bold rounded-lg mb-3 flex justify-center items-center gap-2 shadow-md hover:shadow-lg transition-all">
              Continue to Payment <ChevronRight size={16} />
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
              <Lock size={14} /> Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
