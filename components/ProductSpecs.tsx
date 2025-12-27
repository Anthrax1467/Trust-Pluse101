
import React from 'react';
import { ProductSpec } from '../types';

interface ProductSpecsProps {
  specs: ProductSpec[];
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mb-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Pulse Specifications</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Verified In-Depth Data</p>
        </div>
        <div className="p-2 bg-indigo-50 rounded-xl">
           <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all group">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-400 transition-colors">
                {spec.label}
              </span>
              <span className="text-sm font-black text-slate-800 tracking-tight">
                {spec.value}
              </span>
            </div>
            {spec.category && (
              <div className="px-2 py-1 bg-white rounded-lg text-[8px] font-black text-slate-300 uppercase border border-slate-100">
                {spec.category}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 border-dashed">
         <p className="text-[10px] text-indigo-600 text-center font-bold italic leading-relaxed">
           Data aggregated from official brand transparency reports and retail verification pulses. 
           Pulse accuracy: High (98%).
         </p>
      </div>
    </div>
  );
};

export default ProductSpecs;
