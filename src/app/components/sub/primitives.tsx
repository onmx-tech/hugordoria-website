import { Link } from "react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";

/* ----------------------------------------------------------------------------
 * Eyebrow — small uppercase mono label that sits above headings.
 * -------------------------------------------------------------------------- */
export function Eyebrow({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "light" | "dark";
  className?: string;
}) {
  const color =
    tone === "gold" ? "text-gold-700" : tone === "light" ? "text-cream" : "text-navy-600";
  return (
    <span
      className={`font-mono uppercase tracking-[0.18em] text-[13px] ${color} ${className}`}
      style={{ fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------------------
 * SectionHeading — large display/headline text used to open sections.
 * -------------------------------------------------------------------------- */
export function SectionHeading({
  children,
  tone = "dark",
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const color = tone === "light" ? "text-white" : "text-navy-600";
  return (
    <Tag
      className={`font-body ${color} tracking-[-0.02em] text-[clamp(28px,4vw,40px)] ${className}`}
      style={{ fontWeight: 400, lineHeight: 1.18 }}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------------------
 * Divider — the hairline rule used throughout the design.
 * -------------------------------------------------------------------------- */
export function Divider({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <div
      className={`h-px w-full ${className}`}
      style={{ backgroundColor: tone === "light" ? "var(--doria-line-light)" : "var(--doria-line-dark)" }}
    />
  );
}

/* ----------------------------------------------------------------------------
 * Button — pill CTA. Variants: gold (primary), outline, ghost.
 * -------------------------------------------------------------------------- */
type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline-dark" | "outline-light";
  icon?: "arrow" | "chat" | "none";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "gold",
  icon = "none",
  className = "",
  type = "button",
}: ButtonProps) {
  const base =
    "group/btn inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 transition-all duration-300 cursor-pointer select-none hover:-translate-y-0.5";
  const styles: Record<string, string> = {
    gold: "bg-gold-600 text-white hover:bg-gold-500",
    "outline-dark": "border border-navy-600/40 text-navy-600 hover:bg-navy-600 hover:text-white",
    "outline-light": "border border-white/30 text-white hover:bg-white hover:text-navy-600",
  };
  const content = (
    <span className="font-display inline-flex items-center gap-3" style={{ fontWeight: 500 }}>
      {icon === "chat" && <MessageCircle className="size-5" strokeWidth={1.7} />}
      {children}
      {icon === "arrow" && (
        <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={1.7} />
      )}
    </span>
  );
  const cls = `${base} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

/* ----------------------------------------------------------------------------
 * Stat — large figure + label row (used in the results section).
 * -------------------------------------------------------------------------- */
export function Stat({ value, label, tone = "dark" }: { value: string; label: string; tone?: "dark" | "light" }) {
  const main = tone === "light" ? "text-white" : "text-navy-600";
  const sub = tone === "light" ? "text-white/60" : "text-black/60";
  return (
    <div className="flex flex-col gap-5 w-full">
      <Divider tone={tone} />
      <div className="flex items-baseline justify-between gap-4 w-full">
        <span className={`font-display ${main} tracking-[-0.03em] text-[clamp(40px,5vw,64px)]`} style={{ fontWeight: 400, lineHeight: 1.05 }}>
          {value}
        </span>
        <span className={`font-display ${sub} tracking-[-0.01em] text-[clamp(15px,1.4vw,20px)] text-right`} style={{ fontWeight: 400 }}>
          {label}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------
 * Page section wrapper with consistent max width + horizontal padding.
 * -------------------------------------------------------------------------- */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-8 ${className}`}>{children}</div>;
}
