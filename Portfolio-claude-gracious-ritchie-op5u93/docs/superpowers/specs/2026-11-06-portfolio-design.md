# Portfolio redesign — design spec

**Goal:** Portfolio for Vincent Brian Somido in the editorial, numbered-section style of bryllim.com, keeping all real content from the current Netlify site.

**Build:** plain HTML/CSS/JS, no build step, static (Netlify). Files: `index.html`, `css/style.css`, `js/main.js`, `assets/`.

**Sections:** sidebar nav → hero + stats → 01 projects (carousel + detail modal) → 02 experience (+ stack chips) → 03 skills (cards) → 04 about → 05 contact (copy-email card + Netlify Forms form).

**Look (revised to match bryllim.com closely):** light default + dark mode, fixed left sidebar (nav, quick menu, availability, theme switch, email), monospace Geist Mono headings, halftone portrait slot beside the intro, inline pill chips in the intro sentence, bordered stats grid, fanned project-card carousel, list-row experience, bordered card grids, dotted corner texture, gray mono `01 — section` headers.

**Behavior:** ⌘K/Ctrl+K command palette, scroll reveal (respects prefers-reduced-motion), responsive collapsing nav.

**Out of scope:** blog, shop, sounds, typing test, GitHub graph, hackathons/certifications (no content).

**Verification:** Playwright screenshots at desktop/mobile in both themes, no console errors.
