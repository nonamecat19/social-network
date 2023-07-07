<script lang='ts'>
definePageMeta({
  layout: "main",
})
export default {

}
</script>

<template>
  <div class='px-6 w-screen'>
    <div>
      <nuxt-img
        src='https://lingerie.ua/files/product/0/28650/28650.jpg'
        class='h-[70vw] object-cover rounded-2xl mx-auto'
        width='700'
      />
    </div>
    <div class='flex justify-between'>
      <div>
        <div class='mt-4'>
          <h2 class='text-green-600 font-bold text-2xl'>
            Title title Title title Title title title title
          </h2>
        </div>
        <div class='mt-2 text-gray-700 text-lg'>
          <h4>
            Description Description Description Description Description Description Description
          </h4>
        </div>
      </div>
      <div>
        <button class='bg-green-700 px-6 py-2 rounded-lg mt-5'>
          Купити
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>