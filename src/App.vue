<script setup>
import { ref } from 'vue';
import PaymentView from './views/payments/PaymentView.vue';
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
</script>

<template>
  <div>
    <!-- <RouterView /> -->
     <PaymentView :file-name="txn.transaction_file"
            :file-size="txn.file_size"
            :file-object="txn.file_object"
            @file-changed="onFileChanged" v-model="txn.is_delivery" :address="txn.address" :google-map-url="txn.google_map_url"
            @update:address="txn.address = $event" @update:google-map-url="txn.google_map_url = $event"></PaymentView>
  </div>
</template>


