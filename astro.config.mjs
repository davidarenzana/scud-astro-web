// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Lato",
      cssVariable: "--font-lato",
      weights: [300, 400, 700, 900],
      styles: ["normal"],
    },
  ],
  i18n: {
    locales: ["es", "ca", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
