
import React, { useState } from 'react';
import { CreatorProduct, User } from '../types';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';

interface CreatorDashboardProps {
  user: User;
  products: CreatorProduct[];
  onAddProduct: (product: CreatorProduct) => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ user, products, onAddProduct }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const product: CreatorProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProductName,
      price: `$${newProductPrice}`,
      category: 'Digital Service',
      totalSales: 0,
      verifiedBuyerRatio: 0,
      sentimentScore: 100,
      recentReviews: [],
      status: 'active'
    };
    onAddProduct(product);
    setIsAdding(false);
    setNewProductName('');
    setNewProductPrice('');
  };

  const totalRevenue = products.reduce((acc, p) => acc + (p.totalSales * parseFloat(p.price.replace('$', ''))), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight">Creator Performance Hub</h2>
          <p className="text-slate-500 font-medium">Real-time pulse of your commerce and influence.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          List New Product
        </button>
      </div>

      {/* Global Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Creator Revenue</p>
          <p className="text-3xl font-black text-slate-800">${totalRevenue.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-1 text-emerald-500 text-xs font-bold">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"/></svg>
            12.5% vs last month
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Avg. Trust Score</p>
          <p className="text-3xl font-black text-indigo-600">98.2%</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white" />)}
            </div>
            <span className="text-[10px] font-bold text-slate-400">Trusted by 2.4k buyers</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Verified Buyer Rate</p>
          <p className="text-3xl font-black text-emerald-500">84%</p>
          <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase">High authenticity Signal</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Pulse Engagement</p>
          <p className="text-3xl font-black text-rose-500">12.8k</p>
          <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase">Active mentions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-black text-slate-800 mb-2">Active Marketplace Offerings</h3>
          {products.map(product => (
            <div key={product.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest px-2 py-1 bg-indigo-50 rounded-lg">{product.category}</span>
                  <h4 className="text-2xl font-black text-slate-800 mt-2">{product.name}</h4>
                  <p className="text-lg font-bold text-slate-400">{product.price}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-emerald-500 font-black text-xs">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                    Live Tracking
                  </div>
                  <button className="mt-4 text-slate-300 hover:text-slate-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Units</p>
                  <p className="text-xl font-black text-slate-800">{product.totalSales}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Buyer Trust</p>
                  <p className="text-xl font-black text-emerald-500">{product.verifiedBuyerRatio}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Net Sentiment</p>
                  <p className="text-xl font-black text-indigo-600">+{product.sentimentScore}</p>
                </div>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
              <p className="text-slate-400 font-bold">No active listings. Start selling your unique experiences.</p>
            </div>
          )}
        </div>

        {/* Real-time Performance Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              Verified Buyer Momentum
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={products.slice(0, 5)}>
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '1rem' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="verifiedBuyerRatio" radius={[4, 4, 0, 0]}>
                    {products.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6 text-center">Real-time Verification Ratio per SKU</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <h3 className="text-slate-800 font-black mb-4">Market Sentiment Drift</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-black uppercase">
                   <span className="text-slate-400">Positive Intent</span>
                   <span className="text-emerald-500">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                </div>
                <div className="flex items-center justify-between text-xs font-black uppercase">
                   <span className="text-slate-400">Buying Friction</span>
                   <span className="text-rose-500">8%</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                   <div className="h-full bg-rose-500" style={{ width: '8%' }} />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Modal for adding product */}
      {isAdding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsAdding(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-3xl font-black text-slate-800 mb-6">List Your Service</h3>
            <form onSubmit={handleAdd} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Service Name</label>
                <input 
                  autoFocus
                  value={newProductName}
                  onChange={e => setNewProductName(e.target.value)}
                  placeholder="e.g. 1-on-1 Strategy Call"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Price (USD)</label>
                <input 
                  type="number"
                  value={newProductPrice}
                  onChange={e => setNewProductPrice(e.target.value)}
                  placeholder="99"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                  required
                />
              </div>
              <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black text-xl rounded-[1.5rem] shadow-xl hover:bg-indigo-700 transition-all">
                Publish to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;
