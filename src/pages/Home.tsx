import React, { useState, useEffect } from 'react';
import { menuService, promoService } from '@/services/dataService';
import { MenuItem, Promo, Category } from '@/types';
import { DEFAULT_MENUS, DEFAULT_PROMOS } from '@/data/defaultCatalogue';
import { useAuth } from '@/contexts/AuthContext';
import Hero from '@/components/Hero';
import MemberWelcomeBanner from '@/components/MemberWelcomeBanner';
import CatalogueSection from '@/components/CatalogueSection';
import CateringHubSection from '@/components/CateringHubSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactAndLocationSection from '@/components/ContactAndLocationSection';
import FAQSection from '@/components/FAQSection';
import MenuDetailModal from '@/components/MenuDetailModal';
import MemberPortalModal from '@/components/MemberPortalModal';
import CartDrawer from '@/components/CartDrawer';
import FloatingCartButton from '@/components/FloatingCartButton';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  const { user } = useAuth();
  const [menus, setMenus] = useState<MenuItem[]>(DEFAULT_MENUS);
  const [promos, setPromos] = useState<Promo[]>(DEFAULT_PROMOS);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');
  const [loading, setLoading] = useState(true);

  // Member Portal state from Home banner
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalTab, setPortalTab] = useState<'orders' | 'profile' | 'newOrder'>('orders');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuData, promoData] = await Promise.all([
          menuService.getAll().catch(() => []),
          promoService.getActive().catch(() => [])
        ]);

        if (menuData && menuData.length > 0) {
          setMenus(menuData);
        } else {
          setMenus(DEFAULT_MENUS);
        }

        if (promoData && promoData.length > 0) {
          setPromos(promoData);
        } else {
          setPromos(DEFAULT_PROMOS);
        }
      } catch (error) {
        console.warn("Using fallback default catalogue data:", error);
        setMenus(DEFAULT_MENUS);
        setPromos(DEFAULT_PROMOS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollToSection = (id: string, category?: string) => {
    if (category) {
      setActiveCategory(category as Category);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMemberPortal = (tab: 'orders' | 'profile' | 'newOrder' = 'orders') => {
    setPortalTab(tab);
    setIsPortalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#231F20] flex flex-col selection:bg-[#FEBD11] selection:text-[#231F20]">
      
      {/* 1. Member Welcome Bar (Only visible when user is logged in) */}
      <MemberWelcomeBanner onOpenPortal={handleOpenMemberPortal} />

      {/* 2. Hero Section with 4 Category Tiles */}
      <Hero
        onExploreClick={(cat) => scrollToSection('katalog', cat)}
        onCateringClick={() => scrollToSection('katering')}
      />

      {/* 3. Interactive Menu Catalogue Section (With Add to Cart System) */}
      <CatalogueSection
        menus={menus}
        initialCategory={activeCategory}
        onSelectMenu={(menu) => setSelectedMenu(menu)}
      />

      {/* 4. Catering & Bento Hub (With Catering Package Catalog & WhatsApp Inquiry) */}
      <CateringHubSection />

      {/* 5. Why Choose Us & Heritage Story / Portfolio */}
      <WhyChooseUs />

      {/* 6. Customer Testimonials */}
      <TestimonialsSection />

      {/* 7. Central Contact Hub & Jakarta Kitchen Location */}
      <ContactAndLocationSection />

      {/* 8. FAQ Section */}
      <FAQSection />

      {/* 9. Menu Detail Popup Modal */}
      <MenuDetailModal
        item={selectedMenu}
        isOpen={!!selectedMenu}
        onClose={() => setSelectedMenu(null)}
      />

      {/* 10. Shopping Cart Drawer with WhatsApp Order Form */}
      <CartDrawer />

      {/* 11. Floating Quick Cart Button */}
      <FloatingCartButton />

      {/* 12. Member Portal Modal (Triggered by Member Bar / Navbar) */}
      {user && (
        <MemberPortalModal
          isOpen={isPortalOpen}
          defaultTab={portalTab}
          onClose={() => setIsPortalOpen(false)}
        />
      )}

      {/* 13. Floating WhatsApp Support for Catering Consultation */}
      <FloatingWhatsApp />
      
    </div>
  );
}
