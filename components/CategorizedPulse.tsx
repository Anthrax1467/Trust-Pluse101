
import React from 'react';
import { CategorizedPulse as CategorizedPulseType } from '../types';

interface CategorizedPulseProps {
  pulse: CategorizedPulseType;
}

const CategorizedPulse: React.FC<CategorizedPulseProps> = ({ pulse }) => {
  const pillars = [
    { label: 'Quality', score: pulse.quality, color: 'bg-indigo-600', icon: '💎', description: 'Materials & Finish' },
    { label: 'Durability', score: pulse.durability, color: 'bg-amber-600', icon: '🛡️', description: 'Long-term Pulse' },
    { label: 'Value', score: pulse.value, color: 'bg-emerald-600', icon: '💰', description: 'Price/Performance' },
    { label: 'Utility', score: pulse.utility, color: 'bg-violet-600', icon: '⚙️', description: 'Core Functional' },
  ];

  return (
    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm mb-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Pillars of Authenticity</h3>
          <p className="text-slate-500 font-medium">Verified performance benchmarks across 4 key dimensions.</p>
        </div>
        <div className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
           Live Accuracy: 99.4%
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, i) => (
          <div key={i} className="group bg-slate-50 rounded-[2rem] p-6 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{pillar.icon}</span>
              <span className="text-2xl font-black text-slate-800 tracking-tighter">{pillar.score}%</span>
            </div>
            <div className="space-y-1 mb-6">
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{pillar.label}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pillar.description}</p>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
               <div 
                  className={`h-full ${pillar.color} transition-all duration-1000 ease-out`} 
                  style={{ width: `${pillar.score}%` }}
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorizedPulse;
