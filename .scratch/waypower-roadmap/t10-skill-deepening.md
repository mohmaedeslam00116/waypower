# Ticket: Skill deepening — references, scripts, checklists for the 13 skills

**Status:** closed · **Blocked by:** — · **Frontier order:** 9

## Decision / deliverable

Raise the quality floor of the existing 13 skills without changing the count. Per-skill audit first, then add progressive-disclosure artifacts (reference files like `seam-design/DEEPENING.md`, helper scripts, checklists) **only where the audit shows real need** — per authoring-skills' rule "supporting files only when needed (heavy reference, tools)". SKILL.md stays the lean always-loaded core; heavy branch-specific material moves behind pointers.

Constraints: evals must stay green (structural validation in CI; any behavior change reflected in `evals/evals.json` expectations). waypower-docs skill pages mirror this content — doc sync is noted per batch, not silently skipped.

## Done when

- Audit of all 13 skills recorded in this ticket — per skill: keep-as-is / reference / script / checklist, with a one-line justification
- Deepening pattern defined (file naming, when a script beats a reference, how evals stay green)
- Top-priority skills deepened as proof of the pattern; remaining work split into follow-up tickets (t11+)
- CI eval gate green on every skills/** change

## Audit (2026-09-24, three parallel audit agents over all 13 skills)

| Skill | Verdict | Proposal |
|---|---|---|
| tracer-plan | **reference** | `EXAMPLE-PLAN.md` — one excellent worked plan (3 tasks, blocking edges, real code, Review Focus); format rules are currently all tell, no show |
| seam-design | KEEP | already the reference pattern; adding would be bloat |
| seam-driven-tdd | KEEP | every section load-bearing under pressure (eval 2 needs Iron Law + exceptions + rationalizations at once) |
| hypothesis-debugging | **reference + expand** | `FEEDBACK-LOOPS.md` — 10-loop catalog grows per-loop construction recipes + tightening techniques; SKILL.md keeps principle, done-when bar, pointer |
| completion-gate | KEEP | content needed at the moment of maximum pressure — worst time to chase a pointer |
| dual-axis-review | **reference** | `REVIEW-DISPATCH.md` — 14-item smell catalog + two ready-to-paste sub-agent prompts out of Phase 2 inline |
| finish-handoff | KEEP | only candidate (detect-env script) fails the authoring bar — 3 trivial commands |
| waymap | **reference** | `MAP-SCHEMA.md` — map-body + ticket-body templates are chart-mode-only scaffolding |
| using-waypower | KEEP | router must stay lean; red-flag table is the payload |
| design-interview | **reference** | `SPEC-GATE.md` — spec convention + 4-point self-review fire on the architectural path only |
| domain-glossary | **dedupe** | ADR criteria stated twice (SKILL.md ↔ ADR-FORMAT.md, already drifting); file structure told twice (↔ CONTEXT-FORMAT.md); drop narrative run record (authoring-skills' own anti-pattern) |
| deep-research | KEEP | already minimal |
| authoring-skills | KEEP + 1 line | ~~validate-skill.py~~ — killed: duplicates existing `scripts/validate-evals.mjs` (frontmatter, desc ≤1024, eval mix). Instead one pointer line to it |

**Score: 5 references, 1 dedupe, 1 pointer line, 6 clean KEEPs.**

## Deepening pattern (established here)

- **Reference files** live at skill root, `UPPERCASE-KEBAB.md` (majority pattern: ADR-FORMAT.md, DEEPENING.md). SKILL.md keeps a ≤2-line summary + pointer. Content: branch-specific catalogs, exemplars, templates.
- **Scripts** under `scripts/` only for judgment-free mechanics — and only if `scripts/validate-evals.mjs` doesn't already do it.
- **Evals:** expectations unchanged when material only moves location; update only on behavior change. `node scripts/validate-evals.mjs` must stay green.
- **KEEP is a first-class outcome** — recorded with justification, never forced.
- **Docs sync:** waypower-docs skill pages mirror SKILL.md content; each batch notes whether a docs page needs a follow-up (reference files may become docs pages later — separate decision).

## Execution batches

- **t10 (this ticket):** audit + pattern + proof on **hypothesis-debugging** (biggest payoff: heaviest skill, extraction + genuine content expansion).
- **t11:** pure-move references — dual-axis-review `REVIEW-DISPATCH.md`, waymap `MAP-SCHEMA.md`, design-interview `SPEC-GATE.md`.
- **t12:** creative + cleanup — tracer-plan `EXAMPLE-PLAN.md`, domain-glossary dedupe, authoring-skills pointer line, docs-sync check.

## Answer

**Closed 2026-09-24.**

- **Audit:** 13/13 skills audited by three parallel agents (table above) — 5 references proposed, 1 dedupe, 6 KEEPs. The one script proposal (`validate-skill.py`) was killed on discovery that `scripts/validate-evals.mjs` (t06) already covers it — verified by reading the script, not assumed.
- **Pattern:** established above (root-level UPPERCASE-KEBAB references, ≤2-line summary + pointer in SKILL.md, KEEP as first-class outcome, eval gate green per change).
- **Proof shipped:** `skills/hypothesis-debugging/FEEDBACK-LOOPS.md` (new) — the ten loop shapes, each with when-it-reaches + construction recipe, plus tightening techniques and non-deterministic reproduction-rate guidance. SKILL.md Phase 1 went 24 lines → 8 while keeping the principle, all ten shape names (one line, keyword-discoverable), the tightening bar, the cannot-build-a-loop stop, and the done-when gate. Net: always-loaded context down, reference depth up (the recipes are new content, not moved).
- **Gate:** `node scripts/validate-evals.mjs` → "Eval gate OK — 13 skills, all structurally valid". `evals.json` untouched — material relocated, behavior unchanged.
- **Follow-ups filed:** t11 (pure-move references ×3), t12 (tracer-plan example + glossary dedupe + validator pointer + docs-sync check).
- **Docs sync:** the waypower-docs hypothesis-debugging page now mirrors a stale Phase 1 — queued in t12's docs-sync check, not silently skipped.

