# PrintFlow SaaS

Aplikasi koordinasi produksi percetakan. Membantu percetakan mengetahui
pesanan yang masuk, status produksi, penanggung jawab, tenggat, hambatan,
dan riwayat aktivitas — dapat digunakan dari HP Android maupun laptop.

> **Status:** Fase 0 — Fondasi Proyek. Fitur bisnis (autentikasi, organisasi,
> pesanan) belum aktif. Lihat bagian "Roadmap" di bawah.

## Teknologi

- **Frontend:** React 18 + TypeScript (strict mode) + Vite
- **Routing:** React Router v6
- **Database & Autentikasi:** Supabase (PostgreSQL + Auth + RLS)
- **Testing:** Vitest + React Testing Library
- **Bahasa UI:** Bahasa Indonesia
- **Desain:** Mobile-first, responsif mulai dari lebar 360 px

## Struktur Proyek

```
printflow-saas/
├── index.html              # Entry HTML (lang="id", viewport mobile)
├── .env.example            # Contoh env TANPA secret
├── package.json
├── tsconfig*.json          # TypeScript strict mode (app + node)
├── vite.config.ts          # Konfigurasi Vite
├── vitest.config.ts        # Konfigurasi pengujian (jsdom)
└── src/
    ├── main.tsx            # Bootstrap React + Router
    ├── App.tsx             # Shell aplikasi (header, nav, footer)
    ├── vite-env.d.ts       # Tipe Vite (import.meta.env)
    ├── lib/
    │   ├── env.ts          # Membaca & memvalidasi env Supabase
    │   └── supabase.ts     # Klien Supabase (singleton, lazy)
    ├── pages/
    │   ├── HomePage.tsx    # Halaman beranda + status koneksi
    │   ├── HomePage.test.tsx
    │   └── NotFoundPage.tsx
    ├── styles/
    │   └── global.css      # Sistem desain mobile-first
    └── test/
        └── setup.ts        # Setup Vitest + jest-dom
```

## Setup Lokal

### 1. Install dependencies

```bash
npm install
```

### 2. Konfigurasi environment

Salin `.env.example` menjadi `.env` lalu isi dengan kredensial Supabase Anda:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://<id-proyek>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key-dari-dashboard-supabase>
```

**Penting:**
- `VITE_SUPABASE_ANON_KEY` dirancang untuk dipakai di browser (aman ditampilkan
  di client). Tetap jangan menyebarluaskannya secara tidak perlu.
- **JANGAN** menyimpan `SUPABASE_SERVICE_ROLE_KEY` di `.env` atau di kode
  frontend. Service-role key hanya boleh dipakai di lingkungan server/edge
  function.
- `.env` sudah ada di `.gitignore` dan tidak akan masuk ke repositori.

### 3. Jalankan dev server

```bash
npm run dev
```

Buka `http://localhost:5173`. Tanpa `.env` yang terisi, aplikasi tetap tampil
namun menampilkan peringatan "Supabase belum dikonfigurasi".

## Skrip yang Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan dev server Vite |
| `npm run build` | Typecheck + build produksi ke `dist/` |
| `npm run typecheck` | Pemeriksaan tipe TypeScript saja |
| `npm run test` | Menjalankan seluruh unit/component test |
| `npm run test:watch` | Mode watch untuk pengujian |
| `npm run preview` | Preview hasil build |

## Roadmap (Fase Pengembangan)

| Fase | Status | Ringkasan |
|---|---|---|
| 0 — Fondasi Proyek | ✅ Selesai | React+TS+Vite, shell responsif, klien Supabase, kerangka test |
| 1 — Autentikasi & Isolasi Organisasi | ⏳ Menunggu persetujuan | Registrasi, login, organisasi, role, RLS |
| 2 — Pesanan & Kategori Produk | ⏳ | CRUD pesanan, item, kategori |
| 3 — Board Produksi & Koordinasi | ⏳ | Workflow status, riwayat, dashboard |
| 4 — Pengujian Beta & Ketahanan | ⏳ | Unit, integration, e2e, isolasi tenant |
| 5 — Deployment Beta | ⏳ | Hosting, env, redirect Supabase Auth |
| 6 — Validasi Bisnis & Monetisasi | ⏳ | Setelah pemakaian beta nyata |

Setiap fase dikerjakan, diverifikasi, dan dilaporkan sebelum lanjut ke fase
berikutnya. Lihat laporan terperinci di akhir setiap fase.

## Arsitektur (Ringkasan)

- **Sumber kebenaran data:** PostgreSQL di Supabase (bukan localStorage).
  LocalStorage hanya dipakai untuk preferensi UI nonkritis di fase mendatang.
- **Multi-tenant:** Rencana entitas — organizations, profiles,
  organization_members, product_categories, products, orders, order_items,
  order_stage_history, production_notes, activity_logs. Semua data bisnis
  terikat ke `organization_id` dan diisolasi via RLS.
- **Keamanan:** Izin penting ditegakkan di database (RLS), bukan hanya dengan
  menyembunyikan UI. Service-role key tidak pernah menyentuh frontend.
- **Akses client:** Aplikasi memakai anon key + RLS. Tidak ada backend tambahan
  pada fase ini; Supabase cukup.

## Catatan Keamanan

- `.env.example` tidak berisi secret nyata.
- `.gitignore` mengecualikan `.env`, `node_modules/`, `dist/`.
- Tidak ada service-role key di kode atau konfigurasi frontend.
- Build produksi (`dist/`) hanya berisi anon key (publik by design).

## Status Verifikasi Fase 0

- ✅ Proyek dapat di-install dan dijalankan (`npm install` → `npm run dev`).
- ✅ TypeScript dan build tidak memiliki error (`npm run typecheck`, `npm run build`).
- ✅ `.env.example` tidak berisi secret nyata.
- ✅ Git tidak berisi file rahasia (`.env` di `.gitignore`).
- ✅ Tampilan mobile-first, tidak ada horizontal overflow pada 360 px.
- ✅ Repositori baru terpisah dari aplikasi lama (mulai dari nol).
- ✅ Kerangka testing berfungsi (Vitest, 2 test lulus).

## Langkah Manual Pemilik Proyek

1. Inisialisasi repositori Git baru: `git init`, lalu commit pertama.
2. Buat proyek Supabase baru (terpisah dari proyek lama).
3. Isi `.env` dengan URL dan anon key proyek Supabase baru.
4. Setujui Fase 1 untuk memulai penerapan autentikasi & isolasi organisasi.
