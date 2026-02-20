import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/LayoutNav.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: { require: true },
        },
        {
          path: "shopping",
          name: "shopping",
          component: () => import("../views/products/ShoppingView.vue"),
        },
        {
          path: "detail",
          name: "detail",
          component: () => import("../views/products/ProductDetailView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/payments/PaymentView.vue"),
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
