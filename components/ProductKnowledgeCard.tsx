
import React from 'react';
import { NutritionalFacts, Recipe } from '../types';

interface ProductKnowledgeCardProps {
  nutrition?: NutritionalFacts;
  recipes?: Recipe[];
  pairings?: string[];
  isConsumable?: boolean;
}

const ProductKnowledgeCard: React.FC<ProductKnowledgeCardProps> = ({ nutrition, recipes, pairings, isConsumable }) => {
  if (!nutrition && (!recipes || recipes.length === 0) && (!pairings || pairings.length === 0)) return null;

  const title = isConsumable ? "Health & Nutrition Pulse" : "Safety & Ergonomics Pulse";
  const icon = isConsumable ? (
    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  ) : (
    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm2 10H10v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"/></svg>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Nutrition & Health Pulse */}
      {nutrition && (
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
             {icon}
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
            {isConsumable && nutrition.calories && (
              <div className="px-5 py-2 bg-indigo-600 text-white rounded-2xl shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-widest block opacity-70 leading-none">Energy</span>
                <span className="text-xl font-black">{nutrition.calories} <small className="text-xs font-bold">kcal</small></span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Macros / Safety Facts Grid */}
            <div className="grid grid-cols-2 gap-4">
              {nutrition.macros?.map((macro, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{macro.label}</p>
                  <p className="text-lg font-black text-slate-800">{macro.value}</p>
                </div>
              ))}
            </div>

            {/* Benefits & Warnings */}
            <div className="space-y-4">
              <div className="p-5 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                   {isConsumable ? "Key Benefits" : "Compliance & Stability"}
                </h4>
                <ul className="space-y-2">
                  {nutrition.healthBenefits.map((b, i) => (
                    <li key={i} className="text-xs font-bold text-emerald-800 leading-snug tracking-tight flex items-start gap-2">
                       <span className="mt-1 w-1 h-1 bg-emerald-400 rounded-full flex-shrink-0"></span>
                       {b}
                    </li>
                  ))}
                </ul>
              </div>
              
              {nutrition.healthWarnings.length > 0 && (
                <div className="p-5 bg-rose-50 rounded-[2rem] border border-rose-100">
                  <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/></svg>
                     {isConsumable ? "Pulse Critic Warnings" : "Potential Risks"}
                  </h4>
                  <ul className="space-y-2">
                    {nutrition.healthWarnings.map((w, i) => (
                      <li key={i} className="text-xs font-bold text-rose-800 leading-snug tracking-tight flex items-start gap-2">
                         <span className="mt-1 w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></span>
                         {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recipes (Only for consumables usually) */}
      {recipes && recipes.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col h-full">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Component Blueprint</h3>
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">
                    {recipe.servings || 'Details'}
                  </span>
               </div>
               <h4 className="text-xl font-black text-indigo-600 mb-6">{recipe.title}</h4>
               <div className="space-y-8 flex-1">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Elements</p>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.map((ing, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">{ing}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Usage/Preparation Steps</p>
                    <div className="space-y-4">
                      {recipe.steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-[10px] flex-shrink-0 border border-indigo-100">{i+1}</span>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Pairings */}
      {pairings && pairings.length > 0 && (
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
               <div className="p-2 bg-indigo-500 rounded-xl text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v-3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
               </div>
               {isConsumable ? "Flavour Pairings" : "System Integrations"}
            </h3>
            <div className="flex flex-wrap gap-4">
               {pairings.map((p, i) => (
                 <div key={i} className="px-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] hover:bg-white/10 transition-all cursor-default group">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 group-hover:scale-110 transition-transform">Recommended Partner</p>
                    <p className="text-xl font-black tracking-tight">{p}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductKnowledgeCard;
