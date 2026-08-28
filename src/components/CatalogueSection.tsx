import React, { useState, useMemo, useEffect } from 'react';
import { MenuItem, Category } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Flame, 
  Plus, 
  Eye, 
  ShoppingBag,
  Sparkles,
  Check
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

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
  const { addToCart, openCart } = useCart();
  const { user, requireAuth } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredMenus = useMemo(() => {
    return menus.filter(item => {
      const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchesSearch = 
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menus, selectedCategory, searchQuery]);

  const handleAddToCart = (menu: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    // If menu has variations, open detail modal so user can pick variation
    if (menu.variations && menu.variations.length > 0) {
      onSelectMenu(menu);
      return;
    }
    if (!user) {
      requireAuth(() => addToCart(menu), 'Silakan masuk atau daftar terlebih dahulu untuk memasukkan menu ke keranjang.');
      return;
    }
    addToCart(menu);
  };

  return (
    <section id="katalog" className="py-16 sm:py-20 bg-[#FAF4E8] text-[#231F20] scroll-mt-20 border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEBD11]/20 border border-[#FEBD11]/40 text-[#78350F] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5E14]" />
            Katalog Lengkap & Harga Transparan
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            PILIHAN MENU AYAM KREMES
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#FF5E14] font-bold">
            pilih porsi favorit & kumpulkan pesanan di keranjang
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF5E14] text-white shadow-md scale-105'
                    : 'bg-white text-[#4A3E39] hover:bg-[#F3ECE0] border-2 border-[#231F20]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
              <input
                type="text"
                placeholder="Cari menu ayam kremes, bento, tumpeng..."
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
          </div>

        </div>

        {/* Menu Grid */}
        {filteredMenus.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#231F20]/10 shadow-sm space-y-3 max-w-md mx-auto">
            <div className="text-4xl">🍗</div>
            <h3 className="text-lg font-display font-black text-[#231F20] uppercase">
              Menu tidak ditemukan
            </h3>
            <p className="text-xs text-stone-600">
              Coba cari dengan kata kunci lain atau pilih kategori Semua.
            </p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="px-5 py-2 rounded-full bg-[#FF5E14] text-white font-display font-bold text-xs uppercase"
            >
              Lihat Semua Menu
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
                  {/* Image Container */}
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
                    
                    {/* Badges */}
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

                  {/* Info */}
                  <div className="pt-4 pb-2 space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[10px] font-display font-black uppercase text-stone-500 tracking-wider">
                        Harga
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
                      <div className="text-[11px] font-bold text-[#7BA03C] pt-1">
                        <span>📦 {menu.portion}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions: Detail & + Keranjang */}
                <div className="pt-4 border-t border-[#F3ECE0] flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMenu(menu);
                    }}
                    className="py-3 px-3.5 rounded-full border-2 border-[#231F20]/20 hover:bg-[#F3ECE0] text-[#231F20] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    <span>Detail</span>
                  </button>

                  <button
                    onClick={(e) => handleAddToCart(menu, e)}
                    className="flex-1 py-3 rounded-full bg-[#FF5E14] hover:bg-[#E04F00] text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>+ Keranjang</span>
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
