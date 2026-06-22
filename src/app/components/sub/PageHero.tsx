import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Container } from "./primitives";
import { BrainGraphic } from "./BrainGraphic";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const ease = [0.22, 1, 0.36, 1] as const;

type Badge = { value: string; label: string };

/**
 * Editorial, award-style subpage header: a chip-style eyebrow, a strong Geist
 * title and supporting text on the left, paired with a framed image (overlay +
 * floating stat badge) on the right. Falls back to the brain graphic if no
 * image is supplied.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  badge,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image?: string;
  imageAlt?: string;
  badge?: Badge;
  ghost?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-bg-deeper) 0%, var(--color-bg-deeper) 55%, var(--color-bg-deep) 100%)" }}
    >
      <Container className="relative z-10 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-16">
          {/* text */}
          <motion.div
            className="flex flex-col items-start gap-7 lg:col-span-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5">
              <span className="size-1.5 rounded-full bg-gold-600" />
              <span className="font-mono uppercase tracking-[0.16em] text-[12px] text-cream" style={{ fontWeight: 500 }}>
                {eyebrow}
              </span>
            </span>

            <h1
              className="font-display text-cream tracking-[-0.04em] text-[clamp(40px,5.6vw,68px)]"
              style={{ fontWeight: 500, lineHeight: 1.05 }}
            >
              {title}
            </h1>

            {intro && (
              <p
                className="max-w-[540px] font-display text-white/70 text-[clamp(17px,1.7vw,21px)]"
                style={{ fontWeight: 400, lineHeight: 1.5 }}
              >
                {intro}
              </p>
            )}

            {children}
          </motion.div>

          {/* visual */}
          <motion.div
            className="relative lg:col-span-6"
            initial={{ opacity: 0, scale: 1.04, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[28px] ring-1 ring-white/15">
              {image ? (
                <ImageWithFallback
                  src={image}
                  alt={imageAlt ?? ""}
                  className="size-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-navy-800">
                  <BrainGraphic className="h-auto w-[78%] opacity-90" />
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
