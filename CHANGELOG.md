# Changelog

All notable changes to waypower are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-09-23

Hardening release — evals now discriminate on all 13 skills, and CI gates
both eval structure and cross-harness installation.

### Added

- **CI workflow** (`.github/workflows/ci.yml`): a structural eval gate on PRs
  touching `skills/**` (`scripts/validate-evals.mjs` — frontmatter validity,
  evals.json shape, required happy/temptation/trigger-check mix), plus a
  4-cell **install matrix** (Claude Code, Cursor, Cline, Codex CLI) that
  installs the checked-out commit via `npx skills add` and verifies all 13
  skills land where each harness reads them (`scripts/verify-install.mjs`).
- CI badge in README; issue templates (evals-aware bug report + skill idea)
  and GitHub Discussions; scripted demo video (75s MP4 + GIF) in README.

### Changed

- `domain-glossary` now discriminates: new eval 5 (trivial-ADR temptation),
  sharpened eval 2, semantics-first + ADR red-flag lines in SKILL.md.
  Release gate met: **13 of 13** skills discriminate cleanly (was 12/13).
- Docs compatibility claims now distinguish the CI-verified harness set from
  harnesses supported by the skills CLI but not in the matrix.

## [0.1.0] - 2026-09-23

Initial release.

### Added

- **9 process skills**, auto-invoked by the orchestrator:
  `using-waypower` (1% rule, priority ladder, SUBAGENT-STOP),
  `design-interview` (Socratic refinement with HARD-GATE),
  `tracer-plan` (vertical-slice planning), `seam-design`,
  `seam-driven-tdd` (Iron Law, verify-RED), `hypothesis-debugging`,
  `dual-axis-review`, `completion-gate` (evidence-based done),
  `domain-glossary`.
- **4 tool skills**, manually invoked: `waymap` (decision maps for large,
  foggy efforts),
  `finish-handoff`, `authoring-skills` (RED-GREEN-REFACTOR),
  `deep-research` (primary sources, citations, durable findings).
- A paired baseline-vs-with-skill **eval suite per skill**
  (`evals/evals.json`, 4 evals each) plus full temptation-run logs in
  `docs/evals/`. Release gate: 12 of 13 skills discriminate cleanly.
- Optional session-start hook for hard enforcement:
  `skills/using-waypower/references/session-start-hook.md`.
- Claude Code plugin manifest (`.claude-plugin/plugin.json`).
