<template>
  <div>
    <template v-if="loading">
      <DetailSkeleton />
    </template>
    <template v-else>
      <div class="container mt-6">
        <div class="row align-items-center g-4" style="height: 600px">
          <div class="col-lg-5">
            <div class="card-img px-5" style="height: 500px">
              <img
                :src="productDetail.image"
                alt=""
                class="w-100 h-100 rounded-4 object-fit-cover"
              />
            </div>
          </div>
          <div class="col-lg-7">
            <div class="d-flex flex-column gap-4 px-5">
              <div class="d-flex flex-column gap-4">
                <h3 class="m-0 fw-bold mb-2">{{ productDetail.title }}</h3>
                <h4 class="text-main fw-semibold m-0">
                  US ${{ productDetail.price }}
                </h4>
                <div class="d-flex gap-3">
                  <h6
                    class="rounded-4 text-main w-fit bg-cate px-5 align-content-center fs-6 m-0 py-1"
                  >
                    {{ productDetail?.categories?.[0]?.name }}
                  </h6>
                  <h6
                    class="rounded-4 text-main w-fit bg-cate px-5 align-content-center fs-6 m-0 py-1"
                  >
                    {{ productDetail.condition }}
                  </h6>
                </div>

                <h4 class="m-0 fw-medium">{{ productDetail.description }}</h4>
              </div>

              <div>
                <h5 class="fw-bold mb-3">Quantity</h5>
                <div class="d-flex gap-2">
                  <span class="px-4 bg-second py-2 rounded-3 cursor-pointer"><Minus /></span>
                  <span class="px-5 bg-second py-2 rounded-3 fs-5">1</span>
                  <span class="px-4 bg-second py-2 rounded-3 cursor-pointer"><Plus /></span>
                </div>
              </div>

              <div class="d-flex gap-3">
                <button class="btn bg-btn w-50 btn-lg rounded-5 fw-medium">
                  Add to Cart
                </button>
                <button class="btn bg-btn w-50 btn-lg rounded-5 fw-medium">
                  Buy now
                </button>
              </div>

              <div class="card bg-second rounded-5">
                <div class="card-body">
                  <div class="d-flex align-items-center gap-2">
                    <img
                      :src="productDetail.creator.avatar"
                      alt=""
                      class="rounded-circle object-fit-cover"
                      style="width: 40px; height: 40px"
                    />
                    <div class="d-flex gap-1 flex-column">
                      <div class="d-flex gap-2">
                        <p class="m-0 p-0 fs-6">
                          {{ productDetail.creator.name }}
                        </p>
                        <h6
                          class="rounded-4 text-main w-fit bg-cate py-0 px-3 align-content-center fs-6 m-0"
                        >
                          Owner
                        </h6>
                      </div>
                      <p class="m-0 p-0 fs-6">
                        {{ productDetail.creator.email }} | Member Since
                        {{ formatDate(productDetail.created_at) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import api from "@/api/https";
import DetailSkeleton from "@/components/DetailSkeleton.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
let loading = ref(false);
const productDetail = ref({
  categories: [],
  creator: {},
});

const fetchProductById = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/api/products/${id}`);
    productDetail.value = res.data.data;
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProductById();
});

function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
</script>

<style scoped></style>
