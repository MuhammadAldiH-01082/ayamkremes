import { MenuItem, Promo } from '@/types';

export const DEFAULT_MENUS: MenuItem[] = [
  {
    id: 'ak-01',
    name: 'Paket Ayam Kremes Spesial Jakarta',
    category: 'Paket Ayam Kremes',
    price: 32000,
    description: 'Ayam goreng empuk diungkep dengan 12 rempah nusantara pilihan, digoreng garing keemasan dengan taburan kremesan sari kaldu gurih renyah tahan lama. Disajikan komplit dengan Nasi Pulen Wangi, Tahu & Tempe Bacem, Lalapan Segar, dan Sambal Bawang Korek Pedas Nikmat.',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    isMain: true,
    spiceLevel: 3,
    badge: 'Paling Laris 🔥',
    portion: '1 Orang (Porsi Kenyang)',
    includes: ['Ayam Ungkep Goreng 1 Potong (Paha/Dada)', 'Kremesan Renyah Gurih 1 Cup', 'Nasi Putih Pulen Wangi Daun Pandan', 'Tahu & Tempe Goreng Bumbu Kuning', 'Lalapan Timun, Kemangi, Kol', 'Sambal Bawang Spesial'],
    variations: [
      { name: 'Paha Bawah / Atas', price: 32000 },
      { name: 'Dada Mentok', price: 34000 },
      { name: 'Paket Nasi Kotak Bento (Kemasan Rapi Acara)', price: 35000 },
      { name: 'Ayam Kampung Asli (Pre-order)', price: 42000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-02',
    name: 'Paket Ayam Bakar Madu Kremes',
    category: 'Ayam Bakar Kremes',
    price: 34000,
    description: 'Ayam bakar dengan olesan bumbu kecap madu gurih manis beraroma smokey arang kelapa alami, dipadukan kontras dengan taburan kremesan gurih asin renyah. Paket favorit pelanggan untuk makan siang kantor dan acara keluarga.',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    isMain: true,
    spiceLevel: 2,
    badge: 'Chef Recommendation ✨',
    portion: '1 Orang',
    includes: ['Ayam Bakar Madu 1 Potong', 'Kremesan Gurih Renyah', 'Nasi Putih Pulen', 'Tahu & Tempe Bakar', 'Sambal Terasi Bakar & Sambal Kecap', 'Lalapan Segar'],
    variations: [
      { name: 'Porsi Standar', price: 34000 },
      { name: 'Upgrade Dada Montok', price: 36000 },
      { name: 'Box Bento Mewah (Sendok + Tisu + Air Mineral)', price: 38000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-03',
    name: 'Nasi Kuning Box Komplit Jakarta',
    category: 'Nasi Kuning',
    price: 28000,
    description: 'Nasi kuning gurih beraroma santan kelapa murni, kunyit segar, serai, dan daun salam. Dilengkapi ayam suwir pedas manis/ayam kremes, telur balado iris, kering tempe kacang karamel, mie goreng kampung, timun, dan sambal terasi matang.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    isMain: true,
    spiceLevel: 2,
    badge: 'Favorit Sarapan & Syukuran 🍱',
    portion: '1 Porsi Kotak Bento',
    includes: ['Nasi Kuning Gurih Harum', 'Ayam Suwir / Potong Kremes', 'Orek Tempe Kering Manis', 'Telur Balado Separuh / Telur Dadar Rawis', 'Sambal Goreng Kentang Ati', 'Kerupuk Udang & Sambal'],
    variations: [
      { name: 'Box Reguler (Kemasan Mika Sekat)', price: 28000 },
      { name: 'Box Eksklusif Kraft (Acara Kantor/Rapat)', price: 33000 },
      { name: 'Paket Komplit Telur Utuh + Ayam Paha', price: 38000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-04',
    name: 'Nasi Tumpeng Mini Nusantara (Personal)',
    category: 'Nasi Tumpeng',
    price: 45000,
    description: 'Sajian tumpeng mini personal berbentuk kerucut mini dalam mika dome transparan premium berhias pita dan stiker kustom acara Anda. Cocok untuk ulang tahun, tasyakuran kantor, khitanan, dan hantaran istimewa.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isMain: true,
    spiceLevel: 2,
    badge: 'Spesial Event & Hantaran 👑',
    portion: '1 Orang (Kemasan Mewah Mika Dome)',
    includes: ['Tumpeng Mini Kuning / Uduk Kerucut', 'Ayam Goreng Lengkuas / Kremes', 'Perkedel Kentang Daging', 'Urap Sayur Bumbu Kelapa', 'Sambal Goreng Ati Ampela', 'Telur Dadar Gulung Rawis', 'Kering Kentang Mustofa Renyah', 'Sambal Bajak'],
    variations: [
      { name: 'Minimal Order 10 Pax (Free Kustom Stiker)', price: 45000 },
      { name: 'Paket VIP (Tambahan Empal Suwir & Udang Balado)', price: 55000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-05',
    name: 'Tumpeng Tampah Tradisional Besar (10 - 30 Orang)',
    category: 'Nasi Tumpeng',
    price: 550000,
    description: 'Masterpiece tumpeng tampah anyaman bambu tradisional beralas daun pisang dengan hiasan seni ukir sayuran (garnis bunga wortel, cabai, lobak, dan timun). Pilihan utama untuk grand opening, syukuran rumah baru, HUT kantor, dan momen bersejarah.',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    isMain: false,
    spiceLevel: 2,
    badge: 'Masterpiece Syukuran 🏆',
    portion: 'Pilihan 10, 15, 20, hingga 30 Porsi',
    includes: ['Tumpeng Kuning / Putih Gurih Bentuk Kerucut / Susun', 'Ayam Bakar / Goreng Kremes 1 Ekor Utuh Dipotong', 'Sambal Goreng Kentang Ati Petai', 'Urap Sayur Segar Lengkap', 'Perkedel Kentang Lembut', 'Telur Rawis & Telur Puyuh Pindang', 'Orek Tempe Kering Kacang', 'Hiasan Garnis Eksklusif & Sambal Tampah'],
    variations: [
      { name: 'Tampah 10-12 Porsi', price: 550000 },
      { name: 'Tampah 15-18 Porsi', price: 750000 },
      { name: 'Tampah 20-25 Porsi', price: 980000 },
      { name: 'Tampah Akbar 30 Porsi (Bonus Prasmanan Setup)', price: 1350000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-06',
    name: 'Paket Ayam Geprek Kremes Sambal Korek',
    category: 'Paket Ayam Kremes',
    price: 30000,
    description: 'Ayam goreng renyah yang digeprek langsung bersama ulekan cabai rawit merah segar, bawang putih, dan minyak panas gurih, lalu diselimuti limpahan kremesan kriuk. Sensasi pedas meledak dengan tekstur renyah tiada tanding.',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isMain: false,
    spiceLevel: 5,
    badge: 'Pedas Nampol 🌶️🌶️🌶️',
    portion: '1 Orang',
    includes: ['Ayam Crispy Geprek Ulek Kasar', 'Kremesan Sari Kaldu', 'Nasi Putih Pulen Hangat', 'Lalapan Timun Segar', 'Es Teh Manis (Dine-in / Paket)'],
    variations: [
      { name: 'Level 1-3 (Sedang)', price: 30000 },
      { name: 'Level 5 (Super Pedas Rawit Merah)', price: 32000 },
      { name: 'Topping Keju Mozarella Leleh', price: 37000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-07',
    name: 'Nasi Liwet Solo Ayam Suwir Kremes',
    category: 'Nasi Kuning',
    price: 33000,
    description: 'Nasi liwet khas beraroma kaldu ayam gurih bertabur areh santan kental, disajikan bersama suwiran ayam opor lembut, sayur labu siam manis gurih, telur pindang cokelat, dan tentu saja taburan kremesan renyah.',
    imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    isMain: false,
    spiceLevel: 1,
    badge: 'Gurih Otentik 🥥',
    portion: '1 Orang',
    includes: ['Nasi Liwet Kaldu Gurih', 'Ayam Suwir Opor Lembut', 'Sayur Labu Siam Kuah Gurih', 'Telur Pindang Separuh', 'Areh Santan Gurih', 'Kremesan Renyah'],
    variations: [
      { name: 'Porsi Standar', price: 33000 },
      { name: 'Paket Box Besek Tradisional (Estetik)', price: 42000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-08',
    name: 'Kremesan Kaldu Ayam Sari Gurih (Toples 250gr)',
    category: 'Lainnya',
    price: 25000,
    description: 'Kremesan renyah gurih legendaris khas Ayam Kremes Jakarta yang dikemas dalam toples kedap udara higienis. Terbuat dari sari kaldu ayam ungkep asli tanpa pengawet berbahaya. Renyah tahan hingga 2 bulan.',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    isMain: false,
    spiceLevel: 0,
    badge: 'Oleh-oleh Favorit 🍯',
    portion: '1 Toples Kedap Udara 250gr',
    includes: ['Toples Tabung Segel Alumunium Foil', '100% Sari Kaldu Ayam Asli', 'Tanpa Bahan Pengawet'],
    variations: [
      { name: 'Toples 250 gram (Original Gurih)', price: 25000 },
      { name: 'Toples 250 gram (Pedas Gurih Daun Jeruk)', price: 28000 },
      { name: 'Pouch Hemat 500 gram', price: 45000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-09',
    name: 'Aneka Sambal Khas Nusantara (Jar 150gr)',
    category: 'Lainnya',
    price: 22000,
    description: 'Koleksi sambal botolan olahan dapur kami dengan cabai segar dan minyak berkualitas. Pilihan sambal bawang korek, sambal matah kecombrang, sambal ijo teri medan, dan sambal cumi pedas.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    isMain: false,
    spiceLevel: 4,
    badge: 'Pelengkap Wajib 🌶️',
    portion: 'Jar Kaca Higienis 150gr',
    includes: ['Jar Kaca Segel', 'Cabai Rawit Segar Pilihan', 'Bawang & Rempah Segar'],
    variations: [
      { name: 'Sambal Bawang Korek Juara', price: 22000 },
      { name: 'Sambal Ijo Teri Medan', price: 25000 },
      { name: 'Sambal Terasi Bakar Limau', price: 22000 },
      { name: 'Sambal Cumi Asin Mercon', price: 32000 }
    ],
    createdAt: null
  },
  {
    id: 'ak-10',
    name: 'Es Jeruk Kelapa Segar & Aneka Minuman',
    category: 'Lainnya',
    price: 12000,
    description: 'Minuman segar pelengkap santap siang: Es Jeruk Peras Murni, Es Kelapa Muda Pandan, Es Cincau Susu Gula Aren, dan Es Teh Manis Melati Jumbo.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isMain: false,
    spiceLevel: 0,
    badge: 'Pelepas Dahaga 🍹',
    portion: '1 Cup Jumbo 500ml',
    includes: ['Cup Food-Grade', 'Es Batu Kristal Higienis', 'Gula Tebu Asli'],
    variations: [
      { name: 'Es Teh Manis Melati Jumbo', price: 6000 },
      { name: 'Es Jeruk Peras Asli', price: 12000 },
      { name: 'Es Kelapa Jeruk Segar', price: 18000 },
      { name: 'Es Cendol Nangka Santan Murni', price: 16000 }
    ],
    createdAt: null
  }
];

export const DEFAULT_PROMOS: Promo[] = [
  {
    id: 'promo-01',
    title: 'Diskon Katering Kantor 15%',
    description: 'Pesan paket Nasi Kotak / Bento minimal 30 pax untuk meeting, training, atau gathering kantor. Gratis ongkos kirim seluruh Jakarta & bonus buah segar.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    discountPercent: 15,
    active: true,
    createdAt: null
  },
  {
    id: 'promo-02',
    title: 'Gratis Kustom Topper & Pita Tumpeng',
    description: 'Setiap pemesanan Tumpeng Mini minimal 15 pax atau Tumpeng Tampah Besar, dapatkan gratis stiker desain nama acara, topper akrilik, dan pita eksklusif.',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    discountPercent: 10,
    active: true,
    createdAt: null
  }
];

export const CONTACT_INFO = {
  brandName: 'Ayam Kremes Jakarta',
  tagline: 'Otentik, Gurih & Renyah Legendaris Sejak 2018',
  phone: '+62 812-3456-7890',
  whatsapp: '6281234567890', // Format for wa.me
  whatsappDisplay: '+62 812-3456-7890',
  email: 'katering@ayamkremesjakarta.com',
  address: 'Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190',
  googleMapsUrl: 'https://maps.google.com/?q=Jakarta+Selatan',
  operationalHours: {
    weekdays: 'Senin - Jumat: 08:00 - 21:00 WIB',
    weekends: 'Sabtu - Minggu: 07:30 - 21:30 WIB',
    cateringOrder: 'Layanan Pesanan Katering: Buka 24 Jam via WhatsApp'
  },
  socialMedia: {
    instagram: '@ayamkremes.jakarta',
    instagramUrl: 'https://instagram.com',
    tiktok: '@ayamkremesjakarta',
    tiktokUrl: 'https://tiktok.com',
    gofood: 'Ayam Kremes Jakarta Official',
    grabfood: 'Ayam Kremes Jakarta Pusat'
  },
  cateringHighlights: [
    { title: 'Kapasitas Produksi', desc: 'Mampu memproduksi hingga 1.500 porsi nasi kotak & 30 tumpeng per hari.' },
    { title: 'Jaminan Rasa & Suhu', desc: 'Dikirim menggunakan thermal box khusus agar nasi & lauk tetap hangat dan kremesan tetap kriuk.' },
    { title: '100% Halal & Bersih', desc: 'Bahan baku bersertifikasi halal, dapur higienis, dan kemasan food-grade bersegel.' },
    { title: 'Fleksibilitas Menu', desc: 'Bisa kustomisasi lauk, level pedas sambal, kemasan besek / bento, dan invoice resmi instansi.' }
  ]
};
