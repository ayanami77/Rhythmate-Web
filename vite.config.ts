import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      injectRegister: "auto",
      manifest: {
        name: "Rhythmate",
        short_name: "Rhythmate",
        description: "ゲーム感覚で習慣化を達成できるRhtymateというWebアプリです。",
        theme_color: "#D9D9D9",
        lang: "ja",
        icons: [
          {
            src: "/icons/rhyth-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/rhyth-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
