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
      <div class="max-w-7xl mx-auto pt-7 pb-8 px-5 sm:px-6 lg:px-8">
        <div class="flex justify-center items-center relative">
          <div class="text-xs uppercase font-black">Détails du vinyle</div>
          <div class="absolute right-0">
            <button type="button" class="focus:outline-none" @click="openModal">
              <DotsVerticalIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0 pb-10">
          <div class="flex justify-center">
            <img
              class="object-cover w-[90%] sm:w-72"
              :src="vinyl.cover || require('../assets/vinyl-cover-default.png')"
              alt="vinyl cover"
            />
          </div>
          <div class="text-center mt-4">
            <h1 class="text-xl font-bold">{{ vinyl.name }}</h1>
            <p class="mb-1">
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
import { DotsVerticalIcon } from "@heroicons/vue/outline";
import { HTTP } from "@/config/http-common";

export default {
  name: "VinylForm",
  components: {
    CustomLoader,
    DashboardBase,
    VinylActionModal,
    DotsVerticalIcon,
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
