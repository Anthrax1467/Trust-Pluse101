
import React, { useState } from 'react';
import { BlogPost, User } from '../types';
import SocialVideoEmbed from './SocialVideoEmbed';

interface BlogPortalProps {
  user: User | null;
  blogs: BlogPost[];
  onPostBlog: (blog: BlogPost) => void;
  onPromptLogin: () => void;
}

const BlogPortal: React.FC<BlogPortalProps> = ({ user, blogs, onPostBlog, onPromptLogin }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onPromptLogin();
      return;
    }
    const newBlog: BlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author: user.name,
      content,
      category,
      date: 'Just now',
      isVerified: user.isVerified,
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      likes: 0,
      videoUrl: videoUrl.trim() || undefined
    };
    onPostBlog(newBlog);
    setIsWriting(false);
    setTitle('');
    setContent('');
    setVideoUrl('');
  };

  if (isWriting) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 animate-in fade-in slide-in-from-bottom-8">
        <button onClick={() => setIsWriting(false)} className="mb-8 text-slate-500 font-bold flex items-center gap-2 hover:text-indigo-600 group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Community
        </button>
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
          <h2 className="text-4xl font-black mb-2 text-slate-800 tracking-tight">Write Organic Experience</h2>
          <p className="text-slate-500 mb-10">Share a detailed, honest story about a product or service you've used.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Story Title</label>
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. My 6-month journey with the iPhone 15 Pro..."
                  className="w-full text-2xl font-black p-4 border border-slate-100 rounded-2xl bg-slate-50/50 focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-200"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 appearance-none"
                  >
                    <option>Tech</option>
                    <option>Lifestyle</option>
                    <option>Finance</option>
                    <option>Travel</option>
                    <option>SaaS</option>
                  </select>
                </div>
                {user?.isVerified && (
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Social Video Link (Optional)</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      </div>
                      <input 
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="YouTube, TikTok, or Instagram link..."
                        className="w-full bg-emerald-50/30 border border-emerald-100 rounded-2xl pl-12 pr-4 py-4 font-medium text-emerald-800 focus:ring-2 focus:ring-emerald-500 placeholder-emerald-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-1">Story Body</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tell your story. Include pros, cons, and personal anecdotes..."
                  className="w-full min-h-[400px] bg-slate-50/50 border border-slate-100 rounded-[2rem] p-8 text-lg leading-relaxed focus:ring-2 focus:ring-indigo-500 transition-all"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full py-6 bg-indigo-600 text-white font-black text-xl rounded-[2rem] shadow-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
              Publish Authentic Pulse
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-5xl font-black text-slate-800 mb-4 tracking-tighter">Community Hub</h2>
          <p className="text-xl text-slate-500 max-w-2xl">Deep dives, long-term reviews, and multi-media stories from our verified experience network.</p>
        </div>
        <button 
          onClick={() => user ? setIsWriting(true) : onPromptLogin()}
          className="px-10 py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] shadow-2xl hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-3 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          Write My Story
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article key={blog.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between hover:border-indigo-100">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase rounded-full tracking-widest border border-indigo-100/50">{blog.category}</span>
                {blog.videoUrl && (
                  <div className="flex items-center gap-1.5 text-indigo-500 font-black text-[9px] uppercase tracking-tighter">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                    Video Included
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">{blog.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-4 leading-relaxed mb-8 italic">"{blog.content}"</p>
              
              {blog.videoUrl && (
                <div className="mb-8">
                  <SocialVideoEmbed url={blog.videoUrl} compact />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-white rounded-full flex items-center justify-center font-black text-indigo-600 border border-slate-100">
                  {blog.author[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-slate-800 tracking-tight">{blog.author}</span>
                    {blog.isVerified && (
                      <div className="text-emerald-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]">{blog.isVerified ? 'Verified Pulsar' : 'Contributor'}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                 <button className="text-slate-300 hover:text-indigo-500 transition-colors transform hover:scale-125">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                 </button>
                 <span className="text-[10px] font-black text-slate-400 mt-1 uppercase">{blog.likes} Pulses</span>
              </div>
            </div>
          </article>
        ))}
        
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-300 hover:bg-white transition-all duration-300" onClick={() => user ? setIsWriting(true) : onPromptLogin()}>
          <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all">
             <svg className="w-10 h-10 text-slate-200 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          </div>
          <h3 className="text-xl font-black text-slate-400 mb-2 group-hover:text-indigo-600">Start Your Story</h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-[200px]">Join 5,000+ contributors building the world's most honest marketplace.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPortal;
