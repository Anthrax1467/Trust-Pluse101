
import React, { useState } from 'react';
import { SocialComment } from '../types';

interface MultiPlatformPulseProps {
  relevant: SocialComment[];
  positive: SocialComment[];
  negative: SocialComment[];
  totalAnalyzed?: number; // Added optional prop
}

const MultiPlatformPulse: React.FC<MultiPlatformPulseProps> = ({ relevant, positive, negative, totalAnalyzed }) => {
  const [tab, setTab] = useState<'relevant' | 'high' | 'low'>('relevant');

  const activeReviews = tab === 'relevant' ? relevant : tab === 'high' ? positive : negative;

  const platformIcons: Record<string, React.ReactNode> = {
    reddit: <div className="bg-orange-500 p-1 rounded-md text-white"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.051l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.21.06.42.06.633 0 3.036-3.633 5.5-8.107 5.5-4.472 0-8.106-2.464-8.106-5.5 0-.213.022-.426.06-.633a1.746 1.746 0 0 1-1.054-1.597c0-.968.786-1.754 1.754-1.754.463 0 .875.18 1.185.476 1.144-.806 2.7-.1.35 4.414-1.42.305-1.01.147-1.126.147h-.01z"/></svg></div>,
    youtube: <div className="bg-red-600 p-1 rounded-md text-white"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></div>,
    google: <div className="bg-blue-500 p-1 rounded-md text-white"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h4.78c-.19 1.61-1.3 2.95-3.28 3.28-2.11.35-4.31-.58-5.38-2.44-1.07-1.87-1.07-4.13 0-6 1.07-1.87 3.27-2.79 5.38-2.44 1.1.18 2.08.79 2.74 1.68l2.5-2.5c-1.42-1.32-3.29-2.12-5.24-2.12-4.42 0-8 3.58-8 8s3.58 8 8 8c4.42 0 8-3.58 8-8 0-.47-.04-.94-.12-1.4H12.48z"/></svg></div>,
    yelp: <div className="bg-red-500 p-1 rounded-md text-white"><span className="text-[10px] font-black italic">Y</span></div>,
    ubereats: <div className="bg-black p-1 rounded-md text-emerald-400"><span className="text-[8px] font-black">UE</span></div>,
    tripadvisor: <div className="bg-emerald-500 p-1 rounded-md text-white"><span className="text-[10px] font-black">TA</span></div>,
    amazon: <div className="bg-amber-500 p-1 rounded-md text-slate-900 shadow-sm"><span className="text-[8px] font-black uppercase tracking-tighter">AMZN</span></div>,
    ebay: <div className="bg-blue-600 p-1 rounded-md text-white shadow-sm flex items-center gap-0.5"><span className="text-[7px] font-black italic">e</span><span className="text-[7px] font-black italic text-yellow-400">b</span><span className="text-[7px] font-black italic text-red-500">a</span><span className="text-[7px] font-black italic text-emerald-400">y</span></div>,
    pinterest: <div className="bg-rose-600 p-1 rounded-md text-white shadow-sm"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.259 7.929-7.259 4.162 0 7.398 2.965 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C24.02 5.362 18.643 0 12.017 0z"/></svg></div>,
    website: <div className="bg-slate-700 p-1 rounded-md text-white"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg></div>,
    trustpulse: <div className="bg-indigo-600 p-1 rounded-md text-white font-black italic text-[8px] flex items-center justify-center">T</div>
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm mb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Multi-Platform Pulse</h3>
            {totalAnalyzed && (
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-lg border border-indigo-100 shadow-sm">
                {totalAnalyzed.toLocaleString()} Sources Scanned
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium">Aggregated evidence across retail, hospitality, search, and social channels.</p>
        </div>
        
        <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
          <button 
            onClick={() => setTab('relevant')}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'relevant' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >Relevant</button>
          <button 
            onClick={() => setTab('high')}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'high' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >High Rated</button>
          <button 
            onClick={() => setTab('low')}
            className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tab === 'low' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >Critical</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeReviews.length > 0 ? activeReviews.map((rev, i) => (
          <div key={i} className={`group p-6 rounded-[2rem] bg-slate-50/50 border transition-all duration-300 ${rev.isCollaboration ? 'border-amber-200 bg-amber-50/30 ring-2 ring-amber-100' : rev.source === 'trustpulse' ? 'border-indigo-100 bg-white shadow-md ring-1 ring-indigo-50' : 'border-slate-100 hover:border-indigo-100 hover:bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {platformIcons[rev.source] || platformIcons.website}
                <div className="flex flex-col">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-800 tracking-tight">@{rev.user}</span>
                      {rev.isCollaboration ? (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-indigo-600 text-white text-[7px] font-black uppercase rounded-md shadow-sm flex items-center gap-1">
                          TrustPulse Influencer
                        </span>
                      ) : rev.isVerified && (
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[7px] font-black uppercase rounded-md border border-indigo-100">Verified Expert</span>
                      )}
                   </div>
                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Via {rev.source}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, star) => (
                  <span key={star} className={`text-[10px] ${star < rev.score ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
                ))}
              </div>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed italic mb-4">"{rev.text}"</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
              <span className="text-[9px] font-bold text-slate-400 uppercase">{rev.date}</span>
              {rev.sourceUrl && (
                <a href={rev.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest">View Source ↗</a>
              )}
            </div>
          </div>
        )) : (
          <div className="col-span-2 py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">No data identified for this segment yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiPlatformPulse;
