<template>
<section>
  <div class='grid grid-cols-2 gap-3 p-3'>
    <card
      :price='23'
      title='Title'
      id='1'
      image='https://lingerie.ua/files/product/0/28650/28650.jpg'
    />
    <card
      :price='24'
      title='Title'
      id='2'
      image='https://lingerie.ua/files/product/0/28650/28650.jpg'
    />
    <card
      :price='25'
      title='Tit123123  1231 123 23leфіва 1234 '
      id='3'
      image='https://lingerie.ua/files/product/0/28650/28650.jpg'
    />
    <card
      :price='26'
      title='Title'
      id='4'
      image='https://lingerie.ua/files/product/0/28650/28650.jpg'
    />
    <card
      :price='27'
      title='Title'
      id='5'
      image='https://lingerie.ua/files/product/0/28650/28650.jpg'
    />
  </div>
</section>
</template>
<script lang='ts' setup>
definePageMeta({
  layout: "main",
});
</script>
<style scoped>

</style>