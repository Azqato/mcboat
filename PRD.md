# PRD: Boaty McBoatface Ventures — Official Web Experience

**Version:** 1.0  
**Status:** Active  
**Author:** Zoop (interpreting a sticky note drawing)  
**Source Material:** Four Post-it notes, one week of "work," zero regrets

---

## 1. Overview

### 1.1 Product Summary

A static, meme-forward marketing website for **Boaty McBoatface Ventures**, a fictional (but spiritually real) New England boat tourism company whose primary offering is ejecting customers off a boat while they wear canvas exo-skeletons that displace water. The site is informational, comedic, and interactive — designed to sell an experience that probably shouldn't exist.

### 1.2 Problem Statement

My friend spent a week developing a business plan and delivered it on sticky notes. That business plan deserves a website. The problem is nobody knows about Boaty McBoatface Ventures. This website fixes that.

### 1.3 Goals

- **Primary:** Make people laugh within 3 seconds of landing on the page
- **Secondary:** Communicate the actual (absurd) business concept clearly
- **Tertiary:** Provide a "legitimate-looking" parody pitch for investors
- **Stretch:** Get someone to actually buy a canvas exo-skeleton

---

## 2. Target Audience

| Segment | Description |
|---------|-------------|
| Friends who are shown this | Primary audience. They will not invest. |
| Bored developers on GitHub | Will read the code, maybe star the repo |
| People who named a real ship "Boaty McBoatface" | They'll understand immediately |
| Actual investors | Not the target, but welcome to try |

---

## 3. Core Features

### 3.1 Landing Page (index.html)
**Priority: P0**

- Hero section with animated boat on water (CSS wave animation)
- Tagline: something absurd, short, and memorable
- Sticky note photo ("The Business Plan") featured prominently
- CTA buttons: "Learn More" and "Eject Me"
- Navigation to all pages

**Acceptance Criteria:**
- Boat animation renders on load without JS (CSS-only fallback)
- Sticky note image loads within 2 seconds
- Page is mobile responsive
- No frameworks loaded — pure HTML/CSS/JS only

---

### 3.2 Interactive Eject Demo
**Priority: P0**

The centerpiece of the site. A large button labeled **"EJECT"** that:
- Animates a stick figure being launched off a boat silhouette
- Plays an optional sound effect (splash)
- Shows a counter: "X people ejected today"
- Counter is stored in `localStorage` and resets daily

**Acceptance Criteria:**
- Animation must be visually satisfying and repeatable
- Works without audio (sound is opt-in)
- Eject button is accessible via keyboard

---

### 3.3 Product Page — The Canvas Exo-Skeleton
**Priority: P1**

Dedicated page for the flagship product. Includes:
- Illustrated explainer (based on the purple sticky note diagram)
- Feature list: "Displaces water. That's the main thing."
- Fake pricing tiers (Bronze Skeleton, Silver Skeleton, Gold Skeleton)
- A "Buy Now" button that leads to a funny dead end

**Acceptance Criteria:**
- Diagram accurately references the sticky note concept
- Three pricing tiers rendered as cards
- "Buy Now" CTA leads somewhere intentionally absurd

---

### 3.4 New England Service Area Map
**Priority: P1**

An interactive or animated map of New England, styled to match the hand-drawn sticky note aesthetic.

- SVG-based map of New England coastline
- Hover states on states with funny one-liners
- "Shark Risk Level" indicator per region
- Boaty McBoatface's current route (animated dotted line)

**Acceptance Criteria:**
- SVG map renders on all screen sizes
- No map API or external library required
- Shark risk level changes on hover/click

---

### 3.5 Investor Pitch Page
**Priority: P2**

A full parody investor pitch deck rendered as a web page. Sections include:
- "The Problem" (people don't get ejected enough)
- "Our Solution" (canvas exo-skeleton + boat)
- "Market Size" (all of New England, all 6 states)
- "Traction" (the sticky notes)
- "Ask" ($2M seed, used to buy a boat and canvas)

**Acceptance Criteria:**
- Reads like a real pitch deck at a glance
- Reveals absurdity on closer inspection
- Shareable as a single URL

---

### 3.6 FAQ Page
**Priority: P2**

Pre-answered questions nobody asked. Examples:
- "Is this legal?" — "Probably."
- "What if I can't swim?" — "The exo-skeleton handles that."
- "Are there sharks?" — "See the map."
- "Why New England?" — "It was the only region on the sticky note."

**Acceptance Criteria:**
- Accordion-style expand/collapse, JS-powered
- Minimum 8 questions
- At least one answer links back to the map page

---

## 4. Design Direction

### 4.1 Aesthetic

- **Tone:** Meme-forward, absurdist, affectionate parody of startup culture
- **Visual Language:** Hand-drawn elements mixed with clean web layout. The sticky notes are a design artifact, not just a reference.
- **Color Palette:** Inspired by the sticky notes — salmon/coral, mint green, lavender, yellow/gold — against a clean white or light cream background
- **Typography:** A bold, slightly ridiculous display font for headlines; clean sans-serif for body. Nothing too polished.

### 4.2 Interaction Principles

- Every interactive element should have a payoff
- Humor should reward curiosity — hidden easter eggs encouraged
- Nothing should feel like a real e-commerce site accidentally

---

## 5. Out of Scope (v1.0)

- Actual e-commerce or checkout
- Real map integration (Google Maps, Mapbox)
- Backend of any kind
- User accounts
- Canvas exo-skeleton manufacturing

---

## 6. Success Metrics

| Metric | Target |
|--------|--------|
| Makes at least one person laugh | Yes |
| Works on GitHub Pages | Yes |
| Loads under 3s on mobile | Yes |
| Gets a GitHub star from a stranger | Optional but desired |
| Actually leads to a canvas exo-skeleton business | No |

---

## 7. Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Site is too funny and people think it's real | Low | Add small "satire" footer note |
| Someone actually tries to build the exo-skeleton | Low | They're on their own |
| Sharks | High | Already documented on the map |
| Friend demands credit | Medium | Add a "Special Thanks" section |

---

*Document written based on the comprehensive business plan delivered on four Post-it notes.*
