import React, { useState, useEffect } from 'react';
import { menuService, promoService } from '@/services/dataService';
import { MenuItem, Promo, Category } from '@/types';
import { DEFAULT_MENUS, DEFAULT_PROMOS } from '@/data/defaultCatalogue';
import Hero from '@/components/Hero';
import CatalogueSection from '@/components/CatalogueSection';
import CateringHubSection from '@/components/CateringHubSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactAndLocationSection from '@/components/ContactAndLocationSection';
import FAQSection from '@/components/FAQSection';
import MenuDetailModal from '@/components/MenuDetailModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  const [menus, setMenus] = useState<MenuItem[]>(DEFAULT_MENUS);
  const [promos, setPromos] = useState<Promo[]>(DEFAULT_PROMOS);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#231F20] flex flex-col selection:bg-[#FEBD11] selection:text-[#231F20]">
      
      {/* 1. Hero Section with 4 Category Tiles */}
      <Hero
        onExploreClick={(cat) => scrollToSection('katalog', cat)}
        onCateringClick={() => scrollToSection('katering')}
      />

      {/* 2. Simplified Menu Catalogue Section */}
      <CatalogueSection
        menus={menus}
        initialCategory={activeCategory}
        onSelectMenu={(menu) => setSelectedMenu(menu)}
      />

      {/* 3. Catering & Corporate Events Hub */}
      <CateringHubSection />

      {/* 4. Why Choose Us & Heritage Story */}
      <WhyChooseUs />

      {/* 5. Customer Testimonials */}
      <TestimonialsSection />

      {/* 6. Central Contact Hub & Jakarta Location */}
      <ContactAndLocationSection />

      {/* 7. FAQ Section */}
      <FAQSection />

      {/* 8. Menu Detail Popup Modal */}
      <MenuDetailModal
        item={selectedMenu}
        isOpen={!!selectedMenu}
        onClose={() => setSelectedMenu(null)}
      />

      {/* 9. Floating WhatsApp Quick Support */}
      <FloatingWhatsApp />
      
    </div>
  );
}
