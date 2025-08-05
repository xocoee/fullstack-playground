import { create } from "zustand";
import axios from "axios";

interface Item {
  id: number;
  name: string;
}

interface ItemsStore {
  items: Item[];
  loading: boolean;
  fetchItems: () => Promise<void>;
  addItem: (item: Item) => Promise<void>;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  items: [],
  loading: false,
  fetchItems: async () => {
    try {
      set({ loading: true });
      const response = await axios.get<Item[]>("http://localhost:3000/items");
      set({ items: response.data });
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (newItem) => {
    try {
      set({ loading: true });
      const response = await axios.post<Item>(
        "http://localhost:3000/items",
        newItem
      );
      set((state) => ({ items: [...state.items, response.data] }));
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
