/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Play, 
  SignalHigh, 
  MapPin, 
  Award, 
  Share2, 
  Check, 
  Copy, 
  BookOpen, 
  Clock, 
  CheckSquare, 
  Square,
  X,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';
import { Artist, Resource } from '../types';

export const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-surface rounded-3xl overflow-hidden african-pattern border border-white/5"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={artist.imageUrl} 
          alt={artist.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={12} className="text-primary" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">
            {artist.region}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-1 tracking-tight">{artist.name}</h3>
        <p className="text-xs text-white/40 mb-4 font-medium uppercase tracking-tighter">{artist.genre}</p>
        
        <div className="flex items-center justify-between">
          <a 
            href={artist.trackUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-secondary group-hover:text-white transition-colors"
          >
            Listen Now <Play size={10} fill="currentColor" />
          </a>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <SignalHigh size={14} className="text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const shareText = `Check out this free African artist training guide: "${resource.title}" on Nam Radio Local! 📻 Empowering independent African talent.`;
  const shareUrl = window.location.origin + `#training-${resource.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecklist = resource.checklist ? resource.checklist.length : 0;

  return (
    <>
      <div className="p-6 rounded-2xl bg-surface-bright border border-white/5 hover:border-primary/30 transition-all group flex flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-colors">
              <BookOpen size={20} />
            </div>
            <div className="flex items-center gap-2">
              {resource.level && (
                <span className="text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                  {resource.level}
                </span>
              )}
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">
                {resource.category}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors italic">
            {resource.title}
          </h3>

          <p className="text-sm text-white/60 leading-relaxed mb-4">
            {resource.description}
          </p>

          {resource.readTime && (
            <div className="flex items-center gap-1.5 text-white/40 text-xs mb-4 font-mono">
              <Clock size={12} />
              <span>{resource.readTime}</span>
              {resource.author && <span className="mx-1">• {resource.author}</span>}
            </div>
          )}

          {resource.checklist && resource.checklist.length > 0 && (
            <div className="mb-6 p-3 rounded-xl bg-black/40 border border-white/5">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-white/50 mb-2">
                <span>Actionable Checklist</span>
                <span>{completedCount}/{totalChecklist} Done</span>
              </div>
              <ul className="space-y-1.5 text-xs text-white/70">
                {resource.checklist.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="text-xs font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              View Guide & Steps <BookOpen size={12} />
            </button>

            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-1"
            >
              Portal <ExternalLink size={12} />
            </a>
          </div>

          {/* Social Share Bar on Card */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-[9px] uppercase font-bold tracking-widest text-white/30 flex items-center gap-1">
              <Share2 size={10} /> Share Guide:
            </span>
            <div className="flex items-center gap-2">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 text-white/60 transition-colors"
              >
                <MessageCircle size={13} />
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X / Twitter"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-400 text-white/60 transition-colors"
              >
                <Twitter size={13} />
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 text-white/60 transition-colors"
              >
                <Facebook size={13} />
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 text-white/60 transition-colors"
              >
                <Linkedin size={13} />
              </a>

              {/* Copy Direct Link */}
              <button
                onClick={handleCopyLink}
                title="Copy Share Link"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary text-white/60 transition-colors cursor-pointer relative"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Guide Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-surface border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto african-pattern text-white relative shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase font-black tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  {resource.category}
                </span>
                {resource.level && (
                  <span className="text-xs uppercase font-bold tracking-wider text-white/50 px-3 py-1 rounded-full bg-white/5">
                    {resource.level}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-black italic mb-3">{resource.title}</h2>

              <p className="text-white/70 leading-relaxed mb-6 text-sm">
                {resource.description}
              </p>

              {resource.checklist && resource.checklist.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-black/50 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                      <CheckSquare size={16} /> Artist Execution Checklist
                    </h4>
                    <span className="text-xs font-mono text-white/40">
                      {completedCount}/{totalChecklist} Completed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {resource.checklist.map((item, idx) => {
                      const isDone = !!checkedItems[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCheck(idx)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isDone 
                              ? 'bg-emerald-950/20 border-emerald-500/30 text-white' 
                              : 'bg-white/5 border-white/5 text-white/80 hover:border-white/20'
                          }`}
                        >
                          <button className="mt-0.5 text-primary">
                            {isDone ? <CheckSquare size={16} className="text-emerald-400" /> : <Square size={16} className="text-white/40" />}
                          </button>
                          <span className={`text-xs leading-relaxed ${isDone ? 'line-through text-white/40' : ''}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Social Media Share Section inside Modal */}
              <div className="p-6 rounded-2xl bg-surface-bright border border-white/10 mb-6">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-3 flex items-center gap-2">
                  <Share2 size={14} className="text-secondary" /> Share This Training Module
                </h4>
                <p className="text-xs text-white/50 mb-4">
                  Help fellow independent African artists access free music industry education.
                </p>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-600 hover:text-black transition-all"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600/20 border border-sky-500/30 text-sky-400 text-xs font-bold hover:bg-sky-500 hover:text-black transition-all"
                  >
                    <Twitter size={14} /> Post on X
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Facebook size={14} /> Facebook
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold hover:bg-blue-500 hover:text-black transition-all"
                  >
                    <Linkedin size={14} /> LinkedIn
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white hover:text-black transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-400" /> Link Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Share Text
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-black font-bold uppercase text-xs tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                >
                  Go to Official Portal <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-xs uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

