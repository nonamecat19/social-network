<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(40vw);
}
html, body{
  background: #fff;
  --swiper-theme-color: #10B981;
}

button, div {
  -webkit-tap-highlight-color: transparent;
}
</style>