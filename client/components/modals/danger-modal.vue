<script setup lang='ts'>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'reject'): void
}>()

const props = defineProps<{
  title: string
  description: string
}>()

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function confirmModal() {
  emit('confirm')
  isOpen.value = false
}

function rejectModal() {
  emit('reject')
  isOpen.value = false
}

</script>


<template>
  <slot name='button' :openModal='openModal' />
  <TransitionRoot appear :show='isOpen' as='template'>
    <Dialog as='div' @close='rejectModal' class='relative z-10'>
      <TransitionChild
        as='template'
        enter='duration-300 ease-out'
        enter-from='opacity-0'
        enter-to='opacity-100'
        leave='duration-200 ease-in'
        leave-from='opacity-100'
        leave-to='opacity-0'
      >
        <div class='fixed inset-0 bg-black bg-opacity-25' />
      </TransitionChild>

      <div class='fixed inset-0 overflow-y-auto'>
        <div
          class='flex min-h-full items-center justify-center p-4 text-center bg-[#18181b33] backdrop-blur'
        >
          <TransitionChild
            as='template'
            enter='duration-300 ease-out'
            enter-from='opacity-0 scale-95'
            enter-to='opacity-100 scale-100'
            leave='duration-200 ease-in'
            leave-from='opacity-100 scale-100'
            leave-to='opacity-0 scale-95'
          >
            <DialogPanel
              class='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
            >
              <DialogTitle
                as='h3'
                class='text-lg font-medium leading-6 text-gray-900'
              >
                {{title}}
              </DialogTitle>
              <div class='mt-2'>
                <p class='text-sm text-gray-500'>
                  {{description}}
                </p>
              </div>

              <div class='flex justify-between mt-4'>
                <button
                  type='button'
                  class='w-[48%] inline-flex justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                  @click='rejectModal'
                >
                  No
                </button>
                <button
                  type='button'
                  class='w-[48%] inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                  @click='confirmModal'
                >
                  Yes
                </button>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>