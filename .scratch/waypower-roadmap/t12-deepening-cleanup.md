# Ticket: Deepening cleanup — tracer-plan example, glossary dedupe, validator pointer, docs sync

**Status:** open · **Blocked by:** t11 · **Frontier order:** 11

## Decision / deliverable

The creative + cleanup batch of the t10 audit:

- **tracer-plan → `EXAMPLE-PLAN.md`:** one excellent worked plan (3 tasks, blocking edges, bite-sized test-first steps with real code, Review Focus section). Authored fresh — the format rules currently tell without showing. Reference-pointer, not inline: every branch needs the rules, only plan-writers need the exemplar.
- **domain-glossary dedupe:** ADR criteria live in ONE place (SKILL.md — session judgment, needed every time); ADR-FORMAT.md keeps write-time-only examples; SKILL.md's file-structure section slims to one diagram + pointer to CONTEXT-FORMAT.md. Decide the fate of `evals/runs/2026-09-23-13of13.md` — narrative run record (authoring-skills' own anti-pattern) BUT cited as t05 evidence: move to `.scratch/` or keep with an exemption note; don't silently delete.
- **authoring-skills:** one pointer line to `scripts/validate-evals.mjs` in the Eval Run Mechanics section (script proposal killed in t10 — validator already exists).
- **Docs sync:** check waypower-docs pages mirroring every skill touched across t10–t12 (hypothesis-debugging, dual-axis-review, waymap, design-interview, tracer-plan, domain-glossary, authoring-skills) — update now or note drift per page. Whether reference files become docs pages is a separate decision.

## Done when

- `EXAMPLE-PLAN.md` exists and tracer-plan SKILL.md points to it
- domain-glossary has zero duplicated meanings (criteria + file structure each stated once)
- authoring-skills points at the existing validator
- Docs-sync decision recorded per touched page
- `node scripts/validate-evals.mjs` green; eval expectations updated only where dedupe changed behavior

## Answer

(pending)
