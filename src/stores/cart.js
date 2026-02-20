import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useCartStore = defineStore("cart", () => {
  let loadingCart = ref(false);
  let loadingAdd = ref(false);
  let myCart = ref([]);
  let countQty = ref(1);
  let countProduct = ref(0);
  async function fetchMyCart() {
    loadingCart.value = true;
    try {
      const res = await api.get("/api/profile/carts");
      console.log(res);
      countProduct.value = res.data.data.items.length;
    } catch (err) {
      console.log(err);
    } finally {
      loadingCart.value = false;
    }
  }

  async function addToMyCart(product_id, qty) {
    loadingAdd.value = true;
    try {
      const res = await api.post("/api/carts", {
        product_id: product_id,
        qty: qty,
      });
      await fetchMyCart();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      loadingAdd.value = false;
    }
  }

  return { loadingCart, loadingAdd, myCart, countQty, countProduct, fetchMyCart, addToMyCart };
});
