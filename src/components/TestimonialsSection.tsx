import React from 'react';
import { Star, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Sarah Wijaya, S.E.',
      role: 'Head of HR & GA',
      organization: 'PT Bank Mandiri (Persero) Tbk - Jakarta',
      event: 'Katering Rapat & Training 120 Pax',
      rating: 5,
      comment: 'Sudah langganan untuk makan siang direksi dan pelatihan kantor. Nasi kotak bento ayam kremesnya rapi banget, kremesannya kriuk awet sampai sore, dan sambal bawangnya juara!',
      tagColor: 'bg-[#4BB3FD]/20 text-[#0C4A6E]'
    },
    {
      name: 'Hendra Gunawan',
      role: 'Panitia Syukuran Keluarga',
      organization: 'Bintaro Jaya Sektor 9',
      event: 'Tumpeng Tampah Akbar 25 Pax',
      rating: 5,
      comment: 'Tumpeng tampahnya megah sekali! Hiasan sayurannya sangat artistik dan rapi. Ayam bakar bumbu madu dan sambal goreng hatinya dipuji semua kerabat yang hadir. Pengantaran tepat waktu.',
      tagColor: 'bg-[#FEBD11]/20 text-[#78350F]'
    },
    {
      name: 'Dr. Anita Rahmadani',
      role: 'Panitia Seminar Kedokteran',
      organization: 'FK Universitas Indonesia',
      event: 'Nasi Kuning Bento Box 200 Pax',
      rating: 5,
      comment: 'Pelayanan tim katering sangat profesional. Respon admin WhatsApp cepat, proses invoice dan pembayaran lancar, makanan tiba dalam kondisi hangat bersegel rapi.',
      tagColor: 'bg-[#88AB58]/20 text-[#14532D]'
    }
  ];

  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-[#FAF4E8] text-[#231F20] border-b border-[#E8DFC8] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEBD11]/20 border border-[#FEBD11]/40 text-[#78350F] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Ulasan Pelanggan
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            KATA MEREKA TENTANG KAMI
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#FF5E14] font-bold">
            kepuasan Anda adalah kebanggaan dapur kami
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#231F20]/10 hover:border-[#FF5E14] hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex text-[#FEBD11]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[#574B45] text-sm leading-relaxed font-medium">
                  "{rev.comment}"
                </p>

                {/* Event Tag */}
                <div className={`inline-block px-3 py-1 text-[11px] font-display font-black uppercase rounded-full ${rev.tagColor}`}>
                  📍 {rev.event}
                </div>
              </div>

              {/* Author */}
              <div className="pt-3 border-t border-[#F3ECE0]">
                <h4 className="font-display font-black text-[#231F20] text-sm uppercase">{rev.name}</h4>
                <p className="text-xs text-[#78716C]">{rev.role}</p>
                <p className="text-xs font-bold text-[#FF5E14] mt-0.5">{rev.organization}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
