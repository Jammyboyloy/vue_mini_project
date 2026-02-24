import api from "@/api/https";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useOrderStore = defineStore("order", () => {
  const loading = ref(false);
  const orderProduct = ref([]); // Master Data (Array 1)

  // Array 2: Pending only (Status 1)
  const pendingOrders = computed(() =>
    orderProduct.value.filter((item) => item.status === 1),
  );

  // Array 3: Processed only (Status 2 or 3)
  const processedOrders = computed(() =>
    orderProduct.value.filter((item) => item.status === 2 || item.status === 3),
  );

  async function fetchOrder() {
    loading.value = true;
    try {
      const res = await api.get("/api/profile/payment-check");
      orderProduct.value = res.data.data;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function changeStatus(id, action) {
    try {
      await api.put(`/api/payments/${action}/${id}`);
      await fetchOrder();
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }

  return {
    loading,
    orderProduct,
    pendingOrders,
    processedOrders,
    fetchOrder,
    changeStatus,
  };
});
