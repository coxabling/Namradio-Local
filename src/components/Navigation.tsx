/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, User, Radio, Info, Home, Mic2, GraduationCap, Play, Pause, Volume2, ShoppingCart, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
}

export function Navbar({ onOpenPortal }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Artists', href: '#artists', icon: Mic2 },
    { name: 'Training', href: '#training', icon: GraduationCap },
    { name: 'About', href: '#about', icon: Info },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] glass px-6 py-4 flex items-center justify-between border-b border-white/5">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Radio className="text-black" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase whitespace-nowrap">
            Nam Radio <span className="text-primary">Local</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <link.icon size={14} /> {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={onOpenPortal}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white group"
          >
            <User size={18} className="group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Portal</span>
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/20 h-8">
            <Globe size={16} className="text-secondary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Africa / Global</span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] lg:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" />
            
            {/* Animated decorative blobs */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-primary rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-secondary rounded-full blur-[120px] pointer-events-none"
            />

            <div className="absolute inset-0 bg-african-gradient opacity-10" />
            <div className="absolute inset-0 african-pattern opacity-5" />
            
            <div className="absolute inset-0 pt-24 px-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary mb-4 p-4">Navigation</span>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors text-2xl font-black uppercase tracking-tighter group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors">
                      <link.icon size={24} />
                    </div>
                    {link.name}
                  </a>
                ))}
              </div>
              
              <div className="mt-auto pb-12 p-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <Globe size={18} className="text-secondary" />
                  <span className="text-xs uppercase font-bold tracking-widest text-white/40">Broadcasting Globally from Africa</span>
                </div>
                <button 
                  onClick={() => {
                    onOpenPortal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn-primary py-4 text-sm"
                >
                  Enter Artist Hub
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface RadioPlayerProps {
  externalData?: {
    title: string;
    artist: string;
    art: string;
    genre?: string;
    listeners?: number;
    streamer?: string;
    isLive?: boolean;
  } | null;
}

export function RadioPlayer({ externalData }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [nowPlaying, setNowPlaying] = useState<{
    title: string;
    artist: string;
    art: string;
    genre?: string;
    listeners?: number;
    streamer?: string;
    isLive?: boolean;
  }>({
    title: "Nam Radio Local",
    artist: "Empowering African Artists",
    art: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
    genre: "Variety",
    listeners: 0,
    isLive: false
  });

  const [nextShow, setNextShow] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const STREAM_URL = "https://music-station.live/listen/nam_radio_local/radio.mp3";
  const API_URL = "https://music-station.live/api/nowplaying/nam_radio_local";
  const SCHEDULE_API = "https://music-station.live/api/station/nam_radio_local/schedule";
  const AFFILIATE_ID = "coxabling0e-21";

  // Sync with external data if provided
  React.useEffect(() => {
    if (externalData) {
      setNowPlaying(externalData as any);
    }
  }, [externalData]);

  const fetchNextShow = async () => {
    try {
      const res = await fetch(SCHEDULE_API);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.schedule || []);
      const next = list.find((item: any) => !item.is_now);
      if (next) setNextShow(next.name);
    } catch (e) {
      console.error("Next show fetch failed", e);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      
      if (data && data.now_playing && data.now_playing.song) {
        setNowPlaying({
          title: data.now_playing.song.title || "Nam Radio Local",
          artist: data.now_playing.song.artist || "African Talents",
          art: data.now_playing.song.art || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
          genre: data.now_playing.song.genre || "Global Mix",
          listeners: data.listeners?.total || 0,
          streamer: data.live?.streamer_name || "",
          isLive: data.live?.is_live || false
        });
      }
    } catch (error) {
      console.error("Failed to fetch now playing info:", error);
    }
  };

  React.useEffect(() => {
    if (!externalData) {
      fetchNowPlaying();
      const intervalNow = setInterval(fetchNowPlaying, 15000);
      return () => clearInterval(intervalNow);
    }
  }, [externalData]);

  React.useEffect(() => {
    fetchNextShow();
    const intervalNext = setInterval(fetchNextShow, 300000); // 5 mins for schedule
    return () => clearInterval(intervalNext);
  }, []);

  React.useEffect(() => {
    const handleRemotePlay = () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      if (!isPlaying) togglePlay();
    };
    window.addEventListener('nam_radio_play', handleRemotePlay);
    return () => window.removeEventListener('nam_radio_play', handleRemotePlay);
  }, [isPlaying]);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Re-set source to bypass buffer latency for live stream
      const currentSrc = audioRef.current.src;
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current.src = currentSrc;
      audioRef.current.play().catch(err => console.error("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
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
                    {nowPlaying.isLive && (
                      <span className="px-3 py-1 bg-secondary/20 text-secondary text-[10px] uppercase font-black tracking-widest rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                        Live: {nowPlaying.streamer}
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40">
                      {nowPlaying.listeners} Listeners
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic leading-none">
                    {nowPlaying.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-secondary font-bold uppercase tracking-tight mb-8">
                    {nowPlaying.artist}
                  </p>
                  
                  {nextShow && (
                    <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 inline-flex flex-col items-start gap-1">
                      <span className="text-[10px] uppercase font-black tracking-widest text-white/20">Coming Up Next</span>
                      <span className="text-sm font-bold text-white/80 italic">{nextShow}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a 
                      href={amazonSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-[#FF9900] text-black px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                    >
                      <ShoppingCart size={18} /> Buy Now <span className="opacity-40">|</span> Amazon
                    </a>
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(nowPlaying.artist + " artist")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink size={18} /> View Artist
                    </a>
                    <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                      <Volume2 size={16} className="text-white/40" />
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 accent-primary"
                      />
                    </div>
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
              <div className="flex items-center gap-2">
                <p className="text-xs text-white/60 truncate font-medium">{nowPlaying.artist}</p>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">{nowPlaying.listeners} Tuning In</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Volume2 size={18} className="text-white/40" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-24 accent-primary opacity-40 hover:opacity-100 transition-opacity"
              />
            </div>
            
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
