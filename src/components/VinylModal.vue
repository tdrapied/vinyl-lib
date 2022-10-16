<template>
  <TransitionRoot appear :show="isOpen" as="template" class="z-[99]">
    <Dialog as="div" @close="close" class="relative z-9">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-10 px-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="absolute top-0 right-0">
                <div class="pt-4 pr-4">
                  <button
                    type="button"
                    class="focus:outline-none"
                    @click="close"
                  >
                    <XIcon class="h-7 w-7" />
                  </button>
                </div>
              </div>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";

export default {
  name: "VinylModal",
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    XIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
