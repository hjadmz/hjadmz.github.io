import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://hjadmz.com",
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  integrations: [
    mdx(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  markdown: {
    shikiConfig: {
      theme: "min-light",
    },
  },
});
