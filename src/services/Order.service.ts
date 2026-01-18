import { adminApi, publicApi } from "@/services/api";
import type { Order } from "@/types/order";

/* USER */
export const createOrder = (payload: any) => {
  return publicApi.post("/orders", payload);
};

/* ADMIN */
export const fetchAdminOrders = async (): Promise<Order[]> => {
  const res = await adminApi.get("/admin/orders");
  return res.data.orders;
};

export const fetchAdminOrderById = async (id: string): Promise<Order> => {
  const res = await adminApi.get(`/admin/orders/${id}`);
  return res.data.order;
};

export const updateOrderStatus = async (
  id: string,
  status: Order["status"]
) => {
  await adminApi.put(`/admin/orders/${id}`, { status });
};
