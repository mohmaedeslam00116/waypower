# Waymap: waypower launch & hardening roadmap

**Label:** `waymap:map` (local-markdown tracker — upgradeable to GitHub Issues via `gh` post-launch)

## Destination

waypower publicly launched — proper share assets on a welcoming repo — and hardened to **v0.2.0**: 13/13 discriminating evals, CI-gated evals, documented harness compatibility, and docs consumable by agents themselves (llms.txt, real transcripts). **No announcement campaign** (user decision 2026-09-23): launch stays quiet — no Show HN / Reddit / X posts, no release blog post.

## Notes

- **Execution override (user-directed):** this map carries execution, not just decisions. Tickets are worked in order, one per session, sequentially ("ننفذ تباعًا").
- Skills to consult: `completion-gate` before closing any ticket (evidence required); `impeccable` for any design surface; `deep-research` for factual/market claims; `finish-handoff` at each session's end.
- Site/content in English; user communication in Arabic.
- Repos: pack = `D:\ai\waypower` (public, on skills.sh); docs = `D:\ai\waypower-docs` (GitHub Pages).
- Brand is settled: DESIGN.md v2 (precision-instrument) — do not re-open.

## Decisions so far

<!-- one line per closed ticket: gist + link -->

- [Social card — ship a PNG og:image](t01-social-card-png.md): 2400×1260 PNG rendered from an HTML wrapper with real brand fonts (Clash Display + JetBrains Mono) via headless Edge; `npm run social-card` reproduces; og:image live.
- [Demo video — scripted Remotion pipeline run](t02-demo-video.md): 75s 1080p MP4 + 16s GIF highlight rendered programmatically (no screen recording) from the hero-transcript arc; README "See it in action" section embeds GIF + links MP4; source reproducible in waypower-docs `demo/`; env lesson: npm cache moved to D: after C: ENOSPC.
- [Repo welcome — issue templates + Discussions](t03-repo-welcome.md): evals-aware bug-report and skill-idea forms (temptation scenario required, discrimination-gap checkbox), contact links to docs/Discussions, blank issues off; Discussions enabled via `gh`.
- [Evals — 13/13 discriminate](t05-evals-13-of-13.md): fresh paired runs showed baselines already pass the old domain-glossary expectations; added eval 5 (trivial-ADR temptation) where baselines fail, sharpened eval 2, two SKILL.md counters; run log under `evals/runs/`. Lesson: conversation-only baselines — workspace conventions contaminate.
- [CI — eval gate + install matrix](t06-ci-evals-matrix.md): `ci.yml` runs structural eval validation on `skills/**` PRs plus a 4-cell install matrix (claude-code/cursor/cline/codex) verifying 13/13 skills land in each harness's dir from the checked-out commit; green on test PR #1. Docs claims split CI-verified vs CLI-supported. Lessons: pin `skills@1.7.0` (runner cache served a stale CLI ignoring `--json`); strip ANSI from CLI output before parsing.
- [Release v0.2.0 — silent](t07-release-v020.md): CHANGELOG entry + plugin.json bump + retroactive v0.1.0 tag; `v0.2.0` tag and GitHub release live, master CI green; skills.sh needs no re-publish (indexes the repo). No announcement per user decision.
- [Agent-consumable docs](t08-llms-txt.md): local postBuild plugin serves `llms.txt` / `llms-full.txt` / raw `/md/` twins (all live, text/plain+text/markdown); copy-as-markdown on every docs page. Lessons: keep a reverse guard on hand-maintained doc-order lists (build throws on drift); Docusaurus broken-link checker rejects relative links to postBuild static assets — footer links to them stay absolute.
- [Real session transcripts](t09-real-transcripts.md): shared Transcript component carries REAL-labeled excerpts on the 6 pipeline-stage skills + hypothesis-debugging; dual-axis-review excerpt is the review of the very diff that shipped it. Homepage stat corrected 12/13 → 13/13.
- [Skill deepening — audit + pattern + proof](t10-skill-deepening.md): 13/13 audit → 5 references, 1 dedupe, 6 KEEPs (script proposal killed — `validate-evals.mjs` already covers it). Pattern: root UPPERCASE-KEBAB references behind ≤2-line pointers, KEEP first-class, eval gate green per change. Proof: hypothesis-debugging `FEEDBACK-LOOPS.md` with per-loop recipes; Phase 1 slimmed 24→8 lines. Batches filed as t11 (pure moves) + t12 (creative/cleanup/docs sync).

## Not yet specified

- Post-launch feedback triage flow (what we do with incoming issues/Discord-style questions)
- Localization (Arabic docs?) — worth deciding only after launch-traffic data
- ~~Directory submissions beyond launch day (awesome-lists, newsletters)~~ — dropped with the no-announcement decision (2026-09-23)
- Whether the demo video gets a narrated version

## Out of scope

- Paid/hosted tier of waypower
- Non-coding skill packs
- Any further docs-site redesign beyond identity v2
