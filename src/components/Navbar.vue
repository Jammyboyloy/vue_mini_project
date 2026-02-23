<template>
  <div class="position-sticky w-100 top-0 z-3">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div class="container-fluid">
        <div>
          <ul class="navbar-nav gap-2">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link fs-6 fw-bold text-uppercase text-dark"
                exact-active-class="text-main"
              >
                Home
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                to="/shopping"
                class="nav-link fs-6 fw-bold text-uppercase text-dark"
                exact-active-class="text-main"
              >
                Shopping
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                to="/login"
                class="nav-link fs-6 fw-bold text-uppercase text-dark"
                exact-active-class="text-main"
              >
                Create own product
              </router-link>
            </li>
          </ul>
        </div>
        <span class="navbar-brand fw-bold">📰 Shop</span>
        <div class="d-flex align-items-center gap-3">
          <OverlayBadge
            @click="goLogin"
            :value="cart.countProduct"
            severity="danger"
            class="small-badge"
          >
            <ShoppingBag :size="25" style="cursor: pointer" />
          </OverlayBadge>

          <div class="nav-dropdown p-2">
            <div
              class="d-flex align-items-center gap-2"
              style="cursor: pointer"
            >
              <img
                src="https://i.pinimg.com/736x/45/29/24/452924175632c9bb3d6d7cea8c4f3746.jpg"
                class="rounded-circle"
                width="34"
                height="34"
              />
              <p class="m-0 p-0" style="font-size: 14px">Jammy Lay</p>
            </div>

            <div class="menu-container">
              <Menu :model="profileItems">
                <template #start>
                  <div
                    class="d-flex justify-content-between align-items-center px-3 py-2"
                  >
                    <span class="text-secondary small fw-bold">Appearance</span>
                  </div>
                </template>
                <template #item="{ item, props }">
                  <a
                    v-bind="props.action"
                    class="d-flex align-items-center gap-3"
                    :class="{ 'text-danger': item.label === 'Logout' }"
                  >
                    <component
                      :is="item.icon"
                      :class="{ 'text-danger': item.label === 'Logout' }"
                    />
                    <span>{{ item.label }}</span>
                  </a>
                </template>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { h, onMounted } from "vue";
import { LogOut, ShoppingBag, User, Package } from "lucide-vue-next";
import Menu from "primevue/menu";
import OverlayBadge from "primevue/overlaybadge";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const router = useRouter();
const goLogin = () => {
  router.push("/login");
};

const cart = useCartStore();

const profileItems = [
  {
    label: "Profile",
    icon: User,
    class: "item-gap",
    command: () => router.push("/profile"),
  },
  {
    label: "My Order",
    icon: () => h(ShoppingBag, { size: 22 }),
    class: "item-gap",
    command: () => router.push("/profile"),
  },
  {
    label: "My Product",
    icon: () => h(Package, { size: 22 }),
    class: "item-gap",
    command: () => router.push("/profile"),
  },
  { separator: true, class: "item-gap" },
  { label: "Logout", icon: LogOut },
];
</script>

<style scoped>
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.menu-container {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s ease-in-out;
  pointer-events: none;
}

.nav-dropdown:hover .menu-container {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

:deep(.p-menu) {
  padding: 0.4rem 0.5rem;
  border-radius: 12px;
}

:deep(.item-gap) {
  margin-bottom: 3px;
}

.small-badge :deep(.p-badge) {
  min-width: 18px !important;
  height: 18px !important;
  font-size: 12px !important;
  cursor: pointer;
}
</style>
