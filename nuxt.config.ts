import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@pinia/nuxt"
  ],

  css: ["~/assets/css/main.css"],

  imports: {
    autoImport: true
  },

  components: [
    { path: "~/components", pathPrefix: false }
  ],

  app: {
    head: {
      title: "HotelOS",
      htmlAttrs: {
        lang: "en"
      }
    }
  }
});
