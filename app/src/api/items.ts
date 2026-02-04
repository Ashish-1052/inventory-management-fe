import { api } from "./client";

export const fetchItems = async (token: string) => {
  const res = await api.get("/items", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
