# PRD: Boaty McBoatface Ventures - Official Web Experience

**Version:** 4.0
**Status:** Active
**Last audited:** 2026-08-25 (full codebase and documentation audit)
**Author:** Azqato (interpreting a sticky note drawing from Tigershark)
**Source material:** Four Post-it notes, one week of planning, zero regrets
**Repository:** https://github.com/Azqato/mcboat
**Live site:** https://azqato.github.io/mcboat/ (verified reachable 2026-08-25)

This document is the complete reference for the project. It carries the product
definition, the technical architecture, the runbook a developer needs to run and
deploy the site, the conventions the code actually follows, the security posture, and
an honest record of where the documentation and the code disagree. The README is
deliberately non-technical; everything a developer needs is here.

Sections are written to stand on their own. A reader who arrives at the Runbook by
link should not have to read the Technical Requirements section first, so some context
is restated. That is intentional.

---

## Problem Statement

Tigershark spent one week developing a business plan and delivered it as a photograph
of four sticky notes via iMessage. That business plan, describing a New England boat
ejection tourism company, deserved a real web presence. Without a website the concept
exists only in a text thread. With one it can make people laugh, communicate the absurd
concept clearly, and serve as a pitch artifact worthy of the idea.

Secondary problem: startup culture takes itself very seriously. A well-executed parody
that mimics the forms of startup legitimacy (product page, investor pitch, service map,
FAQ) while being transparently absurd is genuinely funny and has its own audience.

The problem is not "we need a joke website". It is specifically that the joke does not
survive retelling. Describing four sticky notes to somebody who has not seen them
produces confusion, not laughter. The site is the retelling mechanism: one URL that
delivers the whole premise in under two minutes to someone with no prior context.

---

## Target Users

| Persona | Context | What They Need |
|---------|---------|----------------|
| Friends shown the link | Tigershark's social circle; the primary intended audience. Arrive on a phone from a chat app, with no context, giving the link roughly ten seconds to justify itself | An immediate laugh; quick understanding of the joke without reading a wall of text; something to press |
| Developers browsing GitHub | Discover via repo search or referral; read source before they read the site | Clean readable code, interesting interactions built without a framework, something worth starring |
| People who know the original Boaty McBoatface story | Already primed for the joke (the 2016 UK naming poll, the RRS Sir David Attenborough) | Recognition and reward for the reference, delivered without over-explaining it |
| Accidental serious visitors | Arrived expecting something real, possibly via search | A clear satire disclaimer before they take any action, especially before they consider sending money |
| Future maintainers, human or model | Cloned the repo months later with no memory of it | Documentation complete enough to make a change confidently without reverse-engineering intent from the CSS |

The first persona is the one every product tradeoff is decided against. When a choice
would serve developers at the expense of the friend arriving cold on a phone, the friend
wins.

---

## Goals

- Make someone laugh within the first three seconds of landing on the page
- Communicate the actual business concept (boat, eject, canvas exo-skeleton, New
  England) clearly enough that a stranger could explain it to someone else
- Present a parody pitch that reads like a real startup deck at first glance, because
  the gap between the seriousness of the presentation and the absurdity of the concept
  is where the humor lives
- Be shareable as a single URL with no login, no paywall, and no friction
- Remain functional and unmaintained-safe: no dependency will expire, no build will
  break, no certificate will need renewing

---

## Non-Goals

- Actual e-commerce or checkout processing
- Real map integration (Google Maps, Mapbox, Leaflet)
- Any backend, database, or server-side logic
- User accounts or authentication
- Collecting user data of any kind, including analytics
- Canvas exo-skeleton manufacturing
- Becoming a real company (explicitly)
- Dark mode
- Internationalization
- A CMS, a templating layer, or a static site generator, even though the five pages
  duplicate their nav and footer markup

---

## User Stories

- As a friend who was sent this link, I want to immediately understand the joke so that
  I can laugh without having to read a wall of text.
- As a friend who was sent this link, I want to click the EJECT button and watch
  something happen so that the interactivity pays off the premise.
- As a friend on a phone in a chat app, I want the site to be fully readable and
  operable on a small screen so that the joke lands regardless of device.
- As a curious developer, I want to view source and find clean readable vanilla
  HTML, CSS, and JavaScript so that I appreciate the craft even without a framework.
- As an accidental serious visitor, I want to find a clear satire disclaimer so that I
  do not wire $2M to anyone.
- As someone familiar with the original Boaty McBoatface story, I want the site to
  acknowledge the 2016 naming vote so that my knowledge is rewarded.
- As a keyboard user, I want all interactive elements (eject button, FAQ accordion, map
  states, modal) to be reachable via Tab and operable via Enter or Space so that
  accessibility is not sacrificed for aesthetics.
- As a visitor who has asked their operating system for reduced motion, I want ambient
  animation to stop so that the site does not make me unwell.
- As a maintainer returning after six months, I want the documentation to tell me what
  the code does and where it disagrees with its own docs so that I can make a change
  without reading all 4,000 lines.

---

## Feature List

### MVP (Shipped)

| Feature | Page | Notes |
|---------|------|-------|
| Hero with animated SVG boat | index.html | CSS-only bob animation; respects `prefers-reduced-motion` |
| Interactive eject demo | index.html | Stick figure arc animation, delayed splash, button shake, daily counter via localStorage |
| Sticky note business plan display | index.html | `<picture>` with WebP then PNG; four inline SVG note recreations shown if the photo is absent, which is the state today |
| Feature preview cards | index.html | Three linked cards to product, map, and invest |
| Canvas Exo-Skeleton product page | product.html | Explainer with diagram, seven-row spec table, three pricing tiers (Bronze $299, Silver $499, Gold $999) |
| Buy Now modal dead end | product.html | Acknowledges no product exists; routes to the pitch |
| New England SVG map | map.html | All six states hand-drawn as paths, per-state shark risk, hover tooltip, sidebar detail panel, animated route line, six detail cards below the fold |
| Investor pitch deck (7 slides) | invest.html | Problem, Solution, Market Size, Why Now, Traction, Team, the $2M Ask with use-of-funds breakdown |
| FAQ accordion (12 questions) | faq.html | One open at a time; click, Enter, and Space all work |
| Shared sticky nav and footer | All pages | Duplicated markup; active page marked with `aria-current="page"` |
| Mobile responsive nav | All pages | Hamburger menu at 640px and below |
| Konami code easter egg | All pages | Hue-rotate then a shark `alert()` |
| Reduced motion support | All pages | Ambient animation disabled, transitions collapsed |

### Partially shipped or non-functional

Recorded here rather than in the shipped table, because listing them as shipped would be
inaccurate. Each is expanded in the Documentation Versus Reality section.

| Feature | State |
|---------|-------|
| Logo click easter egg | Code exists and is called, but it can never fire. `initTitleEgg()` returns early on every click because `.nav-logo` is itself an `<a>`, so `e.target.closest('a')` is always truthy |
| Sound effects | `initSoundToggle()` and `playSound()` remain in `main.js` and `playSound('splash')` is called on every eject, but the toggle UI was removed in v2.3.0, the `bmf_sound` flag can no longer be set, and `assets/sounds/` does not exist. Nothing plays |
| Business plan photograph | Every reference points at `assets/images/business-plan.png` and `.webp`. Neither file exists. The SVG fallback is what visitors actually see |
| Open Graph image | `og:image` meta tags on `index.html` and `product.html` point at `assets/images/og-image.png`, which does not exist. Social previews will show no image |

### Future (Post-Launch / Not Yet Built)

| Feature | Rationale for deferral |
|---------|------------------------|
| Real sticky note photo | Asset not in repo; the SVG fallbacks cover it well enough that this has never been urgent |
| Sound effects (splash.mp3, horn.mp3) | Assets not in repo; the toggle UI was removed in v2.3.0, so shipping sound now means rebuilding the opt-in control too |
| OG image (og-image.png) | Meta tags reference it; the 1200x630 image has not been made |
| Series A pitch page | Requires a second sticky note per FAQ canon, which is a real constraint under the tenet that the sticky notes are sacred |
| Actual canvas exo-skeleton | Out of scope, and out of physics |

---

## Constraints

- **No build toolchain.** The project must work as raw static files with zero
  preprocessing. What is in the repository is what is served.
- **No external JavaScript libraries.** Google Fonts is the only permitted external
  dependency of any kind.
- **GitHub Pages hosting.** No server-side execution is available. No redirects, no
  rewrites, no headers, no server-side includes.
- **No cookies and no tracking.** Client state is localStorage only.
- **Single CSS file.** All styles in `css/styles.css`; no per-component stylesheets.
- **Single JS file.** All logic in `js/main.js`; no ES modules, which would break
  opening pages directly from `file://` during local editing.
- **Two-person project, no CI.** There is no test suite, no linter, no continuous
  integration, and no review process. Every safeguard is manual, which is why the
  Working Practice section spells out the manual checks.
- **The maintenance machine has no Node.js runtime.** Python 3.14 and Git are present;
  `node` is not on PATH. Any instruction that requires npm or npx will fail there.

---

## Assumptions

These are decisions made without full information that the project accepts as true.

- The sticky note photo (the actual business plan) exists and can be added to
  `assets/images/` at any time. The SVG recreations serve as the fallback until then.
- Sound effects are optional and the site is complete without them.
- Vermont being landlocked is well known enough to be funny without explanation.
- Nobody will actually try to send $2M. The "Send $2M" button links to
  azqato.github.io/support.html, which carries its own context, and the button sits
  above a satire disclaimer.
- The Boaty McBoatface naming event (the 2016 UK polar research vessel vote) is
  culturally legible enough to reward recognition without requiring explanation.
- GitHub Pages will remain free, static, and available for the lifetime anyone cares
  about. There is no contingency host.
- Google Fonts will continue to serve Permanent Marker and Inter. If it stops, the site
  falls back to `cursive` and `sans-serif`, which degrades the look considerably but
  leaves the site readable. This has not been tested.
- No visitor of consequence has JavaScript disabled. All content is readable without
  JavaScript, but every interaction (eject, FAQ, map tooltip, modal, mobile nav) is
  dead without it, and the mobile nav failing means sub-pages are unreachable from a
  phone. This assumption is load-bearing and untested.

---

## Success Criteria

| Criterion | Measurement | Current status |
|-----------|-------------|----------------|
| Makes at least one person laugh | Anecdotal confirmation | Met |
| Loads in under 3s on mobile 4G | Lighthouse performance score of 90 or better | Not measured since launch |
| Passes WCAG 2.1 AA color contrast for body text | Browser accessibility audit | Body text passes by a wide margin; dimmed fine print is unverified |
| Works on GitHub Pages with zero 404s | Manual check after deploy | Site loads; the four `assets/` references are known 404s handled by fallbacks |
| No JavaScript errors on page load | Browser console clean | Not re-verified this audit |
| Eject animation plays on button press | Manual verification | Verified by code review, not by driving a browser |
| FAQ accordion opens and closes correctly | Manual verification | Verified by code review; `aria-expanded` is known not to update |
| Map tooltips appear on state hover | Manual verification | Verified by code review |

Note on the "current status" column: this audit was a read-and-compare pass over the
source. It did not drive a browser. Anything marked verified by code review means the
code plainly does the thing, not that it was watched doing it.

---

## Product Tenets

These principles govern product and design decisions. When two options feel equal, apply
the tenet that fits. When two tenets conflict, the one listed first wins.

**1. Commitment Beats Winking.** If something is worth doing as a joke, it is worth
doing seriously. A real product page, a real investor deck, a real interactive map, not
suggestions of those things. The humor comes from the gap between how seriously the
presentation takes the concept and how obviously absurd the concept is. A
half-committed parody is just confusing.

*Applied: when deciding whether to build the full seven-slide pitch deck or a summary
page, build the full deck. When deciding whether the pricing tiers should have real
feature differentiation, give them real feature differentiation.*

**2. The Sticky Notes Are Sacred.** Every design and product decision traces back to the
four sticky notes. If the notes did not specify it, it can be invented, but it cannot
contradict them. Vermont is on the map because it was on the yellow note. The boat is
named Boaty McBoatface because that was on the note. The eject mechanism is at the aft
because the note shows the aft.

*Applied: when deciding whether to add a feature not implied by the source material, ask
whether a reasonable person would infer it from the notes.*

**3. Reward Curiosity.** Hover states, easter eggs, hidden tooltips, and Konami codes
exist because people who go looking deserve to find something. The site should feel
richer the more time you spend with it.

*Applied: when deciding whether to add a hover state to a map element, add it. When
deciding whether the logo click easter egg is worth five lines of JavaScript, it is.*

**4. No Frameworks, No Exceptions.** The no-framework constraint is not a limitation, it
is a statement. Every dependency adds a version to track, a vulnerability surface, and a
reason for the build to break six months from now. Vanilla HTML, CSS, and JavaScript
have no build step and will still work in 2040.

*Applied: when a map interaction seems to need Leaflet, build it in SVG instead. When an
animation seems to need a library, use CSS keyframes instead.*

**5. Degrade Gracefully.** The sticky note photo might not be in the repo. The sound
files might not exist. The OG image might be missing. None of these should break the
site. Every optional asset has a fallback, and the fallback is the state the site
actually ships in today.

*Applied: the business plan section uses a `<picture>` with an `onerror` handler that
swaps in SVG recreations. All pages are readable without JavaScript.*

**6. Satire Needs a Disclaimer.** The joke is funnier if it is mistaken for real for a
moment, but nobody should leave the site actually believing this is a functional
company. Every page carries the footer disclaimer. The FAQ answers "Is this a real
company?" directly. The buy modal states plainly that no product exists.

*Applied: when adding copy that sounds convincingly real, make sure the surrounding page
contains at least one acknowledgment of the absurdity.*

**7. One File Per Layer.** Single stylesheet, single script file. The cost of hunting
across multiple files to understand where a style or behavior comes from outweighs any
organizational benefit at this scale.

*Applied: when adding a component style, add it to `styles.css` under a numbered section
comment. When adding a behavior, add it as a new `init*` function in `main.js`.*

---

## Product Roadmap

### Current Phase

**Phase 2, Documentation and Polish.**

The core site (five pages, the full design system, every interactive feature) shipped as
v1.0.0 on 2026-06-09. Nothing about the product has changed since. Phase 2 is
documentation, resolution of known technical debt, and creation of the optional assets
that are referenced but missing. No new pages or features are planned inside this phase.

### Milestone Table

| Milestone | Target | Status |
|-----------|--------|--------|
| v1.0.0, core site launch | 2026-06-09 | Complete |
| v1.0.1, Send $2M button repointed | 2026-06-09 | Complete |
| v1.1.0, founder attribution fix | 2026-06-09 | Complete |
| v2.0.0, CTO rebrand (Zoop to Azqato) | 2026-06-09 | Complete |
| v2.1.0, full documentation suite | 2026-06-13 | Complete |
| v2.2.0, flat page structure (pages/ to root) | 2026-06-13 | Complete |
| v2.3.0, sound toggle removal | 2026-06-13 | Complete |
| v2.4.0, documentation consolidation audit | 2026-06-13 | Complete |
| v2.5.0, full audit, README rewrite, em dash sweep | 2026-08-25 | Complete |
| v2.6.0, accessibility and dead code fixes | TBD | Planned |
| v2.7.0, asset creation (images, sounds) | TBD | Planned |
| v3.0.0, Series A pitch expansion | Post-funding | Planned |

### Feature Breakdown Per Upcoming Milestone

#### v2.6.0, accessibility and dead code fixes

This milestone is entirely about closing the gaps this audit found. Nothing here is a
new feature.

- Toggle `aria-expanded` on `.faq-question` inside `initFAQ()` so screen readers are
  told the truth about which answer is open
- Fix `initTitleEgg()` so the logo click easter egg can actually fire, or delete it
- Remove `initSoundToggle()`, `playSound()`, and the `playSound('splash')` call, or
  restore the sound toggle UI. Do not leave it half-present
- Remove the orphaned `.nav-sound`, `.sound-checkbox`, and `.sound-label` CSS rules
- Remove the orphaned `.wave-layer`, `.wave-layer-2`, `wave-drift`, and
  `wave-drift-slow` CSS, or build the wave layers the CSS was written for
- Extend FAQ item tinting past `nth-child(8)` to cover all twelve items
- Raise or remove the 400px `max-height` ceiling that clips long FAQ answers
- Fix the malformed `padding: var(--space-3) var(--color-ink)` declaration in the
  `product.html` spec table
- Resolve the `#legal` anchor collision on `faq.html`, where the id sits on the
  "What if I can't swim?" question while `index.html` links to it labelled "Legal"
- Move the inline `<script>` block in `map.html` into `initMap()`
- Add focus trapping and focus restoration to the buy modal
- Add `<link rel="canonical">` to all five pages
- Bring the `og:type`, `twitter:card`, and `og:image` meta tags to parity across all
  five pages, since only `index.html` currently has the full set

#### v2.7.0, asset creation

- Create `assets/images/og-image.png` at 1200x630 for social sharing
- Add `assets/images/business-plan.png`, the actual sticky note photograph, or a high
  quality recreation
- Create `assets/images/business-plan.webp` for the WebP source
- Decide the fate of `img/boat.jpeg`, a 4.25 MB file in the repository that nothing
  references
- Record or source `assets/sounds/splash.mp3` and `assets/sounds/horn.mp3`, only if the
  sound toggle UI is being restored in the same change

#### v3.0.0, Series A pitch expansion

- New page `series-a.html`, an eight to ten slide Series A deck. Blocked on a second
  sticky note from Tigershark, per tenet 2
- Investor relations links updated to reach it
- New FAQ entry: "What happened to the $2M seed round?"
- A patch notes entry recording the close, or the non-close, of the seed round

### Explicitly Deferred Items

| Feature | Reason deferred |
|---------|----------------|
| Analytics platform (Plausible or similar) | The site is zero-tracking today. Adding analytics forces a decision about a privacy policy and possibly a consent UI. Deferred until there is a reason to measure at scale |
| Custom domain | Cost and DNS management overhead. The free GitHub Pages subdomain is sufficient for this audience |
| Actual boat ejection operations | The exo-skeleton has not been manufactured, the eject mechanism budget is not secured, and the regulatory status is optimistic |
| Backend or booking system | Contradicts the zero-server constraint, would force a hosting change, and there is no real product to book |
| Social share buttons | Adds external JavaScript. The audience shares by pasting the link, which already works |
| Dark mode | The sticky-note aesthetic is fundamentally a light-mode design. A dark variant needs a second palette with no relationship to the source material |
| Internationalization | The business is New England specific and the joke is in English |
| A templating layer or static site generator | Would eliminate the five-way duplication of nav and footer markup, but violates the no-build-toolchain constraint. The duplication is accepted as the cost of that constraint |

---

## Metrics

### North Star Metric

**Eject button clicks per visit.**

This is the single number that best represents whether the site is delivering its core
value: someone lands, gets the joke, engages with it, and presses the button. A click
proves the interaction landed. Note that it is currently unmeasurable in aggregate,
because the count lives in each visitor's own localStorage and is never transmitted.
That is a deliberate tradeoff of the zero-tracking constraint, and it means the north
star is a stated intent rather than an operating dashboard.

### Acquisition Metrics

| Metric | Description | Target | Timeframe | Measurement method |
|--------|-------------|--------|-----------|-------------------|
| Unique visitors | Total distinct sessions | 500 total | 90 days post-launch | GitHub Pages traffic insights, or Plausible if it is ever added |
| Referral traffic share | Share of sessions arriving from shared links | Above 60% | 90 days | Referrer headers, requires analytics |
| GitHub repo stars | Stars on github.com/Azqato/mcboat | 10 | 90 days | GitHub repository page |
| Direct or dark social shares | Shares via iMessage and DMs, which carry no referrer | Qualitative only | Ongoing | Anecdotal reports from Tigershark |

### Engagement Metrics

| Metric | Description | Target | Timeframe | Measurement method |
|--------|-------------|--------|-----------|-------------------|
| Eject clicks per session | Average presses of EJECT per visit | 2 or more | 90 days | `bmf_eject_count` in localStorage, per-device and not retrievable remotely |
| Pages per visit | Average pages viewed | 2 or more | 90 days | Requires analytics |
| FAQ interaction rate | Share of visitors opening at least one FAQ item | Above 20% | 90 days | Requires JS event tracking |
| Map hover rate | Share of visitors interacting with the SVG map | Above 15% | 90 days | Requires JS event tracking |
| Invest page views | Visits to `invest.html` | 30% of total visits | 90 days | Requires analytics |
| Time on site | Median session duration | Above 60 seconds | 90 days | Requires analytics |

### Retention Metrics

| Metric | Description | Target | Timeframe | Measurement method |
|--------|-------------|--------|-----------|-------------------|
| Return visitors | Share returning within a 30-day window | Above 10% | 90 days | Requires analytics |

This is a parody marketing site, not a SaaS product. Retention is not a core success
criterion; a high one-time share rate matters more, and the daily reset on the eject
counter is a joke rather than a retention mechanic.

### Performance Metrics

| Metric | Target | Measurement method |
|--------|--------|-------------------|
| Lighthouse Performance score | 90 or better | Browser Lighthouse panel |
| Lighthouse Accessibility score | 90 or better | Browser Lighthouse panel |
| Time to First Contentful Paint | Under 1.5s on 4G | Lighthouse or WebPageTest |
| Total page weight, index.html | Under 500 KB | Browser network panel |
| External HTTP requests on load | Font stylesheet plus its font files only, no other host | Browser network panel |
| JavaScript size, main.js unminified | Under 20 KB | File size on disk, currently 7.3 KB |
| 404 responses | Zero, excluding the four known `assets/` fallback paths | Manual link check after every deploy |

### Targets Summary and Measurement Reality

Every engagement metric above requires an analytics platform that is deliberately not
installed. They are recorded as the definition of success, not as a live dashboard. The
only metrics measurable today without changing the privacy posture are: GitHub stars,
Lighthouse scores, JavaScript file size, and the 404 check.

### Reporting Cadence

| Metric group | Cadence | Owner |
|-------------|---------|-------|
| GitHub stars | At launch, then monthly | Azqato |
| Lighthouse scores | After every material code change | Azqato |
| Eject count, anecdotal | When shared or demonstrated in person | Tigershark |
| 404 check | After every deploy | Azqato |
| Documentation versus code audit | After any change that touches both, and at minimum whenever a version is cut | Azqato |

If quantitative engagement data is ever needed, Plausible is the recommended first step:
privacy-first, no cookies, no consent UI required. Adding it is a policy decision, not
just a technical one, and it must be recorded in this document and in the Security
section before it ships.

---

## Runbook

Everything a developer needs to run, build, deploy, and roll back this project. Assume
the reader has just cloned the repository and has nothing else.

### Prerequisites

| Requirement | Version the project actually needs | Notes |
|-------------|-----------------------------------|-------|
| Git | Any recent version. Verified on 2.54.0 | Only needed to clone and to deploy |
| A modern browser | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ | The site uses `inset`, CSS custom properties, and `prefers-reduced-motion`, all of which predate those versions |
| Python 3 | 3.x. Verified on 3.14.3 | Optional, only to serve files locally |
| Node.js | Not required, and not installed on the maintenance machine | `npx serve` is listed below as an alternative but will fail where `node` is absent |

There is no package manager, no `npm install`, no lockfile, no `.env` file, no database,
and no additional configuration of any kind.

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Azqato/mcboat.git
cd mcboat

# 2a. Open directly in a browser (simplest, works because there are no ES modules)
#     Windows:
start index.html
#     macOS:
open index.html
#     Linux:
xdg-open index.html
```

```bash
# 2b. Or serve it locally, which is what the deployed site does
python -m http.server 8080
# then open http://localhost:8080
```

The default port used by this project's instructions is **8080**. Nothing enforces it;
any port works.

If Node.js is available (it is not on the current maintenance machine), `npx serve .`
also works and prints its own URL, usually http://localhost:3000.

### Build

**There is no build step.** The source files in the repository are the production files.
There is no output directory, no bundler, no minifier, and no asset pipeline. Editing
`index.html` and pushing it changes the live site.

### Deploy

There is exactly one environment beyond local: production.

**Production deploy, automatic on push:**

```bash
git add <files>
git commit -m "your message"
git push origin main
```

GitHub Pages rebuilds automatically from the `main` branch root. The live site at
https://azqato.github.io/mcboat/ updates within roughly 60 seconds. There is no build
action, no CI pipeline, and no deploy script. The push is the deploy.

**Manual steps that are not automated:** verifying the deploy. Nothing checks the site
after a push. Run the verification list below by hand every time.

**Initial GitHub Pages setup on a new fork:**

1. Repository **Settings**, then **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main`, folder `/ (root)`
4. **Save**
5. Wait roughly a minute, then visit `https://<your-username>.github.io/mcboat/`

**Verify the deploy (manual, every time):**

- [ ] https://azqato.github.io/mcboat/ loads
- [ ] Navigation reaches all five pages, and the active page is highlighted on each
- [ ] EJECT animates the figure, fires the splash, and increments the counter
- [ ] FAQ accordion opens and closes, and only one answer is open at a time
- [ ] Map tooltips appear on state hover and the route line animates
- [ ] Buy Now opens the modal, and Escape and backdrop click both close it
- [ ] At a narrow window, the hamburger menu opens and its links work
- [ ] Browser console is clean of errors
- [ ] Network panel shows no unexpected 404s. The four known ones are
      `assets/images/business-plan.webp`, `business-plan.png`, `og-image.png`, and any
      `assets/sounds/*.mp3` request

### Rollback

GitHub Pages deploys from git history, so rollback is a git operation.

```bash
# Find the last known-good commit
git log --oneline -10

# Option A, revert the bad commit. Preferred: it creates a new commit and preserves history
git revert <bad-commit-hash>
git push origin main

# Option B, reset to a specific commit. Rewrites history; use only if a revert is not viable
git reset --hard <good-commit-hash>
git push --force-with-lease origin main
```

GitHub Pages rebuilds from the new HEAD within roughly 60 seconds. There is no build
cache to clear and no CDN purge to request, though a hard refresh may be needed to get
past the browser's own cache of `styles.css` or `main.js`, which are served without
cache-busting filenames.

### Environment Configs

| Environment | URL | Branch | What differs |
|------------|-----|--------|--------------|
| Production | https://azqato.github.io/mcboat/ | `main` | Served over HTTPS from GitHub's CDN at a `/mcboat/` path prefix. Auto-deploys on push |
| Local server | http://localhost:8080 | any | Served from the filesystem root, so the site sits at `/` rather than `/mcboat/`. All internal links are relative, so this makes no difference |
| Local file | `file:///.../index.html` | any | No server at all. Works because there are no ES modules and no fetch calls. Some browsers treat `file://` origins more restrictively, which is why the served option is preferred |

There is **no staging environment**. Test locally, then push to `main`, which is
production. This is a known risk, accepted because the blast radius of a bad deploy is a
parody website and the rollback takes under a minute.

### Environment Variable Reference

**This project reads no environment variables. There are none to set, and none may be
added without violating the no-backend constraint.**

There is no `.env` file, no `.env.example`, no secret of any kind in the repository, and
no configuration that varies between environments. Any future instruction to "set an
environment variable" for this project is a sign that something has gone wrong
architecturally.

### Common Errors

| Error | Likely cause | Fix |
|-------|-------------|-----|
| Page loads unstyled | `css/styles.css` not found, usually from moving a page into a subdirectory | All pages live at the repository root and reference `css/styles.css` with no prefix. Keep them there |
| Nothing interactive works, console shows no errors | `js/main.js` failed to load | Check the network panel for the `main.js` request. Confirm the `<script src="js/main.js" defer>` tag is present at the end of `<body>` |
| Eject animation does not play | `#stick-figure-svg-wrap` or `#eject-btn` missing or renamed | `initEject()` returns silently if either is absent. Confirm both ids exist in `index.html` |
| Business plan image area is blank or shows the SVG notes | `assets/images/business-plan.png` is not in the repository | Expected. The SVG fallback is the intended state today. Add the image to `assets/images/` to display the photo instead |
| A `splash.mp3` 404 appears in the network panel | `playSound('splash')` fired | Should not happen, because `bmf_sound` can no longer be set to true. If it does, the sound flag is set in that browser's localStorage from an old visit. Clear it, or remove the dead sound code |
| `og:image` missing from a social preview | `assets/images/og-image.png` does not exist | Create it at 1200x630 and commit it |
| GitHub Pages 404 on every sub-page | Pages is not configured at the repository root | Settings, Pages: source `main` branch, `/ (root)` folder |
| Changes pushed but the live site looks old | Browser cached `styles.css` or `main.js`, which have no cache-busting suffix | Hard refresh. If it persists past a minute, check the repository's Actions or Pages tab for the build status |
| A stale FAQ answer is clipped mid-sentence | The 400px `max-height` ceiling on open answers | Known defect, listed for v2.6.0. Raise the ceiling in `styles.css` |

### Monitoring

There is no server, no uptime SLA, no logging, and no alerting. This is a static site on
GitHub Pages, which provides high availability on the free tier without any commitment.

Monitoring is manual and consists of:

- Visiting the live URL after every push and walking the verification list above
- The browser console for JavaScript errors
- The browser network panel for unexpected 404s
- https://www.githubstatus.com/ when the site is unreachable and the local files look
  correct. That page is the only external signal available

There is no error tracking service, and adding one would send visitor data to a third
party, which conflicts with the zero-tracking constraint. If error tracking is ever
wanted, it needs a decision recorded in the Security section first.

### Browser Binary Path for Testing

The resolved Microsoft Edge binary on the current maintenance machine is:

```
C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
```

This is the binary any headless or automated check must drive. See the Browser Testing
section for the rule and the reasoning.

---

## Technical Requirements

### System Architecture

This is a zero-dependency static site. There is no server, no build pipeline, no
runtime environment, and no database. The entire system is:

```
Browser  -->  GitHub Pages CDN  -->  static files (HTML / CSS / JS)
                                        |
                                        +--> localStorage (client-side only, never transmitted)
                                        |
                                        +--> Google Fonts (stylesheet + woff2 files)
```

Five HTML documents, one stylesheet, one script. Every page is a complete document with
its own copy of the nav and footer markup; there is no shared layout mechanism. All
state is local to the visitor's browser. No data leaves the client. The site degrades
to readable plain HTML without JavaScript, though every interaction stops working.

### Tech Stack

| Technology | Version | Role |
|-----------|---------|------|
| HTML5 | Living standard | All markup and page structure. Five documents, no templating |
| CSS3 | Living standard | All styling, animation, and design tokens. One file, 895 lines, 21 numbered sections |
| JavaScript | ES5-compatible syntax in an ES6-era file | Interactivity. One file, 231 lines, 7.3 KB. Uses `var`, function expressions, and string concatenation throughout; no arrow functions, template literals, `let`, `const`, or modules |
| Google Fonts | CDN, no pinned version | Permanent Marker (display) and Inter at weights 400, 500, 600 (body) |
| GitHub Pages | N/A | Static hosting, HTTPS, CDN, automatic deploy on push to `main` |
| Git | 2.54.0 on the maintenance machine | Version control and the deploy mechanism |
| Python | 3.14.3, optional | `http.server` for local serving only |

No npm packages, no build tools, no preprocessors, no frameworks, no polyfills, no
linter, and no test runner. The dependency count is zero, which is the point.

### Folder Structure

```
mcboat/
├── README.md                   # Public front door, non-technical, general reader
├── index.html                  # Landing page: hero, business plan, features, eject demo, CTA
├── product.html                # Canvas Exo-Skeleton: explainer, spec table, pricing, buy modal
├── map.html                    # Interactive SVG map of New England, plus an inline <script>
├── invest.html                 # Seven-slide parody investor pitch deck
├── faq.html                    # Twelve-question FAQ accordion
├── css/
│   └── styles.css              # The entire design system, 895 lines, 21 sections
├── js/
│   └── main.js                 # All JavaScript, single IIFE, 231 lines
├── img/
│   └── boat.jpeg               # 4.25 MB reference photo. Referenced by nothing. Not served
├── docs/
│   ├── PRD.md                  # This file: product, technical, process, and audit reference
│   ├── DESIGN.md               # Visual design system
│   └── PATCHNOTES.md           # Dated changelog
└── pages/                      # Empty leftover directory, untracked by git. See below
```

Two structural notes that a directory listing alone would mislead you about:

- **`assets/` does not exist.** It is referenced by `index.html`, `invest.html`,
  `product.html`, and `js/main.js`, and it is documented in older revisions of the
  folder structure as though present. It is not in the repository and never has been.
  Every reference to it is handled by a fallback. The paths that would exist if it were
  created are `assets/images/business-plan.png`, `assets/images/business-plan.webp`,
  `assets/images/og-image.png`, and `assets/sounds/splash.mp3`.
- **`pages/` exists on disk as an empty directory** left over from the v2.2.0 flattening.
  Git does not track empty directories, so it is not in the repository and does not
  deploy. It is local debris on the maintenance machine only. A fresh clone will not
  have it.

### HTML Architecture

All five pages share the same shell. `index.html` carries the most complete `<head>`;
the others omit some meta tags, which is recorded as a discrepancy below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="[page-specific]" />
  <meta property="og:title" content="[page-specific]" />
  <meta property="og:description" content="[page-specific]" />
  <title>[Page-specific title]</title>
  <link rel="icon" href="data:image/svg+xml,...boat emoji..." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <nav class="site-nav"> ... </nav>
  [page content in <section> elements]
  <footer class="site-footer"> ... </footer>
  <script src="js/main.js" defer></script>
</body>
</html>
```

The favicon is an inline SVG data URI holding the sailboat emoji, so no favicon file is
needed. All HTML files live at the repository root and reference assets with no path
prefix; this is why moving a page into a subdirectory breaks it.

**Meta tag coverage, observed:**

| Page | `og:title` | `og:description` | `og:image` | `og:type` | `twitter:card` |
|------|-----------|------------------|-----------|-----------|----------------|
| index.html | yes | yes | yes | yes | yes |
| product.html | yes | yes | yes | no | no |
| map.html | yes | yes | no | no | no |
| invest.html | yes | yes | no | no | no |
| faq.html | yes | yes | no | no | no |

No page has `<link rel="canonical">` or `og:url`.

**Semantic HTML requirements the project holds itself to:**

- `<nav>`, `<section>`, `<article>`, and `<footer>` used semantically throughout
- All images carry descriptive `alt` text
- SVG illustrations carry `role="img"` and `aria-label`; decorative SVG carries
  `aria-hidden="true"`
- Interactive elements are keyboard-reachable
- Heading hierarchy never skips levels
- `aria-current="page"` on the active nav link, which also drives its highlight style

Observed deviation: no page uses a `<main>` element, though older documentation listed
it among the elements used semantically. Content sections sit directly inside `<body>`
between the nav and the footer. Adding `<main>` would be a small, safe accessibility
improvement.

### CSS Architecture

- **Single file:** `css/styles.css`, 895 lines
- **Organization:** 21 numbered comment sections, from `1. CUSTOM PROPERTIES` through
  `21. REDUCED MOTION`, roughly in the order a page renders: tokens, reset, typography,
  layout, nav, hero, animation, buttons, cards, then per-page sections, then footer,
  utilities, responsive, and reduced motion
- **All design tokens are CSS custom properties on `:root`.** See DESIGN.md for the
  full token reference
- **Desktop-first**, despite older documentation claiming mobile-first. There is not a
  single `min-width` media query in the file; the two breakpoints are `max-width: 900px`
  and `max-width: 640px`
- **A substantial amount of layout lives in inline `style` attributes in the HTML**, not
  in the stylesheet. Page section backgrounds, table cells, and one-off grids are inline
  and reference the same custom properties. This is the established pattern for
  non-repeating layout
- No preprocessor, no CSS modules, no utility framework, no `@import`

### JavaScript Architecture

`main.js` is a single IIFE in strict mode. There are no ES modules, which is what allows
pages to be opened directly from `file://` during editing.

```js
(function () {
  'use strict';
  /* function declarations */
  document.addEventListener('DOMContentLoaded', function () {
    initEject();
    initEjectCounter();
    initSoundToggle();
    initFAQ();
    initMap();
    initBuyModal();
    initMobileNav();
    initKonami();
    initTitleEgg();
  });
})();
```

Every `init*` function guards with an early return when its target element is absent, so
the same file loads safely on all five pages and only the relevant behaviors attach.
Nothing is exported and nothing is attached to `window`; the entire file is private to
its closure, which means nothing in it can be called or tested from outside.

#### Function Reference

| Function | Page(s) | Description |
|---------|---------|-------------|
| `initEject()` | index.html | Wires `#eject-btn`. On click: replays the `.ejecting` arc on `#stick-figure-svg-wrap` (forcing reflow with `void fig.offsetWidth` so a rapid second press restarts the animation), schedules `.active` on `#splash-el` at 800ms, increments the counter, calls `playSound('splash')`, and adds `.shake` to the button. Each class is removed again on `animationend` |
| `initEjectCounter()` | index.html | Reads `bmf_eject_date`; if it is not today's `Date.toDateString()`, resets `bmf_eject_count` to `0` and stores today. Then renders the count |
| `incrementEjectCounter()` | index.html | Parses, increments, and stores `bmf_eject_count`, then re-renders |
| `updateCounterDisplay()` | index.html | Writes the stored count into `#eject-count` |
| `initSoundToggle()` | none | Targets `#sound-toggle`, which no longer exists on any page. Returns immediately, every time. Dead |
| `playSound(name)` | index.html (call site) | Returns unless `bmf_sound` is exactly `'true'`, which nothing can set any more. Would construct `new Audio('assets/sounds/' + name + '.mp3')` and play it, swallowing rejection. Effectively dead |
| `initFAQ()` | faq.html | Click, Enter, or Space on `.faq-question` closes every `.faq-item` then opens the clicked one unless it was already open. Does not update `aria-expanded` |
| `initMap()` | map.html | For each `path[data-state]`: `mouseenter` fills and shows `#map-tooltip`, `mousemove` repositions it at cursor +14/-10, `mouseleave` hides it, `click` toggles `.selected` on the path. `.selected` has no CSS rule, so clicking a state does nothing visible |
| `initBuyModal()` | product.html | `.buy-now-btn` opens `#buy-modal` and locks body scroll; `.modal-close`, Escape, and a backdrop click close it and restore scroll. Escape is bound to `document` unconditionally, so it calls the close routine on every Escape press site-wide on that page |
| `initMobileNav()` | all | `.nav-menu-btn` toggles `.open` on `.nav-links` and mirrors the state into `aria-expanded` |
| `initKonami()` | all | Tracks the keydown sequence up, up, down, down, left, right, left, right, B, A using the deprecated `e.keyCode`. On a match, calls `activateEasterEgg()` |
| `activateEasterEgg()` | all | Applies a `hue-rotate(180deg)` filter to `<body>` for 600ms, then clears it and shows a native `alert()` |
| `initTitleEgg()` | all | Intended: five clicks on `.nav-logo` swap the tab title for three seconds. Actual: the handler returns on the first line because `.nav-logo` is an `<a>` and `e.target.closest('a')` always matches. The counter never increments |

There is also an **inline `<script>` block at the bottom of `map.html`** that attaches a
second `mouseenter` listener to the same state paths and writes the state's `data-*`
values into `#state-detail` via `innerHTML`. It duplicates data already read by
`initMap()` and is the one piece of page-specific JavaScript outside `main.js`.

#### localStorage Keys

| Key | Values | Written by | Purpose |
|-----|--------|-----------|---------|
| `bmf_eject_count` | Integer as a string | `initEjectCounter()`, `incrementEjectCounter()` | Today's eject count |
| `bmf_eject_date` | `Date.toDateString()` output | `initEjectCounter()` | Last active date, used to detect the day rollover |
| `bmf_sound` | `'true'` or `'false'` | `initSoundToggle()` only, which can no longer run | Sound opt-in. Effectively orphaned. May still be set in the browser of anyone who used the toggle before v2.3.0 |

### Data Models

This project has no database and no data layer. All data is authored directly in HTML
attributes and read back from the DOM.

#### SVG Map State Data

Each `<path>` in the New England SVG carries its own data:

```html
<path
  data-state="maine"
  data-label="Maine (three shark emoji)"
  data-shark-level="Extremely High"
  data-quip="Where great whites come for vacation. Also lobsters."
  tabindex="0"
  aria-label="Maine - Shark Risk: Extremely High"
  d="..." />
```

| Attribute | Type | Consumed by |
|-----------|------|-------------|
| `data-state` | string slug | CSS selectors for per-state fill and hover colors |
| `data-label` | string | Tooltip header and the sidebar detail panel |
| `data-shark-level` | string | Tooltip shark line and the sidebar panel |
| `data-quip` | string | Tooltip flavor line and the sidebar panel |
| `tabindex="0"` | attribute | Makes the path keyboard-focusable |
| `aria-label` | string | Screen reader name for the path |

There are **seven paths carrying `data-state` for six states**: Massachusetts is drawn
as two paths, the mainland and Cape Cod, which share `data-state="massachusetts"` but
carry different labels, shark levels, and quips. Any code that assumes one path per
state is wrong.

The route line is an eighth path, `class="route-line"`, with no `data-state`, so the map
handlers ignore it.

#### Shark Risk Levels

Not a formal enum, just a convention held consistently across the map paths, the sidebar
legend, and the six detail cards below the fold:

| Level | States | Legend dot color |
|-------|--------|-----------------|
| Zero (landlocked) | Vermont | lavender |
| Low | Connecticut | mint |
| Low-Medium / Medium | New Hampshire, Rhode Island | yellow |
| High | Massachusetts mainland | eject red |
| Extremely High / Maximum | Maine, Cape Cod | eject red |

Because it is a convention rather than a data structure, adding a state or changing a
level means editing the path attribute, the legend row, and the detail card, in three
different places in `map.html`.

#### Pricing Tier Data

Authored directly in `product.html` as three `.pricing-card` blocks.

| Tier | Price | Retrieval SLA | Key differentiators |
|------|-------|--------------|--------------------|
| Bronze | $299 | 20 min | Standard canvas, one eject, life jacket, certificate. Shark zone seating shown struck through |
| Silver | $499 | 10 min | Reinforced canvas, two ejects, premium jacket, framed certificate, shark zone upgrade, splash photo. Carries the "Most Ejected" badge |
| Gold | $999 | Immediate | Gold-plated canvas (aesthetic only), unlimited same-day ejects, monogrammed VIP jacket, NFT of the eject arc, priority shark positioning, branded towel, post-eject debrief with Tigershark |

Card order is load-bearing: `.pricing-card:nth-child(n)` assigns both background color
and rotation, so reordering or inserting a tier changes the appearance of every tier
after it.

### API Design and Internal Data Flow

There are no APIs. No endpoint is called, no `fetch` or `XMLHttpRequest` appears
anywhere in the project, and no data is sent off the device. The only outbound requests
a page makes are for its own static assets and for Google Fonts.

The internal data flows, in full:

**1. Eject counter.**
`DOMContentLoaded` -> `initEjectCounter()` reads `bmf_eject_date` -> if stale, writes
`bmf_eject_count = 0` and today's date -> `updateCounterDisplay()` writes the value into
`#eject-count`. On each click: `incrementEjectCounter()` reads, adds one, writes, and
re-renders. Failure state: if `localStorage` throws (private mode in some browsers, or
storage disabled), the exception is unhandled and the rest of `initEject()`'s click
handler after `incrementEjectCounter()` does not run, which would suppress the sound
call and the button shake but not the arc animation, since that runs first. This is
untested and is listed as an open question.

**2. Map hover.**
`mouseenter` on a state path -> read `data-label`, `data-shark-level`, `data-quip` ->
write into the three `.tt-*` children of `#map-tooltip` with `textContent` -> add
`.visible`. Separately and simultaneously, the inline script on `map.html` reads the same
three attributes and writes them into `#state-detail` with `innerHTML`. Two listeners,
one source of truth, two destinations.

**3. FAQ accordion.**
Click on `.faq-question` -> read whether the parent `.faq-item` has `.open` -> remove
`.open` from all items -> add it back to this one if it was closed. The open state lives
only as a DOM class.

**4. Buy modal.**
Click `.buy-now-btn` -> add `.open` to `#buy-modal`, set `document.body.style.overflow`
to `hidden`. Close via button, Escape, or backdrop -> remove `.open`, restore
`overflow`.

**5. Mobile nav.**
Click `.nav-menu-btn` -> toggle `.open` on `.nav-links`, mirror the resulting boolean
into the button's `aria-expanded`.

Error states: there are none, in the sense that nothing has a failure path. No function
validates input, catches an exception, or reports a problem. The only defensive code in
the project is the early-return guard at the top of each `init*` function and the empty
`.catch()` on audio playback.

### State Management

All state is either an ephemeral DOM class or a localStorage value. There is no state
container, no observable, and no single source of truth beyond the DOM itself.

| State | Storage | Scope | Survives reload |
|-------|---------|-------|-----------------|
| Eject counter value | `localStorage['bmf_eject_count']` | Per-device, resets daily | Yes |
| Counter reset date | `localStorage['bmf_eject_date']` | Per-device | Yes |
| Sound opt-in | `localStorage['bmf_sound']` | Per-device, orphaned | Yes, but nothing writes it any more |
| FAQ open item | `.open` class on one `.faq-item` | Page session | No |
| Modal open | `.open` class on `#buy-modal` | Page session | No |
| Mobile nav open | `.open` class on `.nav-links` | Page session | No |
| Map state selected | `.selected` class on an SVG path | Page session | No, and it has no visual effect |
| Animation in progress | `.ejecting`, `.active`, `.shake` classes | Sub-second | No |

### Third-Party Integrations

| Service | What it does | How it is authenticated | What it receives |
|---------|-------------|------------------------|------------------|
| Google Fonts | Serves the Permanent Marker and Inter webfonts from `fonts.googleapis.com` (stylesheet) and `fonts.gstatic.com` (woff2 files) | None. Anonymous public CDN, no key | The visitor's IP address and user agent, as any HTTP request would |
| GitHub Pages | Hosts and serves every file over HTTPS from GitHub's CDN | None for visitors. Deploy is authenticated by the maintainer's git credentials | The visitor's IP address and user agent |
| azqato.github.io/support.html | Destination of the "Send $2M" button on `invest.html` | None | Nothing, until the visitor clicks through. It is a plain outbound link |

That is the complete list. There is no analytics, no error tracking, no CDN for scripts,
no embedded video, no map provider, no payment processor, and no form handler.

### Performance Requirements

| Metric | Target | Observed |
|--------|--------|----------|
| Total page weight, index.html | Under 500 KB | Approximately 55 KB of HTML, CSS, and JS, plus fonts. Comfortably met, because the referenced images do not exist |
| `main.js` unminified | Under 20 KB | 7.3 KB |
| `styles.css` unminified | Under 40 KB | 25.6 KB |
| `business-plan.png`, if ever added | Under 200 KB, WebP preferred | Not present |
| Time to First Contentful Paint on 4G | Under 1.5s | Not measured |
| External hosts contacted on load | Two: `fonts.googleapis.com` and `fonts.gstatic.com` | Met |
| Lighthouse Performance | 90 or better | Not measured since launch |

The single largest file in the repository, `img/boat.jpeg` at 4.25 MB, is never served
to a visitor. It affects clone size only, but it is 98% of the repository by bytes.

### Known Technical Debt

| Item | Current state | Correct solution |
|------|-------------|-----------------|
| Dead sound system | `initSoundToggle()`, `playSound()`, the `playSound('splash')` call, the `bmf_sound` key, and three CSS rules survive a feature removed in v2.3.0 | Delete all of it, or restore the toggle UI. Half-present is the worst of both |
| Broken logo easter egg | `initTitleEgg()` cannot fire; the guard rejects every click | Guard against the click landing on a *different* link, or drop the guard entirely since the logo has no nested links |
| FAQ `aria-expanded` never updates | Screen readers are told all twelve questions are collapsed even when one is open | Set `aria-expanded` on each `.faq-question` inside `initFAQ()` alongside the class toggle |
| Duplicate map hover logic | An inline `<script>` in `map.html` attaches a second listener reading the same attributes | Move the `#state-detail` update into `initMap()` and delete the inline block |
| `.selected` class has no styling | Clicking a state toggles a class nothing renders | Add a selected style, or remove the click handler |
| Orphaned wave animation CSS | `.wave-layer`, `.wave-layer-2`, `wave-drift`, `wave-drift-slow` match no element | Delete, or build the layered wave markup the CSS was written for |
| FAQ tinting stops at item 8 | Twelve items exist; four render untinted | Replace the eight `nth-child(n)` rules with repeating `nth-child(4n+1)` style rules |
| FAQ answers clip at 400px | `max-height` ceiling plus `overflow: hidden` truncates long answers | Raise the ceiling, or animate `grid-template-rows` from `0fr` to `1fr` |
| Malformed spec table style | `product.html` has `padding: var(--space-3) var(--color-ink);` immediately followed by a correct declaration. The first is invalid and ignored | Delete the invalid declaration |
| `#legal` anchor points at the wrong question | The id sits on "What if I can't swim?"; `index.html` links to it as "Legal (Probably)" | Move `id="legal"` to the "Is this legal?" item and give the swim item its own id |
| No canonical URLs | No page has `<link rel="canonical">` or `og:url` | Add both to all five pages |
| Inconsistent social meta | Only `index.html` has the full `og:type` and `twitter:card` set | Bring all five to parity |
| No cache busting | `styles.css` and `main.js` are served under stable names; browsers can hold stale copies after a deploy | Add a query-string version suffix on the `<link>` and `<script>` tags, bumped per release |
| No `<main>` landmark | Content sits directly between nav and footer | Wrap page content in `<main>` on all five pages |
| Modal focus handling | No focus trap, no focus restoration on close | Trap Tab inside `.modal-box` while open; return focus to the triggering button |
| Nav and footer duplicated five ways | Any nav change is a five-file edit | Accepted permanently. Fixing it requires a build step, which the constraints forbid |
| `img/boat.jpeg` is unreferenced | 4.25 MB of the repository serves nothing | Decide whether it is source material worth keeping or debris. If keeping, note why in this table |
| Deprecated `keyCode` | `initKonami()` reads `e.keyCode`, deprecated but universally supported | Switch to `e.key` when the file is next touched |

---

## Conventions

Derived from reading the code, not from any style guide. Where the codebase is
inconsistent, the dominant form is named and the deviations are listed, so the next
contributor matches the majority rather than the last file they happened to open.

### Naming

| Thing | Convention | Examples |
|-------|-----------|----------|
| HTML files | lowercase, single word, no separators | `index.html`, `product.html`, `invest.html` |
| Directories | lowercase, short, singular or natural plural | `css/`, `js/`, `img/`, `docs/`, `assets/images/` |
| Documentation files | UPPERCASE with `.md` | `README.md`, `PRD.md`, `DESIGN.md`, `PATCHNOTES.md` |
| CSS classes | lowercase kebab-case, block-then-modifier without BEM's double delimiters | `.pricing-card`, `.btn-primary`, `.sticky-note-card`, `.pitch-stat-label` |
| CSS state classes | bare adjective, applied alongside the base class | `.open`, `.visible`, `.active`, `.selected`, `.ejecting`, `.shake` |
| CSS custom properties | `--category-name`, lowercase kebab-case | `--color-salmon`, `--space-4`, `--text-lg`, `--shadow-sketch-lg` |
| DOM ids | lowercase kebab-case, used only where JavaScript needs a handle or an anchor needs a target | `#eject-btn`, `#map-tooltip`, `#stick-figure-svg-wrap`, `#ask`, `#sharks` |
| JS functions | camelCase, initialization functions prefixed `init` | `initEject`, `initMobileNav`, `incrementEjectCounter`, `activateEasterEgg` |
| JS variables | camelCase, short, often single letter in tight scopes | `btn`, `fig`, `splash`, `n`, `pos`, `p`, `i` |
| JS constants | SCREAMING_SNAKE_CASE, declared with `var` inside function scope | `KEY`, `DATE` in `initEjectCounter` |
| localStorage keys | `bmf_` prefix, snake_case | `bmf_eject_count`, `bmf_eject_date`, `bmf_sound` |
| Data attributes | `data-` plus lowercase kebab-case | `data-state`, `data-shark-level`, `data-quip` |

### Formatting

| Aspect | Convention | Exceptions |
|--------|-----------|-----------|
| Indentation | 2 spaces, never tabs, in HTML, CSS, and JS | None found |
| Quotes in JS | Single quotes for strings | None found |
| Quotes in HTML attributes | Double quotes | None found |
| Semicolons in JS | Always present | None found |
| Trailing commas | Not used | |
| Line length | Soft. Most lines are under 100 characters, but long inline `style` attributes and prose paragraphs in HTML run well past it and are not wrapped | |
| CSS declaration style | One declaration per line for multi-property rules; single-line for short rules of one to three declarations | Both forms appear throughout and both are correct here |
| CSS rule order within a section | Layout, then box, then typography, then color, then transform and transition, loosely | Not strictly enforced |
| Blank lines | One between rules and between functions, two around numbered CSS section headers | |
| HTML self-closing | Void elements written with a trailing slash: `<meta ... />`, `<img ... />` | Consistent |
| File encoding | UTF-8. Emoji are written literally in HTML rather than as entities | Consistent |
| Import ordering | Not applicable. No imports exist anywhere in the project | |

### Organization

- **One file per layer, absolutely.** One stylesheet, one script. This is tenet 7 and it
  is not negotiable at this scale.
- **File size norms:** `styles.css` at 895 lines and `main.js` at 231 lines are both
  considered normal here. HTML pages run 273 to 396 lines. There is no size at which a
  file gets split; it gets a new numbered section instead.
- **`styles.css` is divided by numbered comment banners** (`/* 12. FEATURES PREVIEW */`).
  New component styles go into the section they belong to. A new section is added only
  for a genuinely new area of the site, and it takes the next number.
- **`main.js` is divided by short comment separators** and grouped as one `init*`
  function per feature, with helpers immediately after their caller. All functions are
  declared at the top level of the IIFE; nothing is nested more than one level deep
  inside its own function.
- **Nothing is exported.** The IIFE has no return value and sets nothing on `window`.
  This is deliberate: nothing outside the file can reach in, which also means nothing
  can be unit tested.
- **Page-specific one-off layout lives inline in the HTML**, referencing design tokens.
  Repeated patterns are promoted to a class in `styles.css`. The judgment call is
  whether the pattern appears more than once.
- **One inline `<script>` exists**, at the bottom of `map.html`. It is documented as
  technical debt rather than as a pattern to follow. Do not add a second one.

### Comment Density and Format

Comments are sparse and structural rather than explanatory. The codebase's working
assumption is that well-named functions and classes do not need prose.

- **HTML:** uppercase section banners marking major page regions, for example
  `<!-- HERO -->`, `<!-- PRICING -->`, `<!-- FOOTER -->`. Inside SVG blocks, short
  lowercase comments label individual shapes (`<!-- Hull stripe -->`, `<!-- Shark fin in
  water -->`), which is the highest comment density in the project and is justified
  because raw path data is unreadable otherwise.
- **CSS:** one numbered banner per section, plus occasional inline notes explaining a
  non-obvious value (`/* Uneven corners = hand-drawn */`).
- **JavaScript:** one short banner per feature group using box-drawing characters, and
  almost nothing else. There is not a single explanatory comment inside a function body.
- **What earns a comment here:** a section boundary, a shape inside an SVG, or a value
  whose purpose is not recoverable from reading it. What does not: anything the name
  already says. There are no JSDoc blocks, no type annotations, and no TODO, FIXME, or
  HACK markers anywhere in the project.

### Error Handling, Logging, and Validation

There is essentially none, and that is the convention rather than an oversight to fix
casually.

- **Guard clauses instead of error handling.** Every `init*` function begins with a
  lookup and an early `return` if the element is missing. That is the entire defensive
  strategy.
- **One catch in the codebase:** `a.play().catch(function () {});` in `playSound`,
  swallowing the autoplay rejection silently.
- **No logging.** There is not one `console.log`, `console.warn`, or `console.error` in
  the project. A clean console is the success signal, so anything logged would be noise.
- **No validation.** Nothing takes user input, so there is nothing to validate.
- **No try/catch around localStorage**, which is the one place a real exception is
  plausible.
- If error handling is ever added, it should stay silent to the visitor: this is a
  parody site, and a visible error message is worse than a feature quietly not working.

### Commit Message Style and Branching

Read from the version control history, not from a contributing guide, because none
exists.

- **Branching:** a single `main` branch. No feature branches, no PRs, no merge commits,
  no tags. Every commit in the history is a direct commit to `main`, and `main` is
  production.
- **Commit subject style:** two forms appear.
  1. Version-prefixed for release commits: `v2.4.0 - Documentation consolidation audit`,
     `v2.0.0 - Rebrand CTO from Zoop to Azqato across all pages`. Historically these
     used an em dash between version and summary; per the writing style below, new ones
     use a single hyphen.
  2. Plain imperative or descriptive for small changes: `Add board members to team
     slide`, `Point Send $2M button to azqato.github.io/support.html`, `Correct founder
     attribution: Tigershark is visionary, Zoop is CTO`.
- **Dominant form:** version-prefixed whenever the change is versioned in
  `PATCHNOTES.md`, plain imperative otherwise. Both are correct; use the first for
  anything that gets a patch notes entry.
- **No Conventional Commits.** No `feat:`, `fix:`, or `chore:` prefixes appear. Do not
  introduce them.
- **No commit bodies.** Every commit in the history is subject-only. Rationale goes into
  `PATCHNOTES.md`, which is where a reader will look for it.
- **Commits are release-sized**, not atomic. A single commit typically touches every file
  a change affects across all five pages.

---

## Writing Style

This is the project's rule for prose in its documentation, its UI copy, and its code
comments. The project stated no rule of its own before this audit, so the default below
was adopted and is now the rule.

### The em dash is prohibited

Prohibited in all three of its forms:

1. The Unicode character at code point U+2014
2. The `&mdash;` HTML entity
3. The double hyphen used as punctuation

The character and the entity must be searched for independently, because a search for
one will not find the other. Both searches were run across the entire project in this
audit.

**CSS custom properties (`--color-bg`, `--space-4`, and so on) are valid syntax, not
punctuation, and are never touched.** Neither are command-line flags such as
`--force-with-lease`, which appear throughout the Runbook.

### Replacements

Replace each instance with whichever alternative fits the context:

| Replacement | When |
|-------------|------|
| Comma | The most natural choice in most running prose |
| Colon | Introducing a list or an elaboration after a complete clause |
| Semicolon | Joining two closely related independent clauses |
| Parentheses | Asides and supplementary detail |
| Period | Splitting one long sentence into two |
| Single hyphen | Titles, section headings, version lines, and label-value pairs where a comma or colon reads awkwardly |

The single hyphen is permitted and encouraged. The prohibition does not cover it, and it
is the closest visual match to what it replaces, which is why it is the right choice in
a document title (`# DESIGN.md - Boaty McBoatface Ventures`) or a version line
(`## v2.5.0 - 2026-08-25`). In running prose the other replacements usually read better.

Leave any instance the text needs in order to mean anything, such as a rule or an
example that names the character it prohibits. Replacing those destroys the line. This
document avoids that situation by naming the character rather than printing it.

### Tone

Direct and functional. Plain declarative sentences. No marketing language, no filler
openings, no restating the obvious to fill space. Thorough means more facts, not more
words around the same facts.

This applies to the documentation and to code comments. **It does not apply to the site's
own UI copy in the same way**, and this is an important carve-out: the site's voice is
deadpan startup parody, and lines like "It displaces water. That's the main thing." are
the product. The typographic rules (no em dashes) apply to UI copy; the tone rules do
not. UI copy answers to the tenets, not to this section.

### Enforcement

Before any commit that touches text, run both searches across the working tree. On this
maintenance machine, with no Node.js available:

```bash
# Unicode em dash. The character is pasted directly into the pattern
grep -rn "<em dash character>" --exclude-dir=.git .

# HTML entity
grep -rn "&mdash;" --exclude-dir=.git .

# Double hyphen used as punctuation, ignoring CSS properties and CLI flags
grep -rn "[A-Za-z0-9] -- \|[A-Za-z0-9]--[A-Za-z0-9]" --exclude-dir=.git .
```

All three must return nothing. As of 2026-08-25 all three do.

---

## Browser Testing

The project stated no rule of its own for this before the 2026-08-25 audit, so the
default below was adopted and is now the rule.

### The rule

**Use Microsoft Edge. Never Chrome.**

The maintenance machine has no JavaScript runtime, so end-to-end testing means driving a
headless browser directly rather than running a test framework. Chrome is the owner's
day-to-day browser, and driving it would disturb a live session with open tabs and
signed-in profiles. Edge runs the same Chromium engine, produces the same rendering and
the same DevTools protocol, and is free to drive.

This applies to **every browser a test drives**, not only one named in a config file.
There is no config file here. An ad hoc headless invocation from a shell command or a
script is testing, and it falls under the same rule.

### Resolved binary path

```
C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
```

Verified present on 2026-08-25. This path is recorded because it differs by platform and
is the first thing that breaks on a new machine. Note the `(x86)` directory: on this
machine Edge is **not** at `C:\Program Files\Microsoft\Edge\Application\msedge.exe`, and
a script assuming the 64-bit path will fail.

### Second engines

The site targets Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+, which is a stated
support matrix rather than a tested one. Nothing in the codebase is engine-specific:
there are no vendor prefixes, no browser sniffing, and no polyfills. Firefox and Safari
checks are worth doing manually before a release that touches CSS animation or the SVG
map, but they are not automated and there is no infrastructure to automate them with.

### What testing actually exists

None, automated. There is no test suite, no test runner, no assertion library, no
snapshot, and no CI. Verification is the manual checklist in the Runbook, walked in a
browser by a person. This is the honest state of the project, and any document claiming
otherwise is wrong.

---

## Security

### Authentication Model

There is none, and there cannot be one. The site is entirely public, static, and
read-only. No login, no session, no token, no cookie, and no user account exists.
Visitors are never identified, and the site has no concept of a user.

### Authorization Model

There are no roles and no protected routes. Every visitor sees exactly the same five
pages. The only asymmetry in the entire system is between a visitor, who can read, and
the repository owner, who can push to `main` and thereby deploy. That boundary is
enforced entirely by GitHub account credentials on the repository, not by anything in
this codebase.

### Data Storage

The site stores three keys, all exclusively in the visitor's own browser, none of which
ever leaves the device.

| Key | Storage | Data | Scope | Who can read it |
|-----|---------|------|-------|----------------|
| `bmf_eject_count` | localStorage | Integer, how many times EJECT was pressed today | Per-device, per-day | Only pages served from the same origin. No server ever sees it |
| `bmf_eject_date` | localStorage | A `Date.toDateString()` string, used to detect day rollover | Per-device | Same |
| `bmf_sound` | localStorage | `'true'` or `'false'`, orphaned since v2.3.0 | Per-device | Same. May persist in browsers that visited before v2.3.0 |

No personal data is collected. No form exists to submit any. No analytics platform is
installed. No cookies are set. No tracking pixel is loaded. No fingerprinting is
attempted. Deleting site data in the browser removes everything the site knows.

### Environment Variables

**There are no environment variables, and there are no secrets.** Confirmed by reading
every file in the repository during this audit: there is no API key, no token, no
password, no connection string, and no credential of any kind, hardcoded or otherwise.
There is nothing that could be hardcoded, because nothing authenticates to anything.

The one credential involved in the project at all is the maintainer's GitHub
authentication for `git push`, which lives in the developer's own git credential store
and never appears in the repository.

If this ever changes (it should not, given the no-backend constraint), the variable
names and their purposes belong in this section, and the values belong nowhere near the
repository.

### Third-Party Trust

Every external party that receives any visitor data, and exactly what they receive:

| Service | Data received | Why |
|---------|--------------|-----|
| GitHub Pages | IP address, user agent, requested path, and referrer, as with any HTTP request | It serves every file on the site |
| Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) | IP address and user agent | It serves the Permanent Marker and Inter webfonts |

That is the complete list. If Google Fonts is ever considered a privacy problem, the two
font families can be self-hosted in `assets/fonts/` with `@font-face` declarations in
`styles.css`, which would reduce the external party count to one. That change is not
planned but is recorded as the available remedy.

The "Send $2M" button on `invest.html` links out to `azqato.github.io/support.html`.
Clicking it is a normal navigation and sends the same headers any link does, including a
referrer identifying this site. It is the same owner's page.

### Known Attack Surface

| Area | Risk | Mitigation |
|------|------|-----------|
| Public source | The repository is public, so all source is readable | Intended. There is nothing sensitive to read |
| localStorage | An XSS flaw could read or write the eject counter | Impact is negligible. There is no session, no token, and no personal data to steal |
| `innerHTML` in the `map.html` inline script | The state detail panel is built by string concatenation into `innerHTML` from `data-*` attributes | The values are author-written and there is no user input anywhere on the site, so there is no injection vector today. It is still the one pattern in the codebase that would become dangerous the moment any user-supplied string reaches it. `textContent` plus element creation would be safer, and `initMap()` already does it the safe way for the tooltip |
| Outbound link without `rel` | The "Send $2M" link and the Azqato team link open without `rel="noopener noreferrer"` | Modern browsers imply `noopener` for `target="_blank"`, and neither link uses `target="_blank"` at all, so there is no reverse-tabnabbing exposure. Adding `rel="noopener"` remains good practice |
| Dependency chain | None to attack. Zero packages | Nothing to do |
| Deploy path | Anyone with push access to `main` publishes instantly with no review | Accepted. Two-person project, one-minute rollback. Protecting `main` would add process no one would follow |
| Native `alert()` in the Konami egg | Blocks the main thread and cannot be styled | Cosmetic only, not a security issue. Noted so nobody mistakes it for one |

### Dependency Policy

Zero npm dependencies, zero JavaScript libraries, zero CSS frameworks, and no lockfile.
The vulnerability surface from dependencies is empty, and there is nothing for a scanner
to scan. This is the deliberate outcome of tenet 4.

Monitoring, given that: there is nothing to monitor automatically, so the policy is a
review rule rather than a tool. **Before any dependency is added, it must be assessed
for license compatibility, size impact, maintenance record, and whether it can be
avoided entirely.** In this project the answer to the last question has always been yes,
and any proposal to add a dependency should be read as a proposal to abandon tenet 4,
which requires an explicit decision recorded in this document.

Google Fonts is the sole external runtime dependency and is unversioned by design; it is
a CDN URL, not a pinned package. If it ever breaks, the fallback stacks (`cursive` and
`sans-serif`) keep the site readable.

---

## Deprecation and Removal

### Removal Policy

The project stated no removal rule of its own before this audit. Its changelog does show
a consistent pattern (files removed outright, with the removal recorded in
`PATCHNOTES.md` and their content noted as merged elsewhere), and that pattern is
compatible with the default below, which is hereby adopted as the written policy.

Whether a removal needs a redirect is decided by whether the thing being removed is
public facing, not by the fact that it is being removed.

**Public facing:** the deployed artifact and the addresses it serves. On this project
that means live URLs. Removing one retires the address behind a redirect, alias, or
equivalent compatibility shim pointing at whatever replaces it, so that the old address
keeps resolving.

**Internal:** the source that builds the artifact, and anything not reachable from
outside. Removing one is a plain delete: no redirect, no alias, no stub file, no
tombstone. Nothing external points at it, so there is no address to preserve, and a
permanent compatibility entry would be maintenance in exchange for nothing.

### Where this project draws the deploy boundary

This is a static site with no build step, which makes the boundary unusually blunt:
**every file at the repository root and in `css/`, `js/`, `img/`, and `assets/` is
deployed verbatim and is therefore public facing. Everything in `docs/` is deployed too,
but is documentation rather than an address anyone links to.**

That means a page filename is not "derived from source" the way it is in a project with
a build step. `product.html` *is* the address. Renaming or deleting it breaks any link
anyone has ever shared. Treat every `.html` file at the root as a permanent public
address.

### The redirect problem

**GitHub Pages offers no redirect mechanism to this project.** There is no server, no
`.htaccess`, no rewrite rules, no `_redirects` file support, and no Jekyll plugin in
use. The site cannot issue a 301.

What it does instead, and what any future removal must use: **a stub HTML file at the old
address containing a `<meta http-equiv="refresh">` and a visible link to the new
location.** That is the only compatibility shim available without adding infrastructure,
and it is the mechanism this policy names. A stub file is a client-side redirect, it is
slower and less correct than a 301, and it is what the platform allows.

Because that shim costs a real file in the repository, the practical consequence is:
**avoid renaming or removing pages.** The cheapest correct answer is to not create the
problem.

### Public Surface

The complete list of publicly addressable things, specific enough to answer the question
for any given file:

| Address | Type | Status |
|---------|------|--------|
| `https://azqato.github.io/mcboat/` and `/index.html` | Page | Live, permanent |
| `https://azqato.github.io/mcboat/product.html` | Page | Live, permanent |
| `https://azqato.github.io/mcboat/map.html` | Page | Live, permanent |
| `https://azqato.github.io/mcboat/invest.html` | Page | Live, permanent |
| `https://azqato.github.io/mcboat/faq.html` | Page | Live, permanent |
| `/css/styles.css` | Asset | Live. Referenced by all five pages |
| `/js/main.js` | Asset | Live. Referenced by all five pages |
| `/img/boat.jpeg` | Asset | Deployed and publicly reachable, but referenced by nothing. Deployed does not mean linked |
| `/docs/PRD.md`, `/docs/DESIGN.md`, `/docs/PATCHNOTES.md`, `/README.md` | Documents | Deployed as raw files and linked from GitHub, not from the site |
| `#eject-demo` on index.html | Fragment anchor | Linked from index and from `invest.html` and `faq.html`. Cross-page links to it exist, so it is an address |
| `#sharks`, `#legal` on faq.html | Fragment anchors | Linked from `index.html`. Addresses, and `#legal` currently resolves to the wrong question |
| `#ask` on invest.html | Fragment anchor | Linked from within `invest.html` |
| `#pricing`, `#how-it-works` on product.html | Fragment anchors | Linked from within `product.html` |
| `https://azqato.github.io/support.html` | External destination | Not owned by this repository, but this site links to it. If it moves, `invest.html` breaks |

Fragment anchors are on this list deliberately. A cross-page link to `faq.html#sharks`
is as breakable as a link to a page, and renaming that id is a public-facing removal.

### Compatibility Entries

There are none today. No page has ever been renamed or removed since launch; the v2.2.0
flattening moved files from `pages/` to the root before the site was widely shared, and
no shim was created.

If any are ever added, they are governed by three rules:

1. **They are permanent.** A compatibility entry is never cleaned up later, because the
   links it serves never expire.
2. **They are never chained.** A redirect resolves to a real target in one hop. A stub
   pointing at another stub is a bug.
3. **They are never reused to point at different content.** A reused address silently
   serves the wrong thing, which is worse than a broken link, because nobody notices.

### Retired Items

A reader who finds a reference to something that no longer exists should be able to
resolve it here.

| Item | Removed | Replaced by |
|------|---------|-------------|
| `pages/` directory | v2.2.0, 2026-06-13 | All pages moved to the repository root. An empty `pages/` directory may still exist on old working copies; it is untracked and harmless |
| Sound toggle UI (nav checkbox and eject-demo checkbox) | v2.3.0, 2026-06-13 | Nothing. The feature was removed rather than replaced. Its JavaScript and CSS were left behind and are listed as technical debt |
| `CHANGELOG.md` (root) | v2.1.0, 2026-06-13 | `docs/PATCHNOTES.md` |
| `PRD.md`, `TRD.md`, `DESIGN.md` (root) | v2.1.0, 2026-06-13 | `docs/PRD.md`, `docs/TRD.md`, `docs/DESIGN.md` |
| `docs/TRD.md` | v2.4.0, 2026-06-13 | Technical Requirements section of this document |
| `docs/METRICS.md` | v2.4.0, 2026-06-13 | Metrics section of this document |
| `docs/PRFAQ.md` | v2.4.0, 2026-06-13 | Press Release and FAQ sections of this document |
| `docs/ROADMAP.md` | v2.4.0, 2026-06-13 | Product Roadmap section of this document |
| `docs/RUNBOOK.md` | v2.4.0, 2026-06-13 | Runbook section of this document |
| `docs/SECURITY.md` | v2.4.0, 2026-06-13 | Security section of this document |
| `docs/TENETS.md` | v2.4.0, 2026-06-13 | Product Tenets section of this document |
| Developer-facing README content | v2.5.0, 2026-08-25 | Runbook and Technical Requirements sections of this document. The README was rewritten for a general reader |
| "Zoop" as the CTO's name | v2.0.0, 2026-06-09 | "Azqato" everywhere on the site and in the docs |

Every removed documentation file was internal: source in the repository, not an address
the site serves, so each was a plain delete under the policy above. No page has ever been
removed, so no stub has ever been needed.

**Historical records are not rewritten when something is removed.** Changelog entries and
milestone rows describing deleted items stay exactly as they are, because they record
what happened at the time rather than describing the current state. A patch notes entry
that mentions `docs/TRD.md` is correct even though the file is gone.

---

## Documentation Versus Reality

Every discrepancy found in the 2026-08-25 audit. The code is treated as the truth about
what is; the documentation as the truth about what was intended. Resolved rows are kept
with a note on how they were resolved, so the record shows what was found and what was
decided.

### Documented features that do not exist, or do not work

| # | Claim | Reality | Trust | Status |
|---|-------|---------|-------|--------|
| 1 | Logo click easter egg: five clicks change the tab title | `initTitleEgg()` returns on the first line of every click because `.nav-logo` is an `<a>` and `e.target.closest('a')` always matches. The counter never reaches 5 | The code. This is provable by reading it | Documented as broken. Fix or delete in v2.6.0 |
| 2 | Sound effects with an opt-in toggle | Toggle UI removed in v2.3.0. `initSoundToggle()` and `playSound()` remain and `playSound('splash')` is still called, but `bmf_sound` can no longer be set and `assets/sounds/` does not exist | The code | Documented as dead code |
| 3 | FAQ `aria-expanded` "toggled by JS" (DESIGN.md) | `initFAQ()` toggles only the `.open` class. `aria-expanded` stays `false` forever | The code | Documented in DESIGN.md and here. Real accessibility defect |
| 4 | `--space-24` used for hero padding (DESIGN.md) | Defined in `:root`, used by nothing. The hero uses `--space-8` | The code | Corrected in DESIGN.md, token left in place |
| 5 | `--font-mono` for code snippets (DESIGN.md) | Defined, used by nothing. No code-formatted content exists on the site | The code | Documented as aspirational |
| 6 | Wave drift animation | `.wave-layer`, `.wave-layer-2`, `wave-drift`, `wave-drift-slow` exist in CSS; no element uses them. The waves are static SVG | The code | Documented as dead CSS |
| 7 | `<main>` used semantically (older docs) | No page contains a `<main>` element | The code | Corrected; adding `<main>` listed as debt |
| 8 | Mobile-first CSS with `min-width` breakpoints | Zero `min-width` queries. Two `max-width` queries. Desktop-first | The code | Both recorded in DESIGN.md. Intent kept, reality stated |

### Implemented features that appear in no documentation

| # | Feature | Where | Status |
|---|---------|-------|--------|
| 9 | `bmf_sound` localStorage key | `js/main.js` | Now documented in the localStorage table and the Security section, which previously said the site stores exactly two keys |
| 10 | Map state click toggles `.selected` | `initMap()` | Now documented, along with the fact that `.selected` has no CSS rule so the click does nothing visible |
| 11 | Massachusetts is two paths sharing one `data-state` | `map.html` | Now documented in Data Models |
| 12 | Sidebar `#state-detail` panel and its inline script | `map.html` | Was documented only as debt. Now documented as a data flow as well |
| 13 | Six state detail cards below the map | `map.html` | Now listed in the feature table |
| 14 | Escape key closes the modal from anywhere on `product.html` | `initBuyModal()` | Now documented |
| 15 | Reduced motion support | `styles.css` section 21 | Was in DESIGN.md only. Now also a shipped feature row |

### Instructions, commands, paths, or names that were wrong or stale

| # | Item | Correction |
|---|------|-----------|
| 16 | README and old PRD listed `assets/` in the folder structure as though it exists | It does not exist and never has. Now stated explicitly wherever the structure appears |
| 17 | README instructed `python3 -m http.server` | `python3` is not on PATH on the Windows maintenance machine; `python` is. Runbook now uses `python` |
| 18 | README and PRD offered `npx serve .` as an equivalent option | Node.js is not installed on the maintenance machine. Still listed, now marked as unavailable there |
| 19 | Old PRD's shared `<head>` block showed `og:type` and `twitter:card` on all pages | Only `index.html` has them. A per-page coverage table now records the truth |
| 20 | JS described as "ES6+" | The file uses `var`, no arrow functions, no template literals, no `let` or `const`. It is ES5-compatible syntax. Corrected in the tech stack table |
| 21 | Old PRD's init block omitted `initSoundToggle()` | The real init block calls it. Corrected |
| 22 | "External HTTP requests on load: 2 (Google Fonts preconnect + stylesheet)" | A preconnect is not a request for a resource, and the stylesheet pulls further woff2 files. Restated as "two external hosts contacted" |
| 23 | `docs/README.md` referenced in the v2.2.0 patch note | No such file exists; the README has always been at the root. The historical entry is left as written, per the rule on not rewriting history |

### Version numbers, dependency lists, or structure diagrams that no longer match

| # | Item | Correction |
|---|------|-----------|
| 24 | PRD version 3.0 predates several changes | Bumped to 4.0 for this audit |
| 25 | Folder structure diagrams omitted the leftover empty `pages/` directory | Now shown, with a note that git does not track it |
| 26 | `main.js` described as "~230 lines" | 231 lines, 7.3 KB. Now exact |
| 27 | `styles.css` described as "~900 lines" | 895 lines, 25.6 KB. Now exact |
| 28 | Footer copyright reads 2024 on all five pages | The repository's first commit is dated 2026-06-09 and all patch notes are dated 2026. Unresolved: see open question 3 |

### Contradictions between two documents

| # | Contradiction | Resolution |
|---|--------------|-----------|
| 29 | DESIGN.md stated `0.02em` letter spacing on section labels in its typography table and `0.1em` in its component pattern, in the same document | Code says `0.1em`. Table corrected |
| 30 | DESIGN.md described the index hero as a salmon gradient; the stylesheet uses an off-white to blue gradient | Code trusted. Corrected, with a note on where the salmon reading probably came from |
| 31 | The old PRD stated "README.md is for developers... nothing else"; this audit's brief specifies a README written for a general reader with no commands | Resolved in favor of the general-reader README, because every developer-facing item it carried now lives in this document's Runbook and Technical Requirements sections, so nothing was lost. The prior rule is recorded here rather than deleted, and the Documentation Process section below now states the new rule |
| 32 | `index.html` links `faq.html#legal` labelled "Legal (Probably)"; `faq.html`'s own footer labels `#legal` as "Can I Not Swim?" | The id sits on the swim question. Both links are internally consistent with the markup and inconsistent with each other's intent. Listed as a bug for v2.6.0; the fix is to move the id and give the swim question its own |

---

## Risks and Open Questions

### What was not fully understood in this audit

- **The SVG path data was not verified visually.** Every `d` attribute on the New England
  map, the hero boat, the eject scene, and the four sticky note recreations was read as
  text, not rendered and compared against a reference. The audit can confirm the paths
  exist, carry the right attributes, and are wired to the right handlers. It cannot
  confirm that Rhode Island is the right shape.
- **No browser was driven.** Nothing in this audit was verified by watching it run. Every
  behavioral claim is derived from reading the source. The eject arc, the splash timing,
  the tooltip position, and the responsive breakpoints are all described from code.
- **The live site was fetched once** to confirm it resolves and serves the expected
  title. Its rendering was not inspected.
- **`img/boat.jpeg` was not opened.** It is a 4.25 MB JPEG that nothing references. Its
  contents, and therefore whether it is the original sticky note photograph or something
  else entirely, are unknown. This matters: if it is the business plan photo, the
  "missing asset" problem may be solvable by moving one file.

### Fragile areas

- **The five-way duplicated nav and footer.** Any change to navigation must be made
  identically in five files, with only the `aria-current` attribute differing. This is
  the single most likely place for a silent inconsistency, and nothing checks it.
- **Card order carries visual meaning.** `.feature-card`, `.pricing-card`, and
  `.pitch-slide` all use `nth-child` for both color and rotation. Inserting or reordering
  a card silently restyles everything after it.
- **The eject animation is a three-part composition tuned by hand.** The 1.5s arc in CSS
  and the 800ms splash delay in JavaScript are matched to each other. Changing one
  without the other breaks the illusion, and nothing connects them in code.
- **`map.html` has two independent listeners on the same elements**, one in `main.js` and
  one inline. Changing the data attributes means updating both.
- **No tests exist anywhere.** Not one file in the project is covered by any automated
  check. There is no linter, no formatter, and no CI. Every regression is found by a
  person looking at the site, or not at all.
- **No TODO, FIXME, or HACK markers exist** in the codebase. This is not evidence that
  there are no shortcuts; the shortcuts are simply unmarked. The Known Technical Debt
  table is the real list.

### Dangerous to change without more context

| Change | What breaks |
|--------|-------------|
| Renaming or moving any root `.html` file | Every shared link to it, permanently. GitHub Pages cannot redirect. See the Deprecation and Removal section |
| Renaming a fragment id (`#sharks`, `#eject-demo`, `#ask`) | Cross-page links from other pages, silently. Nothing errors; the link just lands at the top of the page |
| Moving a page into a subdirectory | Every asset reference on that page. All paths are root-relative with no prefix |
| Adding an ES module or `type="module"` script | Local `file://` editing, which the whole no-build workflow depends on |
| Changing `--nav-height` | The hero's `min-height: calc(100vh - var(--nav-height))` and the mobile dropdown's `top` offset, which both depend on it |
| Editing `styles.css` section numbering | Nothing functionally, but the numbering is the file's only navigation aid |
| Deleting `initSoundToggle()` alone | Nothing, but leaving `playSound('splash')` behind keeps a dead call in the hot path. Remove them together |

### Work in progress

- **Working tree at the start of this audit:** clean. No uncommitted changes, no
  untracked files, no stashes.
- **Branches:** `main` only, local and remote in sync. No unmerged branches anywhere.
- **Half-finished features:** the sound system (removed from the UI, still present in
  code) and the wave layer animation (CSS written, markup never built) are the two clear
  cases. Both are documented above.
- **Stubbed functions:** none. Every function has a body; two of them just cannot run.

### Open Questions

Numbered so they can be answered by reference. When one is answered, fold the answer into
the relevant section and mark it answered here rather than deleting it.

1. **Should the dead sound system be deleted or completed?** Deleting is roughly 20 lines
   across two files and closes the discrepancy. Completing it means rebuilding the toggle
   UI removed in v2.3.0, which was presumably removed for a reason this audit does not
   know. What was that reason?
2. **What is `img/boat.jpeg`?** If it is the original four-sticky-note photograph, it
   solves the missing-asset problem and belongs in `assets/images/`. If it is an
   unrelated reference image, it is 4.25 MB of repository weight serving nothing.
3. **Should the footer copyright year be 2024 or 2026?** All five footers say 2024. The
   repository's history begins in 2026. Is 2024 a deliberate joke about the company
   predating its own website, or a leftover?
4. **Was the `.selected` class on map states meant to have a visual style?** The click
   handler exists and toggles it; no CSS matches it. Was a selected-state design planned?
5. **Was `#legal` deliberately placed on the "can't swim" question?** It reads as a
   mistake, but the FAQ's own footer links to it under "Can I Not Swim?", so the markup is
   at least internally consistent. Which page's intent is correct?
6. **Should the eject arc animation respect `prefers-reduced-motion`?** It is
   user-triggered, so an argument exists for exempting it, but it is also the largest
   motion on the site.
7. **Is there a second sticky note?** Tenet 2 makes the Series A page (v3.0.0) blocked on
   one. Does it exist?
8. **Does the project want `<main>` landmarks added?** It is a small, safe accessibility
   win across five files, but it touches every page.

---

## Working Practice

Concrete instructions for anyone, human or model, doing future work on this project.

### Always check before editing

1. **`git status` is clean** before you start, so you can tell your changes from
   somebody else's.
2. **Read the Documentation Versus Reality table above** for the file you are about to
   touch. Several things in this project are already known to be broken, and
   rediscovering them wastes a session.
3. **If you are changing the nav, the footer, or anything in `<head>`, count to five.**
   That change belongs in five files. Grep for the string you are changing before you
   assume you have found all of it.
4. **If you are adding a card to a group**, check what `nth-child` rules apply to that
   group in `styles.css` first.
5. **If you are touching text of any kind**, you are subject to the Writing Style
   section. Run the three searches it lists before committing.

### Where to look first

| Kind of work | Open this first |
|-------------|----------------|
| Changing a color, font, size, spacing, or shadow | `docs/DESIGN.md`, then the `:root` block in `css/styles.css` |
| Adding or restyling a component | `docs/DESIGN.md` Component Patterns, then the relevant numbered section of `css/styles.css` |
| Changing a behavior or adding an interaction | The Technical Requirements Function Reference in this document, then `js/main.js` |
| Changing page copy | The page's `.html` file directly. Check the Product Tenets first if the copy affects how real the site seems |
| Adding a page | Deprecation and Removal (page names are permanent addresses), then copy the shell from an existing page |
| Removing or renaming anything | Deprecation and Removal in this document, without exception |
| Running or deploying the site | The Runbook in this document |
| Understanding why something is the way it is | Product Tenets, then Risks and Open Questions |
| Wondering whether a doc can be trusted | Documentation Versus Reality in this document |
| Recording what you did | `docs/PATCHNOTES.md` |

### Never do these

| Never | Because |
|-------|---------|
| Add a JavaScript library, a CSS framework, or an npm dependency | Tenet 4. The zero-dependency posture is the reason this site will still work untouched in ten years, and it is the entire content of the Dependency Policy |
| Add a build step, a bundler, or a static site generator | The constraint is explicit, and the deploy model (`git push` is the deploy) depends on the source being the artifact |
| Create a second stylesheet or a second script file | Tenet 7. Two files means hunting across both to find where a rule came from |
| Rename or delete a root `.html` file or a fragment id | Those are permanent public addresses and GitHub Pages cannot redirect. The only shim available is a stub file, which is worse than not creating the problem |
| Add `outline: none` anywhere | It removes the only focus indicator the site has. There is no custom focus style to replace it |
| Straighten the rotations or even out the border radii | The hand-drawn asymmetry is the entire visual identity. It looks like a bug and is not |
| Add analytics, error tracking, or any third-party script | Zero-tracking is a stated product constraint and a documented promise in the FAQ. Changing it requires updating this document, the Security section, and the public FAQ answer first |
| Use an em dash in any text you write | The Writing Style rule, which applies to docs, UI copy, and comments |
| Silently "fix" a documented discrepancy | The discrepancies are recorded on purpose. Resolving one means deciding which side was right and recording that decision, not quietly picking one |
| Drive Chrome for any automated browser check | It is the owner's live browser. Use the Edge binary path recorded in the Runbook |

### How to verify a change

There is no test suite. Verification is manual and this is the entire procedure.

```bash
# 1. Serve the site locally (python3 is not on PATH on Windows; use python)
python -m http.server 8080
# open http://localhost:8080
```

2. Walk the deploy verification checklist in the Runbook. All nine items, not just the
   one you changed, because the shared nav, footer, and single script file mean a change
   to one page can affect five.
3. Resize the window past 900px and past 640px and confirm both breakpoints still behave.
4. Open the browser console. It must be empty. A clean console is the project's only
   automated-feeling signal, which is why nothing logs.
5. Open the network panel. The only 404s permitted are the four known `assets/` paths.
6. Run the three em dash searches from the Writing Style section. All three must return
   nothing.

### What to update afterwards

1. **`docs/PATCHNOTES.md`, always.** A new entry at the top, next semantic version, dated
   `YYYY-MM-DD`, using the Added, Changed, Fixed, Removed sections, one change per line,
   past tense.
2. **`docs/DESIGN.md`** if you changed a token, a component pattern, a breakpoint, or an
   animation.
3. **This document** if you changed behavior (Function Reference), structure (Folder
   Structure), a public address (Public Surface), or resolved a row in Documentation
   Versus Reality. Resolved rows stay, annotated.
4. **The Milestone Table** if the change completes or creates a milestone.
5. **`README.md`** only if what the site *offers a visitor* changed. Not for technical
   changes; the README carries no technical content by design.

### Commit and deploy

Commit directly to `main` with either a version-prefixed subject for a released change
(`v2.6.0 - Fix FAQ accessibility and remove dead sound code`) or a plain descriptive
subject for a small one. No body, no Conventional Commits prefix. `git push origin main`
is the deploy; wait a minute and re-check the live URL.

---

## Press Release

Written as if the product has just launched publicly.

**Headline**

Boaty McBoatface Ventures launches the world's first website for getting ejected off a
boat in a canvas exo-skeleton.

**Subheadline**

The New England tourism company built its entire product, pricing, and investor pitch
from four sticky notes drawn in a single week, and has published all of it.

**Dateline**

BOSTON, MA, 2026-06-09

**Opening**

Boaty McBoatface Ventures today launched its official website at
azqato.github.io/mcboat, publishing the complete plan for a tourism business that ejects
paying customers off the back of a boat while they wear a canvas frame designed to
displace water. The site presents the company's flagship product in three purchase
tiers, an interactive map of its six-state New England service area with shark risk
ratings for each, a seven-slide pitch deck asking investors for two million dollars, and
a twelve-question FAQ. The entire business was designed in one week and delivered as a
photograph of four sticky notes sent by text message. The company is seeking funding, a
boat, and a canvas exo-skeleton, in that order.

**The problem**

People want to do something memorable on the water and end up doing the same three
things. Whale watching, a harbor cruise, a rented kayak. Every one of them ends with the
customer in exactly the same position they started in: on the boat, dry, and not
noticeably changed. Nobody currently offers to remove them from the boat at speed. The
number of people ejected off the aft deck of a New England vessel in a canvas frame last
year was zero.

**The solution**

Boaty McBoatface Ventures ejects you off the boat. You board the vessel, you are fitted
with the Canvas Exo-Skeleton, the boat travels to a coastal location, and you are
launched off the back of it. The exo-skeleton displaces water, so you float. A crew
member retrieves you, within twenty minutes at the entry tier and immediately at the top
tier. You keep the certificate. You do not keep the exo-skeleton.

The product comes in three tiers: Bronze at $299, Silver at $499, which includes a splash
photo and is the most popular, and Gold at $999, which adds unlimited same-day ejections
and a debrief with the founder. All tiers include a life jacket.

**Customer quote**

"I have lived in Massachusetts my whole life and I have been on a lot of boats," said
Dana Whitcomb, a school administrator from Marblehead. "I have never once been thrown off
one. I did not know that was something I wanted until I saw the website, and now it is
the only thing on my list. I have questions about the sharks. The map is very clear about
the sharks."

**Call to action**

Visit azqato.github.io/mcboat to see the Canvas Exo-Skeleton, check the shark risk in
your state, and read the investor pitch. Nothing can be purchased. The Buy Now button is
part of the experience.

**Boilerplate**

Boaty McBoatface Ventures is a New England company built on a business plan drawn on four
sticky notes over the course of one week. It has no boat, no manufacturing capability, no
legal entity, and no regulatory approval. It has a website, a map, a pitch deck, and a
plan. The company is a parody, and nobody should attempt to build a canvas exo-skeleton
or get ejected off a boat.

---

## Frequently Asked Questions

### External FAQ

**1. What is Boaty McBoatface Ventures?**

A satirical website for a fictional New England boat ejection tourism company. The
premise: you board a boat named Boaty McBoatface, you are fitted with a canvas frame that
displaces water, and you are ejected off the aft deck. Then you float. Probably.

**2. Is this real?**

The website is real. The sticky notes are real. The company is not. Nothing can be
purchased, no service exists, and no boat has been acquired. The sharks are entirely
real.

**3. Who is it for?**

Anyone sent the link who has two minutes. It reads on a phone in about ninety seconds and
in full in about five.

**4. How do I use it, step by step?**

Open azqato.github.io/mcboat. Read the hero and the four sticky notes that make up the
business plan. Scroll to the EJECT button and press it, more than once. Follow any of the
three cards to the product page, the map, or the pitch deck. Hover a state on the map to
see its shark rating. Open a few FAQ answers. That is the whole site.

**5. What does it cost?**

Nothing. There is no price, no tier, no subscription, no account, and no paywall. The
$299, $499, and $999 tiers shown on the product page are part of the joke; pressing Buy
Now opens a message explaining that no product exists.

**6. When did it launch and where is it available?**

It launched on 2026-06-09 and is available anywhere with a web browser and an internet
connection. It is in English only and there are no plans to translate it.

**7. What are the technical requirements?**

A browser from roughly 2021 or later: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+.
No app, no plugin, no account, and no minimum screen size. It works on phones. With
JavaScript disabled every page is still readable, but nothing interactive works,
including the mobile menu.

**8. What data do you collect?**

None. No analytics, no cookies, no tracking pixels, no fingerprinting, no forms, and no
account. The only thing stored is a count of how many times you have pressed the EJECT
button today, which lives in your own browser's localStorage and never leaves your
device. Clearing site data erases it. Nobody, including the site's owners, can see it.

**9. Who receives any of my information?**

Two parties, both only in the way any website involves them: GitHub, which hosts the
files and therefore sees your IP address and browser, and Google Fonts, which serves the
two typefaces and sees the same. Nothing else is contacted.

**10. What makes it different from other parody sites?**

Most joke sites are one page with one gag. This one commits: real pricing tiers with
genuinely differentiated features, a seven-slide investor deck with a use-of-funds
breakdown, a hand-drawn interactive map of six states, and twelve FAQ answers written
straight. The humor comes from how seriously the presentation takes an absurd concept.

**11. Why is the boat named Boaty McBoatface?**

In 2016 the British Natural Environment Research Council ran a public vote to name a new
polar research vessel. The public overwhelmingly chose "Boaty McBoatface". The council
named the ship the RRS Sir David Attenborough and gave the name Boaty McBoatface to a
small submarine instead. That happened. It was also the name on the sticky note, which
the company considers binding.

**12. Why New England?**

It was the only region on the sticky notes. The yellow note has a hand-drawn coastline
that was later identified as New England. Under the project's own rules, the notes are
the source document and cannot be contradicted.

**13. Why is Vermont on the map if it is landlocked?**

Because it was on the sticky note. Its shark risk is rated zero, which is accurate.

**14. Are the shark risk levels real?**

No. They are comedic. New England shark populations genuinely have been increasing,
particularly around Maine and Cape Cod, and the Cape Cod White Shark Conservancy is a
real organization, but nothing on the map should be used to decide whether to enter the
water.

**15. Can I actually buy a ticket or an exo-skeleton?**

No. Pressing Buy Now opens a message saying the company has no product, no manufacturing
capability, and no legal entity. There is no checkout, no payment processor, and no way
to enter card details anywhere on the site.

**16. What about the "Send $2M" button?**

It links to the site owner's own support page and is captioned with a request not to send
money. No investment is being solicited.

**17. What does it not do?**

It does not sell anything, collect anything, remember you between visits beyond a daily
button counter, work offline, have an account system, send email, or exist in any
language other than English. It has no dark mode and will not be getting one.

**18. Does it work on a phone?**

Yes. Below 640px the navigation collapses into a menu button, grids stack to one column,
and headings scale down. The map's hover tooltips are unavailable on touch, where the
sidebar panel serves the same information.

**19. What if I have asked my device for reduced motion?**

The bobbing boat, the drifting map route, and all transitions stop. The eject animation
currently still plays; whether it should is an open question recorded in the project
documentation.

**20. How do I get help, or report something broken?**

Open an issue on github.com/Azqato/mcboat. There is no support channel, no email address,
and no contact form on the site. Response is best-effort by two people.

**21. Is it accessible?**

It targets WCAG 2.1 AA. Body text contrast is far above the requirement, all interactive
elements are keyboard operable, illustrations are labelled, and reduced motion is
respected. Known gaps are documented publicly rather than hidden: the FAQ accordion does
not announce its open state correctly to screen readers, the modal does not trap focus,
and the map tooltips have no touch equivalent.

**22. Can I reuse the code?**

The repository is public and the source is readable. No license file has been added,
which technically means default copyright applies. If that matters to you, ask.

**23. Will it keep working?**

Almost certainly. It has no dependencies to expire, no build to break, no server to
maintain, and no certificate to renew. It is five HTML files, one stylesheet, and one
script.

**24. Is anything else planned?**

A Series A pitch page, blocked on a second sticky note from the founder, which is a
genuine and unresolved constraint. Otherwise: accessibility fixes and the creation of a
few referenced-but-missing images.

**25. Should I get ejected off a boat?**

No.

### Internal Stakeholder FAQ

**1. What is this actually for?**

It makes a joke transmissible. The four-sticky-note business plan is funny in person and
does not survive being described. One URL delivers the whole premise to somebody with no
context.

**2. Who is the real audience?**

Tigershark and Azqato's social circles, first and by a wide margin. Developers who find
it on GitHub, second. Everyone else is a bonus.

**3. What is the ROI rationale for building a full multi-page site instead of one page?**

The joke scales with commitment. A single page reads as a meme and is forgotten. A product
page with differentiated pricing, a seven-slide deck, an interactive map, and twelve FAQ
answers reads as a company, and the gap between that presentation and the concept is the
entire payload. The cost side of that ratio is unusually favorable: zero dependencies,
zero hosting cost, zero maintenance burden, and no expiry. The build is a one-time cost
and the asset does not decay.

**4. What does success look like?**

Someone laughs. The site loads. No 404s. Nobody tries to wire $2M. The north star metric,
eject clicks per visit, is the formal version, and it is deliberately unmeasurable
because measuring it would require the tracking the site promises not to do.

**5. Why is a metric we cannot measure still the north star?**

Because it names the right thing. A metric's first job is to say what matters, and what
matters here is whether the interaction landed. Swapping in a measurable proxy like page
views would make the dashboard better and the goal worse.

**6. What is the risk of someone thinking this is real?**

Low, and mitigated in four places: a satire disclaimer in every page footer, an FAQ
answer titled "Is this a real company?", a buy modal that states plainly no product
exists, and a disclaimer under the $2M button. The tenet is explicit that satire needs a
disclaimer.

**7. Is there legal risk?**

Minimal. No data is collected, no money is transacted, no claims are made about real
services, the shark information is clearly comedic, and the name references a
well-publicized public event rather than a trademark being passed off. There is no
license file on the repository, which is the one loose end.

**8. What assumptions must hold for this to work?**

Three: that the reader recognizes the startup pitch format being parodied, that they find
the concept obviously absurd rather than merely confusing, and that the Boaty McBoatface
reference is either recognized or funny on its own. All three are safe for the primary
audience and less safe for a stranger arriving from search, which is why the disclaimers
matter.

**9. What technical debt are we carrying?**

Two dead features left in the code (the sound system and a broken easter egg), one real
accessibility defect (the FAQ accordion never updates `aria-expanded`), duplicated map
hover logic, several orphaned CSS rules, a mislabelled anchor, no canonical URLs, and
inconsistent social meta tags. All of it is enumerated in the Known Technical Debt table
and scheduled for v2.6.0.

**10. Why GitHub Pages rather than a real host?**

Free, instant, zero-config, zero-maintenance, and HTTPS by default. The site is entirely
static. The tradeoff accepted is that GitHub Pages cannot redirect, which is why page
names are treated as permanent addresses.

**11. What is the roadmap direction?**

Inward, not outward. Phase 2 is documentation and correctness, not features. The only
planned expansion, a Series A page, is blocked by the project's own rule that the sticky
notes are the source document, and there is not a second sticky note yet. That is a real
constraint, honored deliberately.

**12. What would make us abandon a tenet?**

Only an explicit, recorded decision. The tenets exist to settle arguments in advance, and
tenet 4 in particular (no frameworks) is the reason the maintenance burden is zero. A
proposal to add a dependency is a proposal to change the project's operating model, and it
belongs in this document before it belongs in the code.

---

## Documentation Process

*Updated 2026-08-25. Describes the four-document system this project uses and how it
should be maintained going forward.*

### The Four-Document System

Exactly four documentation files, no more.

| File | Location | Purpose | Audience |
|------|----------|---------|----------|
| `README.md` | Project root only, never inside `/docs` | What the site is, what it offers, who it is for, and its current status. Plain language, no commands, no versions, no dependency lists | A general reader deciding whether to care |
| `docs/PRD.md` | `/docs/` only | Everything else: product definition, tenets, roadmap, metrics, runbook, technical requirements, conventions, writing style, browser testing, security, removal policy, the documentation-versus-reality record, risks, working practice, press release, and FAQs | Developers and models doing work on the project |
| `docs/DESIGN.md` | `/docs/` only | The visual system: color, typography, spacing, breakpoints, component patterns, accessibility, motion | Anyone changing how it looks |
| `docs/PATCHNOTES.md` | `/docs/` only | Dated changelog, semantic versioning | Anyone asking what changed and when |

### The README rule changed in v2.5.0

Before this audit, the project's stated rule was that `README.md` was for developers and
carried install, build, and deploy instructions. That rule is superseded: the README is
now written for a general reader and carries no commands, ports, versions, or
dependencies.

The previous rule is recorded here rather than deleted, because it was a deliberate
decision and a reader of older commits will see its effects. Nothing was lost in the
change: every developer-facing item the old README carried now lives in this document's
Runbook and Technical Requirements sections, in more detail than it had before. The
change is recorded in Documentation Versus Reality row 31 and in the v2.5.0 patch note.

### Why this structure

More than four documents fragment knowledge without adding clarity. This project is a
static parody site maintained by two people. A document nobody reads because it is buried
in a folder with nine siblings helps nobody, which is what the v2.4.0 consolidation
concluded and this audit confirms.

The PRD is the "everything else" bin by design. For a project this size, the product
reference, technical reference, runbook, and security posture are not separate concerns;
they are different sections of the same answer to "how does this work and why".

### How to maintain PRD.md

Completeness beats brevity here. A section that restates context so it can stand alone is
doing its job, because readers arrive by link and should not have to assemble an answer
from three other sections. That is not licence for filler: more facts, not more words
around the same facts.

- **New feature?** Update the Feature List. If it changes architecture, update Technical
  Requirements. If it adds a public address, update Public Surface.
- **New metric or success criterion?** Metrics section.
- **Public-facing answer changed?** External FAQ.
- **Planned work?** Milestone Table, and mark milestones complete when they ship.
- **Security posture changed?** Security section, and check whether the External FAQ's
  data-collection answers are still true.
- **New tenet?** Product Tenets, same format: bold title, explanation, italic applied
  example. Keep the list at seven or fewer; more than seven dilutes them.
- **Found a code and doc mismatch?** Documentation Versus Reality, as a new numbered row.
  Do not silently correct one side.
- **Answered an open question?** Fold the answer into the relevant section and mark the
  question answered in Risks and Open Questions. Do not delete it.

### How to maintain PATCHNOTES.md

1. New entry at the top of the file
2. Next semantic version number, MAJOR.MINOR.PATCH
3. Date as `YYYY-MM-DD`
4. Sections in this order where they apply: Added, Changed, Fixed, Removed
5. One change per line item, written in past tense
6. Do not group unrelated changes into one version. Two unrelated changes are two entries
7. Never edit a past entry to reflect a later state. Historical records are not rewritten

### How to maintain DESIGN.md

DESIGN.md records intent as well as implementation. When a design decision changes,
update the relevant section, confirm the custom properties in `styles.css` still match
what the document claims, and document any new component pattern with its CSS. Where
intent and code disagree, keep both and mark the discrepancy rather than picking one
silently.

### What never goes in README.md

- Install steps, commands, ports, environment variables, or build instructions
- Version numbers or dependency lists
- Detailed technical documentation, which belongs in this document
- Design decisions, which belong in DESIGN.md
- Changelog entries, which belong in PATCHNOTES.md
- Marketing language of any kind

The README is the one document where brevity wins a tie. Everything it leaves out is one
link away.

### Consolidation history

On 2026-06-13, seven documents were merged into sections of this PRD and deleted:
`TRD.md`, `METRICS.md`, `PRFAQ.md`, `ROADMAP.md`, `RUNBOOK.md`, `SECURITY.md`, and
`TENETS.md`. The mapping from each deleted file to its destination section is recorded in
the Retired Items table above.

On 2026-08-25, this document was audited against the full codebase, restructured, and
expanded with the sections it previously lacked: Conventions, Writing Style, Browser
Testing, Deprecation and Removal, Documentation Versus Reality, Risks and Open Questions,
and Working Practice. No document was deleted in that audit.

---

*Document written from the comprehensive business plan delivered by Tigershark on four
Post-it notes. Azqato (CTO) built the website.*
