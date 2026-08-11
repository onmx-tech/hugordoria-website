import svgPaths from "../../../imports/svg-nx92b0rij3";

const stroke = {
  stroke: "var(--color-accent-gold)",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2,
  fill: "none",
};

const strokeThin = { ...stroke, strokeWidth: 1.5 };





export function CardArrow() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden="true">
      <path d="M19 12H5" stroke="var(--color-accent-gold-light)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 17L19 12" stroke="var(--color-accent-gold-light)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 7L19 12" stroke="var(--color-accent-gold-light)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}
