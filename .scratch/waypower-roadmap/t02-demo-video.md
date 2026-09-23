# Ticket: Demo asset — scripted pipeline-run video

**Status:** done (closed 2026-09-23) · **Blocked by:** — · **Frontier order:** 2

## Decision / deliverable

A 60–90s scripted demo (MP4 + GIF) of a full waypower session: brief → design-interview rounds → spec approval → tracer-plan tickets → RED→GREEN → completion-gate PASS → handoff. Rendered programmatically (Remotion in the docs repo or a scratch project) from the hero-transcript script — no screen recording, fully reproducible. Embedded in main README and considered for the homepage.

## Done when

MP4 plays in README on github.com (or linked asset), GIF preview committed, evidence links recorded; brand tokens respected (panel dark, mono, amber rationed).

## Answer

Remotion project at `D:\ai\waypower-docs\demo\` (commit `4b5c6cf`, branch `main`) renders two comps from the hero-transcript arc: **Demo** — 75.0s, 1920×1080@30, 1.7MB MP4 (8 scenes: intro → brief → design-interview → tracer-plan chips → seam-driven-tdd RED→GREEN → completion-gate PASS stamp → finish-handoff → outro with install command); **DemoGif** — 16s, 960×540@15, 614KB GIF (RED→GREEN→PASS highlight). Fonts bundled locally (Clash Display via Fontshare woff2, JetBrains Mono via Fontsource woff2) so renders are hermetic; Chrome used as `--browser-executable` (no headless-shell download).

**Completion-gate evidence:** both comps rendered 100% of frames (240/240, 2250/2250); 5 extracted frames visually verified on-brand (instrument panel, mono, amber rationed, PASS stamp); pushed — waypower `859bccf` (README "See it in action" + `assets/demo.gif`/`demo.mp4`), waypower-docs `4b5c6cf` (demo source); live-verified raw URLs: GIF 200 `image/gif` 614220B, MP4 200 1783300B, source tree 200. Reproduce: `cd demo && npm i && npx remotion render Demo out/demo.mp4`.

**Env note (durable):** C: hit 0 bytes free mid-install (ENOSPC) — deleted `C:\Users\Dell\AppData\Local\npm-cache` (freed ~10GB) and moved npm cache to `D:\npm-cache` via user config.
