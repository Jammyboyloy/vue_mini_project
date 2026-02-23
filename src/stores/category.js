import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCategoryStore = defineStore("category", () => {
  let loading = ref(false);
  let category = ref([]);
  // const pagination = reactive({
  //   currentPage: 1,
  //   itemPerPage: 5,
  //   totalItems: 0,
  //   totalPages: 0,
  //   hasPreviousPage: false,
  //   hasNextPage: false,
  // });

  async function fetchCategory() {
    loading.value = true;
    try {
      const res = await api.get("/api/categories");
      category.value = res.data.data;
      // const meta = res.data.data.meta;
      // pagination.totalItems = meta.totalItems;
      // pagination.currentPage = meta.currentPage;
      // pagination.totalPages = meta.totalPages;
      // pagination.hasNextPage = meta.hasNextPage;
      // pagination.hasPreviousPage = meta.hasPreviousPage;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  return { loading, category, fetchCategory };
});
