<script setup lang="ts">
import { ShoppingBag } from 'lucide-vue-next';


</script>

<template>
    <div class="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
        <div class="w-100" style="max-width: 720px;">
            <div class="bg-white rounded-4 overflow-hidden shadow">

                <!-- Header -->
                <div class="bg-btn d-flex justify-content-between align-items-center px-4 py-4">
                    <div>
                        <div class="fs-4 fw-bold text-white">
                            <img src="../../assets/img/logo vue.png" width="180px" class="mt-n8 ms-n5" alt="">
                        </div>
                        <!-- <div class="text-white opacity-75 mt-n3">Thank you for your purchase!</div> -->
                    </div>
                    <div class="text-end">
                        <div class="text-white fw-bold text-uppercase ls-wide">Receipt</div>
                        <div class="text-white opacity-75 small mt-1">Order ID: #12345</div>
                        <div class="text-white opacity-75 small">Nov 23, 2023 · 10:00</div>
                        <div class="mt-2">
                            <span class="badge rounded-pill d-inline-flex align-items-center gap-1 px-3 py-2"
                                style="background: rgba(255,255,255,0.2); color: white; font-size: 0.75rem;">
                                <span class="rounded-circle bg-white d-inline-block"
                                    style="width:7px;height:7px;"></span>
                                Paid
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Body -->
                <div class="px-4 py-4">

                    <!-- Billed / Shipped -->
                    <div class="row mb-3">
                        <div class="col-6">
                            <div class="text-uppercase fw-bold small mb-2"
                                style="font-size: 0.65rem; letter-spacing: 0.1em;">
                                Billed To
                            </div>
                            <div class="fw-bold text-dark">John Doe</div>
                            <div class="text-muted small lh-lg">
                                john@example.com<br>
                                +123 456 789
                            </div>
                        </div>
                        <div class="col-6 text-end">
                            <div class="text-uppercase fw-bold small mb-2"
                                style=" font-size: 0.65rem; letter-spacing: 0.1em;">
                                Shipped To
                            </div>
                            <div class="fw-bold text-dark">123 Street Name</div>
                            <div class="text-muted small lh-lg">
                                City, 12345<br>
                                Country<br>
                                <em><i class="fa-solid fa-note-sticky me-1"></i>Leave at
                                    door</em>
                            </div>
                        </div>
                    </div>

                    <hr class="dashed-hr my-4">

                    <!-- Items Table -->
                    <table class="table table-borderless mb-4">
                        <thead class="rounded">
                            <tr>
                                <th class="rounded-start ps-3">Item</th>
                                <th class="text-center">Qty</th>
                                <th class="text-end">Unit Price</th>
                                <th class="text-end rounded-end pe-3">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="ps-3">
                                    <div class="fw-semibold">Classic White Tee</div>
                                    <div class="text-muted" style="font-size: 0.75rem;">
                                        
                                    </div>
                                </td>
                                <td class="text-center align-middle">2</td>
                                <td class="text-end align-middle">$10.00</td>
                                <td class="text-end align-middle fw-semibold pe-3">$20.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Totals -->
                    <div class="row justify-content-end">
                        <div class="col-md-6">
                            <div class="rounded-3 p-3"
                                style="background:  #f6fffb;; border: 1.5px solid rgba(66,184,131,0.2);">
                                <div class="d-flex justify-content-between text-muted small mb-2">
                                    <span>Subtotal</span>
                                    <span>$100.00</span>
                                </div>
                                <div class="d-flex justify-content-between text-muted small mb-2">
                                    <span>Shipping</span>
                                    <span>$5.00</span>
                                </div>
                                <!-- <div class="d-flex justify-content-between text-muted small mb-2">
                                    <span>Tax (10%)</span>
                                    <span>$10.00</span>
                                </div> -->
                                <hr style="border-color: rgba(66,184,131,0.2);">
                                <div class="d-flex justify-content-between fw-bold">
                                    <span class="text-dark">Total Paid</span>
                                    <span class="text-main">$115.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="d-flex justify-content-center gap-3 mt-4 no-print">
                        <button onclick="window.print()" class="btn bg-btn rounded-pill px-4 py-2 fw-semibold">
                            <download class="fa-solid fa-print me-2"/>Download Receipt
                        </button>
                        <router-link to="/shopping" class="btn btn-outline-success rounded-pill px-4 py-2 fw-semibold">
                            <ShoppingBag class="fa-solid fa-arrow-left me-2"/>Continue Shopping
                        </router-link>
                    </div>

                </div>

                <!-- Footer -->
                <div class="text-center text-muted small py-3 px-4 bg-btn"
                    style=" border-top: 1.5px solid rgba(66,184,131,0.15);">
                    Questions about this receipt?
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.dashed-hr {
    border-top: 2px dashed #39de4c;
}

.table thead th {
    background-color: #ecfdf5;
    color: #2d8a63;
    border: none;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.btn-outline-success:hover {
  background-color: #42b883 !important;
  border: none;
}

.table tbody tr td {
    vertical-align: middle;
    font-size: 0.88rem;
}

.table tbody tr:hover td {
    background-color: #f6fffb;
}

@media print {
    body * { visibility: hidden; }
    .receipt-print, .receipt-print * { visibility: visible; }
    .receipt-print { position: absolute; top: 0; left: 0; width: 100%; }
    .no-print { display: none !important; }
}
</style>