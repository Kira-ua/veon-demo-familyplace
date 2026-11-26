// FamilyPlace homepage behaviour. Everything here is an enhancement: without scripts the page shows
// every row, every price and the call buttons; anchors and the popover menu work natively.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const plural = (n: number) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "рік";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "роки";
  return "років";
};

/* Motion 1: the hero axis draws once, after the first paint. */
const axis = document.querySelector<HTMLElement>("[data-axis]");
if (axis) requestAnimationFrame(() => requestAnimationFrame(() => axis.classList.add("is-drawn")));

/* Motion 2: choose an age — rows that do not fit dim to 40 %. Rows with unknown age stay as they are. */
const yearButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-year]"));
const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-path]"));
const ageStatus = document.querySelector<HTMLElement>("[data-age-status]");
const statusDefault = ageStatus?.textContent ?? "";
let chosen: number | null = null;

function paint(age: number | null) {
  const fits: string[] = [];
  for (const row of rows) {
    const from = Number(row.dataset.from), to = Number(row.dataset.to);
    const known = row.dataset.from !== undefined;
    const ok = age === null || !known || (age >= Math.floor(from) && age <= Math.ceil(to));
    row.classList.toggle("is-dim", !ok);
    if (age !== null && known && ok) fits.push(row.dataset.name ?? "");
  }
  return fits;
}

function choose(age: number | null) {
  chosen = age;
  for (const b of yearButtons) {
    const v = b.dataset.year === "all" ? null : Number(b.dataset.year);
    b.setAttribute("aria-pressed", String(v === age));
  }
  const fits = paint(age);
  if (ageStatus) {
    ageStatus.textContent = age === null
      ? statusDefault
      : `${age} ${plural(age)}: ${fits.join(", ")}. Школа й табір — вік уточнюйте за телефоном.`;
  }
}

for (const b of yearButtons) {
  b.addEventListener("click", () => {
    const v = b.dataset.year === "all" ? null : Number(b.dataset.year);
    choose(v === chosen ? null : v);
  });
  if (b.dataset.year !== "all") {
    b.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") paint(Number(b.dataset.year)); });
    b.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") paint(chosen); });
  }
}

/* Motion 4: price filter by age range. Without scripts the chips are hidden and the full list shows. */
const chips = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));
const lessons = Array.from(document.querySelectorAll<HTMLElement>("[data-lesson]"));
const count = document.querySelector<HTMLElement>("[data-filter-count]");
const fade = reduce ? 0 : 180;
for (const chip of chips) {
  chip.addEventListener("click", () => {
    const from = Number(chip.dataset.from), to = Number(chip.dataset.to);
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    let shown = 0;
    for (const row of lessons) {
      const spans: [number, number][] = JSON.parse(row.dataset.spans || "[]");
      const ok = chip.dataset.filter === "all" || spans.length === 0 || spans.some(([a, b]) => a <= to && b >= from);
      if (ok) {
        shown += 1;
        row.hidden = false;
        requestAnimationFrame(() => row.classList.remove("is-out"));
      } else if (!row.hidden) {
        row.classList.add("is-out");
        window.setTimeout(() => { if (row.classList.contains("is-out")) row.hidden = true; }, fade);
      }
    }
    if (count) count.textContent = `Показано ${shown} з ${lessons.length}`;
  });
}

/* Mobile menu: a tap on an anchor closes the popover before the page scrolls. */
const menu = document.getElementById("mobile-menu") as (HTMLElement & { hidePopover?: () => void }) | null;
menu?.querySelectorAll("a[href^='#']").forEach((a) => a.addEventListener("click", () => menu.hidePopover?.()));

/* Sticky call bar on phones: shows once the first screen is gone (R-002). */
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const hero = document.getElementById("top");
if (bar && hero && "IntersectionObserver" in window) {
  bar.classList.add("is-armed");
  new IntersectionObserver(([e]) => {
    bar.classList.toggle("is-shown", !e.isIntersecting);
    document.documentElement.classList.toggle("callbar-on", !e.isIntersecting);
  }, { threshold: 0 }).observe(hero);
}

/* Active nav item: the red tick follows the section in view. */
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-spy]"));
const targets = links.map((l) => document.getElementById(l.dataset.spy!)).filter(Boolean) as HTMLElement[];
if (targets.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const id = e.target.id;
      links.forEach((l) => (l.dataset.spy === id ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current")));
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  targets.forEach((t) => io.observe(t));
}

export {};
