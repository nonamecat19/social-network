<script lang='ts' setup>

import Post from '~/components/feed/post.vue'

definePageMeta({
  layout: 'user',
})

</script>

<template>
  <div class='flex gap-6'>
    <Post/>
    <Post/>

  </div>
</template>

<style scoped>

</style>