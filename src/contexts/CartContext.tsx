import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Variation } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (menu: MenuItem, variation?: Variation) => void;
  removeFromCart: (id: string, variationName?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (menu: MenuItem, variation?: Variation) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === menu.id && item.selectedVariation?.name === variation?.name
      );
      
      if (existing) {
        return prev.map(item => 
          (item.id === menu.id && item.selectedVariation?.name === variation?.name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { ...menu, selectedVariation: variation, quantity: 1 }];
    });
    toast.success(`${menu.name} ditambahkan ke keranjang`);
  };

  const removeFromCart = (id: string, variationName?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedVariation?.name === variationName)));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => {
    const price = item.selectedVariation ? item.selectedVariation.price : item.price;
    return acc + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
