
import React, { useState } from 'react';
import { User } from '../types';

interface InfluencerVerificationProps {
  user: User;
  onVerify: (updatedUser: User) => void;
}

const InfluencerVerification: React.FC<InfluencerVerificationProps> = ({ user, onVerify }) => {
  const [step, setStep] = useState(1);
  const [socialHandle, setSocialHandle] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    // Mocking AI verification process
    setTimeout(() => {
      onVerify({
        ...user,
        isBlogger: true,
        isInfluencer: true,
        influenceScore: 88,
      });
      setIsVerifying(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 animate-in fade-in duration-700">
      <div className="bg-slate-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>
        </div>

        {step === 1 && (
          <div className="relative z-10 text-center py-10">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight">Apply for Pulse Status</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
              Become a <span className="text-indigo-400 font-black">Verified TrustPulse Blogger</span>. Share professional insights and collaborate directly with brands.
            </p>
            <button 
              onClick={() => setStep(2)}
              className="px-12 py-5 bg-indigo-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
            >
              Start Application
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2">Connect Your Influence</h3>
            <p className="text-slate-400 mb-8">Link your primary content platform for our AI to scan your authenticity pulse.</p>
            
            <div className="space-y-6 max-w-md">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Platform</label>
                <div className="flex gap-2">
                  {['YouTube', 'Instagram', 'TikTok', 'Blog'].map(p => (
                    <button 
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border transition-all ${platform === p ? 'bg-indigo-600 border-indigo-500 shadow-lg' : 'bg-white/5 border-white/10 text-slate-400'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Handle or URL</label>
                <input 
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-white font-bold"
                />
              </div>

              <button 
                onClick={handleVerify}
                disabled={!socialHandle || isVerifying}
                className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                    Scanning Identity...
                  </>
                ) : 'Verify Pulse blogger'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="relative z-10 text-center py-10">
             <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
             </div>
             <h2 className="text-4xl font-black mb-2 tracking-tight text-emerald-400">Authenticated!</h2>
             <p className="text-slate-400 text-lg mb-10">You are now a <strong>TrustPulse Influencer</strong>. Your reviews can now be marked as official brand collaborations.</p>
             
             <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto mb-10">
                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                   <p className="text-3xl font-black text-indigo-400">{user.influenceScore}%</p>
                   <p className="text-[9px] font-black uppercase text-slate-500">Reach Rank</p>
                </div>
                <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
                   <p className="text-3xl font-black text-emerald-400">Elite</p>
                   <p className="text-[9px] font-black uppercase text-slate-500">Trust Tier</p>
                </div>
             </div>

             <button 
              onClick={() => window.location.reload()} // Just refresh to reset view, simplified
              className="px-12 py-4 bg-indigo-600 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl"
             >
               Go to Hub
             </button>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 mb-2">Write for Impact</h4>
            <p className="text-slate-500 text-sm">Long-form experience posts are weighted 3x in the final Brand Pulse Score.</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 mb-2">Mark Collaborations</h4>
            <p className="text-slate-500 text-sm">Always flag sponsored content. Influencers who disclose have 40% higher Trust Index.</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-800 mb-2">Creator Perks</h4>
            <p className="text-slate-500 text-sm">Early access to brand releases and priority scraping for your personal content.</p>
         </div>
      </div>
    </div>
  );
};

export default InfluencerVerification;
