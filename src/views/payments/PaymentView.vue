<template>
  <div class="container-lg py-5 px-3 px-md-4">
    <div class="row g-4 g-lg-5">
      <!-- left -->
      <div class="col-lg-7">
        <!-- FileTransaction -->
        <div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <h5 class="text-main">Transaction File</h5>
            <Transition name="badge-pop">
              <span
                v-if="justUploaded"
                class="d-inline-flex align-items-center gap-1 px-2 rounded-pill fw-medium bg-btn"
              >
                <i class="bi bi-check-circle-fill"></i> File attached
              </span>
            </Transition>
          </div>

          <!-- File row / empty state -->
          <Transition name="swap" mode="out-in">
            <!-- Has file -->
            <div
              v-if="fileName"
              key="file-row"
              class="d-flex align-items-center gap-3 p-3 rounded-3 mb-2 shadow-sm file-card"
              :class="justUploaded ? 'file-success' : ''"
            >
              <div
                class="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
              >
                <i
                  :class="[fileIcon, 'text-main']"
                  :style="{
                    fontSize: '1.25rem',
                    color: justUploaded ? 'var(--pickup)' : 'var(--accent)',
                  }"
                ></i>
              </div>
              <div class="flex-grow-1 overflow-hidden">
                <div class="fw-bold text-truncate">
                  {{ fileName }}
                </div>
                <div class="text-muted mt-1">{{ fileSize }}</div>
              </div>
              <div class="d-flex gap-2 flex-shrink-0">
                <button
                  class="d-flex align-items-center justify-content-center rounded-2 action-btn text-main"
                  title="Preview"
                  :disabled="!fileUrl"
                  @click="previewFile"
                >
                  <i class="bi bi-eye"></i>
                </button>
                <button
                  class="d-flex align-items-center justify-content-center rounded-2 action-btn text-main"
                  title="Download"
                  :disabled="!fileUrl"
                  @click="downloadFile"
                >
                  <i class="bi bi-download"></i>
                </button>
              </div>
            </div>

            <!-- Empty -->
            <div
              v-else
              key="empty-row"
              class="d-flex align-items-center gap-3 p-3 rounded-3 mb-2 map-empty"
            >
              <i class="bi bi-file-earmark-plus text-muted"></i>
              <span class="text-muted">No file attached yet</span>
            </div>
          </Transition>

          <!-- Upload zone -->
          <label
            class="d-flex align-items-center justify-content-center rounded-3 p-3 w-100 upload-zone"
            :class="{ dragover: dragging }"
            @dragover.prevent="dragging = true"
            @dragleave="dragging = false"
            @drop.prevent="onDrop"
          >
            <div class="d-flex align-items-center gap-3">
              <i
                class="bi bi-cloud-arrow-up upload-icon"
                style="
                  font-size: 1.5rem;
                  color: var(--muted);
                  transition: color 0.2s;
                "
              ></i>
              <div class="d-flex flex-column gap-1">
                <span
                  class="fw-bold"
                  style="font-size: 0.85rem; color: var(--ink)"
                >
                  {{ fileName ? "Replacefile" : "Attach file" }}</span
                >
                <span class="text-muted" style="font-size: 0.68rem"
                  >drag & drop or click to browse</span
                >
              </div>
            </div>
            <input type="file" class="d-none" @change="onFileChange" />
          </label>
        </div>

        <!-- Pick Up / Delivery toggle -->
        <div class="d-flex align-items-center gap-3 my-4">
          <div class="flex-grow-1"></div>
          <span class="text-uppercase text-main fw-semibold"></span>
          <div class="flex-grow-1"></div>
        </div>

        <div>
          <h5 class="text-main">Logistics Consultation</h5>
          <div class="row g-3 mb-4">
            <div class="col-6">
              <button
                class="method-card w-100 d-flex align-items-center gap-3 p-3 rounded-3 text-start shadow-sm"
                :class="{ 'bg-btn text-white': modelValue === 1 }"
                @click="switchMethod(1)"
              >
                <div
                  class="method-icon d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                >
                  <i class="bi bi-bag-check text-main"></i>
                </div>
                <div class="flex-grow-1">
                  <span class="d-block fw-bold">Pick Up</span>
                  <span class="d-block text-muted"
                    >Customer collects order</span
                  >
                </div>
                <div
                  v-if="modelValue === 1"
                  class="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 check-circle"
                >
                  <i class="bi bi-check2"></i>
                </div>
              </button>
            </div>

            <div class="col-6">
              <button
                class="method-card w-100 d-flex align-items-center gap-3 p-3 rounded-3 text-start shadow-sm"
                :class="{ 'bg-btn text-white': modelValue === 2 }"
                @click="switchMethod(2)"
              >
                <div
                  class="method-icon d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                >
                  <i class="bi bi-truck text-main"></i>
                </div>
                <div class="flex-grow-1">
                  <span class="d-block fw-bold">Delivery</span>
                  <span class="d-block text-muted">Ship to address</span>
                </div>
                <div
                  v-if="modelValue === 2"
                  class="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 check-circle"
                >
                  <i class="bi bi-check2"></i>
                </div>
              </button>
            </div>
          </div>

          <!-- Location field -->
          <Transition name="slide-fade">
            <div v-if="modelValue">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <span class="text-uppercase text-muted fw-semibold">
                  {{
                    modelValue === 1 ? "Pick-up Location" : "Delivery Address"
                  }}
                </span>
                <Transition name="badge-pop">
                  <span
                    v-if="localPlace"
                    class="d-inline-flex align-items-center gap-1 px-2 rounded-pill fw-medium bg-btn"
                  >
                    <i class="bi bi-check-circle-fill"></i> Saved
                  </span>
                </Transition>
              </div>

              <!-- Location card -->
              <div
                class="rounded-3 p-3 location-card shadow-sm"
                :class="{ 'card-filled': localPlace && !isEditing }"
              >
                <template v-if="localPlace && !isEditing">
                  <div class="d-flex align-items-center gap-3">
                    <i
                      class="bi bi-map-fill flex-shrink-0"
                      style="font-size: 1.1rem"
                    ></i>
                    <div class="flex-grow-1 overflow-hidden">
                      <span
                        class="d-block fw-medium text-truncate"
                        style="font-size: 0.82rem; color: var(--ink)"
                        >{{ localPlace }}</span
                      >
                      <span class="d-block text-main" style="font-size: 0.62rem"
                        >Tap Edit to change · Opens in Google Maps</span
                      >
                    </div>
                    <a
                      :href="computedMapUrl"
                      target="_blank"
                      rel="noopener"
                      class="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0 text-decoration-none icon-btn"
                      @click.stop
                      style="color: var(--accent2)"
                    >
                      <i class="bi bi-arrow-up-right-square"></i>
                    </a>
                    <button
                      class="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0 icon-btn"
                      @click="isEditing = true"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                  </div>
                </template>

                <!-- Input view -->
                <template v-else>
                  <!-- Card inner label -->
                  <div
                    class="d-flex align-items-center gap-2 mb-2 text-uppercase fw-semibold text-main location-label"
                  >
                    <i class="bi bi-map-fill"></i>
                    <span>Location on Map</span>
                  </div>

                  <div class="position-relative">
                    <i
                      class="bi bi-search position-absolute top-50 translate-middle-y text-muted"
                      style="
                        left: 13px;
                        font-size: 0.82rem;
                        pointer-events: none;
                      "
                    ></i>
                    <input
                      class="form-control search-input themed-input pe-5"
                      :class="{ 'input-filled': localPlace }"
                      type="text"
                      v-model="localPlace"
                      @input="onInput"
                      @keydown.enter="confirmPlace"
                      :placeholder="
                        modelValue === 1
                          ? 'Branch name or address\u2026'
                          : 'Delivery address or place name\u2026'
                      "
                    />
                    <button
                      v-if="localPlace"
                      class="position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center rounded-2 bg-btn"
                      @click="clearPlace"
                      title="Clear"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>

                  <div class="d-flex align-items-start gap-2 mt-2">
                    <i class="bi bi-info-circle flex-shrink-0 mt-1"></i>
                    <span class="text-muted">
                      Type a place name or address — the map preview on the
                      right will update automatically
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <!-- RIGHT -->
      <div class="col-lg-5">
        <!-- QR -->
        <div>
          <h5 class="text-main">Payment QR Code</h5>
          <div class="rounded-3 overflow-hidden border-main">
            <!-- Dark header -->
            <div
              class="d-flex align-items-end justify-content-between px-4 py-3 bg-btn"
            >
              <div class="d-flex flex-column gap-1">
                <span class="text-uppercase fw-semibold text-white"
                  >Amount Due</span
                >
                <span
                  class="fw-black text-white"
                  style="font-size: 1.8rem; line-height: 1"
                >
                  {{ formatCurrency(amount) }}</span
                >
              </div>
              <div class="text-end text-white">
                <span class="d-block text-uppercase fw-semibold">Ref</span>
                <span class="d-block fw-medium"> {{ txnId }}</span>
              </div>
            </div>

            <!-- Body -->
            <div class="d-flex justify-content-center align-items-center p-4">
              <div
                class="d-flex justify-content-center align-items-center w-75"
              >
                <img
                  src="https://qrcg-free-editor.qr-code-generator.com/latest/assets/images/websiteQRCode_noFrame.png"
                  class="img-thumbnail"
                  alt=""
                />
              </div>
            </div>

            <div class="text-center">
              <span
                class="text-uppercase fw-semibold text-main"
                style="font-size: 0.65rem; letter-spacing: 0.1em"
              >
                Scan to pay · {{ txnId }}
              </span>
            </div>

            <div class="w-100">
              <div
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <Transition name="badge-pop">
                  <span
                    v-if="amount > 0"
                    class="d-inline-flex align-items-center gap-1 px-2 rounded-pill fw-medium bg-btn"
                  >
                    <i class="bi bi-check-circle-fill"></i> Filled
                  </span>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="mt-5">
          <h5 class="text-main">Map Preview</h5>
          <div class="rounded-3 overflow-hidden map-card">
            <div class="position-relative map-frame">
              <Transition name="map-fade" mode="out-in">
                <!-- Live map iframe -->
                <iframe
                  v-if="debouncedPlace"
                  :key="debouncedPlace"
                  :src="embedUrl"
                  allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade"
                  class="position-absolute top-0 start-0 w-100 h-100 border-0 rounded-3"
                >
                </iframe>

                <!-- Typing state -->
                <div
                  v-else-if="isTyping"
                  key="typing"
                  class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-3"
                >
                  <div class="d-flex gap-2">
                    <span class="typing-dot rounded-circle"></span>
                    <span class="typing-dot rounded-circle"></span>
                    <span class="typing-dot rounded-circle"></span>
                  </div>
                  <div class="text-center">
                    <p class="fw-bold mb-1" style="font-size: 0.88rem">
                      Looking up location…
                    </p>
                    <p class="text-muted mb-0" style="font-size: 0.68rem">
                      Map will appear when you stop typing
                    </p>
                  </div>
                </div>

                <!-- Empty state -->
                <div
                  v-else
                  key="empty"
                  class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-3 px-4"
                >
                  <i class="bi bi-map"></i>
                  <div class="text-center">
                    <p class="fw-bold mb-1">No location yet</p>
                    <p
                      class="text-muted mb-0 lh-base"
                      style="font-size: 0.68rem"
                    >
                      Type a place name in the field on the left<br />and the
                      map will update here automatically
                    </p>
                  </div>
                </div>
              </Transition>

              <!-- Footer -->
              <div class="d-flex align-items-center gap-2 px-3 py-2 map-footer">
                <i
                  class="bi bi-geo-alt flex-shrink-0"
                  style="font-size: 0.9rem; color: var(--accent)"
                ></i>
                <div class="flex-grow-1 overflow-hidden">
                  <span
                    class="d-block text-truncate"
                    style="font-size: 0.7rem; color: var(--ink)"
                  >
                    {{ debouncedPlace || placeName || "No location set" }}
                  </span>
                  <span
                    v-if="!debouncedPlace && !placeName"
                    class="d-block text-muted"
                    style="font-size: 0.62rem"
                  >
                    Enter a location above to enable map
                  </span>
                </div>
                <a
                  v-if="computedMap"
                  :href="computedMap"
                  target="_blank"
                  rel="noopener"
                  class="d-flex align-items-center gap-1 flex-shrink-0 px-3 py-1 rounded-2 fw-medium text-decoration-none bg-btn"
                  style="font-size: 0.7rem"
                >
                  <i class="bi bi-box-arrow-up-right"></i> Open
                </a>
              </div>
            </div>

            <!-- Helper note below card -->
          </div>
          <div class="d-flex align-items-start gap-2 mt-2 ms-4">
            <i
              class="bi bi-info-circle flex-shrink-0 mt-1"
              style="font-size: 0.72rem"
            ></i>
            <span
              class="text-muted"
              style="font-size: 0.63rem; line-height: 1.5"
            >
              Map updates automatically 0.8 s after you stop typing a location
              name
            </span>
            <div class="d-flex justify-content-end mt-4">
              <button
                class="btn bg-btn d-flex align-items-center gap-2 fw-bold px-4 py-3"
                @click="$emit('save')"
              >
                <span
                  class="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                >
                  <i class="bi bi-check-lg"></i>
                </span>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onUnmounted, watch } from "vue";

const txn = ref({
  id: 'TXN-' + Date.now(),
  createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  transaction_file: '',
  file_size: '',
  file_object: null,
  is_delivery: 1,
  address: '',
  amount: 0,
  google_map_url: '',
})

const onFileChanged = ({ name, size, file }) => {
  txn.value.transaction_file = name
  txn.value.file_size = size
  txn.value.file_object = file
}

// FileTransaction
const props = defineProps({
  fileName: { type: String, default: "" },
  fileSize: { type: String, default: "" },
  fileObject: { type: File, default: null },
  modelValue: { type: Number, default: 1 },
  address: { type: String, default: "" },
  googleMapUrl: { type: String, default: "" },
  amount: { type: Number, default: 0 },
  txnId: { type: String, default: "" },
  googleMapUrl: { type: String, default: "" },
});
const emit = defineEmits([
  "file-changed",
  "update:modelValue",
  "update:address",
  "update:googleMapUrl",
  "update:amount",
  "save",
]);

const dragging = ref(false);
const justUploaded = ref(false);
let blobUrl = null;

const fileUrl = computed(() => {
  if (!props.fileObject) return null;
  if (blobUrl) URL.revokeObjectURL(blobUrl);
  blobUrl = URL.createObjectURL(props.fileObject);
  return blobUrl;
});

//it cleans up the temporary URL and prevents memory leaks.
onUnmounted(() => {
  if (blobUrl) URL.revokeObjectURL(blobUrl);
});

const fileIcon = computed(() => {
  const f = (props.fileName || "").toLowerCase();
  if (f.endsWith(".pdf")) {
    return "bi bi-file-earmark-pdf-fill";
  }
  if (f.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
    return "bi bi-file-earmark-image-fill";
  }
  if (f.match(/\.(xlsx|xls|csv)$/)) {
    return "bi bi-file-earmark-spreadsheet-fill";
  }
  if (f.match(/\.(docx|doc)$/)) {
    return "bi bi-file-earmark-word-fill";
  }
  return "bi bi-file-earmark-fill";
});

const previewFile = () => {
  if (fileUrl.value) window.open(fileUrl.value, "_blank");
};
const downloadFile = () => {
  if (!fileUrl.value) return;
  const a = document.createElement("a");
  a.href = fileUrl.value;
  a.download = props.fileName;
  a.click();
};

const parseFile = (file) => {
  if (!file) return;
  dragging.value = false;
  const ext = file.name.split(".").pop()?.toUpperCase() || "";
  emit("file-changed", {
    name: file.name,
    size: `${(file.size / 1024).toFixed(0)} KB · ${ext}`,
    file,
  });
  justUploaded.value = true;
  setTimeout(() => (justUploaded.value = false), 3000);
};
const onFileChange = (e) => parseFile(e.target.files[0]);
const onDrop = (e) => parseFile(e.dataTransfer.files[0]);

// Pickup / Delivery
const localPlace = ref("");
const isEditing = ref(true);

const computedMapUrl = computed(() =>
  localPlace.value.trim()
    ? `https://www.google.com/maps/search/${encodeURIComponent(localPlace.value.trim())}`
    : "",
);

const onInput = () => {
  emit("update:address", localPlace.value);
  emit("update:googleMapUrl", computedMapUrl.value);
};

const confirmPlace = () => {
  if (localPlace.value.trim()) isEditing.value = false;
};

const clearPlace = () => {
  localPlace.value = "";
  isEditing.value = true;
  emit("update:address", "");
  emit("update:googleMapUrl", "");
};

const switchMethod = (val) => {
  emit("update:modelValue", val);
  localPlace.value = "";
  isEditing.value = true;
  emit("update:address", "");
  emit("update:googleMapUrl", "");
};

// QR
const formatCurrency = (val) =>
  new Intl.NumberFormat("kh-KH", { style: "currency", currency: "KHR" }).format(
    val || 0,
  );

//Map
const placeName = computed(() => {
  const url = props.googleMapUrl || "";
  if (!url) return "";
  const m = url.match(/maps\/search\/([^?#]+)/);
  if (m) return decodeURIComponent(m[1]);
  const q = url.match(/[?&]q=([^&]+)/);
  if (q) return decodeURIComponent(q[1]);
  return "";
});

const debouncedPlace = ref("");
const isTyping = ref(false);
let timer = null;

watch(
  placeName,
  (val) => {
    clearTimeout(timer);
    if (!val.trim()) {
      isTyping.value = false;
      debouncedPlace.value = "";
      return;
    }
    isTyping.value = true;
    timer = setTimeout(() => {
      debouncedPlace.value = val.trim();
      isTyping.value = false;
    }, 800);
  },
  { immediate: true },
);

const computedMap = computed(() =>
  debouncedPlace.value
    ? `https://www.google.com/maps/search/${encodeURIComponent(debouncedPlace.value)}`
    : "",
);
const embedUrl = computed(() =>
  debouncedPlace.value
    ? `https://maps.google.com/maps?q=${encodeURIComponent(debouncedPlace.value)}&output=embed`
    : "",
);
</script>

<style scoped>
.map-frame {
  height: 260px;
  border-radius: 12px;
  overflow: hidden;
}

.border-main {
  border: 2px solid #42b883;
}

/* transaction file */
.file-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  transition: all 0.25s ease;
}

.file-card:hover {
  border-color: #42b883;
  box-shadow: 0 6px 18px rgba(66, 184, 131, 0.15);
}

.file-success {
  border: 2px solid #42b883;
  background: #f6fffb;
}

.empty-file {
  background: #f8f9fa;
  border: 1px dashed #dcdcdc;
}

.upload-zone {
  border: 2px dashed #e0e0e0;
  background: #fcfcfc;
  transition: all 0.25s ease;
  cursor: pointer;
}

.upload-zone:hover {
  border-color: #42b883;
  background: #f6fffb;
}

.upload-zone.dragover {
  border-color: #42b883;
  background: #ecfdf5;
}

.upload-icon {
  color: #42b883 !important;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e9ecef;
  background: white;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #42b883;
  color: white !important;
  border-color: #42b883;
}

/* pick up / delivery */
.method-card {
  border: 1px solid #e9ecef;
  background: #ffffff;
  transition: all 0.25s ease;
  cursor: pointer;
}

.method-card:hover {
  border-color: #42b883;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.12);
}

.method-active {
  border: 2px solid #42b883 !important;
  background: #f6fffb;
}

.method-icon {
  width: 42px;
  height: 42px;
  background: #f1fdf7;
  color: #42b883;
  font-size: 1.2rem;
}

.check-circle {
  width: 28px;
  height: 28px;
  background: #42b883;
  color: white;
}

/* map */
.location-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  transition: all 0.25s ease;
}

.location-card:hover {
  border-color: #42b883;
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.08);
}

.card-filled {
  border: 2px solid #42b883 !important;
  background: #f6fffb;
}

.themed-input {
  border: 1px solid #e0e0e0;
  padding-left: 34px !important;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.themed-input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 0.15rem rgba(66, 184, 131, 0.15);
}

.icon-btn {
  width: 34px;
  height: 34px;
  border: 1px solid #e9ecef;
  background: #ffffff;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  border-color: #42b883;
  color: #42b883 !important;
  background: #f6fffb;
}

/* map-preview */
.map-card {
  border: 1px solid #e9ecef;
  background: #ffffff;
  transition: all 0.25s ease;
}

.map-card:hover {
  border-color: #42b883;
  box-shadow: 0 10px 25px rgba(66, 184, 131, 0.08);
}

.map-empty {
  background: #f8fafc;
  text-align: center;
}

.map-footer {
  background: #ffffff;
  border-top: 1px solid #e9ecef;
  border-radius: 0 0 12px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
}
</style>
