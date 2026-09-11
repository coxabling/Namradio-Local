import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic2, Upload, FileCheck, Shield, Award, Play, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { PAGES_SEO } from '../../seoData';

interface ArtistsPageProps {
  onOpenPortal: (view?: 'apply' | 'login') => void;
  navigate: (path: string) => void;
}

export function ArtistsPage({ onOpenPortal, navigate }: ArtistsPageProps) {
  const seo = PAGES_SEO['/artists'];
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const artists = [
    {
      id: '1',
      name: 'Gazza',
      region: 'Namibia',
      regionGroup: 'south',
      genre: 'Kwaito / Afro-House',
      bio: 'Legendary Namibian pioneer who bridged Southern African street dance rhythms with international pop sensibility, winning continental accolades and inspiring a new generation.',
      tracks: ['Chelete', 'Get It On', 'Abangani Bami']
    },
    {
      id: '2',
      name: 'Lioness',
      region: 'Namibia',
      regionGroup: 'south',
      genre: 'Afro-Rap / Hip Hop',
      bio: 'Namibian hip hop powerhouse, medical doctor, and lyricist delivering fierce, multilingual flows that showcase the creative brilliance of Windhoek artists.',
      tracks: ['Tala', 'Meme', 'Feelings']
    },
    {
      id: '3',
      name: 'Asake',
      region: 'Nigeria',
      regionGroup: 'west',
      genre: 'Afrobeats / Fuji Fusion',
      bio: 'Visionary Lagos innovator blending indigenous Yoruba Fuji choral harmonies with high-energy contemporary street Afrobeats.',
      tracks: ['Sungba', 'Lonely At The Top', 'Amapiano']
    },
    {
      id: '4',
      name: 'Kabza De Small',
      region: 'South Africa',
      regionGroup: 'south',
      genre: 'Amapiano',
      bio: 'The undisputed architect of the modern Amapiano sound, pioneering the hypnotic log drum baseline that transformed global electronic dance floors.',
      tracks: ['Sponono', 'Woza', 'Asibe Happy']
    },
    {
      id: '5',
      name: 'Diamond Platnumz',
      region: 'Tanzania',
      regionGroup: 'east',
      genre: 'Bongo Flava',
      bio: 'East African giant whose masterful fusion of coastal Tanzanian Taarab melodies and vibrant Afropop made Swahili music a global phenomenon.',
      tracks: ['Jeje', 'Number One', 'Waah!']
    },
    {
      id: '6',
      name: 'Uncle Waffles',
      region: 'Eswatini / South Africa',
      regionGroup: 'south',
      genre: 'Amapiano',
      bio: 'Dynamic DJ and producer carrying the infectious spirit and sonic energy of Southern African youth to international festivals worldwide.',
      tracks: ['Tanzania', 'Yahyuppiyah', 'Wadibusa']
    },
    {
      id: '7',
      name: 'Black Sherif',
      region: 'Ghana',
      regionGroup: 'west',
      genre: 'Highlife / Drill',
      bio: 'Ghanaian sensation whose highlife-rooted vocal delivery and passionate street narratives have established him as a premier voice of West Africa.',
      tracks: ['Kwaku the Traveller', 'Oil in My Head', 'Simmer Down']
    },
    {
      id: '8',
      name: 'Zuchu',
      region: 'Tanzania',
      regionGroup: 'east',
      genre: 'Bongo Flava',
      bio: 'Gifted vocalist continuing the rich legacy of Zanzibar Taarab poetry through sweet, infectious modern Bongo Flava compositions.',
      tracks: ['Sukari', 'Kwikwi', 'Nani']
    }
  ];

  const filteredArtists = artists.filter((a) => {
    if (selectedRegion === 'all') return true;
    return a.regionGroup === selectedRegion;
  });

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Mic2 size={14} />
          <span>African Talent Showcase & Airplay Portal</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">
          {seo.h1}
        </h1>
        <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
          Nam Radio Local showcases independent and upcoming musicians across all 54 African countries. Discover featured talents on heavy rotation, or submit your own music for free radio consideration.
        </p>
      </motion.div>

      {/* Submission Protocol Banner */}
      <section className="mb-16 p-8 sm:p-10 rounded-3xl bg-surface border border-primary/30 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Upload size={20} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white italic">
              {seo.h2s[1]}
            </h2>
          </div>
          <p className="text-white/80 max-w-2xl text-sm leading-relaxed mb-8">
            Every week our curation committee reviews submissions from upcoming African artists. There are no fees or payola requirements. We evaluate entries solely on artistic originality, sonic quality, and songcraft.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-primary font-black text-xs uppercase tracking-wider mb-2">Step 1 • Mastered Audio</div>
              <p className="text-xs text-white/60 leading-relaxed">
                Provide a broadcast-ready 320kbps MP3 or 24-bit WAV file with clear vocal definition and balanced mixing.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-primary font-black text-xs uppercase tracking-wider mb-2">Step 2 • Metadata & ID3</div>
              <p className="text-xs text-white/60 leading-relaxed">
                Embed your Track Title, Artist Name, Genre, Year, and ISRC code cleanly into the audio file tags.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-primary font-black text-xs uppercase tracking-wider mb-2">Step 3 • Split-Sheet Verification</div>
              <p className="text-xs text-white/60 leading-relaxed">
                Confirm all songwriting and producer shares are cleared for broadcast and royalty reporting (SAMRO/NASCAM).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onOpenPortal('apply')}
              className="px-8 py-4 bg-primary text-black font-black uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform cursor-pointer"
            >
              Open Artist Submission Portal
            </button>
            <a
              href="mailto:info@nam-radio.com?subject=Artist%20Submission%20-%20Nam%20Radio%20Local"
              className="px-8 py-4 bg-white/10 text-white font-bold uppercase rounded-full text-xs tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <span>Email Tracks Directly</span>
              <span className="text-primary">✉️</span>
            </a>
          </div>
        </div>
      </section>

      {/* Artists Directory */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white italic mb-2">
              {seo.h2s[0]}
            </h2>
            <p className="text-xs text-white/50 uppercase tracking-wider font-mono">
              Showing African Creators in Rotation
            </p>
          </div>

          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {[
              { id: 'all', label: 'All Africa' },
              { id: 'south', label: 'Southern' },
              { id: 'west', label: 'West' },
              { id: 'east', label: 'East' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedRegion === tab.id
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist, idx) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 rounded-3xl bg-surface border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    {artist.region}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase font-mono">{artist.genre}</span>
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-2 italic">
                  {artist.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {artist.bio}
                </p>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">
                  Airplay Highlights
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {artist.tracks.map((t, i) => (
                    <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/70">
                      "{t}"
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
                  className="w-full py-2 bg-white/10 hover:bg-primary hover:text-black text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Play size={12} fill="currentColor" />
                  <span>Tune In to Station</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Genre Exploration Links */}
      <section className="p-8 rounded-3xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
          Explore African Music Genres on Nam Radio Local
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/genres/afrobeats')}
            className="p-5 rounded-2xl bg-black/40 hover:border-primary border border-white/10 text-left transition-all cursor-pointer group"
          >
            <h3 className="text-base font-bold text-white group-hover:text-primary mb-1">Afrobeats Guide →</h3>
            <p className="text-xs text-white/50">West African polyrhythms, Fela Kuti heritage, and modern pop icons.</p>
          </button>
          <button
            onClick={() => navigate('/genres/amapiano')}
            className="p-5 rounded-2xl bg-black/40 hover:border-secondary border border-white/10 text-left transition-all cursor-pointer group"
          >
            <h3 className="text-base font-bold text-white group-hover:text-secondary mb-1">Amapiano Guide →</h3>
            <p className="text-xs text-white/50">South African log drums, township jazz keys, and viral club grooves.</p>
          </button>
          <button
            onClick={() => navigate('/genres/bongo-flava')}
            className="p-5 rounded-2xl bg-black/40 hover:border-accent border border-white/10 text-left transition-all cursor-pointer group"
          >
            <h3 className="text-base font-bold text-white group-hover:text-accent mb-1">Bongo Flava Guide →</h3>
            <p className="text-xs text-white/50">East African Swahili poetry, coastal Taarab roots, and modern Afropop.</p>
          </button>
        </div>
      </section>
    </div>
  );
}
