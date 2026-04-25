/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { History, Share2, Facebook, Twitter, MessageCircle, ExternalLink, Play } from 'lucide-react';
import { RECENTLY_PLAYED } from '../constants';

interface HistorySong {
  sh_id: string | number;
  played_at?: number;
  song: {
    title: string;
    artist: string;
    art: string;
    text?: string;
  };
}

export function RecentlyPlayed() {
  const [history, setHistory] = useState<HistorySong[]>(
    RECENTLY_PLAYED.map(track => ({
      sh_id: track.id,
      song: {
        title: track.title,
        artist: track.artistName,
        art: track.coverUrl
      }
    }))
  );
  const [loading, setLoading] = useState(true);
  const API_URL = "/api/nowplaying";
  const APP_URL = window.location.origin;

  const fetchHistory = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data && data.song_history) {
        setHistory(data.song_history.slice(0, 6));
      }
    } catch (error) {
      console.error("Failed to fetch song history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const shareSong = (song: HistorySong['song'], platform: 'fb' | 'tw' | 'wa') => {
    const shareText = encodeURIComponent(`I'm listening to "${song.title}" by ${song.artist} on Nam Radio Local! 🎧🌍`);
    const shareUrl = encodeURIComponent(APP_URL);
    
    let url = '';
    switch (platform) {
      case 'fb':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'tw':
        url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        break;
      case 'wa':
        url = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
        break;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  if (loading && history.length === 0) return null;

  return (
    <section id="history" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-accent/10 rounded-2xl text-accent">
          <History size={24} />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
            Recently <span className="text-white/20">Played</span>
          </h2>
          <p className="text-xs text-white/40 uppercase font-bold tracking-widest">
            Relive the rhythm – tracks that just graced our airwaves
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item, index) => (
          <motion.div 
            key={item.sh_id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group glass p-4 rounded-2xl flex items-center gap-4 hover:border-accent/40 transition-all"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <img 
                src={item.song.art} 
                alt={item.song.title} 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                 <Play size={20} fill="white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate group-hover:text-accent transition-colors">{item.song.title}</h4>
              <p className="text-xs text-white/40 truncate mb-2">{item.song.artist}</p>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/20 font-mono italic">Share:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => shareSong(item.song, 'fb')}
                    className="p-1.5 hover:text-[#1877F2] transition-colors"
                    title="Share on Facebook"
                  >
                    <Facebook size={14} />
                  </button>
                  <button 
                    onClick={() => shareSong(item.song, 'tw')}
                    className="p-1.5 hover:text-[#1DA1F2] transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter size={14} />
                  </button>
                  <button 
                    onClick={() => shareSong(item.song, 'wa')}
                    className="p-1.5 hover:text-[#25D366] transition-colors"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle size={14} />
                  </button>
                </div>
              </div>
            </div>
            
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-white/20 hover:text-white">
              <ExternalLink size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
