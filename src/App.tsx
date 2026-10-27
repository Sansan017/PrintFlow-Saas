import { Link, NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/" className="app-brand">
            <span className="app-brand__mark">PF</span>
            <span>PrintFlow</span>
          </Link>
          <nav className="app-nav" aria-label="Navigasi utama">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "app-nav__link" + (isActive ? " is-active" : "")
              }
            >
              Beranda
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        PrintFlow — Koordinasi Produksi Percetakan
      </footer>
    </div>
  );
}
