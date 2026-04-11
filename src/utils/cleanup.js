export function killTimeline(tl) {
  tl?.kill();
  return null;
}

export function killTriggers(triggers = []) {
  triggers.forEach((t) => t?.kill());
}
