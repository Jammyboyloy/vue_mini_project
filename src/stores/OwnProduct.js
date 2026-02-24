import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useOwnProductStore = defineStore("own", () => {
  let loading = ref(false);
  let ownProduct = ref([]);
  async function fetchMyOwnProduct() {
    loading.value = true;
    try {
      const res = await api.get("/api/profile/products?page=1&per_page=20");
      console.log(res)
      ownProduct.value = res.data.data;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }
  return { loading, ownProduct, fetchMyOwnProduct };
});
