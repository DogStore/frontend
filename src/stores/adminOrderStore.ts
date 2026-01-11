import { defineStore } from "pinia";
import { ref } from "vue";
import type { Order } from "@/types/order";
import {
  fetchAdminOrders,
  fetchAdminOrderById,
  updateOrderStatus
} from "@/services/Order.service";

export const useAdminOrderStore = defineStore("adminOrder", () => {
  const orders = ref<Order[]>([]);
  const selectedOrder = ref<Order | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Load all orders
  async function loadOrders() {
    loading.value = true;
    error.value = null;
    try {
      orders.value = await fetchAdminOrders();
    } catch (err) {
      error.value = "Failed to load orders";
    } finally {
      loading.value = false;
    }
  }

  // Load single order (detail page)
  async function loadOrder(id: string) {
    loading.value = true;
    error.value = null;
    try {
      selectedOrder.value = await fetchAdminOrderById(id);
    } catch (err) {
      error.value = "Failed to load order";
    } finally {
      loading.value = false;
    }
  }

  // Update status
  async function changeStatus(id: string, status: Order["status"]) {
    await updateOrderStatus(id, status);

    // update locally instead of refetch
    const order = orders.value.find(o => o._id === id);
    if (order) order.status = status;

    if (selectedOrder.value?._id === id) {
      selectedOrder.value.status = status;
    }
  }

  return {
    orders,
    selectedOrder,
    loading,
    error,
    loadOrders,
    loadOrder,
    changeStatus,
  };
});
