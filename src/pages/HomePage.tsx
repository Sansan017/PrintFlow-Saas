import { isSupabaseConfigured } from "../lib/env";

export default function HomePage() {
  const configured = isSupabaseConfigured();

  return (
    <div className="stack">
      <section className="section">
        <h1 style={{ fontSize: "1.5rem", marginBottom: "8px" }}>
          PrintFlow
        </h1>
        <p className="muted" style={{ maxWidth: "60ch" }}>
          Koordinasi produksi percetakan untuk tim Anda. Kelola pesanan, lacak
          status produksi, dan kerja sama dari HP maupun laptop.
        </p>
      </section>

      <section className="card stack">
        <h2 style={{ fontSize: "1.15rem" }}>Status Koneksi</h2>
        {configured ? (
          <span className="badge badge--ok">Supabase terkonfigurasi</span>
        ) : (
          <div className="stack">
            <span className="badge badge--warn">
              Supabase belum dikonfigurasi
            </span>
            <p className="muted" style={{ maxWidth: "60ch" }}>
              Untuk mulai menggunakan PrintFlow, isi{" "}
              <code>VITE_SUPABASE_URL</code> dan{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> di file <code>.env</code>{" "}
              (lihat <code>.env.example</code>). Fitur autentikasi dan data
              pesanan akan aktif setelah koneksi Supabase tersedia.
            </p>
          </div>
        )}
      </section>

      <section className="card stack">
        <h2 style={{ fontSize: "1.15rem" }}>Status Fase Pengembangan</h2>
        <p className="muted">
          Saat ini berada pada Fase 0 — Fondasi Proyek.
        </p>
        <ul className="stack" style={{ margin: 0, paddingLeft: "1.1rem" }}>
          <li>React + TypeScript (strict) + Vite</li>
          <li>Responsive shell mobile-first (Bahasa Indonesia)</li>
          <li>Klien Supabase terhubung via environment variables</li>
          <li>Kerangka pengujian (Vitest + Testing Library)</li>
        </ul>
        <p className="muted">
          Fitur bisnis (autentikasi, organisasi, pesanan) mulai dibuka pada
          Fase 1 setelah persetujuan.
        </p>
      </section>
    </div>
  );
}
