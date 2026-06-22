import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Monogram } from "./sub/Logo";

// Header full do site (home + subpáginas): largura cheia, transparente sobre o
// hero, rola junto com a página (não fixo). A navegação persistente fica na
// FloatingNav fixa embaixo. Links por rotas; ativo conforme a rota atual.
const NAV_ITEMS: Array<{ label: string; to: string }> = [
  { label: "Início", to: "/" },
  { label: "Sobre mim", to: "/sobre-mim" },
  { label: "Depoimentos", to: "/depoimentos" },
  { label: "Especialidades", to: "/especialidades" },
  { label: "Doutorado", to: "/doutorado" },
  { label: "Eventos", to: "/eventos" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    if (to === "/especialidades") return pathname.startsWith("/especialidade");
    return pathname.startsWith(to);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="flex h-[72px] w-full items-center justify-between px-6 md:px-8">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-[15px]" style={{ textDecoration: "none" }}>
            <Monogram tone="light" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 font-display font-medium text-[14px] leading-[1.5]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={isActive(item.to) ? "text-gold-600" : "text-cream/90 transition-colors hover:text-gold-600"}
                style={{ textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-cream"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
              <path d="M0 1H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0 7H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[60] transition-opacity duration-300"
        style={{
          background: "rgba(13, 22, 38, 0.97)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-[72px] items-center justify-between px-6">
          <Monogram tone="light" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-cream"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-6 px-6 pt-12 font-display font-medium text-[26px] leading-[1.2] tracking-[-0.02em]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={isActive(item.to) ? "text-gold-600" : "text-cream"}
              style={{ textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
