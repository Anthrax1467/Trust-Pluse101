
import React from 'react';
import { BudgetAlternative } from '../types';

interface BudgetSaverSidebarProps {
  alternatives: BudgetAlternative[];
}

const BudgetSaverSidebar: React.FC<BudgetSaverSidebarProps> = ({ alternatives }) => {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 shadow-lg animate-in slide-in-from-right-12 duration-1000">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <h3 className="text-lg font-black text-emerald-950 tracking-tight">Save Money Pulse</h3>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ultra-Budget Scans</p>
        </div>
      </div>

      <div className="space-y-4">
        {alternatives.map((alt, i) => (
          <div key={i} className="group bg-white rounded-3xl p-5 border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center overflow-hidden border border-emerald-50">
                 {alt.imageUrl ? (
                   <img src={alt.imageUrl} alt={alt.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://loremflickr.com/100/100/${encodeURIComponent(alt.store)}?lock=${i}`; }} />
                 ) : (
                   <span className="text-[8px] font-black text-emerald-700 uppercase">{alt.store[0]}</span>
                 )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                   <span className="text-[8px] font-black uppercase bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md">{alt.store}</span>
                </div>
                <h4 className="text-xs font-black text-slate-800 truncate mt-1">{alt.name}</h4>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Budget Price</p>
                <p className="text-lg font-black text-emerald-600 tracking-tighter">{alt.price}</p>
              </div>
              <a 
                href={alt.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Go to Shop
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-emerald-100/30 rounded-2xl border border-emerald-100 border-dashed text-center">
        <p className="text-[9px] font-black text-emerald-700 uppercase tracking-[0.1em] leading-relaxed">
          Comparing direct-from-factory pricing across Alibaba, Temu & Shein.
        </p>
      </div>
    </div>
  );
};

export default BudgetSaverSidebar;
