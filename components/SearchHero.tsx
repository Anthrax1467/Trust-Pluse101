
import React, { useState, useEffect } from 'react';

interface SearchHeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchHero: React.FC<SearchHeroProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [loadingPhase, setLoadingPhase] = useState(0);

  const phases = [
    "Pulsating...",
    "Syncing Network...",
    "Calibrating...",
    "Retrieving Pulse...",
    "Optimizing..."
  ];

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingPhase(prev => (prev + 1) % phases.length);
      }, 2000);
    } else {
      setLoadingPhase(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-lighten filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-lighten filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">New: High-Velocity Pulse Scan</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
          Search any product, <br/> <span className="text-indigo-500">get the truth.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Low-latency AI sentiment analysis from Reddit, Google, and experts. 
          Get the real pulse on any brand, product, or service in seconds.
        </p>

        <form onSubmit={handleSubmit} className="relative group max-w-2xl mx-auto shadow-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search (e.g. iPhone 15, Tesla, Notion, Nike...)"
            className="w-full pl-8 pr-56 py-6 rounded-[2rem] bg-white border border-slate-200 text-slate-900 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all placeholder-slate-300 font-bold"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-3 bottom-3 px-8 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black rounded-[1.5rem] transition-all shadow-lg flex items-center gap-3 uppercase text-xs tracking-widest min-w-[180px] justify-center"
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mb-1"></div>
                <span className="text-[10px] opacity-70 animate-pulse">{phases[loadingPhase]}</span>
              </div>
            ) : (
              'Check Pulse'
            )}
          </button>
        </form>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span className="text-slate-600">Trending:</span>
          <button onClick={() => onSearch('iPhone 15')} className="hover:text-indigo-400 transition-colors">iPhone 15</button>
          <button onClick={() => onSearch('Tesla Model 3')} className="hover:text-indigo-400 transition-colors">Tesla</button>
          <button onClick={() => onSearch('Nike')} className="hover:text-indigo-400 transition-colors">Nike</button>
          <button onClick={() => onSearch('Notion')} className="hover:text-indigo-400 transition-colors">Notion</button>
          <button onClick={() => onSearch('Starbucks')} className="hover:text-indigo-400 transition-colors">Starbucks</button>
        </div>
      </div>
    </section>
  );
};

export default SearchHero;
