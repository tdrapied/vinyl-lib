<template>
  <CustomLoader />
  <BarcodeReader v-if="showCamera" :close="cameraClosed" />
  <VinylModal v-if="isEdit" :isOpen="showModal" :close="closeModal">
    <p class="mt-10 text-center text-xl font-medium">
      Voulez-vous vraiment supprimer ce vinyle ?
    </p>
    <div class="mt-8 flex flex-col sm:flex-row">
      <button
        type="button"
        class="px-4 py-2 font-medium flex items-center focus:outline-none"
        @click="closeModal"
      >
        <XCircleIcon class="h-7 w-7" />
        <div class="pl-4">Non, ne rien faire</div>
      </button>
      <button
        type="button"
        class="text-red-600 px-4 py-2 font-medium flex items-center focus:outline-none"
        @click="deleteVinyl"
      >
        <TrashIcon class="h-7 w-7" />
        <div class="pl-4">Oui, supprimer</div>
      </button>
    </div>
    <p v-if="failedDelete" class="mt-3 text-red-600 text-center text-sm">
      Désolé, une erreur est survenue lors de la suppression du vinyle. Veuillez
      réessayer plus tard.
    </p>
  </VinylModal>
  <DashboardBase :hidden="showCamera">
    <header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-black py-4">
            {{ isEdit ? "Modifier un vinyle" : "Ajouter un vinyle" }}
          </h1>
          <button
            v-if="isMobile"
            type="submit"
            class="inline-flex items-center justify-center w-14 h-14 text-white bg-primary rounded-full"
            @click="showCamera = true"
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
                  class="object-contain w-44 h-44 sm:w-52 sm:h-52"
                  :src="require('../assets/vinyl-cover-default.png')"
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
                  placeholder="Nom du vinyle"
                  required
                />
                <label
                  for="name"
                  class="absolute left-0 -top-5 text-gray-600 transition-all peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600"
                  >Nom du vinyle *</label
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
                <div class="mb-6" v-if="failedMessage">
                  <p class="text-center font-light text-red-600">
                    {{ failedMessage }}
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
          <div v-if="isEdit" class="mt-4 text-center">
            <button
              type="button"
              class="py-2 px-4 text-lg font-medium text-red-600 focus:outline-none"
              @click="showModal = true"
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
import { QrcodeIcon, XCircleIcon, TrashIcon } from "@heroicons/vue/outline";
import { HTTP } from "@/config/http-common";
import VinylModal from "@/components/VinylModal";
import BarcodeReader from "@/components/BarcodeReader";

export default {
  name: "VinylForm",
  components: {
    VinylModal,
    CustomLoader,
    BarcodeReader,
    DashboardBase,
    QrcodeIcon,
    XCircleIcon,
    TrashIcon,
  },
  data() {
    return {
      isEdit: false,
      showModal: false,
      showCamera: false,
      failedDelete: false,
      vinyl: {
        name: null,
        artist: null,
        releaseDate: null,
        description: null,
      },
      failedMessage: null,
    };
  },
  computed: {
    isMobile() {
      return navigator.userAgentData.mobile;
    },
  },
  methods: {
    closeModal() {
      this.failedDelete = false;
      this.showModal = false;
    },
    async cameraClosed(barcode) {
      this.showCamera = false;

      if (barcode) {
        try {
          const res = await HTTP.get("vinyls/search", {
            params: {
              barcode,
            },
          });
          if (res.status !== 200) {
            throw new Error("Error while searching vinyl information");
          }

          this.failedMessage = null;

          this.vinyl.name = res.data.name;
          this.vinyl.artist = res.data.artist;
          this.vinyl.releaseDate = res.data.releaseDate;
        } catch (e) {
          this.failedMessage = `Désolé, le vinyle que vous avait scanné est introuvable.`;
        }
      }

      this.$store.commit("disableLoading");
    },
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
          releaseDate: this.vinyl.releaseDate,
          description: this.vinyl.description,
        };

        let res;
        if (this.isEdit) {
          res = await HTTP.put("/vinyls/" + this.$route.params.id, data);
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
          params: { id: this.isEdit ? this.vinyl.id : res.data.id },
        });
      } catch (e) {
        if (e.response && e.response.status === 401) {
          return this.$router.push({ name: "login" });
        }

        this.failedMessage = `Désolé, une erreur est survenue lors de ${
          this.isEdit ? "la modification" : "l'ajout"
        } du vinyle. Veuillez réessayer plus tard.`;

        this.$store.commit("disableLoading");
      }
    },
    async deleteVinyl() {
      if (!this.isEdit) {
        return;
      }

      this.$store.commit("enableLoading");

      try {
        const res = await HTTP.delete("vinyls/" + this.vinyl.id);
        if (res.status !== 204) {
          throw new Error("Error while deleting vinyl");
        }

        this.$router.push({ name: "home" });
      } catch (e) {
        this.failedDelete = true;
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
