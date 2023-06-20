import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/apollo',
    'nuxt-headlessui',
    '@nuxthq/ui',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.spacex.land/graphql',
      },
    },
  },
})