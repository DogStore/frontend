import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "@/types/Product";

export interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref<CartItem[]>([]);

  /* ------------------ Persistence ------------------ */

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  }

  function loadFromStorage() {
    cartItems.value = JSON.parse(localStorage.getItem("cart") || "[]");
  }

  /* ------------------ GETTERS ------------------ */

  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalItems = computed(() => cartCount.value);

  const subtotal = computed(() =>
    cartItems.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  );

  const delivery = computed(() =>
    totalItems.value === 0 ? 0 : subtotal.value > 50 ? 0 : 5
  );

  const taxes = computed(() =>
    totalItems.value === 0 ? 0 : subtotal.value * 0.05
  );

  const discount = computed(() => 0);

  const total = computed(() =>
    totalItems.value === 0
      ? 0
      : subtotal.value + delivery.value + taxes.value - discount.value
  );

  /* ------------------ ACTIONS ------------------ */

  function addToCart(product: Product) {
    const existing = cartItems.value.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }

    saveCart();
  }

  function increaseQuantity(productId: string) {
    const item = cartItems.value.find(p => p.id === productId);
    if (!item) return;

    item.quantity += 1;
    saveCart();
  }

  function decreaseQuantity(productId: string) {
    const item = cartItems.value.find(p => p.id === productId);
    if (!item || item.quantity === 1) return;

    item.quantity -= 1;
    saveCart();
  }

  function removeFromCart(productId: string) {
    cartItems.value = cartItems.value.filter(p => p.id !== productId);
    saveCart();
  }

  function clearCart() {
    cartItems.value = [];
    saveCart();
  }

  /* ------------------ INIT ------------------ */
  loadFromStorage();

  return {
    // state
    cartItems,

    // getters
    cartCount,
    totalItems,
    subtotal,
    delivery,
    taxes,
    discount,
    total,

    // actions
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };
});
