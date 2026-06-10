# CHANGELOG — Boaty McBoatface Ventures

All notable changes to the official web experience are documented here.

---

## [2.0.0] — 2026-06-09 — MAJOR RELEASE

### Breaking Changes
- **CTO identity corrected.** The Co-Founder & CTO previously listed as "Zoop" has been
  updated to the correct handle: **Azqato**. All references site-wide updated accordingly.
  All prior "Zoop" attributions for the CTO role are deprecated.

### Changed
- `pages/invest.html` — Team slide: "Zoop" → **Azqato**, rendered as a seamless
  clickable link to [https://azqato.github.io/](https://azqato.github.io/) with
  `color:inherit; text-decoration:none` so it blends with surrounding display text
- `PRD.md` — Author field and closing attribution updated to Azqato; document version
  bumped from 1.0 → 2.0
- `README.md` — Origin story and team table updated; Azqato linked in team row
- `DESIGN.md` — No visual changes required; identity is a content concern

### Previously in [1.1.0] — 2026-06-09

- Corrected founder attribution: Tigershark is Founder & Chief Vision Officer
  (the sticky notes). Azqato (then "Zoop") is Co-Founder & CTO (the website).
- Updated team slide, FAQ Q9, all footer credits, PRD risks table

### [1.0.1] — 2026-06-09

- "Send $2M" button re-pointed from placeholder mailto to
  [https://azqato.github.io/support.html](https://azqato.github.io/support.html)
- Removed stale email disclaimer beneath button

### [1.0.0] — 2026-06-09 — Initial Release

- `index.html` — Hero with CSS-animated SVG boat, inline SVG sticky-note recreations,
  interactive eject demo (localStorage daily counter), feature cards, CTA section
- `pages/product.html` — Canvas Exo-Skeleton explainer, spec table, three pricing tiers
  (Bronze / Silver / Gold), buy-now modal dead end
- `pages/map.html` — Hand-crafted inline SVG of all six New England states, per-state
  shark risk levels, hover tooltips, animated route line, sidebar legend
- `pages/invest.html` — Seven-slide parody pitch deck: Problem, Solution, Market Size,
  Why Now, Traction, Team, $2M Ask with use-of-funds breakdown
- `pages/faq.html` — Twelve-question FAQ accordion, JS-powered open/close
- `css/styles.css` — Full design system: sticky-note color palette, Permanent Marker
  display font, sketchy border/shadow patterns, all keyframe animations, responsive
  breakpoints, reduced-motion support
- `js/main.js` — Eject demo, daily counter, sound toggle, FAQ accordion, SVG map
  tooltips, buy modal, mobile nav, Konami code easter egg
- `DESIGN.md`, `PRD.md`, `TRD.md`, `README.md` — Full project documentation

---

*"The canvas exo-skeleton. It displaces water. That's it. That's the pitch."*
