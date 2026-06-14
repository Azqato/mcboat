# PATCHNOTES — Boaty McBoatface Ventures

All notable changes to the official web experience are documented here.
Format: semantic versioning (MAJOR.MINOR.PATCH), dates in YYYY-MM-DD.

---

## [2.4.0] — 2026-06-13

### Changed
- `docs/PRD.md` — Consolidated content from seven removed docs files into named sections; bumped to v3.0; added Documentation Process section explaining the four-document system and how to maintain it going forward
- `docs/DESIGN.md` — Expanded all required sections: section label component pattern, `--space-*` primary use column added to spacing table, nav component documented, `aria-live` on eject counter noted, fifth motion rule added; minor wording cleanup
- `README.md` — Updated project structure diagram to remove stale `boat.jpeg` root entry (moved to `img/`), update `docs/` listing to reflect the three remaining docs files

### Removed
- `docs/TRD.md` — Technical architecture, data models, state management, and known tech debt content merged into Technical Reference section of `docs/PRD.md`
- `docs/METRICS.md` — Acquisition, engagement, retention, and performance metrics merged into Metrics section of `docs/PRD.md`
- `docs/PRFAQ.md` — Press release, internal FAQ, and external FAQ merged into Press Release & FAQ section of `docs/PRD.md`
- `docs/ROADMAP.md` — Milestone table and per-milestone feature breakdowns merged into Product Roadmap section of `docs/PRD.md`
- `docs/RUNBOOK.md` — Local setup, deploy, rollback, common errors, and monitoring merged into Runbook section of `docs/PRD.md`
- `docs/SECURITY.md` — Auth model, data storage, third-party trust, attack surface, and dependency policy merged into Security Model section of `docs/PRD.md`
- `docs/TENETS.md` — Seven product tenets merged into Product Tenets section of `docs/PRD.md`

---

## [2.3.0] — 2026-06-13

### Removed
- Sound toggle checkbox and "Sound" label from the navigation bar on all five pages
- "Enable splash sound" checkbox from the eject demo controls on `index.html`

---

## [2.2.0] — 2026-06-13

### Changed
- Moved `pages/product.html`, `pages/map.html`, `pages/invest.html`, `pages/faq.html` to the project root — all pages now live alongside `index.html`
- Updated all internal navigation links across all five HTML files to remove the `pages/` prefix
- Updated asset paths in moved pages (`../css/styles.css` → `css/styles.css`, `../js/main.js` → `js/main.js`, `../assets/` → `assets/`)
- Fixed `js/main.js` audio path: `'../assets/sounds/'` → `'assets/sounds/'` (resolved relative to page URL, not JS file location)
- Updated `docs/README.md` and `docs/TRD.md` folder structure diagrams to reflect flat page layout

### Removed
- `/pages/` directory — no longer needed

---

## [2.1.0] — 2026-06-13

### Added
- Created `/docs/` directory with full project documentation suite
- Added `docs/PRD.md` — expanded with user stories, explicit constraints, assumptions, and measurable success criteria
- Added `docs/TRD.md` — expanded with data models, state management table, third-party integrations, known technical debt inventory
- Added `docs/DESIGN.md` — expanded with full spacing system, breakpoint table, typography hierarchy, accessibility standards
- Added `docs/PATCHNOTES.md` — this file
- Added `docs/PRFAQ.md` — press release, internal FAQ, external FAQ
- Added `docs/TENETS.md` — seven guiding design and product principles
- Added `docs/METRICS.md` — north star, acquisition, engagement, retention, and performance metrics with targets
- Added `docs/ROADMAP.md` — current phase, milestone table, deferred items
- Added `docs/SECURITY.md` — security model for a zero-auth static site
- Added `docs/RUNBOOK.md` — local setup, deploy, rollback, common errors

### Changed
- `README.md` — rewritten for developers: removed marketing language, added live site URL, precise install steps, environment variable section, build/deploy instructions, and link to `/docs`
- `docs/PRD.md` — bumped version to 2.1; added user stories, non-goals, constraints, and assumptions sections
- `docs/TRD.md` — bumped version to 2.0; added data models, API/data-flow, state management, third-party integrations, and known technical debt sections; updated folder structure to reflect actual repo state

### Removed
- `PRD.md` from project root — content migrated to `docs/PRD.md`
- `TRD.md` from project root — content migrated to `docs/TRD.md`
- `DESIGN.md` from project root — content migrated to `docs/DESIGN.md`
- `CHANGELOG.md` from project root — content migrated and reformatted as `docs/PATCHNOTES.md`

---

## [2.0.0] — 2026-06-09

### Changed
- `pages/invest.html` — Team slide: "Zoop" renamed to **Azqato**; name rendered as a seamless clickable link to `https://azqato.github.io/` with `color:inherit; text-decoration:none`
- `PRD.md` — Author field and closing attribution updated to Azqato; document version bumped from 1.0 to 2.0
- `README.md` — Origin story table updated; Azqato linked in CTO row; "Zoop" references removed
- All site-wide CTO attribution updated from "Zoop" to "Azqato"

---

## [1.1.0] — 2026-06-09

### Changed
- Corrected founder attribution across all pages: Tigershark is Founder & Chief Vision Officer (the sticky notes); Azqato (then "Zoop") is Co-Founder & CTO (the website)
- `pages/invest.html` — Team slide attribution corrected
- `pages/faq.html` — Q9 (Tigershark's background) updated
- Footer credits corrected site-wide
- `PRD.md` — Risks table attribution corrected

---

## [1.0.1] — 2026-06-09

### Changed
- `pages/invest.html` — "Send $2M" button href re-pointed from placeholder `mailto:` to `https://azqato.github.io/support.html`

### Removed
- Stale email disclaimer text beneath the "Send $2M" button

---

## [1.0.0] — 2026-06-09

### Added
- `index.html` — Hero section with CSS-animated SVG boat (bob + wave); inline SVG sticky-note recreations as fallback for missing business plan photo; interactive eject demo with localStorage daily counter; feature preview cards; CTA section; site footer
- `pages/product.html` — Canvas Exo-Skeleton explainer with purple sticky note SVG diagram; specification table; three pricing tiers (Bronze $299 / Silver $499 / Gold $999) as cards; "Buy Now" modal dead end
- `pages/map.html` — Hand-crafted inline SVG of all six New England states; per-state shark risk levels via `data-*` attributes; hover tooltips; sidebar legend; animated dashed route line; state detail panel; per-state cards below the fold
- `pages/invest.html` — Seven-slide parody pitch deck: Problem, Solution, Market Size, Why Now, Traction, Team, $2M Ask with use-of-funds breakdown
- `pages/faq.html` — Twelve-question FAQ accordion; JS-powered open/close with keyboard support
- `css/styles.css` — Complete design system: sticky-note color palette; Permanent Marker display font; custom property token system; sketchy border/shadow patterns; all keyframe animations (`boat-bob`, `eject-arc`, `splash-show`, `wiggle`, `route-march`); responsive breakpoints at 900px and 640px; `prefers-reduced-motion` support
- `js/main.js` — IIFE module with: eject demo animation, daily counter with localStorage reset, sound toggle opt-in, FAQ accordion with keyboard support, SVG map tooltips and state panel, buy modal with Escape/backdrop close, mobile hamburger nav, Konami code easter egg, logo-click title easter egg
- `DESIGN.md`, `PRD.md`, `TRD.md`, `README.md`, `CHANGELOG.md` — Initial project documentation (subsequently migrated to `/docs/`)
