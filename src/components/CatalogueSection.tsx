import React, { useState, useMemo, useEffect } from 'react';
import { MenuItem, Category } from '@/types';
import { 
  Search, 
  Flame, 
  MessageCircle, 
  Eye, 
  Share2,
  Download,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';
import { toast } from 'sonner';

interface CatalogueSectionProps {
  menus: MenuItem[];
  onSelectMenu: (menu: MenuItem) => void;
  initialCategory?: Category;
}

const CATEGORIES: Category[] = [
  'Semua',
  'Paket Ayam Kremes',
  'Ayam Bakar Kremes',
  'Nasi Kuning',
  'Nasi Tumpeng',
  'Lainnya'
];

export default function CatalogueSection({ menus, onSelectMenu, initialCategory }: CatalogueSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredMenus = useMemo(() => {
    return menus.filter(item => {
      // Category check
      const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      
      // Search check
      const matchesSearch = 
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menus, selectedCategory, searchQuery]);

  const handleQuickWhatsApp = (menu: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Halo ${CONTACT_INFO.brandName}, saya ingin pesan menu *${menu.name}* (Rp${menu.price.toLocaleString('id-ID')}). Boleh minta info cara pemesanannya?`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSharePricelist = () => {
    if (navigator.share) {
      navigator.share({
        title: `${CONTACT_INFO.brandName} - Katalog Menu & Katering`,
        text: `Katalog resmi Ayam Kremes Jakarta: Gurih, Renyah & Siap Antar Se-Jabodetabek.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link katalog berhasil disalin ke clipboard!");
    }
  };

  return (
    <section id="katalog" className="py-16 sm:py-20 bg-[#FAF4E8] text-[#231F20] scroll-mt-20 border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Simple & Bold Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEBD11]/20 border border-[#FEBD11]/40 text-[#78350F] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Katalog Menu Otentik & Harga Jujur
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            PILIHAN MENU TERFAVORIT
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#FF5E14] font-bold">
            sari kaldu gurih & kremesan renyah tahan lama
          </p>
        </div>

        {/* Clean Filter & Search Controls */}
        <div className="space-y-4">
          
          {/* Category Tabs in Clean Rounded Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-full font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF5E14] text-white shadow-md scale-105'
                    : 'bg-white text-[#4A3E39] hover:bg-[#F3ECE0] border-2 border-[#231F20]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Clean Minimal Search Bar & Share Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto pt-2">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
              <input
                type="text"
                placeholder="Cari ayam kremes, bento, sambal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white border-2 border-[#231F20]/10 rounded-full text-sm font-medium focus:outline-none focus:border-[#FF5E14] shadow-xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#78716C] hover:text-[#231F20]"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleSharePricelist}
                className="px-4 py-3 rounded-full bg-white border-2 border-[#231F20]/10 hover:bg-[#F3ECE0] text-xs font-display font-bold uppercase tracking-wider text-[#231F20] flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan</span>
              </button>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Halo, boleh minta file PDF brosur katering & pricelist lengkapnya?')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-full bg-[#231F20] hover:bg-black text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brosur PDF</span>
              </a>
            </div>
          </div>

        </div>

        {/* Menu Cards Grid - Simple, Clean, Back to Nature Style */}
        {filteredMenus.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#231F20]/10 shadow-sm space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF4E8] text-[#FF5E14] flex items-center justify-center mx-auto text-3xl font-bold">
              🍗
            </div>
            <h3 className="text-xl font-display font-black text-[#231F20] uppercase">
              Menu tidak ditemukan
            </h3>
            <p className="text-xs text-[#78716C]">
              Coba cari dengan kata kunci lain atau pilih kategori Semua.
            </p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[#FF5E14] text-white font-display font-bold text-xs uppercase"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMenus.map((menu) => (
              <div
                key={menu.id}
                onClick={() => onSelectMenu(menu)}
                className="group bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#231F20]/10 hover:border-[#FF5E14] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Clean Food Image Container */}
                  <div className="relative h-52 sm:h-56 w-full rounded-2xl overflow-hidden bg-[#FAF4E8] flex items-center justify-center">
                    {menu.imageUrl ? (
                      <img
                        src={menu.imageUrl}
                        alt={menu.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-4xl">🍗</div>
                    )}
                    
                    {/* Top Sticker Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-3 py-1 bg-[#231F20] text-white text-[10px] font-display font-black uppercase rounded-full tracking-wider shadow-sm">
                        {menu.category}
                      </span>
                    </div>

                    {menu.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-[#FEBD11] text-[#231F20] text-[10px] font-display font-black uppercase rounded-full shadow-sm">
                          {menu.badge}
                        </span>
                      </div>
                    )}

                    {typeof menu.spiceLevel === 'number' && menu.spiceLevel > 0 && (
                      <div className="absolute bottom-3 right-3">
                        <span className="flex items-center text-[10px] bg-red-600 px-2.5 py-1 rounded-full text-white font-bold font-display uppercase shadow-sm">
                          <Flame className="w-3 h-3 mr-1 fill-current" />
                          Pedas {menu.spiceLevel}/5
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Clean Typography & Details */}
                  <div className="pt-4 pb-2 space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[10px] font-display font-black uppercase text-[#78716C] tracking-wider">
                        Harga Satuan
                      </span>
                      <span className="text-xl sm:text-2xl font-display font-black text-[#FF5E14]">
                        Rp{menu.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-display font-black text-[#231F20] uppercase group-hover:text-[#FF5E14] transition-colors leading-tight line-clamp-1">
                      {menu.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-[#574B45] line-clamp-2 leading-relaxed font-normal">
                      {menu.description}
                    </p>

                    {menu.portion && (
                      <div className="text-[11px] font-bold text-[#7BA03C] flex items-center gap-1 pt-1">
                        <span>📦 {menu.portion}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Clean Pill Buttons */}
                <div className="pt-4 border-t border-[#F3ECE0] flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMenu(menu);
                    }}
                    className="flex-1 py-3 rounded-full border-2 border-[#231F20]/20 hover:bg-[#F3ECE0] text-[#231F20] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#78716C]" />
                    Detail
                  </button>

                  <button
                    onClick={(e) => handleQuickWhatsApp(menu, e)}
                    className="flex-1 py-3 rounded-full bg-[#FF5E14] hover:bg-[#E04F00] text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    Pesan WA
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
