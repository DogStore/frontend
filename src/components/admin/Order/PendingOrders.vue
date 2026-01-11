<template>
  <div v-if="pending.length" class="bg-orange-200 p-6 rounded-lg mb-10">
    <h3 class="font-bold mb-4">
      Pending Orders ({{ pending.length }})
    </h3>

    <div
      v-for="order in pending"
      :key="order._id"
      class="bg-white p-4 rounded mb-3 flex justify-between">
      <div>
        <p class="font-semibold">#{{ order.orderNumber }}</p>
        <p>${{ order.totalAmount }}</p>
      </div>

      <div class="flex gap-3">
        <button class="btn-green" @click="approve(order._id)">Approve</button>
        <button class="btn-red" @click="reject(order._id)">Reject</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAdminOrderStore } from "@/stores/adminOrderStore";

const store = useAdminOrderStore();

const pending = computed(() => store.orders.filter(o => o.status === "pending"));

function approve(id: string) {
  store.changeStatus(id, "paid");
}

function reject(id: string) {
  store.changeStatus(id, "canceled");
}
</script>
