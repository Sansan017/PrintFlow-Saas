import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="stack" style={{ textAlign: "center", paddingTop: "24px" }}>
      <h1 style={{ fontSize: "1.5rem" }}>Halaman tidak ditemukan</h1>
      <p className="muted">
        URL yang Anda buka tidak ada di PrintFlow.
      </p>
      <Link to="/" className="btn btn--primary" style={{ alignSelf: "center" }}>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
