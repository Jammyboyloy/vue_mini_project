import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { require: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/profile/ProfileView.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  let auth = useAuthStore();
  if (!auth.isLoggedIn && to.meta.require) {
    return { name: "login" };
  }
  return true;
});

export default router;
