import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  FileText, 
  Gift
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';
import { toast } from 'sonner';

export default function CateringHubSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    eventType: 'Meeting / Pelatihan Kantor',
    packageChoice: 'Paket Ayam Kremes Spesial (Nasi Kotak Bento)',
    paxCount: '50',
    eventDate: '',
    eventTime: '11:30',
    deliveryArea: 'Jakarta Selatan',
    customNotes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      toast.error('Mohon lengkapi Nama dan Nomor WhatsApp Anda.');
      return;
    }

    const message = 
`Halo *${CONTACT_INFO.brandName}*, saya ingin meminta penawaran katering dengan detail berikut:

👤 *Nama Pemesan:* ${formData.fullName}
📞 *No. WhatsApp:* ${formData.phone}
🏢 *Jenis Acara:* ${formData.eventType}
🍱 *Paket Pilihan:* ${formData.packageChoice}
👥 *Perkiraan Porsi:* ${formData.paxCount} Pax
📅 *Tanggal Acara:* ${formData.eventDate || 'Menyusul / Diskusi'}
⏰ *Waktu Pengiriman:* ${formData.eventTime} WIB
📍 *Area Pengiriman:* ${formData.deliveryArea}
📝 *Catatan Khusus:* ${formData.customNotes || '-'}

Mohon informasi ketersediaan jadwal, penawaran harga terbaik, dan prosedur pemesanannya. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encoded}`, '_blank');
    toast.success('Membuka WhatsApp untuk mengirim detail penawaran...');
  };

  return (
    <section id="katering" className="py-16 sm:py-24 bg-[#FAF4E8] text-[#231F20] relative overflow-hidden scroll-mt-20 border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEBD11]/20 border border-[#FEBD11]/40 text-[#78350F] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Layanan Katering & Bento Box Se-Jabodetabek
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            KATERING KANTOR & SYUKURAN
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#FF5E14] font-bold">
            porsi kenyang, kemasan higienis, rasa terjamin
          </p>
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Perks & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#231F20]/10 shadow-sm space-y-6">
              <h3 className="text-2xl font-display font-black text-[#231F20] uppercase">
                Kenapa Memilih Katering Kami?
              </h3>
              
              <div className="space-y-4">
                {CONTACT_INFO.cateringHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF5E14] text-white flex items-center justify-center flex-shrink-0 mt-0.5 font-display font-black text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-[#231F20] text-base">{item.title}</h4>
                      <p className="text-[#574B45] text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FEBD11]/20 p-5 rounded-2xl border-2 border-[#FEBD11]/40 space-y-1.5">
                <FileText className="w-6 h-6 text-[#78350F]" />
                <h4 className="font-display font-black text-[#78350F] text-sm uppercase">Invoice & Faktur Resmi</h4>
                <p className="text-xs text-[#78350F]/80">Tersedia dokumen perpajakan & kwitansi resmi untuk instansi perusahaan.</p>
              </div>

              <div className="bg-[#88AB58]/20 p-5 rounded-2xl border-2 border-[#88AB58]/40 space-y-1.5">
                <Gift className="w-6 h-6 text-[#14532D]" />
                <h4 className="font-display font-black text-[#14532D] text-sm uppercase">Free Kustom Sticker</h4>
                <p className="text-xs text-[#14532D]/80">Gratis stiker logo instansi atau ucapan syukuran untuk pesanan katering.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-6 bg-white text-[#231F20] rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-[#231F20]/10">
            <div className="space-y-1 mb-6 border-b border-[#F3ECE0] pb-4">
              <span className="text-xs font-display font-black uppercase tracking-wider text-[#FF5E14]">
                Hitung & Minta Penawaran
              </span>
              <h3 className="text-2xl font-display font-black text-[#231F20] uppercase">
                Konsultasi Katering Cepat
              </h3>
              <p className="text-xs text-[#78716C]">
                Isi form di bawah ini untuk langsung terhubung dengan tim katering kami di WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSendInquiry} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                    Nama / Instansi *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Contoh: Ibu Rina / PT Maju"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Contoh: 08123456789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                    Jenis Acara
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                  >
                    <option value="Meeting / Pelatihan Kantor">Meeting / Pelatihan Kantor</option>
                    <option value="Syukuran Rumah / Toko">Syukuran Rumah / Toko</option>
                    <option value="Ulang Tahun / Arisan">Ulang Tahun / Arisan</option>
                    <option value="Pernikahan / Lamaran">Pernikahan / Lamaran</option>
                    <option value="Pengajian / Tasyakuran">Pengajian / Tasyakuran</option>
                    <option value="Katering Harian Karyawan">Katering Harian Karyawan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                    Pilihan Paket Utama
                  </label>
                  <select
                    name="packageChoice"
                    value={formData.packageChoice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                  >
                    <option value="Paket Ayam Kremes Spesial (Nasi Kotak Bento)">Paket Ayam Kremes Spesial (Bento)</option>
                    <option value="Paket Ayam Bakar Madu Kremes">Paket Ayam Bakar Madu Kremes</option>
                    <option value="Nasi Kuning Box Komplit">Nasi Kuning Box Komplit</option>
                    <option value="Tumpeng Mini Nusantara (Personal)">Tumpeng Mini Nusantara (Personal)</option>
                    <option value="Tumpeng Tampah Tradisional Besar">Tumpeng Tampah Tradisional Besar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                    Jumlah Porsi (Pax)
                  </label>
                  <input
                    type="number"
                    name="paxCount"
                    min="5"
                    value={formData.paxCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-display font-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                    Tanggal Acara
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                    Waktu Tiba
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                  Area / Kota Pengiriman
                </label>
                <select
                  name="deliveryArea"
                  value={formData.deliveryArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                >
                  <option value="Jakarta Selatan">Jakarta Selatan</option>
                  <option value="Jakarta Pusat">Jakarta Pusat</option>
                  <option value="Jakarta Barat">Jakarta Barat</option>
                  <option value="Jakarta Timur">Jakarta Timur</option>
                  <option value="Jakarta Utara">Jakarta Utara</option>
                  <option value="Tangerang & BSD/Bintaro">Tangerang & BSD/Bintaro</option>
                  <option value="Depok">Depok</option>
                  <option value="Bekasi">Bekasi</option>
                  <option value="Bogor">Bogor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase tracking-wider text-[#4A3E39] mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  name="customNotes"
                  rows={2}
                  placeholder="Contoh: Sambal tolong dipisah, butuh invoice faktur..."
                  value={formData.customNotes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF5E14] hover:bg-[#E04F00] text-white font-display font-black py-4 rounded-full text-sm uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 cursor-pointer transition-all hover:scale-102"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Kirim Permintaan via WhatsApp →</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
