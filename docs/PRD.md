# PRD: Boaty McBoatface Ventures — Official Web Experience

**Version:** 3.0
**Status:** Active
**Author:** Azqato (interpreting a sticky note drawing from Tigershark)
**Source material:** Four Post-it notes, one week of planning, zero regrets

---

## Problem Statement

Tigershark spent one week developing a business plan and delivered it as a photograph of four sticky notes via iMessage. That business plan — describing a New England boat ejection tourism company — deserves a real web presence. Without a website, the concept exists only in a text thread. With one, it can make people laugh, communicate the absurd concept clearly, and serve as a pitch artifact worthy of the idea.

Secondary problem: startup culture takes itself very seriously. A well-executed parody that mimics the forms of startup legitimacy (product page, investor pitch, service map, FAQ) while being transparently absurd is genuinely funny and has its own audience.

---

## Target Users

| Persona | Context | What They Need |
|---------|---------|----------------|
| Friends shown the link | Tigershark's social circle; primary intended audience | Immediate laugh; quick understanding of the joke |
| Developers browsing GitHub | Discover via repo search or referral; read source code | Clean code, interesting interactions, something worth starring |
| People who know the original Boaty McBoatface story | Already primed for the joke (UK poll, RRS Sir David Attenborough) | Recognition and reward for the reference |
| Accidental serious visitors | Arrived expecting something real | Clear satire disclaimer before they invest actual money |

---

## Goals

- Make someone laugh within the first 3 seconds of landing on the page
- Communicate the actual business concept (boat + eject + canvas exo-skeleton + New England) clearly enough that a stranger could explain it
- Present a "legitimate-looking" parody pitch that reads like a real startup deck at first glance
- Be shareable as a single URL with no login, no paywall, no friction

---

## Non-Goals

- Actual e-commerce or checkout processing
- Real map integration (Google Maps, Mapbox, Leaflet)
- Any backend, database, or server-side logic
- User accounts or authentication
- Collecting user data of any kind
- Canvas exo-skeleton manufacturing
- Becoming a real company (explicitly)

---

## User Stories

- As a friend who was sent this link, I want to immediately understand the joke so that I can laugh without having to read a wall of text.
- As a friend who was sent this link, I want to click the EJECT button and watch something happen so that the interactivity pays off the premise.
- As a curious developer, I want to view source and find clean, readable vanilla HTML/CSS/JS so that I appreciate the craft even without a framework.
- As an accidental serious visitor, I want to find a clear satire disclaimer so that I do not wire $2M to anyone.
- As someone familiar with the original Boaty McBoatface story, I want the site to acknowledge the 2016 naming vote so that my knowledge is rewarded.
- As a mobile user, I want the site to be fully readable and interactive on my phone so that the joke lands regardless of device.
- As a keyboard user, I want all interactive elements (eject button, FAQ accordion, map states) to be reachable via Tab and operable via Enter/Space so that accessibility isn't sacrificed for aesthetics.

---

## Feature List

### MVP (Shipped)

| Feature | Page | Notes |
|---------|------|-------|
| Hero with animated SVG boat | index.html | CSS-only bob animation, respects `prefers-reduced-motion` |
| Interactive eject demo | index.html | Stick figure arc animation, daily counter via localStorage |
| Sticky note business plan display | index.html | `<picture>` with WebP/PNG fallback; SVG recreations if image missing |
| Canvas Exo-Skeleton product page | product.html | Spec table, three pricing tiers (Bronze $299 / Silver $499 / Gold $999) |
| Buy Now modal dead end | product.html | Acknowledges no product exists; redirects to pitch |
| New England SVG map | map.html | All 6 states, per-state shark risk, hover tooltips, animated route line |
| Investor pitch deck (7 slides) | invest.html | Problem, Solution, Market, Why Now, Traction, Team, $2M Ask |
| FAQ accordion (12 questions) | faq.html | JS-powered open/close, keyboard accessible |
| Mobile responsive nav | All pages | Hamburger menu at ≤640px |
| Konami code easter egg | All pages | Hue-rotate + shark alert |
| Logo click easter egg | All pages | 5 clicks changes tab title to shark.exe |

### Future (Post-Launch / Not Yet Built)

| Feature | Rationale for deferral |
|---------|------------------------|
| Real sticky note photo | Asset not in repo; SVG fallbacks cover it |
| Sound effects (splash.mp3, horn.mp3) | Assets not in repo; sound toggle was removed from UI in v2.3.0 |
| OG image (og-image.png) | Meta tags reference it; image not yet created |
| Series A pitch | Requires a second sticky note per FAQ canon |
| Actual canvas exo-skeleton | Out of scope (and physics) |

---

## Constraints

- **No build toolchain.** The project must work as raw static files with zero preprocessing.
- **No external JavaScript libraries.** Google Fonts is the only permitted CDN dependency.
- **GitHub Pages hosting.** No server-side execution available.
- **No cookies or tracking pixels.** State is localStorage only (eject counter).
- **Single CSS file.** All styles in `css/styles.css`; no per-component stylesheets.
- **Single JS file.** All logic in `js/main.js`; no ES modules (avoids CORS issues on `file://`).

---

## Assumptions

- The sticky note photo (the actual business plan) exists and can be added to `assets/images/` at any time — SVG recreations serve as fallback until then.
- Sound effects are optional and the site is fully functional without them.
- Vermont being landlocked is well-known enough to be funny without explanation.
- Nobody will actually try to send $2M. (The "Send $2M" button links to azqato.github.io/support.html with a satire disclaimer.)
- The Boaty McBoatface naming event (2016 UK polar research vessel vote) is culturally legible enough to reward recognition without requiring explanation.

---

## Success Criteria

| Criterion | Measurement |
|-----------|-------------|
| Makes at least one person laugh | Anecdotal confirmation |
| Loads in under 3s on mobile 4G | Lighthouse performance score ≥ 90 |
| Passes WCAG 2.1 AA color contrast for body text | Chrome DevTools accessibility audit |
| Works on GitHub Pages with zero 404s | Manual check after deploy |
| No JS errors on page load in Chrome, Firefox, Safari | Browser console clean |
| Eject animation plays on button press | Manual verification |
| FAQ accordion opens and closes correctly | Manual verification |
| Map tooltips appear on state hover | Manual verification |

---

## Technical Reference

*Consolidated from TRD.md (v2.0). Describes the system architecture, data models, and JS patterns for this static site.*

### System Architecture

This is a zero-dependency static site. There is no server, no build pipeline, no runtime environment, and no database. The entire system is:

```
Browser → GitHub Pages CDN → Static files (HTML / CSS / JS)
                              ↓
                         localStorage (client-side only)
                              ↓
                         Google Fonts API (2 external font requests)
```

All state is local to the visitor's browser via `localStorage`. No data leaves the client. The site degrades gracefully without JavaScript — all content is readable in plain HTML.

### Tech Stack

| Technology | Version | Role |
|-----------|---------|------|
| HTML5 | Living standard | All markup and page structure |
| CSS3 | Living standard | All styling, animations, design tokens |
| JavaScript | ES6+ (no transpilation) | Interactivity — eject demo, FAQ, map, modal, easter eggs |
| Google Fonts | CDN (latest) | Permanent Marker (display), Inter (body) |
| GitHub Pages | N/A | Static hosting, HTTPS enforcement, CDN |

No npm packages. No build tools. No preprocessors. No frameworks.

### Folder Structure

```
mcboat/
├── index.html                  # Root landing page
├── product.html                # Canvas Exo-Skeleton product, spec table, pricing, buy modal
├── invest.html                 # Seven-slide parody investor pitch deck
├── map.html                    # Interactive SVG map of New England
├── faq.html                    # Twelve-question FAQ accordion
├── css/
│   └── styles.css              # Single global stylesheet — all design tokens and components
├── js/
│   └── main.js                 # All JavaScript logic (IIFE, ~230 lines)
├── img/
│   └── boat.jpeg               # Reference image (not served to users)
├── assets/
│   ├── images/
│   │   ├── business-plan.png   # Sticky note photo (optional — SVG fallback shown if absent)
│   │   ├── business-plan.webp  # WebP version for performance (optional)
│   │   └── og-image.png        # 1200×630 Open Graph image (optional)
│   └── sounds/
│       ├── splash.mp3          # Eject sound effect (optional)
│       └── horn.mp3            # Boat horn sound (optional)
├── README.md
└── docs/
    ├── PRD.md                  # This file — product, technical, and process reference
    ├── DESIGN.md               # Visual design system
    └── PATCHNOTES.md           # Changelog
```

> Note: The `assets/` directory and its contents are referenced in code but not present in the repo. The site handles all missing assets gracefully (image `onerror` fallback, silent audio catch, meta tags still render).

### HTML Architecture

All five pages share the same shell structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="[page-specific]" />
  <meta property="og:title" content="[page-specific]" />
  <meta property="og:description" content="[page-specific]" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <title>Boaty McBoatface Ventures — [Page Title]</title>
  <link rel="icon" href="data:image/svg+xml,...boat emoji..."/>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <nav class="site-nav">…</nav>
  [page content]
  <footer class="site-footer">…</footer>
  <script src="js/main.js" defer></script>
</body>
</html>
```

The favicon is an inline SVG data URI (⛵ emoji) — no separate favicon file required. All HTML files live at the project root; every page references assets without any path prefix.

#### Semantic HTML Requirements

- `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` used semantically throughout
- All images carry descriptive `alt` text
- SVG illustrations have `role="img"` and `aria-label`
- Interactive elements are keyboard-reachable; `aria-expanded` toggled on accordion and nav
- Heading hierarchy never skips levels (h1 → h2 → h3)
- `aria-current="page"` on active nav link per page

### CSS Architecture

- **Single file:** `css/styles.css` (~900 lines)
- **CSS Custom Properties** for all design tokens (colors, spacing, type scale, shadows, radii)
- **Mobile-first:** base styles target small screens; `min-width` breakpoints scale up
- **No CSS modules, no preprocessor, no utility framework**

Design token system defined in `:root` — see `docs/DESIGN.md` for the full token reference.

### JavaScript Architecture

`main.js` uses a single IIFE. No ES modules — avoids CORS issues when opening via `file://` protocol for local testing.

```js
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    initEject();
    initEjectCounter();
    initFAQ();
    initMap();
    initBuyModal();
    initMobileNav();
    initKonami();
    initTitleEgg();
  });
})();
```

Each `init*` function guards with an early return if its target element is absent, so the same `main.js` runs safely on all pages regardless of which components are present.

#### Function Reference

| Function | Page(s) | Description |
|---------|---------|-------------|
| `initEject()` | index.html | EJECT button → arc animation on `#stick-figure-svg-wrap`, delayed splash on `#splash-el`, button shake, counter increment |
| `initEjectCounter()` | index.html | Reads `bmf_eject_count` / `bmf_eject_date` from localStorage; resets count at day boundary |
| `incrementEjectCounter()` | index.html | Increments counter in localStorage, updates display |
| `updateCounterDisplay()` | index.html | Writes count to `#eject-count` |
| `initFAQ()` | faq.html | Click/Enter/Space on `.faq-question` toggles `.open` on parent `.faq-item`; closes others (accordion) |
| `initMap()` | map.html | Hover on SVG `path[data-state]` → populates and positions `#map-tooltip`; click toggles `.selected` |
| `initBuyModal()` | product.html | `.buy-now-btn` opens `#buy-modal`; `.modal-close`, Escape, and backdrop click close it; body scroll locked while open |
| `initMobileNav()` | All pages | `.nav-menu-btn` toggles `.open` on `.nav-links` and updates `aria-expanded` |
| `initKonami()` | All pages | Tracks keydown sequence ↑↑↓↓←→←→BA; on match, hue-rotates page then shows shark alert |
| `activateEasterEgg()` | All pages | Called by Konami; CSS filter + alert |
| `initTitleEgg()` | All pages | 5 rapid clicks on `.nav-logo` sets `document.title` to `🦈 shark.exe has started running` for 3 seconds |

#### localStorage Keys

| Key | Values | Purpose |
|-----|--------|---------|
| `bmf_eject_count` | Integer string | Daily eject count |
| `bmf_eject_date` | `Date.toDateString()` | Last active date; triggers reset when changed |

### Data Models

This project has no database or data layer. All "data" is authored directly in HTML attributes.

#### SVG Map State Data

Each `<path>` in the New England SVG carries all its data as HTML attributes:

```html
<path
  data-state="maine"
  data-label="Maine 🦈🦈🦈"
  data-shark-level="🦈🦈🦈 Extremely High"
  data-quip="Where great whites come for vacation. Also lobsters."
  tabindex="0"
  aria-label="Maine — Shark Risk: Extremely High"
/>
```

| Attribute | Type | Used by |
|-----------|------|---------|
| `data-state` | string slug | CSS selectors for per-state hover colors |
| `data-label` | string | Tooltip header, sidebar panel |
| `data-shark-level` | string | Tooltip shark line, sidebar panel |
| `data-quip` | string | Tooltip flavor line, sidebar panel |

#### Pricing Tier Data

Authored directly in `product.html`. Three tiers:

| Tier | Price | Retrieval SLA | Key differentiator |
|------|-------|--------------|-------------------|
| Bronze | $299 | 20 min | Standard canvas, 1 eject, basic life jacket |
| Silver | $499 | 10 min | Reinforced canvas, 2 ejects, framed cert, splash photo |
| Gold | $999 | Immediate | Gold-plated canvas (aesthetic), unlimited same-day ejects, NFT, monogrammed VIP life jacket |

### State Management

All state is ephemeral (DOM classes) or persisted in `localStorage`. No global state object.

| State | Storage | Scope |
|-------|---------|-------|
| Eject counter value | `localStorage['bmf_eject_count']` | Per-device, per-day |
| Counter reset date | `localStorage['bmf_eject_date']` | Per-device |
| FAQ open/closed | DOM class `.open` on `.faq-item` | Page session only |
| Modal open/closed | DOM class `.open` on `#buy-modal` | Page session only |
| Mobile nav open | DOM class `.open` on `.nav-links` | Page session only |
| Map state selected | DOM class `.selected` on SVG path | Page session only |
| Animation in-progress | DOM class `.ejecting`, `.active`, `.shake` | Sub-second |

### Performance Requirements

| Metric | Target |
|--------|--------|
| Total page weight (index.html) | < 500 KB |
| `business-plan.png` | < 200 KB (WebP preferred; PNG fallback) |
| Time to first contentful paint (4G) | < 1.5s |
| JS bundle size (main.js, unminified) | < 20 KB |
| External HTTP requests on load | ≤ 2 (Google Fonts preconnect + stylesheet) |
| Lighthouse performance score | ≥ 90 |

### Known Technical Debt

| Item | Current state | Correct solution |
|------|-------------|-----------------|
| `main.js` is one large IIFE | Works, but all logic is in one file | Split into ES modules once `file://` local testing is dropped or a simple server is standardized |
| No minification or cache-busting | Files served as-is; browser cache can serve stale JS/CSS | Add a hash suffix to asset filenames on deploy, or configure GitHub Pages cache headers |
| `map.html` has an inline `<script>` block (state-detail panel) | Functionality duplicates `initMap()` in `main.js`; two separate listeners on the same elements | Move state-detail logic into `initMap()` in `main.js` |
| No `<link rel="canonical">` tags | Not present in any page | Add canonical URLs to all five pages |
| OG image referenced but not in repo | `og:image` meta tags point to a non-existent file | Create and commit `assets/images/og-image.png` at 1200×630px |

---

## Metrics

*Consolidated from METRICS.md. Defines what success looks like quantitatively.*

### North Star Metric

**Eject button clicks per visit.**

This is the single number that best represents whether the site is delivering its core value: someone lands, gets the joke, engages with it, and presses the button. A click proves the interaction landed.

### Acquisition Metrics

| Metric | Description | Target | Timeframe | Measurement method |
|--------|-------------|--------|-----------|-------------------|
| Unique visitors | Total distinct sessions to the site | 500 total | 90 days post-launch | GitHub Pages traffic (or Plausible if added) |
| Referral traffic share | % of sessions from shared links (social, chat) | > 60% | 90 days | Referrer headers in analytics |
| GitHub repo stars | Stars on github.com/Azqato/mcboat | 10 | 90 days | GitHub repo star count |
| Direct / dark social share | Estimated shares via iMessage/DM (no referrer) | Unmeasured (qualitative) | Ongoing | Anecdotal reports from Tigershark |

### Engagement Metrics

| Metric | Description | Target | Timeframe | Measurement method |
|--------|-------------|--------|-----------|-------------------|
| Eject button clicks per session | Average number of times a visitor presses EJECT | ≥ 2 | 90 days | localStorage `bmf_eject_count` (per-device, not per-session) |
| Pages per visit | Average number of pages viewed per visit | ≥ 2 | 90 days | Analytics (if added) |
| FAQ interaction rate | % of visitors who open at least one FAQ item | > 20% | 90 days | JS event tracking (if added) |
| Map hover rate | % of visitors who interact with the New England SVG map | > 15% | 90 days | JS event tracking (if added) |
| Invest page views | Visits to `invest.html` | 30% of total visits | 90 days | Analytics (if added) |
| Time on site | Median session duration | > 60 seconds | 90 days | Analytics (if added) |

### Retention Metrics

| Metric | Description | Target | Timeframe | Measurement method |
|--------|-------------|--------|-----------|-------------------|
| Return visitors | % of visitors who come back in the same 30-day window | > 10% | 90 days | Analytics (if added) |

Note: This is a parody marketing site, not a SaaS product. Retention is not a core success criterion — a high one-time share rate matters more.

### Performance Metrics

| Metric | Target | Measurement method |
|--------|--------|-------------------|
| Lighthouse Performance score | ≥ 90 | Chrome DevTools / Lighthouse CI |
| Lighthouse Accessibility score | ≥ 90 | Chrome DevTools |
| Time to First Contentful Paint | < 1.5s on 4G | Lighthouse / WebPageTest |
| Total page weight (index.html) | < 500 KB | Chrome DevTools Network tab |
| External HTTP requests on load | ≤ 2 (fonts only) | Chrome DevTools Network tab |
| JavaScript bundle size | < 20 KB | File size on disk |
| 404 errors | 0 | Manual link check after every deploy |

### Reporting Cadence

| Metric group | Cadence | Owner |
|-------------|---------|-------|
| GitHub stars | Check at launch, then monthly | Azqato |
| Lighthouse scores | Run after every material code change | Azqato |
| Eject count (anecdotal) | Note when shared or demonstrated in person | Tigershark |
| 404 check | After every deploy | Azqato |

No formal analytics platform is currently installed. Adding [Plausible](https://plausible.io/) (privacy-first, no cookies, no GDPR consent UI needed) is the recommended first step if quantitative engagement data is needed.

---

## Press Release & FAQ

*Consolidated from PRFAQ.md. The PR communicates the product outward; the FAQs answer internal and external questions.*

### Press Release

**FOR IMMEDIATE RELEASE**

**New England's First Canvas Exo-Skeleton Boat Ejection Tourism Company Launches Website**

*Boaty McBoatface Ventures brings an entirely new category of human experience to the Atlantic coast — and they have the sticky notes to prove it*

BOSTON, MA — Boaty McBoatface Ventures today announced the public launch of its official web presence at https://azqato.github.io/mcboat/, marking a major milestone in the company's mission to eject paying customers off the aft deck of a boat while they wear a canvas exo-skeleton designed to displace water.

"We identified a gap in the market that nobody else had identified," said Tigershark, Founder and Chief Vision Officer. "Specifically, zero people are currently being ejected off the back of a boat in New England while wearing a canvas frame. Zero. That's the gap. We're filling it."

The Canvas Exo-Skeleton — the company's flagship product — is a frame constructed of canvas that, when worn in water, displaces water. Customers choose from three tiers: Bronze ($299), Silver ($499), and Gold ($999). All tiers include a life jacket. The Gold tier includes an NFT of the customer's eject arc and a post-eject debrief with Tigershark.

Operations are planned for all six New England states, including Vermont, which the company acknowledges is landlocked. Per-state shark risk levels are published on the company's interactive New England service map.

"The sticky note said New England," said Azqato, Co-Founder and CTO. "Vermont was on the sticky note. Vermont is on the map."

The company is currently seeking $2,000,000 in seed funding. Use of funds: $1.5M for the boat, $350K for canvas R&D, $100K for the eject mechanism, $40K for permits and shark insurance, and $10K for more sticky notes for the Series A deck.

Boaty McBoatface Ventures is a parody. Please do not get ejected off a boat.

### Internal FAQ

**1. What is this actually for?**

It's a parody marketing site built around a real four-sticky-note business plan that Tigershark texted to Azqato after being given one week to develop a business idea. The site makes the joke legible to strangers — without the website, the concept only exists in a chat thread.

**2. Who is the real audience?**

Primarily people in Tigershark and Azqato's social circles who get sent the link. Secondarily, developers who find it on GitHub and appreciate the craft. Everybody else is a bonus.

**3. What does success look like?**

Someone laughs. The site loads. No 404s appear. Nobody actually tries to wire $2M.

**4. Why build a full multi-page site instead of a single page?**

Because the joke is funnier the more seriously it is taken. A product page with real pricing tiers, a seven-slide investor deck, an interactive map, a twelve-question FAQ — that's the commitment bit. A single page would feel like a meme. A full site feels like a company.

**5. What's the risk of someone thinking this is real?**

Low. The satire disclaimer is in the footer of every page. The FAQ explicitly addresses "Is this a real company?" The buy modal acknowledges no product exists. The $2M ask button goes to a support page with a disclaimer.

**6. What assumptions must be true for this to work?**

The joke requires the reader to recognize: (a) the startup pitch format being parodied, (b) that the concept (ejecting people off boats) is obviously absurd, and (c) that the Boaty McBoatface name is a recognizable cultural reference or at least funny on its own. All three are safe assumptions for the target audience.

**7. What would a product expansion look like?**

Adding the actual sticky note photo (currently substituted with SVG recreations), real sound effects (splash.mp3, horn.mp3), a functional OG image for social sharing, and a Series A pitch deck after the first round closes.

**8. Is there any actual legal risk?**

No user data is collected. No money is transacted. The site is clearly labeled as satire. Shark risk data is comedic, not advisory. The company name doesn't conflict with any registered trademark. Risk is negligible.

**9. Why GitHub Pages and not a proper hosting provider?**

Free, instant, zero-config, zero-maintenance. The site is entirely static. GitHub Pages is exactly right for this. No server to maintain, no bill to pay, no database to migrate.

**10. What's the technical debt we're carrying?**

An inline `<script>` block in `map.html` that duplicates logic already in `main.js`; missing `<link rel="canonical">` tags; no OG image on disk despite meta tags referencing it. All tracked in the Technical Reference section above.

### External FAQ

**1. What is Boaty McBoatface Ventures?**

A New England boat ejection tourism company. You board a boat named Boaty McBoatface, you get fitted with a canvas exo-skeleton that displaces water, and you get ejected off the aft (rear) deck. Then you float. Probably.

**2. Is this real?**

Spiritually, yes. Legally, we're working on it. The sticky notes are real. The concept is real. The website is real. The company has not yet purchased a boat, manufactured an exo-skeleton, or designed an eject mechanism. The sharks, however, are completely real.

**3. How much does it cost?**

Three tiers:
- Bronze Skeleton — $299. Standard canvas. One eject. Life jacket included.
- Silver Skeleton — $499. Reinforced canvas. Two ejects. Framed certificate.
- Gold Skeleton — $999. Gold-plated canvas (aesthetic only). Unlimited same-day ejects. NFT of your arc.

**4. Can I actually buy a ticket?**

Not yet. Click "Buy Now" on the product page to see what happens.

**5. What is the canvas exo-skeleton made of?**

Canvas. Hence the name. It is a frame made of canvas that, when worn in water, displaces water. The purple sticky note has a diagram. The Gold tier adds gold plating, which does not affect water displacement. We tried.

**6. Are there sharks?**

Yes. See the map. New England shark populations are increasing, particularly in Maine and Cape Cod waters. Vermont has zero sharks. We do not operate in Vermont.

**7. What data do you collect?**

None. The only thing stored is your eject counter (how many times you clicked the EJECT button today). It is stored in your browser's localStorage and never leaves your device.

**8. Is this safe?**

The demo is completely safe (it's a button on a website). The actual boat ejection experience does not yet exist. If and when it does, safety protocols will be developed. Probably.

**9. Why New England?**

It was the only region on the sticky note. The yellow sticky note in the original business plan features a hand-drawn coastline that was subsequently identified as New England. This was a binding business decision.

**10. Why is the boat named Boaty McBoatface?**

In 2016, the British Natural Environment Research Council ran a public vote to name a new polar research vessel. The public voted overwhelmingly for "Boaty McBoatface." The council named the ship the RRS Sir David Attenborough and gave the name Boaty McBoatface to a small submarine. Our founder found this deeply inspiring. The name was on the sticky note. It was binding.

---

## Product Roadmap

*Consolidated from ROADMAP.md. Tracks milestone status and planned future work.*

### Current Phase

**Phase 2 — Documentation & Polish**

The core site (all five pages, full design system, all interactive features) shipped as v1.0.0 on 2026-06-09. Phase 2 covers: structured documentation, resolution of known technical debt, and asset creation for the missing optional files (OG image, sticky note photo, sound effects).

### Milestone Table

| Milestone | Target | Status |
|-----------|--------|--------|
| v1.0.0 — Core site launch | 2026-06-09 | Complete |
| v1.1.0 — Founder attribution fix | 2026-06-09 | Complete |
| v2.0.0 — CTO rebrand (Zoop → Azqato) | 2026-06-09 | Complete |
| v2.1.0 — Full documentation suite | 2026-06-13 | Complete |
| v2.2.0 — Flat page structure (pages/ → root) | 2026-06-13 | Complete |
| v2.3.0 — Sound toggle removal | 2026-06-13 | Complete |
| v2.4.0 — Documentation consolidation audit | 2026-06-13 | Complete |
| v2.5.0 — Asset creation (images + sounds) | TBD | Planned |
| v2.6.0 — Technical debt resolution | TBD | Planned |
| v3.0.0 — Series A pitch expansion | Post-funding | Planned |

### Feature Breakdown Per Upcoming Milestone

#### v2.5.0 — Asset Creation

- Create `assets/images/og-image.png` at 1200×630px for social sharing
- Add `assets/images/business-plan.png` (the actual sticky note photo) or a high-quality recreation
- Create `assets/images/business-plan.webp` (WebP version for performance)
- Record or source `assets/sounds/splash.mp3` — water splash effect for eject demo
- Record or source `assets/sounds/horn.mp3` — boat horn effect

#### v2.6.0 — Technical Debt Resolution

- Move inline `<script>` block from `map.html` into `main.js` `initMap()` function
- Add `<link rel="canonical">` to all five pages
- Add `<link rel="og:url">` meta tags
- Run Lighthouse audit and address any score below 90 on Performance or Accessibility

#### v3.0.0 — Series A Pitch Expansion

- New page: `series-a.html` — Series A pitch deck (8-10 slides; requires second sticky note from Tigershark)
- Updated investor relations section linking to Series A
- New FAQ entry: "What happened to the $2M seed round?"
- PATCHNOTES entry documenting the close (or non-close) of the seed round

### Explicitly Deferred Items

| Feature | Reason deferred |
|---------|----------------|
| Analytics platform (Plausible, etc.) | Site is currently zero-tracking; adding analytics requires a decision on privacy policy and consent UI — deferred until there's a reason to measure at scale |
| Custom domain (boatymcboatface.ventures or similar) | Cost, DNS management overhead; GitHub Pages free subdomain is sufficient for the audience |
| Actual boat ejection operations | Canvas exo-skeleton has not been manufactured; eject mechanism budget not yet secured; regulatory status: optimistic |
| Backend / booking system | Contradicts the zero-server technical constraint; would require a platform change; no real product to book |
| Social share buttons | Adds external JS dependencies; the audience shares via direct link; not worth the dependency |
| Dark mode | The sticky-note aesthetic is fundamentally a light-mode design; a dark mode would require redesigning the entire color system |
| Internationalization | The business is New England-specific; the joke is in English; no use case for translation |

---

## Runbook

*Consolidated from RUNBOOK.md. Steps for local setup, deploy, rollback, and common error resolution.*

### Local Setup

**Prerequisites:** Git (any recent version), a modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+), Python 3 or Node.js (optional — only needed for a local server).

```bash
# 1. Clone the repo
git clone https://github.com/Azqato/mcboat.git
cd mcboat

# 2. Open directly in browser (simplest)
#    On macOS:
open index.html
#    On Windows:
start index.html
#    On Linux:
xdg-open index.html
```

Or start a local server (recommended — avoids any MIME or path edge cases):

```bash
# Python 3
python3 -m http.server 8080
# Then open http://localhost:8080

# Node.js via npx (no install required)
npx serve .
# Then open the URL printed in the terminal (default: http://localhost:3000)
```

There is no `npm install`, no `.env` file, no database, and no additional configuration.

### Build

There is no build step. The source files in the repo are the production files.

### Deploy

**Automatic deploy on push:**

```bash
git add <files>
git commit -m "your message"
git push origin main
```

GitHub Pages rebuilds automatically. The live site at https://azqato.github.io/mcboat/ updates within ~60 seconds.

**Initial GitHub Pages setup (on a new fork):**

1. Go to **Settings → Pages** in the GitHub repository
2. Set **Source** to `Deploy from a branch`
3. Set **Branch** to `main`, folder to `/ (root)`
4. Click **Save**
5. Wait ~1 minute, then visit `https://<your-username>.github.io/mcboat/`

**Verify the deploy:**

- [ ] https://azqato.github.io/mcboat/ loads correctly
- [ ] Navigation links between all five pages work
- [ ] EJECT button animates and counter increments
- [ ] FAQ accordion opens and closes
- [ ] Map tooltips appear on state hover
- [ ] No 404s in browser DevTools Network tab

### Rollback

Because GitHub Pages deploys directly from git history, rollback is a revert commit:

```bash
# Find the last known-good commit hash
git log --oneline -10

# Option A: Revert the bad commit (creates a new commit — preferred)
git revert <bad-commit-hash>
git push origin main

# Option B: Reset to a specific commit (rewrites history — use only if revert is not viable)
git reset --hard <good-commit-hash>
git push --force-with-lease origin main
```

After pushing, GitHub Pages will rebuild from the new HEAD within ~60 seconds.

### Environment Configs

| Environment | URL | Branch | Notes |
|------------|-----|--------|-------|
| Production | https://azqato.github.io/mcboat/ | `main` | Live site, auto-deploys on push |
| Local | http://localhost:8080 (or port varies) | Any | `python3 -m http.server 8080` or `npx serve .` |

There is no staging environment. Test locally before pushing to main.

### Common Errors

| Error | Likely cause | Fix |
|-------|-------------|-----|
| Page is blank or shows raw HTML | Opened `index.html` via `file://` in a browser that blocks some relative imports | Use a local server: `python3 -m http.server 8080` |
| Eject animation doesn't play | JS error or `#stick-figure-svg-wrap` element not found | Open DevTools Console; confirm no JS errors on load |
| Business plan image shows blank | `assets/images/business-plan.png` not present | Expected — SVG fallback displays automatically. Add the image to `assets/images/` to display it |
| GitHub Pages 404 on sub-pages | GitHub Pages is not configured at the repo root | Go to Settings → Pages; confirm source is `main` branch, `/ (root)` folder |
| `og:image` not showing in social previews | `assets/images/og-image.png` does not exist | Create the file at 1200×630px and commit it |
| Map tooltip doesn't appear | JavaScript blocked or SVG paths missing `data-state` | Check DevTools Console; confirm `initMap()` runs without errors |
| FAQ won't open | JavaScript not loaded | Confirm `main.js` is loading (check Network tab); confirm no console errors |

### Monitoring

This is a static site with no server, no uptime SLA, and no alerting. GitHub Pages provides 99.9%+ uptime on the free tier.

Manual monitoring: Visit https://azqato.github.io/mcboat/ after any push to confirm the deploy succeeded. Use Chrome DevTools → Network tab to verify no 404 responses. Use Chrome DevTools → Console tab to confirm no JS errors.

**GitHub Pages status:** https://www.githubstatus.com/ — check here if the site is unreachable and local files look correct.

---

## Security Model

*Consolidated from SECURITY.md. Documents the security posture of a zero-auth static site.*

### Authentication & Authorization

There is no authentication. The site is entirely public, static, and read-only. No login, no session, no tokens, no cookies, no user accounts, and no protected routes.

### Data Storage

The site stores two pieces of data, both exclusively in the visitor's own browser:

| Key | Storage location | Data stored | Scope | Who can access it |
|-----|-----------------|-------------|-------|------------------|
| `bmf_eject_count` | `localStorage` | Integer — how many times the visitor pressed EJECT today | Per-device, per-day | The browser tab that set it; no server |
| `bmf_eject_date` | `localStorage` | `Date.toDateString()` string — used to detect day rollover | Per-device | The browser tab that set it; no server |

No user data is transmitted to any server. No analytics platform is installed. No cookies are set. No tracking pixels. No fingerprinting.

### Third-Party Trust

| Service | What data it receives | Why |
|---------|----------------------|-----|
| Google Fonts | Visitor's IP address and browser user-agent (standard CDN request) | Font files (Permanent Marker, Inter) loaded from fonts.googleapis.com and fonts.gstatic.com |
| GitHub Pages | Visitor's IP address and browser user-agent (standard web hosting) | All HTTP requests go through GitHub's CDN |

No other third-party services receive any visitor data. If Google Fonts CDN privacy is a concern, font files can be self-hosted in `/assets/fonts/` with corresponding `@font-face` declarations in `styles.css`.

### Known Attack Surface

| Area | Risk | Mitigation |
|------|------|-----------|
| Static file serving | A public GitHub repo means all source is readable | Intended. There is no sensitive content in the repo |
| `localStorage` | An XSS attack could read or overwrite the eject counter | Impact is negligible (counter is non-sensitive); no user-generated content is rendered so XSS surface is near-zero |
| External link to `azqato.github.io/support.html` | The "Send $2M" button points to an external URL | Not a risk — link is to the same owner's page; `rel="noopener"` should be added as a best practice |
| SVG `data-*` attributes rendered to DOM via `innerHTML` | `initMap()` and the map page inline script write `data-*` attribute values into `innerHTML` of `#state-detail` | Content is author-controlled and does not include user input; low risk, but `textContent` would be safer for defense-in-depth |

### Dependency Policy

This project has zero npm dependencies, zero JavaScript libraries, and zero CSS frameworks. The only external runtime dependency is Google Fonts. The vulnerability surface from dependencies is zero. If dependencies are ever added, they must be reviewed for: license compatibility, bundle size impact, and security track record before inclusion.

---

## Product Tenets

*Consolidated from TENETS.md. These principles govern product and design decisions. When two options feel equal, apply the tenet that applies. When two tenets conflict, the one listed first wins.*

**1. Commitment Beats Winking.** If something is worth doing as a joke, it is worth doing seriously. A real product page, a real investor deck, a real interactive map — not suggestions of those things. The humor comes from the gap between how seriously the presentation takes the concept and how obviously absurd the concept is. A half-committed parody is just confusing.

*Applied: When deciding whether to build the full seven-slide pitch deck or a summary page, build the full deck. When deciding whether the pricing tiers should have real feature differentiation, give them real feature differentiation.*

**2. The Sticky Notes Are Sacred.** Every design and product decision traces back to the four sticky notes. If the sticky note didn't specify it, it can be invented — but it cannot contradict the notes. Vermont is on the map because it was on the yellow note. The boat is named Boaty McBoatface because it was on the note. The eject mechanism is on the aft because the note shows the aft.

*Applied: When deciding whether to add a feature not implied by the source material, ask if a reasonable person would infer it from the notes.*

**3. Reward Curiosity.** Hover states, easter eggs, hidden tooltips, and Konami codes exist because people who go looking deserve to find something. The site should feel richer the more time you spend with it.

*Applied: When deciding whether to add a hover state to a map element, add it. When deciding whether the logo click easter egg is worth the 5 lines of JS, it is.*

**4. No Frameworks, No Exceptions.** The project's no-framework constraint is not a limitation — it's a statement. Every dependency adds a version to track, a vulnerability surface, and a reason for the build to break six months from now. Vanilla HTML, CSS, and JS have no build step and will still work in 2040.

*Applied: When a map interaction seems like it needs Leaflet, build it in SVG instead. When an animation seems like it needs GSAP, use CSS keyframes instead.*

**5. Degrade Gracefully.** The sticky note photo might not be in the repo. The sound files might not exist. The OG image might be missing. None of these should break the site. Every optional asset has a fallback. JavaScript should be progressive enhancement, not a requirement for reading the content.

*Applied: The business plan section uses a `<picture>` tag with `onerror` → SVG fallback. All pages are readable without JS.*

**6. Satire Needs a Disclaimer.** The joke is funnier if it's mistaken for real for a moment — but nobody should leave the site actually believing this is a functional company. Every page carries the footer disclaimer. The FAQ explicitly answers "Is this a real company?" The buy modal explicitly says no product exists.

*Applied: When adding new copy that sounds convincingly real, make sure the surrounding page context contains at least one acknowledgment of the absurdity.*

**7. One File Per Layer.** Single stylesheet, single script file. The cost of hunting across multiple files to understand where a style or behavior comes from outweighs any organizational benefit at this scale.

*Applied: When adding a new component style, add it to `styles.css` with a numbered section comment. When adding a new JS behavior, add it as a new `init*` function in `main.js`.*

---

## Documentation Process

*Added 2026-06-13. Describes the four-document system used by this project and how it should be maintained going forward.*

### The Four-Document System

This project uses exactly four documentation files, no more. The files and their purposes:

| File | Location | Purpose |
|------|----------|---------|
| `README.md` | Project root (never inside `/docs`) | Developer onboarding: what it is, how to run it locally, how to deploy it. No marketing language. |
| `docs/PRD.md` | `/docs/` only | Everything else: product definition, technical reference, metrics, press release, roadmap, runbook, security model, tenets. |
| `docs/DESIGN.md` | `/docs/` only | Visual design system: colors, typography, spacing, breakpoints, component patterns, accessibility standards, animation rules. |
| `docs/PATCHNOTES.md` | `/docs/` only | Changelog: every notable change, versioned with semantic versioning, dated YYYY-MM-DD. |

### Why This Structure

More than four documents fragment knowledge without adding clarity. This project is a static parody site operated by two people. A document that nobody reads because it's buried in a folder with nine other files helps nobody.

The PRD is the "everything else" bin by design. A product reference, technical reference, runbook, and security model are not separate concerns for a project of this scale — they're different sections of the same answer to "how does this work and why?"

### How to Maintain PRD.md

PRD.md is organized into named sections. When updating:

- **New feature?** Add or update the Feature List section. If it changes the technical architecture, update the Technical Reference section.
- **New metric or success criterion?** Add to the Metrics section.
- **New public-facing FAQ answer?** Add to the External FAQ in the Press Release & FAQ section.
- **Planned work?** Update the Milestone Table in the Product Roadmap section. Mark milestones complete when they ship.
- **Security change?** Update the Security Model section.
- **New tenet?** Add to Product Tenets with the same format: bold name, one-paragraph explanation, italic applied example.

### How to Maintain PATCHNOTES.md

Every time a change is committed:

1. Add a new entry at the top of `PATCHNOTES.md`
2. Use the next semantic version number
3. Date format: `YYYY-MM-DD`
4. Use sections: `Added`, `Changed`, `Fixed`, `Removed`
5. One change per line item, written in past tense
6. Do not group unrelated changes into one version entry — make two entries if the changes are separate

### How to Maintain DESIGN.md

DESIGN.md documents intent, not implementation. When a design decision changes:

1. Update the relevant section (colors, typography, spacing, etc.)
2. Make sure the CSS custom properties in `styles.css` match what DESIGN.md says
3. If a new component pattern is added, document it in the Component Patterns section with the CSS rules

### What Never Goes in README.md

- Marketing language, product copy, or anything aimed at end users
- Detailed technical documentation (that belongs in PRD.md under Technical Reference)
- Design decisions (that belongs in DESIGN.md)
- Changelog entries (that belongs in PATCHNOTES.md)

README.md is for developers who just cloned the repo and need to know: what is this, how do I run it, how do I deploy it. Nothing else.

### Consolidation History

On 2026-06-13, the following documents were consolidated into the sections of this PRD and deleted:

| Deleted file | Content now in |
|-------------|---------------|
| `docs/TRD.md` | Technical Reference section |
| `docs/METRICS.md` | Metrics section |
| `docs/PRFAQ.md` | Press Release & FAQ section |
| `docs/ROADMAP.md` | Product Roadmap section |
| `docs/RUNBOOK.md` | Runbook section |
| `docs/SECURITY.md` | Security Model section |
| `docs/TENETS.md` | Product Tenets section |

---

*Document written based on the comprehensive business plan delivered by Tigershark on four Post-it notes. Azqato (CTO) built the website.*
