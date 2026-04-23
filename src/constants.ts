/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Artist, Track, Resource } from './types';

export const MOCK_ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'Zulu Soul',
    genre: 'Afro-Soul',
    region: 'South Africa',
    bio: 'Merging traditional rhythms with modern soul, Zulu Soul brings the spirit of the ancestors to the digital age.',
    imageUrl: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Naija Beats',
    genre: 'Afrobeat',
    region: 'Nigeria',
    bio: 'High-energy percussion and brass-heavy arrangements defining the new wave of Lagos nightlife.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Desert Blues Collective',
    genre: 'Tuareg Rock',
    region: 'Mali',
    bio: 'The soulful sound of the Sahara, where electric guitars meet nomadic traditions.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
  },
];

export const FEATURED_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Echoes of the Highlife',
    artistId: '2',
    artistName: 'Naija Beats',
    duration: '3:45',
    url: '#',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 't2',
    title: 'Safari Sunrise',
    artistId: '1',
    artistName: 'Zulu Soul',
    duration: '4:20',
    url: '#',
    coverUrl: 'https://images.unsplash.com/photo-1459749411177-0421800673d6?q=80&w=1000&auto=format&fit=crop',
  },
];

export const TRAINING_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Digital Distribution 101',
    description: 'How to get your music on Spotify, Apple Music, and beyond.',
    category: 'Marketing',
    link: '#',
  },
  {
    id: 'r2',
    title: 'Grants for African Musicians',
    description: 'A comprehensive guide to international arts funding.',
    category: 'Support',
    link: '#',
  },
  {
    id: 'r3',
    title: 'Professional Mixing Techniques',
    description: 'Masterclass on achieving radio-ready clarity in your bedroom studio.',
    category: 'Training',
    link: '#',
  },
];
