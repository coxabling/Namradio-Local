import React from 'react';
import { motion } from 'motion/react';
import { Radio, Globe2, ShieldCheck, Zap, Mail, ArrowRight, Heart, Award, Music2 } from 'lucide-react';
import { PAGES_SEO } from '../../seoData';

interface AboutPageProps {
  onOpenPortal: (view?: 'apply' | 'login') => void;
  navigate: (path: string) => void;
}

export function AboutPage({ onOpenPortal, navigate }: AboutPageProps) {
  const seo = PAGES_SEO['/about'];

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <span>Broadcasting Live From Windhoek, Namibia</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">
          {seo.h1}
        </h1>
        <p className="text-xl text-white/70 leading-relaxed font-light max-w-3xl">
          Nam Radio Local is an independent, 24/7 internet radio station headquartered in Windhoek, Namibia. We are on a mission to democratize African radio airplay and provide emerging talent with the tools to build sustainable global careers.
        </p>
      </motion.div>

      {/* Story Section */}
      <div className="space-y-12">
        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Radio size={20} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white italic">
              {seo.h2s[0]}
            </h2>
          </div>
          <p className="text-white/80 leading-relaxed text-base mb-4">
            Founded in Windhoek, Khomas Region, Nam Radio Local was sparked by a stark reality: while African musical genres like Afrobeats, Amapiano, and Bongo Flava dominate global streaming platforms and festival stages, thousands of independent artists across Namibia and the broader continent remain locked out of traditional commercial FM radio syndication.
          </p>
          <p className="text-white/70 leading-relaxed text-base mb-6">
            Traditional gatekeepers often prioritize established commercial label catalogues, leaving grassroots artists without a launchpad. Nam Radio Local operates as an open-door digital bridge, streaming high-definition African sounds 24 hours a day, 365 days a year to listeners across Africa and the worldwide diaspora.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 text-xs text-white/50 font-mono">
            <div>📍 Studio: Windhoek, Namibia</div>
            <div>📡 Frequency: 24/7 Digital Audio Stream</div>
            <div>🌍 Coverage: 54 African Nations & Global</div>
          </div>
        </section>

        {/* Mission Pillars */}
        <section className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Zap size={20} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white italic">
              {seo.h2s[1]}
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-base text-primary uppercase mb-2">1. Merit-Based Airplay</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                No payola, no prohibitive agent fees. Every artist—whether recording in a high-end studio in Lagos or a bedroom in Windhoek—can submit tracks for radio review.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-base text-secondary uppercase mb-2">2. Music Business Education</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                We empower musicians with legal literacy: split sheets, CMO registration (such as SAMRO and NASCAM), ISRC tagging, and digital DSP distribution tactics.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-base text-accent uppercase mb-2">3. Cross-Continental Unity</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                By rotating West African Afrobeats, South African Amapiano, East African Bongo Flava, and Namibian Kwaito on a single dial, we unite African musical expressions.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-base text-emerald-400 uppercase mb-2">4. Global Media Networking</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Connecting promising African creators with European and North American promoters, sync licensing agents, and international media partnerships.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onOpenPortal('apply')}
              className="px-8 py-3.5 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform cursor-pointer"
            >
              Submit Music for Airplay
            </button>
            <button
              onClick={() => navigate('/schedule')}
              className="px-8 py-3.5 bg-white/10 text-white font-bold uppercase rounded-full text-xs tracking-widest hover:bg-white/20 transition-all cursor-pointer"
            >
              Check Broadcast Schedule
            </button>
          </div>
        </section>

        {/* Studio & Partner Banner */}
        <section className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-white/5 to-black border border-primary/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">Partner Network</span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-2">www.nam-radio.com Partnership</h3>
            <p className="text-xs text-white/70 max-w-xl leading-relaxed">
              Nam Radio Local collaborates closely with our sister platform <strong className="text-white">www.nam-radio.com</strong> to amplify African cultural heritage across worldwide broadcasting channels.
            </p>
          </div>
          <a
            href="https://www.nam-radio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-primary transition-colors whitespace-nowrap"
          >
            Visit www.nam-radio.com ↗
          </a>
        </section>
      </div>
    </div>
  );
}
