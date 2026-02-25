<script setup>
import BaseCard from "@/components/BaseCard.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const product = useProductStore();
const cart = useCartStore();
const router = useRouter();

onMounted(() => {
  product.fetchProduct();
});

const handleCart = (id) => {
  cart.addToMyCart(id, cart.countQty);
};

const handleBuyNow = (id) => {
  cart.addToMyCart(id, cart.countQty);
  router.push("/myCart");
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
            <router-link :to="`/detail/${pro.id}`" class="nav-link">
              <BaseCard :product="pro" @add-to-cart="handleCart" @buy-now="handleBuyNow" />
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
