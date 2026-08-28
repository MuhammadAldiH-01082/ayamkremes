import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  FileText, 
  Gift,
  Package,
  Users,
  Calendar,
  Check
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const CATERING_PACKAGES = [
  {
    id: 'cat-bento-hemat',
    name: 'Paket Bento Box Hemat Kantor',
    price: 25000,
    minOrder: 'Minimal 15 Porsi',
    badge: 'Best Value 💼',
    desc: 'Pilihan hemat dan praktis untuk makan siang harian karyawan, lembur kantor, atau konsumsi panitia acara.',
    includes: [
      'Nasi Putih Pulen Wangi',
      'Ayam Goreng Kaldu Kremes (1 Potong)',
      'Kremesan Kriuk Sari Kaldu (Cup Terpisah)',
      'Tahu / Tempe Goreng Bumbu Kuning',
      'Lalapan Timun Segar & Sambal Bawang',
      'Kemasan Box Sekat Rapi + Sendok Garpu'
    ]
  },
  {
    id: 'cat-bento-vip',
    name: 'Paket Bento Spesial Meeting & Seminar',
    price: 35000,
    minOrder: 'Minimal 10 Porsi',
    badge: 'Favorit Corporate 👔',
    desc: 'Paket bento premium dalam kemasan kraft eksklusif untuk rapat direksi, pelatihan kantor, dan seminar resmi.',
    includes: [
      'Nasi Gurih / Nasi Putih Pulen',
      'Ayam Bakar Madu / Ayam Kremes Paha/Dada',
      'Kremesan Renyah Gurih 1 Cup',
      'Telur Balado / Sambal Goreng Ati',
      'Tahu & Tempe Bacem Manis Gurih',
      'Buah Potong Segar (Pisang / Semangka)',
      'Air Mineral Cup + Tisu + Sendok Eksklusif'
    ]
  },
  {
    id: 'cat-tumpeng-mini',
    name: 'Tumpeng Mini Nusantara (Personal)',
    price: 45000,
    minOrder: 'Minimal 10 Porsi',
    badge: 'Spesial Syukuran 👑',
    desc: 'Kemasan mika dome kerucut estetik berhias pita dan stiker kustom ucapan untuk ultah, aqiqah, dan syukuran rumah.',
    includes: [
      'Tumpeng Kuning Gurih Harum Kerucut',
      'Ayam Goreng Lengkuas / Kremes',
      'Perkedel Kentang Daging Lembut',
      'Kering Tempe Orek Manis Renyah',
      'Telur Dadar Rawis & Sambal Goreng Ati',
      'Urap Sayur Segar & Sambal Bajak',
      'Gratis Kustom Desain Stiker Acara'
    ]
  },
  {
    id: 'cat-tumpeng-tampah',
    name: 'Tumpeng Tampah Tradisional Besar',
    price: 750000,
    minOrder: '1 Tampah (15 - 18 Porsi)',
    badge: 'Masterpiece Acara 🏆',
    desc: 'Tampah anyaman bambu beralas daun pisang dengan hiasan seni ukir sayuran segar untuk grand opening dan perayaan besar.',
    includes: [
      'Tumpeng Kuning / Uduk Kerucut Susun',
      'Ayam Goreng Kremes 1 Ekor Utuh (Diporsi)',
      'Sambal Goreng Kentang Ati Petai',
      'Urap Sayuran Lengkap Bumbu Kelapa',
      'Perkedel Kentang & Telur Puyuh Pindang',
      'Orek Tempe Kacang Manis Garing',
      'Garnis Ukir Wortel, Timun, & Cabai Bunga'
    ]
  }
];

export default function CateringHubSection() {
  const { user, userProfile, requireAuth } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    eventType: 'Meeting / Pelatihan Kantor',
    packageChoice: 'Paket Bento Box Hemat Kantor',
    paxCount: '50',
    eventDate: '',
    eventTime: '11:30',
    deliveryArea: 'Jakarta Selatan',
    customNotes: ''
  });

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || userProfile.displayName || '',
        phone: prev.phone || userProfile.phone || '',
      }));
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSpecificPackage = (pkg: typeof CATERING_PACKAGES[0]) => {
    if (!user) {
      requireAuth(() => {
        const message = `Halo *${CONTACT_INFO.brandName}*, saya tertarik untuk pesan *${pkg.name}* (Rp${pkg.price.toLocaleString('id-ID')}). Mohon info ketersediaan jadwal, prosedur pemesanan katering, dan contoh brosur lengkapnya. Terima kasih!`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encoded}`, '_blank');
      }, 'Silakan masuk terlebih dahulu untuk memesan paket katering via WhatsApp.');
      return;
    }

    const message = `Halo *${CONTACT_INFO.brandName}*, saya ${userProfile?.displayName ? `*${userProfile.displayName}*` : ''} tertarik untuk pesan *${pkg.name}* (Rp${pkg.price.toLocaleString('id-ID')}). Mohon info ketersediaan jadwal, prosedur pemesanan katering, dan contoh brosur lengkapnya. Terima kasih!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      requireAuth(() => {
        // Will be submitted after login
      }, 'Silakan masuk terlebih dahulu untuk mengirim formulir konsultasi katering.');
      return;
    }

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
    toast.success('Membuka WhatsApp untuk mengirim detail penawaran katering...');
  };

  return (
    <section id="katering" className="py-16 sm:py-24 bg-[#FAF4E8] text-[#231F20] relative overflow-hidden scroll-mt-20 border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#88AB58]/20 border border-[#88AB58]/40 text-[#14532D] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#7BA03C]" />
            Layanan Katering & Bento Box Se-Jabodetabek
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            PILIHAN PAKET KATERING
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#FF5E14] font-bold">
            konsultasi langsung via WhatsApp untuk acara istimewa Anda
          </p>
        </div>

        {/* 1. Catering Package Catalog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATERING_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-3xl p-6 border-2 border-[#231F20]/10 hover:border-[#FF5E14] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-display font-black uppercase bg-[#FEBD11]/20 text-[#78350F] px-3 py-1 rounded-full border border-[#FEBD11]/40">
                    {pkg.badge}
                  </span>
                  <span className="text-[11px] font-bold text-stone-500">
                    {pkg.minOrder}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-display font-black text-[#231F20] uppercase leading-tight">
                    {pkg.name}
                  </h3>
                  <div className="text-2xl font-display font-black text-[#FF5E14] mt-1">
                    Rp{pkg.price.toLocaleString('id-ID')}
                    <span className="text-xs text-stone-500 font-normal"> / porsi</span>
                  </div>
                </div>

                <p className="text-xs text-[#574B45] leading-relaxed">
                  {pkg.desc}
                </p>

                {/* Inclusions */}
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <span className="text-[10px] font-display font-black uppercase text-stone-500 block">
                    Menu Dalam Paket:
                  </span>
                  {pkg.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#7BA03C] flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => handleOrderSpecificPackage(pkg)}
                  className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Pesan Katering via WA</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Custom Inquiry Form & Corporate Perks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">
          
          {/* Left Column: Perks & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#231F20]/10 shadow-sm space-y-6">
              <h3 className="text-2xl font-display font-black text-[#231F20] uppercase">
                Keunggulan Layanan Katering Kami
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
                <p className="text-xs text-[#78350F]/80">Tersedia dokumen perpajakan & kwitansi resmi untuk instansi perusahaan & kantor.</p>
              </div>

              <div className="bg-[#88AB58]/20 p-5 rounded-2xl border-2 border-[#88AB58]/40 space-y-1.5">
                <Gift className="w-6 h-6 text-[#14532D]" />
                <h4 className="font-display font-black text-[#14532D] text-sm uppercase">Free Kustom Sticker</h4>
                <p className="text-xs text-[#14532D]/80">Gratis stiker logo kantor atau nama acara syukuran untuk pesanan katering.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-6 bg-white text-[#231F20] rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-[#231F20]/10">
            <div className="space-y-1 mb-6 border-b border-[#F3ECE0] pb-4">
              <span className="text-xs font-display font-black uppercase tracking-wider text-[#FF5E14]">
                Hitung Porsi & Jadwal
              </span>
              <h3 className="text-2xl font-display font-black text-[#231F20] uppercase">
                Form Konsultasi Katering
              </h3>
              <p className="text-xs text-stone-600">
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
                    Pilihan Paket
                  </label>
                  <select
                    name="packageChoice"
                    value={formData.packageChoice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-sm font-medium"
                  >
                    <option value="Paket Bento Box Hemat Kantor">Paket Bento Box Hemat Kantor</option>
                    <option value="Paket Bento Spesial Meeting & Seminar">Paket Bento Spesial Meeting & Seminar</option>
                    <option value="Tumpeng Mini Nusantara (Personal)">Tumpeng Mini Nusantara (Personal)</option>
                    <option value="Tumpeng Tampah Tradisional Besar">Tumpeng Tampah Tradisional Besar</option>
                    <option value="Kustom Menu / Sesuai Budget">Kustom Menu / Sesuai Budget</option>
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
                  placeholder="Contoh: Sambal tolong dipisah, butuh invoice faktur resmi..."
                  value={formData.customNotes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-[#FAF4E8] border-2 border-[#231F20]/10 rounded-2xl focus:border-[#FF5E14] focus:outline-none text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display font-black py-4 rounded-full text-sm uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4 cursor-pointer transition-all hover:scale-102"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Konsultasikan via WhatsApp Katering →</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
