<script lang='ts' setup>

import Card from '~/components/friends/card.vue'

definePageMeta({
  layout: 'user',
})

</script>

<template>
  <div class='flex gap-6 flex-wrap'>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
  </div>
</template>

<style scoped>

</style>