import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing middleware
  app.use(express.json());

  // API Proxy Routes to bypass CORS
  app.get("/api/nowplaying", async (req, res) => {
    try {
      const response = await fetch("https://music-station.live/api/nowplaying/nam_radio_local");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Proxy error /api/nowplaying:", error);
      res.status(500).json({ error: "Failed to fetch from remote API" });
    }
  });

  app.get("/api/schedule", async (req, res) => {
    try {
      const response = await fetch("https://music-station.live/api/station/nam_radio_local/schedule");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Proxy error /api/schedule:", error);
      res.status(500).json({ error: "Failed to fetch from remote API" });
    }
  });

  app.get("/api/history", async (req, res) => {
    try {
      const response = await fetch("https://music-station.live/api/station/nam_radio_local/history");
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Proxy error /api/history:", error);
      res.status(500).json({ error: "Failed to fetch from remote API" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
