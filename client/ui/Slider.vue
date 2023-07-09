<template>
  <swiper
    :pagination="{
      dynamicBullets: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiperSlide v-for='image in images'>
      <nuxt-img
        :src='image'
        class='h-[70vw] object-cover mx-auto'
        width='700'
      />
    </swiperSlide>
  </swiper>
</template>
<script>

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from '~/node_modules/swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  props: ['images']
};
</script>
<style>

.swiper {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.swiper-slide {
  text-align: center;
  color: red;
  font-size: 18px;
  background: #fff;
  height: 70vw;
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-pagination-bullet {
  background: #10B981;
  height: 15px;
  width: 15px;
}

.swiper-pagination-bullet-active-prev, .swiper-pagination-bullet-active-next  {
  opacity: 0.8;
}

.swiper-pagination-bullet-active-prev-prev, .swiper-pagination-bullet-active-next-next  {
  opacity: 0.7;
}

</style>
