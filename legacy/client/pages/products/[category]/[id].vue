<script lang='ts' setup>
import MobileBottomNavigation from '~/ui/MobileBottomNavigation.vue'
import SelectButton from '~/ui/SelectButton.vue'
import Slider from '~/ui/ImageSlider.vue'

let price = 400
let description = 'Description Description Description Description Description Description Description'
let title = 'Title title Title title Title title title title'
let inCart = ref<boolean>(true)
let isLiked = ref<boolean>(false)
let images = [
  'https://images.prom.ua/4231498781_w640_h640_dvuhspalnoe-postelnoe-bele.jpg',
  'https://content2.rozetka.com.ua/goods/images/big/316640713.jpg',
  'https://content.rozetka.com.ua/goods/images/big/316641689.jpg'
]
function handleCartClick() {
  inCart.value = !inCart.value
}

function handleLikeClick() {
  isLiked.value = !isLiked.value
}

definePageMeta({
  layout: "main",
})
</script>

<template>
  <section>
    <div class='px-6 w-screen'>
      <div class='pt-4'>
        <Slider :images='images'/>
      </div>
      <div class='flex justify-between w-full gap-6'>
        <div class='w-full'>
          <div class='mt-4'>
            <h2 class='text-primary-600 font-bold text-2xl'>
              {{ title }}
            </h2>
          </div>
          <div class='mt-2 text-gray-700 text-lg'>
            <h4>
              {{ description }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <MobileBottomNavigation>
      <SelectButton
        :active='inCart'
        icon1='carbon:shopping-cart-minus'
        icon2='carbon:shopping-cart-plus'
        :text='price + " грн"'
        @click='handleCartClick'
      />

      <SelectButton
        :active='isLiked'
        icon1='ic:baseline-favorite-border'
        icon2='ic:baseline-favorite'
        @click='handleLikeClick'
      />
    </MobileBottomNavigation>

  </section>
</template>

<style scoped>

</style>