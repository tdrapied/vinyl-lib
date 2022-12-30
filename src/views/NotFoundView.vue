<template>
  <main>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <div class="min-h-full flex h-screen items-center justify-center">
          <div class="max-w-md w-full text-center">
            <div class="flex justify-center items-center font-bold">
              <div class="text-9xl mr-2">4</div>
              <div>
                <img
                  class="h-[160px]"
                  :src="require('../assets/vinyl-broken.png')"
                  alt="vinyl broken"
                />
              </div>
              <div class="text-9xl ml-2">4</div>
            </div>
            <div class="text-4xl font-bold mt-3">Page non trouvée</div>
            <div class="text-xl font-light mt-8">
              Désolé, la page que vous recherchez n'existe pas.
            </div>
            <div class="mt-4">
              <router-link
                to="/"
                class="inline-flex items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary focus:outline-none"
              >
                Retour à l'accueil
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>
