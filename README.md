# Boaty McBoatface Ventures

A static parody marketing website for a fictional New England boat ejection tourism company, built from a four-sticky-note business plan.

**Live site:** https://azqato.github.io/mcboat/

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, keyframe animations, mobile-first responsive) |
| Scripting | Vanilla JavaScript ES6+ (IIFE pattern, no modules) |
| Fonts | Google Fonts — Permanent Marker, Inter (2 external requests total) |
| Hosting | GitHub Pages (static, no server) |
| Build toolchain | None |

No npm. No bundler. No framework. No dependencies to install.

---

## Prerequisites

- A modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Git
- Python 3 or Node.js — only needed if you want a local dev server with correct MIME types

No Node version requirement. No package manager required.

---

## Installation

```bash
git clone https://github.com/Azqato/mcboat.git
cd mcboat
```

No further setup steps.

---

## Run Locally

Open `index.html` directly in a browser — all sub-pages resolve relative paths correctly in modern browsers via `file://`.

For a proper local server (recommended to avoid any MIME or path edge cases):

**Python 3:**
```bash
python3 -m http.server 8080
# visit http://localhost:8080
```

**Node.js via npx:**
```bash
npx serve .
# visit http://localhost:3000 (or the URL printed in the terminal)
```

---

## Environment Variables

None. This project has no API keys, secrets, or environment configuration of any kind. Everything is static.

---

## Build

There is no build step. The source files are the production files. What is in the repo is what is served.

---

## Deploy

The site deploys to GitHub Pages from the `main` branch root.

**Automatic (on push):**
Push to `main`. GitHub Pages rebuilds and the live site updates within ~1 minute.

**Initial setup on a new fork:**
1. Go to repository **Settings → Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` / folder: `/ (root)`
4. Save — site will be live at `https://<username>.github.io/mcboat/`

No CI pipeline, no build action, no deployment scripts required.

---

## Project Structure

```
mcboat/
├── index.html              # Landing page (hero, eject demo, feature cards)
├── product.html            # Canvas Exo-Skeleton explainer, spec table, pricing tiers, buy modal
├── map.html                # Interactive SVG map of New England with per-state shark risk
├── invest.html             # Seven-slide parody investor pitch deck
├── faq.html                # Twelve-question FAQ accordion
├── css/
│   └── styles.css          # Single global stylesheet — all design tokens and components
├── js/
│   └── main.js             # All JS: eject demo, counter, FAQ accordion, map, modal, easter eggs
├── img/
│   └── boat.jpeg           # Reference image (not served to users)
├── assets/
│   ├── images/             # og-image.png, business-plan.png (optional — site degrades gracefully without them)
│   └── sounds/             # splash.mp3, horn.mp3 (optional)
├── README.md               # This file
└── docs/
    ├── PRD.md              # Product, technical, metrics, roadmap, runbook, security, tenets
    ├── DESIGN.md           # Visual design system
    └── PATCHNOTES.md       # Changelog
```

---

## Documentation

Full project documentation is in [/docs](docs/).
