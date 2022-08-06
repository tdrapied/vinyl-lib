import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
