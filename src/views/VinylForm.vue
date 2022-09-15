<template>
  <CustomLoader />
  <DashboardBase>
    <header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="relative">
          <h1 class="text-4xl font-bold text-black py-4">Ajouter un vinyle</h1>
          <div class="absolute top-0 right-0">
            <button
              type="submit"
              class="inline-flex items-center justify-center w-16 h-16 text-white bg-primary rounded-full"
            >
              <QrcodeIcon class="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <form @submit.prevent="onSubmit">
          <div class="px-4 sm:px-0 pb-10">
            <div class="flex justify-center">
              <img
                class="object-contain w-52 h-52"
                src="https://fakeimg.pl/500/?text=Vinyl"
                alt="vinyl cover"
              />
            </div>
            <div class="relative font-medium mt-10">
              <input
                id="name"
                name="name"
                type="text"
                v-model.trim="name"
                class="peer h-10 w-full bg-secondary border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                placeholder="Nom du vynile"
                required
              />
              <label
                for="name"
                class="absolute left-0 -top-5 text-gray-600 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600"
                >Nom du vynile *</label
              >
            </div>
            <div class="relative font-medium mt-10">
              <input
                id="artist"
                name="artist"
                type="text"
                v-model.trim="artist"
                class="peer h-10 w-full bg-secondary border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                placeholder="Artistes"
                required
              />
              <label
                for="artist"
                class="absolute left-0 -top-5 text-gray-600 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600"
                >Artistes *</label
              >
              <span class="text-xs font-light text-gray-400"
                >Mettez des virgules ( , ) entre les noms d'artistes.</span
              >
            </div>
            <div class="relative font-medium mt-10">
              <input
                id="releaseDate"
                name="releaseDate"
                type="text"
                v-model.trim="releaseDate"
                class="peer h-10 w-full bg-secondary border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                placeholder="Année de sortie"
              />
              <label
                for="releaseDate"
                class="absolute left-0 -top-5 text-gray-600 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600"
                >Année de sortie</label
              >
            </div>
            <div class="relative font-medium mt-10">
              <input
                id="description"
                name="description"
                type="text"
                v-model.trim="description"
                class="peer h-10 w-full bg-secondary border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary"
                placeholder="Description"
              />
              <label
                for="description"
                class="absolute left-0 -top-5 text-gray-600 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600"
                >Description</label
              >
            </div>
            <div class="mt-14 text-center">
              <div class="mb-6" v-if="failed">
                <p class="text-center font-light text-red-600">
                  Désolé, une erreur est survenue lors de l'ajout du vinyle.
                  Veuillez réessayer plus tard.
                </p>
              </div>
              <button
                type="submit"
                class="inline-flex items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary focus:outline-none"
              >
                Enregistrer le vinyle
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </DashboardBase>
</template>

<script>
import CustomLoader from "@/components/CustomLoader";
import DashboardBase from "@/components/DashboardBase";
import { QrcodeIcon } from "@heroicons/vue/outline";
import { HTTP } from "@/config/http-common";

export default {
  name: "VinylForm",
  components: {
    CustomLoader,
    DashboardBase,
    QrcodeIcon,
  },
  data() {
    return {
      name: "",
      artist: "",
      releaseDate: "",
      description: "",
      failed: false,
    };
  },
  methods: {
    validForm() {
      let isFormValid = true;

      if (this.name.length < 1 || this.name.length > 50) {
        isFormValid = false;
        document.getElementById("name").classList.add("invalid");
      } else {
        document.getElementById("name").classList.remove("invalid");
      }

      if (this.artist.length < 1 || this.artist.length > 50) {
        isFormValid = false;
        document.getElementById("artist").classList.add("invalid");
      } else {
        const element = document.getElementById("artist");
        element.classList.remove("invalid");
        // Add a space after each comma
        const artists = this.artist.split(",");
        artists.map((artist) => {
          return artist.trim();
        });
        this.artist = artists.join(", ");
      }

      // If the release date is not empty and is not from 1000 to 2999 (year)
      if (
        this.releaseDate.length !== 0 &&
        /^[12]\d{3}$/.exec(this.releaseDate) == null
      ) {
        isFormValid = false;
        document.getElementById("releaseDate").classList.add("invalid");
      } else {
        document.getElementById("releaseDate").classList.remove("invalid");
      }

      if (this.description.length > 250) {
        isFormValid = false;
        document.getElementById("description").classList.add("invalid");
      } else {
        document.getElementById("description").classList.remove("invalid");
      }

      return isFormValid;
    },
    async onSubmit() {
      const isFormValid = this.validForm();
      if (!isFormValid) {
        return;
      }

      this.$store.commit("enableLoading");

      // Submit the form
      try {
        const res = await HTTP.post("/vinyls", {
          name: this.name,
          artist: this.artist,
          releaseDate: this.releaseDate?.length > 1 ? this.releaseDate : null,
          description: this.description?.length > 1 ? this.description : null,
        });

        if (res.status !== 201) {
          throw new Error("Error while creating the vinyl");
        }

        this.$router.push({ name: "home" });
      } catch (e) {
        if (e.response && e.response.status === 401) {
          return this.$router.push({ name: "login" });
        }
        this.failed = true;
        this.$store.commit("disableLoading");
      }
    },
  },
  created() {
    this.$store.commit("disableLoading");
  },
};
</script>

<style scoped>
input.invalid {
  border-color: #dc2626;
}
</style>
