/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play, SignalHigh, MapPin, Award } from 'lucide-react';
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
  const Icon = resource.category === 'Training' ? Award : ExternalLink;
  
  return (
    <div className="p-6 rounded-2xl bg-surface-bright border border-white/5 hover:border-primary/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-black transition-colors">
          <Icon size={20} />
        </div>
        <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-40">
          {resource.category}
        </span>
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors italic">
        {resource.title}
      </h3>
      <p className="text-sm text-white/60 leading-relaxed mb-4">
        {resource.description}
      </p>
      <a 
        href={resource.link} 
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
      >
        Access Portal <ExternalLink size={12} />
      </a>
    </div>
  );
};
