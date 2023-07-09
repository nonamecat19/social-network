<template>
  <section class='bg-primary-50 min-h-screen'>

    <Transition name='menu'>
      <div
        class='h-screen w-screen fixed z-20 bg-primary-50'
        v-if='isHeaderOpen'
      >
        <Icon
          name='material-symbols:close'
          color='primary'
          size='50'
          class='fixed right-0'
          @click='handleHeaderClick'
        />
      </div>
    </Transition>

    <nav class='bg-primary-700 h-12'>
      <Icon
        name='iconamoon:menu-burger-horizontal'
        color='white'
        size='35'
        class='ml-2 mt-1.5'
        @click='handleHeaderClick'
      />
    </nav>

    <slot/>

  </section>
</template>
<script setup lang='ts'>
let isHeaderOpen = ref<boolean>(false)
function handleHeaderClick() {
  isHeaderOpen.value = !isHeaderOpen.value
}

</script>
<style>

/* we will explain what these classes do next! */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.5s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}


</style>