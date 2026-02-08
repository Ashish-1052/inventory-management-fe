import { fetchItems } from "../api/items";
import { useApiQuery } from "./useApiQuery";

export const useItems = () => {
  return useApiQuery(["items"], fetchItems, {
    staleTime: 1000 * 60,
  });
}
