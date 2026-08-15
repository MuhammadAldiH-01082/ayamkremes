import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Utensils, 
  MessageCircle, 
  Menu as MenuIcon, 
  X, 
  Sparkles,
  Lock
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

export default function Navbar() {
  const { login, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const message = `Halo ${CONTACT_INFO.brandName}, saya ingin pesan menu / konsultasi katering. Boleh minta info pricelist?`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF4E8] text-[#231F20] border-b border-[#E8DFC8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Playful Retro Style */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#FF5E14] text-white flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
              <Utensils className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-display font-black tracking-tight text-[#231F20] uppercase leading-none">
                Ayam Kremes <span className="text-[#FF5E14]">Jakarta</span>
              </div>
              <p className="text-[11px] font-script text-[#7BA03C] font-bold text-sm tracking-wide -mt-0.5">
                gurih & renyah sejak 2018
              </p>
            </div>
          </Link>

          {/* Clean Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 font-display font-bold text-sm text-[#4A3E39] uppercase tracking-wide">
            <button 
              onClick={() => scrollToSection('kategori')} 
              className="px-4 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors"
            >
              Kategori
            </button>
            <button 
              onClick={() => scrollToSection('katalog')} 
              className="px-4 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors"
            >
              Katalog Menu
            </button>
            <button 
              onClick={() => scrollToSection('katering')} 
              className="px-4 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors"
            >
              Katering & Bento
            </button>
            <button 
              onClick={() => scrollToSection('keunggulan')} 
              className="px-4 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors"
            >
              Tentang Kami
            </button>
            <button 
              onClick={() => scrollToSection('lokasi')} 
              className="px-4 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors"
            >
              Lokasi & Kontak
            </button>
          </nav>

          {/* Action Button - Big Punchy Pill */}
          <div className="hidden sm:flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full border-[#E8DFC8] bg-white text-[#231F20] hover:bg-[#F3ECE0] text-xs font-bold font-display"
                >
                  <Lock className="w-3.5 h-3.5 mr-1" />
                  Admin
                </Button>
              </Link>
            )}

            <button
              onClick={openWhatsApp}
              className="bg-[#FF5E14] hover:bg-[#E04F00] text-white font-display font-black px-6 py-3 text-sm rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 uppercase tracking-wider flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pesan via WA</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openWhatsApp}
              className="bg-[#FF5E14] text-white font-display font-bold px-3.5 py-2 text-xs rounded-full flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              WA
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-[#F3ECE0] text-[#231F20] hover:bg-[#E8DFC8]"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF4E8] border-t border-[#E8DFC8] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <button 
            onClick={() => scrollToSection('kategori')}
            className="w-full text-left px-4 py-3 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0]"
          >
            🍗 Kategori Pilihan
          </button>
          <button 
            onClick={() => scrollToSection('katalog')}
            className="w-full text-left px-4 py-3 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0]"
          >
            📋 Katalog Menu Lengkap
          </button>
          <button 
            onClick={() => scrollToSection('katering')}
            className="w-full text-left px-4 py-3 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0]"
          >
            🍱 Layanan Katering & Bento
          </button>
          <button 
            onClick={() => scrollToSection('keunggulan')}
            className="w-full text-left px-4 py-3 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0]"
          >
            ✨ Tentang & Resep Rempah
          </button>
          <button 
            onClick={() => scrollToSection('lokasi')}
            className="w-full text-left px-4 py-3 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0]"
          >
            📍 Lokasi & Kontak Hub
          </button>

          <div className="pt-3 border-t border-[#E8DFC8] space-y-2">
            <button
              onClick={openWhatsApp}
              className="w-full bg-[#FF5E14] text-white font-display font-black py-3 rounded-full flex items-center justify-center gap-2 uppercase tracking-wide text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Chat WhatsApp Sekarang
            </button>
            {!isAdmin && (
              <button 
                onClick={() => { login(); setIsMobileMenuOpen(false); }}
                className="w-full text-center text-xs text-[#78716C] py-2"
              >
                Login Pengelola
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

