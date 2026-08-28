import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';
import { useAuth } from '@/contexts/AuthContext';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickText, setQuickText] = useState('Halo kak, saya ingin tanya info katering & pricelist menu Ayam Kremes Jakarta...');
  const { userProfile } = useAuth();

  const handleSend = () => {
    const sender = userProfile?.displayName ? ` (dari ${userProfile.displayName})` : '';
    const fullText = `${quickText}${sender}`;
    const encoded = encodeURIComponent(fullText);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <aside 
      aria-label="Kontak WhatsApp Katering"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
    >
      {/* Mini Chat Bubble Popover */}
      {isOpen && (
        <div 
          id="whatsapp-chat-popover"
          className="mb-3 w-80 bg-[#FAF4E8] rounded-3xl shadow-2xl border-2 border-[#231F20]/20 overflow-hidden animate-in slide-in-from-bottom-4 duration-200 text-[#231F20]"
        >
          {/* Popover Header */}
          <div className="bg-[#231F20] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold shadow-xs">
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#FEBD11] border-2 border-[#231F20]" />
              </div>
              <div>
                <h4 className="text-sm font-display font-black leading-tight uppercase text-white">{CONTACT_INFO.brandName}</h4>
                <p className="text-[10px] text-[#FEBD11] font-bold">Konsultasi Katering & CS Online</p>
              </div>
            </div>
            <button
              id="close-whatsapp-popover"
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Popover Body */}
          <div className="p-4 space-y-3 bg-[#FAF4E8] text-xs">
            <div className="bg-white p-3 rounded-2xl border-2 border-[#231F20]/10 text-[#574B45] leading-relaxed font-medium">
              👋 <strong>Halo!</strong> Mau tanya seputar katering nasi kotak, prasmanan kantor, atau tumpeng untuk acara Anda?
            </div>

            <textarea
              id="whatsapp-quick-message-input"
              rows={3}
              value={quickText}
              onChange={(e) => setQuickText(e.target.value)}
              className="w-full p-2.5 bg-white border-2 border-[#231F20]/10 rounded-2xl text-xs focus:border-[#FF5E14] focus:outline-none text-[#231F20] resize-none"
              placeholder="Tulis pesan Anda..."
            />

            <button
              id="send-whatsapp-button"
              onClick={handleSend}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-black py-3 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat WhatsApp Katering</span>
              <Send className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 relative group cursor-pointer border-2 border-white"
        aria-label="Konsultasi WhatsApp Katering"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FEBD11] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FEBD11]"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </aside>
  );
}
