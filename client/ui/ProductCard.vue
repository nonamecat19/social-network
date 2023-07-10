<script lang='ts' setup>
const props = defineProps({
  title: String,
  price: Number,
  id: String,
  image: {
    type: String,
    required: true,
  },
})
import { cut } from '~/utils/stringUtils'

const link = `/products/bedcovers/${props.id}`
</script>

<template>
  <NuxtLink :to='link'>
    <div class='w-full border-primary-500 bg-white border rounded-2xl p-2'>
      <nuxt-img
        :src='image'
        class='h-[30vw] w-full object-cover rounded-xl'
        width='260'
        fit='cover'
      />
      <h2 class='mt-2 text-md text-primary-500'>{{ cut(title, 22) }}</h2>
      <h3 class='text-sm text-black'>{{ price }} грн</h3>
    </div>
  </NuxtLink>
</template>
