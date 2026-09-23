# Ticket: Social card — ship a PNG og:image

**Status:** closed ✓ 2026-09-23 · **Blocked by:** — · **Frontier order:** 1

## Decision / deliverable

Rasterize the route-W social card to a real PNG (1200×630, retina 2x acceptable) with brand fonts actually rendered (Clash Display / JetBrains Mono via an HTML wrapper + headless Edge), save as `static/img/social-card.png`, switch `themeConfig.image` to it, keep the SVG as vector source.

## Done when

PNG loads live with `Content-Type: image/png` at `https://mohmaedeslam00116.github.io/waypower-docs/img/social-card.png`; built homepage `<meta property="og:image">` points at the PNG; build green, deployed.

## Answer

Rendered `scripts/social-card.html` (the SVG markup upgraded to real brand fonts — Clash Display 600 for the wordmark/tagline, JetBrains Mono for labels, via Fontshare + Google Fonts) in headless Edge through `scripts/render-social-card.mjs` (puppeteer-core, `npm run social-card` reproduces). Output: `static/img/social-card.png`, 2400×1260 (2x), 124 KB. `themeConfig.image` switched to the PNG; SVG kept as vector source.

**Evidence:** build [SUCCESS]; `og:image` = `https://mohmaedeslam00116.github.io/waypower-docs/img/social-card.png`; live HEAD → HTTP 200, `image/png`, 123995 bytes. Commit `611bbc5`.
