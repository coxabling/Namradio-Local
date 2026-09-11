/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Globe2, ShieldCheck, Users, Radio, Music, Play as PlayIcon, Globe, ExternalLink, Calendar, BookOpen, Music2, Disc3 } from 'lucide-react';
import { Navbar, RadioPlayer } from './components/Navigation';
import { ArtistCard, ResourceCard } from './components/Cards';
import { AICurator } from './components/AICurator';
import { StationSchedule } from './components/Schedule';
import { RecentlyPlayed } from './components/RecentlyPlayed';
import { ArtistPortal } from './components/ArtistPortal';
import { ShareNowPlaying } from './components/ShareNowPlaying';
import { AboutPage } from './components/pages/AboutPage';
import { SchedulePage } from './components/pages/SchedulePage';
import { ArtistsPage } from './components/pages/ArtistsPage';
import { GenreAfrobeatsPage } from './components/pages/GenreAfrobeatsPage';
import { GenreAmapianoPage } from './components/pages/GenreAmapianoPage';
import { GenreBongoFlavaPage } from './components/pages/GenreBongoFlavaPage';
import { BlogPage } from './components/pages/BlogPage';
import { PAGES_SEO, BRAND_OG_IMAGE } from './seoData';
import { TRAINING_RESOURCES } from './constants';
import { Artist } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [activeTab, setActiveTab] = useState('all');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalView, setPortalView] = useState<'entrance' | 'login' | 'dashboard' | 'apply'>('entrance');
  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);
  const [nowPlaying, setNowPlaying] = useState<{
    title: string;
    artist: string;
    art: string;
    genre?: string;
    listeners?: number;
    isLive?: boolean;
    streamer?: string;
  } | null>(null);

  const API_URL = "/api/nowplaying";

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const seo = PAGES_SEO[path] || PAGES_SEO['/'];
      if (seo) {
        document.title = seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', seo.description);
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', seo.canonical);
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', seo.title);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', seo.description);
      }
    }
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      const seo = PAGES_SEO[path] || PAGES_SEO['/'];
      if (seo) {
        document.title = seo.title;
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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

        // Build real artist profiles from live song metadata and history
        const allTracks: any[] = [];
        if (data.now_playing?.song) allTracks.push({ ...data.now_playing.song, playlist: data.now_playing.playlist });
        if (data.playing_next?.song) allTracks.push({ ...data.playing_next.song, playlist: data.playing_next.playlist });
        if (Array.isArray(data.song_history)) {
          data.song_history.forEach((sh: any) => {
            if (sh.song) allTracks.push({ ...sh.song, playlist: sh.playlist });
          });
        }

        const uniqueArtistsMap = new Map<string, Artist>();

        allTracks.forEach((tr: any) => {
          const artistName = (tr.artist || "").trim();
          if (!artistName || artistName === "-" || artistName.toLowerCase().includes("namradio") || artistName.toLowerCase().includes("jingle")) return;
          
          if (!uniqueArtistsMap.has(artistName)) {
            let region = "Africa";
            const playlist = (tr.playlist || "").toLowerCase();
            if (playlist.includes("nigeria")) region = "Nigeria";
            else if (playlist.includes("ghana")) region = "Ghana";
            else if (playlist.includes("south")) region = "South Africa";
            else if (playlist.includes("east")) region = "Tanzania";
            else if (playlist.includes("north") || playlist.includes("egypt")) region = "Egypt";

            uniqueArtistsMap.set(artistName, {
              id: artistName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
              name: artistName,
              genre: tr.genre || (tr.playlist ? tr.playlist.replace(/[^a-zA-Z &]/g, '').trim() : "Afrobeats"),
              region: region,
              bio: tr.title ? `Currently featured on Nam Radio Local airwaves with "${tr.title}".` : 'Broadcasting live on Nam Radio Local.',
              imageUrl: tr.art || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000",
              trackUrl: "https://music-station.live/listen/nam_radio_local/radio.mp3"
            });
          }
        });

        setFeaturedArtists(Array.from(uniqueArtistsMap.values()));
      }
    } catch (error) {
      console.error("Failed to fetch now playing info:", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);
    return () => clearInterval(interval);
  }, []);

  const openPortal = (view: 'entrance' | 'login' | 'dashboard' | 'apply' = 'entrance') => {
    setPortalView(view);
    setIsPortalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "RadioStation",
            "@id": "https://namradiolocal.com/#station",
            "name": "Nam Radio Local",
            "alternateName": "Nam Radio",
            "url": "https://namradiolocal.com/",
            "logo": "https://namradiolocal.com/logo.png",
            "image": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
            "description": "Nam Radio Local is an all-African online radio station empowering emerging artists with global media exposure, music industry training, and airplay.",
            "email": "info@nam-radio.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Windhoek",
              "addressRegion": "Khomas",
              "addressCountry": "NA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -22.5609,
              "longitude": 17.0658
            },
            "areaServed": [
              {
                "@type": "Country",
                "name": "Namibia"
              },
              {
                "@type": "Continent",
                "name": "Africa"
              },
              {
                "@type": "Place",
                "name": "Worldwide"
              }
            ],
            "genre": ["Afrobeats", "Amapiano", "African Music", "Global Rhythms", "Bongo Flava"],
            "sameAs": [
              "https://www.facebook.com/namradiolocal",
              "https://www.nam-radio.com/local"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BroadcastService",
            "name": "Nam Radio Local Live Stream",
            "broadcaster": {
              "@type": "RadioStation",
              "name": "Nam Radio Local"
            },
            "broadcastDisplayName": "Nam Radio Local 24/7 Live Stream",
            "broadcastChannelId": "nam_radio_local",
            "genre": "African Music",
            "inLanguage": "en"
          },
          ...(nowPlaying?.title ? [{
            "@context": "https://schema.org",
            "@type": "MusicRecording",
            "name": nowPlaying.title,
            "byArtist": {
              "@type": "MusicGroup",
              "name": nowPlaying.artist
            },
            "genre": "African Music"
          }] : [])
        ])}
      </script>
      <Navbar 
        onOpenPortal={() => openPortal('entrance')} 
        currentPath={currentPath} 
        navigate={navigate} 
      />

      {currentPath === '/about' ? (
        <AboutPage onOpenPortal={openPortal} navigate={navigate} />
      ) : currentPath === '/schedule' ? (
        <SchedulePage navigate={navigate} />
      ) : currentPath === '/artists' ? (
        <ArtistsPage onOpenPortal={openPortal} navigate={navigate} />
      ) : currentPath === '/genres/afrobeats' ? (
        <GenreAfrobeatsPage navigate={navigate} onOpenPortal={openPortal} />
      ) : currentPath === '/genres/amapiano' ? (
        <GenreAmapianoPage navigate={navigate} onOpenPortal={openPortal} />
      ) : currentPath === '/genres/bongo-flava' ? (
        <GenreBongoFlavaPage navigate={navigate} onOpenPortal={openPortal} />
      ) : (currentPath === '/blog' || currentPath === '/news') ? (
        <BlogPage navigate={navigate} onOpenPortal={openPortal} />
      ) : (
        <>
          {/* Hero Section */}
          <header id="home" className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Empowering African Voices</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8 italic">
              The Sound <br /> 
              <span className="text-primary">Of The</span> <br />
              Continent
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mb-8">
              Nam Radio Local is your gateway to undiscovered African talent. 
              We bridge the gap between local rhythm and global reach.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
                className="btn-primary"
              >
                Listen Live
              </button>
              <button 
                onClick={() => openPortal('entrance')}
                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
              >
                Artist Hub <ArrowRight size={16} />
              </button>
              <a 
                href="https://www.nam-radio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-primary/10 hover:bg-primary hover:text-black border border-primary/30 text-primary transition-all flex items-center gap-2 font-bold uppercase text-xs tracking-widest group"
              >
                <Globe size={16} className="group-hover:rotate-12 transition-transform" />
                <span>Partner Station: www.nam-radio.com</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative z-10 aspect-square max-w-md mx-auto group">
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
              <div className="relative h-full glass rounded-[3rem] p-4 border-white/10 overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={nowPlaying?.art || 'default'}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative h-full w-full"
                  >
                    <img 
                      src={nowPlaying?.art || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000"} 
                      alt="Now Playing Cover"
                      className="w-full h-full object-cover rounded-[2rem] shadow-inner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[2rem]" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          {[1, 2, 3].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ height: [4, 12, 4] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                              className="w-1 bg-primary rounded-full"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-primary">Now Broadcasting</span>
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-1 line-clamp-1 italic">
                        {nowPlaying?.title || "Nam Radio Local"}
                      </h3>
                      <p className="text-lg text-white/60 font-medium truncate italic mb-4">
                        {nowPlaying?.artist || "The Sound of Africa"}
                      </p>
                      <ShareNowPlaying 
                        title={nowPlaying?.title || "Nam Radio Local"} 
                        artist={nowPlaying?.artist || "The Sound of Africa"} 
                      />
                    </div>

                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                    >
                      <PlayIcon size={32} fill="white" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Floating accents */}
              <div className="absolute -top-6 -right-6 p-4 glass rounded-2xl border-white/20 animate-bounce transition-all">
                <Music size={24} className="text-secondary" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-4 glass rounded-2xl border-white/20 animate-pulse transition-all">
                <Radio size={24} className="text-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Abstract shapes/patterns */}
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
      </header>

      {/* AI Discovery Section */}
      <AICurator />
      
      <ArtistPortal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
        initialView={portalView}
      />

      {/* Broadcast Schedule Section */}
      <StationSchedule />

      {/* Stats/Mission bar */}
      <section className="bg-surface py-12 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Local Focus</h3>
              <p className="text-xs text-white/40">Powering emerging talent across 54 nations.</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
              <Globe2 size={24} />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Global Impact</h3>
              <p className="text-xs text-white/40">Connecting artists with international media.</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-accent/10 rounded-2xl text-accent">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Total Support</h3>
              <p className="text-xs text-white/40">Training, marketing, and legal resources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">
              Featured <span className="text-white/20">Talent</span>
            </h2>
            <p className="text-white/40 max-w-md uppercase text-xs font-bold tracking-widest">
              Meet the artists breaking boundaries and redefining African music globally.
            </p>
          </div>
          <div className="flex gap-2">
            {['all', 'west', 'east', 'south', 'north'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {featuredArtists.length === 0 ? (
              <div className="col-span-full text-center py-12 text-white/40 text-xs font-mono uppercase tracking-widest animate-pulse">
                Loading live artists from Nam Radio Local airwaves...
              </div>
            ) : (
              featuredArtists.filter(artist => {
                if (activeTab === 'all') return true;
                if (activeTab === 'west') return artist.region === 'Nigeria' || artist.region === 'Ghana' || artist.genre.toLowerCase().includes('afro');
                if (activeTab === 'south') return artist.region === 'South Africa' || artist.region === 'Swaziland' || artist.genre.toLowerCase().includes('amapiano');
                if (activeTab === 'east') return artist.region === 'Tanzania' || artist.region === 'Kenya' || artist.genre.toLowerCase().includes('bongo');
                if (activeTab === 'north') return artist.region === 'Egypt' || artist.genre.toLowerCase().includes('trap');
                return true;
              }).map((artist) => (
                <motion.div
                  key={artist.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ArtistCard artist={artist} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Recently Played Section */}
      <RecentlyPlayed />

      {/* Training & Support (Impact Section) */}
      <section id="training" className="py-24 px-6 bg-surface-bright african-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-8">
            <div>
              <span className="text-secondary text-[10px] uppercase font-black tracking-[0.4em] mb-3 block">Power to the Artist</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter italic">
                Artist Training <br /> 
                <span className="text-primary italic underline underline-offset-8">Hub & Knowledge Base</span>
              </h2>
            </div>

            {/* Social Share Training Hub */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Share Training Hub</span>
              <div className="flex items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/10">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Access free Music Business, Copyright & Distribution Training for African Artists on Nam Radio Local: " + window.location.origin + "#training")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-black transition-all text-xs font-bold flex items-center gap-1.5"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Free African Music Business & Artist Training Hub on Nam Radio Local 📻")}&url=${encodeURIComponent(window.location.origin + "#training")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-sky-600/20 text-sky-400 hover:bg-sky-500 hover:text-black transition-all text-xs font-bold flex items-center gap-1.5"
                >
                  X / Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + "#training")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5"
                >
                  Facebook
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Nam Radio Local Artist Training Hub: ${window.location.origin}#training`);
                    alert("Training Hub link copied to clipboard!");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 text-white hover:bg-white hover:text-black transition-all text-xs font-bold cursor-pointer"
                >
                  Copy Hub Link
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-4 space-y-8">
              <p className="text-white/70 leading-relaxed text-base">
                We don't just play music; we build sustainable careers. Our comprehensive 
                training curriculum covers music publishing, copyright registration (SAMRO, CMOs), 
                digital DSP distribution, social media marketing, audio mixing, and cultural grant funding.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Digital Literacy & Distribution", desc: "Claim DSP profiles, pitch to playlists, and master metadata." },
                  { title: "Legal Rights & Copyright", desc: "Register split sheets, ISRC codes, and performance royalties." },
                  { title: "Media & Brand Relations", desc: "Crafting EPKs and telling your artistic story to global outlets." },
                  { title: "Grant & Project Funding", desc: "Access continental funding programs and cultural grants." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-1.5 h-auto bg-primary rounded-full flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest mb-1 text-white">{item.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-surface border border-primary/30 relative overflow-hidden">
                <Users size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12 text-primary" />
                <h3 className="text-xl font-black uppercase italic mb-2 relative z-10">
                  Ready for 1-on-1 Mentorship?
                </h3>
                <p className="text-xs text-white/70 mb-6 leading-relaxed relative z-10">
                  Submit your artistic profile to join the Nam Radio Local Collective and access direct legal & promotional support.
                </p>
                <button 
                  onClick={() => openPortal('apply')}
                  className="bg-primary text-black px-6 py-3 rounded-full text-xs uppercase font-black tracking-widest relative z-10 hover:scale-105 transition-transform cursor-pointer"
                >
                  Apply for Training
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TRAINING_RESOURCES.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Mission Quote */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center">
        <div className="mb-16">
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          <blockquote className="text-3xl md:text-5xl font-light italic leading-tight text-white/90">
            "We believe that no talent should go to waste simply because it lacks a platform. 
            <span className="text-primary font-black uppercase not-italic ml-2">Nam Radio Local</span> is the bridge from the streets of the continent to the stages of the world."
          </blockquote>
          <p className="mt-8 text-xs uppercase tracking-[0.5em] font-black text-white/40">
            The Nam Radio Collective
          </p>
        </div>
      </section>

        </>
      )}

      <footer className="pt-24 pb-48 border-t border-white/5 bg-surface">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm text-white/40 mb-20">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Radio className="text-black" size={20} />
              </div>
              <span className="font-bold text-lg tracking-tighter uppercase text-white">
                Nam Radio <span className="text-primary">Local</span>
              </span>
            </div>
            <p className="max-w-xs mb-8">
              Broadcasting 24/7 live from Windhoek, Namibia. Combatting social exclusion through the power of African music and emerging artist empowerment.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold hover:text-white transition-colors">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold hover:text-white transition-colors">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white mb-6">Broadcast & Music</h4>
            <ul className="space-y-4">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Live Radio
                </a>
              </li>
              <li>
                <a href="/schedule" onClick={(e) => { e.preventDefault(); navigate('/schedule'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Program Schedule
                </a>
              </li>
              <li>
                <a href="/artists" onClick={(e) => { e.preventDefault(); navigate('/artists'); }} className="hover:text-primary transition-colors cursor-pointer">
                  African Artists Roster
                </a>
              </li>
              <li>
                <button onClick={() => openPortal('apply')} className="hover:text-primary transition-colors cursor-pointer text-left w-full">
                  Artist Music Submission
                </button>
              </li>
              <li>
                <a 
                  href="https://www.nam-radio.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors flex items-center gap-1.5 text-primary font-bold"
                >
                  <Globe size={12} /> Partner: www.nam-radio.com <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white mb-6">Explore & Learn</h4>
            <ul className="space-y-4">
              <li>
                <a href="/genres/afrobeats" onClick={(e) => { e.preventDefault(); navigate('/genres/afrobeats'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Afrobeats Culture
                </a>
              </li>
              <li>
                <a href="/genres/amapiano" onClick={(e) => { e.preventDefault(); navigate('/genres/amapiano'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Amapiano Log Drums
                </a>
              </li>
              <li>
                <a href="/genres/bongo-flava" onClick={(e) => { e.preventDefault(); navigate('/genres/bongo-flava'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Bongo Flava Melodies
                </a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => { e.preventDefault(); navigate('/blog'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Music Industry Blog
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }} className="hover:text-primary transition-colors cursor-pointer">
                  About Nam Radio Local
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-wrap gap-8 justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">
          <div className="flex gap-8">
            <span>© 2026 Nam Radio Local</span>
            <span>Made in Africa for the World</span>
          </div>
          <div className="flex gap-8">
            <a href="mailto:info@nam-radio.com" className="hover:text-white transition-colors">info@nam-radio.com</a>
          </div>
        </div>
      </footer>

      <RadioPlayer externalData={nowPlaying} />
    </div>
  );
}
