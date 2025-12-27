
import React from 'react';
import { PulseEvent } from '../types';

interface EventPulseProps {
  events: PulseEvent[];
}

const EventPulse: React.FC<EventPulseProps> = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Event Intelligence</h3>
          <p className="text-slate-500 font-medium italic">Verified webinars, launches, and workshops.</p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-2xl flex items-center gap-3 border border-indigo-100">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Global Calendar Sync</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {events.map((event) => (
          <div key={event.id} className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                  event.status === 'live' ? 'bg-rose-600 text-white animate-pulse' :
                  event.status === 'upcoming' ? 'bg-indigo-600 text-white' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {event.status === 'live' && '● '} {event.status}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{event.platform}</span>
              </div>
              
              <h4 className="text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{event.title}</h4>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">{event.date}</p>
              
              <p className="text-slate-500 text-xs leading-relaxed mb-6 italic line-clamp-3">"{event.description}"</p>
              
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-6">
                 <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1">Pulse Recommendation</p>
                 <p className="text-[11px] text-slate-700 font-medium leading-relaxed">{event.recommendationReason}</p>
              </div>
            </div>

            <a 
              href={event.link} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
            >
              {event.status === 'live' ? 'Join Stream Now' : event.status === 'upcoming' ? 'Set Reminder' : 'Watch On-Demand'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPulse;
