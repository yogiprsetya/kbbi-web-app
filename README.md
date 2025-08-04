# KBBI Web App

Aplikasi web Kamus Besar Bahasa Indonesia (KBBI) yang dibangun dengan React, TypeScript, dan Vite. Aplikasi ini menyediakan akses mudah ke data KBBI dengan antarmuka yang modern dan responsif.

## Fitur

- 🔍 **Pencarian Kata**: Pencarian real-time dengan autocomplete
- 📚 **Navigasi Huruf**: Telusuri kata berdasarkan huruf awalnya (A-Z)
- 📖 **Detail Kata**: Tampilan lengkap arti, kelas kata, dan contoh penggunaan
- 📱 **Responsif**: Desain yang optimal untuk desktop dan mobile
- 🚀 **SEO Friendly**: URL yang bersih dan sitemap otomatis
- ⚡ **Fast**: Performa yang cepat dengan static generation

## Teknologi

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool dan development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework

## Struktur Data

Data KBBI disimpan dalam format JSON di folder `public/kbbi/` dengan struktur:

```
public/kbbi/
├── a/
│   ├── ayah.json
│   ├── ayam.json
│   └── ...
├── b/
│   ├── buku.json
│   └── ...
└── ...
```

Setiap file JSON berisi data kata dengan format:

```json
{
  "pranala": "http://kbbi.kemdikbud.go.id/entri/...",
  "entri": [
    {
      "nama": "kata",
      "nomor": "1",
      "pelafalan": "/ka.ta/",
      "bentuk_tidak_baku": [],
      "varian": [],
      "makna": [
        {
          "kelas": [
            {
              "kode": "n",
              "nama": "Nomina",
              "deskripsi": "kata benda"
            }
          ],
          "submakna": ["arti kata"],
          "info": "",
          "contoh": []
        }
      ]
    }
  ]
}
```

## Instalasi

1. Clone repository ini
2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan development server:

   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:3000`

## Build untuk Production

1. Build aplikasi:

   ```bash
   npm run build
   ```

2. Generate sitemap (opsional):

   ```bash
   npm run generate-sitemap
   ```

3. File hasil build akan tersedia di folder `dist/`

## Routing

Aplikasi menggunakan client-side routing dengan struktur URL:

- `/` - Halaman beranda dengan daftar huruf
- `/[huruf]` - Halaman daftar kata untuk huruf tertentu (contoh: `/a`)
- `/[huruf]/[kata]` - Halaman detail kata (contoh: `/a/ayah`)

## Fitur

Aplikasi ini dioptimalkan untuk SEO dengan:

- URL yang bersih dan deskriptif
- Sitemap otomatis (`/sitemap.xml`)
- Robots.txt untuk crawler
- Meta tags yang sesuai
- Static generation untuk performa optimal

## Deployment

Aplikasi dapat di-deploy ke berbagai platform:

### Netlify

1. Build aplikasi: `npm run build`
2. Upload folder `dist/` ke Netlify
3. Set base URL di `scripts/generate-sitemap.js`

### Vercel

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Deploy otomatis

### Static Hosting

1. Build aplikasi: `npm run build`
2. Upload folder `dist/` ke web server
3. Konfigurasi server untuk handle SPA routing

## Struktur Project

```
src/
├── components/
│   ├── Layout.tsx
│   └── SearchBar.tsx
├── pages/
│   ├── Home.tsx
│   ├── Letter.tsx
│   └── Word.tsx
├── utils/
│   └── kbbi.ts
├── App.tsx
└── main.tsx
```

## Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## Lisensi

MIT License - lihat file LICENSE untuk detail.

## Sumber Data

Data KBBI berasal dari [KBBI Kemendikbud](http://kbbi.kemdikbud.go.id/).

## Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.
