<script setup lang='ts'>
let isHeaderOpen = ref<boolean>(false)
function handleHeaderClick() {
  isHeaderOpen.value = !isHeaderOpen.value
}

</script>
<template>
  <section class='bg-primary-50 min-h-screen'>

    <nav class='bg-primary-500 h-12'>
      <Icon
        name='iconamoon:menu-burger-horizontal'
        color='white'
        size='35'
        class='ml-2 mt-1.5'
        @click='handleHeaderClick'
      />
    </nav>

    <USlideover
      v-model="isHeaderOpen"
      side='left'
    >
      <div class='relative'>
        <Icon
          name='material-symbols:close'
          size='50'
          color='gray'
          class='absolute right-0'
          @click='handleHeaderClick'
        />
      </div>
    </USlideover>

    <slot/>

  </section>
</template>
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