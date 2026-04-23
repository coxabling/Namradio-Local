/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Artist {
  id: string;
  name: string;
  genre: string;
  region: string;
  bio: string;
  imageUrl: string;
  trackUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  duration: string;
  url: string;
  coverUrl: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Training' | 'Support' | 'Marketing';
  link: string;
}
