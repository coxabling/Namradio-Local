import React from 'react';
import { motion } from 'motion/react';
import { Play, Disc3, Radio, ArrowLeft, Globe, Sparkles } from 'lucide-react';
import { PAGES_SEO } from '../../seoData';

interface GenrePageProps {
  navigate: (path: string) => void;
  onOpenPortal: (view?: 'apply' | 'login') => void;
}

export function GenreBongoFlavaPage({ navigate, onOpenPortal }: GenrePageProps) {
  const seo = PAGES_SEO['/genres/bongo-flava'];

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/artists')}
        className="text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6 hover:underline cursor-pointer"
      >
        <ArrowLeft size={14} /> Back to African Artists & Genres
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
          <Globe size={14} />
          <span>Swahili Melodic Rhythms • East Africa</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">
          {seo.h1}
        </h1>
        <p className="text-xl text-white/70 leading-relaxed font-light">
          Emerging from the bustling coastal port of Dar es Salaam, Tanzania, Bongo Flava blends traditional Taarab music, American R&B, and hip hop with poetic Swahili storytelling.
        </p>
      </motion.div>

      {/* Article Content */}
      <article className="space-y-10">
        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4 italic">
            {seo.h2s[0]}
          </h2>
          <p className="text-white/80 leading-relaxed text-base mb-4">
            The word <strong>Bongo</strong> translates directly to "brains" or "smart hustle" in Swahili—a nickname for Tanzania's vibrant commercial hub, Dar es Salaam. In the 1990s, Tanzanian youth began spitting Swahili rhymes over American boom-bap hip hop beats, dubbing the home-grown cultural fusion <strong>Bongo Flava</strong>.
          </p>
          <p className="text-white/80 leading-relaxed text-base">
            As the genre matured, artists like Diamond Platnumz, Ali Kiba, Harmonize, and Zuchu infused rich melodies from Zanzibar and Mombasa coastal Taarab music, propelling Bongo Flava into East Africa's most listened-to musical genre, generating billions of digital streams.
          </p>
        </section>

        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4 italic">
            {seo.h2s[1]}
          </h2>
          <p className="text-white/80 leading-relaxed text-base mb-6">
            Coastal East African Taarab tradition provides the romantic, melodic soul that sets Bongo Flava apart:
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-accent mb-2">Swahili Poetic Metaphor</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Swahili lyricism relies heavily on proverbs, nuanced idioms, and poetic allegory, delivering deep emotional storytelling about romance and street life.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-accent mb-2">Vocal Melisma & Taarab Cadence</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Smooth, undulating vocal runs and traditional Indian Ocean coastal string inflections layered over contemporary urban 808 percussion.
              </p>
            </div>
          </div>
        </section>

        {/* Rotation & Call to Action */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-accent/20 via-surface to-black border border-accent/30 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent block mb-1">
              Nam Radio Local Live Programming
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 italic">
              {seo.h2s[4]}
            </h2>
            <p className="text-xs text-white/70 max-w-xl leading-relaxed">
              Listen to the best in East African music during our nightly <strong className="text-white">Bongo Flava & East African Sounds</strong> broadcast (19:00 - 22:00 CAT).
            </p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
            className="px-8 py-4 bg-accent text-black font-black uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Play size={16} fill="currentColor" />
            <span>Listen to Bongo Flava</span>
          </button>
        </section>
      </article>
    </div>
  );
}
