import { create } from 'zustand';
import type { Product } from '@/api/productApi';
import { productApi } from '@/api/productApi';

interface WishlistState {
  items: Product[];
  count: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  loadFromStorage: () => void;
}

const STORAGE_KEY = 'madhuvan_wishlist';

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  count: 0,

  addItem: (product) => {
    const { items } = get();
    if (items.find((i) => i.id === product.id)) return;
    const updated = [...items, product];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated, count: updated.length });
    productApi.incrementWishlist(product.id).catch(() => {});
  },

  removeItem: (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ items: updated, count: updated.length });
  },

  isInWishlist: (id) => get().items.some((i) => i.id === id),

  loadFromStorage: () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      set({ items: data, count: data.length });
    } catch {
      set({ items: [], count: 0 });
    }
  },
}));
