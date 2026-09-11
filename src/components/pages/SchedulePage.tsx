import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Radio, Play, Sparkles, Filter } from 'lucide-react';
import { PAGES_SEO } from '../../seoData';

interface SchedulePageProps {
  navigate: (path: string) => void;
}

interface Show {
  id: string;
  time: string;
  title: string;
  genre: string;
  host: string;
  description: string;
  isPeak?: boolean;
}

export function SchedulePage({ navigate }: SchedulePageProps) {
  const seo = PAGES_SEO['/schedule'];
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const shows: Show[] = [
    {
      id: '1',
      time: '06:00 - 09:00 CAT',
      title: 'Morning Sunrise: Acoustic & Soulful Africa',
      genre: 'Acoustic / Soul / Desert Blues',
      host: 'AfriWake Host',
      description: 'Start your morning with uplifting acoustic strings, desert blues guitar riffs, and soulful African folk compositions from Mali to Madagascar.'
    },
    {
      id: '2',
      time: '09:00 - 13:00 CAT',
      title: 'NAM — Charts & Continental Discovery',
      genre: 'Top Charts / Emerging Countdown',
      host: 'Station Curators',
      description: 'Our premier midday program featuring listener votes, top countdown tracks from Namibia, Nigeria, South Africa, and Kenya, and newly submitted artist premieres.',
      isPeak: true
    },
    {
      id: '3',
      time: '13:00 - 16:00 CAT',
      title: 'Afrobeats Continental Pulse',
      genre: 'Afrobeats / Afropop',
      host: 'Lagos & Accra Connect',
      description: 'Energetic polyrhythms, infectious highlife brass chords, and contemporary West African club anthems dominating airwaves across the globe.',
      isPeak: true
    },
    {
      id: '4',
      time: '16:00 - 19:00 CAT',
      title: 'Amapiano Sunset Groove: Log Drums & Vibez',
      genre: 'Amapiano / Kwaito',
      host: 'DJ K-Vibe (Soweto/Windhoek)',
      description: 'The hypnotic sound of Pretoria and Johannesburg townships: pitched log drums, jazzy Rhodes piano chords, and deep electronic grooves.',
      isPeak: true
    },
    {
      id: '5',
      time: '19:00 - 22:00 CAT',
      title: 'Bongo Flava & East African Sounds',
      genre: 'Bongo Flava / Taarab / Urban Pop',
      host: 'Swahili Waves',
      description: 'The melodic heartbeat of Dar es Salaam, Nairobi, and Zanzibar. Poetic Swahili lyrics, sweet Taarab string melodies, and modern 808 beats.'
    },
    {
      id: '6',
      time: '22:00 - 02:00 CAT',
      title: 'Late Night Sessions: Unsigned & Independent',
      genre: 'Indie / Underground / Demos',
      host: 'The Collective',
      description: 'Raw, experimental, and unreleased submissions from aspiring African bedroom producers, independent songwriters, and underground rappers.'
    },
    {
      id: '7',
      time: '02:00 - 06:00 CAT',
      title: 'Overnight Global African Mix',
      genre: 'Afro-House / Kuduro / Deep Soundscapes',
      host: 'Auto-DJ Global',
      description: 'Continuous, commercial-free deep electronic soundscapes, Angolan Kuduro, Mozambican Marrabenta, and hypnotic Afro-House rhythms.'
    }
  ];

  const filteredShows = shows.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'afrobeats') return s.genre.toLowerCase().includes('afrobeat');
    if (activeFilter === 'amapiano') return s.genre.toLowerCase().includes('amapiano');
    if (activeFilter === 'bongo') return s.genre.toLowerCase().includes('bongo');
    if (activeFilter === 'peak') return s.isPeak;
    return true;
  });

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Clock size={14} />
          <span>24/7 Continuous Broadcast • Central Africa Time (CAT)</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">
          {seo.h1}
        </h1>
        <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
          Welcome to the 24/7 broadcast schedule for Nam Radio Local. All show hours are programmed in <strong className="text-white">Central Africa Time (CAT / UTC+2)</strong>, originating from our studio operations in Windhoek, Namibia.
        </p>
      </motion.div>

      {/* Clock & Filter Bar */}
      <div className="mb-10 p-6 rounded-3xl bg-surface border border-white/10 shadow-2xl flex flex-wrap justify-between items-center gap-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">
            Studio Location & Broadcast Time
          </span>
          <div className="text-xl sm:text-2xl font-mono text-white font-bold flex items-center gap-3">
            <Radio size={20} className="text-primary animate-pulse" />
            <span>Windhoek, Namibia (UTC+2 CAT)</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Shows' },
            { id: 'afrobeats', label: 'Afrobeats' },
            { id: 'amapiano', label: 'Amapiano' },
            { id: 'bongo', label: 'Bongo Flava' },
            { id: 'peak', label: 'Prime Time' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-primary text-black font-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="space-y-4 mb-16">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-4 italic">
          {seo.h2s[0]}
        </h2>

        {filteredShows.map((show, index) => (
          <motion.article
            key={show.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-6 sm:p-8 rounded-3xl bg-surface border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              show.isPeak ? 'border-primary/40 bg-gradient-to-r from-primary/5 via-surface to-surface' : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div className="md:w-1/4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-mono text-primary font-bold">{show.time}</span>
                {show.isPeak && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-black uppercase tracking-wider">
                    Prime
                  </span>
                )}
              </div>
              <span className="text-xs text-white/50 font-bold uppercase tracking-wider block">{show.genre}</span>
            </div>

            <div className="md:w-2/4">
              <h3 className="text-xl font-black uppercase text-white mb-1.5 italic tracking-tight">
                {show.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-2">
                {show.description}
              </p>
              <div className="text-[11px] text-white/40 font-mono">
                Hosted by: <span className="text-white/70">{show.host}</span>
              </div>
            </div>

            <div className="md:w-1/4 flex md:justify-end items-center gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-primary hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play size={14} fill="currentColor" />
                <span>Listen Live</span>
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Timezone Guide */}
      <section className="p-8 rounded-3xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
          {seo.h2s[3]}
        </h2>
        <p className="text-xs text-white/60 leading-relaxed mb-4">
          Listening from outside Namibia? Here is how Central Africa Time (CAT / UTC+2) corresponds to your local region:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-white/70">
          <div className="p-3 bg-black/40 rounded-xl">🇳🇦 Windhoek: 12:00 (CAT)</div>
          <div className="p-3 bg-black/40 rounded-xl">🇳🇬 Lagos: 11:00 (WAT / -1h)</div>
          <div className="p-3 bg-black/40 rounded-xl">🇰🇪 Nairobi: 13:00 (EAT / +1h)</div>
          <div className="p-3 bg-black/40 rounded-xl">🇬🇧 London: 11:00 (BST / -1h)</div>
        </div>
      </section>
    </div>
  );
}
