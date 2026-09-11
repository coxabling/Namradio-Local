/**
 * SEO metadata and structured data configuration for Nam Radio Local
 * All routes have dedicated titles, descriptions, canonicals, headings and JSON-LD schema
 */

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  h1: string;
  h2s: string[];
  keywords?: string[];
  canonical: string;
  schemaType: string;
  schema: Record<string, any>;
}

export const BASE_URL = "https://namradiolocal.com";
export const BRAND_OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;

export const PAGES_SEO: Record<string, PageSEO> = {
  "/": {
    path: "/",
    title: "Nam Radio Local | Live African Music & Emerging Artist Radio Station",
    description: "Listen to Nam Radio Local live from Windhoek, Namibia. Streaming Afrobeats, Amapiano, Bongo Flava 24/7 and empowering upcoming independent African artists.",
    canonical: `${BASE_URL}/`,
    h1: "The Sound Of The Continent — Nam Radio Local",
    h2s: [
      "Broadcasting Live from Windhoek, Namibia",
      "Featured African Artists & Continental Talent",
      "24/7 Live Radio Schedule & Daily Shows",
      "Recently Played Tracks on Nam Radio Local",
      "Artist Training Hub & Empowerment Resources"
    ],
    schemaType: "RadioStation",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["RadioStation", "Organization"],
          "@id": `${BASE_URL}/#station`,
          "name": "Nam Radio Local",
          "alternateName": "Nam Radio",
          "url": `${BASE_URL}/`,
          "logo": `${BASE_URL}/images/og-image.png`,
          "image": BRAND_OG_IMAGE,
          "description": "Nam Radio Local is an all-African music radio station broadcasting live from Windhoek, Namibia, empowering emerging African artists with global airplay and music industry resources.",
          "email": "info@nam-radio.com",
          "telephone": "+264810000000",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Independence Avenue",
            "addressLocality": "Windhoek",
            "addressRegion": "Khomas",
            "addressCountry": "NA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -22.5609,
            "longitude": 17.0658
          },
          "areaServed": [
            { "@type": "Country", "name": "Namibia" },
            { "@type": "Continent", "name": "Africa" },
            { "@type": "Place", "name": "Worldwide" }
          ],
          "genre": ["Afrobeats", "Amapiano", "Bongo Flava", "African Music", "Kwaito", "Afropop"],
          "sameAs": [
            "https://www.facebook.com/namradiolocal",
            "https://www.nam-radio.com",
            "https://twitter.com/namradiolocal",
            "https://instagram.com/namradiolocal",
            "https://music-station.live/public/nam_radio_local"
          ]
        },
        {
          "@type": "BroadcastService",
          "@id": `${BASE_URL}/#stream`,
          "name": "Nam Radio Local 24/7 Live Audio Stream",
          "broadcaster": { "@id": `${BASE_URL}/#station` },
          "broadcastDisplayName": "Nam Radio Local Live",
          "broadcastChannelId": "nam_radio_local",
          "broadcastFrequency": "Internet Stream 128kbps MP3",
          "genre": "African Music",
          "inLanguage": "en",
          "url": "https://music-station.live/listen/nam_radio_local/radio.mp3"
        }
      ]
    }
  },

  "/about": {
    path: "/about",
    title: "About Nam Radio Local | African Music Radio Station in Windhoek, Namibia",
    description: "Learn about Nam Radio Local's mission to bridge the resource gap for upcoming African artists. Broadcasting 24/7 live from Windhoek, Namibia to global listeners.",
    canonical: `${BASE_URL}/about`,
    h1: "About Nam Radio Local — Bridging the African Music Gap",
    h2s: [
      "Our Story: Broadcasting Live from Windhoek, Namibia",
      "The Mission: Empowering Upcoming African Artists",
      "Overcoming Media Scarcity for Independent Creators",
      "Our Studio & Broadcast Infrastructure",
      "The Collective Ethos: From Streets to Global Stages"
    ],
    schemaType: "AboutPage",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${BASE_URL}/about#webpage`,
      "url": `${BASE_URL}/about`,
      "name": "About Nam Radio Local | African Music Radio Station in Windhoek, Namibia",
      "description": "The mission and story of Nam Radio Local, broadcasting live from Windhoek Namibia to champion emerging African musical voices.",
      "mainEntity": {
        "@type": "RadioStation",
        "name": "Nam Radio Local",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Windhoek",
          "addressRegion": "Khomas",
          "addressCountry": "NA"
        }
      }
    }
  },

  "/schedule": {
    path: "/schedule",
    title: "Broadcast Schedule & Daily Shows | Nam Radio Local 24/7 Lineup",
    description: "Explore the 24/7 broadcast schedule on Nam Radio Local. Discover daily shows, Afrobeats countdowns, Amapiano sunset sessions, and independent artist spotlights in Central Africa Time (CAT).",
    canonical: `${BASE_URL}/schedule`,
    h1: "Nam Radio Local 24/7 Broadcast Schedule",
    h2s: [
      "Daily Show Lineup & Resident Curators",
      "Peak Hours: Afrobeats Pulse & Amapiano Sunset Groove",
      "Independent Artist Airplay & Live Submission Hours",
      "Central Africa Time (CAT / UTC+2) Broadcasting Clock",
      "Auto-DJ & Global Overnight Rhythms"
    ],
    schemaType: "ItemPage",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "@id": `${BASE_URL}/schedule#webpage`,
      "url": `${BASE_URL}/schedule`,
      "name": "Broadcast Schedule & Daily Shows | Nam Radio Local 24/7 Lineup",
      "description": "Complete weekly broadcast schedule and programming guide for Nam Radio Local live stream."
    }
  },

  "/artists": {
    path: "/artists",
    title: "Emerging African Artists Directory & Submission Hub | Nam Radio Local",
    description: "Discover upcoming independent African musicians featured on Nam Radio Local. Submit your tracks for free airplay, join our artist collective, and access training resources.",
    canonical: `${BASE_URL}/artists`,
    h1: "African Artists Directory & Submission Hub",
    h2s: [
      "Featured Independent Artists Across 54 African Nations",
      "How to Submit Your Music for Radio Airplay",
      "Audio Quality & Metadata Submission Guidelines",
      "Artist Portal & Real-time Broadcast Analytics",
      "Training Curriculum: Royalties, Copyright & Distribution"
    ],
    schemaType: "CollectionPage",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/artists#webpage`,
      "url": `${BASE_URL}/artists`,
      "name": "Emerging African Artists Directory & Submission Hub | Nam Radio Local",
      "description": "Comprehensive artist roster and track submission platform for upcoming African talents."
    }
  },

  "/genres/afrobeats": {
    path: "/genres/afrobeats",
    title: "Afrobeats Music on Nam Radio Local | History, Pioneers & Live Radio",
    description: "Discover Afrobeats on Nam Radio Local. Explore West African polyrhythms, the evolution from Fela Kuti to Burna Boy and Rema, and stream 24/7 Afrobeats radio live from Namibia.",
    canonical: `${BASE_URL}/genres/afrobeats`,
    h1: "Afrobeats: The Rhythmic Heartbeat of West Africa",
    h2s: [
      "Origins & Evolution: From Fela Kuti's Afrobeat to Modern Afrobeats",
      "Musical Anatomy: Polyrhythms, Highlife Guitars & Syncopated Drums",
      "The Global Explosion: West African Sounds Dominating World Charts",
      "Featured Afrobeats Artists on Nam Radio Local Airwaves",
      "Tune in to Daily Afrobeats Rotation"
    ],
    schemaType: "Article",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${BASE_URL}/genres/afrobeats#article`,
      "headline": "Afrobeats: The Rhythmic Heartbeat of West Africa on Nam Radio Local",
      "description": "Deep-dive into the history, instrumentation, and cultural impact of Afrobeats music broadcast daily on Nam Radio Local.",
      "image": BRAND_OG_IMAGE,
      "publisher": {
        "@type": "RadioStation",
        "name": "Nam Radio Local",
        "url": BASE_URL
      }
    }
  },

  "/genres/amapiano": {
    path: "/genres/amapiano",
    title: "Amapiano Music on Nam Radio Local | Log Drums, Pretoria Roots & Hits",
    description: "Experience Amapiano on Nam Radio Local. Discover the South African sound revolution, the iconic log drum basslines, jazz chords, and daily live Amapiano radio streaming.",
    canonical: `${BASE_URL}/genres/amapiano`,
    h1: "Amapiano: South Africa's Global Sonic Revolution",
    h2s: [
      "The Genesis of Amapiano: From Pretoria and Soweto Townships",
      "The Iconic Log Drum: The Signature Bass Frequency of Amapiano",
      "Kwaito, Deep House & Jazz Chords: The Harmonic DNA",
      "Amapiano Innovators & Vocalists on Nam Radio Local",
      "Sunset Groove Sessions: Live Amapiano Airwaves"
    ],
    schemaType: "Article",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${BASE_URL}/genres/amapiano#article`,
      "headline": "Amapiano: South Africa's Global Sonic Revolution on Nam Radio Local",
      "description": "The definitive guide to Amapiano music, its log drum sound architecture, and its prominent place on Nam Radio Local.",
      "image": BRAND_OG_IMAGE,
      "publisher": {
        "@type": "RadioStation",
        "name": "Nam Radio Local",
        "url": BASE_URL
      }
    }
  },

  "/genres/bongo-flava": {
    path: "/genres/bongo-flava",
    title: "Bongo Flava Music on Nam Radio Local | East African Melodies & Swahili Rhythms",
    description: "Immerse yourself in authentic Bongo Flava on Nam Radio Local. The premier East African fusion of hip hop, R&B, and traditional Taarab rhythms live from Windhoek, Namibia.",
    canonical: `${BASE_URL}/genres/bongo-flava`,
    h1: "Bongo Flava: East Africa's Melodic Soul & Swahili Rhythms",
    h2s: [
      "Origins in Dar es Salaam, Tanzania: The Meaning of 'Bongo'",
      "Taarab Meets Urban R&B: The Melodic Texture of East Africa",
      "Swahili Lyricism & Storytelling Across Kenya and Tanzania",
      "Pioneers to Modern Heavyweights: From Mr Nice to Diamond Platnumz",
      "East African Heavy Rotation on Nam Radio Local"
    ],
    schemaType: "Article",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${BASE_URL}/genres/bongo-flava#article`,
      "headline": "Bongo Flava: East Africa's Melodic Soul & Swahili Rhythms on Nam Radio Local",
      "description": "Exploration of East Africa's flagship genre Bongo Flava, its Taarab roots, and rotation on Nam Radio Local.",
      "image": BRAND_OG_IMAGE,
      "publisher": {
        "@type": "RadioStation",
        "name": "Nam Radio Local",
        "url": BASE_URL
      }
    }
  },

  "/blog": {
    path: "/blog",
    title: "African Music News & Artist Editorial | Nam Radio Local Journal",
    description: "Read the latest African music news, artist spotlights, royalty guides, and cultural essays from the editorial team at Nam Radio Local in Windhoek, Namibia.",
    canonical: `${BASE_URL}/blog`,
    h1: "Nam Radio Local News & Music Industry Journal",
    h2s: [
      "African Music Industry Analysis & Trend Reports",
      "Practical Guides for Emerging Independent Artists",
      "Spotlights on Rising Stars Across the African Continent",
      "Music Business: DSP Pitching, ISRC Metadata & Split Sheets",
      "Behind the Scenes at Nam Radio Local Windhoek Studio"
    ],
    schemaType: "Blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${BASE_URL}/blog#blog`,
      "name": "Nam Radio Local News & Music Industry Journal",
      "description": "Articles, guides, and cultural commentary covering African music, independent artist development, and continental trends.",
      "publisher": {
        "@type": "RadioStation",
        "name": "Nam Radio Local",
        "url": BASE_URL
      }
    }
  }
};
