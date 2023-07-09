export default defineNuxtConfig({
  nitro: {
    preset: 'vercel-edge'
  },
  modules: [
    '@nuxt/devtools',
    '@nuxthq/ui',
    '@nuxt/image',
    'nuxt-icon'
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  colorMode: {
    preference: 'light'
  }
})