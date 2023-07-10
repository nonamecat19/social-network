<script setup lang='ts'>
import MobileMenuLinks from '~/widgets/MobileMenuLinks.vue'
import MobileNavigation from '~/ui/MobileNavigation.vue'

let isHeaderOpen = ref<boolean>(false)
function handleHeaderClick() {
  isHeaderOpen.value = !isHeaderOpen.value
}

</script>

<template>
  <section class='bg-primary-50 min-h-screen'>

    <MobileNavigation>
      <Icon
        name='iconamoon:menu-burger-horizontal'
        color='white'
        size='35'
        class='ml-2 mt-1.5'
        @click='handleHeaderClick'
      />
    </MobileNavigation>

    <USlideover
      v-model='isHeaderOpen'
      side='left'
    >
      <MobileNavigation>
        <Icon
          name='material-symbols:close'
          size='50'
          color='white'
          class='absolute right-0'
          @click='handleHeaderClick'
        />
      </MobileNavigation>

      <MobileMenuLinks @click='handleHeaderClick'/>
    </USlideover>

    <slot />

  </section>
</template>

<style lang='scss'>
.menu {
  &-enter-active, &-leave-active {
    transition: opacity 0.5s ease;
  }

  &-enter-from, &-leave-to {
    opacity: 0;
  }
}
</style>