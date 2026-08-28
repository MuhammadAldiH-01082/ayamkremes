import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingCartButton() {
  const { totalItems, totalPrice, openCart, addedAnimationKey, lastAddedItem } = useCart();
  const { user, requireAuth } = useAuth();
  const [showItemToast, setShowItemToast] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Trigger bounce & toast animation when an item is added
  useEffect(() => {
    if (addedAnimationKey > 0 && lastAddedItem) {
      setShowItemToast(true);
      setIsBouncing(true);
      
      const timer = setTimeout(() => {
        setShowItemToast(false);
        setIsBouncing(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [addedAnimationKey]);

  if (totalItems === 0) return null;

  const handleClick = () => {
    if (!user) {
      requireAuth(() => openCart(), 'Silakan masuk atau daftar terlebih dahulu untuk melihat keranjang & menyelesaikan pesanan.');
      return;
    }
    openCart();
  };

  return (
    <aside 
      aria-label="Keranjang Pesanan Menu"
      className="fixed bottom-24 right-6 z-40 flex flex-col items-end pointer-events-none"
    >
      {/* Floating Animated Added Pill Notification */}
      <AnimatePresence>
        {showItemToast && lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mb-2 pointer-events-auto bg-[#231F20] text-white px-3.5 py-2 rounded-2xl shadow-2xl border-2 border-[#FEBD11] flex items-center gap-2 max-w-xs"
          >
            <div className="w-5 h-5 rounded-full bg-[#FEBD11] text-[#231F20] flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <div className="text-[11px] leading-tight font-medium truncate">
              <span className="font-display font-black text-[#FEBD11] uppercase">+ {lastAddedItem.quantity} </span>
              <span className="text-white font-bold">{lastAddedItem.name}</span>
              <span className="block text-[10px] text-stone-300">masuk ke keranjang</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-[#FEBD11] animate-pulse flex-shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Cart Button on Right */}
      <motion.button
        id="floating-cart-button"
        onClick={handleClick}
        animate={isBouncing ? {
          scale: [1, 1.12, 0.95, 1.05, 1],
          rotate: [0, -4, 4, -2, 0],
        } : { scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto bg-[#231F20] hover:bg-black text-white px-4 py-3 rounded-full shadow-2xl border-2 border-[#FEBD11] flex items-center gap-3 transition-colors cursor-pointer group"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#FF5E14] text-white flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <motion.span 
            key={totalItems}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 bg-[#FEBD11] text-[#231F20] text-[11px] font-display font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#231F20] shadow-sm"
          >
            {totalItems}
          </motion.span>
        </div>

        <div className="text-left pr-1">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-display font-black uppercase text-[#FEBD11] block leading-tight">
              Keranjang Menu
            </span>
          </div>
          <span className="text-xs font-display font-black text-white">
            Rp{totalPrice.toLocaleString('id-ID')}
          </span>
        </div>
      </motion.button>
    </aside>
  );
}
