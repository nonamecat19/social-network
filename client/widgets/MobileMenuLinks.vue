<script setup lang='ts'>
import MenuItem from '~/ui/MenuItem.vue'
let links = [
  {
    title: 'Головна',
    to: '/',
  },
  {
    title: 'Покривала',
    to: '/products/bedcovers',
  },
  {
    title: 'Рушники',
    to: '/products/towels',
  },
]

let authorized = true
function logout() {
  //LOGOUT
  emits('click')
}
const emits = defineEmits(['click'])
</script>

<template>
<div>
  <MenuItem
    v-for='{title, to} in links'
    @click='$emit("click")'
    :title=title
    :link=to
  />

  <MenuItem
    v-if='authorized'
    @click='$emit("click")'
    title='Профіль'
    link='/profile'
  />
  <MenuItem
    v-if='authorized'
    @click='logout'
    title='Вийти'
    link='/'
  />
  <MenuItem
    v-else
    @click='$emit("click")'
    title='Увійти'
    link='/login'
  />

</div>
</template>

<style scoped>

</style>