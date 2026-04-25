import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Twitter, Send, Share2 } from 'lucide-react';

interface ShareNowPlayingProps {
  title: string;
  artist: string;
  className?: string;
}

export function ShareNowPlaying({ title, artist, className = "" }: ShareNowPlayingProps) {
  const shareText = `I'm listening to "${title}" by ${artist} on Nam Radio Local! 📻🎶`;
  const shareUrl = window.location.origin;

  const shares = [
    {
      name: 'Facebook',
      icon: <Facebook size={16} />,
      color: 'hover:text-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter size={16} />,
      color: 'hover:text-[#1DA1F2]',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: <Send size={16} />, // Proxying Send for WhatsApp share intent
      color: 'hover:text-[#25D366]',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`
    }
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[10px] uppercase font-black tracking-widest text-white/20">Share:</span>
      <div className="flex gap-2">
        {shares.map((share) => (
          <motion.a
            key={share.name}
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 transition-colors ${share.color} flex items-center justify-center`}
            title={`Share on ${share.name}`}
          >
            {share.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
