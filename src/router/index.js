import { createRouter, createWebHistory } from "vue-router";
import VinylList from "../views/VinylList";
import Api from "../services/Api";

const routes = [
  {
    path: "/",
    redirect: "/vinyls",
  },
  {
    path: "/vinyls",
    name: "home",
    component: VinylList,
  },
  {
    path: "/vinyls/create",
    name: "vinyl-create",
    component: () => import("../views/VinylForm"),
  },
  {
    path: "/vinyls/:id",
    name: "vinyl-detail",
    component: () => import("../views/VinylDetail"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView"),
  },
  {
    path: "/logout",
    name: "logout",
    component: {
      async beforeRouteEnter(to, from, next) {
        await Api.logout();
        next((vm) => vm.$router.push("/login"));
      },
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
