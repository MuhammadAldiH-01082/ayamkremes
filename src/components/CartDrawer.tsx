import React, { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  X, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  FileText,
  Truck,
  Store,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    updateItemNotes,
    removeFromCart, 
    clearCart,
    totalItems, 
    totalPrice,
    customerDetails,
    setCustomerDetails,
    checkoutToWhatsApp
  } = useCart();

  const { userProfile } = useAuth();

  // Pre-fill user data if available
  useEffect(() => {
    if (userProfile) {
      setCustomerDetails(prev => ({
        ...prev,
        name: prev.name || userProfile.displayName || '',
        phone: prev.phone || userProfile.phone || '',
        address: prev.address || userProfile.address || ''
      }));
    }
  }, [userProfile, setCustomerDetails]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const success = checkoutToWhatsApp();
    if (success) {
      closeCart();
    }
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden bg-[#FAF4E8] rounded-3xl border-2 border-[#231F20]/20 shadow-2xl text-[#231F20] max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#231F20] text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF5E14] text-white flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-display font-black uppercase text-white tracking-tight">
                  KERANJANG PESANAN
                </h2>
                <span className="bg-[#FEBD11] text-[#231F20] text-[10px] font-display font-black px-2 py-0.5 rounded-full">
                  {totalItems} Item
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Pilih menu favorit lalu kirim pesanan otomatis ke WhatsApp kami
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-white/10 text-stone-300 hover:text-white hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        {cart.length === 0 ? (
          <div className="p-8 sm:p-12 text-center flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-white border-2 border-[#231F20]/10 flex items-center justify-center text-4xl shadow-xs">
              🛒
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="text-lg font-display font-black uppercase text-[#231F20]">
                Keranjang Belanja Masih Kosong
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Silakan pilih paket ayam kremes, bento, atau hidangan favorit Anda dari katalog menu dan tambahkan ke keranjang.
              </p>
            </div>
            <Button
              onClick={closeCart}
              className="bg-[#FF5E14] hover:bg-[#E04F00] text-white rounded-full font-display font-black text-xs uppercase tracking-wider px-6 h-11 shadow-sm mt-2 cursor-pointer"
            >
              Lihat Katalog Menu
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* List of Cart Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#231F20]/10">
                <span className="text-xs font-display font-black uppercase text-stone-600">
                  Daftar Pilihan Menu ({totalItems})
                </span>
                <button
                  onClick={clearCart}
                  className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Kosongkan
                </button>
              </div>

              {cart.map((item, idx) => {
                const itemPrice = item.selectedVariation ? item.selectedVariation.price : item.price;
                const subtotal = itemPrice * item.quantity;

                return (
                  <div 
                    key={`${item.id}-${item.selectedVariation?.name || 'def'}-${idx}`}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-[#231F20]/10 space-y-2.5 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-[#FAF4E8] overflow-hidden flex-shrink-0 border border-stone-200 flex items-center justify-center">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">🍗</span>
                        )}
                      </div>

                      {/* Info & Subtotal */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display font-black text-sm uppercase text-[#231F20] truncate">
                              {item.name}
                            </h4>
                            {item.selectedVariation && (
                              <span className="inline-block text-[10px] bg-[#FEBD11]/20 text-[#78350F] font-bold px-2 py-0.5 rounded-full mt-0.5">
                                {item.selectedVariation.name}
                              </span>
                            )}
                          </div>
                          <span className="font-display font-black text-sm text-[#FF5E14] flex-shrink-0">
                            Rp{subtotal.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <p className="text-[11px] text-stone-500 mt-0.5">
                          @ Rp{itemPrice.toLocaleString('id-ID')} / porsi
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Notes Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 bg-[#FAF4E8] p-1 rounded-xl border border-stone-200 w-fit">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariation?.name)}
                          className="w-7 h-7 rounded-lg bg-white text-[#231F20] hover:bg-stone-100 flex items-center justify-center border border-stone-200 cursor-pointer"
                          aria-label="Kurangi porsi"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-display font-black text-xs text-[#231F20]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariation?.name)}
                          className="w-7 h-7 rounded-lg bg-[#FF5E14] text-white hover:bg-[#E04F00] flex items-center justify-center cursor-pointer"
                          aria-label="Tambah porsi"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Note Input */}
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Catatan khusus (misal: sambal pisah)..."
                          value={item.itemNotes || ''}
                          onChange={(e) => updateItemNotes(item.id, e.target.value, item.selectedVariation?.name)}
                          className="w-full h-8 px-3 text-[11px] rounded-xl bg-[#FAF4E8] border border-stone-200 focus:outline-none focus:border-[#FF5E14]"
                        />
                      </div>

                      {/* Remove item */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.selectedVariation?.name)}
                        className="p-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer self-end sm:self-center"
                        title="Hapus menu ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customer Details Form for Checkout */}
            <form onSubmit={handleCheckout} id="cart-checkout-form" className="bg-white rounded-2xl p-5 border-2 border-[#231F20]/10 space-y-4">
              
              <div className="flex items-center gap-2 pb-1 border-b border-stone-100">
                <MapPin className="w-4 h-4 text-[#FF5E14]" />
                <h4 className="text-xs font-display font-black uppercase text-[#231F20]">
                  Informasi Pemesan & Pengantaran
                </h4>
              </div>

              {/* Delivery Method Choice */}
              <div>
                <Label className="text-xs font-bold text-[#231F20] mb-1.5 block">Metode Pesanan</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomerDetails(prev => ({ ...prev, deliveryType: 'Antar ke Alamat (Delivery)' }))}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      customerDetails.deliveryType.includes('Antar')
                        ? 'bg-[#FEBD11]/20 border-[#FF5E14] text-[#231F20]'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-[#FF5E14]" />
                    <span>Antar / Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomerDetails(prev => ({ ...prev, deliveryType: 'Ambil Sendiri di Dapur (Pick Up)' }))}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      customerDetails.deliveryType.includes('Ambil')
                        ? 'bg-[#FEBD11]/20 border-[#FF5E14] text-[#231F20]'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#7BA03C]" />
                    <span>Ambil di Dapur</span>
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-[11px] font-bold text-stone-700">Nama Pemesan *</Label>
                  <Input
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                    className="h-10 rounded-xl bg-[#FAF4E8] border-stone-200 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-[11px] font-bold text-stone-700">No. WhatsApp</Label>
                  <Input
                    placeholder="0812xxxx (Opsional)"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-10 rounded-xl bg-[#FAF4E8] border-stone-200 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Delivery Address if Delivery */}
              {customerDetails.deliveryType.includes('Antar') && (
                <div>
                  <Label className="text-[11px] font-bold text-stone-700">Alamat Lengkap Pengantaran *</Label>
                  <Input
                    required
                    placeholder="Jl. Nama Jalan, No. Rumah, Kelurahan, Jakarta..."
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                    className="h-10 rounded-xl bg-[#FAF4E8] border-stone-200 text-xs mt-1"
                  />
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-[11px] font-bold text-stone-700">Tanggal Pengantaran</Label>
                  <Input
                    type="date"
                    value={customerDetails.deliveryDate}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, deliveryDate: e.target.value }))}
                    className="h-10 rounded-xl bg-[#FAF4E8] border-stone-200 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-[11px] font-bold text-stone-700">Jam Tiba (WIB)</Label>
                  <Input
                    type="time"
                    value={customerDetails.deliveryTime}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, deliveryTime: e.target.value }))}
                    className="h-10 rounded-xl bg-[#FAF4E8] border-stone-200 text-xs mt-1"
                  />
                </div>
              </div>

              {/* General Order Notes */}
              <div>
                <Label className="text-[11px] font-bold text-stone-700">Catatan Khusus Pesanan</Label>
                <Input
                  placeholder="Contoh: Tolong siapkan sendok garpu plastik & kresek ekstra"
                  value={customerDetails.notes || ''}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                  className="h-10 rounded-xl bg-[#FAF4E8] border-stone-200 text-xs mt-1"
                />
              </div>

            </form>

          </div>
        )}

        {/* Footer Summary & WhatsApp Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#231F20]/10 flex-shrink-0 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold text-stone-500 block">Total Pesanan</span>
                <span className="text-xs text-[#7BA03C] font-bold">Belum termasuk ongkir via kurir</span>
              </div>
              <span className="text-2xl font-display font-black text-[#FF5E14]">
                Rp{totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <Button
              type="submit"
              form="cart-checkout-form"
              className="w-full h-12 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full font-display font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Kirim Pesanan ke WhatsApp Sekarang</span>
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
