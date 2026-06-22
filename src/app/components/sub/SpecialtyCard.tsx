import { Link } from "react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

/**
 * Glass card used in the "Especialidades" grid — dark translucent surface,
 * gold outline icon, title, description and a "Saiba mais" link.
 */
export function SpecialtyCard({
  icon: Icon,
  title,
  description,
  to = "/especialidades",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;
}) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col justify-between gap-12 bg-white/[0.06] p-8 transition-colors duration-300 hover:bg-white/[0.1]"
    >
      <Icon className="size-12 text-gold-700" strokeWidth={1.5} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-white text-[20px]" style={{ fontWeight: 400 }}>
            {title}
          </h3>
          <p className="font-display text-white/70 text-[16px]" style={{ fontWeight: 400, lineHeight: 1.5 }}>
            {description}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 font-display text-white text-[14px]" style={{ fontWeight: 600 }}>
          Saiba mais
          <ArrowRight className="size-5 text-gold-600 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}
