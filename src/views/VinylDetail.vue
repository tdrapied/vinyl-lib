<template>
  <CustomLoader />
  <VinylActionModal
    :vinyl="vinyl"
    :isOpen="modalIsOpen"
    :close="closeModal"
    :vinylIsDelete="vinylIsDelete"
    :showDetailButton="false"
  />
  <DashboardBase>
    <header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-black py-4">
            {{ vinyl.name }}
          </h1>
          <button
            type="button"
            class="inline-flex items-center justify-center w-14 h-14 text-white bg-primary rounded-full"
            @click="openModal"
          >
            <PencilIcon class="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0 pb-10">
          <div class="flex justify-center">
            <img
              class="object-contain w-44 h-44 sm:w-52 sm:h-52"
              :src="require('../assets/vinyl-cover-default.png')"
              alt="vinyl cover"
            />
          </div>
          <div class="text-center mt-4">
            <p class="font-medium mb-1">
              {{ vinyl.artist }}
            </p>
            <p class="text-gray-500">
              {{ vinyl.releaseDate }}
            </p>
          </div>
          <div class="mt-8">
            <div>
              <div class="font-bold text-primary text-2xl mb-1">
                Description
              </div>
              <div v-if="this.vinyl.description">
                <p>{{ vinyl.description }}</p>
              </div>
              <div v-else>Aucune description</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </DashboardBase>
</template>

<script>
import CustomLoader from "@/components/CustomLoader";
import DashboardBase from "@/components/DashboardBase";
import VinylActionModal from "@/components/VinylActionModal";
import { PencilIcon } from "@heroicons/vue/outline";
import { HTTP } from "@/config/http-common";

export default {
  name: "VinylForm",
  components: {
    CustomLoader,
    DashboardBase,
    VinylActionModal,
    PencilIcon,
  },
  data() {
    return {
      vinyl: {},
      modalIsOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalIsOpen = true;
    },
    closeModal() {
      this.modalIsOpen = false;
    },
    vinylIsDelete() {
      this.$router.push({ name: "home" });
    },
  },
  async created() {
    try {
      const id = this.$route.params.id;
      if (!id || id.length < 1) {
        throw new Error("No id provided");
      }

      const res = await HTTP.get(`/vinyls/${id}`);
      this.vinyl = res.data;

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
