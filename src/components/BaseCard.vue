<template>
  <div
    class="card border-0 position-relative mt-5 bg-transparent"
    :style="{
      '--badge': product?.categories?.length
        ? `'${ellipsisText(product.categories[0].name)}'`
        : 'Unknown',
    }"
  >
    <div
      class="author ps-3 pt-2 d-flex justify-content-start align-items-center gap-3 bg-light"
    >
      <img :src="Logo" class="img-fluid" width="30px" alt="" />
      <div class="d-flex flex-column gap-0 fw-bold">
        <p class="m-0">Vue {{ product.id }}</p>
        <p class="m-0">JS</p>
      </div>
    </div>
    <div class="item bg-light pt-5 pb-1 px-5" style="height: 280px">
      <img
        :src="product?.image"
        class="w-100 h-100 object-fit-contain"
        alt=""
      />
    </div>
    <div class="detail bg-light py-3">
      <h6 class="text-center">{{ product.title }}</h6>
    <div class="px-5 d-flex gap-4 justify-content-center">
      <button class="btn bg-btn border-0 rounded-circle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px;">
        <ShoppingBag size="25"/>
      </button>
      <button class="btn bg-btn border-0 px-5 rounded-3 py-2">Buy now</button>
    </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "@/assets/logo.svg";
import "@/assets/card.css";
import { ShoppingBag } from "lucide-vue-next";

const ellipsisText = (text, limit = 15) => {
  if (text.length > limit) return text.slice(0, limit) + "...";
  else return text;
};

defineProps({
  product: Object,
  index: Number,
});

const getType = (index) => {
  const types = ["popular", "new", "trend"];
  return types[index % types.length];
};
</script>

<style scoped>
.card::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 50px;
  background-color: transparent !important;
  border-bottom-left-radius: 30px;
  box-shadow: -30px 25px 0 #f8f9fa;
}
.card::after {
  content: var(--badge);
  position: absolute;
  top: 0;
  right: 0;
  width: calc(45% - 6px);
  height: 45px;
  background-color: #f8f9fa;
  border-radius: 30px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #42b883;
}
.author {
  width: 55%;
  height: 50px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
.author p {
  font-size: 12px !important;
}
.item {
  border-top-right-radius: 30px;
}
.detail {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 5px 0 #42b883;
}
</style>
