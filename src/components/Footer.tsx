import React from 'react';
import { UtensilsCrossed, MessageCircle, MapPin, Phone, Mail, Instagram, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#231F20] text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5E14] flex items-center justify-center text-white shadow-sm">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-display font-black text-white tracking-tight uppercase">
                AYAM KREMES <span className="text-[#FEBD11]">JAKARTA</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed font-normal">
              Katalog resmi aneka olahan ayam kremes gurih, ayam bakar bumbu madu, nasi kuning bento, dan tumpeng tampah istimewa untuk santapan harian dan katering terpercaya se-Jabodetabek.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={CONTACT_INFO.socialMedia.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-stone-300 hover:text-[#88AB58] hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-display font-black uppercase tracking-widest text-[#FEBD11]">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm text-stone-400 font-medium">
              <li>
                <button onClick={() => scrollToSection('kategori')} className="hover:text-white transition-colors cursor-pointer">
                  Kategori Utama
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('katalog')} className="hover:text-white transition-colors cursor-pointer">
                  Katalog Menu Lengkap
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('katering')} className="hover:text-white transition-colors cursor-pointer">
                  Paket Katering & Bento
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('keunggulan')} className="hover:text-white transition-colors cursor-pointer">
                  Rahasia Gurih Rempah
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('lokasi')} className="hover:text-white transition-colors cursor-pointer">
                  Lokasi Outlet & Kontak
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Tanya Jawab (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Hub Summary */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-display font-black uppercase tracking-widest text-[#FEBD11]">
              Dapur & Layanan Pelanggan
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF5E14] flex-shrink-0 mt-1" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF5E14] flex-shrink-0" />
                <span>Hotline: {CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF5E14] flex-shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </div>
              <div className="pt-2 text-xs text-stone-500">
                🕒 Jam Buka: 08.00 - 21.00 WIB | Katering WA Fast Response
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {CONTACT_INFO.brandName}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#88AB58] font-bold">100% Halal & Higienis</span>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors cursor-pointer font-bold"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
