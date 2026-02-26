<template>
  <div>
    <div
      class="d-flex justify-content-center align-items-center min-vh-100 py-4 shadow-sm bg-light"
    >
      <div
        class="container bg-white shadow-sm py-4 px-6 rounded-4 shadow-sm"
        style="width: 500px"
      >
        <h3 class="text-center text-main fw-medium mb-3">Sign Up</h3>
        <form @submit.prevent="handleRegister">
          <label class="form-label">Name : </label>
          <BaseInput
            input-placeholder="Enter your name"
            input-icon="User"
            v-model="name"
            autocomplete="username"
          />
          <p v-if="err.name" class="text-danger m-0">{{ err.name }}</p>

          <label class="form-label my-2">Email : </label>
          <BaseInput
            input-placeholder="Enter your email"
            input-icon="Mail"
            v-model="email"
            autocomplete="username"
          />
          <p v-if="err.email" class="text-danger m-0">{{ err.email }}</p>

          <label class="form-label my-2">Password : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control bg-white ps-7"
              placeholder="Enter your password"
              autocomplete="new-password"
            />

            <LockKeyhole
              size="20"
              class="position-absolute icon-input tran-y"
            />

            <Eye
              v-if="!showPassword"
              size="20"
              class="position-absolute icon-eye tran-y cursor-pointer"
              @click="togglePassword"
            />

            <EyeOff
              v-else
              size="20"
              class="position-absolute icon-eye tran-y cursor-pointer"
              @click="togglePassword"
            />
          </div>
          <p v-if="err.password" class="text-danger m-0">
            {{ err.password }}
          </p>

          <label class="form-label my-2">Confirm Password : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="password_confirmation"
              class="form-control bg-white ps-7"
              placeholder="Enter your confirm password"
              autocomplete="new-password"
            />

            <LockKeyhole
              size="20"
              class="position-absolute icon-input tran-y"
            />

            <Eye
              v-if="!showConfirmPassword"
              size="20"
              class="position-absolute icon-eye tran-y cursor-pointer"
              @click="toggleConfirmPassword"
            />

            <EyeOff
              v-else
              size="20"
              class="position-absolute icon-eye tran-y cursor-pointer"
              @click="toggleConfirmPassword"
            />
          </div>
          <p v-if="err.password_confirmation" class="text-danger m-0">
            {{ err.password_confirmation }}
          </p>

          <button
            :disabled="isLoading"
            type="submit"
            class="btn bg-btn border-0 btn-lg w-100 mt-3"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm me-2 text-white"
            ></span>
            <span class="text-white">{{
              isLoading ? "Signing Up..." : "Sign Up"
            }}</span>
          </button>
        </form>
        <div class="d-flex gap-3 mt-3 align-items-center text-secondary">
          <hr class="w-50" />
          <p class="p-0 m-0 fs-6 text-dark">OR</p>
          <hr class="w-50" />
        </div>
        <p class="m-0 fs-6 mt-2 text-center text-dark">
          Already have an account?<router-link
            to="/login"
            class="ms-2 text-main"
            >Login</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { isEmail, require, validates } from "@/utils/validate";
import BaseInput from "@/components/BaseInput.vue";
import { notify } from "@/utils/toast";
const auth = useAuthStore();

const email = ref("");
const name = ref("");
const password = ref("");
const password_confirmation = ref("");
const isLoading = ref(false);
const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
let toast = notify(router);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const err = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

function validate() {
  err.email = validates(email.value, [
    (v) => require(v, "Email is require"),
    (v) => isEmail(v, "Wrong Format Email"),
  ]);

  err.password = require(password.value, "Password is require");
  err.name = require(name.value, "Name is require");
  err.password_confirmation = require(password_confirmation.value, "Confirm password is require");

  return !err.email && !err.password && !err.name && !err.password_confirmation;
}

async function handleRegister() {
  if (!validate()) return;
  isLoading.value = true;
  try {
    await auth.register(
      name.value,
      email.value,
      password.value,
      password_confirmation.value,
    );
    toast.success("Sign Up Successfully!", "/login");
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.tran-y {
  transform: translateY(-50%);
}

.icon-input {
  position: absolute;
  top: 50%;
  left: 18px;
  font-size: 18px;
}

.icon-eye {
  position: absolute;
  top: 50%;
  right: 18px;
  font-size: 18px;
  cursor: pointer;
}
</style>
