<template>
  <tr class="hover:bg-primary-light">
    <td class="text-center font-bold">
      <div class="px-1">{{ number }}</div>
    </td>
    <td>
      <div class="flex items-center py-2">
        <div class="mr-5">
          <img
            class="object-contain h-12 w-12"
            src="https://fakeimg.pl/60/?text=%E3%85%A4"
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
      <div>{{ releaseDate }}</div>
    </td>
    <td class="hidden lg:table-cell">
      <div>{{ createdAt }}</div>
    </td>
    <td>
      <div>
        <a href="#">
          <DotsVerticalIcon class="h-6 w-6" />
        </a>
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
  name: "ListRow",
  components: {
    DotsVerticalIcon,
  },
  props: {
    number: null,
    vinyl: {},
  },
  computed: {
    releaseDate: function () {
      if (this.vinyl.releaseDate) {
        return moment(this.vinyl.releaseDate).format("YYYY");
      }
      return "";
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
