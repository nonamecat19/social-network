<script setup lang='ts'>
import MenuItem from '~/ui/MenuItem.vue'

let orderLinks = [
  {
    title: 'Замовлення',
    to: '/profile/orders'
  },
  {
    title: 'Улюблені',
    to: '/profile/favourites'
  },
  {
    title: 'Корзина',
    to: '/profile/cart'
  },
  {
    title: 'Налаштування',
    to: '/profile/settings'
  }
]
definePageMeta({
  layout: "main",
})
</script>

<template>
<section>
  <MenuItem
    v-for='{title, to} in orderLinks'
    :title='title'
    :link='to'
  />
</section>
</template>

<style scoped>

</style>