import React, { useState, useRef } from 'react';
import { generateBusinessAsset, fetchBusinessReputation } from '../services/geminiService';
import { BusinessListing, SocialComment } from '../types';

interface BusinessCreativeStudioProps {
  onBack: () => void;
  onSave: (biz: BusinessListing) => void;
}

const BusinessCreativeStudio: React.FC<BusinessCreativeStudioProps> = ({ onBack, onSave }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [category, setCategory] = useState('Services');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [color, setColor] = useState('#6366f1');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [verifiedReviews, setVerifiedReviews] = useState<SocialComment[]>([]);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!name) return;
    setIsGenerating(true);
    const prompt = `Premium digital business card background for "${name}" (${slogan}). Style: minimalist luxury, Category: ${category}, Palette: ${color} and white. No text in the image.`;
    const result = await generateBusinessAsset(prompt, 'card');
    if (result) setGeneratedImage(result);
    setIsGenerating(false);
    setStep(3);
  };

  const handleSaveAndPublish = () => {
    if (!name) return;
    const newBiz: BusinessListing = {
      id: Math.random().toString(36).substr(2, 9),
      businessName: name,
      slogan: slogan,
      category: category,
      description: slogan || `Verified ${category} professional on TrustPulse.`,
      location: address.split(',').pop()?.trim() || "Global",
      address: address,
      website: website,
      phone: phone,
      contact: website || phone,
      rating: 5.0,
      isVerified: true,
      image: generatedImage || `https://picsum.photos/seed/${name}/800/450`,
      verifiedReviews: verifiedReviews
    };
    onSave(newBiz);
  };

  const getShareLink = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out my new verified digital card for ${name} on TrustPulse!`);
    switch(platform) {
      case 'fb': return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'x': return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      case 'li': return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case 'wa': return `https://api.whatsapp.com/send?text=${text}%20${url}`;
      default: return '#';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button onClick={onBack} className="group flex items-center gap-3 text-slate-400 hover:text-indigo-600 font-black transition-all">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          BACK TO HUB
        </button>
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-indigo-600' : 'w-4 bg-slate-200'}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Form: The Wizard */}
        <div className="lg:col-span-5 space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Define Your Identity</h2>
              <p className="text-slate-500 font-medium">Start with the basics. We'll generate the professional pulse next.</p>
              
              <div className="space-y-4 pt-4">
                <input 
                  type="text" value={name} onChange={(e) => setName(e.target.value)} 
                  placeholder="Business Name"
                  className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none font-bold text-lg shadow-sm"
                />
                <input 
                  type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} 
                  placeholder="One-line Slogan"
                  className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none font-medium text-slate-600 shadow-sm"
                />
                <select 
                  value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none appearance-none cursor-pointer"
                >
                  <option>Services</option><option>Tech</option><option>Retail</option><option>Food & Beverage</option><option>Health</option>
                </select>
              </div>
              <button 
                onClick={() => setStep(2)} disabled={!name}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
              >
                Next: Pulse Design
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Contact & Design</h2>
              <p className="text-slate-500 font-medium">Add your reach channels and choose your theme color.</p>
              
              <div className="space-y-4 pt-4">
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website URL" className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none" />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Business Phone" className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none" />
                <div className="flex items-center gap-4 px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl">
                   <span className="text-xs font-black text-slate-400 uppercase">Theme Color</span>
                   <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 border-none bg-transparent cursor-pointer" />
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-5 border-2 border-slate-100 text-slate-400 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Back</button>
                <button 
                  onClick={handleGenerate} disabled={isGenerating}
                  className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Generate AI Pulse Card'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Ready to Publish</h2>
              <p className="text-slate-500 font-medium">Your card is verified. Share it across your social network instantly.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <a href={getShareLink('fb')} target="_blank" className="flex items-center justify-center gap-3 py-4 bg-[#1877F2] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                   Facebook
                </a>
                <a href={getShareLink('x')} target="_blank" className="flex items-center justify-center gap-3 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                   Twitter / X
                </a>
                <a href={getShareLink('li')} target="_blank" className="flex items-center justify-center gap-3 py-4 bg-[#0A66C2] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                   LinkedIn
                </a>
                <a href={getShareLink('wa')} target="_blank" className="flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
                   WhatsApp
                </a>
              </div>

              <button 
                onClick={handleSaveAndPublish}
                className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs mt-8"
              >
                Register & Save to Hub
              </button>
              <button onClick={() => setStep(2)} className="w-full text-center text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-indigo-600">Redesign Card</button>
            </div>
          )}
        </div>

        {/* Right Preview: The Digital Card */}
        <div className="lg:col-span-7">
          <div className="sticky top-32">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Live Digital Preview
             </div>

             <div 
              ref={cardRef}
              className="relative w-full aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02]"
              style={{ backgroundColor: color }}
             >
                {generatedImage ? (
                  <img src={generatedImage} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20" />
                )}
                
                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col justify-between text-white backdrop-blur-[2px]">
                   <div className="flex justify-between items-start">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                         <span className="text-3xl font-black italic">{name?.[0] || 'T'}</span>
                      </div>
                      <div className="px-4 py-1.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-white/20">
                         Verified Pulse Card
                      </div>
                   </div>

                   <div className="space-y-2">
                      <h3 className="text-4xl font-black tracking-tighter leading-none">{name || 'Your Brand Name'}</h3>
                      <p className="text-white/60 text-lg font-medium italic">{slogan || 'Your Brand Vision Goes Here'}</p>
                   </div>

                   <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10 text-[10px] font-black uppercase tracking-widest opacity-80">
                      <div className="flex items-center gap-3">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                         {website || 'www.brand.com'}
                      </div>
                      <div className="flex items-center gap-3">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                         {phone || '+1 000 000 000'}
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => alert("Image download would be processed here via canvas render.")}
                  className="flex-1 py-4 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  Download HQ Image
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCreativeStudio;