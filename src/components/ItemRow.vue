<template>
  <tr
    class="hover:bg-primary-light"
    @click="isMobile ? showModal(vinyl) : null"
  >
    <td class="hidden sm:table-cell text-center font-bold">
      <div class="px-1">{{ number }}</div>
    </td>
    <td>
      <div class="flex items-center py-2 pl-6 sm:pl-0">
        <div class="mr-5">
          <img
            class="object-contain h-12 w-12"
            :src="
              vinyl.coverSmall || require('../assets/vinyl-cover-default.png')
            "
          />
        </div>
        <div>
          <div class="text-lg font-bold">
            {{ vinyl.name }}
          </div>
          <div>{{ vinyl.artist }}</div>
        </div>
      </div>
    </td>
    <td class="hidden sm:table-cell">
      <div>{{ vinyl.releaseDate }}</div>
    </td>
    <td class="hidden lg:table-cell">
      <div>{{ createdAt }}</div>
    </td>
    <td>
      <div class="text-center">
        <button
          type="button"
          class="focus:outline-none"
          @click="isMobile ? null : showModal(vinyl)"
        >
          <DotsVerticalIcon class="h-6 w-6" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { DotsVerticalIcon } from "@heroicons/vue/outline";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

export default {
  name: "ItemRow",
  components: {
    DotsVerticalIcon,
  },
  props: {
    number: {
      type: Number,
      default: null,
    },
    vinyl: {
      type: Object,
      default: () => ({}),
    },
    showModal: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    isMobile() {
      return navigator.userAgentData?.mobile;
    },
    createdAt: function () {
      if (this.vinyl.createdAt) {
        return moment(this.vinyl.createdAt).fromNow();
      }
      return "";
    },
  },
};
</script>
