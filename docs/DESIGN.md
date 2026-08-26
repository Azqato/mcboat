# DESIGN.md - Boaty McBoatface Ventures

**Status:** Active. Audited against `css/styles.css` and all five HTML pages on 2026-08-25.

This document records design intent first and observed implementation second. Where
the stylesheet contradicts the stated intent, both are kept and the gap is marked
**Discrepancy**, because the intent is worth preserving even when the code drifted
from it. Do not silently "fix" a discrepancy in one direction without deciding which
side is correct.

---

## Design Philosophy

Hand-drawn meets structured web layout. Every visual decision references the sticky
notes, the actual source material for the business. Elements should look like they
were placed by hand, slightly askew, with thick ink borders and flat offset shadows.
The humor is deadpan: the more seriously the design treats the absurd concept, the
funnier it is.

Two consequences follow from that philosophy and are worth stating outright, because
they explain choices that otherwise look like mistakes:

1. **Nothing is perfectly aligned on purpose.** Rotations of half a degree to two
   degrees, uneven border radii, and hard unblurred shadows are the signature. A
   contribution that squares everything up destroys the look.
2. **Structure stays rigorous underneath.** Grids, spacing tokens, and type scale are
   conventional and disciplined. The hand-drawn quality is a surface treatment applied
   to a straight layout, not an excuse for a loose one.

---

## Color Palette

All colors derive directly from the four sticky note colors in the original business
plan photo.

| Token | Hex | Use |
|-------|-----|-----|
| `--color-salmon` | `#F4A08A` | Primary brand color; homepage business-plan section background; primary buttons; hull stripe; nav link hover |
| `--color-mint` | `#A8E6CF` | Product page theme; secondary buttons; SVG boat cabin; default map state fill |
| `--color-lavender` | `#C9B8E8` | Investor pitch page theme; homepage CTA band; aft deck on boat SVG; Vermont on the map |
| `--color-yellow` | `#FFD97D` | Map page theme; FAQ closing band; boat windows; flag; active nav link; footer logo |
| `--color-ink` | `#1A1A2E` | All text; all borders; SVG stroke lines; sketch shadows; eject section and footer backgrounds |
| `--color-bg` | `#FEFDF8` | Page background, an off-white that approximates sticky note paper |
| `--color-water` | `#5BA3C9` | Water and wave elements in SVGs; Atlantic Ocean label on the map |
| `--color-water-dk` | `#3A7FA6` | Darker wave layer (used as an opacity overlay) |
| `--color-eject` | `#E74C3C` | The EJECT button; the eject platform; the animated map route line; high shark risk indicators |
| `--color-eject-dk` | `#C0392B` | EJECT button hover state |

Three colors appear in the stylesheet as literals rather than tokens, and are
intentional one-offs rather than palette members: `#922B21` (EJECT button active
state), `#f5f5f0` (spec table zebra striping on `product.html`), and `#f0f0f0`
(even-numbered pitch slide background on `invest.html`). The dark eject-demo scene on
`index.html` uses its own literal night palette inside the SVG (`#0a1a2e`, `#1a3a5c`,
`#2d6a8a`), which is deliberately outside the token system because it is one
illustration, not a reusable surface.

### Page Color Assignments

| Page | Hero background | Feeling |
|------|----------------|---------|
| `index.html` | Off-white to water-blue gradient (`--color-bg` to `#e8f4ff` to `#c5e8f7`) | Warm welcome, alarming eject CTA |
| `product.html` | Mint | Clinical product confidence |
| `map.html` | Yellow | Danger, adventure, high alert |
| `invest.html` | Lavender | Sophisticated (allegedly) |
| `faq.html` | Salmon to lavender gradient (135deg) | Mixed, chaotic energy |

**Discrepancy (resolved in this audit):** earlier revisions of this document described
the `index.html` hero as a "salmon to water gradient". The stylesheet has never used
salmon there; `.hero` is `linear-gradient(180deg, var(--color-bg) 0%, #e8f4ff 60%,
#c5e8f7 100%)`. Salmon is the background of the business-plan section immediately
below the hero, which is most likely where the original description came from. The
table above now states the code's version. Trust the code here: the gradient is
visible on the live site.

---

## Typography

### Font Families

| Role | Family | Source | Use |
|------|--------|--------|-----|
| Display / Headlines | `Permanent Marker` | Google Fonts | All `h1` to `h4`, nav links and logo, section labels, buttons, counters, pricing prices, SVG text, tooltips |
| Body | `Inter` | Google Fonts (weights 400, 500, 600 requested) | Paragraphs, captions, fine print, table cells, the legible counterweight to the display face |
| Mono / Data | `Courier New` | System font stack | Declared as `--font-mono` for code snippets |

**Discrepancy:** `--font-mono` is defined in `:root` and referenced nowhere else in the
stylesheet or in any page. There is no code-formatted content anywhere on the site.
The token is currently aspirational. Either a code role appears eventually or the token
should be removed. It is harmless where it stands, so the audit left it.

**Discrepancy:** the stylesheet contains no `font-weight` declaration at all. Inter is
requested at weights 400, 500, and 600, but only 400 is ever applied by a rule. The only
non-400 text is inside `<strong>` elements, which the browser renders at its default
bold (700), a weight that was not requested from Google Fonts and is therefore
synthesized or snapped depending on the browser. If crisp bold matters, either request
700 in the font URL or set `strong { font-weight: 600 }` explicitly.

### Type Scale

| Token | `rem` | `px` (at 16px base) | Use |
|-------|-------|---------------------|-----|
| `--text-xs` | 0.75rem | 12px | Fine print, footer bottom bar, tooltip quips, pitch stat captions |
| `--text-sm` | 0.875rem | 14px | Nav links, section labels, pricing features, footer links, spec table, card meta lines |
| `--text-base` | 1rem | 16px | Body paragraphs, FAQ answers, feature lists, ask breakdown |
| `--text-lg` | 1.25rem | 20px | Hero subtitle, section subtitles, pitch slide body, default button label, FAQ question |
| `--text-xl` | 1.5rem | 24px | Nav logo, `h4`, hero tagline, pricing tier name, footer brand logo |
| `--text-2xl` | 2rem | 32px | `h3`, eject counter, modal title, pitch slide `h2` |
| `--text-3xl` | 3rem | 48px | `h2`, section titles, EJECT button label, pricing prices |
| `--text-4xl` | 4.5rem | 72px | `h1`; ghosted slide numbers on the pitch deck; `.display-giant` clamps it to `clamp(2.5rem, 8vw, 4.5rem)` |

At 640px and below, `--text-4xl` reduces to `2.8rem` and `--text-3xl` to `2rem` to
prevent overflow on small screens. This is done by redefining the tokens inside the
media query, so every consumer of those tokens scales at once. That is the intended
pattern for any future responsive type change: change the token, not the rule.

### Line Height and Letter Spacing by Role

| Role | Line height | Letter spacing | Where set |
|------|------------|----------------|-----------|
| Body text (default) | 1.6 | normal | `body` |
| Headings `h1` to `h5` | 1.1 | normal | shared heading rule |
| `.display-giant` (page titles) | 1.05 | normal | its own rule |
| FAQ answer paragraphs | 1.7 | normal | `.faq-answer p`, looser for reading long answers |
| Pricing price, pitch slide number | 1.0 | normal | tight, they are display numerals |
| Pitch stat | 1.1 | normal | `.pitch-stat` |
| Section label | inherits 1.6 | `0.1em` | `.section-label`, with `text-transform: uppercase` |
| EJECT button | inherits | `0.05em` | `.btn-eject` only |

**Discrepancy (resolved in this audit):** earlier revisions of this document stated
letter spacing of `0.02em` on section labels, while quoting the correct `0.1em` value in
the Component Patterns section of the same document. The stylesheet says `0.1em`. The
table above now matches the code, and the internal contradiction is closed.

Paragraphs are capped at `65ch` globally by a `p { max-width: 65ch }` rule. Several
components deliberately opt out with `max-width: none` (`.feature-card p`,
`.faq-answer p`) because they sit inside an already-narrow card.

### Heading Hierarchy

```
h1  Page title (one per page, 4xl, Permanent Marker)
  h2  Section title (3xl, Permanent Marker)
    h3  Sub-section or card title (2xl, Permanent Marker)
      h4  Sidebar label or footer column header (xl, Permanent Marker)
```

`h5` is styled by the shared heading rule but is not used on any page. There is no `h6`
styling.

---

## Spacing System

Base unit: **4px (0.25rem)**. All spacing tokens are multiples of this base. The scale
is sparse on purpose: it skips 5, 7, 9, 10, 11 and so on, so a contributor reaching for
a value picks from nine options rather than inventing one.

| Token | Value | px | Primary use |
|-------|-------|----|------------|
| `--space-1` | 0.25rem | 4px | Fine inner padding, nav link padding, tooltip line gaps |
| `--space-2` | 0.5rem | 8px | Tight element gaps, inline spacing, footer link gaps |
| `--space-3` | 0.75rem | 12px | Button vertical padding, list item gaps, table cell vertical padding |
| `--space-4` | 1rem | 16px | Default paragraph spacing, card inner padding, grid gaps in tight groups |
| `--space-6` | 1.5rem | 24px | Container side padding, section inner padding, standard grid gaps |
| `--space-8` | 2rem | 32px | Subtitle bottom margin, padding on large cards, button horizontal padding |
| `--space-12` | 3rem | 48px | Vertical padding on banded sections, pitch slide padding |
| `--space-16` | 4rem | 64px | `.section-padding` top and bottom; large section separators |
| `--space-24` | 6rem | 96px | Reserved for hero and major dividers |

**Discrepancy:** `--space-24` is defined in `:root` and used by no rule and no inline
style anywhere in the project. The hero uses `--space-8` for its padding. The token is
currently unused. It was left in place because a six-rem step is a reasonable thing to
have on the scale, but no reader should assume it describes anything on screen today.

The `.container` max-width is `1100px` with `padding: 0 var(--space-6)` on the sides.
The nav is `64px` tall (`--nav-height`), and the hero subtracts that from the viewport
height so the first screen fits exactly. All section-level vertical padding uses
`.section-padding`, which applies `var(--space-16)` top and bottom.

### Border, Radius, and Shadow Tokens

| Token | Value | Meaning |
|-------|-------|---------|
| `--border-sketch` | `2.5px solid var(--color-ink)` | The standard ink outline on every card, button, table, and panel |
| `--radius-sm` | `3px 8px 5px 4px / 4px 5px 8px 3px` | Uneven corner radius for cards and panels |
| `--radius-md` | `4px 12px 6px 8px / 8px 6px 12px 4px` | Uneven corner radius for buttons and the modal |
| `--shadow-sketch` | `4px 4px 0 0 var(--color-ink)` | Hard offset shadow, no blur, at rest |
| `--shadow-sketch-lg` | `6px 6px 0 0 var(--color-ink)` | The same shadow on hover, giving the lift |

The two-value slash syntax in the radius tokens sets horizontal and vertical radii
independently per corner. That asymmetry is what produces the drawn-by-hand outline; a
single uniform radius reads as a normal web card and loses the effect.

---

## Breakpoints

**Stated intent (kept):** mobile-first, base styles small-screen, scaling up.

**Observed in code (Discrepancy):** the stylesheet is desktop-first. It contains no
`min-width` media query at all. Base styles describe the full desktop layout, and two
`max-width` queries override downward. A contributor who writes a `min-width` query
expecting to extend an existing mobile-first system will produce a specificity surprise.
Match the existing pattern: add `max-width` overrides, not `min-width` ones, unless the
whole sheet is being converted deliberately.

| Breakpoint | Query | What changes |
|-----------|-------|-------------|
| Desktop (base) | none | Three-column feature and pricing grids; two-column product explainer, pitch grids, and map layout (`1fr 380px`); three-column footer; horizontal nav; full type scale |
| Tablet | `max-width: 900px` | Features grid to 1 column (capped 480px); product explainer to 1 column; pricing grid to 1 column (capped 380px); pitch grid to 1 column; footer to 2 columns; map layout stacks and the SVG map caps at 360px centered |
| Mobile | `max-width: 640px` | `--text-4xl` to 2.8rem and `--text-3xl` to 2rem; hamburger button appears and `.nav-links` becomes an absolutely positioned dropdown; hero CTAs stack vertically; EJECT button drops to `--text-2xl`; footer to 1 column and the bottom bar centers; sticky-note grid to 1 column (capped 320px); pitch slide padding reduces; ask breakdown to 1 column |

No breakpoint exists above 1100px. The `.container` max-width handles large screens by
letting margin absorb the extra width, which is intended behavior and not an oversight.

---

## Component Patterns

### Sketchy Card

The visual signature of the site. Every card, slide, and sticky note uses this pattern:

```css
border: 2.5px solid #1A1A2E;                        /* --border-sketch */
border-radius: 3px 8px 5px 4px / 4px 5px 8px 3px;   /* --radius-sm, uneven = hand-drawn */
box-shadow: 4px 4px 0 0 #1A1A2E;                    /* --shadow-sketch, hard, no blur */
```

Cards rotate slightly to look placed by hand, and straighten on hover:

```css
.sticky-card:nth-child(odd)  { transform: rotate(-1.2deg); }
.sticky-card:nth-child(even) { transform: rotate(0.8deg); }
.sticky-card:hover           { transform: rotate(0deg) scale(1.02); }
```

The same odd/even or `nth-child` rotation trick is applied independently to
`.feature-card` (three fixed rotations plus three fixed background colors),
`.pricing-card` (three fixed rotations plus colors), and `.pitch-slide` (odd and even
rotations plus alternating backgrounds). This means **card order carries visual
meaning**: inserting a card in the middle of one of those groups reshuffles every color
and rotation after it. That is acceptable for decoration, but it is the reason a new
pricing tier cannot simply be appended without checking how the set looks.

Rule for new recurring elements: give them `--border-sketch`, one of the two radius
tokens, `--shadow-sketch` at rest, `--shadow-sketch-lg` on hover, and a rotation between
0.3 and 1.2 degrees. Anything outside that range starts to look broken rather than
hand-placed.

### Buttons

All buttons share a base class (`.btn`) plus a modifier for the color variant. The base
defines the sketchy border, shadow, and rotation pattern:

```css
.btn {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  padding: var(--space-3) var(--space-8);
  border: var(--border-sketch);
  border-radius: var(--radius-md);       /* Uneven corners */
  box-shadow: var(--shadow-sketch);
  transform: rotate(-0.8deg);            /* Slightly crooked at rest */
  background: var(--color-bg);
  cursor: pointer;
}
.btn:hover  { transform: rotate(0deg) translate(-2px, -2px); box-shadow: var(--shadow-sketch-lg); }
.btn:active { transform: rotate(0deg) translate(3px, 3px);   box-shadow: 1px 1px 0 0 var(--color-ink); }
```

The hover and active states form a physical metaphor: hover lifts the button off the
page (moves up-left, shadow grows), active presses it into the page (moves down-right,
shadow shrinks). Any new interactive surface should follow the same logic rather than
inventing a different one.

Color variants:

- `.btn-primary`, salmon background, ink text
- `.btn-secondary`, mint background, ink text
- `.btn-yellow`, yellow background, ink text
- `.btn-lavender`, lavender background, ink text
- `.btn-eject`, eject-red background, white text, `--text-3xl`, 4px border, `8px 8px`
  shadow, its own larger uneven radius. Reserved for the EJECT button on `index.html`
  and used nowhere else. It is the single loudest element on the site by design, and
  adding a second one would flatten the hierarchy.

`.btn` is applied to both `<a>` and `<button>` elements. Several instances add
`style="width:100%; text-align:center;"` inline because `.btn` is `display: inline-block`
and does not stretch. If button-in-card becomes common, that inline pair is the first
thing worth promoting into a `.btn-block` modifier.

### Cards Used as Links

`.feature-card` is an `<a>` styled as a card, with `text-decoration: none` and
`display: block`. The whole card is the hit target, and each carries an `aria-label`
describing the destination. When a card is a link, the link wraps the card; never put a
nested link inside a card that is itself a link.

### Tables

There is one table on the site, the specification table on `product.html`, and it is
styled entirely with inline attributes rather than a class. Its pattern: ink header row
with white text in the display font, `1.5px` ink bottom border between rows, `#f5f5f0`
zebra striping on even rows, wrapped in a sketchy-card container with `overflow: hidden`
so the uneven radius clips the corners. If a second table appears anywhere, that pattern
should be lifted into a `.spec-table` class in `styles.css` rather than copied.

### Forms

**There are no forms on this site.** No `<input>`, no `<textarea>`, no `<select>`, and no
`<form>` element exists in any page, and the stylesheet has no form styling beyond two
orphaned rules described below. This is a deliberate product constraint, not a gap: the
site collects nothing. If a form is ever added, it needs a component pattern written here
first, because none exists to follow.

**Discrepancy:** `.nav-sound` and `.sound-checkbox` rules remain in section 5 of the
stylesheet, and `.sound-label` in section 13, styling a sound toggle that was removed
from every page in v2.3.0. They are the only form-adjacent styling in the file and they
match no element. Dead CSS.

### FAQ Accordion

Questions use a `::after` pseudo-element with `+` content that rotates 45 degrees when
open, forming an x. Answers animate height via a `max-height` transition from 0 to 400px
alongside a padding transition. Exactly one item is open at a time; the accordion
behavior is enforced in JavaScript, not CSS.

**Discrepancy:** the tinted question backgrounds are defined for `.faq-item:nth-child(1)`
through `:nth-child(8)` in a four-color repeating cycle, but `faq.html` has twelve FAQ
items. Items 9 through 12 render with no tint. Either extend the cycle to 12 or replace
the eight rules with `nth-child(4n+1)` style rules that repeat indefinitely, which is the
better fix because it survives the next question being added.

**Discrepancy:** `.faq-item.open .faq-answer { max-height: 400px }` combined with
`overflow: hidden` will clip any answer taller than 400px. Several answers run to four
paragraphs and are at or over that height at narrow widths. The `max-height` transition
trick requires a fixed pixel ceiling, so the correct fix is either raising the ceiling
well above the tallest answer or animating `grid-template-rows` from `0fr` to `1fr`,
which needs no magic number.

### Modal

`.modal-overlay` is `position: fixed; inset: 0` with `opacity: 0; pointer-events: none`
when closed. `.modal-overlay.open` sets `opacity: 1; pointer-events: auto`. The modal box
is rotated `-1deg` like everything else. Body scroll is locked via `overflow: hidden` on
`<body>` while it is open. It closes on `.modal-close` click, Escape key, and backdrop
click outside the box. There is one modal on the site, the buy dead-end on `product.html`.

Focus is not trapped inside the modal and is not returned to the triggering button on
close. That is an accessibility gap, recorded in PRD.md rather than fixed here.

### Navigation

`position: sticky; top: 0; z-index: 200`, `64px` tall, `--color-bg` background, ink
bottom border. The active page link is highlighted with a yellow background and a
`1.5px` ink border, driven by the `[aria-current="page"]` attribute selector, so the
accessibility attribute and the visual state cannot drift apart. Nav link hover fills
salmon.

At 640px and below the links are hidden and a hamburger button (three `<span>` bars)
appears; pressing it toggles `.open` on `.nav-links`, which expands as an absolutely
positioned dropdown below the bar. The button's `aria-expanded` is updated in JavaScript
alongside the class.

The nav markup is duplicated verbatim in all five pages with only the `aria-current`
attribute moving. There is no templating, so a nav change is a five-file change. This is
the single most error-prone edit in the project.

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

These precede `h2` section titles throughout the site to add a level of visual hierarchy
without introducing another heading level, which keeps the heading outline clean for
screen readers.

### Tooltip

`.map-tooltip` is a single `position: fixed` element on `map.html`, reused for every
state, with three inner lines: state name (display font, base size), shark level
(yellow), and a quip (body font, xs, dimmed). It is positioned in JavaScript from the
cursor at `clientX + 14, clientY - 10`, and shown by toggling `.visible` for an opacity
transition. It has `pointer-events: none` so it cannot interrupt the hover it describes.

Because it is positioned from the cursor with a fixed offset and no viewport collision
detection, it can overflow the right edge of narrow viewports. It is also hover-driven,
so it is unavailable on touch devices, where the sidebar detail panel is the fallback.

### SVG Illustrations

All SVG content is inline in HTML; there are no external SVG files. SVG `<text>` uses
`font-family="'Permanent Marker',cursive"` so it matches the page display face. Stroke
color is `#1A1A2E` at 2 to 3px with round joins and caps for the hand-drawn look. Fills
come from the sticky note palette. Decorative SVG elements carry `aria-hidden="true"`;
meaningful illustrations carry `role="img"` and an `aria-label`.

SVG colors are hardcoded hex values rather than `var(--color-*)`, because these
illustrations are authored as artwork rather than composed from the design system. A
palette change therefore requires a find-and-replace pass across the HTML files, not just
an edit to `:root`. That tradeoff was accepted; it is recorded here so nobody assumes
changing a token restyles the boat.

---

## Accessibility Standards

- **Target:** WCAG 2.1 Level AA
- **Color contrast:** `#1A1A2E` on `#FEFDF8` is approximately 18:1, exceeding AA and AAA
  for body text. White on `#1A1A2E` in the eject section and footer is comparably strong.
  The weakest contrast on the site comes from `opacity: 0.5` and `opacity: 0.6` dimming
  on fine print and footer bottom text, which cuts effective contrast substantially and
  is the first thing to check in any audit.
- **Keyboard navigation:** all interactive elements (buttons, links, FAQ questions, map
  state paths via `tabindex="0"`, modal close) are reachable via Tab and operable via
  Enter or Space.
- **Focus indicators:** browser default focus outlines are preserved. There is no
  `outline: none` rule anywhere in the stylesheet, which is deliberate. Do not add one.
- **Screen readers:**
  - SVG illustrations carry `role="img"` and `aria-label`
  - Decorative SVG elements use `aria-hidden="true"`
  - The active nav link carries `aria-current="page"`
  - The eject counter carries `aria-live="polite"` and an `aria-label`
  - The map tooltip is `aria-live="polite"` so state changes are announced
  - The mobile nav button's `aria-expanded` is updated in JavaScript
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables the boat bob,
  the wave layers, and the map route march with `animation: none !important`, and sets
  `transition-duration: 0.01ms !important` globally.

**Discrepancy:** this document has previously stated that FAQ accordion questions have
their `aria-expanded` "toggled by JS". They do not. `initFAQ()` in `js/main.js` toggles
only the `.open` class on the parent `.faq-item`; the `aria-expanded="false"` written
into the HTML never changes. A screen reader is told every question is collapsed even
while one is open. The `aria-controls` attributes are correct and do point at the right
answer panels. This is a real and fixable accessibility defect, and it is the highest
priority item in the accessibility backlog.

**Discrepancy:** the reduced-motion block also targets `.wave-layer` and `.wave-layer-2`,
classes that no element in the project uses. Harmless, but it means the rule is broader
than the site it protects.

**Discrepancy:** the eject arc animation is not covered by the reduced-motion block. It
is user-triggered rather than ambient, so an argument exists for leaving it, but the
global `transition-duration` override does not affect keyframe animations, and the figure
still flies across the screen for a user who asked for reduced motion. Decide
deliberately rather than by omission.

Known gaps, recorded rather than fixed: the modal does not trap focus or restore focus to
its trigger on close; `role="region"` on each `.faq-answer` has no accessible name; map
hover tooltips have no touch equivalent; the Konami easter egg uses a native `alert()`.

---

## Animation and Motion

| Name | Element | Duration | Easing | Trigger |
|------|---------|----------|--------|---------|
| `boat-bob` | Hero boat SVG | 3s | `ease-in-out`, infinite | On load |
| `eject-arc` | Stick figure (`#stick-figure-svg-wrap`) | 1.5s | `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, forwards | EJECT button click |
| `splash-show` | Splash emoji (`#splash-el`) | 0.9s | `ease-out`, forwards | 800ms after the eject click |
| `wiggle` (`.shake`) | EJECT button | 0.5s | `ease-in-out` | Immediately on eject click |
| `route-march` | Map route dashed line | 1.5s | `linear`, infinite | On map page load |
| `hue-rotate` filter | `document.body` | 0.5s transition, 0.6s hold | default | Konami code |
| `wave-drift`, `wave-drift-slow` | none | 8s, 12s | `linear`, infinite | Never fires |

**Discrepancy:** `wave-drift` and `wave-drift-slow` are defined as keyframes and applied
by `.wave-layer` and `.wave-layer-2`, but no element in any page carries those classes.
The waves visible in the hero are static SVG paths; the motion comes entirely from
`boat-bob` on the parent SVG. Roughly 20 lines of the stylesheet describe an animation
that has never run. Either the wave layers were planned and never built, or they were
removed from the markup and the CSS was left behind. The commit history does not settle
which, so this was flagged rather than deleted.

The eject sequence is worth describing as one composition, because the timings are tuned
against each other rather than chosen independently: the button shakes instantly on
press, the figure begins a 1.5s arc that peaks around 40% and fades out after 90%, and
the splash fires at 800ms, which is where the arc's descent crosses the waterline.
Changing the arc duration without moving the 800ms splash delay in `js/main.js` breaks
the illusion.

### Rules for Motion

1. All ambient animation respects `prefers-reduced-motion: reduce` and is disabled by the
   global media query override.
2. No ambient animation loops faster than 1.5s or slower than 3s. Faster reads as
   nervous, slower reads as broken.
3. Animation triggered by explicit user action (the eject button, the Konami code) may be
   abrupt. It is the payoff, and restraint there is a mistake.
4. Infinite ambient animation uses gentle `ease-in-out`. Never linear, except for the
   marching dashes on the map route, where linear is what makes it read as travel.
5. No animation introduces or removes content. Animation is purely cosmetic and never
   carries information that is not also available statically.
6. Hover transitions are 0.12s to 0.2s. Anything longer feels laggy on a site whose whole
   physical metaphor is paper being pushed around.

---

## Notes for a Model or Contributor Working on This Design

- **The design system is one file.** `css/styles.css`, roughly 895 lines, organized into
  21 numbered comment sections from `1. CUSTOM PROPERTIES` to `21. REDUCED MOTION`. Add
  new component styles to the section they belong to, and add a new numbered section only
  when a genuinely new area appears. Do not create a second stylesheet.
- **A significant amount of styling is inline in the HTML,** not in the stylesheet. Page
  section backgrounds, spec table cells, pitch slide grids, and most one-off layout on
  `map.html` and `invest.html` are inline `style` attributes referencing design tokens.
  This is the established pattern for page-specific, non-repeating layout. Repeated
  patterns belong in the stylesheet. Before adding a class, check whether an inline style
  already does the job in the one place it is needed.
- **Tokens are consumed inline too.** `style="padding: var(--space-3) var(--space-4)"` is
  normal here and is the correct way to write a one-off. Hardcoded pixel values in inline
  styles are the deviation.
- **The palette is fixed and small.** Four sticky note colors, ink, paper, two waters, two
  ejects. Adding a color to the palette needs a reason traceable to the source material.
  Adding a one-off literal for a single illustration does not.
- **There is no dark mode and there will not be one.** The entire design is paper. A dark
  variant would require a second palette with no relationship to the sticky notes. This is
  recorded as an explicitly deferred item in PRD.md.
- **Prose in this document, in UI copy, and in comments follows the project writing style
  recorded in PRD.md.** The em dash is prohibited in all its forms; use a comma, colon,
  semicolon, parentheses, a period, or a single hyphen instead.
- **When intent and code disagree, do not quietly pick one.** Every discrepancy in this
  document was left visible on purpose. Resolving one means deciding which side was right,
  changing that side, and recording the decision in PATCHNOTES.md.
