
import React from 'react';
import { SimilarProduct } from '../types';

interface MarketplaceSidebarProps {
  products: SimilarProduct[];
}

const MarketplaceSidebar: React.FC<MarketplaceSidebarProps> = ({ products }) => {
  const categories = ['Luxury', 'Comfort', 'Aesthetics', 'Casual'];

  return (
    <aside className="space-y-8 animate-in slide-in-from-right-8 duration-700">
      <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        </div>
        <h3 className="text-xl font-black mb-6 tracking-tight flex items-center gap-3">
          <span className="p-1.5 bg-indigo-500 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg></span>
          Pulse Alternatives
        </h3>
        
        <div className="space-y-6 relative z-10">
          {products.map((p, i) => (
            <div key={i} className="group bg-white/5 border border-white/10 rounded-[2rem] p-5 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 bg-white rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 shadow-inner">
                  <img 
                    src={p.imageUrl} 
                    alt={p.name} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://loremflickr.com/200/200/${encodeURIComponent(p.name)}?lock=${i}`;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black truncate">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black uppercase text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-md border border-indigo-400/20">{p.styleCategory}</span>
                    <span className="text-xs font-bold text-emerald-400">{p.priceEstimate || 'Varies'}</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic line-clamp-2">"{p.details || 'Competitive market alternative.'}"</p>
              <button className="w-full mt-4 py-2 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-colors">Compare Stats →</button>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-center text-slate-500 text-xs italic py-10">No specific market rivals identified.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Market Velocity</h4>
         <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-700">Search Volume</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[78%]"></div>
                </div>
                <span className="text-[9px] font-black text-indigo-600">High</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-700">Sentiment Stability</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%]"></div>
                </div>
                <span className="text-[9px] font-black text-emerald-600">Stable</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-700">Price Volatility</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[45%]"></div>
                </div>
                <span className="text-[9px] font-black text-rose-600">Moderate</span>
              </div>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default MarketplaceSidebar;
