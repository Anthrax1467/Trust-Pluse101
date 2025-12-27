
import React, { useState, useMemo } from 'react';
import { BusinessListing } from '../types';
import BusinessCreativeStudio from './BusinessCreativeStudio';

interface BusinessDashboardProps {
  businesses: BusinessListing[];
  onAddBusiness: (biz: BusinessListing) => void;
}

const CATEGORIES = [
  { name: 'All', icon: '🌐' },
  { name: 'Services', icon: '🛠️' },
  { name: 'Tech', icon: '💻' },
  { name: 'Food & Beverage', icon: '🍕' },
  { name: 'Health', icon: '🏥' },
  { name: 'Legal', icon: '⚖️' },
  { name: 'Finance', icon: '💰' }
];

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ businesses, onAddBusiness }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showStudio, setShowStudio] = useState(false);
  const [bookingBiz, setBookingBiz] = useState<BusinessListing | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter(biz => {
      const matchesSearch = biz.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            biz.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || biz.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchTerm, activeCategory]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setBookingBiz(null);
      setIsBooked(false);
    }, 2000);
  };

  if (showStudio) {
    return (
      <BusinessCreativeStudio 
        onBack={() => setShowStudio(false)} 
        onSave={(biz) => {
          onAddBusiness(biz);
          setShowStudio(false);
        }} 
      />
    );
  }

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Directory Header */}
      <div className="mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-6xl font-black text-slate-800 tracking-tighter leading-none">
              The <span className="text-indigo-600">Yellow</span> Pulse.
            </h2>
            <p className="text-slate-500 font-medium mt-4 text-lg">Verified global business directory and appointment hub.</p>
          </div>
          <button 
            onClick={() => setShowStudio(true)}
            className="px-10 py-5 bg-indigo-600 text-white font-black rounded-[2rem] shadow-2xl hover:bg-indigo-700 transition-all flex items-center gap-3 active:scale-95 group"
          >
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-90 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
            </div>
            Publish Your Card
          </button>
        </div>

        {/* Directory Controls */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative group">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies, services or skills..."
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-indigo-500 outline-none font-bold text-slate-700 shadow-xl transition-all"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 whitespace-nowrap transition-all border ${
                  activeCategory === cat.name 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-100 hover:text-indigo-600'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredBusinesses.map((biz) => (
          <div key={biz.id} className="group bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500">
            {/* Visual Header */}
            <div className="aspect-[16/9] relative overflow-hidden bg-slate-900">
              <img src={biz.image} alt={biz.businessName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/20">
                  {biz.category}
                </span>
                {biz.isVerified && (
                  <div className="px-3 py-1.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl flex items-center gap-1.5 border border-white/20">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    Elite
                  </div>
                )}
              </div>

              <div className="absolute bottom-6 left-8 right-8 text-white">
                 <h3 className="text-3xl font-black tracking-tighter leading-none mb-2">{biz.businessName}</h3>
                 <p className="text-white/70 text-sm font-medium italic line-clamp-1">{biz.slogan}</p>
              </div>
            </div>

            {/* Structured Details */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pulse Rating</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-black text-slate-800">{biz.rating}</span>
                      <span className="text-amber-400 text-xs">★★★★★</span>
                    </div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Availability</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-black text-emerald-600 uppercase">Available</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone Direct</p>
                    <a href={`tel:${biz.phone}`} className="text-sm font-black text-slate-800 hover:text-indigo-600">{biz.phone || '+1 555-PULSE'}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pulse HQ Address</p>
                    <p className="text-sm font-black text-slate-800">{biz.address || biz.location}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setBookingBiz(biz)}
                  className="flex-[2] py-5 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 shadow-xl transition-all active:scale-95"
                >
                  Book Appointment
                </button>
                <a 
                  href={biz.website || '#'} target="_blank"
                  className="flex-1 py-5 border-2 border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all"
                >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingBiz && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setBookingBiz(null)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            {isBooked ? (
              <div className="p-16 text-center animate-in fade-in">
                 <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                 </div>
                 <h3 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter">Pulse Confirmed!</h3>
                 <p className="text-slate-500 font-medium italic">Appointment scheduled with {bookingBiz.businessName}.</p>
              </div>
            ) : (
              <>
                <div className="bg-indigo-600 p-10 text-white flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter">Request Appointment</h3>
                    <p className="text-indigo-200 font-medium mt-1">{bookingBiz.businessName}</p>
                  </div>
                  <button onClick={() => setBookingBiz(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                <form onSubmit={handleBookingSubmit} className="p-10 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Date</label>
                      <input type="date" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Time</label>
                      <select required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-indigo-500 appearance-none">
                        <option>09:00 AM</option>
                        <option>11:00 AM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Service Request / Notes</label>
                    <textarea 
                      placeholder="Briefly describe what you need..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium outline-none focus:border-indigo-500 h-32 resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-6 bg-indigo-600 text-white font-black text-lg rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95">
                    Sync Appointment Pulse
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default BusinessDashboard;
