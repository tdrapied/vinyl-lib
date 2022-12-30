<template>
  <div :class="this.$store.state.isLoading ? 'block' : 'hidden'">
    <div
      class="absolute fixed h-screen w-screen flex items-center justify-center z-[99] bg-white"
      :hidden="!this.$store.state.isLoading"
    >
      <div>
        <div class="flex">
          <img
            class="h-24 m-auto my-6"
            :src="require('../assets/logo.svg')"
            alt="loader"
          />
        </div>
        <div class="text-center">
          <div class="mt-4 mb-2 font-bold flex justify-center">
            <div class="mr-2">Chargement en cours</div>
            <div class="flex">
              <div class="animate-bounce circle-1 mr-0.5">.</div>
              <div class="animate-bounce circle-2 mr-0.5">.</div>
              <div class="animate-bounce circle-3">.</div>
            </div>
          </div>
          <div class="text-gray-500">
            Cela peut prendre quelques secondes, ne fermez pas cette page.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.circle-1 {
  animation-delay: 0.1s;
}
.circle-2 {
  animation-delay: 0.2s;
}
.circle-3 {
  animation-delay: 0.3s;
}
</style>

<script>
export default {
  name: "CustomLoader",
};
</script>
