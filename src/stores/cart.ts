import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartState extends Cart {
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  // Computed
  getItemCount: () => number;
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          let newItems: CartItem[];

          if (existingItemIndex >= 0) {
            newItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: CartItem = {
              product,
              quantity,
            };
            newItems = [...state.items, newItem];
          }

          return {
            items: newItems,
            ...calculateTotals(newItems),
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.product.id !== productId
          );
          return {
            items: newItems,
            ...calculateTotals(newItems),
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            ...calculateTotals(newItems),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      getItemCount: () => {
        return get().totalItems;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
