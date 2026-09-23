# Ticket: Release v0.2.0 — changelog + release post

**Status:** closed · **Blocked by:** t05 (13/13), t06 (CI green) · **Frontier order:** 6

## Decision / deliverable

Cut v0.2.0 — silent release, no announcement: CHANGELOG entry, git tag + GitHub release via `gh`, skills.sh re-publish if needed. No release blog post (user decision 2026-09-23: no launch/announcement activity).

## Done when

Tag and release live on GitHub; changelog committed; version references in docs/README consistent.

## Answer

Silent release cut, no announcement:

- CHANGELOG `## [0.2.0] - 2026-09-23` (Added: CI eval gate + install matrix, badge, templates, demo video; Changed: 13/13 discrimination gate, honest harness-compat claims) + retroactive `## [0.1.0]` kept as-is.
- `.claude-plugin/plugin.json` version bumped 0.1.0 → 0.2.0; no other version references exist in README/docs (grep-verified).
- Tags: `v0.1.0` retroactively on `e56c27a`, `v0.2.0` on `88adc6a`, both pushed.
- GitHub release live: https://github.com/mohmaedeslam00116/waypower/releases/tag/v0.2.0
- skills.sh: no re-publish action needed — the listing indexes the GitHub repo directly and reflects master automatically.
- Master CI green on `986a997` (run 35918462312); the release commit `88adc6a` itself didn't trigger a run because the workflow's path filter covers only `skills/**`, `scripts/**`, and workflows — CHANGELOG/plugin.json changes are out of scope by design.
