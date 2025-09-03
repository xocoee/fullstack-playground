import { create } from "zustand";
import axios from "axios";



interface ItemsStore {
  items: any[];
  loading: boolean;
  fetchItems: () => Promise<void>;
  addItem: (item: any) => Promise<void>;
}

export const useItemsStore = create<ItemsStore>((set) => ({
  items: [],
  loading: false,

  fetchItems: async () => {
    try {
      set({ loading: true });
      const response = await axios.get<any[]>("http://localhost:3000/fish");
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
      const response = await axios.post<any>(
        "http://localhost:3000/fish",
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
