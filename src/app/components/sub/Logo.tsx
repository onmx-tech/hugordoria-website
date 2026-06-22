import svgPaths from "../../../imports/Doria/svg-2kjzh3eo0t";

/**
 * The large "HUGO DORIA" display wordmark used in the hero.
 * Reuses the exact vector paths exported from Figma.
 */
export function Wordmark({ className = "", fill = "white" }: { className?: string; fill?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1858 237.44"
      aria-label="Hugo Doria"
      role="img"
    >
      <g>
        <path d={svgPaths.p5bb1360} fill={fill} />
        <path d={svgPaths.pc542900} fill={fill} />
        <path d={svgPaths.p140381f0} fill={fill} />
        <path d={svgPaths.p273b40f0} fill={fill} />
        <path d={svgPaths.p38537e80} fill={fill} />
        <path d={svgPaths.p3138bf00} fill={fill} />
        <path d={svgPaths.p22049a80} fill={fill} />
        <path d={svgPaths.p1a440100} fill={fill} />
        <path d={svgPaths.p1aac4900} fill={fill} />
      </g>
    </svg>
  );
}

/**
 * Compact text monogram for the nav bar / inline use.
 */
export function Monogram({ tone = "light" }: { tone?: "light" | "dark" }) {
  const main = tone === "light" ? "text-white" : "text-navy-600";
  return (
    <span className={`font-display ${main} inline-flex items-baseline tracking-[-0.04em]`}>
      <span className="text-[0.65em] mr-[0.25em] tracking-[0.08em] text-gold-600">DR.</span>
      <span style={{ fontWeight: 700 }} className="text-[1.15em]">HUGO DORIA</span>
      <span className="text-gold-600 ml-[0.1em]">®</span>
    </span>
  );
}

/**
 * The bronze "NEUROCIRURGIÃO / Camada" stacked logo used in the footer.
 */
export function FooterLogo() {
  return (
    <div className="inline-grid place-items-start">
      <div className="ml-[70px]">
        <svg className="block h-[8px] w-[106px]" fill="none" preserveAspectRatio="none" viewBox="0 0 105.658 8.27357">
          <g>
            <path d={svgPaths.p32b2e680} fill="#B78E30" />
            <path d={svgPaths.p388bbe40} fill="#B78E30" />
            <path d={svgPaths.p11de5580} fill="#B78E30" />
            <path d={svgPaths.p27d0dff0} fill="#B78E30" />
            <path d={svgPaths.p1bf3c480} fill="#B78E30" />
            <path d={svgPaths.p3674af00} fill="#B78E30" />
            <path d={svgPaths.pd2dba00} fill="#B78E30" />
            <path d={svgPaths.p17ebd300} fill="#B78E30" />
            <path d={svgPaths.p7f04100} fill="#B78E30" />
            <path d={svgPaths.p19bf5a00} fill="#B78E30" />
            <path d={svgPaths.p5094300} fill="#B78E30" />
            <path d={svgPaths.p37bc3100} fill="#B78E30" />
            <path d={svgPaths.p2195ba00} fill="#B78E30" />
            <path d={svgPaths.p1a136f00} fill="#B78E30" />
          </g>
        </svg>
      </div>
      <svg className="block h-[31px] w-[258px] mt-[12px]" fill="none" preserveAspectRatio="none" viewBox="0 0 258 30.8763">
        <g clipPath="url(#clip_footerlogo)">
          <path d={svgPaths.p81b8980} fill="#B78E30" />
          <path d={svgPaths.p11a36640} fill="#B78E30" />
          <path d={svgPaths.p3dc46180} fill="#B78E30" />
          <path d={svgPaths.p2bd68500} fill="#B78E30" />
          <path d={svgPaths.p2b958c80} fill="#B78E30" />
          <path d={svgPaths.p2735a400} fill="#B78E30" />
          <path d={svgPaths.p1b4d0f00} fill="#B78E30" />
          <path d={svgPaths.p19c37c80} fill="#B78E30" />
          <path d={svgPaths.p1e2b3880} fill="#B78E30" />
          <path d={svgPaths.p394d2b40} fill="#B78E30" />
          <path d={svgPaths.p7117700} fill="#B78E30" />
        </g>
        <defs>
          <clipPath id="clip_footerlogo">
            <rect fill="white" height="30.8763" width="258" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
