<template>
  <swiper
    :pagination="{dynamicBullets: true}"
    :modules="modules"
    class="mySwiper"
    :navigation='true'
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
import 'swiper/css/navigation';
import { Pagination, Navigation } from '~/node_modules/swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  props: ['images']
};
</script>

<style lang='scss'>
.swiper {
  width: 100%;
  height: 100%;
  border-radius: 15px;

  &-slide {
    text-align: center;
    font-size: 18px;
    height: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 5px;
      border-radius: 30px;
    }
  }

  &-pagination {
    &-bullet {
      background: #10B981;
      height: 15px;
      width: 15px;

      &-active {
        &-prev, &-next  {
          opacity: 0.8;
        }

        &-prev-prev, &-next-next  {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
