<template>
    <div>
        <template v-if="MyProfileStore.loading">
            <ProfileSkeleton />
        </template>
        <template v-else>
            <div class="container-fluid py-4 bg-white rounded-5 px-4 shadow-sm">
                <!-- <h5 class="ms-7">My Profile</h5> -->
                <!-- profile -->
                <div class="d-flex align-items-center gap-3 mt-5 mb-5">
                    <div class="icon-box-title">
                        <User class="text-main" :size="28" />
                    </div>
                    <div>
                        <h3 class="fw-bold mb-1">My Profile</h3>
                        <p class="text-muted mb-0 small">
                            Manage your account and store details
                        </p>
                    </div>
                </div>
                <!-- body -->
                <div class="d-flex align-content-center bg-light rounded-5 px-5">
                    <div class="col-lg-6">
                        <div class="d-flex pb-3">
                            <div class="border-0 me-4 mt-3">
                                <div class="position-relative mx-auto" style="width: 150px; height: 150px;">
                                    <img id="avatar" :src="MyProfileStore.myProfile?.avatar"
                                        class="rounded-circle border w-100 h-100" alt="" />
                                    <div class="dropdown position-absolute bg-main rounded-circle"
                                        style="bottom: 35px; right: -9px;">
                                        <span
                                            class="d-flex justify-content-center align-items-center bg-btn text-white rounded-circle"
                                            data-bs-toggle="dropdown"
                                            style="width: 30px; height: 30px; cursor: pointer;">
                                            <Pencil class="" size="15" />
                                        </span>

                                        <ul class="dropdown-menu px-2 bg-main border">
                                            <li>
                                                <!-- <input type="file" id="uploadImage" @change="handleFile" accept="image/*"
                                                    style="display: none;"> -->
                                                <label class="btn dropdown-item mb-1 nav-text" @click="UploadAvatar">
                                                    <Pencil class="me-2" size="16" /> Change Profile
                                                </label>

                                            </li>
                                            <li>
                                                <button class="btn dropdown-item nav-text" type="button"
                                                    data-bs-toggle="modal" data-bs-target="#removeAvatar"
                                                    @click="Remove_Modal">
                                                    <Trash2 class="me-2 text-danger" size="16" /> Remove
                                                    Profile
                                                </button>
                                            </li>
                                        </ul>

                                        <!-- Modal Upload -->
                                        <BaseModal v-if="Upload" @closeModal="UploadAvatar">
                                            <template #header>
                                                <h5 class="modal-title mx-auto">Change Profile</h5>
                                            </template>
                                            <template #body>
                                                <input type="file" id="uploadImage" @change="handleFile">
                                            </template>
                                            <template #footer>
                                                <button type="button" class="btn btn-danger rounded-pill px-6 py-2"
                                                    @click="UpdateImage">Change</button>
                                            </template>
                                        </BaseModal>

                                        <!-- Modal Remove -->
                                        <BaseModal v-if="remove" @closeModal="Remove_Modal"
                                            position="justify-content-center">
                                            <template #header>
                                                <h5 class="modal-title mx-auto">Remove Profile</h5>
                                            </template>
                                            <template #body>
                                                <p class="text-center mb-0">Are you sure you want to remove your
                                                    profile?
                                                </p>
                                            </template>
                                            <template #footer>
                                                <button type="button" class="btn btn-danger rounded-pill px-6 py-2"
                                                    @click="removeAvatar">Remove</button>
                                            </template>
                                        </BaseModal>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8">
                                <h4>{{ MyProfileStore.myProfile?.name }}</h4>
                                <div class="lh-1 mt-3">
                                    <p><span class="text-muted">Email:</span> {{ MyProfileStore.myProfile?.email }}
                                    </p>
                                    <p><span class="text-muted">Created At:</span> {{
                                        formatDate(MyProfileStore.myProfile?.created_at) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="d-flex justify-content-end mt-10">
                            <a href="#" class="btn bg-btn  rounded-pill py-2 px-6 me-3" @click="editModal">Edit
                                Profile</a>
                            <a href="#" class="btn btn-danger  rounded-pill py-2 px-6" @click="toggleModal">Sign out</a>
                            <BaseModal v-if="open" @closeModal="toggleModal" position="justify-content-center">
                                <template #header>
                                    <h5 class="modal-title mx-auto">Sign out</h5>
                                </template>
                                <template #body>
                                    <p class="text-center mb-0">Are you sure you want to sign out?</p>
                                </template>
                                <template #footer>
                                    <button type="button" class="btn btn-danger rounded-pill py-2 px-6"
                                        @click="handleLogout">Sign out</button>
                                </template>
                            </BaseModal>
                            <BaseModal v-if="edit" @closeModal="editModal">
                                <template #header>
                                    <h5 class="modal-title mx-auto">Edit Profile</h5>
                                </template>
                                <template #body>
                                    <label for="name" class="mb-2">Name</label>
                                    <BaseInput inputPlaceholder="Enter your name" inputIcon="User"
                                        v-model="editProfile.name"></BaseInput>
                                    <label for="email" class="mb-2">Email</label>
                                    <BaseInput inputPlaceholder="Enter your email" inputIcon="Mail"
                                        v-model="editProfile.email"></BaseInput>
                                    <label for="location" class="mb-2">Location</label>
                                    <BaseInput inputPlaceholder="Enter your location" inputIcon="MapPin"
                                        v-model="editProfile.location"></BaseInput>
                                    <label for="phone" class="mb-2">Phone</label>
                                    <BaseInput inputPlaceholder="Enter your phone" inputIcon="Phone"
                                        v-model="editProfile.phone"></BaseInput>
                                </template>
                                <template #footer>
                                    <button type="button" class="btn bg-btn text-white rounded-pill py-2 px-6"
                                        @click="UpdateProfile" :disabled="Loading">
                                        <span v-if="Loading" class="spinner-border spinner-border-sm me-2"></span>
                                        Update
                                    </button>
                                </template>
                            </BaseModal>
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
                                    <p class=" fs-5 fw-bold">{{ MyProfileStore.myProfile.name }}</p>
                                </li>
                                <li>
                                    <span class="text-gray">Email</span>
                                    <p class="fw-bold fs-5">{{ MyProfileStore.myProfile.email }}</p>
                                </li>
                                <li>
                                    <span class="text-gray">Address</span>
                                    <p class="fw-bold fs-5">{{ MyProfileStore.myProfile?.location ?? "N/A" }}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <ul class="mt-11 timeline">
                                <li>
                                    <span class="text-gray">Email</span>
                                    <p class="fw-bold fs-5">{{ MyProfileStore.myProfile.email }}</p>
                                </li>
                                <li>
                                    <span class="text-gray">ID</span>
                                    <p class="fw-bold fs-5">{{ MyProfileStore.myProfile.id }}</p>
                                </li>
                                <li>
                                    <span class="text-gray">Phone Number</span>
                                    <p class="fw-bold fs-5">{{ MyProfileStore.myProfile?.phone ?? "N/A" }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';
import { onMounted, ref } from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseInput from '@/components/BaseInput.vue';
import api from '@/api/https';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from "vue-router";
import ProfileSkeleton from '@/components/ProfileSkeleton.vue';


let router = useRouter();
let MyProfileStore = useProfileStore();
let AuthStore = useAuthStore();
let open = ref(false);
let edit = ref(false);
let Upload = ref(false);
let remove = ref(false);
let file = ref(null);
let toast = useToast();
let editProfile = ref({
    name: "",
    email: "",
    location: "",
    phone: "",
});

onMounted(async () => {
    await MyProfileStore.fetchMyProfile();
    editProfile.value = MyProfileStore.myProfile;
})

function toggleModal() {
    open.value = !open.value;
}

function editModal() {
    edit.value = !edit.value;
}

function UploadAvatar() {
    Upload.value = !Upload.value;
}

function Remove_Modal() {
    remove.value = !remove.value;
}

let Loading = ref(false);

async function UpdateImage() {
    Loading.value = true;
    try {
        if (file.value) {
            let formData = new FormData();
            formData.append('image', file.value);

            await api.post('/api/profile/image', formData, {
                headers: {
                    Accept: 'application/json',
                },
            });
        }
        toast.success("Upload success", { timeout: 1200 });
    }
    catch (error) {
        console.error(error.response?.data || error);
        toast.error("Upload failed");
    } finally {
        Loading.value = false;
        Upload.value = false;
    }
    await MyProfileStore.fetchMyProfile();
}


async function UpdateProfile() {
    Loading.value = true;
    try {
        // if (file.value) {
        //     let formData = new FormData();
        //     formData.append('image', file.value);

        //     await api.post('/api/profile/image', formData, {
        //         headers: {
        //             Accept: 'application/json',
        //         },
        //     });
        // }
        await api.put('/api/profile/info', editProfile.value);

        toast.success("Profile updated successfully", { timeout: 1200 });
    } catch (error) {
        console.error(error.response?.data || error);
        toast.error("Profile update failed");
    } finally {
        Loading.value = false;
        edit.value = false;
    }
    await MyProfileStore.fetchMyProfile();
}

async function removeAvatar() {
    try {
        Loading.value = true;

        await api.delete('/api/profile/image', {
            headers: {
                Accept: 'application/json',
            },
        });

        toast.success('Profile image removed', { timeout: 1200 });

        // refresh profile
        await MyProfileStore.fetchMyProfile();
    } catch (error) {
        console.error(error.response?.data || error);
        toast.error('Failed to remove profile image');
    } finally {
        Loading.value = false;
        remove.value = false;
    }
}

const handleFile = (event) => {
    let selectFile = event.target.files[0];
    console.log(selectFile)
    if (selectFile) {
        file.value = selectFile;
    }
}

async function handleLogout() {
    try {
        toast.success('Profile image removed', { timeout: 1200 });
        AuthStore.logout();
        await MyProfileStore.fetchMyProfile();
        router.push({ name: "login" });

    } catch (error) {
        console.error(error.response?.data || error);
        toast.error('Failed to remove profile image');
    } finally {
        Loading.value = false;
        open.value = false;
    }
}

function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}

</script>

<style scoped>
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

.icon-box-title {
    background: #f0fff4;
    padding: 12px;
    border-radius: 14px;
}
</style>