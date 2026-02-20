<script setup>
import BaseCard from "@/components/BaseCard.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
import Navbar from "@/components/Navbar.vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { onMounted } from "vue";

const product = useProductStore();
const cart = useCartStore();

onMounted(() => {
  product.fetchProduct();
});

const handleCart = (id) => {
  cart.addToMyCart(id, cart.countQty);
};
</script>

<template>
  <div>
    <div v-if="cart.loadingAdd" class="full-loader">
      <div class="loader">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>

    <div class="container pb-5">
      <div class="row g-4">
        <template v-if="product.loading">
          <div class="col-md-4 col-lg-3" v-for="n in 8" :key="'skeleton-' + n">
            <CardSkeleton />
          </div>
        </template>
        <template v-else>
          <div
            class="col-md-4 col-lg-3"
            v-for="pro in product.productList"
            :key="pro.id"
          >
            <router-link to="/" class="nav-link">
              <BaseCard :product="pro" @add-to-cart="handleCart" />
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
.full-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.loader {
  display: flex;
  align-items: center;
}

.bar {
  display: inline-block;
  width: 4px;
  height: 25px;
  background-color: white;
  border-radius: 10px;
  animation: scale-up4 1s linear infinite;
}

.bar:nth-child(2) {
  height: 40px;
  margin: 0 6px;
  animation-delay: 0.25s;
}

.bar:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes scale-up4 {
  20% {
    transform: scaleY(1.5);
  }
  40% {
    transform: scaleY(1);
  }
}
</style>
