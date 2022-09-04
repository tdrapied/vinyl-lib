<template>
  <CustomLoader />
  <div class="bg-white-dark h-screen">
    <router-view />
  </div>
</template>

<script>
import CustomLoader from "@/components/CustomLoader";
export default { name: "App", components: { CustomLoader } };
</script>
