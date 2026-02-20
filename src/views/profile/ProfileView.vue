<template>
  <div>
    <Navbar />
    <div class="container py-5 px-10 rounded-5" style="background-color: rgb(235, 235, 235);">
            <h5 class="ms-7">My Profile</h5>
            <div class="d-flex align-content-center bg-light rounded-5 px-5">
                <div class="col-lg-6">
                    <div class="d-flex pb-3">
                        <div class="profile-img-wrapper me-3 mt-3">
                            <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                                class="profile-img" />

                            <!-- icon -->
                            <div class="camera-overlay-half">
                                <i class="fa-solid fa-camera"></i>
                            </div>
                        </div>

                        <div class="mt-4">
                            <h4>Ngorn</h4>
                            <div class="lh-1 mt-3">
                                <p><span class="text-muted">Email:</span> khim***@gmail.com</p>
                                <p><span class="text-muted">Created At:</span> kd</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="d-flex justify-content-end mt-8">
                        <a href="asset/page/profile.html" class="btn btn-primary rounded-5 me-3">Edit Profile</a>
                        <a href="#" class="btn btn-dark rounded-5">Sign out</a>
                    </div>
                </div>
            </div>
            <div class="bg-light rounded-5 px-5 mt-5">
                <div class="row">
                    <div class="col-lg-6">
                        <h5 class="mt-4 mb-5">Personal Information</h5>
                        <ul class="timeline">
                            <li>
                                <span class="text-gray">Full Name</span>
                                <p class=" fs-5 fw-bold">Ngorn</p>
                            </li>
                            <li>
                                <span class="text-gray">Email</span>
                                <p class="fw-bold fs-5">ngorn@gmail.com</p>
                            </li>
                            <li>
                                <span class="text-gray">Address</span>
                                <p class="fw-bold fs-5">Phnom Penh</p>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <ul class="mt-11 timeline">
                            <li>
                                <span class="text-gray">Email</span>
                                <p class="fw-bold fs-5">ngorn@gmail.com</p>
                            </li>
                            <li>
                                <span class="text-gray">ID</span>
                                <p class="fw-bold fs-5">Phnom Penh</p>
                            </li>
                            <li>
                                <span class="text-gray">Phone Number</span>
                                <p class="fw-bold fs-5">34567890</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <!-- sell item -->
            <div class="my-5">
                <h3>Your Item</h3>
                <div class="card rounded-5" style="width: 18rem;">
                    <img src="https://www.drakensberg.de/cdn/shop/files/DRAKENSBERG-Leder-Baumwoll-Reisetasche-Sam-Gruen-Safari-Style-Hauptansicht.jpg?v=1762468738&width=2500"
                        class="card-img-top rounded-top-5" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Trip Bag</h5>
                        <p class="card-text">
                        <p>price: 500$</p>
                        <p>varenty: 1 year</p>
                        </p>
                        <a href="#" class="btn btn-primary">View In details</a>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';


</script>

<style lang="scss" scoped>
ul.timeline {
  list-style-type: none;
  position: relative;
}

ul.timeline:before {
  content: " ";
  background: #d4d9df;
  display: inline-block;
  position: absolute;
  left: 29px;
  width: 2px;
  height: 100%;
  z-index: 400;
}

ul.timeline>li {
  margin: 20px 0;
  padding-left: 30px;
}

ul.timeline>li:before {
  content: " ";
  background: white;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 3px solid var(--bs-dark);
  left: 20px;
  width: 20px;
  height: 20px;
  z-index: 400;
}

.text-gray {
  color: rgb(112, 112, 112) !important;
  font-size: 14px;
}

/* profile */

.profile-img-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* bottom half overlay circle */
.camera-overlay-half {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  opacity: 0;
  transform: translateY(100%);
  transition: 0.3s ease;
}

/* hover */
.profile-img-wrapper:hover .camera-overlay-half {
  opacity: 1;
  transform: translateY(0);
}
</style>