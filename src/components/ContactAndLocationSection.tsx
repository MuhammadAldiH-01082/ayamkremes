import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Instagram, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/defaultCatalogue';

export default function ContactAndLocationSection() {
  const openWhatsApp = (type: string) => {
    let text = `Halo ${CONTACT_INFO.brandName}, saya ingin bertanya seputar info outlet dan pemesanan.`;
    if (type === 'catering') {
      text = `Halo ${CONTACT_INFO.brandName}, saya ingin konsultasi paket katering kantor / acara keluarga. Boleh minta bantuan info menu dan pricelist?`;
    }
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="lokasi" className="py-16 sm:py-20 bg-[#FAF4E8] text-[#231F20] scroll-mt-20 border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEBD11]/20 border border-[#FEBD11]/40 text-[#78350F] text-xs font-display font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Pusat Informasi & Kontak
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#231F20] uppercase tracking-tight">
            LOKASI & HUBUNGI KAMI
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#FF5E14] font-bold">
            dapur produksi utama & layanan siap antar se-Jabodetabek
          </p>
        </div>

        {/* Grid: Location details & Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Outlet & Operational Hours */}
          <div className="lg:col-span-7 bg-[#231F20] text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEBD11] text-[#231F20] text-xs font-display font-black uppercase">
                <MapPin className="w-4 h-4" />
                Dapur Utama & Outlet
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                  Ayam Kremes Jakarta - Senopati
                </h3>
                <p className="text-stone-300 text-sm sm:text-base mt-2 leading-relaxed">
                  {CONTACT_INFO.address}
                </p>
              </div>

              {/* Hours Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-700">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#FEBD11] font-display font-bold text-xs uppercase tracking-wider">
                    <Clock className="w-4 h-4" />
                    Jam Buka Outlet
                  </div>
                  <p className="text-sm text-stone-200 font-bold">{CONTACT_INFO.operationalHours.weekdays}</p>
                  <p className="text-xs text-stone-400">{CONTACT_INFO.operationalHours.weekends}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#88AB58] font-display font-bold text-xs uppercase tracking-wider">
                    <MessageCircle className="w-4 h-4" />
                    Hotline Pesanan Katering
                  </div>
                  <p className="text-sm text-stone-200 font-bold">Fast Response via WhatsApp</p>
                  <p className="text-xs text-stone-400">Pemesanan H-1 untuk Bento & H-2 untuk Tumpeng</p>
                </div>
              </div>

              {/* Map Preview */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FEBD11] text-[#231F20] flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-300">Petunjuk Arah Google Maps</p>
                    <p className="text-sm font-bold text-white">Navigasi ke Outlet Senopati</p>
                  </div>
                </div>
                <a 
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-[#FEBD11] hover:bg-[#E5A80F] text-[#231F20] font-display font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Buka Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Delivery Coverage Badge */}
            <div className="pt-4 border-t border-stone-700 text-xs text-stone-300 flex items-center gap-2">
              <span>🚚 <strong>Area Antar:</strong> Seluruh DKI Jakarta, Tangerang, Tangsel (BSD, Bintaro), Depok, & Bekasi.</span>
            </div>
          </div>

          {/* Right: Direct Hotline Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#231F20]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FF5E14] text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <span className="text-[10px] font-display font-black uppercase tracking-wider text-[#FF5E14] bg-[#FF5E14]/10 px-3 py-1 rounded-full">
                  Respon Cepat
                </span>
              </div>
              <div>
                <h4 className="font-display font-black text-xl text-[#231F20] uppercase">
                  WhatsApp Customer Care
                </h4>
                <p className="text-xs text-[#574B45] mt-1 leading-relaxed">
                  Konsultasi menu, request tumpeng kustom, cek ongkir, dan konfirmasi jadwal katering langsung dengan admin kami.
                </p>
                <p className="text-xl font-display font-black text-[#FF5E14] mt-2">
                  {CONTACT_INFO.whatsappDisplay}
                </p>
              </div>
              <button
                onClick={() => openWhatsApp('catering')}
                className="w-full bg-[#FF5E14] hover:bg-[#E04F00] text-white font-display font-black py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-102"
              >
                <span>Chat WhatsApp Sekarang</span>
              </button>
            </div>

            {/* Contact Channels */}
            <div className="bg-white rounded-3xl p-6 border-2 border-[#231F20]/10 shadow-sm space-y-3">
              <h4 className="font-display font-black text-[#231F20] text-sm uppercase">
                Kontak Lainnya
              </h4>
              
              <div className="space-y-2.5 text-xs text-[#574B45]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FF5E14] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#231F20]">{CONTACT_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FF5E14] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#231F20]">{CONTACT_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                  <div>
                    <a href={CONTACT_INFO.socialMedia.instagramUrl} target="_blank" rel="noreferrer" className="font-bold text-[#231F20] hover:underline">
                      {CONTACT_INFO.socialMedia.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
