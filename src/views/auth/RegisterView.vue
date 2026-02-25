<template>
  <div>
    <div
      class="d-flex justify-content-center align-items-center min-vh-100 py-4 shadow-sm bg-light"
    >
      <div
        class="container bg-white shadow-sm py-4 px-6 rounded-4 shadow-sm"
        style="width: 500px"
      >
        <h3 class="text-center text-main fw-medium mb-3">Create Account</h3>
        <form @submit.prevent="handleLogin">
          <label class="form-label">Name : </label>
          <BaseInput
            input-placeholder="Enter your name"
            input-icon="User"
            v-model="name"
            class="mb-3"
          />
          <p v-if="err.email" class="text-danger m-0">{{ err.email }}</p>

          <label class="form-label">Email : </label>
          <BaseInput
            input-placeholder="Enter your email"
            input-icon="Mail"
            v-model="email"
          />
          <p v-if="err.email" class="text-danger m-0">{{ err.email }}</p>

          <label class="form-label my-2">Password : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control bg-prime fs-text ps-7"
              placeholder="Enter your password"
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
              class="form-control bg-prime fs-text ps-7"
              placeholder="Enter your confirm password"
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
          <p v-if="err.password" class="text-danger m-0">
            {{ err.password }}
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
              isLoading ? "Signing In..." : "Sign In"
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
import { useToast } from "vue-toastification";
let toast = useToast();

const email = ref("");
const name = ref("");
const password = ref("");
const password_confirmation = ref("");
const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const err = reactive({
  email: "",
  password: "",
});

function validate() {
  err.email = validates(email.value, [
    (v) => require(v, "Email is require"),
    (v) => isEmail(v, "Wrong Format Email"),
  ]);

  err.password = require(password.value, "Password is require");

  return !err.email && !err.password;
}

let auth = useAuthStore();

async function handleRegister() {
  await auth.register(
    firstName.value,
    lastName.value,
    email.value,
    password.value,
    confirmPassword.value,
  );
  router.push("/login");
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
