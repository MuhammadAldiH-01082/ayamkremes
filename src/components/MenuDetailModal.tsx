import React, { useState } from 'react';
import { MenuItem, Variation } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  Flame, 
  CheckCircle2, 
  Package, 
  Users, 
  Sparkles, 
  X, 
  Plus, 
  Minus,
  Check
} from 'lucide-react';

interface MenuDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuDetailModal({ item, isOpen, onClose }: MenuDetailModalProps) {
  const { addToCart, openCart } = useCart();
  const { user, requireAuth } = useAuth();
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Reset state when opening a new item
  React.useEffect(() => {
    if (item) {
      setSelectedVariation(item.variations && item.variations.length > 0 ? item.variations[0] : undefined);
      setQuantity(1);
      setNotes('');
    }
  }, [item, isOpen]);

  if (!item) return null;

  const currentPrice = selectedVariation ? selectedVariation.price : item.price;
  const subtotal = currentPrice * quantity;

  const handleAddAndClose = () => {
    if (!user) {
      requireAuth(() => {
        addToCart(item, selectedVariation, quantity, notes.trim() || undefined);
        onClose();
      }, 'Silakan masuk terlebih dahulu untuk menambahkan menu ke keranjang.');
      return;
    }
    addToCart(item, selectedVariation, quantity, notes.trim() || undefined);
    onClose();
  };

  const handleAddAndOpenCart = () => {
    if (!user) {
      requireAuth(() => {
        addToCart(item, selectedVariation, quantity, notes.trim() || undefined);
        onClose();
        openCart();
      }, 'Silakan masuk terlebih dahulu untuk menambahkan menu dan membuka keranjang.');
      return;
    }
    addToCart(item, selectedVariation, quantity, notes.trim() || undefined);
    onClose();
    openCart();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-[#FAF4E8] rounded-3xl border-2 border-[#231F20]/20 shadow-2xl text-[#231F20]">
        
        {/* Top Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-white flex items-center justify-center">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#FAF4E8] flex items-center justify-center text-4xl">🍗</div>
          )}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-[#231F20]/60 text-white hover:bg-[#231F20] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between bg-black/70 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-white/20 text-white">
            <div>
              <span className="inline-block px-3 py-0.5 bg-[#FEBD11] text-[#231F20] text-[10px] font-display font-black uppercase rounded-full mb-1">
                {item.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-black uppercase leading-tight text-white">
                {item.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-300 block uppercase font-bold">Harga</span>
              <span className="text-xl sm:text-2xl font-display font-black text-[#FEBD11]">
                Rp{currentPrice.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {item.badge && (
              <span className="bg-[#FEBD11]/20 text-[#78350F] border border-[#FEBD11]/50 text-xs font-display font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {item.badge}
              </span>
            )}
            {item.portion && (
              <span className="bg-white text-[#231F20] border-2 border-[#231F20]/10 text-xs font-display font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#78716C]" />
                Porsi: {item.portion}
              </span>
            )}
            {typeof item.spiceLevel === 'number' && item.spiceLevel > 0 && (
              <span className="bg-red-100 text-red-700 border border-red-200 text-xs font-display font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Pedas: {item.spiceLevel}/5
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-display font-black uppercase tracking-wider text-stone-500 mb-1.5">
              Deskripsi Sajian & Rasa
            </h3>
            <p className="text-[#574B45] text-sm sm:text-base leading-relaxed font-medium">
              {item.description}
            </p>
          </div>

          {/* Included Items */}
          {item.includes && item.includes.length > 0 && (
            <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#231F20]/10 space-y-2.5">
              <h3 className="text-xs font-display font-black uppercase tracking-wider text-[#231F20] flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#FF5E14]" />
                Kelengkapan & Isi Paket
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.includes.map((inc, idx) => (
                  <div key={idx} className="flex items-start text-xs sm:text-sm text-[#574B45] gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#7BA03C] flex-shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Variations Selection */}
          {item.variations && item.variations.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-display font-black uppercase tracking-wider text-stone-600">
                Pilih Varian / Potongan:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.variations.map((v, idx) => {
                  const isSelected = selectedVariation?.name === v.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedVariation(v)}
                      className={`p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#FF5E14] bg-[#FF5E14]/10 shadow-xs' 
                          : 'border-[#231F20]/10 bg-white hover:bg-[#FAF4E8]'
                      }`}
                    >
                      <div>
                        <p className="font-display font-bold text-xs uppercase text-[#231F20]">{v.name}</p>
                        <p className="text-xs font-bold text-[#FF5E14]">Rp{v.price.toLocaleString('id-ID')}</p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#FF5E14] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Notes in Detail Modal */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#231F20]/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-display font-black uppercase text-[#231F20]">
                Jumlah Porsi
              </span>
              <div className="flex items-center gap-2 bg-[#FAF4E8] p-1.5 rounded-xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-[#231F20] hover:bg-stone-100 flex items-center justify-center border border-stone-200 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-display font-black text-sm text-[#231F20]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-[#FF5E14] text-white hover:bg-[#E04F00] flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">
                Catatan Khusus untuk Menu Ini (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Sambal dipisah, minta kremesan garing ekstra..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#FAF4E8] border border-stone-200 text-xs focus:outline-none focus:border-[#FF5E14]"
              />
            </div>
          </div>

          {/* Subtotal & Cart Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 uppercase font-bold block">Subtotal</span>
              <span className="text-xl font-display font-black text-[#FF5E14]">
                Rp{subtotal.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                onClick={handleAddAndClose}
                className="flex-1 sm:flex-initial h-12 bg-[#231F20] hover:bg-black text-white rounded-full font-display font-black text-xs uppercase tracking-wider px-5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                + Ke Keranjang
              </Button>

              <Button
                type="button"
                onClick={handleAddAndOpenCart}
                className="flex-1 sm:flex-initial h-12 bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-full font-display font-black text-xs uppercase tracking-wider px-6 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Buka Keranjang
              </Button>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
