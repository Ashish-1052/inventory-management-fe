import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";

export function useApiQuery<TData>(
  queryKey: string[],
  queryFn: (token: string) => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, Error>,
    "queryKey" | "queryFn"
  >
) {
  const token = useAuthStore((s) => s.token);
  console.log('token', token);

  return useQuery<TData>({
    queryKey,
    queryFn: () => queryFn(token!),
    enabled: !!token && (options?.enabled ?? true),
    ...options,
  });
}
