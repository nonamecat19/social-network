<script lang='ts' setup>

function confirm() {
  console.log('confirm')
}
function reject() {
  console.log('reject')
}

import DangerModal from '~/components/modals/danger-modal.vue'
</script>

<template>
  <div class='bg-zinc-800 p-4 rounded-3xl flex w-[400px]'>
    <div class=''>
      <img
        src='https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto,f_auto/https://www.gcu.edu/sites/default/files/2020-09/computer_programmer.jpg'
        alt=''
        class='rounded-3xl w-[150px] h-[150px] object-cover'
      />
    </div>
    <div class='ml-6'>
      <div class='h-[100px]'>
        <h2 class='font-bold h-[60px]'>
          Name Middle name Surname
        </h2>
        <p class='text-zinc-600'>
          Together for 2month
        </p>
      </div>

      <div class='flex justify-between'>
        <UButton
          icon='i-heroicons-chat-bubble-left-right'
          size='xl'
          class='px-8'
        />
        <DangerModal
          @confirm='confirm'
          @reject='reject'
          title='Delete user from friends?'
          description='Are you sure?'
        >
          <template v-slot:button="{openModal}">
            <UButton
              icon='i-heroicons-x-mark'
              size='xl'
              color='red'
              @click='openModal'
              class='px-8'
            />
          </template>
        </DangerModal>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>