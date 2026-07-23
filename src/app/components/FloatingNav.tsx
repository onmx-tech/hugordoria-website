import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Navegação flutuante fixa embaixo — aparece ao rolar, em TODAS as páginas.
// Links de navegação do site (rotas); ativo conforme a rota atual.
const NAV_LINKS = [
  { label: "Início", to: "/" },
  { label: "Especialidades", to: "/especialidades" },
  { label: "Sobre mim", to: "/sobre-mim" },
  { label: "Depoimentos", to: "/depoimentos" },
] as const;

const SHOW_THRESHOLD = 480;

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    if (to === "/especialidades") return pathname.startsWith("/especialidade");
    return pathname.startsWith(to);
  };

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      // Some depois do threshold; enquanto rola PRA BAIXO (lendo) esconde para
      // não cobrir o conteúdo; reaparece ao rolar PRA CIMA (intenção de agir).
      if (y <= SHOW_THRESHOLD) setVisible(false);
      else if (goingDown) setVisible(false);
      else if (goingUp) setVisible(true);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A página de contato JÁ é o CTA de agendamento (formulário + canais):
  // a nav flutuante fica redundante e, no mobile, colide com o botão de envio.
  if (pathname.startsWith("/contato")) return null;

  return (
    <nav
      ref={navRef}
      aria-label="Navegação flutuante"
      // Mobile: FAB no canto inferior-direito (não cobre o texto/rosto ao rolar).
      // Desktop (md+): pill de navegação centralizado embaixo.
      className={`fixed bottom-6 right-5 z-50 flex items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] gap-1 px-1.5 py-1.5 md:right-auto md:left-1/2 md:-translate-x-1/2 ${visible ? "translate-y-0" : "translate-y-[calc(100%+2.5rem)]"}`}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        background: "rgba(18, 33, 54, 0.75)",
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
      }}
    >
      {NAV_LINKS.map((link) => {
        const active = isActive(link.to);
        return (
          <Link
            key={link.to}
            to={link.to}
            className="relative hidden md:inline-block rounded-full px-4 py-2 text-[13px] font-medium leading-none tracking-[-0.01em] transition-all duration-300 whitespace-nowrap"
            style={{
              fontFamily: "'Geist', sans-serif",
              textDecoration: "none",
              color: active ? "var(--color-bg-deep)" : "color-mix(in srgb, var(--color-bg-cream) 60%, transparent)",
              background: active ? "var(--color-accent-gold-light)" : "transparent",
            }}
          >
            {link.label}
          </Link>
        );
      })}

      {/* Segundo caminho de conversão, presente em todas as páginas.
          No mobile a barra é um FAB e só cabe a ação primária — lá o acesso
          à segunda opinião fica no hero e no rodapé. */}
      <Link
        to="/segunda-opiniao"
        className="relative hidden md:inline-block rounded-full border px-4 py-2 text-[13px] font-medium leading-none tracking-[-0.01em] transition-all duration-300 whitespace-nowrap"
        style={{
          fontFamily: "'Geist', sans-serif",
          textDecoration: "none",
          color: isActive("/segunda-opiniao")
            ? "var(--color-bg-deep)"
            : "var(--color-bg-cream)",
          background: isActive("/segunda-opiniao")
            ? "var(--color-accent-gold-light)"
            : "transparent",
          borderColor: "color-mix(in srgb, var(--color-bg-cream) 30%, transparent)",
        }}
      >
        Segunda opinião
      </Link>

      <a
        href="https://wa.me/5511971622777"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full px-5 py-2.5 md:ml-1 md:px-4 md:py-2 text-[14px] md:text-[13px] font-medium leading-none tracking-[-0.01em] transition-all duration-300 whitespace-nowrap"
        style={{
          fontFamily: "'Geist', sans-serif",
          color: "var(--color-bg-cream)",
          background: "color-mix(in srgb, var(--color-accent-gold-light) 15%, transparent)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-accent-gold-light)" }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Agendar
      </a>
    </nav>
  );
}
