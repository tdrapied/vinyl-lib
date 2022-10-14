<template>
  <VinylModal :isOpen="isOpen" :close="closeModal">
    <div class="text-center pt-2">
      <div class="flex justify-center mb-4">
        <img
          class="object-contain h-40 w-40"
          src="https://fakeimg.pl/60/?text=%E3%85%A4"
        />
      </div>
      <div class="text-lg font-bold">{{ vinyl.name || "name" }}</div>
      <div>{{ vinyl.artist || "artist" }}</div>
    </div>
    <div class="mt-8">
      <router-link
        v-if="showDetailButton"
        :to="{ name: 'vinyl-detail', params: { id: vinyl.id } }"
        class="mb-2 px-4 py-2 font-medium flex items-center focus:outline-none"
      >
        <InformationCircleIcon class="h-7 w-7" />
        <div class="pl-4">Détails</div>
      </router-link>
      <router-link
        :to="{ name: 'vinyl-edit', params: { id: vinyl.id } }"
        class="mb-2 px-4 py-2 font-medium flex items-center focus:outline-none"
      >
        <PencilAltIcon class="h-7 w-7" />
        <div class="pl-4">Modifier</div>
      </router-link>
      <div class="mt-2">
        <button
          v-if="!wantDelete"
          type="button"
          class="px-4 py-2 font-medium flex items-center focus:outline-none"
          @click="wantDelete = true"
        >
          <TrashIcon class="h-7 w-7" />
          <div class="pl-4">Supprimer</div>
        </button>
        <div v-if="wantDelete" class="flex">
          <button
            type="button"
            class="px-4 py-2 font-medium flex items-center focus:outline-none"
            @click="wantDelete = false"
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
          Désolé, une erreur est survenue lors de la suppression du vinyle.
          Veuillez réessayer plus tard.
        </p>
      </div>
    </div>
  </VinylModal>
</template>

<script>
import VinylModal from "@/components/VinylModal";
import {
  InformationCircleIcon,
  PencilAltIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/vue/outline";
import { HTTP } from "@/config/http-common";

export default {
  name: "VinylActionModal",
  components: {
    VinylModal,
    InformationCircleIcon,
    PencilAltIcon,
    TrashIcon,
    XCircleIcon,
  },
  data() {
    return {
      wantDelete: false,
      failedDelete: false,
    };
  },
  props: {
    vinyl: {
      type: Object,
      default: () => ({}),
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Function,
      default: () => {},
    },
    showDetailButton: {
      type: Boolean,
      default: true,
    },
    vinylIsDelete: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    closeModal() {
      this.wantDelete = false;
      this.failedDelete = false;
      this.$props.close();
    },
    async deleteVinyl() {
      this.$store.commit("enableLoading");

      try {
        const res = await HTTP.delete("vinyls/" + this.$props.vinyl.id);
        if (res.status !== 204) {
          throw new Error("Error while deleting vinyl");
        }

        this.$props.vinylIsDelete(this.$props.vinyl.id);
      } catch (e) {
        this.wantDelete = false;
        this.failedDelete = true;
        this.$store.commit("disableLoading");
      }
    },
  },
};
</script>
