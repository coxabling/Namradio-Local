/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Resource } from './types';

export const TRAINING_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Music Business Know-How Africa',
    description: 'Mastering music publishing, performance rights, contracts, and revenue streams for independent African artists.',
    category: 'Business',
    link: 'https://www.musicinafrica.net/know-how',
    level: 'Intermediate',
    readTime: '8 min read',
    author: 'Music In Africa Foundation',
    checklist: [
      'Understand split sheets before leaving studio sessions',
      'Register with local & international PROs (Performance Rights Organizations)',
      'Establish clear master ownership agreements with producers',
      'Set up standard mechanical royalty collection pathways'
    ]
  },
  {
    id: 'r2',
    title: 'Digital Streaming & DSP Pitching',
    description: 'Complete playbook on DSP editorial playlist submissions (Spotify, Apple Music, Boomplay, Audiomack).',
    category: 'Distribution',
    link: 'https://www.musicinafrica.net/magazine/music-distribution-africa',
    level: 'Beginner',
    readTime: '6 min read',
    author: 'Nam Radio Local Training Team',
    checklist: [
      'Submit metadata and pitch 3-4 weeks prior to release date',
      'High-resolution cover art (3000x3000px, RGB, no text clutter)',
      'Claim Spotify for Artists & Apple Music for Artists profiles',
      'Leverage Boomplay & Audiomack localized Africa playlist curators'
    ]
  },
  {
    id: 'r3',
    title: 'Copyright, SAMRO & CMO Registration',
    description: 'Step-by-step guidance on registering works with SAMRO, NASCAM, COSOTA, and African Collective Management Organizations.',
    category: 'Legal',
    link: 'https://www.samro.org.za/',
    level: 'Intermediate',
    readTime: '10 min read',
    author: 'SAMRO Legal Advisory',
    checklist: [
      'Obtain ISRC codes for every audio recording master',
      'Document full legal names and ID/Passport details for all songwriters',
      'Submit notification of works within 30 days of commercial release',
      'Track broadcast logging across radio stations (including Nam Radio)'
    ]
  },
  {
    id: 'r4',
    title: 'Social Media & Brand Building',
    description: 'How to build an authentic fan base across TikTok, Instagram, X, and YouTube Shorts for continental reach.',
    category: 'Marketing',
    link: 'https://www.musicinafrica.net/magazine/marketing-your-music',
    level: 'Beginner',
    readTime: '5 min read',
    author: 'Nam Radio Marketing Hub',
    checklist: [
      'Create 15-second sound bites optimized for TikTok & IG Reels',
      'Maintain an active Linktree / SmartURL with pre-save links',
      'Engage with regional music blogs & playlist curators weekly',
      'Host live Q&A sessions during release week'
    ]
  },
  {
    id: 'r5',
    title: 'Home Studio Recording & Mixing Essentials',
    description: 'A practical guide to vocal recording acoustics, DAW setup, gain staging, and delivering broadcast-ready stems.',
    category: 'Production',
    link: 'https://www.soundonsound.com/techniques/vocal-recording-home-studio',
    level: 'Advanced',
    readTime: '12 min read',
    author: 'Sound On Sound Academy',
    checklist: [
      'Acoustic treatment basics (soft absorbers at reflection points)',
      'Gain staging: target -18dBFS peak input levels',
      'Export 24-bit 44.1kHz WAV uncompressed stereo masters',
      'Prepare vocal & instrumental stems for radio mixing'
    ]
  },
  {
    id: 'r6',
    title: 'African Music Grants & Cultural Funding',
    description: 'Guide to securing grants from ACP-EU Culture, Pro Helvetia Johannesburg, Goethe-Institut, and local arts funds.',
    category: 'Grants',
    link: 'https://www.musicinafrica.net/funding',
    level: 'Intermediate',
    readTime: '7 min read',
    author: 'Cultural Funding Network',
    checklist: [
      'Draft a clear project budget detailing production vs marketing costs',
      'Prepare an Electronic Press Kit (EPK) with high-res photography',
      'Secure letters of support from local radio stations or media outlets',
      'Track application deadlines 3 months in advance'
    ]
  }
];

