<script setup>
import BaseCard from "@/components/BaseCard.vue";
import CardSkeleton from "@/components/CardSkeleton.vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { onMounted, ref, watch } from "vue";

const product = useProductStore();
const cart = useCartStore();
const sortDir = ref('');

onMounted(() => {
  product.fetchProduct();
});

const handleCart = (id) => {
  cart.addToMyCart(id, cart.countQty);
};

async function loadProduct() {
  await product.fetchProduct({
    sortDir: sortDir.value
  })
}

watch([sortDir], () => {
  loadProduct();
}, { immediate: true })

</script>

<template>
  <!-- hero banner -->
  <section class="min-vh-100 bg-white pt-3">
    <div class="container-lg px-4 h-100">
      <div class="row align-items-center min-vh-100 g-5">
        <!-- Left -->
        <div class="col-lg-6">
          <div class="hero-badge mb-3">Spring 2025 Collection</div>
          <h1 class="mb-3 display-3">Live <em class="text-main">Naturally,</em><br />Style Consciously</h1>
          <p class="text-muted fw-light lh-lg mb-4 " style="max-width:450px">
            Thoughtfully curated fashion for those who believe style and sustainability can coexist beautifully.
          </p>
          <div class="d-flex gap-3 flex-wrap">
            <button class="btn bg-btn rounded-5">Shop Collection →</button>
            <button class="btn btn-outline-success rounded-5">Our Story</button>
          </div>
          <div class="d-flex gap-4 mt-4 pt-2">
            <div>
              <div class="fw-bold fs-4">12K+</div>
              <div class="text-muted" style="font-size:0.72rem">Happy Customers</div>
            </div>
            <div>
              <div class="fw-bold fs-4">500+</div>
              <div class="text-muted" style="font-size:0.72rem">Eco Products</div>
            </div>
            <div>
              <div class="fw-bold fs-4">4.9★</div>
              <div class="text-muted" style="font-size:0.72rem">Avg Rating</div>
            </div>
          </div>
        </div>
        <!-- Right -->
        <div class="col-lg-6 position-relative d-flex justify-content-center">
          <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80" class="hero-blob"
            style="max-width:460px" alt="" />

          <div class="bg-white px-3 rounded-3 py-3 shadow-lg position-absolute d-flex align-items-center gap-2"
            style="bottom:2rem;left:0">
            <span style="font-size:1.4rem">🌿</span>
            <div>
              <div style="font-size:0.6rem;letter-spacing:0.1em">THIS WEEK</div>
              <div class="fw-bold" style="font-size:0.9rem;">180 New Items</div>
            </div>
          </div>

          <div class="bg-success text-center text-white px-3 rounded-3 py-3 shadow-lg position-absolute"
            style="top:2rem;right:0">
            <div class="fs-3 fw-bold lh-1">4.9</div>
            <div style="font-size:0.62rem;opacity:0.6">★★★★★ Rated</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- marquee  -->
  <div class="marquee-wrap">
    <div class="marquee-track">
      <span class="marquee-item">Free Shipping Over $100 <span class="m-sep">✦</span></span>
      <span class="marquee-item">Sustainable Packaging <span class="m-sep">✦</span></span>
      <span class="marquee-item">New Arrivals Every Week <span class="m-sep">✦</span></span>
      <span class="marquee-item">30-Day Easy Returns <span class="m-sep">✦</span></span>
      <span class="marquee-item">Carbon-Neutral Delivery <span class="m-sep">✦</span></span>
      <span class="marquee-item">Free Shipping Over $100 <span class="m-sep">✦</span></span>
      <span class="marquee-item">Sustainable Packaging <span class="m-sep">✦</span></span>
      <span class="marquee-item">New Arrivals Every Week <span class="m-sep">✦</span></span>
      <span class="marquee-item">30-Day Easy Returns <span class="m-sep">✦</span></span>
      <span class="marquee-item">Carbon-Neutral Delivery <span class="m-sep">✦</span></span>
    </div>
  </div>

  <section class="py-6">

    <div class="container-lg px-4">
      <!-- Header -->
      <div class="d-flex align-items-end justify-content-between mb-5">
        <div>
          <span class="fw-bolder fs-4 text-main mb-1">Just Dropped</span>
          <h2 class="display-5 fst-italic fw-bold">New <span class="text-danger">Arrivals</span></h2>
          <p class="text-muted">Fresh picks added this week</p>
        </div>
        <router-link to="/shopping" class="text-main">
          View All <span>→</span>
        </router-link>
      </div>

      <div v-if="product.loading" class="row g-3">
        <div class="col-lg-3 col-md-6 col-sm-6 col-12" v-for="n in 8" :key="'skeleton-' + n">
          <CardSkeleton />
        </div>
      </div>

      <!-- Cards -->
      <div v-else class="row g-3">
        <div class="col-lg-3 col-md-6 col-sm-6 col-12" v-for="pro in product.productList.slice(0, 8)" :key="pro.id">
          <router-link to="/" class="nav-link">
            <BaseCard :product="pro" @add-to-cart="handleCart" />
          </router-link>
        </div>
      </div>


      <!-- CTA -->
      <div class="d-flex justify-content-center mt-8">
        <router-link to="/shopping" class="nav-link text-center p-2 bg-btn btn rounded-5 ">
          Explore All Products <span>→</span>
        </router-link>
      </div>
    </div>
  </section>

  <!-- promotion  -->
  <section class="py-6">
    <div class="container-lg px-4">
      <div class="bg-btn overflow-hidden">
        <div class="row g-0">
          <div class="col-lg-6 p-5 d-flex flex-column justify-content-center">
            <div class="mb-2">🌿 Seasonal Sale</div>
            <h2 class="text-white mb-3">Up to <em class="text-success-emphasis fw-bolder">40% Off</em><br />Sustainable
              Essentials</h2>
            <p class="mb-4" style="color:rgba(255,255,255,0.6);font-size:0.9rem;max-width:300px;line-height:1.7">
              Hand-selected pieces from our most loved collections — made to last, priced to move.
            </p>
            <router-link to="/shopping" class="text-main btn bg-white fw-bold rounded-pill px-4 py-2 w-auto"
              style="width: fit-content !important;">Shop the Sale →</router-link>

          </div>

          <div class="col-lg-6 position-relative" style="min-height:380px">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80" class="promo-img"
              alt="" />
            <div class="shadow-lg position-absolute" style="bottom:1.5rem;right:1.5rem">
              <div style="font-size:0.62rem;;text-transform:uppercase;letter-spacing:0.1em">Sale Ends
                In</div>
              <div style="font-size:2rem;font-weight:700;line-height:1">
                2d 14h</div>
              <div style="font-size:0.68rem;">Limited time only</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- explor by Style -->
  <section class="py-6">
    <div class="container-lg px-4">
      <div class="row">
        <!-- Header -->
        <div class="d-flex align-items-end justify-content-between">
          <div>
            <div class="fw-bolder fs-4 text-main mb-1">Browse</div>
            <h2 class="display-5 fst-italic">Shop by<br />Your Style</h2>
          </div>
          <router-link to="/shopping" class="text-main">Go Shopping →</router-link>
        </div>

        <div v-if="product.loading" class="row g-3">
          <div class="col-lg-3 col-md-6 col-sm-6 col-12" v-for="n in 4" :key="'skeleton-' + n">
            <CardSkeleton />
          </div>
        </div>

        <!-- Cards -->
        <div v-else class="row g-3">
          <div class="col-lg-3 col-md-6 col-sm-6 col-12" v-for="pro in product.productList.slice(0, 4)" :key="pro.id">
            <router-link to="/" class="nav-link">
              <BaseCard :product="pro" @add-to-cart="handleCart" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>
/* hero section */
.hero-badge {
  background: #d8f3dc;
  border: 1px solid #42b883;
  border-radius: 50px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 0.35rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-outline-success:hover {
  background-color: #42b883 !important;
  border: none;
}

.hero-blob {
  border-radius: 40% 60% 60% 40% / 50% 50% 50% 50%;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 4/5;
  animation: morphBlob 10s ease-in-out infinite;

}

/* marquee */
.marquee-wrap {
  background: #42b883;
  overflow: hidden;
  padding: 0.8rem 0;
}

.marquee-track {
  display: flex;
  gap: 2rem;
  animation: marquee 25s linear infinite;
  white-space: nowrap;
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  font-size: 0.77rem;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
}

/* promotion */
.promo-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

@keyframes morphBlob {

  0%,
  100% {
    border-radius: 40% 60% 60% 40% / 50% 50% 50% 50%;
  }

  33% {
    border-radius: 60% 40% 50% 50% / 40% 60% 40% 60%;
  }

  66% {
    border-radius: 50% 50% 40% 60% / 60% 40% 60% 40%;
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>
