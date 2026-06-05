import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./demo-data";

type CartItem = { product: Product; qty: number };

type StoreState = {
  cart: CartItem[];
  wishlist: Product[];
  theme: "light" | "dark";
  notifications: { id: string; title: string; body: string; time: string; read: boolean }[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (p: Product) => void;
  toggleTheme: () => void;
  markAllRead: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      theme: "light",
      notifications: [
        { id: "n1", title: "Order shipped", body: "Order ORD-10003 is on the way.", time: "2h ago", read: false },
        { id: "n2", title: "New message", body: "TechHub India replied to your query.", time: "5h ago", read: false },
        { id: "n3", title: "Price drop", body: "An item in your wishlist is now cheaper.", time: "1d ago", read: false },
      ],
      addToCart: (p, qty = 1) => {
        const existing = get().cart.find((c) => c.product.id === p.id);
        if (existing) {
          set({ cart: get().cart.map((c) => c.product.id === p.id ? { ...c, qty: c.qty + qty } : c) });
        } else {
          set({ cart: [...get().cart, { product: p, qty }] });
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((c) => c.product.id !== id) }),
      updateQty: (id, qty) => set({ cart: get().cart.map((c) => c.product.id === id ? { ...c, qty: Math.max(1, qty) } : c) }),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (p) => {
        const has = get().wishlist.some((w) => w.id === p.id);
        set({ wishlist: has ? get().wishlist.filter((w) => w.id !== p.id) : [...get().wishlist, p] });
      },
      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        set({ theme: next });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", next === "dark");
        }
      },
      markAllRead: () => set({ notifications: get().notifications.map((n) => ({ ...n, read: true })) }),
    }),
    { name: "marketplace-store" }
  )
);

export const cartTotal = (cart: CartItem[]) => cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
export const cartCount = (cart: CartItem[]) => cart.reduce((sum, c) => sum + c.qty, 0);
