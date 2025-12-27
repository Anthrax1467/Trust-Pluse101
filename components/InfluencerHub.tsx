import React, { useState, useEffect } from 'react';
import { InfluencerProfile } from '../types';
import { searchInfluencers } from '../services/geminiService';

const InfluencerHub: React.FC = () => {
  const [query, setQuery] = useState('');
  const [influencers, setInfluencers] = useState<InfluencerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    const results = await searchInfluencers(query || 'experts');
    setInfluencers(results);
    setIsLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-in fade-in duration-700">
      <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter">Pulsar Directory</h2>
          <p className="text-slate-500 font-medium mt-2">Connect with verified influencers and professional product bloggers.</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
           <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
           <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Global expert network</span>
        </div>
      </div>

      <div className="mb-12 max-w-2xl mx-auto md:mx-0">
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pulsars by category or brand..."
            className="w-full pl-14 pr-4 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-indigo-500 outline-none font-bold text-slate-700 shadow-xl transition-all"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <button 
            type="submit"
            className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 text-white font-black rounded-3xl hover:bg-indigo-600 transition-all uppercase text-[10px] tracking-widest"
          >
            {isLoading ? "Syncing..." : "Scan Network"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {influencers.map((inf) => (
          <div key={inf.id} className="group bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-6">
                <img 
                  src={inf.avatar || `https://i.pravatar.cc/150?u=${inf.id}`} 
                  alt={inf.name} 
                  className="w-28 h-28 rounded-[2.5rem] border-4 border-slate-50 shadow-xl object-cover group-hover:scale-105 transition-transform" 
                />
                {inf.isVerified && (
                  <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1.5 border-4 border-white shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-1">{inf.name}</h3>
              <p className="text-indigo-500 font-bold italic text-sm">@{inf.handle}</p>
              <div className="mt-4 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                {inf.category}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="text-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <p className="text-xl font-black text-slate-800">{inf.trustScore}%</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Trust Pulse</p>
               </div>
               <div className="text-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <p className="text-xl font-black text-slate-800">{formatNumber(inf.followers)}</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Reach</p>
               </div>
            </div>

            <button className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-slate-900 transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 group/btn">
              Connect Pulse
              <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>
        ))}

        {influencers.length === 0 && !isLoading && (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
             <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
             </div>
             <h3 className="text-2xl font-black text-slate-300">Syncing Pulsar Network</h3>
             <p className="text-slate-400 max-w-xs mx-auto mt-2 font-medium italic">Searching for verified contributors across {query || 'the network'}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerHub;