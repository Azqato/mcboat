# DESIGN.md — Boaty McBoatface Ventures

## Design Philosophy

Hand-drawn meets structured web layout. Every visual decision references the sticky notes — the actual source material for the business. Elements should look like they were placed by hand, slightly askew, with thick ink borders and flat offset shadows. The humor is deadpan: the more seriously the design treats the absurd concept, the funnier it is.

---

## Color Palette

All colors derive directly from the four sticky note colors in the original business plan photo.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-salmon` | `#F4A08A` | Primary brand color; homepage hero background; primary buttons; hull stripe |
| `--color-mint` | `#A8E6CF` | Product page theme; secondary buttons; SVG boat cabin |
| `--color-lavender` | `#C9B8E8` | Investor pitch page theme; aft deck on boat SVG |
| `--color-yellow` | `#FFD97D` | Map page theme; pricing highlights; boat windows; flag |
| `--color-ink` | `#1A1A2E` | All text; all borders; SVG stroke lines; sketch shadows; button text |
| `--color-bg` | `#FEFDF8` | Page background — off-white, approximates sticky note paper |
| `--color-water` | `#5BA3C9` | Water/wave elements in SVGs |
| `--color-water-dk` | `#3A7FA6` | Darker wave layer (opacity overlay) |
| `--color-eject` | `#E74C3C` | The EJECT button exclusively; eject platform; high shark risk indicators |
| `--color-eject-dk` | `#C0392B` | EJECT button hover state |

### Page Color Assignments

| Page | Hero background | Feeling |
|------|----------------|---------|
| `index.html` | Salmon → water gradient | Warm welcome, alarming eject CTA |
| `product.html` | Mint | Clinical product confidence |
| `map.html` | Yellow | Danger, adventure, high alert |
| `invest.html` | Lavender | Sophisticated (allegedly) |
| `faq.html` | Salmon → lavender gradient | Mixed, chaotic energy |

---

## Typography

### Font Families

| Role | Family | Source | Use |
|------|--------|--------|-----|
| Display / Headlines | `Permanent Marker` | Google Fonts | All `h1`–`h4`, nav links, labels, buttons, counters — hand-drawn feel |
| Body | `Inter` | Google Fonts (weights 400, 500, 600) | Paragraphs, captions, fine print — legible contrast to display |
| Mono / Data | `Courier New` | System font stack | Code snippets; fallback only |

### Type Scale

| Token | `rem` | `px` (at 16px base) | Use |
|-------|-------|---------------------|-----|
| `--text-xs` | 0.75rem | 12px | Fine print, easter egg captions, tooltip quips |
| `--text-sm` | 0.875rem | 14px | Nav links, section labels, pricing features, footer links |
| `--text-base` | 1rem | 16px | Body paragraphs, FAQ answers, spec table |
| `--text-lg` | 1.25rem | 20px | Hero subtitle, pitch slide body, product hero sub |
| `--text-xl` | 1.5rem | 24px | Nav logo, h4, pricing tagline header |
| `--text-2xl` | 2rem | 32px | h3, eject counter, pitch stats |
| `--text-3xl` | 3rem | 48px | h2, section titles, EJECT button label, pricing prices |
| `--text-4xl` | 4.5rem | 72px | h1 (desktop); `clamp(2.5rem, 8vw, 4.5rem)` for fluid hero sizing |

At ≤640px: `--text-4xl` reduces to `2.8rem` and `--text-3xl` to `2rem` to prevent overflow on small screens.

### Heading Hierarchy

```
h1 — Page title (one per page, 4xl, Permanent Marker)
  h2 — Section title (3xl, Permanent Marker)
    h3 — Sub-section / card title (2xl, Permanent Marker)
      h4 — Sidebar label / footer column header (xl, Permanent Marker)
```

Line heights: `1.1` for headings (tight, display-style). `1.6` for body paragraphs. Letter spacing: `0.02em` on section labels (uppercase small-text labels using `text-transform: uppercase`).

---

## Spacing System

Base unit: **4px (0.25rem)**. All spacing tokens are multiples of this base.

| Token | Value | px | Primary use |
|-------|-------|----|------------|
| `--space-1` | 0.25rem | 4px | Fine inner padding, icon gaps |
| `--space-2` | 0.5rem | 8px | Tight element gaps, inline spacing |
| `--space-3` | 0.75rem | 12px | Button vertical padding, list item gaps |
| `--space-4` | 1rem | 16px | Default paragraph spacing, card inner padding |
| `--space-6` | 1.5rem | 24px | Section inner padding, grid gaps |
| `--space-8` | 2rem | 32px | Subtitle bottom margin, card bottom margin |
| `--space-12` | 3rem | 48px | Section top/bottom padding |
| `--space-16` | 4rem | 64px | Large section separators |
| `--space-24` | 6rem | 96px | Hero top/bottom padding, major section dividers |

The `.container` max-width is `1100px` with `padding: 0 var(--space-6)` on the sides. The nav is `64px` tall (`--nav-height`). All section-level vertical padding uses `.section-padding` which applies `var(--space-16)` top and bottom.

---

## Breakpoints

Mobile-first: base styles are small-screen; breakpoints scale up with `min-width`, scale down with `max-width` for targeted overrides.

| Breakpoint | Width | What changes |
|-----------|-------|-------------|
| Base | 320px+ | Single-column everything; full-width buttons stacked vertically; nav shows all links horizontally |
| Tablet | `max-width: 900px` | Features grid → 1 column; pricing grid → 1 column; pitch slides → 1 column; footer → 2 columns; map layout → stacked |
| Mobile | `max-width: 640px` | `--text-4xl` → 2.8rem; `--text-3xl` → 2rem; hamburger nav replaces horizontal nav; sticky grid → 1 column; footer → 1 column; EJECT button resized; section label font reduced |

No breakpoints exist above 1100px — the `.container` max-width handles large screens.

---

## Component Patterns

### Sketchy Card

The visual signature of the site. Every card, slide, and sticky note uses this pattern:

```css
border: 2.5px solid #1A1A2E;
border-radius: 3px 8px 5px 4px / 4px 5px 8px 3px;  /* Uneven corners = hand-drawn */
box-shadow: 4px 4px 0 0 #1A1A2E;                    /* Hard offset shadow, no blur */
```

Cards rotate slightly to look placed by hand:

```css
.sticky-card:nth-child(odd)  { transform: rotate(-1.2deg); }
.sticky-card:nth-child(even) { transform: rotate(0.8deg); }
.sticky-card:hover           { transform: rotate(0deg) scale(1.02); }
```

### Buttons

All buttons share a base class (`.btn`) plus a modifier for color variant. The base defines the sketchy border-shadow-rotation pattern:

```css
.btn {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  padding: var(--space-3) var(--space-8);
  border: 2.5px solid var(--color-ink);
  border-radius: var(--radius-md);       /* Uneven corners */
  box-shadow: 4px 4px 0 0 var(--color-ink);
  transform: rotate(-0.8deg);            /* Slightly crooked at rest */
  cursor: pointer;
}
.btn:hover  { transform: rotate(0deg) translate(-2px, -2px); box-shadow: 6px 6px 0 0 var(--color-ink); }
.btn:active { transform: rotate(0deg) translate(3px, 3px);   box-shadow: 1px 1px 0 0 var(--color-ink); }
```

Color variants:
- `.btn-primary` — salmon background (`--color-salmon`), ink text
- `.btn-secondary` — mint background (`--color-mint`), ink text
- `.btn-yellow` — yellow background (`--color-yellow`), ink text
- `.btn-lavender` — lavender background (`--color-lavender`), ink text
- `.btn-eject` — eject-red background (`--color-eject`), white text, `3rem` font size, `8px 8px` shadow; for the EJECT button only

### FAQ Accordion

Questions use a `::after` pseudo-element with `+` content that rotates 45° when open (forming an ×). Answers animate height via `max-height` transition (0 → 400px). Exactly one item is open at a time (accordion behavior enforced by JS). Keyboard: Enter and Space open/close; Tab moves between questions.

### Modal

`.modal-overlay` is `position: fixed; inset: 0` with `opacity: 0; pointer-events: none` when closed. `.modal-overlay.open` sets `opacity: 1; pointer-events: auto`. Modal box is slightly rotated (`rotate(-1deg)`). Body scroll is locked (`overflow: hidden` on `<body>`) while modal is open. Closes on: `.modal-close` click, Escape key, backdrop click outside the modal box.

### Navigation

`position: sticky; top: 0; z-index: 200`. The nav is `64px` tall with `--color-bg` background and a bottom border in `--color-ink`. The active page link is highlighted with `--color-yellow` background and `--color-ink` border. At ≤640px: links are hidden; a hamburger button (three `<span>` lines) is shown; pressing it toggles `.open` on `.nav-links` which expands as a block-level dropdown below the nav bar, each link full-width.

### SVG Illustrations

All SVG content is inline in HTML — no external SVG files. Uses `Permanent Marker` font via `font-family="'Permanent Marker',cursive"` on SVG `<text>` elements. Stroke color: `#1A1A2E` (ink), 2–3px width, round joins/caps for hand-drawn look. Fills match the sticky note palette. Decorative SVG elements carry `aria-hidden="true"`; meaningful SVG illustrations carry `role="img"` and `aria-label`.

### Section Labels

Short uppercase labels above section titles use a common pattern:

```css
.section-label {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.6;
}
```

These precede `h2` section titles throughout the site to add visual hierarchy without a new heading level.

---

## Accessibility Standards

- **Target:** WCAG 2.1 Level AA
- **Color contrast:** `#1A1A2E` on `#FEFDF8` ≈ 18:1 — exceeds both AA and AAA requirements for body text
- **Keyboard navigation:** All interactive elements (buttons, links, FAQ accordion items, map state paths, modal close) reachable via Tab; operable via Enter or Space
- **Focus indicators:** Browser default focus outlines preserved; no `outline: none` rules anywhere in the stylesheet
- **Screen readers:**
  - SVG illustrations carry `role="img"` and `aria-label`
  - Decorative SVG elements use `aria-hidden="true"`
  - FAQ accordion questions use `aria-expanded` (toggled by JS) and `aria-controls` referencing the answer panel
  - Map tooltip is `aria-live="polite"` so state changes are announced
  - Active nav link carries `aria-current="page"`
  - Eject counter `<div>` carries `aria-live="polite"` and `aria-label`
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all animations (boat bob, wave drift, eject arc, route march) and sets `transition-duration: 0.01ms` globally to cut all transitions

---

## Animation and Motion

| Name | Element | Duration | Easing | Trigger |
|------|---------|----------|--------|---------|
| `boat-bob` | Hero boat SVG | 3s | `ease-in-out`, infinite | On load |
| `eject-arc` | Stick figure SVG (`#stick-figure-svg-wrap`) | 1.5s | `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, forwards | EJECT button click |
| `splash-show` | Splash emoji `💦` (`#splash-el`) | 0.9s | `ease-out`, forwards | 800ms after eject click |
| `wiggle` (shake) | EJECT button | 0.5s | `ease-in-out`, forwards | After eject click |
| `route-march` | Map route dashed line | 1.5s | `linear`, infinite | On map page load |
| `hue-rotate` | `document.body` CSS filter | 0.5s CSS + 0.6s delay | Default | Konami code activation |

### Rules for Motion

1. All animations respect `prefers-reduced-motion: reduce` and are disabled by the global media query override
2. No ambient animation plays longer than 3s in a loop without serving a clear informational purpose
3. Animations triggered by user action (eject button, Konami code) may be abrupt — they are the payoff
4. Infinite ambient animations (boat bob) use gentle `ease-in-out` easing; never jarring or distracting
5. No animation introduces or removes content — animations are purely cosmetic and never carry information that isn't also available statically
