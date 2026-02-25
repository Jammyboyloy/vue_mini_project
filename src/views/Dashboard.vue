<template>
  <div class="container-fluid py-4 bg-white rounded-5 px-4">
    <div class="d-flex align-items-center justify-content-between mb-5">
      <div class="d-flex align-items-center gap-3">
        <div class="icon-box-title">
          <Store class="text-main" :size="28" />
        </div>
        <div>
          <h3 class="fw-bold mb-0">Sales Overview</h3>
          <p class="text-muted mb-0 small">Monitoring your store performance</p>
        </div>
      </div>
      <button
        @click="goCreateProduct"
        class="btn bg-btn d-flex align-items-center gap-2 px-4 rounded-pill"
      >
        <Plus :size="18" /> New Product
      </button>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="stats-card p-4 border-0 rounded-4 shadow-sm bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="stat-info">
              <p class="text-secondary fw-medium mb-1">Total Revenue</p>
              <h2 class="fw-bold mb-0 text-dark">$12,850.00</h2>
            </div>
            <div class="stat-icon bg-cate-success text-success">
              <DollarSign class="text-success" :size="24" />
            </div>
          </div>
          <div class="stat-footer mt-2 d-flex align-items-center">
            <span
              class="badge bg-cate-success text-success border-0 rounded-pill px-2 py-1"
            >
              <TrendingUp :size="12" class="me-1" /> +14.5%
            </span>
            <span class="text-muted small ms-2">vs last month</span>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="stats-card p-4 border-0 rounded-4 shadow-sm bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="stat-info">
              <p class="text-secondary fw-medium mb-1">Orders Processed</p>
              <h2 class="fw-bold mb-0">458</h2>
            </div>
            <div class="stat-icon bg-cate-primary">
              <ShoppingBag class="text-primary" :size="24" />
            </div>
          </div>
          <div class="stat-footer mt-2">
            <span class="text-muted small">
              <CheckCircle :size="14" class="text-success me-1" /> 12 pending
              today
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="stats-card p-4 border-0 rounded-4 shadow-sm bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="stat-info">
              <p class="text-secondary fw-medium mb-1">Low Stock Items</p>
              <h2 class="fw-bold mb-0 text-danger">08</h2>
            </div>
            <div class="stat-icon bg-cate-warning">
              <AlertTriangle class="text-warning" :size="24" />
            </div>
          </div>
          <div class="stat-footer mt-2">
            <span class="text-muted small">Need to restock soon</span>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex align-items-center gap-3 mt-5">
      <div class="icon-box-title">
        <Store class="text-main" :size="28" />
      </div>
      <div>
        <h3 class="fw-bold mb-1">Product Management</h3>
        <p class="text-muted mb-0 small">
          Update and organize your store inventory
        </p>
      </div>
    </div>

    <div class="table-responsive mt-5">
      <div v-if="own.loading" class="text-center py-5">
        <div class="loader">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <p class="mt-3 text-muted small">Loading your products...</p>
      </div>

      <BaseTable
        v-else
        :column="columns"
        :rows="own.ownProduct"
        @delete="handleDelete"
        @edit="handleEdit"
      >
        <template #col-image="{ value }">
          <img :src="value" class="rounded-3" width="70" height="70" />
        </template>

        <template #col-title="{ value }">
          <p class="m-0 fw-medium">{{ value }}</p>
        </template>

        <template #col-categories="{ value }">
          <p class="badge rounded-pill px-4 py-2 fw-medium bg-cate-success">
            {{ value[0]?.name ?? "N/A" }}
          </p>
        </template>

        <template #col-price="{ value }">
          <p class="text-main m-0 fw-bold">US ${{ value }}</p>
        </template>
      </BaseTable>

      <!-- <BasePagination
        :totalPages="cate.pagination.totalPages"
        :currentPage="cate.pagination.currentPage"
        :hasNextPage="cate.pagination.hasNextPage"
        :hasPreviousPage="cate.pagination.hasPreviousPage"
        :totalItems="cate.pagination.totalItems"
        :itemPerPage="per_page"
        @changePage="changePage"
      /> -->

      <!-- Create Modal / Edit Modal -->
      <BaseModal
        v-if="showModal"
        @close-modal="closeModal()"
        position="justify-content-center"
      >
        <template #header>
          <h1 class="modal-title fs-4 mx-auto fw-bold">
            Delete Item #{{ items.id }}
          </h1>
        </template>
        <template #body>
          <img
            :src="items.image"
            alt=""
            width="150"
            height="110"
            class="rounded-4 object-fit-cover mx-auto d-block mb-5"
          />
          <p class="text-center m-0" style="font-size: 18px">
            Are you sure you want to delete {{ items.title }} ?
          </p>
        </template>
        <template #footer>
          <button
            class="btn btn-danger px-6 rounded-pill py-2"
            @click="handleAction"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
            ></span>
            Delete
          </button>
        </template>
      </BaseModal>
    </div>
  </div>
</template>

<script setup>
import BaseModal from "@/components/BaseModal.vue";
import { useOwnProductStore } from "@/stores/OwnProduct";
import BaseTable from "@/components/BaseTable.vue";
import { onMounted, ref } from "vue";
import api from "@/api/https";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
let toast = useToast();

const own = useOwnProductStore();
let columns = [
  { label: "Image", key: "image" },
  { label: "Title", key: "title" },
  { label: "Price", key: "price" },
  { label: "Category", key: "categories" },
];
let showModal = ref(false);
let loading = ref(false);
let items = ref([]);
const router = useRouter();

async function handleAction() {
  loading.value = true;
  try {
    await api.delete(`/api/products/${items.value.id}`);
    toast.success("Delete Successfully!");
  } catch (err) {
    console.log(err);
  } finally {
    showModal.value = false;
    loading.value = false;
    own.fetchMyOwnProduct();
  }
}

const closeModal = () => {
  if (loading.value) return;
  showModal.value = false;
};

const handleDelete = (row) => {
  showModal.value = true;
  items.value = row;
};

const handleEdit = (row) => {
  router.push(`/dashboard/editProduct/${row.id}`);
};

const goCreateProduct = () => {
  router.push("/dashboard/createProduct");
};

onMounted(() => {
  own.fetchMyOwnProduct();
});
</script>

<style scoped>
.bar {
  background-color: #6c757d;
}
.icon-box-title {
  background: #f0fff4;
  padding: 12px;
  border-radius: 14px;
}

.stats-card {
  transition: all 0.2s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.stat-icon {
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
