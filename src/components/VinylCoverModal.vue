<template>
  <VinylModal :isOpen="true" :close="closeModal">
    <p class="my-4 text-center text-xl font-medium">
      Choisissez une pochette<br />pour le vinyle
    </p>
    <div class="mt-6">
      <div :class="!coverURL ? 'opacity-50' : ''">
        <div class="flex justify-center">
          <img
            :class="
              'object-cover h-40 w-40 ' + (!coverURL ? '' : 'cursor-pointer')
            "
            :src="coverURL || require('../assets/vinyl-cover-default.png')"
            alt="vinyl cover"
            @click="selectSpotify"
          />
        </div>

        <div class="flex justify-center mt-4 text-gray-800">
          <div class="mr-1.5">Suggeré par</div>
          <img
            class="w-20"
            :src="require('../assets/spotify.svg')"
            alt="spotify logo"
          />
        </div>
      </div>
      <div class="mt-10">
        <div class="flex justify-center">
          <div class="relative">
            <div
              class="absolute cursor-pointer top-[-15px] right-[-15px] inline-flex items-center justify-center w-12 h-12 text-white bg-primary rounded-full"
            >
              <PencilIcon class="w-6 h-6" @click="$refs.file.click()" />
            </div>
            <img
              class="object-cover h-40 w-40 cursor-pointer"
              :src="vinyl.cover || require('../assets/vinyl-cover-default.png')"
              alt="vinyl cover"
              @click="$refs.file.click()"
            />
          </div>
        </div>
        <div class="text-center mt-4 text-gray-800">Selectionner une image</div>
        <input
          type="file"
          id="file"
          ref="file"
          class="hidden"
          @change="selectFile"
        />
        <div class="mt-4" v-if="errorFile">
          <p class="text-center font-light text-red-600">
            Désolé, l'image selectionnée n'est pas valide.
          </p>
        </div>
      </div>
    </div>
  </VinylModal>
</template>

<script>
import VinylModal from "@/components/VinylModal";
import { HTTP } from "@/config/http-common";
import { PencilIcon } from "@heroicons/vue/outline";

export default {
  name: "VinylCoverModal",
  components: {
    VinylModal,
    PencilIcon,
  },
  data() {
    return {
      cover: null,
      coverURL: null,
      errorFile: false,
    };
  },
  props: {
    vinyl: {
      type: Object,
      default: () => ({}),
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    closeModal() {
      this.$props.close(this.cover);
    },
    selectSpotify() {
      if (!this.coverURL) return;
      this.cover = this.coverURL;
      this.closeModal();
    },
    selectFile() {
      this.cover = this.$refs.file.files[0];

      if (
        this.cover.type !== "image/png" &&
        this.cover.type !== "image/jpeg" &&
        this.cover.type !== "image/jpg"
      ) {
        this.cover = null;
        this.errorFile = true;
        return;
      }

      this.closeModal();
    },
  },
  async created() {
    if (this.$props.vinyl.name && this.$props.vinyl.artist) {
      try {
        const res = await HTTP.get("vinyls/search-cover", {
          params: {
            name: this.$props.vinyl.name,
            artist: this.$props.vinyl.artist,
          },
        });
        this.coverURL = res.data.url;
      } catch (e) {
        // Nothing to do
      }
    }
  },
};
</script>
