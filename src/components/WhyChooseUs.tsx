import React from 'react';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ChefHat, 
  Truck
} from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <ChefHat className="w-8 h-8 text-[#FF5E14]" />,
      title: '12 Rempah Nusantara',
      desc: 'Diungkep berjam-jam menggunakan rempah alami pilihan hingga bumbu meresap sempurna sampai ke serat tulang ayam.',
      bg: 'bg-[#4BB3FD]/15',
      border: 'border-[#4BB3FD]/30'
    },
    {
      icon: <Flame className="w-8 h-8 text-[#FF5E14]" />,
      title: 'Kriuk Sari Kaldu 8 Jam',
      desc: 'Kremesan renyah terbuat murni dari sari kaldu ayam ungkep, garing keemasan dan tidak berlebih minyak.',
      bg: 'bg-[#FEBD11]/20',
      border: 'border-[#FEBD11]/40'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#7BA03C]" />,
      title: '100% Halal & Higienis',
      desc: 'Ayam potong segar setiap subuh, diproses di dapur bersih dengan sertifikasi halal dan kemasan food-grade.',
      bg: 'bg-[#88AB58]/20',
      border: 'border-[#88AB58]/40'
    },
    {
      icon: <Truck className="w-8 h-8 text-[#FF5E14]" />,
      title: 'Katering Tepat Waktu',
      desc: 'Diantar menggunakan tas pemanas thermal box agar nasi & lauk tetap hangat saat tiba di meja acara Anda.',
      bg: 'bg-[#F47B89]/20',
      border: 'border-[#F47B89]/40'
    }
  ];

  return (
    <section id="keunggulan" className="py-16 sm:py-20 bg-[#FAF4E8] text-[#231F20] border-b border-[#E8DFC8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#88AB58]/20 border border-[#88AB58]/40 text-[#14532D] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Dedikasi Kualitas & Kelezatan
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            RAHASIA GURIH KAMI
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#7BA03C] font-bold">
            dari dapur keluarga untuk momen spesial Anda
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className={`bg-white p-6 rounded-3xl border-2 border-[#231F20]/10 hover:border-[#FF5E14] hover:shadow-lg transition-all duration-300 space-y-4 group`}
            >
              <div className={`w-14 h-14 rounded-2xl ${p.bg} border ${p.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {p.icon}
              </div>
              <h3 className="text-lg font-display font-black text-[#231F20] uppercase group-hover:text-[#FF5E14] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#574B45] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Story Banner */}
        <div className="rounded-3xl bg-[#231F20] text-white p-8 sm:p-12 overflow-hidden relative shadow-lg">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-display font-black uppercase tracking-widest text-[#FEBD11]">
                Tradisi Resep Keluarga
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black leading-tight uppercase text-white">
                "Kremesan yang nikmat lahir dari kaldu asli, bukan perisa buatan."
              </h3>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                Dimulai dari resep dapur keluarga di Jakarta Selatan, kami berkomitmen menghadirkan hidangan Nusantara yang tidak hanya lezat di lidah, namun juga berkesan bagi para tamu undangan di setiap acara Anda.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-3xl font-display font-black text-[#FEBD11] block">500.000+</span>
                <span className="text-xs text-stone-300 uppercase font-display font-bold">Porsi Disajikan</span>
              </div>
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10 text-center">
                <span className="text-3xl font-display font-black text-[#FEBD11] block">1.200+</span>
                <span className="text-xs text-stone-300 uppercase font-display font-bold">Acara Sukses</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
