<template>
  <div class="container my-5">
    <router-link to="/" class="text-decoration-none mb-3 d-inline-block">Go Back</router-link>

    <div class="row">
      <!-- Product Images -->
      <div class="col-md-6">
        <img src="https://ecommerce201.csm.linkpc.net/storage/products/no_photo.jpg" 
             class="img-fluid mb-3 main-img h-75" 
             alt="T-shirt Image" />
      </div>

      <!-- Product Info -->
      <div class="col-md-6">
        <p class="text-uppercase text-muted small">New Product</p>
        <h1 class="fw-bold">T-shirt</h1>
        <p class="text-muted">This is description</p>
        <h3 class="text-dark fw-bold my-3">$20.50</h3>

        <!-- Quantity Selector -->
        <div class="quantity-control mb-3">
          <button type="button" id="decrease" class="rounded">-</button>
          <input type="number" id="quantity" value="1" min="1">
          <button type="button" id="increase" class="rounded">+</button>
        </div>

        <button class="btn btn-warning btn-lg mb-4">Add to Cart</button>

        <div class="row">
          <div class="col-md-6">
            <h5 class="fw-bold">Features</h5>
            <p>High-quality materials, comfortable fit, stylish design.</p>
          </div>
          <div class="col-md-6">
            <h5 class="fw-bold">In the Box</h5>
            <ul>
              <li>T-shirt</li>
            </ul>
          </div>
        </div>

        <p class="mt-3"><strong>Condition:</strong> Super Old</p>
        <p><strong>Story:</strong> No story</p>
        <p><strong>Creator:</strong> Jammy1</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Product main image */
.main-img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.main-img:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
}

/* Buttons */
.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-warning:hover {
  background-color: #e0a800;
  border-color: #d39e00;
  transform: translateY(-1px);
}

/* Typography */
h1, h3, h4, h5 {
  color: #222;
}

p {
  line-height: 1.6;
}

/* Quantity Selector */
.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-control input {
  width: 60px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.25rem 0;
}
/* responsive */
.mb-1 { margin-bottom: 0.25rem !important; }
.mb-2 { margin-bottom: 0.5rem !important; }
.mb-3 { margin-bottom: 1rem !important; }
.mb-4 { margin-bottom: 1.5rem !important; }
.my-5 { margin-top: 3rem !important; margin-bottom: 3rem !important; }
</style>
