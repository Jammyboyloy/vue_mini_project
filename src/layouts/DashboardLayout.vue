<template>
  <div class="dashboard-container">
    <nav :class="['sidebar', collapsed ? 'collapsed' : '']">
      <div class="sidebar-header">
        <div class="brand" :class="{ 'brand-visible': !collapsed }">
          <i class="bi bi-lightning-charge-fill me-2"></i>
          <span>NEXUS</span>
        </div>
        <button class="toggle-btn" @click="toggleSidebar">
          <i
            class="bi"
            :class="collapsed ? 'bi-chevron-right' : 'bi-chevron-left'"
          ></i>
        </button>
      </div>

      <div class="nav-links">
        <router-link
          v-for="item in menuItems"
          :key="item.text"
          :to="item.path"
          class="nav-item"
          exact-active-class="active"
        >
          <div class="icon-box">
            <component :is="item.icon" size="24" />
          </div>
          <span class="nav-text" :class="{ 'text-visible': !collapsed }">
            {{ item.text }}
          </span>
        </router-link>
      </div>
    </nav>

    <main class="main-content">
      <navbar />

      <div class="content-body">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { Store, CirclePlus } from "lucide-vue-next";
import { ref } from "vue";
const collapsed = ref(false);
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const menuItems = [
  { text: "My Product", path: "/dashboard", icon: Store },
  {
    text: "Create Product",
    path: "/dashboard/createProduct",
    icon: CirclePlus,
  },
];
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f3f4f6;
}

.sidebar {
  width: 260px;
  background-color: #35495e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  height: 68px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  padding: 0 15px;
}

.brand {
  font-weight: 800;
  font-size: 1.1rem;
  color: #42b883;
  white-space: nowrap;
  transition:
    opacity 0.2s ease,
    transform 0.3s ease;
  opacity: 0;
  transform: translateX(-10px);
}

.brand-visible {
  opacity: 1;
  transform: translateX(0);
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 24px;
}

.nav-links {
  padding: 15px 0;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-item {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 4px 10px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.2s ease;
  position: relative;
}

.icon-box {
  width: 60px;
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  z-index: 2;
}

/* FIXED: Smooth Nav Text */
.nav-text {
  font-weight: 500;
  white-space: nowrap;
  transition:
    opacity 0.2s ease,
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateX(-15px);
}

.text-visible {
  opacity: 1;
  transform: translateX(0);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  background: #42b883 !important;
  color: #ffffff !important;
}

/* Layout parts */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 0;
}

.top-bar {
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 30px;
}

.content-body {
  padding: 30px;
  flex: 1;
  overflow-y: auto;
}
</style>
