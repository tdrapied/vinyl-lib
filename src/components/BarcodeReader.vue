<template>
  <VinylModal :isOpen="showModal" :close="restartScanner">
    <div class="mt-6 text-center text-xl">
      <p>Le barcode de votre vinyle est-il correct ?</p>
      <p class="mt-8 font-medium">
        {{ this.code }}
      </p>
    </div>
    <div class="mt-6 flex">
      <button
        type="button"
        class="px-4 py-2 font-medium flex items-center focus:outline-none"
        @click="restartScanner"
      >
        <XCircleIcon class="h-7 w-7" />
        <div class="pl-4">Non, recommencer</div>
      </button>
      <button
        type="button"
        class="text-primary px-4 py-2 font-medium flex items-center focus:outline-none"
        @click="closeComponent(code)"
      >
        <CheckIcon class="h-7 w-7" />
        <div class="pl-4">Oui, bien sûr</div>
      </button>
    </div>
  </VinylModal>
  <div class="z-[22] absolute top-0 right-0">
    <div class="pt-4 pr-4">
      <button
        type="button"
        class="text-white focus:outline-none"
        v-if="!showModal"
        @click="closeComponent()"
      >
        <XIcon class="h-7 w-7" />
      </button>
    </div>
  </div>
  <div class="flex flex-col h-[80vh] justify-center">
    <div>
      <div class="viewport flex justify-center">
        <video
          id="camera"
          class="border border-2 border-primary"
          ref="camera"
          autoplay
        ></video>
      </div>
    </div>
    <div class="mt-10 text-center font-medium text-white animate-pulse">
      Scan en cours ...
    </div>
  </div>
  <canvas id="canvas" class="hidden" ref="canvas"></canvas>
</template>

<script>
import VinylModal from "@/components/VinylModal";
import { XIcon, XCircleIcon, CheckIcon } from "@heroicons/vue/outline";
import Quagga from "@ericblade/quagga2";

export default {
  name: "BarcodeReader",
  components: {
    VinylModal,
    XIcon,
    XCircleIcon,
    CheckIcon,
  },
  data() {
    return {
      code: null,
      scanInterval: null,
      showModal: false,
    };
  },
  props: {
    close: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    async createCameraElement() {
      try {
        if (
          !navigator.mediaDevices ||
          typeof navigator.mediaDevices.getUserMedia !== "function"
        ) {
          throw new Error("getUserMedia is not supported!");
        }

        const pageRect = document.querySelector("body").getBoundingClientRect();

        const cameraSize = {
          height: 120,
          width: pageRect.width / 1.25,
        };

        const constraints = (window.constraints = {
          audio: false,
          video: {
            facingMode: "environment",
            // Inverse size because of the camera orientation
            height: cameraSize.width,
            width: cameraSize.height,
          },
        });

        this.$refs.camera.srcObject = await navigator.mediaDevices.getUserMedia(
          constraints
        );

        // Resize canvas element
        this.$refs.canvas.width = cameraSize.width;
        this.$refs.canvas.height = cameraSize.height;

        this.runScanner();

        this.$store.commit("disableLoading");
      } catch (e) {
        // Force close component
        this.$props.close();
      }
    },
    stopCamera() {
      const tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },
    runScanner() {
      this.scanInterval = setInterval(this.scan, 1500); // 1.5 seconds
    },
    restartScanner() {
      this.closeModal();
      this.code = null;
      this.runScanner();
    },
    stopScanner() {
      if (this.scanInterval) {
        clearInterval(this.scanInterval);
      }
    },
    scan() {
      if (this.showModal) {
        this.stopScanner();
        return;
      }

      const context = this.$refs.canvas.getContext("2d");
      context.drawImage(
        this.$refs.camera,
        0,
        0,
        this.$refs.camera.clientWidth,
        this.$refs.camera.clientHeight
      );

      this.$refs.canvas.toBlob(async (blob) => {
        try {
          this.code = await this.decodeCanvasBarcode(URL.createObjectURL(blob));

          this.stopScanner();

          this.showModal = true;
        } catch (e) {
          // Nothing to do
        }
      });
    },
    decodeCanvasBarcode(objectUrl) {
      return new Promise((resolve, reject) => {
        Quagga.decodeSingle(
          {
            src: objectUrl,
            numOfWorkers: 0,
            inputStream: {
              size: 640,
            },
            decoder: {
              readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "i2of5_reader",
              ], // List of active readers
            },
            debug: false,
          },
          function (result) {
            // Remove object url from memory
            URL.revokeObjectURL(objectUrl);

            if (result && result.codeResult) {
              console.log(result);
              resolve(result.codeResult.code);
            } else {
              reject("No barcode found");
            }
          }
        );
      });
    },
    closeComponent(code) {
      this.$store.commit("enableLoading");

      this.stopScanner();
      this.stopCamera();

      this.$props.close(code);
    },
  },
  mounted() {
    this.$store.commit("enableLoading");
    this.createCameraElement();
  },
};
</script>

<style>
video {
  box-shadow: 0 0 0 1000px rgb(0 0 0);
}
</style>
