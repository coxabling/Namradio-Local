import React from 'react';
import { motion } from 'motion/react';
import { Play, Disc3, Radio, ArrowLeft, Flame, Sparkles } from 'lucide-react';
import { PAGES_SEO } from '../../seoData';

interface GenrePageProps {
  navigate: (path: string) => void;
  onOpenPortal: (view?: 'apply' | 'login') => void;
}

export function GenreAfrobeatsPage({ navigate, onOpenPortal }: GenrePageProps) {
  const seo = PAGES_SEO['/genres/afrobeats'];

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/artists')}
        className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6 hover:underline cursor-pointer"
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Flame size={14} />
          <span>Flagship Genre Rotation • West Africa</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">
          {seo.h1}
        </h1>
        <p className="text-xl text-white/70 leading-relaxed font-light">
          From the revolutionary political Afrobeat of 1970s Lagos to contemporary stadium-filling Afrobeats, West African rhythms have captured the global cultural consciousness.
        </p>
      </motion.div>

      {/* Main Content Article */}
      <article className="space-y-10">
        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4 italic">
            {seo.h2s[0]}
          </h2>
          <p className="text-white/80 leading-relaxed text-base mb-4">
            A vital distinction must be made between singular <strong>Afrobeat</strong> and plural <strong>Afrobeats</strong>. In late-1960s Nigeria, visionary multi-instrumentalist Fela Anikulapo Kuti and drummer Tony Allen forged Afrobeat: a sprawling, politically charged synthesis of traditional Yoruba percussion, Ghanaian highlife brass sections, American jazz improvisation, and funk rhythms. Afrobeat was the soundtrack to anti-colonial resistance and working-class empowerment.
          </p>
          <p className="text-white/80 leading-relaxed text-base">
            By the late 2000s and early 2010s, a new generation of bedroom producers and vocalists in Lagos, Accra, and London began weaving West African melodic sensibilities with UK funky house, Jamaican dancehall, and contemporary American hip hop and R&B. This gave birth to <strong>Afrobeats</strong> (with an 's'): an irresistible, dance-focused cultural phenomenon celebrated worldwide.
          </p>
        </section>

        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4 italic">
            {seo.h2s[1]}
          </h2>
          <p className="text-white/80 leading-relaxed text-base mb-6">
            What makes an Afrobeats production instantly recognizable to listeners on Nam Radio Local?
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-primary mb-2">Layered Polyrhythms</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Syncopated shaker patterns, claps, and kick drums that offset the standard four-on-the-floor beat, driving natural hip and body movement.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-primary mb-2">Highlife Guitars</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Clean, staccato, melodic guitar licks that weave through the percussive elements, echoing vintage Ghanaian and Nigerian Palm-wine and Highlife traditions.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-primary mb-2">Multilingual Wordplay</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Effortless code-switching between Nigerian Pidgin, Yoruba, Igbo, Twi, and French, creating celebratory vocal phrasing and memorable street slang.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-sm uppercase text-primary mb-2">Anthemic Vocal Delivery</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Call-and-response choral arrangements rooted in African communal singing, uniting listeners on dance floors across continents.
              </p>
            </div>
          </div>
        </section>

        {/* Rotation & Call to Action */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary/20 via-surface to-black border border-primary/30 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">
              Nam Radio Local Rotation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 italic">
              {seo.h2s[4]}
            </h2>
            <p className="text-xs text-white/70 max-w-xl leading-relaxed">
              Listen to our daily <strong className="text-white">Afrobeats Continental Pulse</strong> show (13:00 - 16:00 CAT) streaming live from Windhoek, Namibia.
            </p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('nam_radio_play'))}
            className="px-8 py-4 bg-primary text-black font-black uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Play size={16} fill="currentColor" />
            <span>Stream Afrobeats Live</span>
          </button>
        </section>
      </article>
    </div>
  );
}
