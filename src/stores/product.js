import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useProductStore = defineStore("product", () => {
  let productList = ref([]);
  let loading = ref(false);
  async function fetchProduct() {
    loading.value = true;
    try {
      const res = await api.get("/api/products?page=1&per_page=8&search=");
      console.log(res);
      productList.value = res.data.data;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  return { productList, fetchProduct, loading };
});
