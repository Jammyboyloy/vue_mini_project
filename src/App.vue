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
    <RouterView />
  </div>
</template>


