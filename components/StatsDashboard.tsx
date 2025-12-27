
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { SentimentStats } from '../types';

interface StatsDashboardProps {
  stats: SentimentStats;
  brandScore: number;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, brandScore }) => {
  const pieData = [
    { name: 'Positive', value: stats.positive || 0, color: '#10B981' },
    { name: 'Neutral', value: stats.neutral || 0, color: '#F59E0B' },
    { name: 'Negative', value: stats.negative || 0, color: '#EF4444' },
  ];

  const ratingPercentage = ((stats.averageRating || 0) / 5) * 100;

  return (
    <div className="space-y-6 mb-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rating Gauge */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center transition-all hover:shadow-xl">
          <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mb-2">Aggregate Pulse</h3>
          <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-4">Sample Size: {stats.totalReviewsAnalyzed?.toLocaleString() || '---'} Reviews</p>
          <div className="relative w-44 h-44">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="88" cy="88" r="78" fill="transparent" stroke="#F1F5F9" strokeWidth="14" />
              <circle
                cx="88" cy="88" r="78"
                fill="transparent"
                stroke="url(#gradientRating)"
                strokeWidth="14"
                strokeDasharray={490}
                strokeDashoffset={490 - (490 * ratingPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradientRating" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#818CF8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-800 tracking-tighter">{(stats.averageRating || 0).toFixed(1)}</span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Global Rating</span>
            </div>
          </div>
          <div className="mt-6 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className={`h-6 w-6 transition-all duration-500 ${s <= Math.round(stats.averageRating || 0) ? 'text-yellow-400 scale-110' : 'text-slate-100'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Sentiment Mix Pie */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 h-[380px] transition-all hover:shadow-xl">
          <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mb-4">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={75}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Brand Trust Score */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col transition-all hover:shadow-xl">
          <h3 className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] mb-4">Brand Integrity Score</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative mb-8">
                <div className={`text-7xl font-black tracking-tighter transition-colors ${brandScore > 80 ? 'text-emerald-500' : 'text-indigo-600'}`}>
                    {brandScore}%
                </div>
                <div className="absolute -top-2 -right-6">
                    <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-black italic border border-indigo-100 shadow-sm animate-bounce">i</div>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-bold text-center max-w-[180px] leading-relaxed">Verified Consistency across {stats.totalReviewsAnalyzed ? 'Global Platforms' : 'Market Scans'}</p>
              <div className="mt-8 w-full px-4">
                  <div className="w-full bg-slate-50 rounded-full h-4 p-1 border border-slate-100">
                      <div 
                          className="bg-gradient-to-r from-indigo-500 to-indigo-300 h-full rounded-full transition-all duration-[1.5s] ease-out shadow-sm" 
                          style={{ width: `${brandScore}%` }}
                      />
                  </div>
              </div>
          </div>
        </div>
      </div>

      {/* Historical Trend Composed Chart */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-xl">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-slate-800 font-black text-xl tracking-tight">Sentiment Trajectory</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">6-Month Pulse Evolution</p>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#EF4444] rounded-full"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Friction</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-5 h-[2px] bg-indigo-500"></span>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Net Pulse Trend</span>
                </div>
            </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={stats.history || []}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} 
                dy={15}
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#F8FAFC' }}
                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '1.5rem' }}
                itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
              />
              <Bar 
                dataKey="positive" 
                stackId="a" 
                fill="#10B981" 
                radius={[0, 0, 0, 0]} 
                barSize={40}
              />
              <Bar 
                dataKey="negative" 
                stackId="a" 
                fill="#EF4444" 
                radius={[10, 10, 0, 0]} 
                barSize={40}
              />
              <Line 
                type="monotone" 
                dataKey="netScore" 
                stroke="#6366F1" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-center gap-12">
            <div className="text-center">
                <div className="text-xl font-black text-slate-800">Stable</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trend Status</div>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="text-center">
                <div className="text-xl font-black text-emerald-500">Upward</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sentiment Velocity</div>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="text-center">
                <div className="text-xl font-black text-slate-800">High</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Confidence</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
