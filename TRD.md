# TRD: Boaty McBoatface Ventures — Technical Requirements

**Version:** 1.0  
**Status:** Active  
**Platform:** GitHub Pages (static hosting)  
**Stack:** HTML5 / CSS3 / Vanilla JavaScript (ES6+)

---

## 1. Technical Constraints

### 1.1 Hosting

- **Platform:** GitHub Pages
- **Deploy method:** Push to `main` branch, Pages enabled at repo root
- **Custom domain:** Optional — CNAME file supported if needed
- **HTTPS:** Enforced automatically by GitHub Pages

### 1.2 Build Requirements

- **No build step.** All files are served as-is.
- **No npm, Webpack, Vite, or bundlers.**
- **No server-side code.** All logic runs in the browser.
- External CDN assets are allowed but should be minimized. Acceptable CDNs: Google Fonts, cdnjs only.

### 1.3 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Safari | iOS 14+ |
| Chrome Android | 90+ |

No IE support. We're not monsters.

---

## 2. File & Folder Architecture

```
boaty-mcboatface/
├── index.html                  # Root landing page
├── css/
│   └── styles.css              # Single global stylesheet
├── js/
│   └── main.js                 # All JavaScript logic
├── assets/
│   ├── images/
│   │   ├── business-plan.png   # The sticky note photo (optimized)
│   │   ├── og-image.png        # 1200x630 Open Graph image
│   │   └── favicon.ico         # Boat emoji rendered as ICO
│   └── sounds/
│       ├── splash.mp3          # Eject sound (optional, opt-in)
│       └── horn.mp3            # Boat horn (optional, opt-in)
├── pages/
│   ├── product.html            # Canvas Exo-Skeleton page
│   ├── invest.html             # Investor pitch parody
│   ├── map.html                # New England service map
│   └── faq.html                # FAQ accordion
├── README.md
├── PRD.md
└── TRD.md
```

---

## 3. HTML Architecture

### 3.1 Page Template Structure

Every page shares a consistent shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="[Page-specific description]" />

  <!-- Open Graph -->
  <meta property="og:title" content="Boaty McBoatface Ventures" />
  <meta property="og:image" content="/assets/images/og-image.png" />
  <meta property="og:type" content="website" />

  <title>Boaty McBoatface Ventures — [Page Title]</title>
  <link rel="icon" href="/assets/images/favicon.ico" />
  <link rel="stylesheet" href="/css/styles.css" />
</head>
<body>
  <nav><!-- Shared nav --></nav>
  <main><!-- Page content --></main>
  <footer><!-- Shared footer --></footer>
  <script src="/js/main.js" defer></script>
</body>
</html>
```

### 3.2 Semantic HTML Requirements

- Use `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` semantically
- All images must have descriptive `alt` text
- Interactive elements must be keyboard focusable (`tabindex` where needed)
- Heading hierarchy must not skip levels (h1 → h2 → h3)

---

## 4. CSS Architecture

### 4.1 Methodology

- **Single stylesheet:** `styles.css` — no CSS modules, no preprocessors
- **CSS Custom Properties** for all design tokens (colors, spacing, type scale)
- **Mobile-first** media queries: base styles are mobile, `min-width` breakpoints scale up

### 4.2 CSS Custom Properties (Token System)

```css
:root {
  /* Brand Colors — from the sticky notes */
  --color-salmon:    #F4A08A;   /* Pink sticky note */
  --color-mint:      #A8E6CF;   /* Green sticky note */
  --color-lavender:  #C9B8E8;   /* Purple sticky note */
  --color-yellow:    #FFD97D;   /* Yellow sticky note */
  --color-ink:       #1A1A2E;   /* Hand-drawn line color */
  --color-bg:        #FEFDF8;   /* Off-white, like paper */

  /* Typography */
  --font-display:    'Permanent Marker', cursive;  /* Headlines — hand-drawn feel */
  --font-body:       'Inter', sans-serif;           /* Body copy */
  --font-mono:       'Courier New', monospace;      /* Code/data */

  /* Type Scale */
  --text-xs:    0.75rem;
  --text-sm:    0.875rem;
  --text-base:  1rem;
  --text-lg:    1.25rem;
  --text-xl:    1.5rem;
  --text-2xl:   2rem;
  --text-3xl:   3rem;
  --text-4xl:   4.5rem;

  /* Spacing */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-4:  1rem;
  --space-8:  2rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* Borders */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --border-sketch: 2px solid var(--color-ink);   /* Hand-drawn border style */
}
```

### 4.3 Responsive Breakpoints

```css
/* Mobile: base (320px+) */
/* Tablet: */
@media (min-width: 640px)  { }
/* Desktop: */
@media (min-width: 1024px) { }
/* Wide: */
@media (min-width: 1280px) { }
```

### 4.4 Animation: Wave / Boat

The hero section boat animation is CSS-only:

```css
@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

@keyframes boat-bob {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50%       { transform: translateY(-8px) rotate(1deg); }
}

.boat { animation: boat-bob 3s ease-in-out infinite; }
.wave { animation: wave 2s ease-in-out infinite; }
```

Respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .boat, .wave { animation: none; }
}
```

---

## 5. JavaScript Architecture

### 5.1 Module Pattern

`main.js` uses an IIFE module pattern — no ES modules (avoids CORS issues with `file://` protocol for local testing):

```js
(function () {
  'use strict';

  // Module: Eject Demo
  // Module: FAQ Accordion
  // Module: Eject Counter
  // Module: Map Interactions
  // Module: Sound Toggle

  function init() {
    initEject();
    initFAQ();
    initEjectCounter();
    initMapHovers();
    initSoundToggle();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
```

### 5.2 Eject Demo

```js
function initEject() {
  const btn = document.getElementById('eject-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    const figure = document.getElementById('stick-figure');
    figure.classList.remove('ejecting');
    void figure.offsetWidth; // Force reflow to restart animation
    figure.classList.add('ejecting');
    incrementEjectCounter();
    playSound('splash');
  });
}
```

### 5.3 Eject Counter (localStorage)

```js
function initEjectCounter() {
  const key = 'eject_count';
  const dateKey = 'eject_date';
  const today = new Date().toDateString();

  const storedDate = localStorage.getItem(dateKey);
  if (storedDate !== today) {
    localStorage.setItem(key, '0');
    localStorage.setItem(dateKey, today);
  }

  updateCounterDisplay();
}

function incrementEjectCounter() {
  const key = 'eject_count';
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, String(current + 1));
  updateCounterDisplay();
}

function updateCounterDisplay() {
  const el = document.getElementById('eject-count');
  if (!el) return;
  el.textContent = localStorage.getItem('eject_count') || '0';
}
```

### 5.4 FAQ Accordion

```js
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
}
```

### 5.5 Sound System

Audio is off by default. Opt-in toggle stored in `localStorage`:

```js
function initSoundToggle() {
  const toggle = document.getElementById('sound-toggle');
  if (!toggle) return;

  const soundEnabled = localStorage.getItem('sound') === 'true';
  toggle.checked = soundEnabled;

  toggle.addEventListener('change', function () {
    localStorage.setItem('sound', toggle.checked);
  });
}

function playSound(name) {
  if (localStorage.getItem('sound') !== 'true') return;
  const audio = new Audio('/assets/sounds/' + name + '.mp3');
  audio.play().catch(function () { /* Autoplay blocked — ignore */ });
}
```

---

## 6. SVG Map: New England

The New England map is a hand-crafted inline SVG — no external map APIs.

- **Viewport:** `viewBox="0 0 400 500"`
- **States included:** ME, NH, VT, MA, RI, CT
- Each `<path>` has a `data-state` attribute and a `data-shark-level` (low / medium / high)
- Hover triggers a tooltip with state name + shark risk level + a one-liner

```html
<svg id="ne-map" viewBox="0 0 400 500" role="img" aria-label="New England Service Area Map">
  <path data-state="maine" data-shark-level="high" d="..." />
  <path data-state="massachusetts" data-shark-level="medium" d="..." />
  <!-- etc. -->
</svg>
```

---

## 7. Performance Requirements

| Metric | Target |
|--------|--------|
| Total page weight (index) | < 500KB |
| Business plan image | < 200KB (WebP + PNG fallback) |
| Time to first paint | < 1.5s on 4G |
| JavaScript bundle size | < 20KB unminified |
| External HTTP requests | <= 2 (fonts only) |

### 7.1 Image Optimization

- `business-plan.png` must be exported at max 1200px wide
- Provide `<picture>` tag with WebP + PNG fallback
- `og-image.png` must be exactly 1200x630px

```html
<picture>
  <source srcset="/assets/images/business-plan.webp" type="image/webp" />
  <img src="/assets/images/business-plan.png" alt="The official Boaty McBoatface Ventures business plan, hand-drawn on four sticky notes" loading="lazy" />
</picture>
```

---

## 8. Accessibility

- All images have meaningful `alt` text
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text
- Keyboard navigation: all interactive elements reachable and operable via Tab + Enter/Space
- ARIA labels on SVG map and custom interactive components
- `prefers-reduced-motion` respected on all animations

---

## 9. SEO & Social

- Each page has a unique `<title>` and `<meta name="description">`
- `og:title`, `og:description`, `og:image`, `og:url` on every page
- `twitter:card` set to `summary_large_image`
- Canonical URL in `<link rel="canonical">`

---

## 10. Deployment Checklist

- [ ] All internal links use relative paths (no `localhost` hardcoding)
- [ ] `og-image.png` present at `/assets/images/og-image.png`
- [ ] `favicon.ico` present at root
- [ ] GitHub Pages source set to `main`, root `/`
- [ ] No 404s on any linked page
- [ ] Site renders without JS (progressive enhancement)
- [ ] Sound is off by default
- [ ] Eject counter works and resets daily

---

*This document describes a fully serious technical implementation of a business plan drawn on Post-it notes. We stand by every decision made here.*
