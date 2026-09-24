# Ticket: Reference extractions — dual-axis-review, waymap, design-interview

**Status:** open · **Blocked by:** — · **Frontier order:** 10

## Decision / deliverable

Apply the t10 deepening pattern's **pure-move** references (material relocates behind a pointer; no behavior change, evals untouched):

- **dual-axis-review → `REVIEW-DISPATCH.md`:** the 14-item Fowler smell catalog + both ready-to-paste sub-agent prompts out of Phase 2 inline. SKILL.md keeps a ≤2-line summary (axes exist, smells are judgment calls, repo standard overrides) + pointer. Fixed-point pinning, spec-source search order, no-merge/no-rerank aggregation, and all of Phase 3 stay inline.
- **waymap → `MAP-SCHEMA.md`:** map-body + ticket-body templates, label conventions, create-then-wire ordering — chart-mode-only scaffolding. Ticket-type *selection* judgment and both invocation flows stay inline.
- **design-interview → `SPEC-GATE.md`:** spec file convention, 4-point self-review, exact gate wording, domain-language rule — architectural path only. HARD-GATE, classification table, frontier rounds stay inline.

## Done when

- Three reference files at skill roots, UPPERCASE-KEBAB, matching the FEEDBACK-LOOPS.md / DEEPENING.md house style
- Each SKILL.md carries a ≤2-line summary + pointer; nothing always-needed moved
- `node scripts/validate-evals.mjs` green; all three `evals/evals.json` untouched
- Docs-sync impact noted per mirrored docs page (feeds t12's docs-sync check)

## Answer

(pending)
