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
      <button class="btn bg-btn d-flex align-items-center gap-2 px-4 rounded-pill">
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
            <div class="stat-icon bg-money-light">
              <DollarSign class="text-success" :size="24" />
            </div>
          </div>
          <div class="stat-footer mt-2 d-flex align-items-center">
            <span class="badge bg-success-subtle text-success border-0 rounded-pill px-2 py-1">
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
            <div class="stat-icon bg-blue-light">
              <ShoppingBag class="text-primary" :size="24" />
            </div>
          </div>
          <div class="stat-footer mt-2">
            <span class="text-muted small">
              <CheckCircle :size="14" class="text-success me-1" /> 12 pending today
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
            <div class="stat-icon bg-warning-light">
              <AlertTriangle class="text-warning" :size="24" />
            </div>
          </div>
          <div class="stat-footer mt-2">
            <span class="text-muted small">Need to restock soon</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>


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

/* Color Themes */
.bg-money-light {
  background-color: #e6f7ef;
}

.bg-blue-light {
  background-color: #ebf5ff;
}

.bg-warning-light {
  background-color: #fff9eb;
}


.bg-success-subtle {
  background-color: rgba(66, 184, 131, 0.15);
}
</style>