/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Artist, Track, Resource } from './types';

export const MOCK_ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'Burna Boy',
    genre: 'Afro-Fusion',
    region: 'Nigeria',
    bio: 'The African Giant himself, Burna Boy is the voice of a generation, blending Afrobeats, dancehall, and reggae into a global phenomenon.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253361-b83f85df0f5c?q=80&w=1000&auto=format&fit=crop',
    trackUrl: 'https://www.youtube.com/watch?v=dAnNf_vWIn4',
  },
  {
    id: '2',
    name: 'Tems',
    genre: 'R&B / Afro-Fusion',
    region: 'Nigeria',
    bio: 'With her ethereal voice and boundary-pushing production, Tems has become one of the most sought-after artists in the world.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
    trackUrl: 'https://www.youtube.com/watch?v=E-rV8E-uEGI',
  },
  {
    id: '3',
    name: 'Black Sherif',
    genre: 'Highlife / Drill',
    region: 'Ghana',
    bio: 'Representing the streets of Konongo, Black Sherif is redefining the sound of West African drill with his raw, emotive storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?q=80&w=1000&auto=format&fit=crop',
    trackUrl: 'https://www.youtube.com/watch?v=uA0L3n3SjA0',
  },
  {
    id: '4',
    name: 'Uncle Waffles',
    genre: 'Amapiano',
    region: 'Swaziland',
    bio: 'The princess of Amapiano, high-energy performances and contagious rhythm making her a global breakout star.',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    trackUrl: 'https://www.youtube.com/watch?v=k_n799D7-kY',
  },
  {
    id: '5',
    name: 'Diamond Platnumz',
    genre: 'Bongo Flava',
    region: 'Tanzania',
    bio: 'The king of East African pop, Diamond Platnumz has conquered the continent with his infectious hits and world-class production.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
    trackUrl: 'https://www.youtube.com/watch?v=7X9F5H0n_2Q',
  },
  {
    id: '6',
    name: 'Wegz',
    genre: 'Trap / Mahraganat',
    region: 'Egypt',
    bio: 'Defining the sound of modern Cairo, Wegz is a pioneer of Egyptian trap, blending traditional influences with cutting-edge beats.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253361-b83f85df0f5c?q=80&w=1000&auto=format&fit=crop',
    trackUrl: 'https://www.youtube.com/watch?v=MAnS8G1EwOQ',
  },
];

export const FEATURED_TRACKS: Track[] = [
  {
    id: 't1',
    title: 'City Boys',
    artistId: '1',
    artistName: 'Burna Boy',
    duration: '3:45',
    url: 'https://www.youtube.com/watch?v=dAnNf_vWIn4',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 't2',
    title: 'Love Me JeJe',
    artistId: '2',
    artistName: 'Tems',
    duration: '2:55',
    url: 'https://www.youtube.com/watch?v=E-rV8E-uEGI',
    coverUrl: 'https://images.unsplash.com/photo-1459749411177-0421800673d6?q=80&w=1000&auto=format&fit=crop',
  },
];

export const TRAINING_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Music Industry How-To Guides',
    description: 'Comprehensive guides on production, marketing, and the business of music in Africa.',
    category: 'Business',
    link: 'https://www.musicinafrica.net/know-how',
  },
  {
    id: 'r2',
    title: 'Revenue Models for Musicians',
    description: 'Exploring the various ways African artists can monetize their work in the digital age.',
    category: 'Finance',
    link: 'https://www.musicinafrica.net/magazine/revenue-models-musicians-africa',
  },
  {
    id: 'r3',
    title: 'Copyright and Royalties',
    description: 'Essential knowledge on protecting your intellectual property and collecting royalties.',
    category: 'Legal',
    link: 'https://www.musicinafrica.net/magazine/copyright-and-royalties-africa',
  },
  {
    id: 'r4',
    title: 'Digital Distribution Guide',
    description: 'Step-by-step instructions on getting your music onto global streaming platforms.',
    category: 'Distribution',
    link: 'https://www.musicinafrica.net/magazine/music-distribution-africa',
  },
  {
    id: 'r5',
    title: 'African Music Data Hub',
    description: 'Access to research and analytics on the continental music industry and trends.',
    category: 'Data',
    link: 'https://africanmusiclibrary.org/',
  },
];

export const RECENTLY_PLAYED: Track[] = [
  {
    id: 'rp1',
    title: 'Water',
    artistId: 'tyla',
    artistName: 'Tyla',
    duration: '3:20',
    url: 'https://www.youtube.com/watch?v=ecl_17S7y-4',
    coverUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000',
  },
  {
    id: 'rp2',
    title: 'Higher',
    artistId: 'tems',
    artistName: 'Tems',
    duration: '3:11',
    url: 'https://www.youtube.com/watch?v=jOp7D0S0nF0',
    coverUrl: 'https://images.unsplash.com/photo-1514525253361-b83f85df0f5c?q=80&w=1000',
  },
  {
    id: 'rp3',
    title: 'Last Last',
    artistId: 'burnaboy',
    artistName: 'Burna Boy',
    duration: '2:52',
    url: 'https://www.youtube.com/watch?v=421w1j87fEM',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
  },
];
