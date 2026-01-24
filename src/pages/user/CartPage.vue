<template>
  <div class="min-h-screen bg-gray-50">
    <CartHeader />

    <div class="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Table -->
      <div class="lg:col-span-2">
        <CartTable />
      </div>

      <!-- Summary -->
      <div class="space-y-4">
        <CartSummary />
        <CartCoupon />
      </div>

      <!-- Service Info -->
      <div class="lg:col-span-3 pt-6">
        <CartServiceInfo />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import CartHeader from '@/components/Cart/CartHeader.vue'
import CartTable from '@/components/Cart/CartTable.vue'
import CartSummary from '@/components/Cart/CartSummary.vue'
import CartCoupon from '@/components/Cart/CartCoupon.vue'
import CartServiceInfo from '@/components/Cart/CartServiceInfo.vue'
</script>
