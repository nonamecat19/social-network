<script setup lang='ts'>
defineProps({
  active: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  class: {
    type: String,
    required: false
  },
  icon1: {
    type: String,
    required: true
  },
  icon2: {
    type: String,
    required: true
  }
})
defineEmits([
  "click"
])
</script>

<template>
  <button
    class='px-6 py-3 rounded-xl w-[180px]'
    :class='active ? "bg-primary-500" : "bg-gray-500"'
    @click='$emit("click")'
  >
    <Icon
      :name="active ? icon1 : icon2"
      size='20'
      color='white'
    />
    <span v-if='text' class='p-2 font-bold text-white'>
      {{ text }}
    </span>
  </button>
</template>

<style scoped>

</style>