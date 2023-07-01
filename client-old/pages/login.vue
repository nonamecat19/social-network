<script lang="ts" setup>
import {defineComponent} from 'vue'



</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div class="w-80 flex gap-3 flex-col">
      <UFormGroup label="Email" required>
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope"/>
      </UFormGroup>

      <UFormGroup label="Password" required>
        <UInput placeholder="you@example.com" icon="i-heroicons-light-bulb"/>
      </UFormGroup>

      <UButton label="Login" block/>
    </div>
  </div>
</template>

<style scoped>

</style>