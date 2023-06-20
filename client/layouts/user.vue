<template>
  <section class='w-screen flex'>
    <aside class='h-screen bg-my w-30 p-3 flex flex-col gap-y-2 border-r-4 border-zinc-800'>

      <div
        v-for='{name, path, icon} in ROUTES'
      >
        <NuxtLink :to='path'>
          <div
            class='flex rounded-lg'
            :class="[path === useRoute().path ? 'bg-green-400' : 'bg-zinc-800']"
          >
            <div class='px-4 py-2'>
              <Icon :name='icon' size='2rem' :color='[path === useRoute().path ? `#27272a` : `#4ade80`]' />
            </div>
            <div
              class='pr-5 py-3 capitalize font-extrabold'
              :class="[path === useRoute().path ? 'text-black' : 'text-green-400']"
            >
              {{ name }}
            </div>
          </div>
        </NuxtLink>
      </div>

    </aside>
    <main class='h-screen'>
      <slot />
    </main>

  </section>
</template>

<script setup lang='ts'>
import { ROUTES } from '~/config/routes'


</script>