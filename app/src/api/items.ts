import { api } from "./client";

export const fetchItems = async () => {
  const res = await api.get("/items");
  return res.data;
};

export const addItem = async (item: { name: string; sku: string; quantity: number; minQuantity: number }) => {
  const res = await api.post("/items", item);
  return res.data;
};
