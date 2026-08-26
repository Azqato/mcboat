# PATCHNOTES - Boaty McBoatface Ventures

All notable changes to the official web experience are documented here.
Format: semantic versioning (MAJOR.MINOR.PATCH), dates in YYYY-MM-DD.

Historical entries are never rewritten to reflect a later state. An entry that mentions
a file since deleted is still correct, because it records what happened at the time.
Typography in older entries was normalized in v2.5.0 to comply with the project writing
style; no wording or meaning was changed.

---

## [2.5.0] - 2026-08-25

Full documentation audit against the complete codebase. Every source file was read and
compared against every document. No site behavior was changed; the only source edits were
typographic.

### Added

- `docs/PRD.md` - Conventions section derived from the code itself: naming, formatting,
  organization, comment density, error handling, and commit and branching style read from
  the version control history rather than from any guide
- `docs/PRD.md` - Writing Style section adopting the project's prose rule, prohibiting the
  em dash in all three forms and listing the permitted replacements
- `docs/PRD.md` - Browser Testing section adopting Microsoft Edge as the browser any
  automated check drives, with the resolved binary path recorded
- `docs/PRD.md` - Deprecation and Removal section defining the public-facing versus
  internal boundary, listing the complete public surface including fragment anchors, and
  recording that GitHub Pages offers no redirect mechanism to this project
- `docs/PRD.md` - Documentation Versus Reality section recording 32 numbered discrepancies
  between the documentation and the code, each with which source was trusted and why
- `docs/PRD.md` - Risks and Open Questions section listing what the audit did not verify,
  fragile areas, changes that are dangerous without more context, and eight numbered open
  questions for the author
- `docs/PRD.md` - Working Practice section with a where-to-look-first table, a never-do
  table with reasons attached, the exact manual verification procedure, and what to update
  after a change
- `docs/PRD.md` - Press Release rewritten with the full required structure: headline,
  subheadline, dateline, opening, problem, solution, named customer quote, call to action,
  and boilerplate
- `docs/PRD.md` - External FAQ expanded from 10 to 25 questions covering pricing,
  availability, technical requirements, data collection, third-party recipients,
  competitive differentiation, known limitations, accessibility, support, and reuse
- `docs/PRD.md` - Internal FAQ expanded with ROI rationale, the reasoning behind an
  unmeasurable north star metric, and roadmap direction
- `docs/PRD.md` - Environment Variable Reference confirming there are none and none may be
  added
- `docs/PRD.md` - API Design and Internal Data Flow section documenting all five internal
  data flows and stating that no API, `fetch`, or `XMLHttpRequest` exists anywhere
- `docs/PRD.md` - Third-Party Integrations table naming what each external party receives
  and how it is authenticated
- `docs/PRD.md` - Shark risk level convention documented as a data model, including that it
  is authored in three separate places in `map.html`
- `docs/PRD.md` - Partially shipped features table separating four features that are
  documented as working from the state they are actually in
- `docs/PRD.md` - Prerequisites table listing the version of each tool the project actually
  needs, and recording that Node.js is absent from the maintenance machine
- `docs/DESIGN.md` - Line height and letter spacing table covering every text role
- `docs/DESIGN.md` - Border, radius, and shadow token table with an explanation of why the
  two-value slash radius syntax produces the hand-drawn outline
- `docs/DESIGN.md` - Component patterns for tables, cards used as links, and the map
  tooltip, none of which were previously documented
- `docs/DESIGN.md` - Forms section recording that the site has no form elements at all and
  that a pattern must be written before one is added
- `docs/DESIGN.md` - Notes for a Model or Contributor section covering the inline-style
  convention, the fixed palette, and how to treat a documented discrepancy

### Changed

- `README.md` - Rewritten for a general reader. Removed the tech stack table,
  prerequisites, install steps, local server commands, environment variable section, build
  and deploy instructions, and the project structure diagram. Added plain-language
  descriptions of what each section of the site offers a visitor, who it is for, and its
  current status. Every removed item now lives in `docs/PRD.md` in more detail
- `docs/PRD.md` - Version bumped from 3.0 to 4.0
- `docs/PRD.md` - Tech stack corrected: `js/main.js` was described as "ES6+" but uses
  `var`, function expressions, and string concatenation throughout, with no arrow
  functions, template literals, `let`, `const`, or modules
- `docs/PRD.md` - Folder structure corrected to state plainly that `assets/` does not exist
  and never has, and to show the empty leftover `pages/` directory that git does not track
- `docs/PRD.md` - Function reference expanded to cover `initSoundToggle()` and
  `playSound()`, which the previous reference omitted entirely, and to describe what each
  function actually does rather than what it was intended to do
- `docs/PRD.md` - localStorage documentation corrected from two keys to three; `bmf_sound`
  was undocumented
- `docs/PRD.md` - Map data model corrected: six states are drawn as seven paths, because
  Massachusetts is split into a mainland path and a Cape Cod path sharing one `data-state`
- `docs/PRD.md` - HTML architecture section given a per-page meta tag coverage table, since
  only `index.html` carries the full `og:type` and `twitter:card` set
- `docs/PRD.md` - Known Technical Debt table expanded from 5 rows to 18
- `docs/PRD.md` - Metrics section annotated to state that every engagement metric requires
  analytics that are deliberately not installed
- `docs/PRD.md` - Runbook rewritten with explicit prerequisites, the correct `python`
  invocation for the Windows maintenance machine, a statement that there is no staging
  environment, a nine-item manual verification checklist, and an expanded common errors
  table
- `docs/PRD.md` - Security section restructured into separate authentication and
  authorization models, and expanded with an explicit confirmation that no secret of any
  kind exists in the repository
- `docs/PRD.md` - Roadmap milestones re-sequenced: accessibility and dead code fixes now
  precede asset creation, since the former close audit findings
- `docs/PRD.md` - Documentation Process section updated to record that the README rule
  changed, why, and where the old rule's content went
- `docs/DESIGN.md` - Breakpoints section corrected. The document claimed mobile-first with
  `min-width` queries; the stylesheet contains no `min-width` query at all and is
  desktop-first with two `max-width` overrides. Both the stated intent and the observed
  reality are now recorded
- `docs/DESIGN.md` - Section label letter spacing corrected from `0.02em` to `0.1em`,
  closing a contradiction between two sections of the same document
- `docs/DESIGN.md` - Index hero background corrected from "salmon to water gradient" to the
  off-white to blue gradient the stylesheet actually applies
- `docs/DESIGN.md` - Color palette expanded to document the four literal colors used
  outside the token system and why each is a deliberate one-off
- `docs/DESIGN.md` - Accessibility section corrected: FAQ `aria-expanded` is documented as
  never updating, rather than as toggled by JavaScript
- `index.html`, `product.html`, `map.html`, `invest.html`, `faq.html`, `css/styles.css` -
  Em dashes replaced throughout, per the writing style now recorded in `docs/PRD.md`. Page
  titles and label separators took a single hyphen, footer disclaimers took a period,
  parenthetical asides took parentheses, and one appositive took a comma. No copy was
  reworded and no meaning changed
- `docs/PATCHNOTES.md` - Em dashes in historical entries replaced with hyphens, colons, or
  periods as context required. Entry content is unchanged

### Fixed

- Documentation only. No site behavior was changed in this release. Every code-level defect
  the audit found is recorded in the Known Technical Debt table in `docs/PRD.md` and
  scheduled for v2.6.0 rather than fixed here, so that a documentation audit does not
  silently become a code change

### Removed

- `README.md` - All developer-facing content: tech stack table, prerequisites,
  installation, run-locally commands, environment variables, build, deploy, and project
  structure. Relocated to `docs/PRD.md`, not deleted

### Audit findings summary

- 179 em dashes found across 11 files and all replaced. Distribution before the sweep:
  `docs/PRD.md` 57, `docs/PATCHNOTES.md` 53, `map.html` 20, `docs/DESIGN.md` 19,
  `README.md` 6, `index.html` 6, `invest.html` 6, `faq.html` 6, `product.html` 4,
  `css/styles.css` 1, `js/main.js` 0
- Zero instances of the `&mdash;` HTML entity found
- Zero instances of the double hyphen used as punctuation found. CSS custom properties and
  command-line flags were excluded from that search as valid syntax
- 32 documentation-versus-code discrepancies recorded, 8 open questions raised for the
  author, and 13 new technical debt items catalogued

---

## [2.4.0] - 2026-06-13

### Changed

- `docs/PRD.md` - Consolidated content from seven removed docs files into named sections;
  bumped to v3.0; added Documentation Process section explaining the four-document system
  and how to maintain it going forward
- `docs/DESIGN.md` - Expanded all required sections: section label component pattern,
  `--space-*` primary use column added to spacing table, nav component documented,
  `aria-live` on eject counter noted, fifth motion rule added; minor wording cleanup
- `README.md` - Updated project structure diagram to remove stale `boat.jpeg` root entry
  (moved to `img/`), update `docs/` listing to reflect the three remaining docs files

### Removed

- `docs/TRD.md` - Technical architecture, data models, state management, and known tech
  debt content merged into Technical Reference section of `docs/PRD.md`
- `docs/METRICS.md` - Acquisition, engagement, retention, and performance metrics merged
  into Metrics section of `docs/PRD.md`
- `docs/PRFAQ.md` - Press release, internal FAQ, and external FAQ merged into Press Release
  and FAQ section of `docs/PRD.md`
- `docs/ROADMAP.md` - Milestone table and per-milestone feature breakdowns merged into
  Product Roadmap section of `docs/PRD.md`
- `docs/RUNBOOK.md` - Local setup, deploy, rollback, common errors, and monitoring merged
  into Runbook section of `docs/PRD.md`
- `docs/SECURITY.md` - Auth model, data storage, third-party trust, attack surface, and
  dependency policy merged into Security Model section of `docs/PRD.md`
- `docs/TENETS.md` - Seven product tenets merged into Product Tenets section of
  `docs/PRD.md`

---

## [2.3.0] - 2026-06-13

### Removed

- Sound toggle checkbox and "Sound" label from the navigation bar on all five pages
- "Enable splash sound" checkbox from the eject demo controls on `index.html`

---

## [2.2.0] - 2026-06-13

### Changed

- Moved `pages/product.html`, `pages/map.html`, `pages/invest.html`, `pages/faq.html` to
  the project root. All pages now live alongside `index.html`
- Updated all internal navigation links across all five HTML files to remove the `pages/`
  prefix
- Updated asset paths in moved pages (`../css/styles.css` to `css/styles.css`,
  `../js/main.js` to `js/main.js`, `../assets/` to `assets/`)
- Fixed `js/main.js` audio path: `'../assets/sounds/'` to `'assets/sounds/'`, resolved
  relative to the page URL rather than the JS file location
- Updated `docs/README.md` and `docs/TRD.md` folder structure diagrams to reflect the flat
  page layout

### Removed

- `/pages/` directory. No longer needed

---

## [2.1.0] - 2026-06-13

### Added

- Created `/docs/` directory with a full project documentation suite
- `docs/PRD.md` - expanded with user stories, explicit constraints, assumptions, and
  measurable success criteria
- `docs/TRD.md` - expanded with data models, state management table, third-party
  integrations, known technical debt inventory
- `docs/DESIGN.md` - expanded with full spacing system, breakpoint table, typography
  hierarchy, accessibility standards
- `docs/PATCHNOTES.md` - this file
- `docs/PRFAQ.md` - press release, internal FAQ, external FAQ
- `docs/TENETS.md` - seven guiding design and product principles
- `docs/METRICS.md` - north star, acquisition, engagement, retention, and performance
  metrics with targets
- `docs/ROADMAP.md` - current phase, milestone table, deferred items
- `docs/SECURITY.md` - security model for a zero-auth static site
- `docs/RUNBOOK.md` - local setup, deploy, rollback, common errors

### Changed

- `README.md` - rewritten for developers: removed marketing language, added live site URL,
  precise install steps, environment variable section, build and deploy instructions, and a
  link to `/docs`
- `docs/PRD.md` - bumped version to 2.1; added user stories, non-goals, constraints, and
  assumptions sections
- `docs/TRD.md` - bumped version to 2.0; added data models, API and data-flow, state
  management, third-party integrations, and known technical debt sections; updated folder
  structure to reflect actual repo state

### Removed

- `PRD.md` from project root. Content migrated to `docs/PRD.md`
- `TRD.md` from project root. Content migrated to `docs/TRD.md`
- `DESIGN.md` from project root. Content migrated to `docs/DESIGN.md`
- `CHANGELOG.md` from project root. Content migrated and reformatted as
  `docs/PATCHNOTES.md`

---

## [2.0.0] - 2026-06-09

### Changed

- `pages/invest.html` - Team slide: "Zoop" renamed to **Azqato**; name rendered as a
  seamless clickable link to `https://azqato.github.io/` with `color:inherit;
  text-decoration:none`
- `PRD.md` - Author field and closing attribution updated to Azqato; document version
  bumped from 1.0 to 2.0
- `README.md` - Origin story table updated; Azqato linked in CTO row; "Zoop" references
  removed
- All site-wide CTO attribution updated from "Zoop" to "Azqato"

---

## [1.1.0] - 2026-06-09

### Changed

- Corrected founder attribution across all pages: Tigershark is Founder and Chief Vision
  Officer (the sticky notes); Azqato (then "Zoop") is Co-Founder and CTO (the website)
- `pages/invest.html` - Team slide attribution corrected
- `pages/faq.html` - Q9 (Tigershark's background) updated
- Footer credits corrected site-wide
- `PRD.md` - Risks table attribution corrected

---

## [1.0.1] - 2026-06-09

### Changed

- `pages/invest.html` - "Send $2M" button href re-pointed from a placeholder `mailto:` to
  `https://azqato.github.io/support.html`

### Removed

- Stale email disclaimer text beneath the "Send $2M" button

---

## [1.0.0] - 2026-06-09

### Added

- `index.html` - Hero section with a CSS-animated SVG boat; inline SVG sticky-note
  recreations as a fallback for the missing business plan photo; interactive eject demo
  with a localStorage daily counter; feature preview cards; CTA section; site footer
- `pages/product.html` - Canvas Exo-Skeleton explainer with a purple sticky note SVG
  diagram; specification table; three pricing tiers (Bronze $299, Silver $499, Gold $999)
  as cards; "Buy Now" modal dead end
- `pages/map.html` - Hand-crafted inline SVG of all six New England states; per-state shark
  risk levels via `data-*` attributes; hover tooltips; sidebar legend; animated dashed
  route line; state detail panel; per-state cards below the fold
- `pages/invest.html` - Seven-slide parody pitch deck: Problem, Solution, Market Size, Why
  Now, Traction, Team, and the $2M Ask with a use-of-funds breakdown
- `pages/faq.html` - Twelve-question FAQ accordion; JS-powered open and close with keyboard
  support
- `css/styles.css` - Complete design system: sticky-note color palette; Permanent Marker
  display font; custom property token system; sketchy border and shadow patterns; all
  keyframe animations (`boat-bob`, `eject-arc`, `splash-show`, `wiggle`, `route-march`);
  responsive breakpoints at 900px and 640px; `prefers-reduced-motion` support
- `js/main.js` - IIFE module with: eject demo animation, daily counter with localStorage
  reset, sound toggle opt-in, FAQ accordion with keyboard support, SVG map tooltips and
  state panel, buy modal with Escape and backdrop close, mobile hamburger nav, Konami code
  easter egg, logo-click title easter egg
- `DESIGN.md`, `PRD.md`, `TRD.md`, `README.md`, `CHANGELOG.md` - Initial project
  documentation, subsequently migrated to `/docs/`
