<template>
  <CustomLoader :show="isLoading" />
  <div
    class="bg-white min-h-full flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="m-auto max-w-md w-full space-y-8">
      <div>
        <div>
          <img
            class="mx-auto h-20 w-auto"
            :src="require('../assets/logo.svg')"
            alt="logo"
          />
        </div>
        <h1 class="mt-6 text-center text-4xl font-extrabold text-black">
          Connexion
        </h1>
      </div>

      <div :hidden="!error">
        <p class="text-center text-red-600">
          {{ error }}
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit="login" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Adresse email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10"
              placeholder="Adresse email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10"
              placeholder="Mot de passe"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-primary bg-white hover:bg-secondary focus:outline-none"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CustomLoader from "@/components/CustomLoader";
export default {
  name: "LoginView",
  components: { CustomLoader },
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isLoading: false,
    };
  },
  methods: {
    login(e) {
      console.log(this.email, this.password);

      this.isLoading = true;

      // this.error = "Adresse email ou mot de passe incorrect";

      e.preventDefault();
    },
  },
};
</script>
