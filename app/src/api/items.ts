import { api } from "./client";

export const fetchItems = async () => {
  const res = await api.get("/items");
  return res.data;
};
