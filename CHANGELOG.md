# Changelog

All notable changes to waypower are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

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
