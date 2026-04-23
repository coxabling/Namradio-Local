/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, Globe, User, Radio, Info, Home, Mic2, GraduationCap, Play, Pause, Volume2, ShoppingCart, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Radio className="text-black" />
        </div>
        <span className="font-bold text-xl tracking-tighter uppercase whitespace-nowrap">
          Nam Radio <span className="text-primary">Local</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/70">
        <a href="#home" className="hover:text-primary transition-colors flex items-center gap-2">
          <Home size={16} /> Home
        </a>
        <a href="#artists" className="hover:text-primary transition-colors flex items-center gap-2">
          <Mic2 size={16} /> Artists
        </a>
        <a href="#training" className="hover:text-primary transition-colors flex items-center gap-2">
          <GraduationCap size={16} /> Training
        </a>
        <a href="#about" className="hover:text-primary transition-colors flex items-center gap-2">
          <Info size={16} /> About
        </a>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Search size={20} />
        </button>
        <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-white/20">
          <Globe size={18} className="text-secondary" />
          <span className="text-xs uppercase font-semibold">Africa / Global</span>
        </div>
      </div>
    </nav>
  );
}

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<{
    title: string;
    artist: string;
    art: string;
    genre?: string;
  }>({
    title: "Nam Radio Local",
    artist: "Empowering African Artists",
    art: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    genre: "Variety"
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const STREAM_URL = "https://music-station.live/listen/nam_radio_local/radio.mp3";
  const API_URL = "https://music-station.live/api/nowplaying/nam_radio_local";
  const AFFILIATE_ID = "coxabling0e-21";

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data && data.now_playing && data.now_playing.song) {
        setNowPlaying({
          title: data.now_playing.song.title || "Nam Radio Local",
          artist: data.now_playing.song.artist || "African Talents",
          art: data.now_playing.song.art || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
          genre: data.now_playing.song.genre || "Global Mix"
        });
      }
    } catch (error) {
      console.error("Failed to fetch now playing info:", error);
    }
  };

  React.useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(nowPlaying.artist + " " + nowPlaying.title)}&tag=${AFFILIATE_ID}`;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-4 z-40"
    >
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      
      <div className={`max-w-5xl mx-auto glass rounded-[2rem] overflow-hidden transition-all duration-500 shadow-2xl ${isExpanded ? 'mb-4' : 'mb-0'}`}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-8 border-b border-white/10"
            >
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl w-64 h-64 flex-shrink-0">
                  <img 
                    src={nowPlaying.art} 
                    alt={nowPlaying.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100 grayscale opacity-50'}`}
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-primary/20 animate-pulse mix-blend-overlay" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] uppercase font-black tracking-widest rounded-full">
                      {nowPlaying.genre}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">Broadcasting via Nam Radio</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic leading-none">
                    {nowPlaying.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-secondary font-bold uppercase tracking-tight mb-8">
                    {nowPlaying.artist}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a 
                      href={amazonSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#FF9900] text-black px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                    >
                      <ShoppingCart size={18} /> Buy Now <span className="opacity-40">|</span> Amazon
                    </a>
                    <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-colors">
                      <ExternalLink size={18} /> View Artist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto cursor-pointer group" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="relative">
              <img 
                src={nowPlaying.art} 
                alt="Now Playing" 
                className={`w-12 h-12 rounded-lg object-cover transition-all duration-500 shadow-lg ${isPlaying ? 'animate-pulse scale-105 ring-2 ring-primary/20' : 'grayscale'}`}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold truncate tracking-tight">{nowPlaying.title}</h4>
              <p className="text-xs text-white/60 truncate font-medium">{nowPlaying.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-white/60 hover:text-white transition-colors">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Volume2 size={20} />
              </motion.div>
            </button>
            
            <button 
              onClick={togglePlay}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-primary text-black shadow-[0_0_20px_rgba(255,99,33,0.4)]' : 'bg-white text-black'}`}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </motion.div>
            </button>
            
            <div className={`text-xs font-mono uppercase tracking-widest font-bold transition-colors ${isPlaying ? 'text-secondary animate-pulse' : 'text-white/20'}`}>
              {isPlaying ? 'Live Stream' : 'Station Idle'}
            </div>
          </div>

          <div className="hidden md:flex flex-1 items-center gap-6">
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative">
              {isPlaying && (
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </div>
            <div className="flex items-center gap-3">
               <a 
                href={amazonSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Buy on Amazon"
                className="p-2 bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900] hover:text-black rounded-lg transition-all"
              >
                <ShoppingCart size={16} />
              </a>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
              >
                {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-primary py-2 px-6 text-[10px] uppercase tracking-widest whitespace-nowrap">
              Support Artists
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
