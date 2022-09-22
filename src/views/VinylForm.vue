<template>
  <CustomLoader />
  <DashboardBase>
    <header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-4xl font-bold text-black py-4">
            {{ isEdit ? "Modifier un vinyle" : "Ajouter un vinyle" }}
          </h1>
          <button
            type="submit"
            class="inline-flex items-center justify-center w-14 h-14 text-white bg-primary rounded-full"
          >
            <QrcodeIcon class="w-8 h-8" />
          </button>
        </div>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="mb-3">
          <form @submit.prevent="onSubmit">
            <div class="px-4 sm:px-0">
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
                  v-model.trim="vinyl.name"
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
                  v-model.trim="vinyl.artist"
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
                  v-model.trim="vinyl.releaseDate"
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
                  v-model.trim="vinyl.description"
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
                  class="py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary focus:outline-none"
                >
                  {{ isEdit ? "Modifier le vinyle" : "Enregistrer le vinyle" }}
                </button>
              </div>
            </div>
          </form>
          <div class="mt-4 text-center">
            <button
              type="button"
              class="py-2 px-4 text-lg font-medium text-red-600 focus:outline-none"
            >
              Supprimer
            </button>
          </div>
        </div>
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
      isEdit: false,
      vinyl: {
        name: null,
        artist: null,
        releaseDate: null,
        description: null,
      },
      failed: false,
    };
  },
  methods: {
    validForm() {
      let isFormValid = true;

      if (
        !this.vinyl.name ||
        this.vinyl.name.length < 1 ||
        this.vinyl.name.length >= 50
      ) {
        isFormValid = false;
        document.getElementById("name").classList.add("invalid");
      } else {
        document.getElementById("name").classList.remove("invalid");
      }

      if (
        !this.vinyl.artist ||
        this.vinyl.artist.length < 1 ||
        this.vinyl.artist.length >= 50
      ) {
        isFormValid = false;
        document.getElementById("artist").classList.add("invalid");
      } else {
        const element = document.getElementById("artist");
        element.classList.remove("invalid");
        // Add a space after each comma
        const artists = this.vinyl.artist.split(",");
        this.vinyl.artist = artists.map((a) => a.trim()).join(", ");
      }

      // If the release date is not empty and is not from 1000 to 2999 (year)
      if (
        this.vinyl.releaseDate &&
        this.vinyl.releaseDate.length !== 0 &&
        /^[12]\d{3}$/.exec(this.vinyl.releaseDate) == null
      ) {
        isFormValid = false;
        document.getElementById("releaseDate").classList.add("invalid");
      } else {
        document.getElementById("releaseDate").classList.remove("invalid");
      }

      if (this.vinyl.description && this.vinyl.description.length >= 250) {
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
        const data = {
          name: this.vinyl.name,
          artist: this.vinyl.artist,
          releaseDate:
            this.vinyl.releaseDate?.length > 1 ? this.vinyl.releaseDate : null,
          description:
            this.vinyl.description?.length > 1 ? this.vinyl.description : null,
        };

        let res;
        if (this.isEdit) {
          res = await HTTP.patch("/vinyls/" + this.$route.params.id, data);
        } else {
          res = await HTTP.post("/vinyls", data);
        }

        if (
          (this.isEdit && res.status !== 204) ||
          (!this.isEdit && res.status !== 201)
        ) {
          throw new Error("Error while creating/modifying the vinyl");
        }

        this.$router.push({
          name: "vinyl-detail",
          params: { id: this.vinyl.id },
        });
      } catch (e) {
        if (e.response && e.response.status === 401) {
          return this.$router.push({ name: "login" });
        }
        this.failed = true;
        this.$store.commit("disableLoading");
      }
    },
  },
  async created() {
    try {
      const id = this.$route.params.id;
      if (id) {
        if (id.length < 1) {
          throw new Error("No id provided");
        }

        this.isEdit = true;

        const res = await HTTP.get(`/vinyls/${id}`);
        this.vinyl = res.data;
      }

      this.$store.commit("disableLoading");
    } catch (e) {
      // Redirect to 404
      this.$router.push({
        name: "not-found",
        params: { pathMatch: this.$route.path.substring(1).split("/") },
      });
    }
  },
};
</script>

<style scoped>
input.invalid {
  border-color: #dc2626;
}
</style>
