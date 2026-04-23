/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight, 
  Upload, 
  BarChart3, 
  Users, 
  Music2, 
  ShieldCheck, 
  Globe2, 
  Zap,
  ChevronRight,
  LogOut,
  Radio
} from 'lucide-react';

interface AccessPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArtistPortal({ isOpen, onClose }: AccessPortalProps) {
  const [view, setView] = useState<'entrance' | 'login' | 'dashboard'>('entrance');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated login for now
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setView('dashboard');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-[110] p-4 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X size={24} />
          </button>

          {view === 'entrance' && (
            <div className="w-full h-full grid lg:grid-cols-2">
              {/* Left: Branding & Message */}
              <div className="relative p-12 flex flex-col justify-center bg-surface border-r border-white/5 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative z-10"
                >
                  <span className="text-secondary text-[10px] uppercase font-black tracking-[0.4em] mb-4 block underline decoration-secondary/30 underline-offset-4">Gate 01 / Nam Collective</span>
                  <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8 italic">
                    Access <br />
                    <span className="text-primary">The Hub</span>
                  </h1>
                  <p className="text-white/60 max-w-md text-lg leading-relaxed mb-12">
                    Professional tooling for the next generation of African music legends. Join 12,000+ artists scaling their sound globally.
                  </p>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex gap-4 items-center">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary"><BarChart3 size={20} /></div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Real-time <br /> Analytics</div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="p-2 bg-secondary/10 rounded-lg text-secondary"><Globe2 size={20} /></div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Global <br /> Distribution</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Actions */}
              <div className="p-12 flex flex-col justify-center items-center bg-black relative">
                <div className="max-w-md w-full space-y-6">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full group p-8 rounded-[2rem] bg-white text-black flex items-center justify-between hover:bg-primary transition-all"
                    onClick={() => setView('login')}
                  >
                    <div className="text-left">
                      <h3 className="text-2xl font-black uppercase italic leading-none mb-2">Member Login</h3>
                      <p className="text-xs uppercase font-bold opacity-60">Access your dashboard</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full group p-8 rounded-[2rem] bg-white/5 border border-white/10 text-white flex items-center justify-between hover:border-white/20 transition-all"
                  >
                    <div className="text-left">
                      <h3 className="text-2xl font-black uppercase italic leading-none mb-2">Join Collective</h3>
                      <p className="text-xs uppercase font-bold text-white/40">Submit your application</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <Upload size={20} />
                    </div>
                  </motion.button>
                  
                  <div className="pt-12 border-t border-white/5 text-center">
                    <p className="text-xs text-white/20 uppercase font-black tracking-widest">
                      Nam Radio Local | Verification Protocol 4.2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'login' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full p-12 glass rounded-[3rem] border-white/10"
            >
              <button 
                onClick={() => setView('entrance')}
                className="mb-8 text-primary text-[10px] uppercase font-black tracking-widest flex items-center gap-2"
              >
                <X size={14} className="rotate-45" /> Back to Entrance
              </button>
              
              <h2 className="text-4xl font-black uppercase leading-none mb-8 italic">Collective <br /> <span className="text-primary italic">Sign In</span></h2>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-white/40 tracking-widest ml-4">Identifier</label>
                  <input 
                    type="email" 
                    placeholder="artist@namradio.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-white/40 tracking-widest ml-4">Access Key</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <button type="submit" className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-2">
                  Verify & Enter <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          )}

          {view === 'dashboard' && (
            <div className="w-full h-full flex flex-col md:flex-row p-4 gap-4">
              {/* Sidebar */}
              <div className="w-full md:w-64 glass rounded-[2rem] p-8 flex flex-col justify-between border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-12">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                      <Radio className="text-black" size={16} />
                    </div>
                    <span className="font-bold text-sm tracking-tighter uppercase whitespace-nowrap">
                      Nam <span className="text-primary">Hub</span>
                    </span>
                  </div>

                  <nav className="space-y-2">
                    {[
                      { icon: BarChart3, label: 'Analytics' },
                      { icon: Music2, label: 'My Tracks' },
                      { icon: Globe2, label: 'Distribution' },
                      { icon: Users, label: 'Collective' },
                    ].map(item => (
                      <button key={item.label} className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white group">
                        <item.icon size={18} className="group-hover:text-primary transition-colors" />
                        <span className="text-[10px] uppercase font-black tracking-widest">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <button 
                  onClick={() => setView('entrance')}
                  className="flex items-center gap-3 p-4 text-white/20 hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-[10px] uppercase font-black tracking-widest">Exit Portal</span>
                </button>
              </div>

              {/* Main Workspace */}
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
                <div className="p-8 glass rounded-[2rem] border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Welcome Back, <span className="text-primary">Artist</span></h2>
                    <p className="text-[10px] uppercase font-black text-white/20 tracking-widest">Portal Status: Online | 08 Notifications</p>
                  </div>
                  <button className="bg-primary text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                    <Upload size={14} /> Submit New Track
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div className="p-8 glass rounded-[2.5rem] border-white/10 border-l-4 border-l-primary">
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <h4 className="text-[10px] uppercase font-black tracking-widest text-primary mb-2 italic">Performance Metric</h4>
                          <h3 className="text-5xl font-black italic tracking-tighter leading-none">12.8K <span className="text-xl font-serif text-white/40">impact</span></h3>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-secondary">+24% this week</span>
                        </div>
                      </div>
                      <div className="h-24 flex items-end gap-1">
                        {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.05 }}
                            className="flex-1 bg-primary/20 rounded-t-sm group relative"
                          >
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-surface border border-white/5 rounded-3xl">
                        <h4 className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-4 italic">Next Royalty Payout</h4>
                        <p className="text-2xl font-black italic">$420.00</p>
                        <p className="text-[10px] uppercase font-bold text-white/20 mt-2 italic underline underline-offset-4">Schedule: May 01</p>
                      </div>
                      <div className="p-6 bg-surface border border-white/5 rounded-3xl">
                        <h4 className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-4 italic">Global Airplay</h4>
                        <p className="text-2xl font-black italic">14 countries</p>
                        <p className="text-[10px] uppercase font-bold text-white/20 mt-2 italic underline underline-offset-4">Top: Nigeria, SA</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 glass rounded-[2.5rem] border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-8">
                        <Zap size={18} className="text-secondary" />
                        <h4 className="text-[10px] uppercase font-black tracking-widest">Active Opportunity</h4>
                      </div>
                      <h3 className="text-2xl font-black uppercase italic leading-tight mb-4">Lagos Nights <br /> Compilation</h3>
                      <p className="text-xs text-white/40 leading-relaxed mb-8 italic">Submit your best Afro-house track for our upcoming curated playlist and legal licensing pool.</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] uppercase font-bold">
                          <span className="text-white/40 italic">Slots Remaining</span>
                          <span className="text-secondary">03/10</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary w-[70%]" />
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-4 border border-white/10 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-white hover:text-black transition-all italic">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
