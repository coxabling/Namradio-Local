import React from 'react';
import { motion } from 'motion/react';
import { Play, Disc3, Radio, ArrowLeft, Zap, Sparkles } from 'lucide-react';
import { PAGES_SEO } from '../../seoData';

interface GenrePageProps {
  navigate: (path: string) => void;
  onOpenPortal: (view?: 'apply' | 'login') => void;
}

export function GenreAmapianoPage({ navigate, onOpenPortal }: GenrePageProps) {
  const seo = PAGES_SEO['/genres/amapiano'];

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/artists')}
        className="text-secondary text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6 hover:underline cursor-pointer"
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
          <Zap size={14} />
          <span>The Piano Revolution • Southern Africa</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">
          {seo.h1}
        </h1>
        <p className="text-xl text-white/70 leading-relaxed font-light">
          Originating in the townships of South Africa, Amapiano ("the pianos" in Zulu) has reshaped 21st-century dance music with its subterranean log drums and jazz keyboard voicings.
        </p>
      </motion.div>

      {/* Article Content */}
      <article className="space-y-10">
        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4 italic">
            {seo.h2s[0]}
          </h2>
          <p className="text-white/80 leading-relaxed text-base mb-4">
            During the early 2010s in the townships of Pretoria, Johannesburg, and Soweto, innovative bedroom producers began down-pitching traditional deep house music from 125 BPM down to an intoxicating, hypnotic 112–115 BPM. They layered in the swagger of 1990s South African <em>Kwaito</em>, church organ progressions, and jazzy Fender Rhodes chords.
          </p>
          <p className="text-white/80 leading-relaxed text-base">
            Circulated initially on informal USB flash-drive exchanges, local minibus taxis, and WhatsApp audio drops, Amapiano quickly evolved into a continent-wide lifestyle and global cultural movement, commanding mainstages from London's O2 Arena to Coachella.
          </p>
        </section>

        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4 italic">
            {seo.h2s[1]}
          </h2>
          <p className="text-white/80 leading-relaxed text-base mb-6">
            The unmistakable heart of any Amapiano record is its <strong>Log Drum</strong>. Rather than an acoustic wooden percussion instrument, the Amapiano log drum is an electronic bass synth patch crafted through FM modulation and pitched envelope decay. It creates an elastic, metallic sub-bass punch that resonates powerfully in sound systems.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-secondary mb-2">The Hypnotic Tempo</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Clocking between 110 and 115 BPM, the tempo invites patient, stylized footwork, shoulder shrugs, and deep dance immersion.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-secondary mb-2">Township Jazz Keys</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Soulful minor 7th and 9th chord voicings that ground the driving drums in rich, melancholic South African jazz history.
              </p>
            </div>
          </div>
        </section>

        {/* Rotation & Call to Action */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-secondary/20 via-surface to-black border border-secondary/30 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-1">
              Nam Radio Local Airwaves
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 italic">
              {seo.h2s[4]}
            </h2>
            <p className="text-xs text-white/70 max-w-xl leading-relaxed">
              Experience the deep log drum vibrations during the <strong className="text-white">Amapiano Sunset Groove</strong> (16:00 - 19:00 CAT) every afternoon on Nam Radio Local.
            </p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
            className="px-8 py-4 bg-secondary text-black font-black uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Play size={16} fill="currentColor" />
            <span>Play Amapiano Live</span>
          </button>
        </section>
      </article>
    </div>
  );
}
