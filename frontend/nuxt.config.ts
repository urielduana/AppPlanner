// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
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
