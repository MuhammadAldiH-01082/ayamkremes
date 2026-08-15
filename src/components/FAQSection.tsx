import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Berapa minimal pemesanan untuk katering Nasi Kotak dan Nasi Tumpeng?',
      a: 'Untuk Nasi Kotak / Bento Box, minimal pemesanan katering adalah 10 porsi (pax). Untuk Tumpeng Mini personal minimal 10 pax, dan untuk Tumpeng Tampah Besar bisa dipesan mulai dari ukuran 10 porsi hingga 30 porsi.'
    },
    {
      q: 'Berapa hari sebelumnya saya harus melakukan pemesanan katering?',
      a: 'Untuk Nasi Kotak / Bento harian, pemesanan dapat dilakukan H-1 sebelum jam 17.00 WIB. Untuk pesanan skala besar (>100 pax) atau kreasi Nasi Tumpeng Tampah Tradisional dengan ukiran garnis, kami sarankan pemesanan H-2 atau H-3 agar persiapan maksimal.'
    },
    {
      q: 'Bagaimana jangkauan pengiriman dan ongkos kirim di Jabodetabek?',
      a: 'Dapur utama kami berada di Jakarta Selatan dan melayani pengiriman ke seluruh wilayah DKI Jakarta, Tangerang Kota, BSD Serpong, Bintaro, Depok, dan Bekasi. Pengiriman menggunakan armada khusus atau kurir instan berpenjaga suhu.'
    },
    {
      q: 'Apakah bisa kustomisasi isi lauk atau request kemasan besek?',
      a: 'Tentu saja! Anda dapat menyesuaikan jenis ayam (kremes / bakar), request lauk tambahan, memilih tingkat kepedasan sambal, hingga memilih kemasan Box Bento Mika Sekat atau Anyaman Besek Bambu Tradisional.'
    },
    {
      q: 'Apakah makanan dijamin halal, higienis, dan aman dikonsumsi?',
      a: '100% Halal dan Higienis. Dapur kami mengutamakan bahan baku segar setiap hari tanpa bahan pengawet berbahaya. Semua staf dapur menerapkan standar sanitasi ketat dan kemasan makanan selalu disegel rapi.'
    },
    {
      q: 'Bagaimana metode pembayaran dan apakah ada invoice resmi?',
      a: 'Kami menerima pembayaran Transfer Bank (BCA, Mandiri, BNI, BRI), QRIS, dan sistem invoice resmi bermaterai bagi perusahaan, instansi pemerintah, atau BUMN.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#FAF4E8] text-[#231F20] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEBD11]/20 border border-[#FEBD11]/40 text-[#78350F] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Tanya Jawab
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            PERTANYAAN UMUM
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#FF5E14] font-bold">
            info seputar menu, pemesanan & pengiriman
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border-2 border-[#231F20]/10 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-[#231F20] hover:text-[#FF5E14] transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#FF5E14] text-white' : 'bg-[#FAF4E8] text-[#231F20]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-[#574B45] leading-relaxed border-t border-[#F3ECE0] pt-4 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
