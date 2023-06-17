<script lang="ts">
export default {
  name: 'Feed',
  data() {
    return {
      data: [
        {
          name: 'adsf',
          url: 'sadfasd'
        },
        {
          name: 'adsf',
          url: 'sadfasd'
        },
        {
          name: 'adsf',
          url: 'sadfasd'
        },
        {
          name: 'adsf',
          url: 'sadfasd'
        }
      ]
    }
  }
}
definePageMeta({
  layout: "user",
});

</script>

<template>
    <div class="flex gap-6">
      <Post/>
      <Post/>
      <Post/>
    </div>
</template>

<style scoped>

</style>