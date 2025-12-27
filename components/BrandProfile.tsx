
import React from 'react';
import { BrandInsight } from '../types';
import EventPulse from './EventPulse';

interface BrandProfileProps {
  insight: BrandInsight;
}

const BrandProfile: React.FC<BrandProfileProps> = ({ insight }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Brand Hero Header */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
            <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl p-6 overflow-hidden">
               {insight.logoUrl ? (
                 <img src={insight.logoUrl} alt={insight.brandName} className="w-full h-full object-contain" />
               ) : (
                 <span className="text-4xl font-black text-slate-800 italic">{insight.brandName?.[0]}</span>
               )}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-5xl font-black tracking-tighter">{insight.brandName}</h2>
                <span className="px-4 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-indigo-500">
                  {insight.industry}
                </span>
              </div>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed italic">"{insight.description}"</p>
            </div>
            <div className="ml-auto text-center">
               <div className="relative inline-block mb-2">
                 <div className="text-6xl font-black text-indigo-400 tracking-tighter">{insight.marketTrustScore}%</div>
                 <div className="absolute -top-4 -right-8 bg-emerald-500 text-[10px] font-black px-2 py-1 rounded-lg text-white animate-bounce shadow-xl">ELITE</div>
               </div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Market Trust</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-10">
             <div>
                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Official Mission</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{insight.mission || "Building global excellence through innovative products and services."}</p>
             </div>
             <div className="flex flex-col justify-center">
                <div className="flex gap-4">
                   <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex-1 text-center">
                      <p className="text-2xl font-black">{insight.productCatalog?.length || 0}</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Core Products</p>
                   </div>
                   <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex-1 text-center">
                      <p className="text-2xl font-black">{insight.services?.length || 0}</p>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Services</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Events Feed Section */}
      {insight.events && insight.events.length > 0 && (
        <EventPulse events={insight.events} />
      )}

      {/* Product Catalog Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8 px-4">
           <div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">Ecosystem Portfolio</h3>
              <p className="text-slate-500 font-medium italic">Verified active product lines and catalog scans.</p>
           </div>
           <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sync Status</span>
              <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black text-emerald-600 uppercase">Live Pulse</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {insight.productCatalog?.map((prod, i) => (
            <div key={i} className="group bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
               <div className="aspect-square bg-slate-50 rounded-[2rem] mb-6 overflow-hidden border border-slate-100 flex items-center justify-center p-8">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.name} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://loremflickr.com/400/400/${encodeURIComponent(prod.name?.split(' ')[0] || 'product')}?lock=${i}`;
                    }}
                  />
               </div>
               <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">{prod.category}</span>
                    <h4 className="font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{prod.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-800">{prod.priceRange}</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Est. Market</p>
                  </div>
               </div>
               <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                  <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500" style={{ width: `${prod.trustPulse}%` }} />
                  </div>
                  <span className="text-[9px] font-black text-slate-400">{prod.trustPulse}% Trust</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services and Influencers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 mb-24">
         {/* Services Card */}
         <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
               <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
               </div>
               Service Ecosystem
            </h3>
            <div className="space-y-6">
               {insight.services?.map((svc, i) => (
                 <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all">
                    <div className="max-w-[70%]">
                       <h4 className="font-black text-slate-800 text-sm">{svc.name}</h4>
                       <p className="text-xs text-slate-500 mt-1 line-clamp-2 italic">"{svc.description}"</p>
                    </div>
                    <div className="text-right">
                       <span className="px-3 py-1.5 bg-white rounded-xl text-[10px] font-black text-indigo-600 border border-indigo-50 shadow-sm">
                          {svc.priceRange}
                       </span>
                    </div>
                 </div>
               ))}
               {(!insight.services || insight.services.length === 0) && (
                 <p className="text-center text-slate-400 font-bold italic py-10">No specific digital services identified in this pulse.</p>
               )}
            </div>
         </div>

         {/* Influencer Pulse */}
         <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
               <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <div className="relative z-10">
               <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl text-indigo-400">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  </div>
                  Pulsar Expert Consensus
               </h3>
               <div className="space-y-6">
                  {insight.influencerPulse?.map((inf, i) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all">
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-black text-xs">
                                {inf.name?.[0]}
                             </div>
                             <div>
                                <h4 className="font-black text-xs">{inf.name}</h4>
                                <p className="text-[10px] text-indigo-400 font-bold tracking-widest">{inf.handle}</p>
                             </div>
                          </div>
                          <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-black border border-emerald-500/30">
                             TRUST: {inf.score}%
                          </div>
                       </div>
                       <p className="text-xs text-slate-300 italic leading-relaxed">"{inf.quote}"</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BrandProfile;
