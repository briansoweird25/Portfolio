# Portfolio redesign — design spec

**Goal:** Portfolio for Vincent Brian Somido in the editorial, numbered-section style of bryllim.com, keeping all real content from the current Netlify site.

**Build:** plain HTML/CSS/JS, no build step, static (Netlify). Files: `index.html`, `css/style.css`, `js/main.js`, `assets/`.

**Sections:** sticky nav (theme toggle, ⌘K hint) → hero + stats → 01 projects (grid + detail modal) → 02 experience (timeline) → 03 skills → 04 about → contact (copy-email card + Netlify Forms form).

**Look:** dark default + light mode, accent `#7c6aff`, Geist / Geist Mono / Source Serif 4, mono section labels, thin borders.

**Behavior:** ⌘K/Ctrl+K command palette, scroll reveal (respects prefers-reduced-motion), responsive collapsing nav.

**Out of scope:** blog, shop, sounds, typing test, GitHub graph, hackathons/certifications (no content).

**Verification:** Playwright screenshots at desktop/mobile in both themes, no console errors.
