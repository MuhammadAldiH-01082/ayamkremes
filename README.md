# 🍗 Ayam Kremes Jakarta - Website Katalog & Pemesanan Katering

Website katalog menu resmi dan sistem konsultasi pemesanan katering untuk **Ayam Kremes Jakarta**. Dibangun dengan **React 19**, **TypeScript**, **Vite**, dan **Tailwind CSS v4**, mengusung desain retro modern yang ramah, bersih, dan cepat dimuat.

---

## 🌟 Fitur Utama

- **Hero 4-Kategori Interaktif**: Navigasi cepat untuk Ayam Kremes, Ayam Bakar, Nasi Bento, dan Nasi Tumpeng.
- **Katalog Menu Sederhana & Responsif**: Filter kategori berbasis pil, pencarian menu real-time, badge level pedas, dan pop-up modal detail menu.
- **Direct WhatsApp Order & Consultation**: Pemesanan satu klik langsung ke admin WhatsApp dengan pesan yang terformat rapi.
- **Formulir Estimasi Katering & Bento**: Form interaktif untuk menghitung kebutuhan porsi, jenis acara, tanggal, dan area pengiriman di Jabodetabek.
- **Dashboard Pengelola (Admin)**: Manajemen katalog menu, promo, dan histori pesanan berbasis Firebase Authentication & Firestore.
- **100% Mobile & Desktop Friendly**: Tampilan responsif dengan estetika visual *warm cream* dan tipografi ekspresif.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/) (HashRouter untuk kompatibilitas penuh GitHub Pages)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Database & Auth**: [Firebase Firestore & Auth](https://firebase.google.com/)

---

## 📁 Struktur Folder Proyek

```text
ayam-kremes-jakarta/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow untuk auto deploy ke GitHub Pages
├── public/
│   ├── 404.html                # SPA redirect fallback untuk GitHub Pages
│   └── _redirects              # Rewrite rules untuk Netlify / Cloudflare
├── src/
│   ├── components/             # Komponen UI (Hero, Catalogue, CateringHub, dll)
│   │   └── ui/                 # Komponen dasar UI (Dialog, Button, Sonner, dll)
│   ├── contexts/               # React Contexts (AuthContext, CartContext)
│   ├── data/                   # Data default menu, promo & kontak katering
│   ├── lib/                    # Helper & inisialisasi Firebase/utils
│   ├── pages/                  # Halaman aplikasi (Home, AdminDashboard)
│   ├── services/               # Layanan data Firestore (dataService)
│   ├── types.ts                # TypeScript Interfaces & Types
│   ├── App.tsx                 # Root Router & Providers
│   ├── main.tsx                # Entry point React
│   └── index.css               # Global CSS Tailwind
├── .env.example                # Contoh konfigurasi environment variables
├── .gitignore                  # File yang dikecualikan dari Git
├── index.html                  # Template HTML utama
├── package.json                # Dependensi & script project
├── tsconfig.json               # Konfigurasi TypeScript
├── vercel.json                 # Konfigurasi rewrite SPA Vercel
├── netlify.toml                # Konfigurasi rewrite SPA Netlify
└── vite.config.ts              # Konfigurasi Vite (base: '/ayamkremes/')
```

---

## 🚀 Cara Menjalankan di Lokal (Local Development)

### 1. Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18 atau lebih baru).

### 2. Instal Dependensi
Buka terminal di folder project lalu jalankan:
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser di `http://localhost:3000` (atau port yang tertera di terminal).

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil kompilasi siap saji akan disimpan di folder `dist/`.

---

## 📤 Cara Upload / Publish ke GitHub

Ikuti langkah-langkah berikut di terminal:

```bash
# 1. Inisialisasi Git (jika belum)
git init

# 2. Tambahkan semua file ke staging
git add .

# 3. Buat commit pertama
git commit -m "feat: initial commit - website katalog ayam kremes jakarta"

# 4. Ubah nama branch utama menjadi main
git branch -M main

# 5. Hubungkan ke repository GitHub Anda (ganti USERNAME dengan akun GitHub Anda)
git remote add origin https://github.com/USERNAME/ayamkremes.git

# 6. Push ke GitHub
git push -u origin main
```

---

## 🌐 Cara Mengaktifkan GitHub Pages (Deploy from a branch: `gh-pages`)

Workflow GitHub Actions (`.github/workflows/deploy.yml`) akan otomatis meng-compile proyek dan men-deploy folder `dist` ke branch `gh-pages`.

Untuk mengaktifkan tampilannya di GitHub Pages:
1. Pastikan perizinan Workflow di GitHub sudah aktif:
   - Masuk ke **Settings** > **Actions** > **General** > scroll ke bawah ke bagian **Workflow permissions** > pilih **Read and write permissions** > klik **Save**.
2. Masuk ke tab **Settings** > **Pages** (di sidebar kiri repository).
3. Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
4. Di bagian **Branch**, pilih branch **`gh-pages`** dan folder **`/(root)`**, lalu klik **Save**.
5. Website Anda akan otomatis aktif di:
   `https://USERNAME.github.io/ayamkremes/`

---

## ☁️ Opsi Hosting Lainnya

Selain GitHub Pages, proyek ini juga sudah dilengkapi konfigurasi siap pakai untuk:

- **Vercel**: Import repository GitHub ke Vercel, framework preset akan otomatis terdeteksi sebagai **Vite**.
- **Netlify**: Hubungkan repository ke Netlify dengan Build Command `npm run build` dan Publish Directory `dist`.
- **Cloudflare Pages**: Pilih preset framework **Vite**, build command `npm run build`, output `dist`.

---

## 📄 Lisensi

Hak Cipta © 2026 Ayam Kremes Jakarta. Seluruh hak cipta dilindungi undang-undang.
