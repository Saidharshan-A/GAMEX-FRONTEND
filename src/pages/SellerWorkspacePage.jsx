import React, { useState } from 'react';
import { 
  Plus, Package, FileText, XCircle, Settings, 
  UploadCloud, AlertCircle, Edit2, Trash2, CheckCircle, Search, Filter 
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// SUB-COMPONENT: Sell Product Form
const SellProductForm = ({ onSubmitProduct }) => {
  const [formData, setFormData] = useState({
    name: '', category: 'PC Gaming', price: '', description: '', 
    stock: 1, condition: 'New', brand: '', warranty: '', rgb: false, specs: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) return;
    
    onSubmitProduct({
      ...formData,
      id: 'prod_' + Math.floor(Math.random() * 1000000),
      status: 'Pending Approval',
      views: 0,
      submittedAt: new Date().toISOString(),
      price: parseFloat(formData.price),
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400&h=400'
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-dark mb-4">Product Submitted!</h2>
        <p className="text-text-secondary mb-8">Your product has been submitted for admin approval.</p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="font-bold py-3 px-6">
          Submit Another Product
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-dark tracking-tight">Sell a New Product</h2>
        <p className="text-sm text-text-secondary">Upload images and set your pricing.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-bold text-dark mb-4 uppercase tracking-wide">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-dark mb-2">Product Name <span className="text-accent">*</span></label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. NVIDIA RTX 4090 Founders Edition" className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-lg py-3 px-4 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-dark mb-2">Category <span className="text-accent">*</span></label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-lg py-3 px-4 outline-none text-sm appearance-none">
                <option value="PC Gaming">PC Components</option>
                <option value="PlayStation">PlayStation Console/Games</option>
                <option value="Xbox">Xbox Console/Games</option>
                <option value="Nintendo">Nintendo Console/Games</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-dark mb-2">Price (₹) <span className="text-accent">*</span></label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-lg py-3 px-4 outline-none text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-dark mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the condition, features, and why you are selling..." rows="3" className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-lg py-3 px-4 outline-none text-sm resize-none"></textarea>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-border bg-gray-50/50">
          <h3 className="text-sm font-bold text-dark mb-4 uppercase tracking-wide">Media & Details</h3>
          <div className="mb-6">
            <label className="block text-xs font-bold text-dark mb-2">Product Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-white hover:border-accent transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3 text-text-secondary">
                <UploadCloud size={24} />
              </div>
              <span className="font-bold text-sm text-dark">Click to upload images</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-dark mb-2">Stock Quantity</label>
              <input type="number" min="1" name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-lg py-3 px-4 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-dark mb-2">Condition</label>
              <select name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-lg py-3 px-4 outline-none text-sm appearance-none">
                <option value="New">Brand New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-dark mb-2">Brand (Optional)</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. ASUS" className="w-full bg-secondary border border-transparent focus:border-accent focus:bg-white transition-all rounded-lg py-3 px-4 outline-none text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-secondary text-xs">
            <AlertCircle size={16} /> Submissions require admin approval.
          </div>
          <Button type="submit" variant="primary" className="bg-accent hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-md">
            List Product
          </Button>
        </div>
      </form>
    </div>
  );
};

// SUB-COMPONENT: My Listings
const MyListings = ({ myProducts, onDelete }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending Approval': return 'bg-orange-100 text-orange-700';
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-dark tracking-tight">My Listings</h2>
          <p className="text-sm text-text-secondary">Manage your uploaded products.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64 hidden md:block">
            <input type="text" placeholder="Search..." className="w-full bg-white border border-border focus:border-accent transition-all rounded-lg py-2 pl-9 pr-4 outline-none text-sm shadow-sm" />
            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          </div>
          <Button variant="outline" className="flex items-center gap-2 text-sm bg-white shadow-sm">
            <Filter size={14} /> Filter
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold text-dark">Product</th>
                <th className="px-6 py-4 font-bold text-dark">Price</th>
                <th className="px-6 py-4 font-bold text-dark">Status</th>
                <th className="px-6 py-4 font-bold text-dark">Views</th>
                <th className="px-6 py-4 font-bold text-dark text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {myProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-text-secondary">
                    You haven't listed any products yet.
                  </td>
                </tr>
              ) : (
                myProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center p-1 shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-dark truncate max-w-[200px]">{product.name}</span>
                          <span className="text-[10px] text-text-secondary">{product.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-dark">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary font-medium">{product.views || 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-text-secondary hover:text-dark hover:bg-gray-200 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => onDelete(product.id)} className="p-2 text-text-secondary hover:text-accent hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// MASTER COMPONENT: Workspace Layout
export const SellerWorkspacePage = ({ myProducts, onSubmitProduct, onDeleteProduct }) => {
  const [activeTab, setActiveTab] = useState('sell');

  const tabs = [
    { id: 'sell', label: 'Sell Product', icon: Plus },
    { id: 'listings', label: 'My Listings', icon: Package },
    { id: 'drafts', label: 'Drafts', icon: FileText },
    { id: 'rejected', label: 'Rejected Products', icon: XCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto animate-in fade-in duration-500 flex flex-col md:flex-row gap-8 pb-12">
      
      {/* Left Sidebar */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        <h1 className="text-xl font-black text-dark mb-4 tracking-tight px-3">Workspace</h1>
        
        <div className="flex flex-col gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                  ${isActive 
                    ? tab.id === 'sell' 
                      ? 'bg-accent text-white shadow-md' 
                      : 'bg-dark text-white shadow-md'
                    : 'text-text-secondary hover:bg-white hover:text-dark border border-transparent hover:border-border hover:shadow-sm'
                  }
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-8 md:hidden border-b border-border pb-4">
           <h2 className="text-lg font-black text-dark">Seller Workspace</h2>
        </div>

        {activeTab === 'sell' && <SellProductForm onSubmitProduct={(p) => { onSubmitProduct(p); setActiveTab('listings'); }} />}
        {activeTab === 'listings' && <MyListings myProducts={myProducts} onDelete={onDeleteProduct} />}
        
        {['drafts', 'rejected', 'settings'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-2xl border border-border border-dashed">
            <h3 className="text-lg font-bold text-dark mb-2">Coming Soon</h3>
            <p className="text-sm text-text-secondary">This section is currently under development.</p>
          </div>
        )}
      </div>

    </div>
  );
};
