import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCategoryStore = defineStore("category", () => {
  let loading = ref(false);
  let category = ref([]);

  async function fetchCategory() {
    loading.value = true;
    try {
      const res = await api.get("/api/categories");
      category.value = res.data.data;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  return { loading, category, fetchCategory };
});
