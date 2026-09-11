import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { PAGES_SEO } from '../../seoData';

interface BlogPageProps {
  navigate: (path: string) => void;
  onOpenPortal: (view?: 'apply' | 'login') => void;
}

export function BlogPage({ navigate, onOpenPortal }: BlogPageProps) {
  const seo = PAGES_SEO['/blog'];

  const articles = [
    {
      id: '1',
      title: 'How Emerging African Artists Can Monetize Music Royalties in 2026',
      date: 'September 8, 2026',
      author: 'Nam Radio Music Editorial',
      category: 'Music Business',
      readTime: '6 min read',
      excerpt: 'Too many independent African creators leave money on the table. A practical guide to understanding split sheets, ISRC codes, mechanical royalties, and performing rights organizations (SAMRO, CMOs, NASCAM) across the continent.',
      bodyPoints: [
        'Why registering your songs with your local Collective Management Organization is critical before releasing to DSPs.',
        'The difference between master recording rights and publishing/composition rights.',
        'How to assign proper metadata (ISRC, ISWC, songwriter credits) to avoid unclaimed royalties.'
      ]
    },
    {
      id: '2',
      title: 'The Log Drum Revolution: How Amapiano Conquered Global Dance Floors',
      date: 'August 28, 2026',
      author: 'DJ K-Vibe, Windhoek',
      category: 'Genre Analysis',
      readTime: '5 min read',
      excerpt: 'An in-depth look at how bedroom producers in Pretoria and Soweto turned deep house inside out, gave birth to the electronic log drum bassline, and transformed African youth culture into an international movement.',
      bodyPoints: [
        'The transition from informal WhatsApp distribution to Billboard chart supremacy.',
        'Why the 112 BPM tempo creates an infectious pocket for social media dance trends.',
        'How Southern African artists are reclaiming sovereignty over their master tapes.'
      ]
    },
    {
      id: '3',
      title: 'Windhoek Live: How Namibia’s Music Scene is Gaining Continental Recognition',
      date: 'August 15, 2026',
      author: 'Editorial Collective',
      category: 'Namibian Scene',
      readTime: '4 min read',
      excerpt: 'From Gazza’s pioneering Kwaito anthems to Lioness’s razor-sharp hip hop flows, Namibia’s creative ecosystem is breaking geographic isolation through digital streaming and international radio syndication.',
      bodyPoints: [
        'The unique cultural cross-pollination between Oshiwambo melodies and contemporary electronic beats.',
        'Overcoming high data costs and media scarcity through internet radio access.',
        'Nam Radio Local’s ongoing commitment to playlisting 50%+ independent domestic music.'
      ]
    },
    {
      id: '4',
      title: 'Mastering Metadata: Why ISRC Codes Make or Break Your Streaming Revenue',
      date: 'August 2, 2026',
      author: 'Artist Training Hub',
      category: 'Artist Tutorial',
      readTime: '7 min read',
      excerpt: 'A technical step-by-step breakdown on encoding ID3 tags, claiming your Spotify and Apple Music for Artists profiles, and pitching directly to playlist editors.',
      bodyPoints: [
        'Step-by-step guide to generating free ISRC codes for independent releases.',
        'How radio monitors (like Radiomonitor and BMAT) track airplay to remit royalties.',
        'Common metadata mistakes that cause digital distributors to reject African artist submissions.'
      ]
    }
  ];

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <BookOpen size={14} />
          <span>African Music Industry Journalism & Guides</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight italic">
          {seo.h1}
        </h1>
        <p className="text-xl text-white/70 leading-relaxed font-light max-w-3xl">
          Essays, technical tutorials, and cultural commentary authored by the broadcasters, music business mentors, and station curators at Nam Radio Local in Windhoek, Namibia.
        </p>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {articles.map((article, idx) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-xs text-white/40 font-mono">{article.readTime}</span>
              </div>

              <h2 className="text-2xl font-black uppercase text-white mb-4 italic leading-snug hover:text-primary transition-colors">
                {article.title}
              </h2>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {article.excerpt}
              </p>

              <div className="space-y-2 mb-6 p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary block">Key Takeaways</span>
                <ul className="list-disc pl-4 space-y-1 text-xs text-white/60">
                  {article.bodyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
              <span>{article.date} • {article.author}</span>
              <button
                onClick={() => onOpenPortal('apply')}
                className="text-primary font-bold uppercase tracking-wider flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Artist Hub</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Training Hub Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary/20 via-surface to-black border border-primary/30 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">
            Free Artist Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 italic">
            Access The Nam Radio Local Artist Training Hub
          </h2>
          <p className="text-xs text-white/70 max-w-xl leading-relaxed">
            Gain full access to our comprehensive modules on music publishing, copyright registration, and playlist pitching.
          </p>
        </div>
        <button
          onClick={() => onOpenPortal('apply')}
          className="px-8 py-4 bg-primary text-black font-black uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform cursor-pointer whitespace-nowrap"
        >
          Apply for Free Training
        </button>
      </section>
    </div>
  );
}
