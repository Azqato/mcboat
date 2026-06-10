# DESIGN.md — Boaty McBoatface Ventures

## Visual Language

Hand-drawn meets clean web. Everything looks like it was planned on a sticky note — because it was.

---

## Color Palette

| Name | Hex | Use |
|------|-----|-----|
| Salmon | `#F4A08A` | Primary brand, hero, CTA buttons |
| Mint | `#A8E6CF` | Product page, secondary sections |
| Lavender | `#C9B8E8` | Investor pitch, accents |
| Yellow | `#FFD97D` | Map page, pricing highlights, flags |
| Ink | `#1A1A2E` | All text, borders, sketch lines |
| Paper | `#FEFDF8` | Background — off-white like a sticky note |
| Eject Red | `#E74C3C` | The EJECT button only |
| Water | `#5BA3C9` | Water/wave elements |

---

## Typography

- **Display / Headlines:** `Permanent Marker` (Google Fonts) — hand-drawn feel
- **Body:** `Inter` (Google Fonts) — clean, readable contrast
- **Mono / Data:** `Courier New` — for counters, code snippets

Scale: `0.75rem` → `0.875rem` → `1rem` → `1.25rem` → `1.5rem` → `2rem` → `3rem` → `4.5rem`

---

## Component Patterns

### Sketchy Card
```css
border: 2.5px solid #1A1A2E;
border-radius: 3px 8px 5px 4px / 4px 5px 8px 3px;
box-shadow: 4px 4px 0 0 #1A1A2E;
```
Slight rotation (-1deg to 1deg) to look placed by hand.

### Sticky Note Section
Each major page has a background color from the palette. Cards within look like sub-notes.

### Buttons
Flat offset shadow (no blur) — `box-shadow: 4px 4px 0 0 #1A1A2E`. Lifts on hover.

---

## Animations

| Name | Element | Duration | Type |
|------|---------|----------|------|
| `boat-bob` | Hero boat | 3s | ease-in-out infinite |
| `wave` | Water paths | 2s | ease-in-out infinite (staggered) |
| `eject-arc` | Stick figure | 1.5s | ease-in forwards |
| `splash` | Splash element | 0.8s | ease-out forwards |
| `float-up` | Section entries | 0.4s | ease-out |

All animations respect `prefers-reduced-motion: reduce`.

---

## Page Color Assignments

| Page | Theme Color | Feeling |
|------|-------------|---------|
| `index.html` | Salmon | Warm welcome, alarming eject button |
| `product.html` | Mint | Clinical product confidence |
| `map.html` | Yellow | Danger / adventure |
| `invest.html` | Lavender | Sophisticated (allegedly) |
| `faq.html` | Mixed | Chaotic energy |

---

## Humor Principles

1. **Deadpan confidence** — describe the absurd as if it's completely normal
2. **Reward curiosity** — hover states, hidden text, easter eggs everywhere
3. **Legitimate at a glance** — investor pitch reads like a real deck until it doesn't
4. **The sticky notes are sacred** — they are the source material and must be treated as such
