# Ticket: Deepening cleanup — tracer-plan example, glossary dedupe, validator pointer, docs sync

**Status:** closed · **Blocked by:** t11 · **Frontier order:** 11

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

Shipped the full cleanup batch; eval gate green (13/13); no eval touched.

- **tracer-plan → `EXAMPLE-PLAN.md` (authored fresh):** one worked plan — due dates for todos — 3 vertical tasks with blocking edges (2←1, 3←2), bite-sized TDD steps with real TypeScript (RED and GREEN never mixed in a step, types compile per step, scaffolding absorbed into Task 1), a Review Focus per task, and a closing rule→where-it-shows-up map. SKILL.md carries a one-line pointer at the top of Plan Writing: consult when writing a plan, not when executing.
- **domain-glossary dedupe:** ADR criteria now live only in SKILL.md ("Offer ADRs sparingly"); ADR-FORMAT.md lost its duplicate criteria block, keeping a one-line pointer + the write-time-only "What qualifies" examples. File structure stated once: SKILL.md keeps the single-context tree + the lazy-create principle; the multi-context tree moved into CONTEXT-FORMAT.md (nothing lost). Eval expectations needed no changes — no behavior moved.
- **Run-log fate — keep with exemption:** `evals/runs/2026-09-23-13of13.md` stays in place (cited as t05 evidence from both the t05 Answer and map.md); a "Kept deliberately" header now marks it evidence, not a style example.
- **authoring-skills:** Eval Run Mechanics gained one line pointing at `scripts/validate-evals.mjs` and the CI gate.
- **Docs sync (all 7 touched pages read in full):** the docs pages are concept-level explainers, not SKILL.md mirrors — hypothesis-debugging, dual-axis-review, waymap, design-interview, and tracer-plan showed zero drift from t10–t12 (correcting t11's over-cautious drift note). Two pages carried pre-existing staleness from t05/v0.2.0, fixed now (waypower-docs `ead6b39`): domain-glossary.mdx lost the "known limitation / 12 of 13" admonition; authoring-skills.mdx "12 of 13 discriminate" → "all 13". Reference files deliberately NOT added as docs pages — separate decision, as the ticket scoped.

Process lesson: when an edit path misbehaves, switch to exact-match scripted edits with explicit not-found failure instead of retrying inline replaces.
