/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Zap, Globe2, ShieldCheck, Users, Radio } from 'lucide-react';
import { Navbar, RadioPlayer } from './components/Navigation';
import { ArtistCard, ResourceCard } from './components/Cards';
import { AICurator } from './components/AICurator';
import { StationSchedule } from './components/Schedule';
import { RecentlyPlayed } from './components/RecentlyPlayed';
import { ArtistPortal } from './components/ArtistPortal';
import { MOCK_ARTISTS, TRAINING_RESOURCES } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RadioStation",
          "name": "Nam Radio Local",
          "url": "https://namradiolocal.com/",
          "logo": "https://namradiolocal.com/logo.png",
          "description": "Nam Radio Local is a modern African online radio platform empowering emerging artists with media exposure, training, and global recognition.",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Africa"
          },
          "genre": ["Afrobeats", "Amapiano", "African Music", "Global Rhythms"]
        })}
      </script>
      <Navbar onOpenPortal={() => setIsPortalOpen(true)} />
      
      {/* Hero Section */}
      <header id="home" className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles size={14} className="text-secondary" />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Empowering African Voices</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-8 max-w-4xl">
            The Sound <br /> 
            <span className="text-primary italic">Of The</span> <br />
            Continent
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg">
              Nam Radio Local is your gateway to undiscovered African talent. 
              We bridge the gap between local rhythm and global reach, giving power 
              back to the artists who define our culture.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
                className="btn-primary"
              >
                Listen Live
              </button>
              <button 
                onClick={() => setIsPortalOpen(true)}
                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
              >
                Artist Hub <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Abstract shapes/patterns */}
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 -left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
      </header>

      {/* AI Discovery Section */}
      <AICurator />
      
      <ArtistPortal isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />

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
            {MOCK_ARTISTS.filter(artist => {
              if (activeTab === 'all') return true;
              if (activeTab === 'west') return artist.region === 'Nigeria' || artist.region === 'Ghana';
              if (activeTab === 'south') return artist.region === 'South Africa' || artist.region === 'Swaziland' || artist.region === 'Zambia';
              if (activeTab === 'east') return artist.region === 'Tanzania' || artist.region === 'Kenya';
              if (activeTab === 'north') return artist.region === 'Egypt' || artist.region === 'Morocco';
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
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Recently Played Section */}
      <RecentlyPlayed />

      {/* Training & Support (Impact Section) */}
      <section id="training" className="py-24 px-6 bg-surface-bright african-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-secondary text-[10px] uppercase font-black tracking-[0.4em] mb-4 block">Power to the Artist</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter mb-8 italic">
                Bridging the <br /> 
                <span className="text-primary italic underline underline-offset-8">Resource Gap</span>
              </h2>
              <p className="text-white/60 mb-12 leading-relaxed text-lg">
                We don't just play music; we build careers. Our mission is to combat social 
                exclusion by providing the training, knowledge, and tools emerging artists need 
                to attract mainstream platforms and gain international recognition.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Digital Literacy", desc: "Mastering the online music ecosystem." },
                  { title: "Media Relations", desc: "How to tell your story to the world." },
                  { title: "Legal Support", desc: "Protecting your artistic intellectual property." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 h-auto bg-primary/30 rounded-full" />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRAINING_RESOURCES.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
              <div className="p-6 rounded-2xl bg-primary flex flex-col justify-between items-start text-black overflow-hidden relative">
                <Users size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />
                <h3 className="text-2xl font-black uppercase leading-tight italic mb-8 relative z-10">
                  Ready to join <br /> the collective?
                </h3>
                <button className="bg-black text-white px-6 py-3 rounded-full text-[10px] uppercase font-bold tracking-widest relative z-10 hover:scale-105 transition-transform">
                  Apply for Training
                </button>
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
              Combatting social exclusion through the power of African music and artist empowerment.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Insta', 'RadioAF'].map(s => (
                <button key={s} className="text-[10px] uppercase font-bold hover:text-white transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-primary transition-colors">Live Radio</a></li>
              <li><button onClick={() => setIsPortalOpen(true)} className="hover:text-primary transition-colors cursor-pointer">Artist Submission</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Global Charts</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Regions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setIsPortalOpen(true)} className="hover:text-primary transition-colors cursor-pointer">Training Hub</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Marketing Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Legal Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">
          <span>© 2026 Nam Radio Local</span>
          <span>Made in Africa for the World</span>
        </div>
      </footer>

      <RadioPlayer />
    </div>
  );
}
