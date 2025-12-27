
import React, { useState } from 'react';
import { findCollabMatches } from '../services/geminiService';
import { User } from '../types';

interface CollabHubProps {
  user: User | null;
}

const CollabHub: React.FC<CollabHubProps> = ({ user }) => {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<'creators' | 'brands'>(user?.isInfluencer ? 'brands' : 'creators');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsLoading(true);
    const results = await findCollabMatches(query, tab === 'creators' ? 'influencers' : 'brands');
    setMatches(results);
    setIsLoading(false);
  };

  const unlockDetails = (id: string) => {
    setUnlockedIds(prev => new Set([...prev, id]));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-4">Pulse Collab Marketplace</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">
          Professional alignment discovery. Brands find creators, creators find brands.
          Details revealed upon mutual interest.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-[2rem] shadow-inner border border-slate-200">
          <button 
            onClick={() => { setTab('creators'); setMatches([]); }}
            className={`px-10 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${tab === 'creators' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Find Creators
          </button>
          <button 
            onClick={() => { setTab('brands'); setMatches([]); }}
            className={`px-10 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${tab === 'brands' ? 'bg-amber-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Find Brands
          </button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-20">
        <div className="relative group">
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tab === 'creators' ? "Search for creators by product line (e.g. 'Skincare', 'Gaming Laptop')..." : "Search for brands by content style (e.g. 'Minimalist Tech', 'Sustainable Fashion')..."}
            className="w-full pl-8 pr-40 py-6 rounded-[2.5rem] bg-white border-2 border-slate-100 focus:border-indigo-500 outline-none font-bold text-slate-700 shadow-xl transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-3 bottom-3 px-10 bg-slate-900 text-white font-black rounded-3xl hover:bg-indigo-600 transition-all uppercase text-[10px] tracking-widest flex items-center gap-2"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Find Matches'}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {matches.map((match, i) => (
          <div key={i} className="group bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
               <div className="w-20 h-20 bg-slate-50 rounded-full border border-slate-100 flex flex-col items-center justify-center">
                  <p className="text-xl font-black text-indigo-600 leading-none">{match.matchedPulse}%</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">Match</p>
               </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl flex items-center justify-center border border-slate-100 shadow-inner">
                  <span className="text-3xl font-black italic text-slate-300">{match.name[0]}</span>
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{match.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase rounded border border-indigo-100 tracking-widest">{match.category}</span>
                     <span className="text-slate-300">•</span>
                     <span className="text-slate-400 text-[10px] font-bold uppercase">{match.reach} reach</span>
                  </div>
               </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-10 italic">"{match.description}"</p>

            <div className="pt-8 border-t border-slate-50">
               {unlockedIds.has(match.id || match.name) ? (
                 <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Direct Contact Identity</p>
                          <p className="text-lg font-black text-slate-800">{match.email}</p>
                       </div>
                       <a href={`mailto:${match.email}`} className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                       </a>
                    </div>
                 </div>
               ) : (
                 <button 
                  onClick={() => unlockDetails(match.id || match.name)}
                  className="w-full py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 group/btn"
                 >
                    <svg className="w-5 h-5 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    Express Interest & Unlock Email
                 </button>
               )}
            </div>
          </div>
        ))}

        {matches.length === 0 && !isLoading && (
          <div className="col-span-2 py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
             </div>
             <h3 className="text-2xl font-black text-slate-400">Scan for Pulse Partners</h3>
             <p className="text-slate-400 max-w-sm mx-auto mt-2 font-medium">Use the AI match search to find your next major verified collaboration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollabHub;
