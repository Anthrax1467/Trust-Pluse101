
import React from 'react';
import { SocialComment } from '../types';

interface ReviewFeedProps {
  comments: SocialComment[];
  source: 'reddit' | 'google' | 'trustpulse';
}

const ReviewFeed: React.FC<ReviewFeedProps> = ({ comments, source }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${source === 'reddit' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
        <h3 className="text-xl font-black capitalize text-slate-800 tracking-tight">
          {source} Community Pulse
        </h3>
      </div>
      <div className="space-y-4">
        {comments?.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-800 text-sm">@{c.user}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{c.date}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic">"{c.text}"</p>
            {c.sourceUrl && (
              <a 
                href={c.sourceUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="mt-4 inline-block text-[10px] font-bold text-indigo-500 hover:text-indigo-700 uppercase"
              >
                View Thread →
              </a>
            )}
          </div>
        ))}
        {(!comments || comments.length === 0) && (
          <p className="text-slate-400 italic text-sm">No recent discussions found on {source}.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewFeed;
