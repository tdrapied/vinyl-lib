<template>
  <CustomLoader />
  <VinylActionModal
    :vinyl="modalVinyl"
    :isOpen="modalIsOpen"
    :close="closeModal"
    :vinylIsDelete="vinylIsDelete"
  />
  <DashboardBase>
    <header>
      <div class="max-w-7xl mx-auto pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold text-black">
              Ma librairie
            </h1>
            <h2 class="mt-2 font-light text-gray-500">
              {{ vinylCountString }}
            </h2>
          </div>
          <div v-if="noItems">
            <router-link
              :to="{ name: 'vinyl-create' }"
              class="inline-flex items-center justify-center w-14 h-14 text-white bg-primary rounded-full"
            >
              <PlusIcon class="w-6 h-6" />
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0 pb-10">
          <div v-if="noItems || items.length > 0">
            <div class="pb-10 flex">
              <div
                class="h-10 px-2 border-2 border-primary border-r-0 rounded-l-xl flex items-center"
              >
                <SearchIcon class="w-6 h-6 text-gray-800" />
              </div>
              <input
                id="query"
                name="query"
                type="text"
                v-model.trim="queryInput"
                class="h-10 px-1 w-full max-w-[450px] bg-secondary border-y-2 border-primary text-gray-900 focus:outline-none"
                placeholder="Rechercher un vinyle"
                @input="searchVinyl"
              />
              <div
                class="h-10 px-2 border-2 border-primary border-l-0 rounded-r-xl flex items-center text-gray-800"
              >
                <div id="search-x" class="text-transparent" @click="clearQuery">
                  <XIcon class="w-6 h-6" />
                </div>
              </div>
            </div>
            <table class="table-auto w-full" v-if="items.length > 0">
              <thead>
                <tr>
                  <th class="text-center font-normal pb-3 hidden sm:table-cell">
                    #
                  </th>
                  <th class="text-left font-normal pb-3 pl-6 sm:pl-0">
                    VINYLE
                  </th>
                  <th class="text-left font-normal pb-3 hidden sm:table-cell">
                    DATE DE SORTIE
                  </th>
                  <th class="text-left font-normal pb-3 hidden lg:table-cell">
                    AJOUTÉ LE
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ItemRow
                  v-for="(item, index) in items"
                  :key="item.id"
                  :number="index + 1"
                  :vinyl="item"
                  :showModal="openModal"
                />
              </tbody>
            </table>
            <div class="mt-16 text-center" v-else>
              <div class="text-2xl font-bold">
                Aucun résultat pour
                <br />
                « {{ query }} »
              </div>
              <div class="mt-3 font-light text-gray-400">
                Vérifiez l'orthographe ou essayez d'autres mots-clés.
              </div>
            </div>
          </div>
          <div class="mt-10 text-center" v-else>
            <div>
              <div class="text-2xl font-bold">Votre librairie est vide.</div>
              <div class="mt-3 font-light text-gray-400">
                On dirait que vous n'avez pas de vinyles ici. Ajoutez-en !
              </div>
            </div>
            <div class="mt-8 text-center">
              <router-link
                :to="{ name: 'vinyl-create' }"
                class="inline-flex items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary focus:outline-none"
              >
                <PlusIcon class="w-6 h-6 mr-1" />
                Ajouter un vinyle
              </router-link>
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
import ItemRow from "@/components/ItemRow";
import { PlusIcon, SearchIcon, XIcon } from "@heroicons/vue/outline";
import VinylActionModal from "@/components/VinylActionModal";
import Api from "@/services/Api";

export default {
  name: "VinylList",
  components: {
    CustomLoader,
    DashboardBase,
    VinylActionModal,
    ItemRow,
    PlusIcon,
    SearchIcon,
    XIcon,
  },
  data() {
    return {
      items: [],
      modalIsOpen: false,
      modalVinyl: {},
      queryInput: "",
      query: "",
      searchTimer: null,
    };
  },
  computed: {
    /* Return false if a query is set and no items are found */
    noItems() {
      return this.items.length === 0 && this.query?.length > 0;
    },
    vinylCountString() {
      switch (this.items.length) {
        case 0:
          return "Aucun vinyle enregistré";
        case 1:
          return "1 vinyle enregistré";
        default:
          return `${this.items.length} vinyles enregistrés`;
      }
    },
  },
  methods: {
    openModal(vinyl) {
      this.modalVinyl = vinyl;
      this.modalIsOpen = true;
    },
    closeModal() {
      this.modalIsOpen = false;
    },
    vinylIsDelete() {
      this.updateList();
      this.closeModal();
      this.$store.commit("disableLoading");
    },
    clearQuery() {
      if (this.queryInput.length < 1) return;
      this.queryInput = "";
      this.query = "";
      document.getElementById("search-x").classList.add("text-transparent");
      this.updateList();
    },
    searchVinyl() {
      if (!this.queryInput.length || this.queryInput.length === 0) {
        clearTimeout(this.searchTimer);
        this.updateList();
        document.getElementById("search-x").classList.add("text-transparent");
        return;
      }

      document.getElementById("search-x").classList.remove("text-transparent");

      const query = this.queryInput.trim();
      if (query.length < 1) return;

      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.updateList({ search: query });
        this.query = query;
      }, 350);
    },
    async updateList(params = null) {
      try {
        const res = await Api.vinylList(params);
        this.items = res.data;
      } catch (e) {
        this.$router.push({ name: "login" });
      }
    },
  },
  async mounted() {
    this.$store.commit("enableLoading");
    await this.updateList();
    this.$store.commit("disableLoading");
  },
};
</script>
