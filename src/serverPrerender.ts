import { PAGES_SEO, BASE_URL, BRAND_OG_IMAGE } from "./seoData.js";

function getNavHtml(activePath: string): string {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Schedule", href: "/schedule" },
    { name: "Artists", href: "/artists" },
    { name: "Afrobeats", href: "/genres/afrobeats" },
    { name: "Amapiano", href: "/genres/amapiano" },
    { name: "Bongo Flava", href: "/genres/bongo-flava" },
    { name: "News & Blog", href: "/blog" }
  ];

  const linksHtml = links
    .map((l) => {
      const isActive = activePath === l.href;
      return `<a href="${l.href}" class="hover:text-primary transition-colors ${
        isActive ? "text-primary font-black" : "text-white/60"
      }">${l.name}</a>`;
    })
    .join("\n");

  return `
    <header class="fixed top-0 left-0 right-0 z-[60] bg-black/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-white/10">
      <div class="flex items-center gap-3">
        <a href="/" class="flex items-center gap-2 group" aria-label="Nam Radio Local Homepage">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-black text-black">
            📻
          </div>
          <span class="font-bold text-xl tracking-tighter uppercase whitespace-nowrap text-white">
            Nam Radio <span class="text-primary">Local</span>
          </span>
        </a>
      </div>

      <nav class="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider" aria-label="Main Navigation">
        ${linksHtml}
      </nav>

      <div class="flex items-center gap-3">
        <a
          href="https://www.nam-radio.com"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 hover:bg-primary hover:text-black text-primary border border-primary/30 rounded-full transition-all text-[10px] font-bold uppercase tracking-wider"
          title="Visit Partner Radio Station www.nam-radio.com"
        >
          <span>Partner: www.nam-radio.com</span>
          <span aria-hidden="true">↗</span>
        </a>

        <a
          href="/artists#apply"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold uppercase rounded-full text-[10px] tracking-widest hover:scale-105 transition-transform"
        >
          <span>Artist Hub</span>
        </a>
      </div>
    </header>
  `;
}

function getFooterHtml(): string {
  return `
    <footer class="pt-24 pb-36 border-t border-white/5 bg-[#0e0e0e] text-white/50 text-sm">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">📻</span>
            <span class="font-bold text-lg tracking-tighter uppercase text-white">
              Nam Radio <span class="text-primary">Local</span>
            </span>
          </div>
          <p class="max-w-md text-white/60 mb-6 leading-relaxed">
            Nam Radio Local is an all-African music radio station broadcasting live from Windhoek, Namibia. We bridge the resource gap for upcoming African artists, providing airplay, legal education, and digital distribution to the world.
          </p>
          <div class="flex flex-wrap gap-4 text-xs font-bold text-white/40">
            <span class="text-primary">📍 Windhoek, Khomas, Namibia</span>
            <span>🌍 24/7 Global Live Stream</span>
            <span>✉️ <a href="mailto:info@nam-radio.com" class="hover:text-primary transition-colors">info@nam-radio.com</a></span>
          </div>
        </div>

        <div>
          <h3 class="font-bold uppercase tracking-widest text-xs text-white mb-4">Explore Radio</h3>
          <ul class="space-y-2.5 text-xs">
            <li><a href="/" class="hover:text-primary transition-colors">Live Radio Player</a></li>
            <li><a href="/schedule" class="hover:text-primary transition-colors">Broadcast Schedule</a></li>
            <li><a href="/artists" class="hover:text-primary transition-colors">Featured Talent</a></li>
            <li><a href="/about" class="hover:text-primary transition-colors">About Nam Radio Local</a></li>
            <li><a href="/blog" class="hover:text-primary transition-colors">News & Editorial Journal</a></li>
            <li>
              <a href="https://www.nam-radio.com" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-bold flex items-center gap-1">
                Partner: www.nam-radio.com <span>↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold uppercase tracking-widest text-xs text-white mb-4">African Genres</h3>
          <ul class="space-y-2.5 text-xs">
            <li><a href="/genres/afrobeats" class="hover:text-primary transition-colors">Afrobeats (West Africa)</a></li>
            <li><a href="/genres/amapiano" class="hover:text-primary transition-colors">Amapiano (South Africa)</a></li>
            <li><a href="/genres/bongo-flava" class="hover:text-primary transition-colors">Bongo Flava (East Africa)</a></li>
            <li><a href="/artists#apply" class="hover:text-primary transition-colors">Submit Music for Airplay</a></li>
            <li><a href="/#training" class="hover:text-primary transition-colors">Artist Training Hub</a></li>
          </ul>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">
        <div>© 2026 Nam Radio Local • Broadcasting Live from Windhoek, Namibia</div>
        <div class="flex gap-4 mt-2 sm:mt-0">
          <a href="/about" class="hover:text-white transition-colors">Privacy & Terms</a>
          <span>•</span>
          <a href="/sitemap.xml" class="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  `;
}

export function renderFullRouteHtml(pathname: string): string {
  const cleanPath = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const seo = PAGES_SEO[cleanPath] || PAGES_SEO["/"];
  const navHtml = getNavHtml(cleanPath);
  const footerHtml = getFooterHtml();

  let pageContent = "";

  switch (cleanPath) {
    case "/about":
      pageContent = `
        <main class="pt-32 pb-24 px-6 max-w-5xl mx-auto">
          <div class="mb-12">
            <span class="text-secondary text-xs uppercase font-black tracking-[0.3em] block mb-3">About Nam Radio Local</span>
            <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              ${seo.h1}
            </h1>
            <p class="text-xl text-white/70 leading-relaxed font-light">
              Broadcasting 24/7 live from Windhoek, Namibia, Nam Radio Local is dedicated to dismantling the barriers faced by independent African musicians.
            </p>
          </div>

          <div class="space-y-12 text-white/80 leading-relaxed text-base">
            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[0]}
              </h2>
              <p class="mb-4">
                Based in Windhoek, the capital of Namibia, Nam Radio Local was born out of a profound realization: while Africa is experiencing an unprecedented cultural renaissance, countless talented musicians across the continent lack access to commercial radio syndication, music publishing mentorship, and international media exposure.
              </p>
              <p>
                From our studio operations in the Khomas region, we beam high-fidelity African audio streams across the continent and to the worldwide diaspora, proving that extraordinary music thrives in every corner of Africa.
              </p>
            </section>

            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[1]}
              </h2>
              <p class="mb-4">
                Commercial broadcast channels often reserve rotation slots exclusively for major label releases. Nam Radio Local challenges this dynamic by reserving our airwaves specifically for emerging, independent, and grassroots African artists.
              </p>
              <ul class="list-disc pl-6 space-y-2 text-white/70">
                <li><strong class="text-white">Free Airplay Opportunities:</strong> Artists can submit tracks directly without payola or gatekeeping barriers.</li>
                <li><strong class="text-white">Royalty and Rights Education:</strong> Guidance on SAMRO, CMOs, split sheets, and ISRC metadata registration.</li>
                <li><strong class="text-white">Digital Strategy:</strong> Assisting musicians to claim their Spotify, Apple Music, and YouTube for Artists profiles.</li>
                <li><strong class="text-white">Continental Network:</strong> Bridging artists from Southern Africa with listeners in West, East, North, and Central Africa.</li>
              </ul>
            </section>

            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[2]}
              </h2>
              <p class="mb-4">
                Independent African creators often face severe infrastructure hurdles, including high internet data costs, limited access to music copyright lawyers, and scarce performance venues. Nam Radio Local acts as a vital digital sanctuary where music can be celebrated, documented, and archived.
              </p>
              <div class="flex flex-wrap gap-4 pt-4">
                <a href="/artists" class="px-6 py-3 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform">
                  Browse Artist Hub
                </a>
                <a href="/schedule" class="px-6 py-3 bg-white/10 text-white font-bold uppercase rounded-full text-xs tracking-widest hover:bg-white/20 transition-all">
                  View Broadcast Schedule
                </a>
              </div>
            </section>

            <section class="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-black border border-primary/30">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-white mb-4">
                ${seo.h2s[3]}
              </h2>
              <p class="text-white/80 mb-4">
                <strong>Studio Location:</strong> Windhoek, Khomas Region, Namibia.<br />
                <strong>Stream Output:</strong> 128kbps High Definition MP3 Audio Stream, broadcasting non-stop 365 days a year.<br />
                <strong>Direct Contact:</strong> <a href="mailto:info@nam-radio.com" class="text-primary underline">info@nam-radio.com</a>
              </p>
            </section>
          </div>
        </main>
      `;
      break;

    case "/schedule":
      pageContent = `
        <main class="pt-32 pb-24 px-6 max-w-6xl mx-auto">
          <div class="mb-12">
            <span class="text-primary text-xs uppercase font-black tracking-[0.3em] block mb-3">Live Radio Programming</span>
            <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              ${seo.h1}
            </h1>
            <p class="text-lg text-white/70 max-w-3xl leading-relaxed">
              Our 24/7 schedule is curated in Central Africa Time (CAT / UTC+2). Enjoy continuous live broadcasts, genre spotlights, and emerging African artist discoveries.
            </p>
          </div>

          <div class="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap justify-between items-center gap-4">
            <div>
              <span class="text-[10px] uppercase font-bold tracking-widest text-primary block">Current Station Time Zone</span>
              <span class="text-xl font-mono text-white font-bold">Central Africa Time (CAT) • UTC+2 • Windhoek</span>
            </div>
            <a href="/" class="px-6 py-3 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform">
              ▶ Listen Live Now
            </a>
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-bold uppercase tracking-tight text-white mb-6">
              ${seo.h2s[0]}
            </h2>

            <div class="grid gap-4">
              ${[
                { time: "06:00 - 09:00 CAT", title: "Morning Sunrise: Acoustic Africa", desc: "Soulful acoustic sounds, desert blues, traditional folk harmonies, and uplifting African morning rhythms.", genre: "Acoustic / Soul" },
                { time: "09:00 - 13:00 CAT", title: "NAM — Charts & Continental Discovery", desc: "Our flagship countdown highlighting top emerging tracks voted by listeners across Namibia and the continent.", genre: "Top Charts / Discovery" },
                { time: "13:00 - 16:00 CAT", title: "Afrobeats Continental Pulse", desc: "High-energy West African rhythms, contemporary Afropop, Naija beats, and Ghanaian highlife fusions.", genre: "Afrobeats" },
                { time: "16:00 - 19:00 CAT", title: "Amapiano Sunset Groove: Log Drums & Vibez", desc: "Deep township basslines, hypnotic jazz keys, and the latest Pretoria & Soweto dance floor anthems.", genre: "Amapiano" },
                { time: "19:00 - 22:00 CAT", title: "Bongo Flava & East African Sounds", desc: "Swahili poetic lyricism, melodious Tanzanian harmonies, and Nairobi urban pop selections.", genre: "Bongo Flava" },
                { time: "22:00 - 02:00 CAT", title: "Late Night Sessions: Unsigned & Independent", desc: "Uncensored, experimental, underground hip hop, alternative R&B, and brand new artist demo submissions.", genre: "Independent Showcase" },
                { time: "02:00 - 06:00 CAT", title: "Overnight Global African Mix", desc: "Seamless cross-continental journey through Afro-House, Kuduro, Kizomba, and ambient African soundscapes.", genre: "Global African Mix" }
              ]
                .map(
                  (show) => `
                <article class="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div class="md:w-1/4">
                    <span class="text-xs font-mono text-primary font-bold block">${show.time}</span>
                    <span class="text-[10px] uppercase font-bold tracking-widest text-white/40">${show.genre}</span>
                  </div>
                  <div class="md:w-2/4">
                    <h3 class="text-lg font-bold text-white mb-1">${show.title}</h3>
                    <p class="text-xs text-white/60 leading-relaxed">${show.desc}</p>
                  </div>
                  <div class="md:w-1/4 flex md:justify-end">
                    <span class="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase font-bold text-white/80">Broadcasting Daily</span>
                  </div>
                </article>
              `
                )
                .join("\n")}
            </div>
          </div>
        </main>
      `;
      break;

    case "/artists":
      pageContent = `
        <main class="pt-32 pb-24 px-6 max-w-6xl mx-auto">
          <div class="mb-12">
            <span class="text-primary text-xs uppercase font-black tracking-[0.3em] block mb-3">Artist Hub & Submissions</span>
            <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              ${seo.h1}
            </h1>
            <p class="text-lg text-white/70 max-w-3xl leading-relaxed">
              Nam Radio Local is dedicated to leveling the playing field for African creators. Discover our roster of independent talent and learn how to get your music playlisted.
            </p>
          </div>

          <section class="mb-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-white/5 to-black border border-primary/20">
            <h2 class="text-2xl font-bold uppercase tracking-tight text-white mb-4">
              ${seo.h2s[1]}
            </h2>
            <p class="text-white/70 mb-6 leading-relaxed">
              We accept musical submissions from all 54 African countries and the global diaspora. Our music curation committee reviews submissions every week on a purely musical merit basis.
            </p>
            <div class="grid sm:grid-cols-3 gap-6 mb-8">
              <div class="p-4 rounded-xl bg-black/40 border border-white/10">
                <span class="text-primary text-xl font-bold block mb-1">1. Audio Quality</span>
                <p class="text-xs text-white/60">320kbps MP3 or 24-bit WAV mastered file with clear vocal mix.</p>
              </div>
              <div class="p-4 rounded-xl bg-black/40 border border-white/10">
                <span class="text-primary text-xl font-bold block mb-1">2. Complete ID3 Tagging</span>
                <p class="text-xs text-white/60">Exact Song Title, Artist Name, Album/EP, Genre, and Year encoded in metadata.</p>
              </div>
              <div class="p-4 rounded-xl bg-black/40 border border-white/10">
                <span class="text-primary text-xl font-bold block mb-1">3. Split-Sheet Ready</span>
                <p class="text-xs text-white/60">Producer and songwriter credits confirmed with CMO/PRO registration.</p>
              </div>
            </div>
            <a href="mailto:info@nam-radio.com?subject=Artist%20Submission%20-%20Nam%20Radio%20Local" class="inline-block px-8 py-4 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform">
              Submit Music via Email (info@nam-radio.com)
            </a>
          </section>

          <section>
            <h2 class="text-2xl font-bold uppercase tracking-tight text-white mb-6">
              ${seo.h2s[0]}
            </h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${[
                { name: "Gazza", region: "Namibia", genre: "Kwaito / Afro-House", bio: "Namibian music legend celebrating authentic Namibian rhythms on the global stage." },
                { name: "Lioness", region: "Namibia", genre: "Afro-Rap / Hip Hop", bio: "Dynamic lyricist blending medical professionalism with razor-sharp flows." },
                { name: "Asake", region: "Nigeria", genre: "Afrobeats / Fuji Fusion", bio: "Innovator of chorus harmonies and high-tempo West African street anthems." },
                { name: "Kabza De Small", region: "South Africa", genre: "Amapiano", bio: "The undisputed King of Amapiano log drum bass architecture." },
                { name: "Diamond Platnumz", region: "Tanzania", genre: "Bongo Flava", bio: "East African superstar carrying Swahili rhythms to stadiums worldwide." },
                { name: "Uncle Waffles", region: "Eswatini / South Africa", genre: "Amapiano", bio: "Global DJ sensation taking the Amapiano movement to Coachella and beyond." }
              ]
                .map(
                  (a) => `
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <span class="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">${a.region} • ${a.genre}</span>
                    <h3 class="text-xl font-bold text-white mb-2">${a.name}</h3>
                    <p class="text-xs text-white/60 leading-relaxed mb-4">${a.bio}</p>
                  </div>
                  <span class="text-[10px] text-white/40 uppercase font-mono">In High Rotation on Nam Radio Local</span>
                </div>
              `
                )
                .join("\n")}
            </div>
          </section>
        </main>
      `;
      break;

    case "/genres/afrobeats":
      pageContent = `
        <main class="pt-32 pb-24 px-6 max-w-5xl mx-auto">
          <div class="mb-12">
            <a href="/artists" class="text-primary text-xs uppercase font-bold tracking-widest inline-block mb-3">← Back to All Genres</a>
            <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              ${seo.h1}
            </h1>
            <p class="text-xl text-white/70 leading-relaxed font-light">
              From the pioneering Afrobeat of Fela Kuti to modern Afrobeats filling arenas in London, New York, and Lagos, West African rhythms have captured the imagination of the planet.
            </p>
          </div>

          <article class="space-y-8 text-white/80 leading-relaxed">
            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[0]}
              </h2>
              <p class="mb-4">
                It is vital to distinguish between singular <em>Afrobeat</em>—founded in Nigeria during the late 1960s by Fela Anikulapo Kuti and drummer Tony Allen as a fusion of Ghanaian highlife, jazz, Yoruba percussion, and anti-colonial political resistance—and the plural <em>Afrobeats</em>.
              </p>
              <p>
                Contemporary Afrobeats emerged in the late 2000s as a cross-continental hybrid fusing Nigerian pop, UK funky house, Ghanaian hiplife, and American R&B. Driven by visionary producers in Lagos, Accra, and London, Afrobeats transformed African youth culture into an irresistible global export.
              </p>
            </section>

            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[1]}
              </h2>
              <p class="mb-4">
                What makes an Afrobeats track instantly recognizable?
              </p>
              <ul class="list-disc pl-6 space-y-2 text-white/70">
                <li><strong class="text-white">Polyrhythmic Clave & Shakers:</strong> Layered triplets and syncopated percussion that naturally compel dance movement.</li>
                <li><strong class="text-white">Highlife Guitar Chops:</strong> Bright, melodic plucked guitars carrying sweet West African harmonies.</li>
                <li><strong class="text-white">Multilingual Lyricism:</strong> Effortless switches between Nigerian Pidgin English, Yoruba, Igbo, Twi, and French.</li>
                <li><strong class="text-white">Vocal Call-and-Response:</strong> Rooted in traditional community chants, evoking celebration and unity.</li>
              </ul>
            </section>

            <section class="p-8 rounded-3xl bg-primary/10 border border-primary/30">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-white mb-4">
                ${seo.h2s[4]}
              </h2>
              <p class="text-white/80 mb-6">
                Nam Radio Local broadcasts dedicated Afrobeats blocks daily, featuring both the biggest stadium anthems and the freshest raw demos straight from studios in Lagos, Accra, and across Africa.
              </p>
              <a href="/" class="px-6 py-3 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest inline-block hover:scale-105 transition-transform">
                Stream Live Afrobeats Now
              </a>
            </section>
          </article>
        </main>
      `;
      break;

    case "/genres/amapiano":
      pageContent = `
        <main class="pt-32 pb-24 px-6 max-w-5xl mx-auto">
          <div class="mb-12">
            <a href="/artists" class="text-primary text-xs uppercase font-bold tracking-widest inline-block mb-3">← Back to All Genres</a>
            <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              ${seo.h1}
            </h1>
            <p class="text-xl text-white/70 leading-relaxed font-light">
              Emerging from South Africa's townships, Amapiano ("the pianos" in Zulu) has revolutionized electronic dance music with its intoxicating log drums and soulful jazz keys.
            </p>
          </div>

          <article class="space-y-8 text-white/80 leading-relaxed">
            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[0]}
              </h2>
              <p class="mb-4">
                In the early 2010s in the townships of Pretoria, Johannesburg, and Soweto, young bedroom producers began experimenting with tempo reductions of deep house (dropping from 125 BPM down to 112–115 BPM). They spliced elements of South African Kwaito, soulful jazz chords, and percussive church organ riffs.
              </p>
              <p>
                What began on WhatsApp group audio shares and township pub sound systems soon swept through TikTok, London clubs, and world festival stages, making Amapiano the fastest-growing African electronic genre in history.
              </p>
            </section>

            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[1]}
              </h2>
              <p class="mb-4">
                The defining sonic signature of Amapiano is the legendary <strong>Log Drum</strong>. Unlike a conventional acoustic wooden log drum, this sound is synthesized through FM synthesis and pitch envelope manipulation, generating a hollow, pitched percussive sub-bass drop that hits the listener right in the chest.
              </p>
              <p>
                When paired with wide shaker loops, whistle fills, and the seductive chants of township vocalists, Amapiano creates an ecstatic, communal spiritual experience on the dance floor.
              </p>
            </section>

            <section class="p-8 rounded-3xl bg-primary/10 border border-primary/30">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-white mb-4">
                ${seo.h2s[4]}
              </h2>
              <p class="text-white/80 mb-6">
                Tune in to Nam Radio Local every afternoon for the <em>Amapiano Sunset Groove</em> (16:00 - 19:00 CAT), bringing the authentic sound of Pretoria and Johannesburg straight to your speakers.
              </p>
              <a href="/" class="px-6 py-3 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest inline-block hover:scale-105 transition-transform">
                Listen to Amapiano Sunset Groove
              </a>
            </section>
          </article>
        </main>
      `;
      break;

    case "/genres/bongo-flava":
      pageContent = `
        <main class="pt-32 pb-24 px-6 max-w-5xl mx-auto">
          <div class="mb-12">
            <a href="/artists" class="text-primary text-xs uppercase font-bold tracking-widest inline-block mb-3">← Back to All Genres</a>
            <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              ${seo.h1}
            </h1>
            <p class="text-xl text-white/70 leading-relaxed font-light">
              Born on the streets of Dar es Salaam, Tanzania, Bongo Flava blends traditional coastal Taarab, hip-hop, and urban Afropop with poetic Swahili storytelling.
            </p>
          </div>

          <article class="space-y-8 text-white/80 leading-relaxed">
            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[0]}
              </h2>
              <p class="mb-4">
                The name originates from the Swahili word <em>Bongo</em> (meaning brains, resourcefulness, or street hustle), a fond nickname for Tanzania's bustling commercial metropolis, Dar es Salaam. "Flava" denotes the unique coastal flavor that local youth injected into American hip-hop in the 1990s.
              </p>
              <p>
                Over three decades, Bongo Flava transitioned from underground freestyle ciphers into East Africa's dominant commercial pop music, boasting hundreds of millions of views and dominating airwaves from Kenya to Uganda, Rwanda, and the Democratic Republic of Congo.
              </p>
            </section>

            <section class="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-primary mb-4">
                ${seo.h2s[1]}
              </h2>
              <p class="mb-4">
                What distinguishes Bongo Flava from other African contemporary styles is its profound roots in coastal <em>Taarab</em> music. Taarab, which was influenced by Arab, Indian, and Swahili musical exchanges along the Indian Ocean coast, relies on rich string arrangements, subtle accordions, and deeply metaphorical lyrics.
              </p>
              <p>
                Bongo Flava artists bring these vocal melismas and sweet melodic cadences to modern 808 beats, resulting in deeply emotive romantic ballads and infectious dance tracks.
              </p>
            </section>

            <section class="p-8 rounded-3xl bg-primary/10 border border-primary/30">
              <h2 class="text-2xl font-bold uppercase tracking-tight text-white mb-4">
                ${seo.h2s[4]}
              </h2>
              <p class="text-white/80 mb-6">
                Nam Radio Local honors East African musical excellence with dedicated Bongo Flava prime-time shows, highlighting both Tanzania's iconic hitmakers and the next generation of Nairobi & Dar es Salaam bedroom producers.
              </p>
              <a href="/" class="px-6 py-3 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest inline-block hover:scale-105 transition-transform">
                Listen to Bongo Flava Live
              </a>
            </section>
          </article>
        </main>
      `;
      break;

    case "/blog":
      pageContent = `
        <main class="pt-32 pb-24 px-6 max-w-6xl mx-auto">
          <div class="mb-12">
            <span class="text-primary text-xs uppercase font-black tracking-[0.3em] block mb-3">Music Editorial & Insights</span>
            <h1 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              ${seo.h1}
            </h1>
            <p class="text-lg text-white/70 max-w-3xl leading-relaxed">
              Essays, technical guides, and cultural deep-dives on the African music industry, authored by broadcasters and music curators at Nam Radio Local in Windhoek, Namibia.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            ${[
              {
                title: "How Emerging African Artists Can Monetize Music Royalties in 2026",
                date: "September 8, 2026",
                author: "Nam Radio Music Editorial",
                tag: "Music Business Guide",
                summary: "Understanding split sheets, ISRC codes, mechanical royalties, and performing rights organizations (SAMRO, CMOs) across African territories."
              },
              {
                title: "The Log Drum Revolution: How Amapiano Conquered Global Dance Floors",
                date: "August 28, 2026",
                author: "DJ K-Vibe, Windhoek",
                tag: "Genre Analysis",
                summary: "An in-depth look at how bedroom producers in Pretoria and Soweto turned deep house inside out and captured the imagination of clubbers worldwide."
              },
              {
                title: "Namibia's Independent Music Renaissance: Gazza, Lioness & The Next Wave",
                date: "August 15, 2026",
                author: "Editorial Collective",
                tag: "Artist Spotlight",
                summary: "Why Windhoek's vibrant creative scene is producing some of the most daring musical hybrids across Kwaito, Afro-trap, and soulful acoustic melodies."
              },
              {
                title: "Streaming DSP Pitching Secrets: How to Get Playlisted on Spotify and Apple Music",
                date: "August 2, 2026",
                author: "Artist Training Hub",
                tag: "Career Development",
                summary: "Step-by-step tutorial on crafting your artist biography, high-resolution press kit (EPK), and submitting unreleased tracks to editorial playlist curators."
              }
            ]
              .map(
                (post) => `
              <article class="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 text-xs mb-3">
                    <span class="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-wider">${post.tag}</span>
                    <span class="text-white/40">${post.date}</span>
                  </div>
                  <h2 class="text-2xl font-bold text-white mb-3 hover:text-primary transition-colors">
                    ${post.title}
                  </h2>
                  <p class="text-sm text-white/60 leading-relaxed mb-6">
                    ${post.summary}
                  </p>
                </div>
                <div class="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40 font-mono">
                  <span>By ${post.author}</span>
                  <span class="text-primary font-bold uppercase tracking-wider">Read Guide →</span>
                </div>
              </article>
            `
              )
              .join("\n")}
          </div>
        </main>
      `;
      break;

    default:
      // Homepage: Render full rich interactive layout with crawlable text, live radio player, schedule preview, featured talent, training hub
      pageContent = `
        <main>
          <!-- Hero Section -->
          <section class="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
                  <span class="text-secondary">✨</span>
                  <span class="text-[10px] uppercase font-bold tracking-[0.3em] text-white/80">Empowering African Voices</span>
                </div>
                <h1 class="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-white mb-8 italic">
                  The Sound <br />
                  <span class="text-primary">Of The</span> <br />
                  Continent
                </h1>
                <p class="text-lg md:text-xl text-white/70 leading-relaxed max-w-lg mb-8">
                  Nam Radio Local is your gateway to undiscovered African talent. We bridge the gap between local rhythm and global reach, broadcasting 24/7 live from Windhoek, Namibia.
                </p>
                <div class="flex flex-wrap items-center gap-4">
                  <a href="#listen" class="px-8 py-4 rounded-full bg-primary text-black font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                    <span>▶</span> Listen Live (24/7)
                  </a>
                  <a href="/artists" class="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all font-bold uppercase text-xs tracking-widest">
                    Artist Hub & Directory
                  </a>
                  <a
                    href="https://www.nam-radio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-8 py-4 rounded-full bg-primary/10 hover:bg-primary hover:text-black border border-primary/30 text-primary transition-all flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
                  >
                    <span>Partner Station: www.nam-radio.com</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div class="glass p-8 rounded-[3rem] border border-white/10 shadow-2xl relative">
                <div class="aspect-square max-w-md mx-auto relative rounded-3xl overflow-hidden mb-6 bg-black/40 flex items-center justify-center">
                  <img
                    src="${BRAND_OG_IMAGE}"
                    alt="Nam Radio Local - Live African Radio from Windhoek Namibia"
                    class="w-full h-full object-cover rounded-2xl"
                    width="600"
                    height="600"
                    fetchpriority="high"
                  />
                </div>
                <div class="text-center">
                  <span class="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">Now Broadcasting Live</span>
                  <h2 class="text-2xl font-black uppercase text-white mb-1">Nam Radio Local Live Stream</h2>
                  <p class="text-sm text-white/50 mb-4">Afrobeats • Amapiano • Bongo Flava • 24/7 Central Africa Time</p>
                  <audio controls class="w-full h-10 rounded-full" preload="none">
                    <source src="https://music-station.live/listen/nam_radio_local/radio.mp3" type="audio/mpeg" />
                    Your browser does not support audio element.
                  </audio>
                </div>
              </div>
            </div>
          </section>

          <!-- Core Pillars -->
          <section class="bg-surface py-12 border-y border-white/5">
            <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
              <div class="flex gap-4 items-center">
                <div class="p-3 bg-primary/10 rounded-2xl text-primary text-xl">⚡</div>
                <div>
                  <h3 class="font-bold uppercase tracking-widest text-sm text-white mb-1">Local Focus</h3>
                  <p class="text-xs text-white/50">Powering emerging grassroots talent across 54 African nations.</p>
                </div>
              </div>
              <div class="flex gap-4 items-center">
                <div class="p-3 bg-secondary/10 rounded-2xl text-secondary text-xl">🌍</div>
                <div>
                  <h3 class="font-bold uppercase tracking-widest text-sm text-white mb-1">Global Impact</h3>
                  <p class="text-xs text-white/50">Broadcasting live from Windhoek to international audiences and media outlets.</p>
                </div>
              </div>
              <div class="flex gap-4 items-center">
                <div class="p-3 bg-accent/10 rounded-2xl text-accent text-xl">🛡️</div>
                <div>
                  <h3 class="font-bold uppercase tracking-widest text-sm text-white mb-1">Total Support</h3>
                  <p class="text-xs text-white/50">Free airplay, legal copyright education, and digital distribution training.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Featured Artists -->
          <section id="artists" class="py-24 px-6 max-w-7xl mx-auto">
            <div class="mb-12">
              <span class="text-primary text-xs uppercase font-black tracking-[0.3em] block mb-2">Continental Talent</span>
              <h2 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Featured African Artists
              </h2>
              <p class="text-sm text-white/50 max-w-xl">
                Meet the creators breaking boundaries and defining contemporary African music across Afrobeats, Amapiano, and Bongo Flava.
              </p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${[
                { name: "Gazza", region: "Namibia", genre: "Kwaito / Afro-House", desc: "Namibian music royalty, blending local rhythm with international house grooves." },
                { name: "Lioness", region: "Namibia", genre: "Afro-Rap / Hip Hop", desc: "Award-winning rapper and lyricist championing Namibian artistic independence." },
                { name: "Asake", region: "Nigeria", genre: "Afrobeats / Fuji", desc: "Fuji-infused high energy Afrobeats sensation from Lagos." },
                { name: "Kabza De Small", region: "South Africa", genre: "Amapiano", desc: "Pioneer of Amapiano log drum bass architecture from Pretoria." },
                { name: "Diamond Platnumz", region: "Tanzania", genre: "Bongo Flava", desc: "Leading East African icon carrying Swahili rhythms across the globe." },
                { name: "Uncle Waffles", region: "Eswatini / South Africa", genre: "Amapiano", desc: "Amapiano ambassador igniting global dance floors with infectious grooves." }
              ]
                .map(
                  (art) => `
                <div class="glass p-6 rounded-2xl border border-white/10 hover:border-primary/40 transition-all">
                  <span class="text-[10px] uppercase font-bold tracking-widest text-primary block mb-1">${art.region} • ${art.genre}</span>
                  <h3 class="text-xl font-bold text-white mb-2">${art.name}</h3>
                  <p class="text-xs text-white/60 leading-relaxed">${art.desc}</p>
                </div>
              `
                )
                .join("\n")}
            </div>
            <div class="mt-8 text-center">
              <a href="/artists" class="inline-block px-8 py-3 bg-white/10 text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                View Full Artist Roster & Submission Details →
              </a>
            </div>
          </section>

          <!-- Training & Support Hub -->
          <section id="training" class="py-24 px-6 bg-surface border-t border-white/5">
            <div class="max-w-7xl mx-auto">
              <span class="text-secondary text-xs uppercase font-black tracking-[0.3em] block mb-2">Power To The Artist</span>
              <h2 class="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
                Artist Training Hub & Knowledge Base
              </h2>
              <p class="text-white/70 max-w-2xl mb-12 leading-relaxed">
                We don't just broadcast music; we build sustainable careers for African artists. Learn how to monetize royalties, register copyrights, and master digital distribution.
              </p>

              <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 class="font-bold text-sm uppercase text-white mb-2">Digital Distribution</h3>
                  <p class="text-xs text-white/50 leading-relaxed">Claim your DSP profiles (Spotify, Apple, Boomplay) and pitch directly to global playlist editors.</p>
                </div>
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 class="font-bold text-sm uppercase text-white mb-2">Copyright & Royalties</h3>
                  <p class="text-xs text-white/50 leading-relaxed">Master split sheets, ISRC codes, mechanical royalties, and SAMRO/CMO registration.</p>
                </div>
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 class="font-bold text-sm uppercase text-white mb-2">Media & Press Kits</h3>
                  <p class="text-xs text-white/50 leading-relaxed">Craft professional Electronic Press Kits (EPKs) and pitch stories to international journalists.</p>
                </div>
                <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 class="font-bold text-sm uppercase text-white mb-2">Grants & Funding</h3>
                  <p class="text-xs text-white/50 leading-relaxed">Access cultural grants, continental touring funds, and creative accelerator programs.</p>
                </div>
              </div>

              <div class="p-8 rounded-3xl bg-gradient-to-r from-primary/20 via-white/5 to-black border border-primary/30 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <h3 class="text-xl font-bold uppercase text-white mb-1">Ready for 1-on-1 Mentorship?</h3>
                  <p class="text-xs text-white/60">Submit your profile to join the Nam Radio Local Collective for direct support.</p>
                </div>
                <a href="/artists#apply" class="px-8 py-3 bg-primary text-black font-bold uppercase rounded-full text-xs tracking-widest hover:scale-105 transition-transform whitespace-nowrap">
                  Apply for Training
                </a>
              </div>
            </div>
          </section>

          <!-- Manifesto Quote -->
          <section id="about" class="py-24 px-6 max-w-5xl mx-auto text-center">
            <div class="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <blockquote class="text-2xl sm:text-4xl font-light italic leading-tight text-white/90 mb-8">
              "We believe that no talent should go to waste simply because it lacks a platform. 
              <strong class="text-primary font-black uppercase not-italic">Nam Radio Local</strong> is the bridge from the streets of the continent to the stages of the world."
            </blockquote>
            <p class="text-xs uppercase tracking-[0.4em] font-black text-white/40">
              The Nam Radio Local Collective • Windhoek, Namibia
            </p>
          </section>
        </main>
      `;
      break;
  }

  return `
    <div class="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between">
      ${navHtml}
      ${pageContent}
      ${footerHtml}
    </div>
  `;
}

export function injectPrerenderIntoTemplate(pathname: string, templateHtml: string): string {
  const cleanPath = pathname.split("?")[0].replace(/\/$/, "") || "/";
  const seo = PAGES_SEO[cleanPath] || PAGES_SEO["/"];
  const prerenderedBody = renderFullRouteHtml(cleanPath);

  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // 2. Replace Description
  html = html.replace(
    /<meta name="description" content="[\s\S]*?" \/>/i,
    `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />`
  );

  // 3. Replace Canonical
  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?" \/>/i,
    `<link rel="canonical" href="${seo.canonical}" />`
  );

  // 4. Replace OG Tags
  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?" \/>/i,
    `<meta property="og:title" content="${seo.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[\s\S]*?" \/>/i,
    `<meta property="og:description" content="${seo.description.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[\s\S]*?" \/>/i,
    `<meta property="og:url" content="${seo.canonical}" />`
  );

  // 5. Replace Twitter Tags
  html = html.replace(
    /<meta name="twitter:title" content="[\s\S]*?" \/>/i,
    `<meta name="twitter:title" content="${seo.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[\s\S]*?" \/>/i,
    `<meta name="twitter:description" content="${seo.description.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content="[\s\S]*?" \/>/i,
    `<meta name="twitter:url" content="${seo.canonical}" />`
  );

  // 6. Inject Route Schema
  if (seo.schema) {
    const schemaScript = `\n    <!-- Page Specific Schema -->\n    <script type="application/ld+json">\n    ${JSON.stringify(seo.schema, null, 2)}\n    </script>\n`;
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${schemaScript}</head>`);
    }
  }

  // 7. Inject Pre-rendered Body into <div id="root"></div>
  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${prerenderedBody}</div>`);
  } else if (html.includes('<div id="root">')) {
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${prerenderedBody}</div>`);
  }

  return html;
}
