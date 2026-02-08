import { api } from "./client";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export const login = async ({email, password}: {email: string, password: string}) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const register = async ({name, email, password}: RegisterPayload) => {
  const res = await api.post("/auth/register", {name, email, password});
  return res.data;
};