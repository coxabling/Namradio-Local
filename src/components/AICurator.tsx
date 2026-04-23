/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Loader2, Music4 } from 'lucide-react';
import { getArtistRecommendation, ArtistRecommendation } from '../services/geminiService';

export function AICurator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ArtistRecommendation | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const result = await getArtistRecommendation(prompt);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to get recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[40px] border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Music4 size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary p-2 rounded-lg">
              <Sparkles size={16} className="text-black" />
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-primary">AI Sound Curator</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
            Discover Your <br /> <span className="text-primary italic">Soul Signature</span>
          </h2>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'I want something high-energy from Lagos' or 'Chill acoustic vibes from the Sahel'..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary/50 transition-colors text-white placeholder:text-white/20"
            />
            <button 
              disabled={loading}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} /> Find Sound</>}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {recommendation && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 rounded-3xl p-6 border border-white/10"
              >
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {recommendation.genre}
                  </span>
                  <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {recommendation.region}
                  </span>
                </div>
                <p className="text-lg font-medium italic mb-2 tracking-tight">"{recommendation.description}"</p>
                <p className="text-sm text-white/40 leading-relaxed">{recommendation.why}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
