# Portfolio — glassmorphism UI spec

**Date:** 2026-11-21
**Goal:** Restyle the portfolio shell in glassmorphism while keeping the editorial, numbered-section structure and all behavior from `2026-11-06-portfolio-design.md`.

**Build:** unchanged — plain HTML/CSS/JS, no build step, static (Netlify). Only `css/style.css` was rewritten; `index.html` and `js/main.js` are untouched.

## Look

- **Ambient backdrop:** two fixed aurora layers (`body::before` / `body::after`) of soft radial gradients — indigo, pink, cyan, amber, violet — that drift and breathe slowly. This is what the glass refracts; it stays pinned to the viewport at every scroll position.
- **Frosted surfaces:** every panel uses `backdrop-filter: saturate(180%) blur(18px)` with a translucent tint, a white edge border (`--brd`) and an inner top highlight (`--sheen`) for the bevelled-glass read.
- **Floating sidebar:** detached glass card (`inset 14px`, 24px radius, drop shadow) instead of an edge-to-edge rail; nav rows highlight as glass pills.
- **Panels converted to glass:** stats grid, project cards (center card brighter + `--brd-hi` edge), stack chips, skills cards, about quote block, contact cards, form inputs, buttons, toast, command palette, project modal and the mobile top bar/drawer.
- **Theme-aware tokens:** light = white glass over a pale sky base; dark = white-alpha glass over near-black. All surfaces, borders, sheens, shadows, rings and aurora opacity are CSS custom properties, so one toggle re-skins everything.
- **Aurora opacity:** `--aurora` .60 light / .85 dark, `--aurora-2` .50 / .70 — tuned so muted body text keeps ≥ 4.5:1 contrast over the most saturated blob centres (glass panels lift it further).

## Behavior (unchanged)

⌘K/Ctrl+K palette, carousel, modal, scroll reveal, responsive nav, theme persistence, Netlify form.

## Verification

- Computed-style assertions: sidebar, stats, skills cards, center project card, portrait and modal all report `backdrop-filter` with blur and the expected translucent background.
- Aurora layer reports `position: fixed`, `animation-name: drift`.
- Overflow sweep at 1440/1280/1100/1024/960/900/820/768/600/520/414/390/360/320 px: `scrollWidth === innerWidth` at every width, light and dark.
- Modal and palette open in both themes with correct tokens; no console or page errors.
- Full-site crawl: all 15 HTML pages (portfolio + 14 demo pages) — 0 broken links, 0 broken images, 0 overflow, 0 runtime errors.
- Screenshots reviewed at desktop/mobile in both themes (pixel-sampled to confirm theme, since the image viewer served stale files).
