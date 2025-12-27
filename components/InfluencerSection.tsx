
import React from 'react';
import { InfluencerReview } from '../types';
import SocialVideoEmbed from './SocialVideoEmbed';

interface InfluencerSectionProps {
  reviews: InfluencerReview[];
  videos: string[];
}

const InfluencerSection: React.FC<InfluencerSectionProps> = ({ reviews, videos }) => {
  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Expert Pulse</h3>
          <p className="text-slate-500 font-medium">Verified deep-dives from leading industry content creators</p>
        </div>
        <button className="text-indigo-600 font-black hover:underline uppercase text-xs tracking-widest">Explore All Media →</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-[2.5rem] text-white shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img src={`https://i.pravatar.cc/150?u=${rev.name}`} alt={rev.name} className="w-14 h-14 rounded-full border-2 border-indigo-500 p-0.5" />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-indigo-950 shadow-lg">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-lg">{rev.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-indigo-300 font-black uppercase tracking-widest">{rev.platform} Professional</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic opacity-90 group-hover:opacity-100 transition-opacity">"{rev.content}"</p>
              
              {rev.videoUrl && (
                <div className="mb-6">
                    <SocialVideoEmbed url={rev.videoUrl} />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-6 border-t border-white/10 relative z-10">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Creator Trust index</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-1000" style={{ width: `${rev.trustScore}%` }} />
                </div>
                <span className="text-sm font-black">{rev.trustScore}%</span>
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic Video Slot */}
        {videos.length > 0 && (
           <div className="relative rounded-[2.5rem] overflow-hidden group aspect-square lg:aspect-auto shadow-2xl ring-1 ring-slate-100">
             <img src={`https://picsum.photos/seed/${videos[0]}/800/800`} alt="Video thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all flex flex-col items-center justify-center p-8">
               <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-110 transition-all shadow-2xl border border-white/20">
                 <svg className="w-10 h-10 text-white fill-current translate-x-1" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
               </div>
               <div className="mt-8 text-center">
                  <span className="bg-red-600 text-[10px] font-black px-4 py-1.5 rounded-full text-white uppercase mb-4 inline-block tracking-[0.2em] shadow-lg">New Media</span>
                  <p className="text-white text-xl font-black leading-tight tracking-tight px-4 drop-shadow-md">Long-term Performance Breakdown & Teardown Analytics</p>
               </div>
             </div>
             <a href={videos[0]} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"></a>
           </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerSection;
