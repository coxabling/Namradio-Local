import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { injectPrerenderIntoTemplate } from "./src/serverPrerender.js";

const currentFilename = typeof __filename !== "undefined" ? __filename : (typeof import.meta !== "undefined" && import.meta.url ? fileURLToPath(import.meta.url) : "");
const currentDirname = typeof __dirname !== "undefined" ? __dirname : (currentFilename ? path.dirname(currentFilename) : process.cwd());

// In-memory cache for API resilience
let cachedNowPlaying: any = null;
let lastNowPlayingFetch = 0;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
  });

  // 1. /api/nowplaying Proxy with Caching & Graceful Fallback
  app.get("/api/nowplaying", async (_req, res) => {
    const now = Date.now();
    // Use cache if less than 5 seconds old
    if (cachedNowPlaying && now - lastNowPlayingFetch < 5000) {
      return res.json(cachedNowPlaying);
    }

    try {
      const response = await fetch("https://music-station.live/api/nowplaying/nam_radio_local", {
        headers: { "User-Agent": "NamRadioLocal-Server/1.0" },
      });
      if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
      const data = await response.json();
      cachedNowPlaying = data;
      lastNowPlayingFetch = now;
      res.json(data);
    } catch (error) {
      console.error("Proxy error /api/nowplaying:", error);
      if (cachedNowPlaying) {
        return res.json(cachedNowPlaying);
      }
      res.status(500).json({ error: "Failed to fetch from remote API" });
    }
  });

  // 2. /api/schedule Proxy with Fallback Schedule
  app.get("/api/schedule", async (_req, res) => {
    try {
      const response = await fetch("https://music-station.live/api/station/nam_radio_local/schedule", {
        headers: { "User-Agent": "NamRadioLocal-Server/1.0" },
      });
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
    } catch (error) {
      console.error("Proxy error /api/schedule:", error);
    }

    // Default fallback schedule lineup if upstream schedule is offline
    const now = new Date();
    res.json([
      {
        id: 1,
        name: "Morning Sunrise: Acoustic & Soulful Africa",
        title: "Morning Sunrise: Acoustic & Soulful Africa",
        start: new Date(now.setHours(6, 0, 0, 0)).toISOString(),
        end: new Date(now.setHours(9, 0, 0, 0)).toISOString(),
        is_now: false,
      },
      {
        id: 2,
        name: "NAM — Charts & Continental Discovery",
        title: "NAM — Charts & Continental Discovery",
        start: new Date(now.setHours(9, 0, 0, 0)).toISOString(),
        end: new Date(now.setHours(13, 0, 0, 0)).toISOString(),
        is_now: true,
      },
      {
        id: 3,
        name: "Afrobeats Continental Pulse",
        title: "Afrobeats Continental Pulse",
        start: new Date(now.setHours(13, 0, 0, 0)).toISOString(),
        end: new Date(now.setHours(16, 0, 0, 0)).toISOString(),
        is_now: false,
      },
      {
        id: 4,
        name: "Amapiano Sunset Groove: Log Drums & Vibez",
        title: "Amapiano Sunset Groove: Log Drums & Vibez",
        start: new Date(now.setHours(16, 0, 0, 0)).toISOString(),
        end: new Date(now.setHours(19, 0, 0, 0)).toISOString(),
        is_now: false,
      },
      {
        id: 5,
        name: "Bongo Flava & East African Sounds",
        title: "Bongo Flava & East African Sounds",
        start: new Date(now.setHours(19, 0, 0, 0)).toISOString(),
        end: new Date(now.setHours(22, 0, 0, 0)).toISOString(),
        is_now: false,
      },
    ]);
  });

  // 3. /api/history Proxy
  // Upstream /api/station/nam_radio_local/history is private (returns 403 NotLoggedInException).
  // Instead, public nowplaying endpoint contains full song_history array!
  app.get("/api/history", async (_req, res) => {
    try {
      let historyData: any[] = [];
      if (cachedNowPlaying && cachedNowPlaying.song_history) {
        historyData = cachedNowPlaying.song_history;
      } else {
        const response = await fetch("https://music-station.live/api/nowplaying/nam_radio_local", {
          headers: { "User-Agent": "NamRadioLocal-Server/1.0" },
        });
        if (response.ok) {
          const data = await response.json();
          cachedNowPlaying = data;
          lastNowPlayingFetch = Date.now();
          historyData = data.song_history || [];
        }
      }
      res.json(historyData);
    } catch (error) {
      console.error("Proxy error /api/history:", error);
      res.status(500).json({ error: "Failed to fetch song history" });
    }
  });

  // Digital Ads.txt Files
  const adsTxtHandler = (_req: express.Request, res: express.Response) => {
    res.type("text/plain; charset=utf-8");
    res.sendFile(path.join(process.cwd(), "public", "ads.txt"));
  };
  app.get("/ads.txt", adsTxtHandler);
  app.get("/add.txt", adsTxtHandler);
  app.get("/app-ads.txt", adsTxtHandler);

  // SEO Robots & Sitemap Endpoints
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain; charset=utf-8");
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml; charset=utf-8");
    res.sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  // Server-Side Rendering (SSR / Prerendering) Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    // Custom HTML handler to inject pre-rendered DOM and SEO metadata on initial load
    app.use(async (req, res, next) => {
      const url = req.originalUrl.split("?")[0];

      // Bypass static assets, internal vite routes, and API
      if (
        url.startsWith("/api/") ||
        url.startsWith("/@") ||
        url.startsWith("/src/") ||
        url.startsWith("/node_modules/") ||
        url.includes(".")
      ) {
        return next();
      }

      try {
        const rawTemplate = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        const transformedTemplate = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
        const finalHtml = injectPrerenderIntoTemplate(url, transformedTemplate);
        res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    app.use(vite.middlewares);
  } else {
    // Production Mode: Serve static assets and inject pre-rendered HTML for routes
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));

    app.get("*", (req, res, next) => {
      const url = req.path;
      if (url.includes(".") && !url.endsWith(".html")) {
        return next();
      }

      const templatePath = path.join(distPath, "index.html");
      if (fs.existsSync(templatePath)) {
        const rawTemplate = fs.readFileSync(templatePath, "utf-8");
        const finalHtml = injectPrerenderIntoTemplate(url, rawTemplate);
        res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
      } else {
        next();
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
