<template>
  <div class="container-fluid py-4 bg-white rounded-5 px-4 shadow-sm">
    <div class="d-flex align-items-center justify-content-between mb-5">
      <div class="d-flex align-items-center gap-3">
        <div class="p-3 bg-light rounded-4">
          <Store class="text-primary" :size="28" />
        </div>
        <div>
          <h3 class="fw-bold mb-0">Processed Orders</h3>
          <p class="text-muted mb-0 small">
            History Count: {{ order.processedOrders.length }}
          </p>
        </div>
      </div>
      <router-link
        to="/action-page"
        class="btn btn-outline-secondary px-4 rounded-pill fw-bold"
      >
        Back to Actions
      </router-link>
    </div>

    <div class="table-responsive">
      <div v-if="order.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted small">Loading history...</p>
      </div>

      <table v-else class="table table-hover align-middle">
        <thead class="bg-light">
          <tr>
            <th class="border-0 ps-4">Product Info</th>
            <th class="border-0">Buyer</th>
            <th class="border-0">Amount</th>
            <th class="border-0 text-center">Status</th>
            <th class="border-0 text-end pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in order.processedOrders"
            :key="item.id"
            class="border-bottom"
          >
            <td class="ps-4 py-3">
              <div class="d-flex align-items-center gap-3">
                <img
                  :src="item.product?.image"
                  class="rounded-3 shadow-sm"
                  width="50"
                  height="50"
                  style="object-fit: cover"
                />
                <div>
                  <div class="fw-bold text-dark">{{ item.product?.title }}</div>
                  <small class="text-muted">ID: #{{ item.id }}</small>
                </div>
              </div>
            </td>
            <td>
              <div class="small fw-semibold">{{ item.buyer?.name }}</div>
            </td>
            <td>
              <div class="fw-bold text-dark">US ${{ item.price }}</div>
              <div class="text-muted extra-small">Qty: {{ item.qty }}</div>
            </td>
            <td class="text-center">
              <span :class="statusBadgeClass(item.status)">
                {{ item.status === 2 ? "Approved" : "Rejected" }}
              </span>
            </td>
            <td class="pe-4 text-end">
              <button
                @click="openDetail(item)"
                class="btn btn-sm btn-light border rounded-pill px-3"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal
      v-if="showModal"
      @closeModal="showModal = false"
      closeText="Close"
      position="justify-content-end"
    >
      <template #header>
        <h5 class="fw-bold mb-0">Order Detail #{{ selectedOrder.id }}</h5>
      </template>

      <template #body>
        <div class="row g-3">
          <div class="col-12 border-bottom pb-3">
            <div class="d-flex gap-3 align-items-start">
              <img
                :src="selectedOrder.product?.image"
                class="rounded-3"
                width="80"
                height="80"
                style="object-fit: cover"
              />
              <div>
                <h6 class="fw-bold mb-1">{{ selectedOrder.product?.title }}</h6>
                <p class="text-muted small mb-0">
                  {{ selectedOrder.product?.detail }}
                </p>
                <span class="badge bg-light text-dark border small mt-2"
                  >Condition: {{ selectedOrder.product?.condition }}</span
                >
              </div>
            </div>
          </div>

          <div class="col-6">
            <label class="text-muted small d-block">Price x Qty</label>
            <span class="fw-semibold"
              >US ${{ selectedOrder.price }} x {{ selectedOrder.qty }}</span
            >
          </div>
          <div class="col-6 text-end">
            <label class="text-muted small d-block">Total Amount</label>
            <span class="fw-bold text-main fs-5"
              >US ${{ selectedOrder.price * selectedOrder.qty }}</span
            >
          </div>

          <div class="col-12 bg-light p-3 rounded-4">
            <div class="row">
              <div class="col-6">
                <label class="text-muted extra-small d-block"
                  >Delivery Status</label
                >
                <span class="small fw-bold">
                  {{
                    selectedOrder.is_delivery === 2
                      ? "🚚 Delivery Required"
                      : "🏠 Self Pickup"
                  }}
                </span>
              </div>
              <div class="col-6 text-end" v-if="selectedOrder.google_map_url">
                <a
                  :href="selectedOrder.google_map_url"
                  target="_blank"
                  class="btn btn-sm bg-btn text-white rounded-pill px-3"
                >
                  View Map
                </a>
              </div>
              <div class="col-12 mt-2" v-if="selectedOrder.address">
                <label class="text-muted extra-small d-block">Address</label>
                <p class="small mb-0">{{ selectedOrder.address }}</p>
              </div>
            </div>
          </div>

          <div class="col-6">
            <label class="text-muted small d-block">Buyer Email</label>
            <span class="small">{{ selectedOrder.buyer?.email }}</span>
          </div>
          <div class="col-6">
            <label class="text-muted small d-block">Buyer Name</label>
            <span class="small">{{ selectedOrder.buyer?.name }}</span>
          </div>

          <div class="col-12 mt-3">
            <label
              class="text-muted small d-block mb-2 fw-bold text-uppercase"
              style="font-size: 0.65rem; letter-spacing: 0.5px"
            >
              Payment Receipt
            </label>

            <div v-if="selectedOrder.transaction_file">
              <div
                class="d-flex flex-column align-items-center gap-1 py-2 border shadow-sm rounded-4 bg-light"
              >
                <div class="extra-small fw-bold text-dark">
                  Receipt Image
                </div>
                <a :href="selectedOrder.transaction_file" target="_blank">
                  <img
                    :src="selectedOrder.transaction_file"
                    class="rounded-3 border shadow-sm"
                    style="
                      width: 60px;
                      height: 60px;
                      object-fit: cover;
                      transition: transform 0.2s;
                    "
                  />
                </a>
              </div>
            </div>

            <div
              v-else
              class="p-3 border border-dashed rounded-4 text-center bg-light"
            >
              <span class="text-muted extra-small italic"
                >No receipt provided for this order</span
              >
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useOrderStore } from "@/stores/order";
import { Store } from "lucide-vue-next";
import BaseModal from "@/components/BaseModal.vue"; // Adjust path to your modal component

const order = useOrderStore();
const showModal = ref(false);
const selectedOrder = ref({});

onMounted(() => {
  order.fetchOrder();
});

const openDetail = (item) => {
  selectedOrder.value = item;
  showModal.value = true;
};

const statusBadgeClass = (status) => {
  const base = "badge rounded-pill px-3 py-2 fw-medium ";
  if (status === 2) return base + "bg-cate-success";
  if (status === 3) return base + "bg-cate-danger";
  return base + "bg-secondary";
};
</script>

<style scoped>
.bg-cate-success {
  background-color: #f0fff4 !important;
  color: #42b883 !important;
}
.bg-cate-danger {
  background-color: #ff4d4d33 !important;
  color: #ff4d4d !important;
}
.extra-small {
  font-size: 0.7rem;
}
.table thead th {
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  color: #6c757d;
  padding: 15px 10px;
  text-transform: uppercase;
}
</style>
