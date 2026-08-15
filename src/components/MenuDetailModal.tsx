import React from 'react';
import { MenuItem } from '@/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MessageCircle, Flame, CheckCircle2, Package, Users, Sparkles, X } from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

interface MenuDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuDetailModal({ item, isOpen, onClose }: MenuDetailModalProps) {
  if (!item) return null;

  const handleWhatsAppOrder = (variationName?: string) => {
    const varText = variationName ? ` (Pilihan: ${variationName})` : '';
    const message = `Halo ${CONTACT_INFO.brandName}, saya ingin tanya dan pesan menu *${item.name}*${varText} seharga Rp${(item.price).toLocaleString('id-ID')}. Mohon info ketersediaan dan cara pemesanannya ya. Terima kasih!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encoded}`, '_blank');
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

          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between bg-black/60 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-white/20 text-white">
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
                Rp{item.price.toLocaleString('id-ID')}
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
            <h3 className="text-xs font-display font-black uppercase tracking-wider text-[#78716C] mb-1.5">
              Deskripsi Sajian & Rasa
            </h3>
            <p className="text-[#574B45] text-sm sm:text-base leading-relaxed font-medium">
              {item.description}
            </p>
          </div>

          {/* Included Items */}
          {item.includes && item.includes.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border-2 border-[#231F20]/10 space-y-3">
              <h3 className="text-xs font-display font-black uppercase tracking-wider text-[#231F20] flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#FF5E14]" />
                Kelengkapan & Isi Paket
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.includes.map((inc, idx) => (
                  <div key={idx} className="flex items-start text-xs sm:text-sm text-[#574B45] gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#88AB58] flex-shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Variations */}
          {item.variations && item.variations.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-display font-black uppercase tracking-wider text-[#78716C]">
                Pilihan Variasi / Porsi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.variations.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border-2 border-[#231F20]/10 hover:border-[#FF5E14] bg-white transition-all flex items-center justify-between"
                  >
                    <div>
                      <p className="font-display font-bold text-[#231F20] text-xs uppercase">{v.name}</p>
                      <p className="text-[#FF5E14] font-display font-black text-sm">
                        Rp{v.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <button
                      onClick={() => handleWhatsAppOrder(v.name)}
                      className="px-3 py-1.5 rounded-full bg-[#FAF4E8] hover:bg-[#FF5E14] hover:text-white text-[#231F20] text-xs font-display font-bold uppercase transition-colors cursor-pointer"
                    >
                      Pilih
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-4 border-t border-[#E8DFC8] flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="text-xs text-[#78716C] text-center sm:text-left font-medium">
              💬 Pemesanan harian atau katering acara siap dibantu via WhatsApp.
            </div>
            <button
              onClick={() => handleWhatsAppOrder()}
              className="w-full sm:w-auto bg-[#FF5E14] hover:bg-[#E04F00] text-white font-display font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pesan via WhatsApp</span>
            </button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
