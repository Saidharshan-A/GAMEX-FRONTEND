import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { PCBuilderPage } from './pages/PCBuilderPage';
import { SellerWorkspacePage } from './pages/SellerWorkspacePage';

function App() {
  const [showStore, setShowStore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showPCBuilder, setShowPCBuilder] = useState(false);
  const [showSellerWorkspace, setShowSellerWorkspace] = useState(false);
  const [myProducts, setMyProducts] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null); 
    setShowCart(false);
    setShowCheckout(false);
    setShowOrderSuccess(false);
    setShowPCBuilder(category === 'PC Builder');
    setShowSellerWorkspace(category === 'Sell Product');
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => item.name === product.name ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (name, change) => {
    setCartItems(prev => prev.map(item => item.name === name ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  };

  const removeFromCart = (name) => {
    setCartItems(prev => prev.filter(item => item.name !== name));
  };

  if (!showStore) {
    return <Landing onEnter={() => setShowStore(true)} />;
  }

  return (
    <Layout 
      selectedCategory={selectedCategory} 
      onSelectCategory={handleSelectCategory}
      hideSidebar={!!selectedProduct || showCart || showCheckout || showOrderSuccess || showPCBuilder || showSellerWorkspace}
      onLogoClick={() => setShowStore(false)}
      onCartClick={() => {
        setShowOrderSuccess(false);
        setShowCart(true);
        setShowCheckout(false);
        setShowPCBuilder(false);
        setShowSellerWorkspace(false);
      }}
      onAccountClick={() => {
        setSelectedProduct(null); 
        setShowCart(false);
        setShowCheckout(false);
        setShowOrderSuccess(false);
        setShowPCBuilder(false);
        setShowSellerWorkspace(true);
      }}
      cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
    >
      {showSellerWorkspace ? (
        <SellerWorkspacePage 
          onBack={() => setShowSellerWorkspace(false)}
          myProducts={myProducts}
          onSubmitProduct={(product) => setMyProducts(prev => [product, ...prev])}
          onDeleteProduct={(id) => setMyProducts(prev => prev.filter(p => p.id !== id))}
        />
      ) : showPCBuilder ? (
        <PCBuilderPage onBack={() => setShowPCBuilder(false)} />
      ) : showOrderSuccess ? (
        <OrderSuccessPage
          orderData={lastOrder}
          onContinueShopping={() => {
            setShowOrderSuccess(false);
            setSelectedCategory('All Categories');
          }}
          onTrackOrder={() => {
            // Placeholder for next step
            console.log('Track order clicked');
          }}
        />
      ) : showCheckout ? (
        <CheckoutPage
          cartItems={cartItems}
          onBack={() => {
            setShowCheckout(false);
            setShowCart(true);
          }}
          onComplete={() => {
            setLastOrder({ items: [...cartItems], id: "#GMX" + Math.floor(Math.random() * 90000 + 10000) });
            setCartItems([]);
            setShowCheckout(false);
            setShowOrderSuccess(true);
          }}
        />
      ) : showCart ? (
        <CartPage 
          onBack={() => setShowCart(false)} 
          onSelectProduct={(product) => {
            setSelectedProduct(product);
            setShowCart(false);
          }}
          cartItems={cartItems}
          updateQuantity={updateCartQuantity}
          removeItem={removeFromCart}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      ) : selectedProduct ? (
        <ProductDetailsPage 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
          onRequireAuth={() => {}} 
          onAddToCart={addToCart}
        />
      ) : selectedCategory === 'All Categories' ? (
        <Home onRequireAuth={() => {}} onSelectProduct={setSelectedProduct} onAddToCart={addToCart} onSelectCategory={handleSelectCategory} />
      ) : (
        <CategoryPage 
          selectedCategory={selectedCategory} 
          onBack={() => handleSelectCategory('All Categories')}
          onRequireAuth={() => {}} 
          onSelectProduct={setSelectedProduct} 
          onAddToCart={addToCart}
        />
      )}
    </Layout>
  );
}

export default App;
