import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { 
  Utensils, 
  MessageCircle, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  User as UserIcon, 
  LogIn, 
  LogOut,
  Package, 
  ChevronDown,
  ShoppingBag,
  Settings
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';
import AuthModal from '@/components/AuthModal';
import MemberPortalModal from '@/components/MemberPortalModal';

interface NavbarProps {
  onOpenChat?: () => void;
  onOpenPortalTab?: (tab: 'orders' | 'profile' | 'newOrder') => void;
}

export default function Navbar({ onOpenChat, onOpenPortalTab }: NavbarProps) {
  const { user, userProfile, isAdmin, isUser, isAuthModalOpen, openAuthModal, closeAuthModal, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [portalInitialTab, setPortalInitialTab] = useState<'orders' | 'profile' | 'newOrder'>('orders');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPortalWithTab = (tab: 'orders' | 'profile' | 'newOrder') => {
    setPortalInitialTab(tab);
    setIsPortalModalOpen(true);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    await logout();
  };

  const openWhatsAppCatering = () => {
    const message = `Halo ${CONTACT_INFO.brandName}, saya ingin konsultasi dan pesan Paket Katering / Bento Acara. Boleh minta info pricelist katering lengkapnya?`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#FAF4E8] text-[#231F20] border-b border-[#E8DFC8] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* 1. Brand Logo & Tagline */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-[#FF5E14] text-white flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
                <Utensils className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-black tracking-tight text-[#231F20] uppercase leading-none">
                  Ayam Kremes <span className="text-[#FF5E14]">Jakarta</span>
                </div>
                <p className="text-[11px] font-script text-[#7BA03C] font-bold tracking-wide -mt-0.5">
                  gurih & renyah sejak 2018
                </p>
              </div>
            </Link>

            {/* 2. Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-display font-bold text-xs uppercase tracking-wider text-[#4A3E39]">
              <button 
                onClick={() => scrollToSection('katalog')} 
                className="px-3.5 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
              >
                Katalog Menu
              </button>
              <button 
                onClick={() => scrollToSection('katering')} 
                className="px-3.5 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
              >
                Paket Katering & Bento
              </button>
              <button 
                onClick={() => scrollToSection('keunggulan')} 
                className="px-3.5 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
              >
                Tentang Kami
              </button>
              <button 
                onClick={() => scrollToSection('lokasi')} 
                className="px-3.5 py-2 rounded-full hover:text-[#FF5E14] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
              >
                Kontak & Lokasi
              </button>
            </nav>

            {/* 3. Desktop Action Center */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Shopping Cart Button */}
              <button
                onClick={openCart}
                className="relative bg-white hover:bg-[#F3ECE0] border-2 border-[#231F20]/15 px-4 py-2 rounded-full text-xs font-display font-black uppercase text-[#231F20] transition-all shadow-xs h-10 flex items-center gap-2 cursor-pointer group"
                aria-label="Keranjang Belanja"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#FF5E14] group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF5E14] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span>Keranjang</span>
                {totalItems > 0 && (
                  <span className="bg-[#FEBD11] text-[#231F20] text-[10px] px-1.5 py-0.5 rounded-full font-black">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Authenticated as Admin */}
              {isAdmin && (
                <Link to="/admin">
                  <Button 
                    size="sm"
                    className="rounded-full bg-[#231F20] text-[#FEBD11] hover:bg-black text-xs font-display font-black uppercase tracking-wider shadow-sm h-10 px-4"
                  >
                    <ShieldCheck className="w-4 h-4 mr-1.5 text-[#FEBD11]" />
                    Admin
                  </Button>
                </Link>
              )}

              {/* Authenticated as Customer / Member with Dropdown */}
              {isUser && !isAdmin && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2.5 bg-white hover:bg-[#F3ECE0] border-2 border-[#231F20]/15 px-3.5 py-1.5 rounded-full text-xs font-display font-bold text-[#231F20] transition-all shadow-xs h-10 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FF5E14] text-white flex items-center justify-center text-xs font-black">
                      {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="max-w-[110px] truncate">
                      {userProfile?.displayName || 'Member'}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#231F20]/15 py-2 z-50 animate-in fade-in-50 zoom-in-95">
                      
                      <div className="px-4 py-2.5 border-b border-stone-100 bg-[#FAF4E8]/50">
                        <p className="text-xs font-display font-black text-[#231F20] truncate">
                          {userProfile?.displayName || 'Member Setia'}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">
                          {userProfile?.email || userProfile?.phone || 'Akun Member'}
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => openPortalWithTab('orders')}
                          className="w-full px-4 py-2.5 text-left text-xs font-display font-bold text-[#231F20] hover:bg-[#FAF4E8] hover:text-[#FF5E14] flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Package className="w-4 h-4 text-[#FF5E14]" />
                          <span>Pesanan Saya (Tracking)</span>
                        </button>

                        <button
                          onClick={() => openPortalWithTab('profile')}
                          className="w-full px-4 py-2.5 text-left text-xs font-display font-bold text-[#231F20] hover:bg-[#FAF4E8] hover:text-[#FF5E14] flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Settings className="w-4 h-4 text-stone-600" />
                          <span>Profil & Alamat Pengiriman</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-stone-100">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left text-xs font-display font-bold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-red-600" />
                          <span>Keluar Akun</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* Guest Login Button */}
              {!user && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAuthModal('Silakan masuk atau daftar untuk mengakses akun member dan fitur pemesanan.')}
                  className="rounded-full border-2 border-[#231F20]/20 bg-white hover:bg-[#F3ECE0] text-[#231F20] text-xs font-display font-black uppercase tracking-wider h-10 px-4 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5 text-[#FF5E14]" />
                  Masuk
                </Button>
              )}

              {/* Catering WhatsApp Consultation Button */}
              <button
                onClick={openWhatsAppCatering}
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-black px-4 py-2.5 text-xs rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 uppercase tracking-wider flex items-center gap-2 h-10 cursor-pointer flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Katering WA</span>
              </button>
            </div>

            {/* 4. Mobile Menu & Cart Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Cart Trigger */}
              <button
                onClick={openCart}
                className="relative bg-white border border-[#231F20]/20 p-2.5 rounded-full text-[#231F20] cursor-pointer"
                aria-label="Buka Keranjang"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF5E14]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF5E14] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {!user ? (
                <button
                  onClick={() => openAuthModal('Silakan masuk atau daftar untuk mengakses akun member dan fitur pemesanan.')}
                  className="bg-white border border-[#231F20]/20 text-[#231F20] font-display font-bold px-3 py-1.5 text-xs rounded-full flex items-center gap-1 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>Masuk</span>
                </button>
              ) : (
                <button
                  onClick={() => openPortalWithTab('orders')}
                  className="bg-white border border-[#231F20]/20 text-[#231F20] font-display font-bold px-2.5 py-1.5 text-xs rounded-full flex items-center gap-1 cursor-pointer"
                >
                  <div className="w-4 h-4 rounded-full bg-[#FF5E14] text-white flex items-center justify-center text-[9px]">
                    {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span>Akun</span>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-2xl bg-[#F3ECE0] text-[#231F20] hover:bg-[#E8DFC8] cursor-pointer"
                aria-label="Buka Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 5. Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF4E8] border-t border-[#E8DFC8] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
            
            {/* If Logged In: Show user badge in mobile menu */}
            {user && (
              <div className="bg-white p-3.5 rounded-2xl border border-[#231F20]/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FF5E14] text-white flex items-center justify-center font-display font-black text-sm">
                    {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-xs font-display font-black text-[#231F20]">
                      {userProfile?.displayName || 'Member Setia'}
                    </p>
                    <p className="text-[10px] text-stone-500">
                      {userProfile?.phone || userProfile?.email || 'Akun Member Aktif'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-[11px] font-display font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  Keluar
                </button>
              </div>
            )}

            {/* Navigation links */}
            <div className="space-y-1">
              <button 
                onClick={() => scrollToSection('katalog')}
                className="w-full text-left px-4 py-2.5 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0] flex items-center gap-2.5"
              >
                <span>📋</span>
                <span>Katalog Menu (+ Keranjang)</span>
              </button>
              <button 
                onClick={() => scrollToSection('katering')}
                className="w-full text-left px-4 py-2.5 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0] flex items-center gap-2.5"
              >
                <span>🍱</span>
                <span>Paket Katering & Bento</span>
              </button>
              <button 
                onClick={() => scrollToSection('keunggulan')}
                className="w-full text-left px-4 py-2.5 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0] flex items-center gap-2.5"
              >
                <span>✨</span>
                <span>Tentang Kami & Rahasia Rasa</span>
              </button>
              <button 
                onClick={() => scrollToSection('lokasi')}
                className="w-full text-left px-4 py-2.5 rounded-2xl font-display font-bold text-[#231F20] hover:bg-[#F3ECE0] flex items-center gap-2.5"
              >
                <span>📍</span>
                <span>Kontak Bisnis & Lokasi</span>
              </button>
            </div>

            {/* Cart & Member Actions */}
            <div className="pt-2 border-t border-[#E8DFC8] space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full bg-[#FF5E14] text-white font-display font-black py-3 rounded-full flex items-center justify-center gap-2 uppercase tracking-wide text-xs shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buka Keranjang ({totalItems} Menu)</span>
              </button>

              <button
                onClick={openWhatsAppCatering}
                className="w-full bg-[#25D366] text-white font-display font-black py-3 rounded-full flex items-center justify-center gap-2 uppercase tracking-wide text-xs shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Konsultasi Katering via WA</span>
              </button>
            </div>

          </div>
        )}
      </header>

      {/* Auth Modal for Visitors */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
      />

      {/* Member Portal Modal with selected initial tab */}
      <MemberPortalModal
        isOpen={isPortalModalOpen}
        defaultTab={portalInitialTab}
        onClose={() => setIsPortalModalOpen(false)}
        onOpenChat={onOpenChat}
      />
    </>
  );
}
