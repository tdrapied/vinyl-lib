<template>
  <div class="min-h-full">
    <Disclosure
      as="nav"
      class="bg-white border-b border-gray-300"
      v-slot="{ open }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center justify-between flex-shrink-0">
              <img
                class="h-10 w-10"
                :src="require('../assets/logo.svg')"
                alt="logo"
              />
              <div class="font-bold ml-4 text-xl">Vinylib</div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <Menu as="div" class="ml-3 relative">
                <div class="flex items-center justify-between text-right">
                  <div class="mr-3">
                    <div class="text-base font-bold leading-none text-black">
                      {{ user.name }}
                    </div>
                    <div class="text-sm mt-1 leading-none text-gray-400">
                      {{ user.email }}
                    </div>
                  </div>
                  <MenuButton
                    class="max-w-xs rounded-full flex items-center text-sm"
                  >
                    <div>
                      <UserIcon class="h-8 w-8 rounded-full text-black" />
                    </div>
                  </MenuButton>
                </div>
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md py-1 bg-white border border-gray-300 focus:outline-none"
                >
                  <MenuItem>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700">
                      Se déconnecter
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black"
            >
              <MenuIcon v-if="!open" class="block h-7 w-7" aria-hidden="true" />
              <XIcon v-else class="block h-7 w-7" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden border-b border-gray-300">
        <div class="pt-4 pb-3">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <div>
                <UserIcon class="h-10 w-10 rounded-full text-black" />
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-bold leading-none text-black">
                {{ user.name }}
              </div>
              <div class="text-sm mt-1 leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <DisclosureButton
              as="a"
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-primary hover:bg-secondary"
              >Se déconnecter
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header>
      <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-black">Ma librairie</h1>
        <h2 class="mt-2 font-light text-gray-500">
          {{ vinylCountString }}
        </h2>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0 pb-10">
          <table class="table-auto w-full" v-if="items.length > 0">
            <thead>
              <tr>
                <th class="text-center font-normal pb-3">#</th>
                <th class="text-left font-normal pb-3">VINYLE</th>
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
              <ListRow
                v-for="(item, index) in items"
                :key="item.id"
                :number="index + 1"
                :vinyl="item"
              />
            </tbody>
          </table>
          <div class="mt-10 text-center" v-if="items.length === 0">
            <div>
              <div class="text-2xl font-bold">Votre librairie est vide.</div>
              <div class="mt-3 font-light text-gray-400">
                On dirait que vous n'avez pas de vynile ici. Ajoutez-en !
              </div>
            </div>
            <div class="mt-8 text-center">
              <router-link
                to="/"
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
  </div>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MenuIcon, XIcon, UserIcon, PlusIcon } from "@heroicons/vue/outline";
import Api from "@/services/Api";
import ListRow from "@/components/ListRow";
import { HTTP } from "@/config/http-common";

export default {
  name: "DashboardView",
  components: {
    ListRow,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuIcon,
    XIcon,
    UserIcon,
    PlusIcon,
  },
  data() {
    return {
      items: [],
      user: {
        name: "",
        email: "",
      },
    };
  },
  computed: {
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
  async created() {
    try {
      const user = await Api.me();
      this.user.email = user.email;
      this.user.name = `${user.firstName} ${user.lastName}`;

      // Get user's vinyls
      HTTP.get("/vinyls")
        .then((res) => {
          this.items = res.data;
          this.$store.commit("disableLoading");
        })
        .catch(() => {
          // Do nothing
        })
        .finally(() => {
          this.$store.commit("disableLoading");
        });
    } catch (e) {
      // If user is not connected > redirect to login
      this.$router.push("/login");
    }
  },
};
</script>
