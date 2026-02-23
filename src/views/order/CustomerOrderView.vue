<template>
  <div class="container-fluid py-4 bg-white rounded-5 px-4 shadow-sm">
    <div class="d-flex align-items-center justify-content-between mb-5">
      <div class="d-flex align-items-center gap-3">
        <div class="p-3 bg-light rounded-4">
          <Store class="text-primary" :size="28" />
        </div>
        <div>
          <h3 class="fw-bold mb-0">Order Actions</h3>
          <p class="text-muted mb-0 small">
            Pending Approval: {{ order.pendingOrders.length }}
          </p>
        </div>
      </div>
      <router-link
        to="/preview-order"
        class="btn btn-primary px-4 rounded-pill fw-bold d-flex align-items-center gap-2"
      >
        View Processed Orders
      </router-link>
    </div>

    <div class="table-responsive">
      <div v-if="order.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted small">Fetching pending data...</p>
      </div>

      <table v-else class="table table-hover align-middle">
        <thead class="bg-light">
          <tr>
            <th class="border-0 ps-4">Product Info</th>
            <th class="border-0">Buyer</th>
            <th class="border-0 text-center">Amount Info</th> <th class="border-0 text-center">Payment Proof</th>
            <th class="border-0 text-center">Status</th>
            <th class="border-0 text-end pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in order.pendingOrders"
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
              <div class="d-flex align-items-center gap-2">
                <img
                  :src="item.buyer?.avatar"
                  class="rounded-circle"
                  width="30"
                  height="30"
                />
                <div class="small fw-semibold">{{ item.buyer?.name }}</div>
              </div>
            </td>

            <td class="text-center">
              <div class="fw-bold text-main">Total: US ${{ (item.price * item.qty).toLocaleString() }}</div>
              <div class="text-muted extra-small">US ${{ item.price }} | Qty {{ item.qty }}</div>
            </td>

            <td class="text-center">
              <div v-if="item.transaction_file">
                <a
                  :href="item.transaction_file"
                  target="_blank"
                  class="btn btn-sm btn-light border rounded-pill px-3"
                >
                  <FileText :size="14" class="me-1" /> View Receipt
                </a>
              </div>
              <div v-else class="text-danger small fw-bold">
                <AlertCircle :size="15" /> No File
              </div>
            </td>

            <td class="text-center">
              <span class="badge rounded-pill px-3 py-2 fw-medium bg-cate-warning">Pending</span>
            </td>

            <td class="pe-4 text-end">
              <div class="d-flex justify-content-end gap-3">
                <button
                  @click="updateStatus(item.id, 'approve')"
                  class="btn btn-sm bg-btn border-0 text-white rounded-pill px-3 fw-medium"
                  :disabled="!item.transaction_file"
                >
                  Approve
                </button>
                <button
                  @click="updateStatus(item.id, 'reject')"
                  class="btn btn-sm btn-danger rounded-pill px-3 fw-medium"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="order.pendingOrders.length === 0 && !order.loading">
            <td colspan="6" class="text-center py-5 text-muted">
              All caught up! No pending orders.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useOrderStore } from "@/stores/order";
const order = useOrderStore();

onMounted(() => {
  order.fetchOrder();
});

const updateStatus = async (id, action) => {
  if (confirm(`Are you sure you want to ${action} this order?`)) {
    const result = await order.changeStatus(id, action);
    if (result.success) {
      alert(`Order ${action}ed successfully!`);
    }
  }
};
</script>

<style scoped>
.bg-cate-warning {
  background-color: #fff9eb !important;
  color: #ffcc00 !important;
}
.bg-btn {
  background-color: #42b883 !important;
}
.extra-small {
  font-size: 0.75rem;
}
.text-main {
  color: #2c3e50;
}
.table thead th {
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  color: #6c757d;
  padding: 15px 10px;
  text-transform: uppercase;
}
</style>