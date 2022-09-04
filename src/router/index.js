import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView";
import Api from "../services/Api";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
