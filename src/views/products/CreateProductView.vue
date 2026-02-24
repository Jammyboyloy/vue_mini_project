<template>
  <div class="container-fluid bg-white rounded-5">
    <h3 class="fw-semibold text-main text-center pt-5">Create Product</h3>
    <div class="py-4 px-4">
      <form @submit.prevent="submitForm">
        <div class="row gy-3 gx-5">
          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold">Title :</label>
            <BaseInput
              v-model="form.title"
              input-placeholder="Enter Title"
              input-icon="receipt-text"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold">Price :</label>
            <BaseInput
              v-model="form.price"
              input-placeholder="Enter Price"
              input-icon="badge-dollar-sign"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold">Category :</label>
            <Select
              v-model="form.category_ids"
              :options="cate.category || []"
              optionLabel="name"
              optionValue="id"
              filter
              placeholder="Select Category"
              class="w-100"
            >
              <template #option="slotProps">
                <div class="d-flex align-items-center gap-3 py-2">
                  <LayoutGrid />
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </Select>
          </div>

          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold">Condition :</label>
            <BaseInput
              v-model="form.condition"
              input-placeholder="Enter Condition"
              input-icon="align-center-vertical"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold">Story :</label>
            <BaseInput
              v-model="form.story"
              input-placeholder="Enter Story"
              input-icon="book-audio"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold">Detail :</label>
            <BaseInput
              v-model="form.detail"
              input-placeholder="Enter Detail"
              input-icon="list-collapse"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold">Image :</label>
            <div
              class="transaction-wrapper p-3 bg-light rounded-4 form-card-height d-flex flex-column"
            >
              <div
                class="file-status rounded-3 px-3 py-2 mb-3 d-flex align-items-center justify-content-between"
                :class="{ 'file-success-bg': image }"
              >
                <div class="d-flex align-items-center text-truncate">
                  <FileImage
                    v-if="image"
                    size="20"
                    color="green"
                    class="me-2"
                  />
                  <FilePlus v-else size="20" color="gray" class="me-2" />
                  <span class="text-secondary fw-medium text-truncate">
                    {{ image ? image.name : "No file attached yet" }}
                  </span>
                </div>
                <i
                  v-if="image"
                  class="bi bi-x-circle fs-5 text-danger pointer"
                  @click="removeFile"
                ></i>
              </div>

              <div
                class="upload-box rounded-3 text-center position-relative overflow-hidden py-2 flex-grow-1"
                :class="{ 'has-image': image, dragover: isDragging }"
                @click="!image ? openFile() : null"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
              >
                <input
                  type="file"
                  ref="fileInput"
                  class="d-none"
                  accept="image/*"
                  @change="onFileChange"
                />

                <div
                  v-if="!image"
                  class="h-100 d-flex flex-column align-items-center justify-content-center"
                >
                  <i class="bi bi-cloud-arrow-up upload-icon mb-2 d-block"></i>
                  <div class="fw-semibold">Attach file</div>
                  <small class="text-muted"
                    >drag & drop or click to browse</small
                  >
                </div>

                <div v-else class="preview-container h-100">
                  <img :src="previewUrl" class="img-preview" />
                  <div
                    class="preview-overlay d-flex align-items-center justify-content-center gap-3"
                  >
                    <button
                      type="button"
                      class="action-icon-btn shadow-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#previewModal"
                    >
                      <Eye />
                    </button>
                    <button
                      type="button"
                      class="action-icon-btn btn-delete shadow-sm"
                      @click.stop="removeFile"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <label class="form-label text-secondary fw-bold"
              >Description :</label
            >
            <div
              class="p-3 bg-light rounded-4 form-card-height d-flex flex-column"
            >
              <textarea
                v-model="form.content"
                class="ps-3 pt-3 form-control rounded-3 flex-grow-1"
                placeholder="Enter Description"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="btn bg-btn px-5 d-block ms-auto mt-5 rounded-5 fw-medium text-white shadow-sm"
        >
          Post New Product
        </button>
      </form>
    </div>

    <div
      class="modal shadow-none border-0"
      id="previewModal"
      tabindex="-1"
      aria-hidden="true"
      style="background: rgba(0, 0, 0, 0.9)"
    >
      <div class="modal-dialog modal-fullscreen m-0 border-0">
        <div class="modal-content bg-transparent border-0">
          <div class="modal-header border-0 px-4 py-3">
            <div
              class="d-flex align-items-center text-white text-truncate"
              style="max-width: 80%"
            >
              <i class="bi bi-file-earmark-image fs-4 me-3"></i>
              <h6 class="modal-title fw-bold mb-0 text-truncate">
                {{ image?.name }}
              </h6>
            </div>
            <button
              type="button"
              class="btn-close btn-close-white shadow-none fs-4"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex align-items-center justify-content-center p-0"
          >
            <img
              v-if="previewUrl"
              :src="previewUrl"
              class="img-fluid rounded-2 shadow-lg"
              style="max-height: 85vh; width: auto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import { useCategoryStore } from "@/stores/category";
import { ref, onMounted } from "vue";
import Select from "primevue/select";
import api from "@/api/https";
import { LayoutGrid, Eye, Trash2 } from "lucide-vue-next"; // Added missing icon imports

const cate = useCategoryStore();
const fileInput = ref(null);
const image = ref(null);
const previewUrl = ref(null);
const isDragging = ref(false);

const form = ref({
  title: "",
  price: "",
  category_ids: null,
  condition: "",
  story: "",
  detail: "",
  content: "",
  image: null,
});

onMounted(() => {
  cate.fetchCategory();
});

function openFile() {
  fileInput.value.click();
}

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) processFile(file);
}

function handleDrop(event) {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) processFile(file);
}

function processFile(file) {
  image.value = file;
  form.value.image = file;
  previewUrl.value = URL.createObjectURL(file);
}

function removeFile() {
  image.value = null;
  form.value.image = null;
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
  if (fileInput.value) fileInput.value.value = "";
}

async function submitForm() {
  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("price", form.value.price);
  if (form.value.category_ids) {
    formData.append("category_ids", JSON.stringify([form.value.category_ids]));
  }
  formData.append("condition", form.value.condition);
  formData.append("story", form.value.story);
  formData.append("detail", form.value.detail);
  formData.append("content", form.value.content);
  if (form.value.image) {
    formData.append("image", form.value.image);
  }

  try {
    const response = await api.post("/api/products", formData);
    console.log("Success:", response.data);
    alert("Success bro!");
    form.value = {
      title: "",
      price: "",
      category_ids: null,
      condition: "",
      story: "",
      detail: "",
      content: "",
      image: null,
    };
    removeFile();
  } catch (err) {
    console.error("Upload error:", err.response?.data);
    alert("Fail bro. Check console for details.");
  }
}
</script>

<style scoped>
/* FIX: Fixed height for containers */
.form-card-height {
  height: 250px; /* Adjust this value to your preferred fixed height */
}

.file-title {
  color: #42b883;
  font-weight: 600;
}
.transaction-wrapper {
  border: 1px solid #edf2f7;
}
.file-status {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  font-size: 0.85rem;
}
.file-success-bg {
  border-color: #42b883;
  background: #f0fff4;
}
.upload-box {
  border: 2px dashed #cbd5e0;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-box:hover,
.upload-box.dragover {
  border-color: #42b883;
  background: #f6fffb;
}
.upload-box.has-image {
  border-style: solid;
  border-color: #42b883;
  padding: 0 !important;
}
.upload-icon {
  font-size: 32px;
  color: #42b883;
}
.preview-container {
  width: 100%;
  position: relative;
}
.img-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s;
}
.upload-box:hover .preview-overlay {
  opacity: 1;
}
.action-icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #333;
}
.action-icon-btn:hover {
  background: #f8f9fa;
}
.btn-delete:hover {
  color: #e53e3e;
}
.pointer {
  cursor: pointer;
}

textarea {
  resize: none;
}
</style>
