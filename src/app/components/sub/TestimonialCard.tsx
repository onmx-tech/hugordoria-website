import { Divider } from "./primitives";

/**
 * Testimonial block — oversized gold quotation mark, the quote itself,
 * and the attribution (name + role), closed by a hairline divider.
 */
export function TestimonialCard({
  quote,
  name,
  role,
  tone = "dark",
}: {
  quote: string;
  name: string;
  role: string;
  tone?: "dark" | "light";
}) {
  const main = tone === "light" ? "text-white" : "text-navy-600";
  const muted = tone === "light" ? "text-white/40" : "text-navy-600/40";
  return (
    <figure className="flex flex-col gap-10">
      <span className="font-display text-gold-600 text-[64px] leading-[0.4] h-9 select-none" style={{ fontWeight: 700 }}>
        &ldquo;
      </span>
      <blockquote
        className={`font-body ${main} tracking-[-0.02em] text-[clamp(22px,2.6vw,40px)]`}
        style={{ fontWeight: 400, lineHeight: 1.18 }}
      >
        {quote}
      </blockquote>
      <figcaption className="flex flex-col gap-1">
        <span className={`font-body ${main} text-[20px]`} style={{ fontWeight: 400 }}>
          {name}
        </span>
        <span className={`font-body ${muted} text-[20px]`} style={{ fontWeight: 400 }}>
          {role}
        </span>
      </figcaption>
      <Divider tone={tone} />
    </figure>
  );
}
