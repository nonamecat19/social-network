<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'card',
})
</script>

<template>
  <div class='w-[300px] h-[290px] bg-green-600 rounded-2xl p-[20px]'>
    <nuxt-img
      src='https://lingerie.ua/files/product/0/28650/28650.jpg'
      class='h-[170px] object-cover rounded-2xl'
      width='260'
      fit='cover'
    />

    <h2 class='mt-2 text-xl h-[30px]'>Test title</h2>
    <div class='flex w-full'>
      <NuxtLink to='/products/234'>
        <button class='text-green-600 text-xl bg-white p-2 w-[260px] rounded-xl'>
          Перейти до товару
        </button>
      </NuxtLink>
    </div>
  </div>
</template>