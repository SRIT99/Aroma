import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart';
import toast from 'react-hot-toast';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            const updatedItems = state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
            toast.success(`Updated ${item.name} quantity`);
            return { items: updatedItems };
          }
          
          toast.success(`Added ${item.name} to cart`);
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (id: string) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            toast.success(`Removed ${item.name} from cart`);
          }
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        });
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity, totalPrice: item.price * quantity }
              : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },
      
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total: number, item: CartItem) => total + item.totalPrice, 0);
      },
    }),
    {
      name: 'aroma-cart',
      partialize: (state: CartStore) => ({ items: state.items }),
    }
  )
);