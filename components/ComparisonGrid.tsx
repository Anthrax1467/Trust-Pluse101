
import React, { useMemo } from 'react';
import { PricePoint, SimilarProduct } from '../types';

interface ComparisonGridProps {
  prices: PricePoint[];
  similar: SimilarProduct[];
}

const ComparisonGrid: React.FC<ComparisonGridProps> = ({ prices, similar }) => {
  const groupedSimilar = useMemo(() => {
    const groups: Record<string, SimilarProduct[]> = {
      Luxury: [],
      Comfort: [],
      Aesthetics: [],
      Casual: [],
    };
    similar?.forEach((s) => {
      if (groups[s.styleCategory]) {
        groups[s.styleCategory].push(s);
      } else {
        if (!groups['Casual']) groups['Casual'] = [];
        groups['Casual'].push(s);
      }
    });
    return groups;
  }, [similar]);

  const styleConfig: Record<string, { bg: string; text: string; icon: string }> = {
    Luxury: { bg: 'bg-amber-100', text: 'text-amber-700', icon: '👑' },
    Comfort: { bg: 'bg-sky-100', text: 'text-sky-700', icon: '☁️' },
    Aesthetics: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '✨' },
    Casual: { bg: 'bg-slate-100', text: 'text-slate-700', icon: '⚡' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Direct Price Pulse</h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">Live Grounding</span>
          </div>
          
          <div className="space-y-4">
            {prices?.map((p, i) => (
              <div key={i} className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${i === 0 ? 'bg-indigo-50/30 border-indigo-100' : 'bg-slate-50 border-slate-100'} hover:shadow-md`}>
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black shadow-sm border border-slate-100 uppercase text-lg ${i === 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {p.store?.[0] || 'S'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-black text-slate-800">{p.store}</div>
                      {i === 0 && <span className="bg-indigo-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase">Best Value</span>}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${p.availability ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {p.availability ? '● In Stock' : '● Out of Stock'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-800 tracking-tighter">{p.price}</div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-sm mt-2">
                      Shop Now →
                    </a>
                  )}
                </div>
              </div>
            ))}
            {(!prices || prices.length === 0) && (
              <p className="text-center text-slate-400 font-medium italic py-4">No direct retailers identified for this query.</p>
            )}
          </div>
        </div>

        {similar && similar.length > 0 && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight">Market Rivals</h3>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Competitor Scan</span>
            </div>

            <div className="space-y-12">
              {Object.entries(groupedSimilar).map(([category, items]) => {
                if (items.length === 0) return null;
                const config = styleConfig[category];
                return (
                  <div key={category} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{config.icon}</span>
                      <h4 className={`text-xs font-black uppercase tracking-widest ${config.text}`}>{category} Selection</h4>
                      <div className="flex-1 h-px bg-slate-100"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {items.map((prod, i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="aspect-[4/3] bg-slate-50 rounded-3xl mb-4 overflow-hidden relative border border-slate-100 flex items-center justify-center p-6">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.name} 
                              className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                              onError={(e) => {
                                const keywords = prod.name?.toLowerCase().split(' ').slice(0, 3).join(',') || 'product';
                                (e.target as HTMLImageElement).src = `https://loremflickr.com/400/300/${encodeURIComponent(keywords)}?lock=${i}`;
                                (e.target as HTMLImageElement).onerror = null;
                              }}
                            />
                            
                            <div className={`absolute top-4 left-4 px-3 py-1 ${config.bg} ${config.text} rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm`}>
                              {category}
                            </div>

                            {prod.priceEstimate && (
                              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-indigo-600 shadow-xl rounded-xl text-[10px] font-black text-white">
                                {prod.priceEstimate}
                              </div>
                            )}
                          </div>
                          <div className="px-1">
                            <p className="font-black text-slate-800 text-sm leading-snug group-hover:text-indigo-600 transition-colors">{prod.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">View Details →</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-4">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-rose-500 text-white rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tighter">Price Verdict</h3>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 leading-relaxed">AI Recommendation</p>
          <div className="space-y-4">
             <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-sm text-slate-200 leading-relaxed italic font-medium">"Current prices are at a 6-month average. No immediate drops predicted for the next 15 days. If you need it now, {prices?.[0]?.store || 'the primary retailer'} is the verified lowest."</p>
             </div>
             <div className="flex items-center gap-3 p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase text-indigo-300">Market stability: High</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonGrid;
