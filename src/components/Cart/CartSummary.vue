<template>
  <div class="bg-white p-6 rounded-2xl shadow">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

    <div class="space-y-2 text-gray-600">
      <div class="flex justify-between">
        <span>Items</span>
        <span>{{ cartStore.totalItems }}</span>
      </div>

      <div class="flex justify-between">
        <span>Sub Total</span>
        <span>${{ cartStore.subtotal.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <span>Delivery</span>
        <span>${{ cartStore.delivery.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <span>Taxes</span>
        <span>${{ cartStore.taxes.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between">
        <span>Coupon Discount</span>
        <span>$0.00</span>
      </div>
    </div>

    <div class="border-t my-3"></div>

    <div class="flex justify-between text-lg font-semibold text-gray-800">
      <span>Total</span>
      <span>${{ cartStore.total.toFixed(2) }}</span>
    </div>

    <button
      @click="goToCheckout"
      :disabled="cartStore.totalItems === 0"
      class="w-full mt-5 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium cursor-pointer
            disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      Proceed to Checkout
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

function goToCheckout() {
  if (cartStore.totalItems === 0) return;
  router.push("/checkout");
}
</script>
