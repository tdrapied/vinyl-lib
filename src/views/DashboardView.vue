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
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="logo"
              />
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <Menu as="div" class="ml-3 relative">
                <div class="flex items-center justify-between text-right">
                  <div class="mr-3">
                    <div class="text-base font-medium leading-none text-black">
                      {{ user.name }}
                    </div>
                    <div class="text-sm font-medium leading-none text-gray-400">
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
              <div class="text-base font-medium leading-none text-black">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium leading-none text-gray-400">
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
      <div class="max-w-7xl mx-auto py-7 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-black">Mes vinyles</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 pb-8 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
        <!-- /End replace -->
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
import { MenuIcon, XIcon, UserIcon } from "@heroicons/vue/outline";

export default {
  name: "DashboardView",
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
        name: "Tom Cook",
        email: "tom@example.com",
      },
    };
  },
  created() {
    // If user is not connected, redirect to login
    // TODO: Call /auth/me
    console.log("wait");

    this.$router.push("/login");
    //this.$store.commit("disableLoading");
  },
};
</script>
