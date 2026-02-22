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
          path: "myCart",
          name: "myCart",
          component: () => import("../views/carts/CartsView.vue"),
        },
        {
          path: "detail/:id",
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
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/profile/ProfileView.vue"),
    },
    {
      path: "/dashboard",
      component: () => import("../layouts/DashboardLayout.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/Dashboard.vue"),
          meta: { require: true },
        },
        {
          path: "category",
          name: "category",
          component: () => import("../views/categories/CategoryView.vue"),
          meta: { require: true },
        },
        {
          path: "createProduct",
          name: "createProduct",
          component: () => import("../views/products/CreateProductView.vue"),
          meta: { require: true },
        },
      ],
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
