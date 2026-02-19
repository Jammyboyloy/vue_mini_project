<script setup>
import BaseCard from "@/components/BaseCard.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
import Navbar from "@/components/Navbar.vue";
import { useProductStore } from "@/stores/product";
import { onMounted } from "vue";

const product = useProductStore();

onMounted(() => {
  product.fetchProduct();
});
</script>

<template>
  <div>
    <Navbar />
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
              <BaseCard :product="pro" />
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
