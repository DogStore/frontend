<template>
  <div class="grid grid-cols-4 items-center py-4 px-4">
    <!-- Product -->
    <div class="flex items-center gap-3">
      <button @click="$emit('remove-item', item.id)" class="text-gray-400 hover:text-red-500 text-xl font-bold">
        ×
      </button>
      <img :src="item.image" alt="product" class="h-16 w-16 rounded-lg object-cover" />
      <p class="text-gray-800 font-medium leading-tight">{{ item.name }}</p>
    </div>

    <!-- Price -->
    <p class="text-center font-semibold text-gray-800">${{ item.price.toFixed(2) }}</p>

    <!-- Quantity -->
    <div class="flex justify-center">
      <div class="flex items-center border border-gray-300 rounded-full overflow-hidden">
        <button @click="decreaseQty" class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100">
            −
        </button>
        <div class="px-4 border-x border-gray-300 text-gray-800 font-semibold select-none">
            {{ quantity }}
        </div>
        <button @click="increaseQty" class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100">
            +
        </button>
      </div>
    </div>

    <!-- Subtotal -->
    <p class="text-center font-semibold text-gray-800"> ${{ (item.price * quantity).toFixed(2) }} </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const props = defineProps<{ item: CartItem }>()
const emit = defineEmits(['update-quantity', 'remove-item'])

const quantity = ref(props.item.quantity)

watch(quantity, (newQty) => {
  emit('update-quantity', props.item.id, newQty)
})

function increaseQty() {
  quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}
</script>
