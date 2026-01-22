// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  /**
   * SSR is intentionally disabled.
   * This application relies on client-side authentication (localStorage-based JWT).
   * Given the limited scope and time constraints, disabling SSR avoids hydration issues
   * and keeps the auth flow stable and predictable.
   * SSR could be re-enabled in the future by migrating auth to cookies.
   */

  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // Modules
  modules: ["@pinia/nuxt"],
  // Pinia
  pinia: {
    storesDirs: ["./stores/**"],
  },
  // Tailwind Config
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },
});
