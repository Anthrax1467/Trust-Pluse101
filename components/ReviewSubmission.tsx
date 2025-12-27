
import React, { useState } from 'react';
import { User, SocialComment, CategorizedPulse } from '../types';

interface ReviewSubmissionProps {
  user: User | null;
  onPost: (review: SocialComment) => void;
  onPromptLogin: () => void;
}

const ReviewSubmission: React.FC<ReviewSubmissionProps> = ({ user, onPost, onPromptLogin }) => {
  const [text, setText] = useState('');
  const [target, setTarget] = useState<'google' | 'website' | 'trustpulse'>('trustpulse');
  const [rating, setRating] = useState(5);
  const [isCollab, setIsCollab] = useState(false);
  const [detailedPulse, setDetailedPulse] = useState<CategorizedPulse>({
    quality: 80,
    durability: 80,
    value: 80,
    utility: 80
  });

  const isLocked = !user || !user.isVerified;
  const isBlogger = user?.isBlogger || user?.isInfluencer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    if (!text.trim()) return;

    onPost({
      user: user!.name,
      text: text,
      score: rating,
      detailedRating: detailedPulse,
      date: 'Just now',
      source: target === 'trustpulse' ? 'trustpulse' : (target === 'google' ? 'google' : 'website'),
      isVerified: true,
      isBuyer: true,
      isCollaboration: isCollab && isBlogger,
    });
    setText('');
    setIsCollab(false);
  };

  const updatePulse = (key: keyof CategorizedPulse, val: number) => {
    setDetailedPulse(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="relative group mb-12">
      {/* Verification Overlay for Unverified Users */}
      {isLocked && (
        <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/40 rounded-[3rem] border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-6 shadow-2xl rotate-3">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Expert Verification Required</h3>
          <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
            To maintain organic trust, only <span className="text-indigo-600 font-black">Verified Pulse Influencers</span> can influence the live score. 
          </p>
          <button 
            onClick={onPromptLogin}
            className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95"
          >
            Verify Pulse Identity
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      )}

      <div className={`bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl transition-opacity duration-500 ${isLocked ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg">T</div>
             <div>
                <div className="flex items-center gap-2">
                   <h3 className="text-xl font-black text-slate-800 tracking-tight">Verified Pulse Portal</h3>
                   <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-md border tracking-widest ${isBlogger ? 'bg-amber-100 text-amber-700 border-amber-200 animate-pulse' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                     {isBlogger ? 'Pulse Blogger Mode' : 'Standard Expert Mode'}
                   </span>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Authorized by Organic Intelligence</p>
             </div>
          </div>
          
          <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
             <button onClick={() => setTarget('trustpulse')} className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${target === 'trustpulse' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Pulse Feed</button>
             <button onClick={() => setTarget('google')} className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${target === 'google' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Google Pulse</button>
             <button onClick={() => setTarget('website')} className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${target === 'website' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Brand Web</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={`Submit a verified report to ${target === 'trustpulse' ? 'the Pulse community' : (target === 'google' ? 'Google Reviews' : 'the product website')}...`}
                  className="w-full p-8 rounded-[2rem] bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 min-h-[220px] transition-all resize-none text-slate-700 font-medium placeholder-slate-300 shadow-inner"
                />
                <div className="absolute top-6 right-6 flex gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-all hover:scale-125 ${star <= rating ? 'text-amber-400 drop-shadow-sm' : 'text-slate-200'}`}
                    >★</button>
                  ))}
                </div>
              </div>
              
              {isBlogger && (
                <div className="flex items-center gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                   <div className="flex-1">
                      <h4 className="text-sm font-black text-indigo-900">Official Collaboration?</h4>
                      <p className="text-[10px] text-indigo-700/60 font-bold uppercase">Mark this if you are working with the brand.</p>
                   </div>
                   <button 
                    type="button"
                    onClick={() => setIsCollab(!isCollab)}
                    className={`w-14 h-8 rounded-full p-1 transition-all ${isCollab ? 'bg-indigo-600' : 'bg-slate-200'}`}
                   >
                     <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${isCollab ? 'translate-x-6' : 'translate-x-0'}`} />
                   </button>
                </div>
              )}
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
               <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6">Categorized Authenticity Pulse</h4>
               <div className="space-y-6">
                  {(['quality', 'durability', 'value', 'utility'] as const).map(key => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{key}</span>
                         <span className="text-sm font-black text-slate-800">{detailedPulse[key]}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={detailedPulse[key]}
                        onChange={(e) => updatePulse(key, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-50">
             <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border shadow-sm ${isBlogger ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                   {user?.name?.[0] || 'V'}
                </div>
                <div>
                   <p className="text-xs font-black text-slate-800">{user?.name || 'Verified Pulse Influencer'}</p>
                   <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Organic Trust: Elite ({user?.influenceScore || 99.2}%)</p>
                </div>
             </div>

             <button
                type="submit"
                className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform active:scale-95"
             >
                Transmit Verified Pulse
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewSubmission;
