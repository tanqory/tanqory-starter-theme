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

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === product.id);

          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: CartItem = {
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              quantity,
            };
            newItems = [...state.items, newItem];
          }

          const subtotal = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            items: newItems,
            subtotal,
            total: subtotal - state.discount + state.shipping,
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.productId !== productId);
          const subtotal = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            items: newItems,
            subtotal,
            total: subtotal - state.discount + state.shipping,
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
            item.productId === productId ? { ...item, quantity } : item
          );

          const subtotal = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            items: newItems,
            subtotal,
            total: subtotal - state.discount + state.shipping,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          subtotal: 0,
          discount: 0,
          shipping: 0,
          total: 0,
        });
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
