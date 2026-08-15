import React from 'react';
import { ArrowDown } from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

interface HeroProps {
  onExploreClick: (category?: string) => void;
  onCateringClick: () => void;
}

export default function Hero({ onExploreClick, onCateringClick }: HeroProps) {
  const categories = [
    {
      id: 'Paket Ayam Kremes',
      title: 'AYAM KREMES',
      subtitle: 'Kriuk Kaldu Asli',
      bgColor: 'bg-[#4BB3FD]',
      textColor: 'text-[#0C4A6E]',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Ayam Bakar Kremes',
      title: 'AYAM BAKAR',
      subtitle: 'Manis Smokey Gurih',
      bgColor: 'bg-[#F47B89]',
      textColor: 'text-[#881337]',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Nasi Kuning',
      title: 'NASI BENTO',
      subtitle: 'Kotak Rapi Acara',
      bgColor: 'bg-[#88AB58]',
      textColor: 'text-[#14532D]',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Nasi Tumpeng',
      title: 'NASI TUMPENG',
      subtitle: 'Tampah & Mini',
      bgColor: 'bg-[#FEBD11]',
      textColor: 'text-[#78350F]',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="kategori" className="relative bg-[#FAF4E8] text-[#231F20] pt-12 pb-16 sm:pb-20 overflow-hidden border-b border-[#E8DFC8]">
      
      {/* Decorative Floating Stickers */}
      <div className="absolute top-8 left-6 sm:left-12 -rotate-12 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white border-2 border-[#231F20] shadow-[3px_3px_0px_#231F20] text-xs font-display font-black uppercase text-[#FF5E14] select-none">
        🍗 100% Halal & Segar
      </div>
      <div className="absolute top-10 right-6 sm:right-12 rotate-12 hidden md:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#FEBD11] border-2 border-[#231F20] shadow-[3px_3px_0px_#231F20] text-xs font-display font-black uppercase text-[#231F20] select-none">
        ⭐ Kriuk 8 Jam
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        
        {/* Main Giant Retro Headline */}
        <div className="max-w-4xl mx-auto space-y-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#FF5E14] uppercase leading-[1.05]">
            GURIH RENYAHNYA <br className="hidden sm:inline" />
            BIKIN NAGIH TERUS
          </h1>
          <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#FEBD11] font-bold">
            resep otentik kaldu nusantara sejak 2018
          </p>
        </div>

        {/* 4 Iconic Category Squares (Back to Nature Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onExploreClick(cat.id)}
              className={`${cat.bgColor} rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between aspect-square cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group border-2 border-[#231F20]/10`}
            >
              {/* Product Image on Colored Card */}
              <div className="w-full flex-1 flex items-center justify-center p-2">
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white/90 group-hover:rotate-3 transition-transform duration-500 bg-white flex items-center justify-center">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-3xl">🍗</span>
                  )}
                </div>
              </div>

              {/* Bold Category Name Label */}
              <div className="w-full text-center mt-3 space-y-0.5">
                <h3 className={`font-display font-black text-base sm:text-xl lg:text-2xl uppercase tracking-tight ${cat.textColor}`}>
                  {cat.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-black/60 hidden sm:block">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Central Punchy CTA Pill Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onExploreClick()}
            className="w-full sm:w-auto bg-[#FF5E14] hover:bg-[#E04F00] text-white font-display font-black text-base uppercase tracking-wider px-10 py-4 rounded-full shadow-md hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Jelajahi Semua Menu</span>
            <ArrowDown className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={onCateringClick}
            className="w-full sm:w-auto bg-white hover:bg-[#F3ECE0] text-[#231F20] border-2 border-[#231F20] font-display font-bold text-base uppercase tracking-wider px-8 py-3.5 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🍱 Paket Katering & Bento</span>
          </button>
        </div>

        {/* Simple Trust Note */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-[#78716C]">
          <span>✨ 500.000+ Porsi Disajikan</span>
          <span>•</span>
          <span>🚚 Pengiriman Hangat Se-Jabodetabek</span>
          <span>•</span>
          <span>🛡️ 100% Halal & Higienis</span>
        </div>

      </div>
    </section>
  );
}
