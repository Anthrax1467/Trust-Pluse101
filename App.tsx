
import React, { useState } from 'react';
import SearchHero from './components/SearchHero';
import StatsDashboard from './components/StatsDashboard';
import ComparisonGrid from './components/ComparisonGrid';
import MultiPlatformPulse from './components/MultiPlatformPulse';
import CategorizedPulse from './components/CategorizedPulse';
import MarketplaceSidebar from './components/MarketplaceSidebar';
import BudgetSaverSidebar from './components/BudgetSaverSidebar';
import BusinessDashboard from './components/BusinessDashboard';
import InfluencerHub from './components/InfluencerHub';
import InfluencerSection from './components/InfluencerSection';
import ReviewSubmission from './components/ReviewSubmission';
import InfluencerVerification from './components/InfluencerVerification';
import CollabHub from './components/CollabHub';
import AuthView from './components/AuthView';
import ProductSpecs from './components/ProductSpecs';
import BrandProfile from './components/BrandProfile';
import EventPulse from './components/EventPulse';
import ChatBot from './components/ChatBot';
import ProductKnowledgeCard from './components/ProductKnowledgeCard';
import { fetchProductInsights, classifyQuery, fetchBrandInsight } from './services/geminiService';
import { ProductInsight, User, BusinessListing, BrandInsight, SocialComment } from './types';

const MOCK_BUSINESSES: BusinessListing[] = [
  {
    id: '1',
    businessName: "EcoTech Solutions",
    category: "Services",
    description: "Helping brands transition to net-zero logistics and manufacturing.",
    slogan: "Clean Code, Green Future",
    location: "Austin, TX",
    address: "123 Solar Way, Austin, TX",
    phone: "+1 512-555-0199",
    website: "https://ecotech.io",
    contact: "contact@ecotech.io",
    rating: 4.8,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: '2',
    businessName: "Lumina Dental",
    category: "Health",
    description: "Premium cosmetic and general dentistry with AI-driven diagnostics.",
    slogan: "A Brighter Pulse for Your Smile",
    location: "New York, NY",
    address: "55 Madison Ave, New York, NY",
    phone: "+1 212-555-0144",
    website: "https://lumina.dental",
    contact: "hello@lumina.dental",
    rating: 4.9,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
  }
];

const App: React.FC = () => {
  const [insight, setInsight] = useState<ProductInsight | null>(null);
  const [localReviews, setLocalReviews] = useState<SocialComment[]>([]);
  const [brandInsight, setBrandInsight] = useState<BrandInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [view, setView] = useState<'marketplace' | 'business' | 'influencers' | 'creator-hub' | 'collab-hub'>('marketplace');
  const [businesses, setBusinesses] = useState<BusinessListing[]>(MOCK_BUSINESSES);

  const handleSearch = async (query: string) => {
    setView('marketplace');
    setIsLoading(true);
    setInsight(null);
    setBrandInsight(null);
    setLocalReviews([]);
    
    try {
      const type = await classifyQuery(query);
      
      if (type === 'brand') {
        const data = await fetchBrandInsight(query);
        if (data) setBrandInsight(data);
      } else {
        const data = await fetchProductInsights(query);
        if (data) {
          setInsight(data);
        }
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBusiness = (newBiz: BusinessListing) => {
    setBusinesses(prev => [newBiz, ...prev]);
  };

  const handlePostReview = (review: SocialComment) => {
    setLocalReviews(prev => [review, ...prev]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setInsight(null); setBrandInsight(null); setView('marketplace'); window.scrollTo({ top: 0, behavior: 'smooth' });}}>
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-200">T</div>
              <span className="text-2xl font-black text-slate-800 tracking-tighter">TrustPulse<span className="text-indigo-600">.</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setView('marketplace')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'marketplace' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-800'}`}>Marketplace</button>
              <button onClick={() => setView('business')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'business' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-800'}`}>Business Hub</button>
              <button onClick={() => setView('influencers')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'influencers' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-800'}`}>Influencers</button>
              <button onClick={() => setView('collab-hub')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'collab-hub' ? 'text-amber-600 font-black' : 'text-slate-400 hover:text-slate-800'}`}>Collab Hub</button>
              <button onClick={() => setView('creator-hub')} className={`text-xs font-black uppercase tracking-widest transition-all ${view === 'creator-hub' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-800'}`}>Creator Hub</button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className={`text-[10px] font-black uppercase ${currentUser.isInfluencer ? 'text-amber-500' : 'text-indigo-500'}`}>
                    {currentUser.isInfluencer ? 'Pulse Influencer' : currentUser.isBlogger ? 'Pulse Blogger' : 'Verified User'}
                  </span>
                  <span className="text-xs font-black text-slate-800">{currentUser.name}</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border ring-4 ${currentUser.isInfluencer ? 'bg-amber-50 text-amber-600 border-amber-100 ring-amber-50/50' : 'bg-indigo-50 text-indigo-600 border-indigo-100 ring-indigo-50/50'}`}>
                  {currentUser.name?.[0] || 'U'}
                </div>
                <button onClick={() => setCurrentUser(null)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">Sign In</button>
            )}
          </div>
        </div>
      </nav>

      {view === 'marketplace' && (
        <>
          <SearchHero onSearch={handleSearch} isLoading={isLoading} />
          <main className="max-w-7xl mx-auto px-4 py-20 -mt-16 relative z-20">
            {insight ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                  <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-2xl border border-white animate-in slide-in-from-bottom-12 duration-1000">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-lg border border-indigo-100 tracking-widest">Marketplace Analysis</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-400 text-xs font-bold">{insight.category}</span>
                        </div>
                        <h2 className="text-6xl font-black text-slate-800 mb-6 tracking-tighter leading-none">{insight.name}</h2>
                        <p className="text-slate-500 text-xl leading-relaxed italic">"{insight.description}"</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 text-center">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pulse Score</p>
                          <p className="text-2xl font-black text-slate-800 tracking-tight">{insight.brandScore}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-20">
                      <ComparisonGrid prices={insight.priceComparison || []} similar={insight.similarProducts || []} />
                    </div>
                    
                    <div className="pt-10 border-t border-slate-50">
                      <StatsDashboard stats={insight.sentiment} brandScore={insight.brandScore} />
                    </div>
                    
                    {insight.isConsumable && (
                      <ProductKnowledgeCard 
                        nutrition={insight.nutritionalFacts} 
                        recipes={insight.recipes} 
                        pairings={insight.pairings} 
                        isConsumable={true}
                      />
                    )}

                    {insight.categorizedPulse && (
                       <CategorizedPulse pulse={insight.categorizedPulse} />
                    )}

                    <ReviewSubmission 
                      user={currentUser} 
                      onPost={handlePostReview} 
                      onPromptLogin={() => setShowAuthModal(true)} 
                    />

                    <MultiPlatformPulse 
                      relevant={[...localReviews, ...(insight.topRelevantReviews || [])]} 
                      positive={insight.topPositiveReviews || []} 
                      negative={insight.topNegativeReviews || []} 
                      totalAnalyzed={insight.totalVerifiedReviews}
                    />

                    {insight.influencerReviews && insight.influencerReviews.length > 0 && (
                      <InfluencerSection 
                        reviews={insight.influencerReviews} 
                        videos={insight.videoReviews || []} 
                      />
                    )}

                    {insight.specifications && insight.specifications.length > 0 && (
                      <div className="mt-20">
                        <ProductSpecs specs={insight.specifications} />
                      </div>
                    )}

                    {insight.events && insight.events.length > 0 && (
                      <div className="mt-20">
                        <EventPulse events={insight.events} />
                      </div>
                    )}

                    {!insight.isConsumable && (
                      <ProductKnowledgeCard 
                        nutrition={insight.nutritionalFacts} 
                        recipes={insight.recipes} 
                        pairings={insight.pairings} 
                        isConsumable={false}
                      />
                    )}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <BudgetSaverSidebar alternatives={insight.budgetAlternatives || []} />
                  <MarketplaceSidebar products={insight.similarProducts || []} />
                </div>
              </div>
            ) : brandInsight ? (
              <BrandProfile insight={brandInsight} />
            ) : !isLoading && (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-4">
                  <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                     <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                     </div>
                     <h4 className="text-xl font-black text-slate-800 mb-4">Community Sentiment</h4>
                     <p className="text-slate-500 text-sm leading-relaxed">We scrape real opinions from Reddit communities and forums to tell you the truth behind the marketing hype.</p>
                  </div>
                  <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                     <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                     </div>
                     <h4 className="text-xl font-black text-slate-800 mb-4">Trust Scoring</h4>
                     <p className="text-slate-500 text-sm leading-relaxed">Our AI models calculate a unique 0-100 Pulse Score based on product stability, support quality, and user retention.</p>
                  </div>
                  <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                     <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                     </div>
                     <h4 className="text-xl font-black text-slate-800 mb-4">Smart Alternatives</h4>
                     <p className="text-slate-500 text-sm leading-relaxed">Instantly find cheaper, better, or simpler alternatives categorized by Luxury, Comfort, or Casual workflows.</p>
                  </div>
               </div>
            )}
          </main>
        </>
      )}

      {view === 'business' && <BusinessDashboard businesses={businesses} onAddBusiness={handleAddBusiness} />}
      {view === 'influencers' && <InfluencerHub />}
      {view === 'collab-hub' && <CollabHub user={currentUser} />}
      {view === 'creator-hub' && (
        currentUser ? (
          <InfluencerVerification user={currentUser} onVerify={(u) => setCurrentUser(u)} />
        ) : (
          <div className="max-w-xl mx-auto py-40 text-center px-4">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
             </div>
             <h2 className="text-3xl font-black text-slate-800 mb-4">Creator Hub is Restricted</h2>
             <p className="text-slate-500 mb-10">Sign in to apply for professional blogger status and unlock influence analytics.</p>
             <button onClick={() => setShowAuthModal(true)} className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all">Sign In to Continue</button>
          </div>
        )
      )}
      
      <ChatBot />
      {showAuthModal && <AuthView onLogin={handleLogin} onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default App;
