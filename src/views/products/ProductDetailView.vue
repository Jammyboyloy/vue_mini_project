<template>
  <div>
    <div class="container mt-6">
      <div class="row align-items-center" style="height: 600px">
        <div class="col-lg-5">
          <div class="card-img" style="height: 450px">
            <img
              src="https://i.pinimg.com/1200x/a0/53/7e/a0537eadf1e51cc9ddab02a4934a700f.jpg"
              alt=""
              class="w-100 h-100 rounded-4 object-fit-cover"
            />
          </div>
        </div>
        <div class="col-lg-7">
          <div class="d-flex flex-column gap-4 px-5">
            <div class="d-flex flex-column gap-3">
              <h3 class="m-0 fw-bold mb-2">Title</h3>
              <div class="d-flex gap-5">
                <h4 class="text-main fw-semibold m-0">US $10.00</h4>
                <h6
                  class="rounded-4 text-main w-fit bg-cate px-5 align-content-center fs-6 m-0"
                >
                  Category
                </h6>
              </div>

              <h4 class="m-0 fw-medium">Description</h4>
            </div>

            <div>
              <h5 class="fw-bold mb-3">Quantity</h5>
              <div class="d-flex gap-2">
                <span class="px-4 bg-second py-2 rounded-3"><Minus /></span>
                <span class="px-5 bg-second py-2 rounded-3">1</span>
                <span class="px-4 bg-second py-2 rounded-3"><Plus /></span>
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
                    src="https://i.pinimg.com/736x/16/9d/96/169d96740d6857d11633bc0502098b69.jpg"
                    alt=""
                    class="rounded-circle object-fit-cover"
                    style="width: 40px; height: 40px"
                  />
                  <div class="d-flex gap-1 flex-column">
                    <div class="d-flex gap-2">
                      <p class="m-0 p-0 fs-6">Lay Jammy</p>
                      <h6
                        class="rounded-4 text-main w-fit bg-cate py-0 px-3 align-content-center fs-6 m-0"
                      >
                        Owner
                      </h6>
                    </div>
                    <p class="m-0 p-0 fs-6">
                      jammy@gmail.com | member since 2019
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
