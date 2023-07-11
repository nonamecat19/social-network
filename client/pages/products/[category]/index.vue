<script lang='ts' setup>
import ProductCard from '~/ui/ProductCard.vue'

const router = useRouter()
const { category } = router.currentRoute.value.params
definePageMeta({
  layout: "main",
})


let images = [
  'https://images.prom.ua/4231498781_w640_h640_dvuhspalnoe-postelnoe-bele.jpg',
  'https://content2.rozetka.com.ua/goods/images/big/316640713.jpg',
  'https://content.rozetka.com.ua/goods/images/big/316641689.jpg'
]
</script>

<template>
<section>
  <h2>
    {{ category }}
  </h2>
  <div class='grid grid-cols-2 gap-3 p-3'>
    <ProductCard
      :price='23'
      title='Title'
      id='1'
      image='https://lingerie.ua/files/product/0/28650/28650.jpg'
    />
    <ProductCard
      :price='24'
      title='Title'
      id='2'
      :image=images[0]
    />
    <ProductCard
      :price='25'
      title='Tit123123  1231 123 23leфіва 1234 '
      id='3'
      :image=images[1]
    />
    <ProductCard
      :price='26'
      title='Title'
      id='4'
      :image=images[2]
    />
    <ProductCard
      :price='27'
      title='Title'
      id='5'
      :image=images[0]
    />
  </div>
</section>
</template>

<style scoped>

</style>