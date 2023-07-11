<script setup lang='ts'>
defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class='bg-white border text-black cursor-pointer'
    @click='useRouter().push(link)'
  >
      {{ title }}
  </div>
</template>

<style scoped>
div {
  padding: 10px 10px;
  color: #313131
}
</style>