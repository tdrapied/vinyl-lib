<template>
  <div class="min-h-full" :hidden="this.$store.state.isLoading">
    <Disclosure
      as="nav"
      class="bg-white border-b border-gray-300"
      v-slot="{ open }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link :to="{ name: 'home' }">
              <div class="flex items-center justify-between flex-shrink-0">
                <img
                  class="h-10 w-10"
                  :src="require('../assets/logo.svg')"
                  alt="logo"
                />
                <div class="font-bold ml-4 text-xl">Vinylib</div>
              </div>
            </router-link>
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
                    <router-link
                      :to="{ name: 'logout' }"
                      class="block px-4 py-2 text-sm text-gray-700"
                    >
                      Se déconnecter
                    </router-link>
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
            <router-link
              :to="{ name: 'logout' }"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-primary hover:bg-secondary"
              >Se déconnecter
            </router-link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <slot />
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
import { MenuIcon, XIcon, UserIcon } from "@heroicons/vue/outline";
import Api from "@/services/Api";

export default {
  name: "DashboardBase",
  components: {
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
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
      },
    };
  },
  async created() {
    try {
      const user = await Api.me();
      this.user.email = user.email;
      this.user.name = `${user.firstName} ${user.lastName}`;
    } catch (e) {
      // If user is not connected > redirect to login
      this.$router.push({ name: "login" });
    }
  },
};
</script>
