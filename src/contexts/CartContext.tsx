import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Variation } from '@/types';
import { CONTACT_INFO } from '@/data/defaultCatalogue';
import { toast } from 'sonner';

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryType: 'Antar ke Alamat (Delivery)' | 'Ambil Sendiri di Dapur (Pick Up)';
  notes?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (menu: MenuItem, variation?: Variation, quantity?: number, itemNotes?: string) => void;
  updateQuantity: (id: string, quantity: number, variationName?: string) => void;
  updateItemNotes: (id: string, notes: string, variationName?: string) => void;
  removeFromCart: (id: string, variationName?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addedAnimationKey: number;
  lastAddedItem: { name: string; quantity: number } | null;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  checkoutToWhatsApp: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'akj_cart_items_v2';
const CUSTOMER_STORAGE_KEY = 'akj_customer_details_v2';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedAnimationKey, setAddedAnimationKey] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState<{ name: string; quantity: number } | null>(null);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        name: '',
        phone: '',
        address: '',
        deliveryDate: new Date().toISOString().split('T')[0],
        deliveryTime: '12:00',
        deliveryType: 'Antar ke Alamat (Delivery)',
        notes: ''
      };
    } catch {
      return {
        name: '',
        phone: '',
        address: '',
        deliveryDate: new Date().toISOString().split('T')[0],
        deliveryTime: '12:00',
        deliveryType: 'Antar ke Alamat (Delivery)',
        notes: ''
      };
    }
  });

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save customer details
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails));
    } catch (e) {
      console.error(e);
    }
  }, [customerDetails]);

  const addToCart = (
    menu: MenuItem, 
    variation?: Variation, 
    quantity: number = 1, 
    itemNotes?: string
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === menu.id && item.selectedVariation?.name === variation?.name
      );
      
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        updated[existingIndex] = {
          ...current,
          quantity: current.quantity + quantity,
          itemNotes: itemNotes || current.itemNotes
        };
        return updated;
      }
      
      return [...prev, { 
        ...menu, 
        selectedVariation: variation, 
        quantity,
        itemNotes
      }];
    });

    const itemLabel = variation ? `${menu.name} (${variation.name})` : menu.name;
    setAddedAnimationKey(prev => prev + 1);
    setLastAddedItem({ name: itemLabel, quantity });
    
    toast.success(`+${quantity} ${itemLabel} dimasukkan ke keranjang!`, {
      action: {
        label: 'Buka Keranjang',
        onClick: () => setIsCartOpen(true),
      }
    });
  };

  const updateQuantity = (id: string, quantity: number, variationName?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, variationName);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedVariation?.name === variationName) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const updateItemNotes = (id: string, notes: string, variationName?: string) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedVariation?.name === variationName) {
        return { ...item, itemNotes: notes };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string, variationName?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedVariation?.name === variationName)));
    toast.info('Item dihapus dari keranjang');
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => {
    const price = item.selectedVariation ? item.selectedVariation.price : item.price;
    return acc + (price * item.quantity);
  }, 0);

  const checkoutToWhatsApp = (): boolean => {
    if (cart.length === 0) {
      toast.error('Keranjang belanja Anda masih kosong!');
      return false;
    }

    if (!customerDetails.name.trim()) {
      toast.error('Silakan isi Nama Pemesan di keranjang.');
      return false;
    }

    if (customerDetails.deliveryType.includes('Antar') && !customerDetails.address.trim()) {
      toast.error('Silakan isi Alamat Pengantaran di keranjang.');
      return false;
    }

    // Build message
    const orderItemsText = cart.map((item, index) => {
      const price = item.selectedVariation ? item.selectedVariation.price : item.price;
      const subtotal = price * item.quantity;
      const varText = item.selectedVariation ? ` (${item.selectedVariation.name})` : '';
      const notesText = item.itemNotes ? `\n   ↳ Catatan: _${item.itemNotes}_` : '';
      return `${index + 1}. *${item.name}${varText}*\n   ${item.quantity} porsi x Rp${price.toLocaleString('id-ID')} = *Rp${subtotal.toLocaleString('id-ID')}*${notesText}`;
    }).join('\n\n');

    const message = `Halo *${CONTACT_INFO.brandName}*, saya ingin pesan menu dari website resmi:

📋 *RINCIAN PESANAN:*
-------------------------------------------
${orderItemsText}

-------------------------------------------
💰 *TOTAL HARGA*: *Rp${totalPrice.toLocaleString('id-ID')}*
-------------------------------------------

👤 *DATA PEMESAN & PENGANTARAN:*
• *Nama*: ${customerDetails.name}
• *No. WhatsApp*: ${customerDetails.phone || '-'}
• *Metode*: ${customerDetails.deliveryType}
${customerDetails.deliveryType.includes('Antar') ? `• *Alamat Pengantaran*: ${customerDetails.address}` : ''}
• *Tanggal*: ${customerDetails.deliveryDate}
• *Jam*: ${customerDetails.deliveryTime} WIB
${customerDetails.notes ? `• *Catatan Tambahan*: ${customerDetails.notes}` : ''}

Mohon konfirmasi ketersediaan & ongkirnya ya kak. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encoded}`, '_blank');
    return true;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      updateItemNotes,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
      openCart,
      closeCart,
      addedAnimationKey,
      lastAddedItem,
      customerDetails,
      setCustomerDetails,
      checkoutToWhatsApp
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
