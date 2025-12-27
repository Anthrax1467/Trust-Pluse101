
import React from 'react';
import { SocialComment } from '../types';

interface ContrastReviewSectionProps {
  positive: SocialComment[];
  negative: SocialComment[];
}

const ContrastReviewSection: React.FC<ContrastReviewSectionProps> = ({ positive, negative }) => {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h3 className="text-3xl font-black text-slate-800 mb-2">The Pulse Split</h3>
        <p className="text-slate-500">Global consensus: The absolute best vs. the critical worst.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top 5 Positive - GREEN */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100 mb-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
            </div>
            <h4 className="text-lg font-black text-emerald-800 uppercase tracking-widest">Top 5 Best Reviews</h4>
          </div>
          
          <div className="space-y-4">
            {positive.slice(0, 5).map((rev, i) => (
              <div key={i} className="group bg-white p-6 rounded-[2rem] border-2 border-transparent hover:border-emerald-200 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity -mr-12 -mt-12 rounded-full"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xs">
                      #{i + 1}
                    </div>
                    <span className="font-bold text-slate-700">@{rev.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {rev.sourceUrl && (
                      <a href={rev.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase hover:bg-emerald-600 hover:text-white transition-all">
                        Source
                      </a>
                    )}
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">{rev.source}</span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic relative z-10">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Worst - RED */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-6 py-3 bg-rose-50 rounded-2xl border border-rose-100 mb-2">
            <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 3h4.017c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-1h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2.5"/></svg>
            </div>
            <h4 className="text-lg font-black text-rose-800 uppercase tracking-widest">Top 5 Worst Reviews</h4>
          </div>

          <div className="space-y-4">
            {negative.slice(0, 5).map((rev, i) => (
              <div key={i} className="group bg-white p-6 rounded-[2rem] border-2 border-transparent hover:border-rose-200 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity -mr-12 -mt-12 rounded-full"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-xs">
                      #{i + 1}
                    </div>
                    <span className="font-bold text-slate-700">@{rev.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {rev.sourceUrl && (
                      <a href={rev.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase hover:bg-rose-600 hover:text-white transition-all">
                        Source
                      </a>
                    )}
                    <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded uppercase">{rev.source}</span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed italic relative z-10">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrastReviewSection;
