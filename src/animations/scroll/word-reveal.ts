import { gsap } from "../../lib/gsap";

type WordRevealOptions = {
  dimColor?: string;
  brightColor?: string;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
};

const DEFAULTS: Required<WordRevealOptions> = {
  dimColor: "rgba(255, 255, 255, 0.2)",
  brightColor: "#ffffff",
  stagger: 0.05,
  start: "top 75%",
  end: "bottom 60%",
  scrub: true as unknown as number,
};

function splitIntoWords(el: HTMLElement): HTMLSpanElement[] {
  if (el.dataset.wordSplit === "done") {
    return Array.from(
      el.querySelectorAll<HTMLSpanElement>("[data-word]")
    );
  }

  const text = el.textContent ?? "";
  el.innerHTML = "";

  const wordEls: HTMLSpanElement[] = [];
  const tokens = text.split(/(\s+)/);

  tokens.forEach((token) => {
    if (!token) return;
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(token));
      return;
    }
    const word = document.createElement("span");
    word.dataset.word = "";
    word.textContent = token;
    word.style.display = "inline-block";
    word.style.willChange = "color";
    el.appendChild(word);
    wordEls.push(word);
  });

  el.dataset.wordSplit = "done";
  return wordEls;
}

export function createWordReveal(
  target: HTMLElement,
  options: WordRevealOptions = {}
): gsap.core.Tween | null {
  const opts = { ...DEFAULTS, ...options };
  const words = splitIntoWords(target);
  if (!words.length) return null;

  gsap.set(words, { color: opts.dimColor });

  return gsap.to(words, {
    color: opts.brightColor,
    ease: "none",
    stagger: { each: opts.stagger, ease: "none" },
    scrollTrigger: {
      trigger: target,
      start: opts.start,
      end: opts.end,
      scrub: opts.scrub,
    },
  });
}
