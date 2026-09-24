# Ticket: Reference extractions — dual-axis-review, waymap, design-interview

**Status:** closed · **Blocked by:** — · **Frontier order:** 10

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

Shipped: three pure-move reference files at skill roots (UPPERCASE-KEBAB, house style), each SKILL.md carrying a ≤2-line summary + pointer; `evals.json` untouched in all three; eval gate green (13/13).

- **dual-axis-review → `REVIEW-DISPATCH.md`:** the Fowler smell catalog out of Phase 2. Audit corrections found at extraction time: the catalog is **12 items, not 14** (includes Repeated Switches, Divergent Change, Refused Bequest), and **no ready-to-paste prompt blocks exist inline** — Phase 2's "Spawn both sub-agents in parallel" carries short prose briefs that stay inline (they are the dispatch instructions). Reference file = the 12 smells verbatim + paste-in-full framing; SKILL.md keeps the two binding rules + pointer.
- **waymap → `MAP-SCHEMA.md`:** map-body template, the `## Question` ticket-body template, and the `waymap:<type>` label convention moved. Audit correction: the ticket template is the mini `## Question` block (not a Decision/Done-when/Answer template) and ticket types are **four** (research/prototype/grilling/task), not three. HITL/AFK + type-selection judgment, claim/blocking/frontier prose, and both invocation flows stay inline.
- **design-interview → `SPEC-GATE.md`:** the "### The spec" bullets (4, not 5) moved: file convention with `(user preferences override)`, self-review first, exact user-gate wording, domain-language rule. HARD-GATE, classification, frontier rounds, and the Next-step rule stay inline.

Docs-sync impact (feeds t12): the three skills' waypower-docs pages mirror pre-extraction SKILL.md and don't mention the new reference files — same drift class as the hypothesis-debugging page already queued in t12.

Process lesson: the audit's per-skill details were unreliable in places (item counts, section names, bullet wording). Extraction must be driven from live file reads, never from audit notes.
